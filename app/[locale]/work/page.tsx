import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getContent } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "work" });
  return { title: t("title") };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("work");
  const { work } = getContent(locale);

  return (
    <section className="px-8 pt-32 pb-24">
      <div className="mx-auto max-w-[1280px]">
        <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">{t("title")}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>

        <div className="mt-12 space-y-0">
          {work.map((project, i) => (
            <div key={project.slug}>
              {i > 0 && <Separator />}
              <div className="py-10 grid gap-8 md:grid-cols-[1fr_280px]">
                {/* Left: project info */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary">{project.client}</Badge>
                    <span className="text-sm text-muted-foreground">{project.year}</span>
                  </div>
                  <h2 className="text-2xl tracking-tight">{project.title}</h2>
                  <p className="mt-2 text-muted-foreground">{project.description}</p>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{project.longDescription}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    <span className="text-xs text-muted-foreground mr-1">{t("services")}:</span>
                    {project.services.map((service) => (
                      <Badge key={service} variant="outline" className="text-xs">{service}</Badge>
                    ))}
                  </div>
                </div>

                {/* Right: impact metrics */}
                {project.metrics && (
                  <div className="flex flex-col gap-4 md:border-l md:border-border md:pl-8">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("impact")}</div>
                    {project.metrics.map((metric: { value: string; label: string }) => (
                      <div key={metric.label}>
                        <div className="text-2xl font-bold tracking-tight">{metric.value}</div>
                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
