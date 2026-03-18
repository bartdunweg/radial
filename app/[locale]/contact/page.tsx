"use client";

import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button-variants";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { useActionState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import {
  AnimatedSection,
  AnimatedGrid,
  AnimatedGridItem,
} from "../../components/animated-sections";

const intents = ["new", "improve", "audit", "other"] as const;
type Intent = (typeof intents)[number];

export default function ContactPage() {
  const t = useTranslations("contact");
  const searchParams = useSearchParams();
  const initialIntent = (searchParams.get("intent") as Intent) || null;
  const [selectedIntent, setSelectedIntent] = useState<Intent | null>(initialIntent);
  const [state, formAction, isPending] = useActionState(submitContactForm, null);

  const intentOptions: { key: Intent; label: string; desc: string }[] = [
    { key: "new", label: t("intentNew"), desc: t("intentNewDesc") },
    { key: "improve", label: t("intentImprove"), desc: t("intentImproveDesc") },
    { key: "audit", label: t("intentAudit"), desc: t("intentAuditDesc") },
    { key: "other", label: t("intentOther"), desc: t("intentOtherDesc") },
  ];

  return (
    <section className="px-8 pt-[212px] pb-24">
      <div className="mx-auto max-w-[1280px]">
        <AnimatedSection className="max-w-xl">
          <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">{t("title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </AnimatedSection>

        {/* Intent selection */}
        <div className="mt-12">
          <h2 className="text-sm font-medium text-muted-foreground mb-4">{t("intentTitle")}</h2>
          <AnimatedGrid className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
            {intentOptions.map((option) => (
              <AnimatedGridItem key={option.key}>
                <button
                  onClick={() => setSelectedIntent(option.key)}
                  className={cn(
                    "relative rounded-2xl border p-5 text-left transition-colors w-full",
                    selectedIntent === option.key
                      ? "border-foreground bg-foreground/[0.03] dark:border-white dark:bg-white/5"
                      : "border-black/5 bg-background hover:border-black/15 dark:border-white/10 dark:hover:border-white/20"
                  )}
                >
                  {selectedIntent === option.key && (
                    <div className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-foreground dark:bg-white">
                      <Check size={12} className="text-background dark:text-black" />
                    </div>
                  )}
                  <div className="text-sm font-medium">{option.label}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{option.desc}</div>
                </button>
              </AnimatedGridItem>
            ))}
          </AnimatedGrid>
        </div>

        <Separator className="my-12" />

        <AnimatedSection className="grid gap-16 lg:grid-cols-[1fr_320px]">
          <form action={formAction} className="space-y-6">
            {selectedIntent && (
              <input type="hidden" name="intent" value={selectedIntent} />
            )}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">{t("nameLabel")}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={t("namePlaceholder")}
                  required
                  className="flex h-11 w-full rounded-full border border-border bg-white px-4 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none dark:bg-card"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">{t("emailLabel")}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  required
                  className="flex h-11 w-full rounded-full border border-border bg-white px-4 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none dark:bg-card"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium">{t("companyLabel")}</label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder={t("companyPlaceholder")}
                className="flex h-11 w-full rounded-full border border-border bg-white px-4 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none dark:bg-card"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">{t("messageLabel")}</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder={t("messagePlaceholder")}
                required
                className="flex w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none dark:bg-card"
              />
            </div>
            <button type="submit" disabled={isPending} className={cn(buttonVariants({ size: "lg" }))}>
              {isPending ? "..." : t("submit")}
            </button>
            {state?.success && (
              <p className="text-sm text-green-600">{t("submitSuccess")}</p>
            )}
            {state?.error && (
              <p className="text-sm text-red-600">{t("submitError")}</p>
            )}
          </form>

          <div>
            <Separator className="mb-8 lg:hidden" />
            <div className="space-y-6">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">{t("email")}</div>
                <a href="mailto:hello@studioradial.com" className="text-sm transition-colors hover:text-muted-foreground">
                  hello@studioradial.com
                </a>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">{t("phone")}</div>
                <a href="tel:+31639561580" className="text-sm transition-colors hover:text-muted-foreground">
                  +31 (6) 39 56 15 80
                </a>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">{t("address")}</div>
                <p className="text-sm">Voorhaven 27C<br />3025 HC Rotterdam</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
