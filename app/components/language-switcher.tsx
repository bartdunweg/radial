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
      className={
        isHome
          ? "flex h-[44px] w-[44px] items-center justify-center rounded-full text-sm font-semibold lowercase text-white transition-colors hover:bg-white/10"
          : "flex h-[44px] w-[44px] items-center justify-center rounded-full text-sm font-semibold lowercase text-[#535862] transition-colors hover:bg-black/5 dark:text-[#94979e] dark:hover:bg-white/10"
      }
    >
      {targetLocale}
    </Link>
  );
}
