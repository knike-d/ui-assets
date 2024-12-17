import type { FC, ReactNode } from "react";
import { SWRConfig } from "swr";
import { SWRProvider } from "@/utils/libs/swr/SWRProvider";

type Props = {
  children: ReactNode;
};

export const TestSWRProvider: FC<Props> = ({ children }) => {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      <SWRProvider>{children}</SWRProvider>
    </SWRConfig>
  );
};
