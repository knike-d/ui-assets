import type { FC } from "react";
import { UIAssetLargeCard } from "@/features/uiAsset/UIAssetLargeCard";

export const TopPage: FC = () => {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col items-center justify-between p-3">
      <div className="w-full">
        <h1 className="text-lg font-bold">これまでに作成したUIの一覧</h1>
        <div className="mt-20 grid grid-cols-2 gap-4">
          <UIAssetLargeCard href="/pages">ページ</UIAssetLargeCard>
          <UIAssetLargeCard href="/parts">パーツ</UIAssetLargeCard>
        </div>
      </div>
    </main>
  );
};
