import "@/app/globals.css";
import { SWRProvider } from "@/utils/libs/swr/SWRProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="mx-auto flex min-h-dvh w-auto flex-col">
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  );
}
