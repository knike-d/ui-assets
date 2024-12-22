import type { FC } from "react";
import { fetchAreaSelectLocations } from "@/features/location/fetchLocation";
import { AreaSearchForm } from "@/features/searchForm/AreaSearchForm";
import { UIAssetPartsPageLayout } from "@/features/uiAsset/UIAssetPartsPageLayout";
import { AssetParts } from "@/features/uiAsset/uiAsset.const";

export const AreaSearchFormPage: FC = async () => {
  const areaSelectLocations = await fetchAreaSelectLocations();

  return (
    <UIAssetPartsPageLayout title={AssetParts["area-search-form"].name}>
      <AreaSearchForm locations={areaSelectLocations} />
    </UIAssetPartsPageLayout>
  );
};
