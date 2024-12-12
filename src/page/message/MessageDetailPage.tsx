import { type FC } from "react";
import { MessageDetailPageHeader } from "@/features/message/messageDetail/MessageDetailPageHeader";

type Props = {
  storeId: string;
};

export const MessageDetailPage: FC<Props> = ({ storeId }) => {
  return (
    <main className="flex max-h-dvh flex-col">
      <MessageDetailPageHeader storeId={storeId} />
    </main>
  );
};
