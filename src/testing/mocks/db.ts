/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { factory, primaryKey } from "@mswjs/data";
import { nullable } from "@mswjs/data/lib/nullable";
import { nanoid } from "nanoid";

const models = {
  store: {
    id: primaryKey(nanoid),
    name: String,
  },
  user: {
    id: primaryKey(nanoid),
    name: String,
  },
  message: {
    id: primaryKey(nanoid),
    storeId: String,
    userId: String,
    content: nullable(String),
    mediaUrl: nullable(String),
    senderType: String,
    messageType: String,
    isRead: Boolean,
    createdAt: Date,
  },
};

export const db = factory(models);

export type Model = keyof typeof models;

const dbFilePath = "mocked-db.json";

export const loadDb = async () => {
  if (typeof window === "undefined") {
    const { readFile, writeFile } = await import("fs/promises");
    try {
      const data = await readFile(dbFilePath, "utf8");
      return JSON.parse(data);
    } catch (error: any) {
      if (error?.code === "ENOENT") {
        const emptyDB = {};
        await writeFile(dbFilePath, JSON.stringify(emptyDB, null, 2));
        return emptyDB;
      } else {
        console.error("Error loading mocked DB:", error);
        return null;
      }
    }
  }
  return Object.assign(JSON.parse(window.localStorage.getItem("msw-db") || "{}"));
};

export const storeDb = async (data: string) => {
  if (typeof window === "undefined") {
    const { writeFile } = await import("fs/promises");
    await writeFile(dbFilePath, data);
  } else {
    window.localStorage.setItem("msw-db", data);
  }
};

export const persistDb = async (model: Model) => {
  if (process.env.NODE_ENV === "test") return;
  const data = await loadDb();
  data[model] = db[model].getAll();
  await storeDb(JSON.stringify(data));
};

export const initializeDb = async () => {
  const database = await loadDb();
  Object.entries(db).forEach(([key, model]) => {
    const dataEntries = database[key];
    if (dataEntries) {
      dataEntries?.forEach((entry: Record<string, unknown>) => {
        model.create(entry);
      });
    }
  });
};

export const resetDb = () => {
  window.localStorage.clear();
};
