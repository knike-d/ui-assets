import { storeHandlers } from "@/testing/mocks/handlers/store";
import { messageHandlers } from "./message";

export const handlers = [...messageHandlers, ...storeHandlers];
