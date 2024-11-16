"use client";

import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-emerald-500">
      <nav className="flex h-12 items-center font-bold text-white">
        <Link className="mr-auto flex h-inherit items-center px-5" href="/">
          Home
        </Link>
      </nav>
    </header>
  );
};
