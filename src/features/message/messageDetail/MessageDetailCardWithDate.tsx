import type { ReactNode } from "react";
import { type FC } from "react";
import { DateFormat, formatDate } from "@/utils/functions/dateHelper";

type Props = {
  createdAt: string;
  fromStore: boolean;
  children: ReactNode;
};

export const MessageDetailCardWithDate: FC<Props> = ({ createdAt, fromStore, children }) => {
  return (
    <div className={`flex items-end ${fromStore ? "" : "flex-row-reverse"}`}>
      {children}
      <div className="mx-1 text-xs">{formatDate(DateFormat.HourMinute, createdAt)}</div>
    </div>
  );
};
