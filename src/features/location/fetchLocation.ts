import { PrismaClient, type City } from "@prisma/client";
import type { AreaSelect, RegionWithPrefecturesAndCities } from "@/features/location/location.type";

const prisma = new PrismaClient();

export const fetchAreaSelectLocations = async (): Promise<AreaSelect.Region[]> => {
  const regions = await prisma.region.findMany({
    include: {
      prefectures: {
        include: {
          cities: true,
        },
      },
    },
  });
  return groupCities(regions);
};

const getKanaGroup = (kana: string): string => {
  const firstChar = kana.charAt(0);
  if ("ｱｲｳｴｵ".includes(firstChar)) return "あ行";
  if ("ｶｷｸｹｺ".includes(firstChar)) return "か行";
  if ("ｻｼｽｾｿ".includes(firstChar)) return "さ行";
  if ("ﾀﾁﾂﾃﾄ".includes(firstChar)) return "た行";
  if ("ﾅﾆﾇﾈﾉ".includes(firstChar)) return "な行";
  if ("ﾊﾋﾌﾍﾎ".includes(firstChar)) return "は行";
  if ("ﾏﾐﾑﾒﾓ".includes(firstChar)) return "ま行";
  if ("ﾔﾕﾖ".includes(firstChar)) return "や行";
  if ("ﾗﾘﾙﾚﾛ".includes(firstChar)) return "ら行";
  if ("ﾜｦﾝ".includes(firstChar)) return "わ行";
  return "その他";
};

const groupCities = (locations: RegionWithPrefecturesAndCities[]): AreaSelect.Region[] => {
  return locations.map((location) => {
    const prefectures = location.prefectures.map((prefecture) => {
      const groupedCitiesMap = prefecture.cities.reduce(
        (acc, city) => {
          const group = getKanaGroup(city.kana);
          if (!acc[group]) acc[group] = [];

          acc[group]?.push(city);
          return acc;
        },
        {} as Record<string, City[]>,
      );

      const groupedCities = Object.entries(groupedCitiesMap)
        .map(([columnName, cities]) => ({
          columnName,
          cities: cities.toSorted((a, b) => (a.kana > b.kana ? 1 : -1)),
        }))
        .toSorted((a, b) => (a.columnName > b.columnName ? 1 : -1));

      return {
        id: prefecture.id,
        slug: prefecture.slug,
        kana: prefecture.kana,
        name: prefecture.name,
        groupedCities,
      };
    });

    return {
      id: location.id,
      region: location.region,
      prefectures,
    };
  });
};
