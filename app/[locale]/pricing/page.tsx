import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getContent } from "@/lib/content";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  return { title: t("title") };
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
    <section className="px-8 pt-32 pb-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="text-center">
          <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">{t("title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Day-rate packages */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {packages.map((pkg: { slug: string; title: string; dailyRate: number; days: number; totalPrice?: number; popular?: boolean; description: string; features: string[] }) => (
            <Card
              key={pkg.slug}
              className={`bg-card border-border relative ${
                pkg.popular ? "ring-2 ring-primary" : ""
              }`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  {t("popular")}
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-lg">{pkg.title}</CardTitle>
                <CardDescription className="mt-1">{pkg.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-semibold tracking-tight">
                    &euro;{pkg.dailyRate.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">{t("perDay")}</span>
                </div>
                {pkg.totalPrice && (
                  <div className="text-sm text-muted-foreground">
                    {pkg.days} {t("days")} &middot; &euro;{pkg.totalPrice.toLocaleString()}
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <Separator className="mb-4" />
                <ul className="space-y-2.5">
                  {pkg.features.map((feature: string) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check size={16} className="mt-0.5 shrink-0 text-foreground" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <a href="mailto:hello@radial.design" className={cn(buttonVariants({ variant: pkg.popular ? "default" : "outline" }), "w-full")}>
                    {t("getStarted")}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Design Sprint */}
        <div className="mt-16">
          <Separator className="mb-16" />
          <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="text-2xl md:text-3xl tracking-tight">{sprint.title}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{sprint.description}</p>
              <div className="mt-6">
                <span className="text-3xl font-semibold tracking-tight">
                  &euro;{sprint.price.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground ml-2">{sprint.duration}</span>
              </div>
              <div className="mt-8">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">{t("sprintIncludes")}</div>
                <ul className="space-y-2.5">
                  {sprint.includes.map((item: string) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check size={16} className="mt-0.5 shrink-0 text-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <a href="mailto:hello@radial.design" className={cn(buttonVariants({ size: "lg" }))}>
                  {t("getStarted")}
                </a>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">{t("sprintProcess")}</div>
              <div className="space-y-3">
                {sprint.features.map((step: string, i: number) => (
                  <div key={i} className="rounded-lg border border-border bg-card p-4">
                    <p className="text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-lg bg-muted border border-border p-10 text-center">
          <h2 className="text-xl tracking-tight">{t("ctaTitle")}</h2>
          <p className="mt-2 text-muted-foreground text-sm">{t("ctaText")}</p>
          <div className="mt-6">
            <a href="mailto:hello@radial.design" className={cn(buttonVariants())}>
              {t("ctaCta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
