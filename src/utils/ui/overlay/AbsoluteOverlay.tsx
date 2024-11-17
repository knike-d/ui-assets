import type { FC } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const AbsoluteOverlay: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`absolute inset-0 z-overlay size-full overflow-hidden bg-overlay transition-opacity duration-300 ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      aria-hidden
      onClick={onClose}
    />
  );
};
