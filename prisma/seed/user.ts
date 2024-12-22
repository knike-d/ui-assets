import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSeedUser = async () => {
  const existsUser = await prisma.user.findFirst();
  if (!existsUser) {
    await prisma.user.createMany({
      data: Array.from([...Array(1)]).map((_, i) => ({ name: `ユーザー${i + 1}` })),
    });
  }
};
