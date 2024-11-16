import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TOP",
  description: "TOPページ",
};

export default function Home() {
  return <main className="mx-auto flex w-full max-w-2xl flex-col items-center justify-between p-24" />;
}
