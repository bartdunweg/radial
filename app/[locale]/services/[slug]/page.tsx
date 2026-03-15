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
import { VennDiagram } from "@/app/components/venn-diagram";

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
    <section className="px-8 pt-[212px] pb-24">
      <div className="mx-auto max-w-[1280px]">
        <Link
          href="/services"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} /> {t("backToServices")}
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
          {/* Main content */}
          <div>
            <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">{service.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{service.description}</p>

            <Separator className="my-10" />

            <p className="text-muted-foreground leading-relaxed">{service.longDescription}</p>

            {slug === "research-strategy" && <VennDiagram />}
          </div>

          {/* Sidebar */}
          <div className="lg:pt-[72px]">
            <h2 className="text-xl tracking-tight mb-4">{t("deliverables")}</h2>
            <div className="flex flex-wrap gap-2">
              {service.deliverables.map((d) => (
                <Badge key={d} variant="secondary">{d}</Badge>
              ))}
            </div>
          </div>
        </div>

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
