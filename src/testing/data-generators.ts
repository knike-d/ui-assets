import { nanoid } from "nanoid";
import type { StoreUserMessage, StoreUserMessageForClient } from "@/features/message/message.type";
import type { Store, User } from "@prisma/client";

export const generateStore = <T extends Partial<Store>>(overrides?: T): Store => {
  return { id: nanoid(), name: `store_${nanoid()}`, ...overrides };
};

export const generateUser = <T extends Partial<User>>(overrides?: T): User => {
  return { id: nanoid(), name: `user_${nanoid()}`, ...overrides };
};

export const generateMessage = <T extends Partial<StoreUserMessage>>(overrides?: T): StoreUserMessageForClient => {
  return {
    id: nanoid(),
    userId: "",
    storeId: "",
    content: "test",
    mediaUrl: null,
    senderType: "store",
    messageType: "text",
    isRead: false,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
};
