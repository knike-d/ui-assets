import type { ReactNode } from "react";
import { render as rtlRender, waitForElementToBeRemoved, screen } from "@testing-library/react";
import { userEvent as _userEvent } from "@testing-library/user-event";
import type { StoreUserMessageForClient } from "@/features/message/message.type";
import { TestSWRProvider } from "@/testing/TestSWRProvider";
import { generateMessage, generateStore, generateUser } from "@/testing/data-generators";
import { db } from "@/testing/mocks/db";
import type { Store, User } from "@prisma/client";
import type { RenderOptions } from "@testing-library/react";

export const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(() => [...screen.queryAllByTestId(/loading/i)], {
    timeout: 5000,
  });

export const createStore = async (userProperties?: Partial<Store>) => {
  const store = generateStore(userProperties);
  await db.store.create(store);
  return store;
};

export const createUser = async (userProperties?: Partial<User>) => {
  const user = generateUser(userProperties);
  await db.user.create(user);
  return user;
};

export const createMessage = async (messageProperties?: Partial<StoreUserMessageForClient>) => {
  const message = generateMessage(messageProperties);
  const res = await db.message.create(message);
  return res;
};

export const renderApp = async (ui: ReactNode, renderOptions: RenderOptions = {}) => {
  const returnValue = {
    ...rtlRender(ui, {
      wrapper: TestSWRProvider,
      ...renderOptions,
    }),
  };

  return returnValue;
};

const userEvent = _userEvent.setup();
export * from "@testing-library/react";
export { rtlRender, userEvent };
