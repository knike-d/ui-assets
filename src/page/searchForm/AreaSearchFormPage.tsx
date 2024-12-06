import type { FC } from "react";
import { AreaSearchForm } from "@/features/searchForm/AreaSearchForm";
import { UIAssetPartsPageLayout } from "@/features/uiAsset/UIAssetPartsPageLayout";
import { AssetParts } from "@/features/uiAsset/uiAsset.const";

export const AreaSearchFormPage: FC = () => {
  return (
    <UIAssetPartsPageLayout title={AssetParts["area-search-form"].name}>
      <AreaSearchForm />
    </UIAssetPartsPageLayout>
  );
};
