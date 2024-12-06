import type { FC, ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export const UIAssetPartsPageLayout: FC<Props> = ({ title, children }) => {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col items-center justify-between p-3">
      <h1 className="mb-4 mr-auto text-lg font-bold">{title}</h1>
      {children}
    </main>
  );
};
