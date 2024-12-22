import { PrismaClient } from "@prisma/client";
import { locations } from "../location.const";

const prisma = new PrismaClient();

export const createSeedLocation = async () => {
  const existsRegion = await prisma.region.findFirst();
  if (!existsRegion) {
    for (const region of locations) {
      await prisma.region.create({
        data: {
          id: region.id,
          region: region.region,
          prefectures: {
            create: region.prefectures.map((prefecture) => ({
              id: prefecture.id,
              slug: prefecture.slug,
              kana: prefecture.kana,
              name: prefecture.name,
              cities: {
                create: prefecture.cities.map((city) => ({
                  id: city.id,
                  code: city.code,
                  kana: city.kana,
                  name: city.name,
                })),
              },
            })),
          },
        },
      });
    }
  }
};
