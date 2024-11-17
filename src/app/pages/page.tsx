import type { Metadata } from "next";
import { PageListPage } from "@/page/pageList/PageListPage";

export const metadata: Metadata = {
  title: "ページ一覧",
  description: "ページ一覧",
};

export default function PageList() {
  return <PageListPage />;
}
