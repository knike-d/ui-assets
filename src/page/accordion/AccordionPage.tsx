import type { FC } from "react";
import { UIAssetPartsPageLayout } from "@/features/uiAsset/UIAssetPartsPageLayout";
import { AssetParts } from "@/features/uiAsset/uiAsset.const";
import { Accordion } from "@/utils/ui/accordion/Accordion";

export const AccordionPage: FC = () => {
  return (
    <UIAssetPartsPageLayout title={AssetParts.accordion.name}>
      <Accordion title="タイトル">
        <div className="w-full break-words border px-6 py-2">
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。
        </div>
      </Accordion>
    </UIAssetPartsPageLayout>
  );
};
