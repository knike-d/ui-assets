import useSWR from "swr";
import type { Store } from "@prisma/client";

const rootUrl = "/api/store";
const url = {
  store: rootUrl,
  storeList: `${rootUrl}/list`,
};

export const useFetchStore = (storeId: string) => {
  return useSWR<Store>(`${url.store}/${storeId}`);
};

export const useFetchStoreList = () => {
  // TODO: useSWRInfiniteを使う
  return useSWR<Store[]>(url.storeList);
};
