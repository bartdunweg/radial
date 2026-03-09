import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";
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
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const approaches = [
    { title: t("approachResearch"), text: t("approachResearchText") },
    { title: t("approachDesign"), text: t("approachDesignText") },
    { title: t("approachAI"), text: t("approachAIText") },
    { title: t("approachIterate"), text: t("approachIterateText") },
  ];

  return (
    <section className="px-8 pt-[212px] pb-24">
      <div className="mx-auto max-w-[1280px]">
        <AnimatedSection>
          <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">{t("title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t("subtitle")}</p>
        </AnimatedSection>

        {/* Image slider */}
        <AnimatedSection delay={0.2} className="mt-12 -mx-8">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide px-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-[400px] w-[600px] shrink-0 rounded-2xl border border-black/5 bg-[#f8f9fb] dark:border-white/10 dark:bg-[#101114]"
              />
            ))}
          </div>
        </AnimatedSection>

        <Separator className="my-12" />

        <AnimatedSection>
          <h2 className="text-2xl tracking-tight">{t("storyTitle")}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">{t("storyText")}</p>
        </AnimatedSection>

        <Separator className="my-12" />

        <AnimatedSection>
          <h2 className="text-2xl tracking-tight mb-8">{t("approachTitle")}</h2>
        </AnimatedSection>
        <AnimatedGrid className="grid gap-8 sm:grid-cols-2" staggerDelay={0.1}>
          {approaches.map((item) => (
            <AnimatedGridItem key={item.title}>
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </AnimatedGridItem>
          ))}
        </AnimatedGrid>

        <Separator className="my-12" />

        <AnimatedSection>
          <h2 className="text-2xl tracking-tight mb-8">{t("teamTitle")}</h2>
        </AnimatedSection>
        <AnimatedGrid className="grid gap-8 sm:grid-cols-3" staggerDelay={0.12}>
          {[
            { initials: "BD", name: "Bart Dunweg", role: t("teamBart"), bio: t("teamBartBio") },
            { initials: "JO", name: "Jasper den Oude", role: t("teamJasper"), bio: t("teamJasperBio") },
            { initials: "EW", name: "Erwin de Witte", role: t("teamErwin"), bio: t("teamErwinBio") },
          ].map((member) => (
            <AnimatedGridItem key={member.name} className="flex flex-col items-start gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                {member.initials}
              </div>
              <div>
                <div className="font-semibold">{member.name}</div>
                <div className="text-sm text-muted-foreground">{member.role}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            </AnimatedGridItem>
          ))}
        </AnimatedGrid>

      </div>
    </section>
  );
}
