import type { Metadata } from "next";
import { AssetPages } from "@/features/uiAsset/uiAsset.const";
import { MessageListPage } from "@/page/message/MessageListPage";
import { Footer } from "@/utils/ui/structure/Footer";
import { Header } from "@/utils/ui/structure/Header";

export const metadata: Metadata = {
  title: AssetPages["message-list"].name,
  description: AssetPages["message-list"].name,
};

export default function MessageList() {
  return (
    <>
      <Header />
      <MessageListPage />
      <Footer />
    </>
  );
}
