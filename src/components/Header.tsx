"use client";

import { signOut, useSession } from "next-auth/react";
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
    <header className="fixed w-full h-24 bg-opacity-50 bg-purple-950">
      <div className="flex items-center h-full px-8">
        <Link href="/">Logo</Link>

        <nav className="flex ml-auto">
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
            <button className="border border-black" onClick={() => signOut()}>
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
