"use client";
import { useRef, type FC } from "react";
import type { MessageDetailRef } from "@/features/message/message.type";
import { MessageDetail } from "@/features/message/messageDetail/MessageDetail";
import { MessageDetailForm } from "@/features/message/messageDetail/MessageDetailForm";
import { MessageDetailPageHeader } from "@/features/message/messageDetail/MessageDetailPageHeader";

type Props = {
  storeId: string;
};

export const MessageDetailPage: FC<Props> = ({ storeId }) => {
  const messageDetailRef = useRef<MessageDetailRef>(null);
  const handleSubmit = (): void => {
    messageDetailRef.current?.scrollToBottom();
  };

  return (
    <main className="flex h-dvh max-h-dvh flex-col items-center">
      <MessageDetailPageHeader storeId={storeId} />
      <MessageDetail ref={messageDetailRef} storeId={storeId} />
      <MessageDetailForm storeId={storeId} onSubmit={handleSubmit} />
    </main>
  );
};
