"use client";

import { useId, type FC } from "react";
import { useFetchStore } from "@/features/store/useFetchStore";
import { HamburgerMenuIcon } from "@/utils/ui/Icon/HamburgerMenuIcon";
import { LeftArrowIcon } from "@/utils/ui/Icon/LeftArrowIcon";
import { CommonDrawer } from "@/utils/ui/overlay/drawer/CommonDrawer";
import { useOverlayContent } from "@/utils/ui/overlay/useOverlay";

type Props = {
  storeId: string;
};

export const MessageDetailPageHeader: FC<Props> = ({ storeId }) => {
  const { data } = useFetchStore(storeId);
  const { isOpen, overlayRef, handleOverlayOpen, handleOverlayClose } = useOverlayContent();
  const id = useId();

  const handleBackButton = () => {
    history.back();
  };

  return (
    <header className="w-full border-b bg-white">
      <nav className="flex h-12 items-center font-bold">
        <button className="flex h-inherit items-center px-4" type="button" onClick={handleBackButton}>
          <LeftArrowIcon />
        </button>
        <span className="mr-auto">{data?.name}</span>
        <button
          aria-controls={id}
          aria-expanded={isOpen}
          aria-label="サイドメニューを開く"
          className="h-inherit px-4"
          type="button"
          onClick={handleOverlayOpen}
        >
          <HamburgerMenuIcon className="fill-black" />
        </button>
        <CommonDrawer ref={overlayRef} drawerContentsId={id} isOpen={isOpen} onClose={handleOverlayClose} />
      </nav>
    </header>
  );
};
