import type { ComponentProps, FC, ReactNode } from "react";

type Props = {
  isSelected: boolean;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "className">;

export const DetailDrawerListItemButton: FC<Props> = ({ isSelected, children, ...buttonProps }) => {
  return (
    <button
      {...buttonProps}
      className={`flex h-12 w-full items-center justify-between border-x border-t px-4 text-left last:border-b ${isSelected ? "bg-green-300" : ""}`}
      type="button"
    >
      {children}
    </button>
  );
};
