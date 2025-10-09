import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import useSWRMutation from "swr/mutation";
import type { StoreUserMessage } from "@/features/message/message.type";
import { customFetch } from "@/utils/functions/fetchManager";
import type { SWRInfiniteResponse } from "swr/infinite";
import type { SWRMutationResponse } from "swr/mutation";

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

export const useFetchMessageDetail = (storeId: string): SWRInfiniteResponse<StoreUserMessage[]> => {
  return useSWRInfinite(getKey(storeId), { revalidateFirstPage: false });
};

export const usePostMessage = (storeId: string): SWRMutationResponse<unknown, unknown, string, FormData> => {
  return useSWRMutation(`${url.messages}/${storeId}`, async (url, { arg }) => {
    return customFetch(url, {
      method: "POST",
      body: arg,
    });
  });
};

const OPTIMISTIC_MESSAGE_ID_KEY = "dummy";
const createDummyMessage = (inputText: string): StoreUserMessage => {
  return {
    id: `${OPTIMISTIC_MESSAGE_ID_KEY}Text`,
    senderType: "user",
    messageType: "text",
    content: inputText,
    mediaUrl: null,
    isRead: true,
    createdAt: new Date().toISOString(),
    isOptimistic: true,
  };
};

type OptimisticUpdateMessageDetailResult = {
  optimisticUpdate: ({ inputText }: Record<"inputText", string>) => Promise<void>;
  rollbackData: () => Promise<void>;
};

export const useOptimisticUpdateMessageDetail = (storeId: string): OptimisticUpdateMessageDetailResult => {
  const { mutate } = useFetchMessageDetail(storeId);

  const optimisticUpdate = useCallback(
    async ({ inputText }: Record<"inputText", string>) => {
      await mutate((prev) => {
        if (!prev) return [];

        const newFirstData = [createDummyMessage(inputText), ...(prev[0] || [])];
        return [newFirstData, ...prev.slice(1)];
      }, false);
    },
    [mutate],
  );

  const rollbackData = useCallback(async () => {
    await mutate((prev) => {
      if (!prev) return [];
      const originalFirstData = [...(prev[0]?.filter((el) => !el.id.startsWith(OPTIMISTIC_MESSAGE_ID_KEY)) || [])];
      return [originalFirstData, ...prev.slice(1)];
    }, false);
  }, [mutate]);

  return { optimisticUpdate, rollbackData };
};
