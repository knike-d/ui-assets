import type { RefObject } from "react";
import { useCallback } from "react";
import { FOCUSABLE_ELEMENTS } from "@/utils/constants/accessibility/focusableElements";
import { useKeyEvent } from "@/utils/hooks/accessibility/useKeyEvent";

export const useFocusTrap = (contentsRef: RefObject<HTMLElement | null>, isOpen: boolean): void => {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (!contentsRef.current || !isOpen) return;

      const focusableElements = Array.from(
        contentsRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS.join()),
      );

      if (!focusableElements.length) return;

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements.slice(-1)[0];

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          e.preventDefault();
          lastFocusableElement?.focus();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          e.preventDefault();
          firstFocusableElement?.focus();
        }
      }
    },
    [contentsRef, isOpen],
  );
  useKeyEvent("keydown", "Tab", handler);
};
