import type { FC, ReactNode } from "react";
import Link from "next/link";
import { RightArrowIcon } from "@/utils/ui/Icon/RightArrowIcon";

type Props = {
  href: string;
  children: ReactNode;
};

export const UIAssetCard: FC<Props> = ({ href, children }) => {
  return (
    <Link
      className="flex h-16 w-11/12 items-center justify-between rounded-md border p-4 text-lg hover:bg-slate-100"
      href={href}
    >
      {children}
      <RightArrowIcon />
    </Link>
  );
};
