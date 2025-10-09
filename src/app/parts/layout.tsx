import type { ReactElement, ReactNode } from "react";
import { Footer } from "@/utils/ui/structure/Footer";
import { Header } from "@/utils/ui/structure/Header";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props): ReactElement {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
