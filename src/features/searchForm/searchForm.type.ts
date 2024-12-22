import type { AreaSelect } from "@/features/location/location.type";
import type { City } from "@prisma/client";

export type SelectedArea = {
  prefecture: AreaSelect.Prefecture;
  city: City;
};
