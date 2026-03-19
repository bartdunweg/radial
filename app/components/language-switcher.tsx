"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const targetLocale = locale === "en" ? "nl" : "en";
  const label = targetLocale === "nl" ? "NL" : "EN";

  return (
    <Link
      href={pathname}
      locale={targetLocale}
      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/20"
    >
      <Globe size={14} />
      {label}
    </Link>
  );
}
