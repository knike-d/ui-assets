"use client";

import type { ReactElement, ReactNode } from "react";
import { createContext, forwardRef, useImperativeHandle, useRef } from "react";
import { FOCUSABLE_ELEMENTS } from "@/utils/constants/accessibility/focusableElements";
import { useFocusTrap } from "@/utils/hooks/accessibility/useFocusTrap.hook";
import { useKeyEvent } from "@/utils/hooks/accessibility/useKeyEvent.hook";
import { CloseIcon } from "@/utils/ui/Icon/CloseIcon";
import { FixedOverlay } from "@/utils/ui/overlay/FixedOverlay";
import type { OverlayContentsRef } from "@/utils/ui/overlay/useOverlayContent.hook";

export const DrawerContext = createContext({
  isOpen: false,
});

type Props = {
  drawerContentsId: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Drawer = forwardRef<OverlayContentsRef, Props>(function Drawer(
  { drawerContentsId, isOpen, onClose, children },
  ref,
): ReactElement {
  const drawerContentsRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({
    focusFirstElement: () => {
      if (drawerContentsRef.current) {
        const firstItem = drawerContentsRef.current.querySelector<HTMLDivElement>(FOCUSABLE_ELEMENTS.join());
        firstItem?.focus();
      }
    },
  }));

  useKeyEvent("keydown", "Escape", onClose);
  useFocusTrap(drawerContentsRef, isOpen);

  return (
    <>
      <FixedOverlay isOpen={isOpen} onClose={onClose} />
      <div
        ref={drawerContentsRef}
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
});
