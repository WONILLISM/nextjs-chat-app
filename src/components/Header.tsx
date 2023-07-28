"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import React from "react";
import Loading from "./Loading";

interface LinkOptions {
  id: number;
  title: string;
  path: string;
}
const links: LinkOptions[] = [
  { id: 1, title: "Chat", path: "/chat" },
  { id: 2, title: "About", path: "/about" },
];

const Header = () => {
  const { status } = useSession();

  if (status === "loading") return <Loading />;

  return (
    <header className="w-full h-24 fixed bg-purple-950 bg-opacity-50">
      <div className="h-full px-8 flex items-center">
        <Link href="/">Logo</Link>

        <nav className="ml-auto flex">
          {links.map((link) => (
            <Link key={link.id} className="p-2" href={link.path}>
              {link.title}
            </Link>
          ))}
          {status === "unauthenticated" ? (
            <Link href="/login" className="p-2">
              Login
            </Link>
          ) : (
            <button className="border border-black">Logout</button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
