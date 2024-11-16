"use client";

import type { FC } from "react";
import { useId } from "react";
import Link from "next/link";
import { HamburgerMenuIcon } from "@/utils/ui/Icon/HamburgerMenuIcon";
import { Drawer } from "@/utils/ui/overlay/Drawer/Drawer";
import { DrawerLinkItem } from "@/utils/ui/overlay/Drawer/DrawerLinkItem";
import { useOverlayContent } from "@/utils/ui/overlay/useOverlayContent.hook";

export const Header: FC = () => {
  const { isOpen, handleOverlayOpen, handleOverlayClose } = useOverlayContent();
  const id = useId();
  return (
    <header className="bg-emerald-500">
      <nav className="flex h-12 items-center font-bold text-white">
        <Link className="mr-auto flex h-inherit items-center px-5" href="/">
          Home
        </Link>
        <button
          aria-controls={id}
          aria-expanded={isOpen}
          aria-label="サイドメニューを開く"
          className="h-inherit px-4"
          type="button"
          onClick={handleOverlayOpen}
        >
          <HamburgerMenuIcon />
        </button>
        <Drawer drawerContentsId={id} isOpen={isOpen} onClose={handleOverlayClose}>
          <DrawerLinkItem href="/pages">ページ</DrawerLinkItem>
          <DrawerLinkItem href="/parts">パーツ</DrawerLinkItem>
        </Drawer>
      </nav>
    </header>
  );
};
