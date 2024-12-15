import useSWRInfinite from "swr/infinite";
import type { StoreUserMessage } from "@/features/message/message.type";

export const MESSAGE_DETAIL_FETCH_LIMIT = 20;

const url = {
  messages: "/api/message",
};

const getKey =
  (storeId: string) =>
  (pageIndex: number, previousPageData: StoreUserMessage[] | null): string | null => {
    if (previousPageData && !previousPageData.length) return null;

    const searchParams = new URLSearchParams({
      cursor: previousPageData?.slice(-1)[0]?.id || "",
      limit: MESSAGE_DETAIL_FETCH_LIMIT.toString(),
    });

    return `${url.messages}/${storeId}?${searchParams.toString()}`;
  };

export const useFetchMessageDetail = (storeId: string) => {
  return useSWRInfinite<StoreUserMessage[]>(getKey(storeId), { revalidateFirstPage: false });
};