"use client";
import type { FC, ReactNode } from "react";
import { SWRConfig } from "swr";
import { customFetch } from "@/utils/functions/fetchManager";

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
        fetcher: (resource, init) => customFetch(resource, init),
      }}
    >
      {children}
    </SWRConfig>
  );
};
