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
                  "relative h-full overflow-visible",
                  pkg.popular
                    ? "bg-foreground text-background border-foreground"
                    : "bg-card border-border"
                )}
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CardTitle className={cn("text-sm font-medium", pkg.popular && "text-background")}>{pkg.title}</CardTitle>
                    {pkg.discount && (
                      <Badge variant={pkg.popular ? "outline" : "secondary"} className={cn(pkg.popular && "border-background/20 text-background")}>{pkg.discount}</Badge>
                    )}
                    {pkg.popular && (
                      <Badge className="bg-background text-foreground hover:bg-background/90">{t("popular")}</Badge>
                    )}
                  </div>
                  <div className="mt-3">
                    <span className="text-[40px] font-semibold tracking-tight" style={{ fontFamily: "var(--font-satoshi), sans-serif" }}>
                      <span className="text-xl align-super relative top-1">€</span> {pkg.dailyRate.toLocaleString()}
                    </span>
                    <span className={cn("text-sm ml-1", pkg.popular ? "text-background/60" : "text-muted-foreground")}>{t("perDay")}</span>
                  </div>
                  <CardDescription className={cn("mt-1", pkg.popular && "text-background/60")}>{pkg.description}</CardDescription>
                  <div className="mt-4">
                    <Link href="/contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full")}>
                      {t("getStarted")}
                    </Link>
                  </div>
                </CardHeader>
              </Card>
            </AnimatedGridItem>
          ))}
        </AnimatedGrid>

        {/* Design Sprint */}
        <AnimatedSection className="mt-16">
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-8 md:p-10">
              {/* Header: title left, price right */}
              <div className="flex items-start justify-between">
                <h2 className="text-2xl md:text-3xl tracking-tight">{sprint.title}</h2>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col text-sm text-muted-foreground text-right">
                    <span>{sprint.duration}</span>
                    <span>{sprint.includes[0]}</span>
                  </div>
                  <span className="text-[40px] font-semibold tracking-tight leading-none" style={{ fontFamily: "var(--font-satoshi), sans-serif" }}>
                    <span className="text-xl align-super relative top-1">€</span> {sprint.price.toLocaleString()}
                  </span>
                  <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
                    {t("getStarted")}
                  </Link>
                </div>
              </div>

              <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl">
                {sprint.description} {t("sprintIncludes")}: {sprint.includes.join(", ")}.
              </p>

              {/* Process — horizontal */}
              <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
                {sprint.features.map((step: string, i: number) => {
                  const [dayPart, ...rest] = step.split(" — ");
                  const title = dayPart.replace(/^(Day|Dag)\s+\d+:\s*/, "");
                  const description = rest.join(" — ");
                  return (
                    <div key={i}>
                      <div className="flex h-8 items-center justify-center rounded-full border border-border text-xs font-semibold mb-3 px-3 w-fit">
                        {t("day")} {i + 1}
                      </div>
                      <p className="text-sm font-medium">{title}</p>
                      {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* FAQ */}
        <AnimatedSection className="mt-16">
          <Separator className="mb-16" />
          <h2 className="text-[28px] md:text-[36px] tracking-tight mb-10">{t("faqTitle")}</h2>
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
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection className="py-32">
          <div className="mx-auto max-w-[680px] text-center">
            <h2 className="text-3xl font-light leading-tight tracking-tight md:text-5xl">
              {t("ctaHeadline")}
            </h2>
            <div className="mt-10 flex items-center justify-center">
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
