import type { FC } from "react";
import { AreaSearchForm } from "@/features/searchForm/AreaSearchForm";
import { UIAssetPartsPageLayout } from "@/features/uiAsset/UIAssetPartsPageLayout";

export const AreaSearchFormPage: FC = () => {
  return (
    <UIAssetPartsPageLayout title="アコーディオン">
      <AreaSearchForm />
    </UIAssetPartsPageLayout>
  );
};
