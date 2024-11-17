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
  cities: City[];
};

export type City = {
  id: string;
  code: number;
  kana: string;
  name: string;
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
