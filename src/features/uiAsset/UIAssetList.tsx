import type { FC } from "react";
import { UIAssetCard } from "@/features/uiAsset/UIAssetCard";
import type { UIAssetCardModel } from "@/features/uiAsset/uiAsset.type";

type Props = {
  UIAssetList: UIAssetCardModel[];
};

export const UIAssetList: FC<Props> = ({ UIAssetList }) => {
  return (
    <div className="flex w-full justify-center">
      {UIAssetList.map((el) => (
        <UIAssetCard key={el.href} href={el.href}>
          {el.name}
        </UIAssetCard>
      ))}
    </div>
  );
};
