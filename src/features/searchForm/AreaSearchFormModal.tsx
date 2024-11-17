"use client";
import type { ForwardedRef, ReactElement } from "react";
import { forwardRef } from "react";
import { BottomModal } from "@/utils/ui/overlay/Modal/BottomModal";
import type { OverlayContentsRef } from "@/utils/ui/overlay/useOverlayContent.hook";

type Props = {
  modalId: string;
  isModalOpen: boolean;
  onClose: () => void;
};

export const AreaSearchFormModal = forwardRef(function AreaSearchFormModal(
  { modalId, isModalOpen, onClose }: Props,
  ref: ForwardedRef<OverlayContentsRef>,
): ReactElement {
  const handleAreaSelectCancel = (): void => {
    onClose();
  };

  return (
    <BottomModal ref={ref} isOpen={isModalOpen} modalId={modalId} onClose={handleAreaSelectCancel}>
      <p className="pl-4 text-lg">エリアを選択</p>
    </BottomModal>
  );
});
