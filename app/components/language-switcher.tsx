"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LanguageSwitcher({ isHome = false }: { isHome?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const targetLocale = locale === "en" ? "nl" : "en";

  return (
    <Link
      href={pathname}
      locale={targetLocale}
      className={`flex h-[44px] w-[44px] items-center justify-center rounded-full text-sm font-semibold lowercase ${
        isHome
          ? "text-white btn-icon-glass-dark"
          : "text-muted-foreground btn-icon-glass"
      }`}
    >
      {targetLocale}
    </Link>
  );
}
