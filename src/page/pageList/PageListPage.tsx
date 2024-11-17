import type { FC } from "react";
import { UIAssetList } from "@/features/uiAsset/UIAssetList";
import type { UIAssetCardModel } from "@/features/uiAsset/uiAsset.type";

// const createPageLink = (path: string) => `/pages/${path}`;

const PageList: UIAssetCardModel[] = [];

export const PageListPage: FC = () => {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col items-center justify-between p-3">
      <h1 className="mb-4 mr-auto text-lg font-bold">ページ一覧</h1>
      {PageList.length > 0 ? <UIAssetList UIAssetList={PageList} /> : <div>現在表示可能なページはありません</div>}
    </main>
  );
};
