import type { Metadata } from "next";
import { TopPage } from "@/page/top/TopPage";
import { Footer } from "@/utils/ui/structure/Footer";
import { Header } from "@/utils/ui/structure/Header";

export const metadata: Metadata = {
  title: "TOP",
  description: "TOPページ",
};

export default function Home() {
  return (
    <>
      <Header />
      <TopPage />
      <Footer />
    </>
  );
}
