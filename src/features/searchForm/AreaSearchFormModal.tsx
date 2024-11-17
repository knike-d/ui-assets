"use client";
import type { ForwardedRef, ReactElement } from "react";
import { forwardRef, useId, useState } from "react";
import type { AreaSelect, City } from "@/features/location/location.type";
import { useFetchAreaSelectLocation } from "@/features/location/useFetchLocation.hook";
import type { SelectedArea } from "@/features/searchForm/searchForm.type";
import { AbsoluteOverlay } from "@/utils/ui/overlay/AbsoluteOverlay";
import { DetailDrawer } from "@/utils/ui/overlay/DetailDrawer/DetailDrawer";
import { DetailDrawerListItemButton } from "@/utils/ui/overlay/DetailDrawer/DetailDrawerListItemButton";
import { DetailDrawerOpenButton } from "@/utils/ui/overlay/DetailDrawer/DetailDrawerOpenButton";
import { BottomModal } from "@/utils/ui/overlay/Modal/BottomModal";
import type { OverlayContentsRef } from "@/utils/ui/overlay/useOverlayContent.hook";

type Props = {
  modalId: string;
  isModalOpen: boolean;
  selectedArea: SelectedArea | undefined;
  onSelect: (selectedArea: SelectedArea) => void;
  onClose: () => void;
};

export const AreaSearchFormModal = forwardRef(function AreaSearchFormModal(
  { modalId, isModalOpen, selectedArea, onSelect, onClose }: Props,
  ref: ForwardedRef<OverlayContentsRef>,
): ReactElement {
  const { data } = useFetchAreaSelectLocation();

  const id = useId();
  const citiesDrawerId = `cities-drawer-${id}`;

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(!!selectedArea);
  const [tempSelectedArea, setTempSelectedArea] = useState<Partial<SelectedArea> | undefined>(selectedArea);

  const handleAreaSelectCancel = (): void => {
    // モーダルUIを変更前の状態にリセット
    setIsDrawerOpen(!!selectedArea);
    setTempSelectedArea(selectedArea);
    onClose();
  };

  const handlePrefSelect = (prefecture: AreaSelect.Prefecture): void => {
    setIsDrawerOpen(true);
    setTempSelectedArea({ prefecture });
  };

  const handlePrefSelectCancel = (): void => {
    setIsDrawerOpen(false);
    setTempSelectedArea(undefined);
  };

  const handleCitySelect = (city: City): void => {
    if (!tempSelectedArea?.prefecture) {
      handlePrefSelectCancel();
      alert("都道府県が選択されていません");
      return;
    }
    setTempSelectedArea((prev) => ({ ...prev, city }));
    onSelect({ prefecture: tempSelectedArea.prefecture, city });
    onClose();
  };

  const selectedTempPref = !!tempSelectedArea?.prefecture;

  return (
    <BottomModal ref={ref} isOpen={isModalOpen} modalId={modalId} onClose={handleAreaSelectCancel}>
      <p className="pl-4 text-lg">エリアを選択</p>
      <div className="relative flex size-full overflow-y-auto p-4">
        <div className={`w-full ${selectedTempPref ? "overflow-hidden" : "overflow-y-auto overscroll-y-contain"}`}>
          <div className="relative">
            <AbsoluteOverlay isOpen={isDrawerOpen} onClose={handlePrefSelectCancel} />
            {data?.map((el) => (
              <div key={el.id} className="w-full">
                <p className="sticky top-0 z-10 w-full bg-gray-300 px-2 font-bold">{el.region}</p>
                {el.prefectures.map((pref) => {
                  const isSelected = pref.id === tempSelectedArea?.prefecture?.id;
                  return (
                    <DetailDrawerOpenButton
                      key={pref.kana}
                      aria-controls={citiesDrawerId}
                      aria-label={isSelected ? "都道府県選択に戻る" : undefined}
                      disabled={!isModalOpen || (selectedTempPref && !isSelected)}
                      isSelected={isSelected}
                      onClick={isDrawerOpen ? handlePrefSelectCancel : () => handlePrefSelect(pref)}
                    >
                      <span className="truncate">{pref.name}</span>
                    </DetailDrawerOpenButton>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <DetailDrawer drawerId={citiesDrawerId} isOpen={isDrawerOpen} onClose={handlePrefSelectCancel}>
          {tempSelectedArea?.prefecture?.groupedCities.map(({ columnName, cities }) => (
            <div key={columnName} className="w-full">
              <p className="sticky top-0 z-10 w-full bg-gray-300 px-2 font-bold">{columnName}</p>
              {cities.map((city) => (
                <DetailDrawerListItemButton
                  key={city.id}
                  disabled={!isModalOpen || !isDrawerOpen}
                  isSelected={city.id === tempSelectedArea.city?.id}
                  onClick={() => handleCitySelect(city)}
                >
                  <span className="truncate">{city.name}</span>
                </DetailDrawerListItemButton>
              ))}
            </div>
          ))}
        </DetailDrawer>
      </div>
    </BottomModal>
  );
});
