"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Sparkles, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [ctaHidden, setCtaHidden] = useState(false);
  const [pillVisible, setPillVisible] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const announcementRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "/work" as const, label: t("work") },
    { href: "/services" as const, label: t("services") },
    { href: "/about" as const, label: t("about") },
    { href: "/blog" as const, label: t("blog") },
    { href: "/pricing" as const, label: t("pricing") },
  ];

  const isHome = pathname === "/";

  // Set navbar pill bg via JS to handle dark mode + hero/content switch
  useEffect(() => {
    function applyBg() {
      if (!navRef.current) return;
      const isDark = document.documentElement.classList.contains("dark");
      if (isHome && !pillVisible) {
        // Home hero (dark bg)
        navRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
      } else {
        // Content area or non-home pages
        navRef.current.style.backgroundColor = isDark
          ? "rgba(0, 0, 0, 0.5)"
          : "rgba(255, 255, 255, 0.5)";
      }
    }
    applyBg();
    const observer = new MutationObserver(applyBg);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [pillVisible, isHome]);

  // Show pill after announcement bar scrolls out of view
  useEffect(() => {
    const el = announcementRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setPillVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Watch when the top-bar CTA scrolls out of view
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setCtaHidden(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Announcement bar — scrolls with the page */}
      <div ref={announcementRef} className={cn(
        "absolute inset-x-0 top-0 z-50 flex items-center justify-center gap-2 border-b px-4 py-2.5 text-sm backdrop-blur-sm",
        isHome
          ? "border-white/10 bg-white/5"
          : "border-black/5 bg-white/50 dark:border-white/5 dark:bg-white/5"
      )}>
        <Sparkles size={14} className={isHome ? "text-white/70" : "text-muted-foreground dark:text-white/70"} />
        <span className={isHome ? "text-white/70" : "text-muted-foreground dark:text-white/70"}>{t("announcement")}</span>
        <Link href="/blog" className={cn(
          "inline-flex items-center gap-1 font-semibold transition-colors",
          isHome ? "text-white hover:text-white/80" : "text-foreground hover:text-accent dark:text-white"
        )}>
          {t("readMore")}
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Top bar — scrolls with the page */}
      <div className={cn(
        "absolute inset-x-0 top-10 z-50 mx-auto flex max-w-[1344px] items-center justify-between px-8 pt-4",
        isHome && "text-white"
      )}>
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Radial
        </Link>

        <div className="flex h-[52px] items-center gap-1">
          <LanguageSwitcher isHome={isHome} />
          <ThemeToggle isHome={isHome} />
          <Link
            ref={ctaRef}
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "hidden h-[44px] rounded-full px-6 text-sm font-medium md:inline-flex",
              isHome && "bg-white !text-[#0A0A0A] hover:bg-white/90"
            )}
          >
            {t("startProject")}
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full md:hidden",
                isHome ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Menu size={20} />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="text-lg font-bold">Radial</SheetTitle>
              <nav className="mt-8 flex flex-col gap-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-base transition-colors hover:text-foreground ${
                      pathname.startsWith(link.href) ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className={cn(buttonVariants(), "mt-4")}
                >
                  {t("startProject")}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Nav pill — absolute initially, fixed once announcement bar scrolls out */}
      <nav
        ref={navRef}
        className={cn(
          "left-1/2 z-50 hidden h-[44px] -translate-x-1/2 items-center rounded-full px-1.5 shadow-lg backdrop-blur-sm ring-1 md:flex transition-all duration-300",
          isHome
            ? (pillVisible
              ? "fixed top-4 ring-black/10 dark:ring-white/10"
              : "absolute top-[60px] ring-white/10")
            : "fixed top-4 ring-black/10 dark:ring-white/10"
        )}
      >
        <ul className="flex items-center">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "rounded-full px-3 h-8 flex items-center text-sm font-medium transition-colors",
                  isHome && !pillVisible
                    ? "text-white hover:bg-white/10 hover:text-white"
                    : "text-foreground dark:text-white hover:bg-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* CTA inside pill — appears when top-bar CTA scrolls out of view */}
        <Link
          href="/contact"
          className={cn(
            buttonVariants({ size: "sm" }),
            "h-8 text-sm font-medium transition-all duration-300 overflow-hidden whitespace-nowrap",
            ctaHidden ? "ml-1 max-w-[200px] px-3 opacity-100" : "ml-0 max-w-0 opacity-0 px-0 border-0"
          )}
        >
          {t("startProject")}
        </Link>
      </nav>
    </>
  );
}
