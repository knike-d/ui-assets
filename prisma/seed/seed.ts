import { PrismaClient } from "@prisma/client";
import { createSeedStore } from "./store";
import { createSeedUser } from "./user";

const prisma = new PrismaClient();

async function main() {
  await createSeedStore();
  await createSeedUser();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
