import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getContent } from "@/lib/content";
import { buttonVariants } from "@/components/ui/button-variants";
import {
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
  ChevronRight,
  Eye,
  Ruler,
  Route,
  FileText,
  Blocks,
  MousePointerClick,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "../../components/animated-sections";
import { ServiceCarousel } from "../../components/service-carousel";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const meta = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("title"), description: meta("servicesDescription") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const { services, expertise } = getContent(locale);

  const serviceMap = new Map(services.map((s) => [s.slug, s]));

  return (
    <section className="pt-[212px] pb-24">
      <div className="mx-auto max-w-[1280px] px-8">
        <AnimatedSection>
          <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </AnimatedSection>
      </div>

      <div className="mt-20 flex flex-col gap-20">
        {expertise.map((exp, i) => {
          const childServices = exp.services
            .map((slug: string) => serviceMap.get(slug))
            .filter(Boolean);

          return (
            <ServiceCarousel
              key={exp.slug}
              header={
                <AnimatedSection delay={i * 0.1}>
                  <p className="text-sm font-medium text-foreground/50 uppercase tracking-widest">
                    0{i + 1}
                  </p>
                  <Link
                    href={`/expertise/${exp.slug}`}
                    className="mt-2 -ml-3 inline-flex items-center gap-0.5 rounded-full px-3 py-1 text-2xl tracking-tight transition-colors hover:bg-foreground/10"
                  >
                    {exp.title}
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </Link>
                  <p className="mt-2 max-w-2xl text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </AnimatedSection>
              }
            >
              {childServices.map((service) => {
                const Icon = serviceIcons[service!.slug] ?? Search;
                return (
                  <Link
                    key={service!.slug}
                    href={`/expertise/${service!.slug}`}
                    className="group shrink-0"
                  >
                    <div className="flex h-full w-[380px] flex-col rounded-xl border border-border bg-card p-6 transition-colors duration-200 hover:bg-foreground/[0.04] dark:hover:bg-foreground/[0.08]">
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
                );
              })}
            </ServiceCarousel>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mx-auto max-w-[1280px] px-8">
        <AnimatedSection className="py-32">
          <div className="mx-auto max-w-[680px] text-center">
            <h2 className="text-3xl font-light leading-tight tracking-tight md:text-5xl">
              {t("ctaHeadline")}
            </h2>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg" }))}
              >
                {t("ctaCta")}
              </Link>
              <Link
                href="/pricing"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" })
                )}
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
