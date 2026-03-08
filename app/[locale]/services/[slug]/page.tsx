import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

import servicesEn from "@/content/en/services.json";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    servicesEn.map((s) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const { services } = getContent(locale);
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Not Found" };
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const { services } = getContent(locale);
  const service = services.find((s) => s.slug === slug);

  if (!service) notFound();

  return (
    <section className="px-8 pt-32 pb-24">
      <div className="mx-auto max-w-[1280px]">
        <Link
          href="/services"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} /> {t("backToServices")}
        </Link>

        <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">{service.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{service.description}</p>

        <Separator className="my-10" />

        <p className="text-muted-foreground leading-relaxed">{service.longDescription}</p>

        <Separator className="my-10" />

        <h2 className="text-xl tracking-tight mb-4">{t("deliverables")}</h2>
        <div className="flex flex-wrap gap-2">
          {service.deliverables.map((d) => (
            <Badge key={d} variant="secondary">{d}</Badge>
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
