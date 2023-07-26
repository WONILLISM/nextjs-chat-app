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
    <header>
      <Link href="/">Logo</Link>

      <nav>
        {links.map((link) => (
          <Link key={link.id} href={link.path}>
            {link.title}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
