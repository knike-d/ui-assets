import type { FC, ForwardedRef } from "react";
import { Drawer } from "@/utils/ui/overlay/drawer/Drawer";
import { DrawerLinkItem } from "@/utils/ui/overlay/drawer/DrawerLinkItem";
import type { OverlayContentsRef } from "@/utils/ui/overlay/useOverlay";

type Props = {
  drawerContentsId: string;
  isOpen: boolean;
  onClose: () => void;
  ref: ForwardedRef<OverlayContentsRef>;
};

export const CommonDrawer: FC<Props> = ({ drawerContentsId, isOpen, onClose, ref }) => {
  return (
    <Drawer ref={ref} drawerContentsId={drawerContentsId} isOpen={isOpen} onClose={onClose}>
      <DrawerLinkItem href="/pages">ページ</DrawerLinkItem>
      <DrawerLinkItem href="/parts">パーツ</DrawerLinkItem>
    </Drawer>
  );
};
