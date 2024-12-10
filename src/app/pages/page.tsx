import type { Metadata } from "next";
import { PageListPage } from "@/page/pageList/PageListPage";
import { Footer } from "@/utils/ui/structure/Footer";
import { Header } from "@/utils/ui/structure/Header";

export const metadata: Metadata = {
  title: "ページ一覧",
  description: "ページ一覧",
};

export default function PageList() {
  return (
    <>
      <Header />
      <PageListPage />
      <Footer />
    </>
  );
}
