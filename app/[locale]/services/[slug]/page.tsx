import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { VennDiagram } from "@/app/components/venn-diagram";
import {
  AnimatedSection,
  AnimatedGrid,
  AnimatedGridItem,
} from "@/app/components/animated-sections";

import servicesEn from "@/content/en/services.json";
import expertiseEn from "@/content/en/expertise.json";

const allSlugs = [
  ...servicesEn.map((s) => s.slug),
  ...expertiseEn.map((e) => e.slug),
];

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    allSlugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const { services, expertise } = getContent(locale);
  const exp = expertise.find((e) => e.slug === slug);
  if (exp) return { title: exp.title, description: exp.description };
  const service = services.find((s) => s.slug === slug);
  if (service) return { title: service.title, description: service.description };
  return { title: "Not Found" };
}

export default async function ServiceOrExpertisePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const { services, expertise } = getContent(locale);

  const exp = expertise.find((e) => e.slug === slug);
  if (exp) return <ExpertisePage locale={locale} expertise={exp} services={services} />;

  const service = services.find((s) => s.slug === slug);
  if (service) return <ServicePage locale={locale} slug={slug} service={service} />;

  notFound();
}

/* ------------------------------------------------------------------ */
/*  Expertise detail page                                              */
/* ------------------------------------------------------------------ */

async function ExpertisePage({
  locale,
  expertise,
  services,
}: {
  locale: string;
  expertise: { slug: string; title: string; description: string; longDescription: string; deliverables?: string[]; services: string[] };
  services: Array<{ slug: string; title: string; description: string; deliverables: string[]; previewDeliverables?: string[] }>;
}) {
  const t = await getTranslations("services");
  const childServices = expertise.services
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean);

  return (
    <section className="px-8 pt-[212px] pb-24">
      <div className="mx-auto max-w-[1280px]">
        <Link
          href="/services"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} /> {t("backToServices")}
        </Link>

        <AnimatedSection>
          <div className="max-w-2xl">
            <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">{expertise.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {expertise.longDescription}
            </p>
            {expertise.slug === "discover" && <VennDiagram />}
          </div>
        </AnimatedSection>

        <AnimatedGrid className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
          {childServices.map((service) => (
            <AnimatedGridItem key={service!.slug}>
              <Link href={`/services/${service!.slug}`}>
                <Card className="bg-card border-border h-full hover:shadow-card transition-shadow group">
                  <CardHeader>
                    <CardTitle className="text-lg">{service!.title}</CardTitle>
                    <CardDescription className="mt-2">{service!.description}</CardDescription>
                    <div className="mt-4 text-sm text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
                      {t("learnMore")} <ArrowRight size={14} />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </AnimatedGridItem>
          ))}
        </AnimatedGrid>

        {/* CTA */}
        <AnimatedSection className="py-32">
          <div className="mx-auto max-w-[680px] text-center">
            <h2 className="text-3xl font-light leading-tight tracking-tight md:text-5xl">
              {t("ctaHeadline")}
            </h2>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
                {t("ctaCta")}
              </Link>
              <Link href="/pricing" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Service detail page (existing)                                     */
/* ------------------------------------------------------------------ */

async function ServicePage({
  locale,
  slug,
  service,
}: {
  locale: string;
  slug: string;
  service: { title: string; description: string; longDescription: string; deliverables: string[]; [key: string]: unknown };
}) {
  const t = await getTranslations("services");
  const { expertise } = getContent(locale);
  const parentExpertise = expertise.find((e) => e.services.includes(slug));

  return (
    <section className="px-8 pt-[212px] pb-24">
      <div className="mx-auto max-w-[1280px]">
        <Link
          href={parentExpertise ? `/services/${parentExpertise.slug}` : "/services"}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} /> {parentExpertise ? parentExpertise.title : t("backToServices")}
        </Link>

        <div className="max-w-2xl">
          <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">{service.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{service.description}</p>

          <Separator className="my-10" />

          <p className="text-muted-foreground leading-relaxed">{service.longDescription}</p>

          {slug === "discover" && <VennDiagram />}
        </div>

        {/* Design Sprint: When to sprint + pricing */}
        {slug === "design-sprint" && "whenToSprint" in service && (
          <>
            <Separator className="my-10" />

            <h2 className="text-2xl md:text-3xl tracking-tight">When to sprint?</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {(service.whenToSprint as { title: string; description: string }[]).map((item) => (
                <div key={item.title}>
                  <h3 className="text-base font-medium tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <Separator className="my-10" />

            <DesignSprintPricing locale={locale} />
          </>
        )}

        {/* CTA */}
        <div className="py-32">
          <div className="mx-auto max-w-[680px] text-center">
            <h2 className="text-3xl font-light leading-tight tracking-tight md:text-5xl">
              {t("ctaHeadline")}
            </h2>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
                {t("ctaCta")}
              </Link>
              <Link href="/pricing" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

async function DesignSprintPricing({ locale }: { locale: string }) {
  const t = await getTranslations("pricing");
  const { pricing } = getContent(locale);
  const sprint = pricing.designSprint;

  return (
    <Card className="bg-card border-border overflow-hidden">
      <CardContent className="p-8 md:p-10">
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
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">{t("sprintProcess")}</div>
            <div className="space-y-3">
              {sprint.features.map((step: string, i: number) => (
                <div key={i} className="rounded-lg border border-border bg-[#f8f9fb] dark:bg-[#101114] p-4">
                  <p className="text-sm">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
