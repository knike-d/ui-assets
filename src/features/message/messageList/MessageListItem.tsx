import type { FC, ReactNode } from "react";
import Link from "next/link";

type Props = {
  href: string;
  children: ReactNode;
};

export const MessageListItem: FC<Props> = ({ href, children }) => {
  return (
    <Link className="flex w-full items-center border-b p-8 hover:bg-slate-200" href={href}>
      <h3 className="text-lg">{children}</h3>
    </Link>
  );
};
