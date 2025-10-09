import type { ReactElement } from "react";
import type { Metadata } from "next";
import { TopPage } from "@/page/top/TopPage";
import { Footer } from "@/utils/ui/structure/Footer";
import { Header } from "@/utils/ui/structure/Header";

export const metadata: Metadata = {
  title: "TOP",
  description: "TOPページ",
};

export default function Home(): ReactElement {
  return (
    <>
      <Header />
      <TopPage />
      <Footer />
    </>
  );
}
