import { useCallback, useState } from "react";

type Result = {
  storeFocusedElement: () => void;
  restoreFocusedElement: () => void;
};

export const useFocusHolder = (): Result => {
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
