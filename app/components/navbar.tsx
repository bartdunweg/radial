"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useEffect, useRef, useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";

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
    { href: "/projects" as const, label: t("work") },
    { href: "/expertise" as const, label: t("services") },
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

  // Dark hero = home + variant B (gradient) — used for announcement bar + top bar only
  const isDarkHero = isHome && homeVariant === "b";

  // Detect if nav pill is over a dark background by sampling the actual color
  const [isOverDark, setIsOverDark] = useState(false);

  useEffect(() => {
    function getLuminance(r: number, g: number, b: number) {
      const [rs, gs, bs] = [r, g, b].map((c) => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    function parseColor(str: string): [number, number, number, number] | null {
      const match = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (!match) return null;
      return [+match[1], +match[2], +match[3], match[4] !== undefined ? +match[4] : 1];
    }

    function parseHex(hex: string): [number, number, number] {
      return [
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16),
      ];
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function getGradientColorAtPosition(bgImg: string, progress: number): [number, number, number] | null {
      // Parse all color stops: hex or rgba with percentage
      const stops: { color: [number, number, number]; pos: number }[] = [];
      const re = /(?:#([0-9a-fA-F]{6})|rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\))\s*(\d+)%/g;
      let m;
      while ((m = re.exec(bgImg)) !== null) {
        const color: [number, number, number] = m[1]
          ? parseHex(m[1])
          : [+m[2], +m[3], +m[4]];
        stops.push({ color, pos: +m[5] / 100 });
      }
      if (stops.length === 0) return null;

      // Clamp progress and interpolate between stops
      const p = Math.max(0, Math.min(1, progress));
      if (p <= stops[0].pos) return stops[0].color;
      if (p >= stops[stops.length - 1].pos) return stops[stops.length - 1].color;

      for (let i = 0; i < stops.length - 1; i++) {
        if (p >= stops[i].pos && p <= stops[i + 1].pos) {
          const t = (p - stops[i].pos) / (stops[i + 1].pos - stops[i].pos);
          return [
            Math.round(lerp(stops[i].color[0], stops[i + 1].color[0], t)),
            Math.round(lerp(stops[i].color[1], stops[i + 1].color[1], t)),
            Math.round(lerp(stops[i].color[2], stops[i + 1].color[2], t)),
          ];
        }
      }
      return stops[0].color;
    }

    function getElementColor(el: Element, navY: number): [number, number, number] | null {
      const style = getComputedStyle(el);

      // Check background-color first
      const bg = style.backgroundColor;
      if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
        const color = parseColor(bg);
        if (color && color[3] > 0.1) return [color[0], color[1], color[2]];
      }

      // Check background-image for gradients — interpolate based on nav position
      const bgImg = style.backgroundImage;
      if (bgImg && bgImg !== "none") {
        const rect = el.getBoundingClientRect();
        const progress = rect.height > 0 ? (navY - rect.top) / rect.height : 0;
        const color = getGradientColorAtPosition(bgImg, progress);
        if (color) return color;
      }

      return null;
    }

    function sampleBackground(): boolean {
      const nav = navRef.current;
      if (!nav) return false;

      const navRect = nav.getBoundingClientRect();
      const x = navRect.left + navRect.width / 2;
      const y = navRect.top + navRect.height / 2;

      // Get all elements at this point
      const elements = document.elementsFromPoint(x, y);

      // Find the first element with a background that's NOT the nav or its children
      for (const el of elements) {
        if (nav.contains(el)) continue;

        let current: Element | null = el;
        while (current && current !== document.documentElement) {
          const color = getElementColor(current, y);
          if (color) {
            return getLuminance(color[0], color[1], color[2]) < 0.4;
          }
          current = current.parentElement;
        }
      }

      return false; // default: light
    }

    let rafId: number;
    function check() {
      setIsOverDark(sampleBackground());
    }

    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(check);
    }

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Re-check when dark mode class changes
    const mo = new MutationObserver(() => requestAnimationFrame(check));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-home-variant"] });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mo.disconnect();
    };
  }, [pathname]);

  // Set navbar pill bg via JS to handle dark mode + content switch
  useEffect(() => {
    function applyBg() {
      if (!navRef.current) return;
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        navRef.current.style.backgroundColor = "rgba(255, 255, 255, 0.85)";
      } else if (isOverDark) {
        navRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
      } else {
        navRef.current.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
      }
    }
    applyBg();
    window.addEventListener("resize", applyBg);
    return () => {
      window.removeEventListener("resize", applyBg);
    };
  }, [isOverDark]);

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
        "absolute inset-x-0 top-0 z-50 flex items-center justify-center gap-2 px-4 py-2.5 text-sm overflow-hidden",
        isDarkHero ? "banner-dark" : "banner-light"
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
        data-nav-light={!isOverDark || undefined}
        className={cn(
          "left-1/2 z-50 flex h-[44px] -translate-x-1/2 items-center rounded-full px-1.5 shadow-lg backdrop-blur-sm ring-1 max-w-[calc(100vw-40px)] md:max-w-none transition-[background-color,box-shadow,ring-color] duration-300",
          "ring-black/5",
          "fixed bottom-4 md:bottom-auto",
          pillVisible
            ? "md:fixed md:top-4"
            : "md:absolute md:top-[60px]",
          isOverDark
            ? "md:ring-white/10"
            : "md:ring-black/5"
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
                    isOverDark
                      ? "md:text-white md:hover:bg-white/10 md:hover:text-white"
                      : "md:text-[#0A0A0A] md:hover:bg-black/5 md:hover:text-[#0A0A0A]"
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
              buttonVariants({ variant: isOverDark ? "outline-on-dark" : "default", size: "sm" }),
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
