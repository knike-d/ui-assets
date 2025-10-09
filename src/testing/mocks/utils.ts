import { delay } from "msw";

export const networkDelay = (): Promise<void> => {
  const delayTime = Math.floor(Math.random() * 700) + 300;
  return delay(delayTime);
};
