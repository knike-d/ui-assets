import "@testing-library/jest-dom/vitest";

import { initializeDb, resetDb } from "@/testing/mocks/db";
import { server } from "@/testing/mocks/server";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
  HTMLElement.prototype.scrollIntoView = vi.fn();
  HTMLElement.prototype.scrollBy = vi.fn();
  const intersectionObserverMock = () => ({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock);
});
afterAll(() => server.close());
beforeEach(() => {
  initializeDb();
});
afterEach(() => {
  server.resetHandlers();
  resetDb();
});
