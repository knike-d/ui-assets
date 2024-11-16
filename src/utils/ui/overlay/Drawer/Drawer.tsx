"use client";

import type { FC, ReactNode } from "react";
import { createContext } from "react";
import { useKeyEvent } from "@/utils/hooks/accessibility/useKeyEvent.hook";
import { CloseIcon } from "@/utils/ui/Icon/CloseIcon";
import { FixedOverlay } from "@/utils/ui/overlay/FixedOverlay";

export const DrawerContext = createContext({
  isOpen: false,
});

type Props = {
  drawerContentsId: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Drawer: FC<Props> = ({ drawerContentsId, isOpen, onClose, children }) => {
  useKeyEvent("keydown", "Escape", onClose);
  return (
    <>
      <FixedOverlay isOpen={isOpen} onClose={onClose} />
      <div
        aria-hidden={!isOpen}
        aria-modal="true"
        className={`fixed inset-y-0 right-0 z-overlay-content h-full w-60 overflow-y-auto overscroll-y-contain bg-white font-normal text-black transition-transform duration-300 ${isOpen ? "pointer-events-auto translate-x-0" : "pointer-events-none translate-x-full"}`}
        id={drawerContentsId}
        role="dialog"
      >
        <button
          aria-label="サイドメニューを閉じる"
          className="ml-auto block h-12 px-4"
          tabIndex={isOpen ? 0 : -1}
          type="button"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        <DrawerContext.Provider value={{ isOpen }}>{children}</DrawerContext.Provider>
      </div>
    </>
  );
};
