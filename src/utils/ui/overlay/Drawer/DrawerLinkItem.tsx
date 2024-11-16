import type { FC } from "react";
import { useContext, type ComponentProps, type ReactNode } from "react";
import Link from "next/link";
import { DrawerContext } from "@/utils/ui/overlay/Drawer/Drawer";

type Props = {
  href: NonNullable<ComponentProps<"a">["href"]>;
  children: ReactNode;
};

export const DrawerLinkItem: FC<Props> = ({ children, ...props }) => {
  const { isOpen } = useContext(DrawerContext);
  return (
    <Link className="block w-full p-4" tabIndex={isOpen ? 0 : -1} {...props}>
      {children}
    </Link>
  );
};
