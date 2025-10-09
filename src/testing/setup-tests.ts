import "@testing-library/jest-dom/vitest";

import { initializeDb, resetDb } from "@/testing/mocks/db";
import { server } from "@/testing/mocks/server";
import { cleanup } from "@/testing/test-utils";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
  HTMLElement.prototype.scrollIntoView = vi.fn();
  HTMLElement.prototype.scrollBy = vi.fn();
  const intersectionObserverMock = (): Partial<IntersectionObserver> => ({
    observe: (): null => null,
    unobserve: (): null => null,
    disconnect: (): null => null,
  });
  window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock);
});
afterAll(() => server.close());
beforeEach(() => {
  initializeDb();
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
  resetDb();
});
