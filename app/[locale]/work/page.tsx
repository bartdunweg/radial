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
  const { work, services } = getContent(locale);

  // Map service display names to slugs for linking
  const serviceSlugMap = new Map(services.map((s) => [s.title, s.slug]));

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
                    <ProjectCard project={project} t={t} height={400} serviceSlugMap={serviceSlugMap} />
                  </AnimatedGridItem>
                  {rightProject && (
                    <AnimatedGridItem>
                      <ProjectCard project={rightProject} t={t} height={400} serviceSlugMap={serviceSlugMap} />
                    </AnimatedGridItem>
                  )}
                </AnimatedGrid>
              );
            }

            if (position === 2) return null;

            return (
              <AnimatedSection key={project.slug}>
                <ProjectCard project={project} t={t} height={500} serviceSlugMap={serviceSlugMap} />
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
  serviceSlugMap,
}: {
  project: { slug: string; client: string; year: string | number; title: string; description: string; services: string[]; metrics?: { value: string; label: string }[] };
  t: (key: string) => string;
  height: number;
  serviceSlugMap: Map<string, string>;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="rounded-2xl border border-black/5 bg-[#f8f9fb] dark:border-white/10 dark:bg-[#101114]" style={{ height }} />
      <div className="mt-4 flex flex-1 flex-col">
        <div className="mb-2">
          <span className="text-sm font-medium">{project.client}</span>
        </div>
        <h2 className="text-[28px] md:text-[36px] font-medium tracking-tight">{project.title}</h2>
        <p className="mt-3 flex-1 text-base text-muted-foreground line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-5">
          {project.services.map((service) => {
            const slug = serviceSlugMap.get(service);
            return slug ? (
              <Link key={service} href={`/services/${slug}`}>
                <Badge variant="outline" className="text-xs border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors cursor-pointer h-auto py-1.5 px-3">{service}</Badge>
              </Link>
            ) : (
              <Badge key={service} variant="outline" className="text-xs border-border text-muted-foreground h-auto py-1.5 px-3">{service}</Badge>
            );
          })}
        </div>
        {project.metrics && project.metrics.length > 0 && (
          <>
            <div className="mt-5 h-px bg-black/5 dark:bg-white/10" />
            <div className="flex gap-6 mt-5">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <div className="text-2xl font-semibold tracking-tight">{metric.value}</div>
                  <div className="text-xs text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
