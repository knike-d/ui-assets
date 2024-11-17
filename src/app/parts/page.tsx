import type { Metadata } from "next";
import { PartsListPage } from "@/page/partsList/PartsListPage";

export const metadata: Metadata = {
  title: "パーツ一覧",
  description: "パーツ一覧",
};

export default function PartsList() {
  return <PartsListPage />;
}
