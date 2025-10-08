import { useCallback, useRef, useState } from "react";
import { useFocusHolder } from "@/utils/hooks/accessibility/useFocusHolder.hook";
import { useToggleBodyFixed } from "@/utils/hooks/uiControl/useToggleBodyFixed";

export type OverlayContentsRef = {
  focusFirstElement: () => void;
};

export const useOverlayContent = () => {
  const { storeFocusedElement, restoreFocusedElement } = useFocusHolder();
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<OverlayContentsRef>(null);

  useToggleBodyFixed(isOpen);

  const handleOverlayOpen = useCallback(() => {
    storeFocusedElement();
    setIsOpen(true);
    if (overlayRef.current) {
      overlayRef.current.focusFirstElement();
    }
  }, [storeFocusedElement]);

  const handleOverlayClose = useCallback(() => {
    setIsOpen(false);
    restoreFocusedElement();
  }, [restoreFocusedElement]);

  return { isOpen, overlayRef, handleOverlayOpen, handleOverlayClose };
};
