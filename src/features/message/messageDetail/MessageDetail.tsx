"use client";

import { useCallback, useLayoutEffect, useRef, type FC } from "react";
import { MessageDetailCardSwitcher } from "@/features/message/messageDetail/MessageDetailCardSwitcher";
import { MESSAGE_DETAIL_FETCH_LIMIT, useFetchMessageDetail } from "@/features/message/useFetchMessageDetail";
import { useInViewTrigger } from "@/utils/hooks/interaction/useInViewTrigger";
import { Spinner } from "@/utils/ui/loading/Spinner";

type Props = {
  storeId: string;
};

export const MessageDetail: FC<Props> = ({ storeId }) => {
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
        <li key={el.id} className={`mb-2 ${el.isOptimistic ? "opacity-60" : ""}`}>
          <MessageDetailCardSwitcher message={el} />
        </li>
      ))}
      <li className="m-3 mb-auto grid place-items-center">{isValidating ? <Spinner /> : triggerElement}</li>
    </ul>
  );
};
