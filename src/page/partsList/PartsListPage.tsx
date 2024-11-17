import type { FC } from "react";
import { UIAssetList } from "@/features/uiAsset/UIAssetList";
import type { UIAssetCardModel } from "@/features/uiAsset/uiAsset.type";

const createPartsLink = (path: string) => `/parts/${path}`;

const PartsList: UIAssetCardModel[] = [
  {
    name: "エリア検索フォーム",
    href: createPartsLink("area-search-form"),
  },
];

export const PartsListPage: FC = () => {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col items-center justify-between p-3">
      <h1 className="mb-4 mr-auto text-lg font-bold">パーツ一覧</h1>
      <UIAssetList UIAssetList={PartsList} />
    </main>
  );
};
