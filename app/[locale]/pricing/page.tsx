import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getContent } from "@/lib/content";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { FaqAccordion } from "../../components/faq-accordion";
import {
  AnimatedSection,
  AnimatedGrid,
  AnimatedGridItem,
} from "../../components/animated-sections";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  const meta = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("title"), description: meta("pricingDescription") };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pricing");
  const { pricing } = getContent(locale);

  const packages = pricing.packages;
  const sprint = pricing.designSprint;

  return (
    <section className="px-8 pt-[212px] pb-24">
      <div className="mx-auto max-w-[1280px]">
        <AnimatedSection className="text-center">
          <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">{t("title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </AnimatedSection>

        {/* Day-rate packages */}
        <AnimatedGrid className="mt-12 grid gap-6 md:grid-cols-3" staggerDelay={0.1}>
          {packages.map((pkg: { slug: string; title: string; dailyRate: number; days: number; discount?: string; popular?: boolean; description: string }) => (
            <AnimatedGridItem key={pkg.slug}>
              <Card
                className={cn(
                  "relative h-full overflow-visible flex flex-col gap-0 p-8 py-8",
                  "bg-card border-border"
                )}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg font-semibold">{pkg.title}</CardTitle>
                    {pkg.discount && (
                      <Badge variant="secondary">{pkg.discount}</Badge>
                    )}
                    {pkg.popular && (
                      <Badge variant="outline" className="border-[#0A0A0A] bg-[#0A0A0A] text-white dark:border-white dark:bg-white dark:text-[#0A0A0A]">{t("popular")}</Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm line-clamp-2 text-muted-foreground">{pkg.description}</p>
                  <div className="mt-3">
                    <span className="text-[40px] font-semibold tracking-tight" style={{ fontFamily: "var(--font-satoshi), sans-serif" }}>
                      <span className="text-xl align-super relative top-1">€</span> {pkg.dailyRate.toLocaleString()}
                    </span>
                    <span className="text-sm ml-1 text-muted-foreground">{t("perDay")}</span>
                  </div>
                </div>
                <div className="mt-8">
                  <Link href="/contact" className={cn(buttonVariants({ variant: pkg.popular ? "default" : "outline", size: "lg" }), "w-full")}>
                    {t("getStarted")}
                  </Link>
                </div>
              </Card>
            </AnimatedGridItem>
          ))}
        </AnimatedGrid>

        {/* Design Sprint */}
        <AnimatedSection className="mt-16">
          <Card data-inverted className="bg-foreground text-background border-foreground overflow-hidden gap-0 p-0">
            <CardContent className="p-8">
              {/* Header: title left, price right */}
              <div className="flex items-end justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-background">{sprint.title}</CardTitle>
                  <p className="mt-1 text-sm text-background/60 leading-relaxed max-w-2xl">
                    {sprint.description}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[40px] font-semibold tracking-tight leading-none" style={{ fontFamily: "var(--font-satoshi), sans-serif" }}>
                    <span className="text-xl align-super relative top-1">€</span> {sprint.price.toLocaleString()}
                  </span>
                  <div className="flex flex-col text-sm text-background/60">
                    <span>{sprint.duration}</span>
                    <span>{sprint.facilitated}</span>
                  </div>
                </div>
              </div>

              {/* Deliverables per day */}
              <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
                {sprint.days.map((day: { title: string; deliverables: string[] }, i: number) => (
                  <div key={i} className={cn(i > 0 && "border-l border-background/10 pl-6")}>
                    <p className="text-xs font-semibold mb-1">{t("day")} {i + 1}</p>
                    <p className="text-base font-semibold mb-2">{day.title}</p>
                    <ul className="space-y-1.5">
                      {day.deliverables.map((item: string) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-background/60">
                          <Check size={14} className="mt-0.5 shrink-0 text-background" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex gap-3">
                <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "bg-background text-foreground hover:bg-background/90")}>
                  {t("getStarted")}
                </Link>
                <Link href="/services/design-sprint" className={cn(buttonVariants({ variant: "ghost-light", size: "lg" }))}>
                  {t("readMore")}
                </Link>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* FAQ */}
        <AnimatedSection className="mt-16">
          <Separator className="mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
            <div>
              <h2 className="text-[28px] md:text-[36px] tracking-tight">{t("faqTitle")}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("faqSubtitle")}</p>
            </div>
            <FaqAccordion
              items={[
                { q: t("faq1Q"), a: t("faq1A") },
                { q: t("faq2Q"), a: t("faq2A") },
                { q: t("faq3Q"), a: t("faq3A") },
                { q: t("faq4Q"), a: t("faq4A") },
                { q: t("faq5Q"), a: t("faq5A") },
                { q: t("faq6Q"), a: t("faq6A") },
              ]}
            />
          </div>
        </AnimatedSection>

        {/* CTA — aligned with FAQ right column */}
        <AnimatedSection className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
            <div />
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{t("ctaHeadline")}</h2>
              <Link
                href="/contact"
                className="group inline-flex h-11 items-center gap-3 rounded-full bg-foreground pr-6 pl-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                <img
                  src="/team/jasper.png"
                  alt={t("ctaContact")}
                  width={36}
                  height={36}
                  className="h-7 w-7 rounded-full object-cover"
                />
                {t("ctaButton")}
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: t("faq1Q"), acceptedAnswer: { "@type": "Answer", text: t("faq1A") } },
              { "@type": "Question", name: t("faq2Q"), acceptedAnswer: { "@type": "Answer", text: t("faq2A") } },
              { "@type": "Question", name: t("faq3Q"), acceptedAnswer: { "@type": "Answer", text: t("faq3A") } },
              { "@type": "Question", name: t("faq4Q"), acceptedAnswer: { "@type": "Answer", text: t("faq4A") } },
              { "@type": "Question", name: t("faq5Q"), acceptedAnswer: { "@type": "Answer", text: t("faq5A") } },
              { "@type": "Question", name: t("faq6Q"), acceptedAnswer: { "@type": "Answer", text: t("faq6A") } },
            ],
          }),
        }}
      />
    </section>
  );
}
