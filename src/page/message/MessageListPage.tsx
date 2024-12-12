import { type FC } from "react";
import { AssetPages } from "@/features/uiAsset/uiAsset.const";

export const MessageListPage: FC = () => {
  return (
    <main className="mx-auto w-full max-w-2xl p-3">
      <h1 className="mb-4 mr-auto text-lg font-bold">{AssetPages["message-list"].name}</h1>
    </main>
  );
};
