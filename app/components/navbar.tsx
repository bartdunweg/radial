"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useEffect, useRef, useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
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
  const [homeVariant, setHomeVariant] = useState<"a" | "b">("b");

  // Track home variant from data attribute
  useEffect(() => {
    function read() {
      const v = document.documentElement.getAttribute("data-home-variant");
      setHomeVariant(v === "b" ? "b" : "a");
    }
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-home-variant"] });
    return () => observer.disconnect();
  }, []);

  // Dark hero = home + variant B (gradient)
  const isDarkHero = isHome && homeVariant === "b";

  // Set navbar pill bg via JS to handle dark mode + hero/content switch
  useEffect(() => {
    function applyBg() {
      if (!navRef.current) return;
      const isMobile = window.innerWidth < 768;
      const isDark = document.documentElement.classList.contains("dark");
      if (isMobile) {
        navRef.current.style.backgroundColor = "rgba(255, 255, 255, 0.85)";
      } else if (isDarkHero && !pillVisible) {
        navRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
      } else if (isDark) {
        navRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      } else {
        navRef.current.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
      }
    }
    applyBg();
    window.addEventListener("resize", applyBg);
    const observer = new MutationObserver(applyBg);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => {
      window.removeEventListener("resize", applyBg);
      observer.disconnect();
    };
  }, [pillVisible, isDarkHero]);

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
        "absolute inset-x-0 top-0 z-50 flex items-center justify-center gap-2 px-4 py-2.5 text-sm backdrop-blur-sm overflow-hidden",
        isDarkHero ? "banner-glass-dark" : "banner-glass"
      )}>
        <Sparkles size={14} className={isDarkHero ? "text-white/70" : "text-muted-foreground"} />
        <span className={cn("truncate", isDarkHero ? "text-white/70" : "text-muted-foreground")}>{t("announcement")}</span>
        <Link href="/blog" className={cn(
          "inline-flex shrink-0 items-center gap-1 whitespace-nowrap font-semibold transition-colors",
          isDarkHero ? "text-white hover:text-white/80" : "text-muted-foreground hover:text-foreground"
        )}>
          {t("readMore")}
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Top bar — scrolls with the page */}
      <div className="absolute inset-x-0 top-10 z-50 mx-auto flex max-w-[1344px] items-center justify-between px-8 pt-4">
        <Link href="/" className={cn("text-2xl font-bold tracking-tight", isDarkHero && "text-white")}>
          {homeVariant === "a" ? "Strakzat" : "Radial"}
        </Link>

        <div className="flex h-[52px] items-center gap-1">
          <LanguageSwitcher isHome={isDarkHero} />
          <ThemeToggle isHome={isDarkHero} />
          <Link
            ref={ctaRef}
            href="/contact"
            className={cn(
              buttonVariants({ variant: isDarkHero ? "outline-on-dark" : "default", size: "lg" }),
              "hidden text-sm md:inline-flex"
            )}
          >
            {t("startProject")}
          </Link>
        </div>
      </div>

      {/* Nav pill — absolute initially, fixed once announcement bar scrolls out */}
      <nav
        ref={navRef}
        className={cn(
          "left-1/2 z-50 flex h-[44px] -translate-x-1/2 items-center rounded-full px-1.5 shadow-lg backdrop-blur-sm ring-1 max-w-[calc(100vw-40px)] md:max-w-none transition-[background-color,box-shadow,ring-color] duration-300",
          "ring-black/5",
          "fixed bottom-4 md:bottom-auto",
          pillVisible
            ? "md:fixed md:top-4"
            : "md:absolute md:top-[60px]",
          isDarkHero && !pillVisible
            ? "md:ring-white/10"
            : "md:ring-black/5 md:dark:ring-white/10"
        )}
      >
        <div className="relative flex min-w-0 flex-1 items-center">
          <ul className="flex items-center overflow-x-auto scrollbar-hide">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "rounded-full px-3 h-8 flex items-center text-sm font-medium transition-colors whitespace-nowrap",
                    "text-foreground hover:bg-black/5",
                    isDarkHero && !pillVisible
                      ? "md:text-white md:hover:bg-white/10 md:hover:text-white"
                      : "md:text-foreground md:dark:text-white md:hover:bg-muted md:hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* CTA with fade — fade is glued to the left edge of the button */}
        <div className="relative flex shrink-0 items-center">
          <div className="pointer-events-none absolute bottom-0 top-0 w-8 md:hidden" style={{ right: "100%", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.85))" }} />
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "h-8 text-sm font-medium transition-all duration-300 overflow-hidden whitespace-nowrap",
              ctaHidden ? "ml-1 max-w-[200px] px-3 opacity-100" : "ml-0 max-w-0 opacity-0 px-0"
            )}
          >
            {t("startProject")}
          </Link>
        </div>
      </nav>
    </>
  );
}
