import type { FC, ReactNode } from "react";
import Link from "next/link";
import { RightArrowIcon } from "@/utils/ui/Icon/RightArrowIcon";

type Props = {
  href: string;
  children: ReactNode;
};

export const UIAssetLargeCard: FC<Props> = ({ href, children }) => {
  return (
    <Link
      className="flex h-40 w-full items-center justify-between rounded-md border p-4 text-xl hover:bg-slate-100"
      href={href}
    >
      {children}
      <RightArrowIcon />
    </Link>
  );
};
