"use client";

import type { FC } from "react";
import { useId } from "react";
import Link from "next/link";
import { HamburgerMenuIcon } from "@/utils/ui/Icon/HamburgerMenuIcon";
import { CommonDrawer } from "@/utils/ui/overlay/Drawer/CommonDrawer";
import { useOverlayContent } from "@/utils/ui/overlay/useOverlay.hook";

export const Header: FC = () => {
  const { isOpen, overlayRef, handleOverlayOpen, handleOverlayClose } = useOverlayContent();
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
        <CommonDrawer ref={overlayRef} drawerContentsId={id} isOpen={isOpen} onClose={handleOverlayClose} />
      </nav>
    </header>
  );
};
