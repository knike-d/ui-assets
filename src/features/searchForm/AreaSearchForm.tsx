"use client";
import type { FC } from "react";
import { SearchFormButton } from "@/features/searchForm/SearchFormButton";
import { useOverlayContent } from "@/utils/ui/overlay/useOverlayContent.hook";

export const AreaSearchForm: FC = () => {
  const { isOpen: isModalOpen, handleOverlayOpen } = useOverlayContent();

  return (
    <SearchFormButton aria-expanded={!isModalOpen} onClick={handleOverlayOpen}>
      <div className="flex">
        <span className="w-20">エリア: </span>
        <span className="text-gray-400">エリアを選択する</span>
      </div>
    </SearchFormButton>
  );
};
