"use client";

import type { FC, ForwardedRef } from "react";
import { useCallback, useImperativeHandle, useLayoutEffect, useRef } from "react";
import type { MessageDetailRef } from "@/features/message/message.type";
import { MessageCardSwitcher } from "@/features/message/messageCard/MessageCardSwitcher";
import { MESSAGE_DETAIL_FETCH_LIMIT, useFetchMessageDetail } from "@/features/message/useFetchMessageDetail";
import { useInViewTrigger } from "@/utils/hooks/interaction/useInViewTrigger";
import { Spinner } from "@/utils/ui/loading/Spinner";

type Props = {
  storeId: string;
  ref: ForwardedRef<MessageDetailRef>;
};

export const MessageDetail: FC<Props> = ({ storeId, ref }) => {
  const { data: messageDetail, isValidating, isLoading, setSize } = useFetchMessageDetail(storeId);
  const messages = messageDetail?.map((el) => el.slice()).flat() || [];
  const isLastData = !!messageDetail && (messageDetail.slice(-1)[0]?.length || 0) < MESSAGE_DETAIL_FETCH_LIMIT;

  const handleInView = useCallback(() => {
    setSize((size) => size + 1);
  }, [setSize]);
  const triggerElement = useInViewTrigger(handleInView, {
    skip: isValidating || isLastData,
  });

  const messageDetailRef = useRef<HTMLUListElement>(null);
  useImperativeHandle(ref, () => ({
    scrollToBottom: () => {
      messageDetailRef.current?.scrollBy(0, messageDetailRef.current.scrollHeight);
    },
  }));

  useLayoutEffect(() => {
    if (!isLoading) {
      messageDetailRef.current?.scrollIntoView(false);
    }
  }, [isLoading]);

  return (
    <ul
      ref={messageDetailRef}
      className="flex w-full max-w-2xl flex-1 flex-col-reverse overflow-auto border p-2 shadow-md"
    >
      {messages.map((el) => (
        <li
          key={el.id}
          className={`mb-2 first:mb-auto ${el.isOptimistic ? "opacity-60" : ""}`}
          data-testid={`${el.isOptimistic ? "optimistic-" : ""}message-card`}
        >
          <MessageCardSwitcher message={el} />
        </li>
      ))}
      {!isValidating ? triggerElement : null}
      <li className="m-3 grid place-items-center first:mb-auto">{!isLastData ? <Spinner /> : null}</li>
    </ul>
  );
};
