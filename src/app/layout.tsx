import "@/app/globals.css";
import type { ReactNode } from "react";
import { SWRProvider } from "@/utils/libs/swr/SWRProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="mx-auto flex min-h-dvh w-auto flex-col">
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  );
}
