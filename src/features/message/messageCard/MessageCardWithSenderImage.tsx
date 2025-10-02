import type { ReactNode } from "react";
import { type FC } from "react";
import { NoHumanImage } from "@/utils/ui/Icon/NoHumanImage";

type Props = {
  senderImagePath: string;
  children: ReactNode;
};

export const MessageCardWithSenderImage: FC<Props> = ({ children }) => {
  return (
    <div className="flex items-start">
      {/* TODO: 画像差し替える */}
      <NoHumanImage className="mr-1 size-8 rounded-s-full" />
      {children}
    </div>
  );
};
