import { useCallback, useState } from "react";

export const useOverlayContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOverlayOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleOverlayClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, handleOverlayOpen, handleOverlayClose };
};
