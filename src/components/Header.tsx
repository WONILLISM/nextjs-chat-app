import Link from "next/link";

import React from "react";

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
        </nav>
      </div>
    </header>
  );
};

export default Header;
