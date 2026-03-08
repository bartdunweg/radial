"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";


const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z"/></svg>
);


export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="sticky bottom-0 z-0 flex min-h-screen w-full flex-col justify-between bg-[#f9f9f9] text-foreground dark:bg-[#111111] dark:text-white px-8 pt-32">
      {/* Top: navigation, contact, social, legal */}
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="mb-12 grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          <div>
            <p className="max-w-[260px] text-sm leading-relaxed text-muted-foreground">
              {t("tagline")}
            </p>
          </div>

          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("navigation")}
            </div>
            <ul className="flex flex-col gap-2.5">
              <li><Link href="/work" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{nav("work")}</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{nav("services")}</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{nav("about")}</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{nav("blog")}</Link></li>
              <li><Link href="/pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{nav("pricing")}</Link></li>
            </ul>
          </div>

          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("contact")}
            </div>
            <ul className="flex flex-col gap-2.5">
              <li><a href="mailto:hello@radial.design" className="text-sm text-muted-foreground transition-colors hover:text-foreground">hello@radial.design</a></li>
              <li><a href="tel:+31639561580" className="text-sm text-muted-foreground transition-colors hover:text-foreground">+31 (6) 39 56 15 80</a></li>
            </ul>
            <div className="mt-6">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("headquarters")}</div>
              <p className="text-sm text-muted-foreground">Voorhaven 27C<br />3025 HC Rotterdam</p>
            </div>
          </div>

          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("followUs")}</div>
            <ul className="flex flex-col gap-2.5">
              <li><a href="#" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"><LinkedinIcon /> LinkedIn</a></li>
              <li><a href="#" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"><InstagramIcon /> Instagram</a></li>
            </ul>
          </div>

          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("legal")}</div>
            <ul className="flex flex-col gap-2.5">
              <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{t("privacy")}</a></li>
              <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{t("terms")}</a></li>

            </ul>
          </div>
        </div>
      </div>

      {/* Bottom: wordmark + copyright */}
      <div className="mx-auto w-full max-w-[1280px] pb-8">
        <div className="flex items-baseline justify-between">
          <span
            className="block font-bold leading-none tracking-tighter text-foreground dark:text-white"
            style={{ fontSize: "clamp(80px, 15vw, 200px)" }}
          >
            Radial
          </span>
          <span className="text-xs text-muted-foreground whitespace-nowrap">&copy;{t("copyright")}</span>
        </div>
      </div>
    </footer>
  );
}
