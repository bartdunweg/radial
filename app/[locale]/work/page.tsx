import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getContent } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
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
        <AnimatedSection>
          <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">{t("title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </AnimatedSection>

        <div className="mt-12 space-y-16">
          {work.map((project, i) => {
            const position = i % 3;
            const isFullWidth = position === 0;
            const isLeftHalf = position === 1;

            if (isLeftHalf) {
              const rightProject = work[i + 1];
              return (
                <AnimatedGrid key={project.slug} className="grid gap-8 md:grid-cols-2" staggerDelay={0.15}>
                  <AnimatedGridItem>
                    <ProjectCard project={project} t={t} height={400} />
                  </AnimatedGridItem>
                  {rightProject && (
                    <AnimatedGridItem>
                      <ProjectCard project={rightProject} t={t} height={400} />
                    </AnimatedGridItem>
                  )}
                </AnimatedGrid>
              );
            }

            if (position === 2) return null;

            return (
              <AnimatedSection key={project.slug}>
                <ProjectCard project={project} t={t} height={500} />
              </AnimatedSection>
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
  project: { slug: string; client: string; year: string | number; title: string; description: string; services: string[] };
  t: (key: string) => string;
  height: number;
}) {
  return (
    <div>
      <div className="rounded-2xl border border-black/5 bg-[#f8f9fb] dark:border-white/10 dark:bg-[#101114]" style={{ height }} />
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
