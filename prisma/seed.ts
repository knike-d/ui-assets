import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existsStore = await prisma.store.findFirst();
  if (!existsStore) {
    await prisma.store.createMany({
      data: Array.from([...Array(3)]).map((_, i) => ({ name: `店舗${i + 1}` })),
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
