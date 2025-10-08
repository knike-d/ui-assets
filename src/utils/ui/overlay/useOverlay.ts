import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusHolder } from "@/utils/hooks/accessibility/useFocusHolder";
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
  }, [storeFocusedElement]);

  const handleOverlayClose = useCallback(() => {
    setIsOpen(false);
    restoreFocusedElement();
  }, [restoreFocusedElement]);

  useEffect(() => {
    if (isOpen) {
      overlayRef.current?.focusFirstElement();
    }
  }, [isOpen]);

  return { isOpen, overlayRef, handleOverlayOpen, handleOverlayClose };
};
