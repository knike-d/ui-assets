export const enableMocking = async (): Promise<ServiceWorkerRegistration | undefined> => {
  const { worker } = await import("./browser");
  const { initializeDb } = await import("./db");
  await initializeDb();
  return worker.start();
};
