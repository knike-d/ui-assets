import type { Metadata } from "next";
import { TopPage } from "@/page/top/TopPage";

export const metadata: Metadata = {
  title: "TOP",
  description: "TOPページ",
};

export default function Home() {
  return <TopPage />;
}
