import { type FC } from "react";
import type { StoreUserMessage } from "@/features/message/message.type";
import { MessageDetailCard } from "@/features/message/messageDetail/MessageDetailCard";
import { MessageDetailCardWithDate } from "@/features/message/messageDetail/MessageDetailCardWithDate";
import { MessageDetailCardWithStoreImage } from "@/features/message/messageDetail/MessageDetailCardWithStoreImage";

type Props = {
  message: StoreUserMessage;
};

export const MessageDetailCardSwitcher: FC<Props> = ({ message }) => {
  switch (message.senderType) {
    case "user": {
      return (
        <div className="flex w-full justify-end">
          <div className="max-w-80p">
            <MessageDetailCardWithDate createdAt={message.createdAt} fromStore={false}>
              <MessageDetailCard fromStore={false}>{message.content}</MessageDetailCard>
            </MessageDetailCardWithDate>
          </div>
        </div>
      );
    }
    case "store": {
      return (
        <MessageDetailCardWithStoreImage storeImage="">
          <div className="max-w-80p">
            <MessageDetailCardWithDate createdAt={message.createdAt} fromStore>
              <MessageDetailCard fromStore>{message.content}</MessageDetailCard>
            </MessageDetailCardWithDate>
          </div>
        </MessageDetailCardWithStoreImage>
      );
    }
    case "system": {
      // TODO: いつか実装する
      return null;
    }
    default: {
      throw new Error(message.senderType satisfies never);
    }
  }
};
