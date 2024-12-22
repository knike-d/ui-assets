import type { City, Prefecture, Region } from "@prisma/client";

export type RegionWithPrefecturesAndCities = Region & {
  prefectures: (Prefecture & {
    cities: City[];
  })[];
};

export namespace AreaSelect {
  export type Region = {
    id: string;
    region: string;
    prefectures: Prefecture[];
  };

  export type Prefecture = {
    id: string;
    slug: string;
    kana: string;
    name: string;
    groupedCities: GroupedCity[];
  };

  export type GroupedCity = {
    columnName: string;
    cities: City[];
  };
}
