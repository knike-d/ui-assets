export const enableMocking = async () => {
  const { worker } = await import("./browser");
  const { initializeDb } = await import("./db");
  await initializeDb();
  return worker.start();
};
