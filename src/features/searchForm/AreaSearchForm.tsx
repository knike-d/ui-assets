"use client";
import type { FC } from "react";
import { useId, useState } from "react";
import type { AreaSelect } from "@/features/location/location.type";
import { AreaSearchFormModal } from "@/features/searchForm/AreaSearchFormModal";
import { SearchFormButton } from "@/features/searchForm/SearchFormButton";
import type { SelectedArea } from "@/features/searchForm/searchForm.type";
import { useOverlayContent } from "@/utils/ui/overlay/useOverlay.hook";

type Props = {
  locations: AreaSelect.Region[];
};

export const AreaSearchForm: FC<Props> = ({ locations }) => {
  const id = useId();

  const { isOpen: isModalOpen, handleOverlayOpen, handleOverlayClose, overlayRef } = useOverlayContent();
  const [selectedArea, setSelectedArea] = useState<SelectedArea>();

  return (
    <>
      <SearchFormButton aria-controls={id} aria-expanded={!isModalOpen} onClick={handleOverlayOpen}>
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
        ref={overlayRef}
        isModalOpen={isModalOpen}
        locations={locations}
        modalId={id}
        selectedArea={selectedArea}
        onClose={handleOverlayClose}
        onSelect={setSelectedArea}
      />
    </>
  );
};
