import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getContent } from "@/lib/content";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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

  return (
    <section className="px-8 pt-32 pb-24">
      <div className="mx-auto max-w-[1280px]">
        <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">{t("title")}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`}>
              <Card className="bg-card border-border h-full hover:shadow-card transition-shadow group">
                <CardHeader>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription className="mt-2">{service.description}</CardDescription>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {service.deliverables.slice(0, 3).map((d) => (
                      <Badge key={d} variant="outline" className="text-xs">{d}</Badge>
                    ))}
                    {service.deliverables.length > 3 && (
                      <Badge variant="outline" className="text-xs">+{service.deliverables.length - 3}</Badge>
                    )}
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
                    {t("learnMore")} <ArrowRight size={14} />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

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
