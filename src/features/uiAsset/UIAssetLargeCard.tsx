import type { FC, ReactNode } from "react";
import { RightArrowIcon } from "@/utils/ui/Icon/RightArrowIcon";

type Props = {
  href: string;
  children: ReactNode;
};

export const UIAssetLargeCard: FC<Props> = ({ href, children }) => {
  return (
    <a
      className="flex h-40 w-full items-center justify-between rounded-md border p-4 text-xl hover:bg-slate-100"
      href={href}
    >
      {children}
      <RightArrowIcon />
    </a>
  );
};
