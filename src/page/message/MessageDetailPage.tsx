import { type FC } from "react";
import { MessageDetail } from "@/features/message/messageDetail/MessageDetail";
import { MessageDetailForm } from "@/features/message/messageDetail/MessageDetailForm";
import { MessageDetailPageHeader } from "@/features/message/messageDetail/MessageDetailPageHeader";

type Props = {
  storeId: string;
};

export const MessageDetailPage: FC<Props> = ({ storeId }) => {
  return (
    <main className="flex h-dvh max-h-dvh flex-col items-center">
      <MessageDetailPageHeader storeId={storeId} />
      <MessageDetail storeId={storeId} />
      <MessageDetailForm />
    </main>
  );
};
