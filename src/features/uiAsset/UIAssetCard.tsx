import type { FC, ReactNode } from "react";
import { RightArrowIcon } from "@/utils/ui/Icon/RightArrowIcon";

type Props = {
  href: string;
  children: ReactNode;
};

export const UIAssetCard: FC<Props> = ({ href, children }) => {
  return (
    <a
      className="flex h-16 w-11/12 items-center justify-between rounded-md border p-4 text-lg hover:bg-slate-100"
      href={href}
    >
      {children}
      <RightArrowIcon />
    </a>
  );
};
