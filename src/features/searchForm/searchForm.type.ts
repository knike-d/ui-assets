import type { AreaSelect, City } from "@/features/location/location.type";

export type SelectedArea = {
  prefecture: AreaSelect.Prefecture;
  city: City;
};
