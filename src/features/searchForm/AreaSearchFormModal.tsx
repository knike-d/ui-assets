"use client";
import type { ForwardedRef, ReactElement } from "react";
import { forwardRef, useId, useState } from "react";
import type { AreaSelect } from "@/features/location/location.type";
import { useFetchAreaSelectLocation } from "@/features/location/useFetchLocation.hook";
import type { SelectedArea } from "@/features/searchForm/searchForm.type";
import { AbsoluteOverlay } from "@/utils/ui/overlay/AbsoluteOverlay";
import { DetailDrawerOpenButton } from "@/utils/ui/overlay/DetailDrawer/DetailDrawerOpenButton";
import { BottomModal } from "@/utils/ui/overlay/Modal/BottomModal";
import type { OverlayContentsRef } from "@/utils/ui/overlay/useOverlayContent.hook";

type Props = {
  modalId: string;
  isModalOpen: boolean;
  selectedArea: SelectedArea | undefined;
  onClose: () => void;
};

export const AreaSearchFormModal = forwardRef(function AreaSearchFormModal(
  { modalId, isModalOpen, selectedArea, onClose }: Props,
  ref: ForwardedRef<OverlayContentsRef>,
): ReactElement {
  const { data } = useFetchAreaSelectLocation();

  const id = useId();
  const citiesDrawerId = `cities-drawer-${id}`;

  const [isSelectedPref, setIsSelectedPref] = useState<boolean>(!!selectedArea);
  const [tempSelectedArea, setTempSelectedArea] = useState<Partial<SelectedArea> | undefined>(selectedArea);

  const handleAreaSelectCancel = (): void => {
    // モーダルUIを変更前の状態にリセット
    setTempSelectedArea(selectedArea);
    setIsSelectedPref(!!selectedArea);
    onClose();
  };

  const handlePrefSelect = (prefecture: AreaSelect.Prefecture): void => {
    setIsSelectedPref(true);
    setTempSelectedArea({ prefecture });
  };

  const handlePrefSelectCancel = (): void => {
    setIsSelectedPref(false);
    setTempSelectedArea(undefined);
  };

  return (
    <BottomModal ref={ref} isOpen={isModalOpen} modalId={modalId} onClose={handleAreaSelectCancel}>
      <p className="pl-4 text-lg">エリアを選択</p>
      <div className="relative flex size-full overflow-y-auto p-4">
        <div className="w-full overflow-y-auto overscroll-y-contain">
          <div className="relative">
            <AbsoluteOverlay isOpen={isSelectedPref} onClose={handlePrefSelectCancel} />
            {data?.map((el) => (
              <div key={el.id} className="w-full">
                <p className="sticky top-0 z-10 w-full bg-gray-300 px-2 font-bold">{el.region}</p>
                {el.prefectures.map((pref) => {
                  const isSelected = pref.id === tempSelectedArea?.prefecture?.id;
                  return (
                    <DetailDrawerOpenButton
                      key={pref.kana}
                      aria-controls={citiesDrawerId}
                      disabled={!isModalOpen || (!!tempSelectedArea?.prefecture && !isSelected)}
                      isSelected={isSelected}
                      onClick={isSelectedPref ? handlePrefSelectCancel : () => handlePrefSelect(pref)}
                    >
                      <span className="truncate">{pref.name}</span>
                    </DetailDrawerOpenButton>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </BottomModal>
  );
});
