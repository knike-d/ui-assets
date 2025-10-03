import type { FC, ReactNode } from "react";
import { useKeyEvent } from "@/utils/hooks/accessibility/useKeyEvent.hook";

type Props = {
  drawerId: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const DetailDrawer: FC<Props> = ({ drawerId, isOpen, onClose, children }) => {
  useKeyEvent("keydown", "Escape", onClose);

  return (
    <div
      aria-hidden={!isOpen}
      aria-modal="true"
      className={`z-overlay-content overflow-y-auto overscroll-y-contain bg-white transition-all duration-300 ${isOpen ? "w-200p" : "invisible w-0"}`}
      id={drawerId}
      role="dialog"
    >
      {children}
    </div>
  );
};
