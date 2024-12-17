import type { StoreUserMessage as _StoreUserMessage } from "@prisma/client";

export type StoreUserMessageForClient = Overwrite<_StoreUserMessage, Record<"createdAt", string>>;
export type StoreUserMessage = Omit<StoreUserMessageForClient, "userId" | "storeId"> &
  Partial<Record<"isOptimistic", boolean>>;

export type MessageDetailRef = {
  scrollToBottom: () => void;
};
