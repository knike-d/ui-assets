import type { StoreUserMessage, StoreUserMessageForClient } from "@/features/message/message.type";
import type { Store, User } from "@prisma/client";

export const generateStore = <T extends Partial<Store>>(overrides?: T): Store => {
  return { id: "10d4fbe8-3490-44f9-be09-f1232a7d9556", name: "store1", ...overrides };
};

export const generateUser = <T extends Partial<User>>(overrides?: T): User => {
  return { id: "f9c725f5-973a-41a7-9aae-04b2d6324606", name: "user1", ...overrides };
};

export const generateMessage = <T extends Partial<StoreUserMessage>>(overrides?: T): StoreUserMessageForClient => {
  return {
    id: "44e13f57-2ff5-43b6-93fd-fed2953c05a0",
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
