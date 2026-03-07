"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../theme-toggle";

const links = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-50/80 backdrop-blur-lg dark:bg-navy-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" className="text-xl font-bold tracking-tight">
          radial<span className="text-accent-blue">.</span>
        </Link>
        <div className="hidden items-center gap-8 text-sm md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                pathname === link.href
                  ? "text-navy-950 dark:text-white"
                  : "text-navy-500 hover:text-navy-950 dark:text-navy-400 dark:hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link
            href="/contact"
            className="rounded-lg bg-navy-700 px-5 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-navy-600"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </nav>
  );
}
