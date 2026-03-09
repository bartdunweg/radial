import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getContent } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

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
    <section className="px-8 pt-[212px] pb-24">
      <div className="mx-auto max-w-[1280px]">
        <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">{t("title")}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>

        <div className="mt-12 space-y-16">
          {work.map((project, i) => {
            // Pattern: full width, then two side-by-side, repeat
            // i % 3 === 0 → full width
            // i % 3 === 1 or 2 → half width (paired)
            const position = i % 3;
            const isFullWidth = position === 0;
            const isLeftHalf = position === 1;

            // For half-width items, render both in a row when we hit the left one
            if (isLeftHalf) {
              const rightProject = work[i + 1];
              return (
                <div key={project.slug} className="grid gap-8 md:grid-cols-2">
                  <ProjectCard project={project} t={t} height={400} />
                  {rightProject && <ProjectCard project={rightProject} t={t} height={400} />}
                </div>
              );
            }

            // Skip right-half items (already rendered with left)
            if (position === 2) return null;

            // Full width
            return (
              <ProjectCard key={project.slug} project={project} t={t} height={500} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  t,
  height,
}: {
  project: { slug: string; client: string; year: number; title: string; description: string; services: string[] };
  t: (key: string) => string;
  height: number;
}) {
  return (
    <div>
      {/* Image placeholder */}
      <div className="rounded-2xl border border-black/5 bg-[#f8f9fb] dark:border-white/10 dark:bg-[#101114]" style={{ height }} />
      {/* Info */}
      <div className="mt-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-medium">{project.client}</span>
          <span className="text-xs text-muted-foreground">{project.year}</span>
        </div>
        <h2 className="text-[28px] md:text-[36px] font-medium tracking-tight">{project.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.services.map((service) => (
            <Badge key={service} variant="outline" className="text-xs border-border text-muted-foreground">{service}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
