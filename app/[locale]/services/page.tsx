import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getContent } from "@/lib/content";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
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
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("title") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const { services } = getContent(locale);

  const primary = services.filter((s) => !("section" in s && s.section === "secondary"));
  const secondary = services.filter((s) => "section" in s && s.section === "secondary");

  return (
    <section className="px-8 pt-[212px] pb-24">
      <div className="mx-auto max-w-[1280px]">
        <AnimatedSection>
          <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">{t("title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </AnimatedSection>

        <AnimatedGrid className="mt-12 grid gap-4 sm:grid-cols-2" staggerDelay={0.1}>
          {primary.map((service) => (
            <AnimatedGridItem key={service.slug}>
              <Link href={`/services/${service.slug}`}>
                <Card className="bg-card border-border h-full hover:shadow-card transition-shadow group">
                  <CardHeader>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription className="mt-2">{service.description}</CardDescription>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {(service.previewDeliverables ?? service.deliverables.slice(0, 3)).map((d) => (
                        <Badge key={d} variant="outline" className="text-xs">{d}</Badge>
                      ))}
                      {service.deliverables.length > (service.previewDeliverables ?? service.deliverables.slice(0, 3)).length && (
                        <Badge variant="outline" className="text-xs">+{service.deliverables.length - (service.previewDeliverables ?? service.deliverables.slice(0, 3)).length}</Badge>
                      )}
                    </div>
                    <div className="mt-4 text-sm text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
                      {t("learnMore")} <ArrowRight size={14} />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </AnimatedGridItem>
          ))}
        </AnimatedGrid>

        {/* Secondary section */}
        {secondary.length > 0 && (
          <>
            <AnimatedSection className="mt-20">
              <h2 className="text-2xl tracking-tight">{t("secondaryTitle")}</h2>
            </AnimatedSection>

            <AnimatedGrid className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
              {secondary.map((service) => (
                <AnimatedGridItem key={service.slug}>
                  <Link href={`/services/${service.slug}`}>
                    <Card className="bg-card border-border h-full hover:shadow-card transition-shadow group">
                      <CardHeader className="p-5">
                        <CardTitle className="text-base">{service.title}</CardTitle>
                        <CardDescription className="mt-1 text-sm">{service.description}</CardDescription>
                        <div className="mt-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
                          {t("learnMore")} <ArrowRight size={14} />
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                </AnimatedGridItem>
              ))}
            </AnimatedGrid>
          </>
        )}

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
