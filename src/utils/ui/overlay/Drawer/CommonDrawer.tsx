import type { ReactElement } from "react";
import { forwardRef } from "react";
import { Drawer } from "@/utils/ui/overlay/Drawer/Drawer";
import { DrawerLinkItem } from "@/utils/ui/overlay/Drawer/DrawerLinkItem";
import type { OverlayContentsRef } from "@/utils/ui/overlay/useOverlayContent.hook";

type Props = {
  drawerContentsId: string;
  isOpen: boolean;
  onClose: () => void;
};

export const CommonDrawer = forwardRef<OverlayContentsRef, Props>(function CommonDrawer(
  { drawerContentsId, isOpen, onClose },
  ref,
): ReactElement {
  return (
    <Drawer ref={ref} drawerContentsId={drawerContentsId} isOpen={isOpen} onClose={onClose}>
      <DrawerLinkItem href="/pages">ページ</DrawerLinkItem>
      <DrawerLinkItem href="/parts">パーツ</DrawerLinkItem>
    </Drawer>
  );
});
