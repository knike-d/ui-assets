import useSWR from "swr";
import type { Store } from "@prisma/client";
import type { SWRResponse } from "swr";

const rootUrl = "/api/store";
const url = {
  store: rootUrl,
  storeList: `${rootUrl}/list`,
};

export const useFetchStore = (storeId: string): SWRResponse<Store> => {
  return useSWR<Store>(`${url.store}/${storeId}`);
};

export const useFetchStoreList = (): SWRResponse<Store[]> => {
  // TODO: useSWRInfiniteを使う
  return useSWR(url.storeList);
};
