import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, X } from "lucide-react";
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

  const traditionalSteps = [
    t("approachTrad1"),
    t("approachTrad2"),
    t("approachTrad3"),
    t("approachTrad4"),
    t("approachTrad5"),
    t("approachTrad6"),
  ];

  const radialSteps = [
    { title: t("approachStep1"), text: t("approachStep1Text") },
    { title: t("approachStep2"), text: t("approachStep2Text") },
    { title: t("approachStep3"), text: t("approachStep3Text") },
    { title: t("approachStep4"), text: t("approachStep4Text") },
  ];

  const beliefs = [
    { title: t("vision1Title"), text: t("vision1Text") },
    { title: t("vision2Title"), text: t("vision2Text") },
    { title: t("vision3Title"), text: t("vision3Text") },
    { title: t("vision4Title"), text: t("vision4Text") },
    { title: t("vision5Title"), text: t("vision5Text") },
  ];

  return (
    <div className="pt-[212px] pb-24">
      <div className="px-8 mx-auto max-w-[1280px]">
        {/* Hero */}
        <AnimatedSection>
          <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">{t("title")}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">{t("subtitle")}</p>
        </AnimatedSection>
      </div>

      {/* Image slider — full width */}
      <AnimatedSection delay={0.2} className="mt-12 overflow-hidden group">
        <div
          className="flex gap-4 animate-marquee-left group-hover:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-[400px] w-[600px] shrink-0 rounded-2xl border border-black/5 bg-[#f8f9fb] dark:border-white/10 dark:bg-[#101114]"
            />
          ))}
        </div>
      </AnimatedSection>

      <div className="px-8 mx-auto max-w-[1280px]">
        <Separator className="my-16" />

        {/* Story */}
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <AnimatedSection>
            <h2 className="text-2xl tracking-tight">{t("storyTitle")}</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-lg leading-relaxed">{t("storyIntro")}</p>
            <p className="mt-6 text-muted-foreground leading-relaxed">{t("storyText")}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t("storyGrowth")}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t("storyPhilosophy")}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t("storyToday")}</p>
          </AnimatedSection>
        </div>

        <Separator className="my-16" />

        {/* What we believe */}
        <AnimatedSection>
          <h2 className="text-2xl tracking-tight">{t("visionTitle")}</h2>
        </AnimatedSection>
        <AnimatedGrid className="mt-8 grid gap-8 sm:grid-cols-2" staggerDelay={0.1}>
          {beliefs.map((item) => (
            <AnimatedGridItem key={item.title} className="rounded-2xl border border-black/5 p-6 dark:border-white/10">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </AnimatedGridItem>
          ))}
        </AnimatedGrid>

        <Separator className="my-16" />

        {/* How we work */}
        <AnimatedSection>
          <h2 className="text-2xl tracking-tight">{t("approachTitle")}</h2>
          <p className="mt-3 max-w-xl text-muted-foreground leading-relaxed">{t("approachIntro")}</p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-0">
            {/* Traditional approach */}
            <div className="rounded-2xl border border-black/5 p-6">
              <h3 className="text-xl font-medium tracking-tight">{t("approachTraditionalTitle")}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t("approachTraditionalSubtitle")}</p>
              <ul className="mt-6 space-y-3">
                {traditionalSteps.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <X size={16} className="mt-0.5 shrink-0 text-muted-foreground/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Radial approach — elevated */}
            <div className="rounded-2xl bg-foreground text-background p-6 -my-4 shadow-lg flex flex-col max-md:mt-4 max-md:-mb-0">
              <div className="flex items-center justify-between gap-4 mb-1">
                <h3 className="text-xl font-medium tracking-tight">{t("approachRadialTitle")}</h3>
                <span className="shrink-0 rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">{t("approachRadialSubtitle")}</span>
              </div>
              <ul className="mt-6 space-y-4 flex-1">
                {radialSteps.map((item) => (
                  <li key={item.title} className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                    <div>
                      <span className="text-sm font-semibold">{item.title}</span>
                      <p className="mt-0.5 text-sm text-background/70">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedSection>

        <Separator className="my-16" />

        {/* Small by design */}
        <AnimatedSection>
          <h3 className="text-base font-semibold">{t("smallByDesignTitle")}</h3>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground leading-relaxed">{t("smallByDesignText")}</p>
        </AnimatedSection>

        <Separator className="my-16" />

        {/* Team */}
        <AnimatedSection>
          <h2 className="text-2xl tracking-tight">{t("teamTitle")}</h2>
          <p className="mt-3 max-w-xl text-muted-foreground leading-relaxed">{t("teamIntro")}</p>
        </AnimatedSection>
        <AnimatedGrid className="mt-8 grid gap-8 sm:grid-cols-3" staggerDelay={0.12}>
          {[
            { initials: "BD", name: "Bart Dunweg", role: t("teamBart"), bio: t("teamBartBio") },
            { initials: "JO", name: "Jasper den Ouden", role: t("teamJasper"), bio: t("teamJasperBio") },
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

        <Separator className="my-16" />

        {/* CTA */}
        <AnimatedSection className="text-center">
          <h2 className="text-2xl tracking-tight">{t("ctaHeadline")}</h2>
          <p className="mt-3 text-muted-foreground">{t("ctaText")}</p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
              {t("ctaCta")}
            </Link>
            <Link href="/work" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              {t("ctaSecondary")}
              <ArrowRight size={16} />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
