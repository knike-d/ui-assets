import type { ReactElement } from "react";
import type { Metadata } from "next";
import { AssetParts } from "@/features/uiAsset/uiAsset.const";
import { AreaSearchFormPage } from "@/page/searchForm/AreaSearchFormPage";

export const metadata: Metadata = {
  title: AssetParts["area-search-form"].name,
  description: AssetParts["area-search-form"].name,
};

export default function AreaSearchForm(): ReactElement {
  return <AreaSearchFormPage />;
}
