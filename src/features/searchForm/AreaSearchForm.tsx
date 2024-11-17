"use client";
import type { FC } from "react";
import { useId, useState } from "react";
import { AreaSearchFormModal } from "@/features/searchForm/AreaSearchFormModal";
import { SearchFormButton } from "@/features/searchForm/SearchFormButton";
import type { SelectedArea } from "@/features/searchForm/searchForm.type";
import { useOverlayContent } from "@/utils/ui/overlay/useOverlayContent.hook";

export const AreaSearchForm: FC = () => {
  const id = useId();
  const modalId = `modal-${id}`;

  const { isOpen: isModalOpen, handleOverlayOpen, handleOverlayClose, overlayContentsRef } = useOverlayContent();
  const [selectedArea, setSelectedArea] = useState<SelectedArea>();

  return (
    <>
      <SearchFormButton aria-controls={modalId} aria-expanded={!isModalOpen} onClick={handleOverlayOpen}>
        <div className="flex">
          <span className="mr-1 w-20 whitespace-nowrap">エリア:</span>
          {selectedArea ? (
            <span className="w-full truncate">
              {selectedArea.prefecture.name} {selectedArea.city.name}
            </span>
          ) : (
            <span className="w-full text-gray-400">エリアを選択する</span>
          )}
        </div>
      </SearchFormButton>
      <AreaSearchFormModal
        ref={overlayContentsRef}
        isModalOpen={isModalOpen}
        modalId={modalId}
        selectedArea={selectedArea}
        onClose={handleOverlayClose}
        onSelect={setSelectedArea}
      />
    </>
  );
};
