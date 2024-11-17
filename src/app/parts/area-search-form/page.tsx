import type { Metadata } from "next";
import { AreaSearchFormPage } from "@/page/searchForm/AreaSearchFormPage";

export const metadata: Metadata = {
  title: "エリア検索フォーム",
  description: "エリア検索フォーム",
};

export default function Home() {
  return <AreaSearchFormPage />;
}
