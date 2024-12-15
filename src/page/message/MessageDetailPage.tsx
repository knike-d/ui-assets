import { type FC } from "react";
import { MessageDetailPageHeader } from "@/features/message/messageDetail/MessageDetailPageHeader";

type Props = {
  storeId: string;
};

export const MessageDetailPage: FC<Props> = ({ storeId }) => {
  return (
    <main className="flex h-dvh max-h-dvh flex-col items-center">
      <MessageDetailPageHeader storeId={storeId} />
    </main>
  );
};
