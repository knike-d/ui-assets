import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSeedStore = async () => {
  const existsStore = await prisma.store.findFirst();
  if (!existsStore) {
    await prisma.store.createMany({
      data: Array.from([...Array(3)]).map((_, i) => ({ name: `店舗${i + 1}` })),
    });
  }
};
