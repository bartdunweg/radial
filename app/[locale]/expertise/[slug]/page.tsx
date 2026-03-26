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
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Search,
  ClipboardCheck,
  Users,
  Mic,
  Zap,
  Layers,
  Compass,
  Palette,
  PaintBucket,
  Rocket,
  Presentation,
  Eye,
  Ruler,
  Route,
  FileText,
  Blocks,
  MousePointerClick,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";

const serviceIcons: Record<string, React.ElementType> = {
  "ux-ui-audit": ClipboardCheck,
  "user-testing": Users,
  "interviews": Mic,
  "stakeholder-workshops": Presentation,
  "design-sprint": Zap,
  "foundation-sprint": Compass,
  "product-vision": Eye,
  "design-principles": Ruler,
  "product-flow": Route,
  "product-design": Palette,
  "design-system": Layers,
  "brand-integration": PaintBucket,
  "design-documentation": FileText,
  "design-for-mendix": Blocks,
  "launch-mvp": Rocket,
  "high-fidelity-prototyping": MousePointerClick,
  "product-validation": BadgeCheck,
  "impact-analysis": TrendingUp,
};
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
        <nav className="mb-8 flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/expertise" className="transition-colors hover:text-foreground">
            {t("title")}
          </Link>
          <ChevronRight size={14} />
          <span className="text-foreground">{expertise.title}</span>
        </nav>

        <AnimatedSection>
          <div className="max-w-2xl">
            <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">{expertise.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {expertise.longDescription}
            </p>
            {expertise.slug === "research" && <VennDiagram />}

          </div>
        </AnimatedSection>

        <AnimatedGrid className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
          {childServices.map((service) => {
            const Icon = serviceIcons[service!.slug] ?? Search;
            return (
              <AnimatedGridItem key={service!.slug}>
                <Link href={`/expertise/${service!.slug}`} className="group">
                  <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors duration-200 hover:bg-foreground/[0.04] dark:hover:bg-foreground/[0.08]">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-muted text-foreground">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-4 text-base font-medium">
                      {service!.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {service!.description}
                    </p>
                  </div>
                </Link>
              </AnimatedGridItem>
            );
          })}
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
        <nav className="mb-8 flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/expertise" className="transition-colors hover:text-foreground">
            {t("title")}
          </Link>
          {parentExpertise && (
            <>
              <ChevronRight size={14} />
              <Link href={`/expertise/${parentExpertise.slug}`} className="transition-colors hover:text-foreground">
                {parentExpertise.title}
              </Link>
            </>
          )}
          <ChevronRight size={14} />
          <span className="text-foreground">{service.title}</span>
        </nav>

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
