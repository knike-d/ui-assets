import type { FC } from "react";
import { UIAssetCard } from "@/features/uiAsset/UIAssetCard";
import type { UIAssetCardModel } from "@/features/uiAsset/uiAsset.type";

type Props = {
  UIAssetList: UIAssetCardModel[];
};

export const UIAssetList: FC<Props> = ({ UIAssetList }) => {
  return (
    <div className="w-full">
      {UIAssetList.map((el) => (
        <div key={el.href} className="mb-2 last:mb-0">
          <UIAssetCard href={el.href}>{el.name}</UIAssetCard>
        </div>
      ))}
    </div>
  );
};
