import "@/app/globals.css";
import type { ReactElement, ReactNode } from "react";
import { SWRProvider } from "@/utils/libs/swr/SWRProvider";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props): ReactElement {
  return (
    <html lang="ja">
      <body className="mx-auto flex min-h-dvh w-auto flex-col">
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  );
}
