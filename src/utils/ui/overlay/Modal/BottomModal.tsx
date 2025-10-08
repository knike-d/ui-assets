"use client";

import type { FC, ForwardedRef, ReactNode } from "react";
import { useImperativeHandle, useRef } from "react";
import { FOCUSABLE_ELEMENTS } from "@/utils/constants/accessibility/focusableElements";
import { useFocusTrap } from "@/utils/hooks/accessibility/useFocusTrap.hook";
import { useKeyEvent } from "@/utils/hooks/accessibility/useKeyEvent.hook";
import { CloseIcon } from "@/utils/ui/Icon/CloseIcon";
import { FixedOverlay } from "@/utils/ui/overlay/FixedOverlay";
import type { OverlayContentsRef } from "@/utils/ui/overlay/useOverlay.hook";

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

  useKeyEvent("keydown", "Escape", onClose);
  useFocusTrap(modalRef, isOpen);

  return (
    <>
      <FixedOverlay isOpen={isOpen} onClose={onClose} />
      <div
        ref={modalRef}
        className={`fixed bottom-0 z-overlay-content flex h-5/6 w-full max-w-2xl flex-col overflow-y-auto overscroll-y-contain bg-white font-normal text-black transition-transform duration-300 
          ${isOpen ? "visible translate-y-0 opacity-100" : "invisible translate-y-full opacity-0"}`}
        id={modalId}
        role="dialog"
        aria-modal
      >
        <button
          aria-label="モーダルを閉じる"
          className="ml-auto block h-12 flex-none px-4"
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
