import useSWR from "swr";
import type { AreaSelect } from "@/features/location/location.type";

const url = "/api/location";

export const useFetchAreaSelectLocation = () => {
  const searchParams = new URLSearchParams({
    isGrouped: "true",
  });
  return useSWR<AreaSelect.Region[]>(`${url}?${searchParams.toString()}`);
};
