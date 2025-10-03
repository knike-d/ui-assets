import { type FC } from "react";
import type { StoreUserMessage } from "@/features/message/message.type";
import { MessageCard } from "@/features/message/messageCard/MessageCard";
import { MessageCardWithDate } from "@/features/message/messageCard/MessageCardWithDate";
import { MessageCardWithSenderImage } from "@/features/message/messageCard/MessageCardWithSenderImage";

type Props = {
  message: StoreUserMessage;
};

export const MessageCardSwitcher: FC<Props> = ({ message }) => {
  switch (message.senderType) {
    case "user": {
      return (
        <div className="flex w-full justify-end">
          <div className="max-w-80p">
            <MessageCardWithDate createdAt={message.createdAt} fromStore={false}>
              <MessageCard fromStore={false}>{message.content}</MessageCard>
            </MessageCardWithDate>
          </div>
        </div>
      );
    }
    case "store": {
      return (
        <MessageCardWithSenderImage senderImagePath="">
          <div className="max-w-80p">
            <MessageCardWithDate createdAt={message.createdAt} fromStore>
              <MessageCard fromStore>{message.content}</MessageCard>
            </MessageCardWithDate>
          </div>
        </MessageCardWithSenderImage>
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
