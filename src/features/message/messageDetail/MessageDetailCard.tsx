import type { ReactNode } from "react";
import { type FC } from "react";

type Props = {
  fromStore: boolean;
  children: ReactNode;
};

export const MessageDetailCard: FC<Props> = ({ fromStore, children }) => {
  return (
    <p
      className={`whitespace-pre-wrap break-words rounded-lg p-4 text-sm  ${fromStore ? "rounded-ss-none bg-gray-200 text-black" : "rounded-se-none bg-blue-600 text-white"}`}
    >
      {children}
    </p>
  );
};
