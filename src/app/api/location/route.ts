import { NextResponse } from "next/server";
import { locations } from "@/app/api/location/location.const";
import type { AreaSelect, City, Region } from "@/features/location/location.type";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const res = searchParams.get("isGrouped") ? groupCities(locations) : locations;
  return NextResponse.json(res, { status: 200 });
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

const groupCities = (locations: Region[]): AreaSelect.Region[] => {
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
