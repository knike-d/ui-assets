import { useCallback, useRef, useState } from "react";
import { useFocusHolder } from "@/utils/hooks/accessibility/useFocusHolder.hook";
import { useToggleBodyFixed } from "@/utils/hooks/uiControl/useToggleBodyFixed";

export type OverlayContentsRef = {
  focusFirstElement: () => void;
};

export const useOverlayContent = () => {
  const { storeFocusedElement, restoreFocusedElement } = useFocusHolder();
  const [isOpen, setIsOpen] = useState(false);
  const overlayContentsRef = useRef<OverlayContentsRef>(null);

  useToggleBodyFixed(isOpen);

  const handleOverlayOpen = useCallback(() => {
    storeFocusedElement();
    setIsOpen(true);
    if (overlayContentsRef.current) {
      overlayContentsRef.current.focusFirstElement();
    }
  }, [storeFocusedElement]);

  const handleOverlayClose = useCallback(() => {
    setIsOpen(false);
    restoreFocusedElement();
  }, [restoreFocusedElement]);

  return { isOpen, overlayContentsRef, handleOverlayOpen, handleOverlayClose };
};
