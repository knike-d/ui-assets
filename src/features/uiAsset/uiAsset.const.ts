import type { UIAssetCardModel } from "@/features/uiAsset/uiAsset.type";

// const createPageLink = (path: string) => `/pages/${path}`;
const createPartsLink = (path: string) => `/parts/${path}`;

export const AssetPages: Record<string, UIAssetCardModel> = {};

type PartsName = "area-search-form" | "accordion";
export const AssetParts: Record<PartsName, UIAssetCardModel> = {
  "area-search-form": {
    name: "エリア検索フォーム",
    href: createPartsLink("area-search-form"),
  },
  accordion: {
    name: "アコーディオン",
    href: createPartsLink("accordion"),
  },
};