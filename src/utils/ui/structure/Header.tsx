"use client";

import type { FC } from "react";
import Link from "next/link";

export const Header: FC = () => {
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
