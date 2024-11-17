import type { ComponentProps, FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
} & Omit<ComponentProps<"button">, "className">;

export const SearchFormButton: FC<Props> = ({ children, ...props }) => {
  return (
    <button className="h-14 w-11/12 rounded-md border p-4 text-left text-black" type="button" {...props}>
      {children}
    </button>
  );
};
