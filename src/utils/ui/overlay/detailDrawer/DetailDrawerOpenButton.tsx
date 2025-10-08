import type { ComponentProps, ReactNode } from "react";
import { RightArrowIcon } from "@/utils/ui/Icon/RightArrowIcon";

type Props = {
  isSelected: boolean;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "className">;

export const DetailDrawerOpenButton = ({ isSelected, children, ...buttonProps }: Props) => {
  return (
    <button
      {...buttonProps}
      className={`relative flex h-12 w-full items-center justify-between border-x border-t px-4 text-left last:border-b ${isSelected ? "z-overlay-content border-r-0 bg-green-300" : ""}`}
      type="button"
    >
      {children}
      <RightArrowIcon
        className={`shrink-0 fill-black transition-transform duration-300 ${isSelected ? "-rotate-180" : ""}`}
      />
    </button>
  );
};
