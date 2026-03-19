import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, X, Globe } from "lucide-react";

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
);
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
  const meta = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("title"), description: meta("aboutDescription") };
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
                <span className="shrink-0 rounded-full bg-background text-foreground px-3 py-1 text-xs font-medium">{t("approachRadialSubtitle")}</span>
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
          <div className="overflow-hidden rounded-2xl h-[768px] relative">
            <Image
              src="/team/team.jpg"
              alt="The Radial team"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </AnimatedSection>
        <AnimatedSection className="mt-10">
          <h2 className="text-2xl tracking-tight">{t("teamTitle")}</h2>
          <p className="mt-3 max-w-xl text-muted-foreground leading-relaxed">{t("teamIntro")}</p>
        </AnimatedSection>
        <AnimatedGrid className="mt-8 grid gap-8 sm:grid-cols-3" staggerDelay={0.12}>
          {[
            { initials: "JO", photo: "/team/jasper.png", name: "Jasper den Ouden", role: t("teamJasper"), bio: t("teamJasperBio"), linkedin: "https://www.linkedin.com/in/jasperdenouden/", website: "https://jasperdenouden.com" },
            { initials: "BD", photo: "/team/bart.png", name: "Bart Dunweg", role: t("teamBart"), bio: t("teamBartBio"), linkedin: "https://www.linkedin.com/in/bartdunweg/", website: "https://bartdunweg.com" },
            { initials: "EW", name: "Elwin de Witte", role: t("teamElwin"), bio: t("teamElwinBio"), linkedin: "https://www.linkedin.com/in/elwindewitte/", website: "https://elwindewitte.com" },
          ].map((member) => (
            <AnimatedGridItem key={member.name} className="flex flex-col items-start gap-3">
              {member.photo ? (
                <Image src={member.photo} alt={member.name} width={56} height={56} className="h-14 w-14 shrink-0 rounded-full object-cover" />
              ) : (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                  {member.initials}
                </div>
              )}
              <div>
                <div className="font-semibold">{member.name}</div>
                <div className="text-sm text-muted-foreground">{member.role}</div>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                <div className="mt-3 flex items-center gap-3">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <LinkedinIcon />
                  </a>
                  <a href={member.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Globe size={16} />
                  </a>
                </div>
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
