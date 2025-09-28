"use client";

import type { FC, ForwardedRef, ReactNode } from "react";
import { useImperativeHandle, useRef } from "react";
import { FOCUSABLE_ELEMENTS } from "@/utils/constants/accessibility/focusableElements";
import { useFocusTrap } from "@/utils/hooks/accessibility/useFocusTrap.hook";
import { useKeyEvent } from "@/utils/hooks/accessibility/useKeyEvent.hook";
import { useToggleBodyFixed } from "@/utils/hooks/uiControl/useToggleBodyFixed";
import { CloseIcon } from "@/utils/ui/Icon/CloseIcon";
import { FixedOverlay } from "@/utils/ui/overlay/FixedOverlay";
import type { OverlayContentsRef } from "@/utils/ui/overlay/useOverlayContent.hook";

type Props = {
  modalId: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  ref: ForwardedRef<OverlayContentsRef>;
};

export const BottomModal: FC<Props> = ({ modalId, isOpen, onClose, children, ref }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({
    focusFirstElement: () => {
      if (modalRef.current) {
        const firstItem = modalRef.current.querySelector<HTMLDivElement>(FOCUSABLE_ELEMENTS.join());
        firstItem?.focus();
      }
    },
  }));

  useToggleBodyFixed(isOpen);
  useKeyEvent("keydown", "Escape", onClose);
  useFocusTrap(modalRef, isOpen);

  return (
    <>
      <FixedOverlay isOpen={isOpen} onClose={onClose} />
      <div
        ref={modalRef}
        aria-hidden={!isOpen}
        className={`fixed bottom-0 z-overlay-content flex h-5/6 w-full max-w-2xl flex-col overflow-y-auto overscroll-y-contain bg-white font-normal text-black transition-transform duration-300 ${isOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"}`}
        id={modalId}
        role="dialog"
        aria-modal
      >
        <button
          aria-label="モーダルを閉じる"
          className="ml-auto block h-12 flex-none px-4"
          tabIndex={isOpen ? 0 : -1}
          type="button"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </>
  );
};
