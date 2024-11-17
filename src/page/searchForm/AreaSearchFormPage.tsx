import type { FC } from "react";
import { AreaSearchForm } from "@/features/searchForm/AreaSearchForm";

export const AreaSearchFormPage: FC = () => {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col items-center justify-between p-3">
      <h1 className="mb-4 mr-auto text-lg font-bold">エリア検索フォーム</h1>
      <AreaSearchForm />
    </main>
  );
};
