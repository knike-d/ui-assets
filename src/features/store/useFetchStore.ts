import useSWR from "swr";
import type { Store } from "@prisma/client";

const url = "/api/store/list";

export const useFetchStoreList = () => {
  // TODO: useSWRInfiniteを使う
  return useSWR<Store[]>(url);
};
