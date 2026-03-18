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
import { ServiceIllustration } from "../../components/service-illustrations";

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
  const { services, expertise } = getContent(locale);

  const serviceMap = new Map(services.map((s) => [s.slug, s]));

  return (
    <section className="px-8 pt-[212px] pb-24">
      <div className="mx-auto max-w-[1280px]">
        <AnimatedSection>
          <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">{t("title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </AnimatedSection>

        {expertise.map((exp, i) => {
          const childServices = exp.services
            .map((slug: string) => serviceMap.get(slug))
            .filter(Boolean);

          return (
            <div key={exp.slug} className={i === 0 ? "mt-16" : "mt-20"}>
              <AnimatedSection>
                <div className="flex items-start justify-between gap-8">
                  <div className="max-w-2xl">
                    <h2 className="text-2xl tracking-tight">{exp.title}</h2>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{exp.description}</p>
                  </div>
                  <Link
                    href={`/services/${exp.slug}`}
                    className="shrink-0 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    {t("learnMore")} <ArrowRight size={14} />
                  </Link>
                </div>
              </AnimatedSection>

              <AnimatedGrid className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
                {childServices.map((service) => (
                  <AnimatedGridItem key={service!.slug}>
                    <Link href={`/services/${service!.slug}`}>
                      <Card className="bg-card border-border h-full hover:shadow-card transition-shadow group overflow-hidden">
                        <ServiceIllustration slug={service!.slug} className="flex items-center justify-center px-6 pt-6 pb-2" />
                        <CardHeader className="pt-0">
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
            </div>
          );
        })}

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
