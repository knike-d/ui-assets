import useSWR from "swr";
import type { AreaSelect } from "@/features/location/location.type";
import type { SWRResponse } from "swr";

const url = "/api/location";

export const useFetchAreaSelectLocation = (): SWRResponse<AreaSelect.Region[]> => {
  const searchParams = new URLSearchParams({
    isGrouped: "true",
  });
  return useSWR(`${url}?${searchParams.toString()}`);
};
