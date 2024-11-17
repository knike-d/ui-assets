"use client";
import type { FC, ReactNode } from "react";
import { SWRConfig } from "swr";

type Props = {
  children: ReactNode;
};

export const SWRProvider: FC<Props> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        errorRetryCount: 1,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
};
