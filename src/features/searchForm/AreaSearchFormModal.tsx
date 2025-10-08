"use client";
import type { FC, ForwardedRef } from "react";
import { Fragment, useId, useState } from "react";
import type { AreaSelect } from "@/features/location/location.type";
import type { SelectedArea } from "@/features/searchForm/searchForm.type";
import { AbsoluteOverlay } from "@/utils/ui/overlay/AbsoluteOverlay";
import { DetailDrawer } from "@/utils/ui/overlay/DetailDrawer/DetailDrawer";
import { DetailDrawerListItemButton } from "@/utils/ui/overlay/DetailDrawer/DetailDrawerListItemButton";
import { DetailDrawerOpenButton } from "@/utils/ui/overlay/DetailDrawer/DetailDrawerOpenButton";
import { BottomModal } from "@/utils/ui/overlay/Modal/BottomModal";
import type { OverlayContentsRef } from "@/utils/ui/overlay/useOverlay";
import type { City } from "@prisma/client";

type Props = {
  modalId: string;
  isModalOpen: boolean;
  selectedArea: SelectedArea | undefined;
  locations: AreaSelect.Region[];
  onSelect: (selectedArea: SelectedArea) => void;
  onClose: () => void;
  ref: ForwardedRef<OverlayContentsRef>;
};

export const AreaSearchFormModal: FC<Props> = ({
  modalId,
  isModalOpen,
  selectedArea,
  locations,
  onSelect,
  onClose,
  ref,
}) => {
  const id = useId();

  const [isDrawerOpen, setIsDrawerOpen] = useState(!!selectedArea);
  const [tempSelectedArea, setTempSelectedArea] = useState<Partial<SelectedArea> | undefined>(selectedArea);
  const selectedTempPref = tempSelectedArea?.prefecture;

  const handleAreaSelectCancel = (): void => {
    // モーダルUIを変更前の状態にリセット
    setIsDrawerOpen(!!selectedArea);
    setTempSelectedArea(selectedArea);
    onClose();
  };

  const handlePrefSelect = (prefecture: AreaSelect.Prefecture | undefined) => (): void => {
    setIsDrawerOpen(!!prefecture);
    setTempSelectedArea({ prefecture });
  };

  const handleCitySelect = (city: City) => (): void => {
    if (!selectedTempPref) {
      setIsDrawerOpen(false);
      alert("都道府県が選択されていません");
      return;
    }
    setTempSelectedArea((prev) => ({ ...prev, city }));
    onSelect({ prefecture: selectedTempPref, city });
    onClose();
  };

  return (
    <BottomModal ref={ref} isOpen={isModalOpen} modalId={modalId} onClose={handleAreaSelectCancel}>
      <p className="pl-4 text-lg">エリアを選択</p>
      <div className="relative flex size-full overflow-y-auto p-4">
        <div className={`w-full ${selectedTempPref ? "overflow-hidden" : "overflow-y-auto overscroll-y-contain"}`}>
          <div className="relative">
            <AbsoluteOverlay isOpen={isDrawerOpen} onClose={handlePrefSelect(undefined)} />
            {locations.map((el) => (
              <Fragment key={el.id}>
                <p className="sticky top-0 z-10 w-full bg-gray-300 px-2 font-bold">{el.region}</p>
                {el.prefectures.map((pref) => (
                  <DetailDrawerOpenButton
                    key={pref.id}
                    aria-controls={id}
                    aria-label={pref.id === selectedTempPref?.id ? "都道府県選択に戻る" : undefined}
                    disabled={selectedTempPref && pref.id !== selectedTempPref.id}
                    isSelected={pref.id === selectedTempPref?.id}
                    onClick={handlePrefSelect(isDrawerOpen ? undefined : pref)}
                  >
                    <span className="truncate">{pref.name}</span>
                  </DetailDrawerOpenButton>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
        <DetailDrawer drawerId={id} isOpen={isDrawerOpen} onClose={handlePrefSelect(undefined)}>
          {tempSelectedArea?.prefecture?.groupedCities.map(({ columnName, cities }) => (
            <Fragment key={columnName}>
              <p className="sticky top-0 z-10 w-full bg-gray-300 px-2 font-bold">{columnName}</p>
              {cities.map((city) => (
                <DetailDrawerListItemButton
                  key={city.id}
                  isSelected={city.id === tempSelectedArea.city?.id}
                  onClick={handleCitySelect(city)}
                >
                  <span className="truncate">{city.name}</span>
                </DetailDrawerListItemButton>
              ))}
            </Fragment>
          ))}
        </DetailDrawer>
      </div>
    </BottomModal>
  );
};
