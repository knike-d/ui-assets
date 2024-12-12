import type { FC, ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
};

export const MessageListCard: FC<Props> = ({ href, children }) => {
  return (
    <a className="flex w-full items-center border-b p-8 hover:bg-slate-200" href={href}>
      <h3 className="text-lg">{children}</h3>
    </a>
  );
};
