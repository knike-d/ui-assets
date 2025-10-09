import type { UIAssetCardModel } from "@/features/uiAsset/uiAsset.type";

const createPageLink = (path: string): string => `/pages/${path}`;
const createPartsLink = (path: string): string => `/parts/${path}`;

type PageName = "message-list";
export const AssetPages: Record<PageName, UIAssetCardModel> = {
  "message-list": {
    name: "メッセージリストページ",
    href: createPageLink("message/list"),
  },
};

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
