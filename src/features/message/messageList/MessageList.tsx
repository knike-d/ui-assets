"use client";

import type { FC } from "react";
import { MessageListCard } from "@/features/message/messageList/MessageListCard";
import { useFetchStoreList } from "@/features/store/useFetchStore";
import { Spinner } from "@/utils/ui/loading/Spinner";

export const MessageList: FC = () => {
  const { data, isValidating } = useFetchStoreList();

  if (isValidating) {
    return (
      <div className="flex w-full justify-center">
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return <div>メッセージ可能な店舗はいません</div>;
  }

  return (
    <>
      {data.map(({ id, name }) => (
        <MessageListCard key={id} href={id}>
          {name}
        </MessageListCard>
      ))}
    </>
  );
};
