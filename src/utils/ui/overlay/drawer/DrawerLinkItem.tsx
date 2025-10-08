import type { FC } from "react";
import { use, type ComponentProps, type ReactNode } from "react";
import Link from "next/link";
import { DrawerContext } from "@/utils/ui/overlay/drawer/Drawer";

type Props = {
  href: NonNullable<ComponentProps<"a">["href"]>;
  children: ReactNode;
};

export const DrawerLinkItem: FC<Props> = ({ children, ...props }) => {
  const { isOpen, onClose } = use(DrawerContext);
  return (
    <Link className="block w-full p-4" tabIndex={isOpen ? 0 : -1} onClick={onClose} {...props}>
      {children}
    </Link>
  );
};
