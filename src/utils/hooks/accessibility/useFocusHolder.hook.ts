import { useCallback, useState } from "react";

export const useFocusHolder = () => {
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);

  const storeFocusedElement = useCallback(() => {
    setFocusedElement(document.activeElement as HTMLElement);
  }, []);

  const restoreFocusedElement = useCallback(() => {
    focusedElement?.focus();
    setFocusedElement(null);
  }, [focusedElement]);

  return {
    storeFocusedElement,
    restoreFocusedElement,
  };
};
