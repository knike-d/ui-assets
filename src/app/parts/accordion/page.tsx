import type { Metadata } from "next";
import { AssetParts } from "@/features/uiAsset/uiAsset.const";
import { AccordionPage } from "@/page/accordion/AccordionPage";

export const metadata: Metadata = {
  title: AssetParts.accordion.name,
  description: AssetParts.accordion.name,
};

export default function Accordion() {
  return <AccordionPage />;
}
