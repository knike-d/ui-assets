import { Footer } from "@/utils/ui/structure/Footer";
import { Header } from "@/utils/ui/structure/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
