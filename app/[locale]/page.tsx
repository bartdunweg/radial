import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getContent } from "@/lib/content";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Check, X, Users, Handshake, Microscope, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AtomToggle } from "../components/atom-toggle";
import { RotatingClients } from "../components/rotating-clients";
import { TestimonialSlider } from "../components/testimonial-slider";
import {
  AnimatedSection,
  AnimatedGrid,
  AnimatedGridItem,
  AnimatedHero,
  AnimatedHeroItem,
} from "../components/animated-sections";
import { HomeVariantToggle } from "../components/home-variant-toggle";
import { DotField } from "../components/dot-field";
import { TextReveal } from "../components/text-reveal";
import { ScrollTextReveal } from "../components/scroll-text-reveal";
import { ScrollApproach } from "../components/scroll-approach";
import { Icon3DCore, Icon3DFingerprint, Icon3DMagnifier, Icon3DHeart } from "../components/manifesto-icons";


export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const { work, services, testimonials } = getContent(locale);

  /* ------------------------------------------------------------------ */
  /*  Marquee rows (shared between variants)                            */
  /* ------------------------------------------------------------------ */
  const marqueeRows = (() => {
    // Gradient cards: [top color, bottom color]
    const gradients = [
      ["#3B4B7A", "#C8CEDF"], // deep navy → soft grey-blue
      ["#B8C4D4", "#E8ECF2"], // steel blue → light grey
      ["#C5B8D6", "#EDE8F3"], // muted purple → soft lavender
      ["#3A2318", "#1A1210"], // dark brown → near-black
      ["#8B93A8", "#D4D8E2"], // slate → light periwinkle
      ["#D1C4D8", "#F0EAF3"], // dusty mauve → pale lilac
      ["#4A5A8A", "#B8C0D8"], // navy blue → light steel
      ["#2C1E14", "#0F0C0A"], // espresso → charcoal
      ["#A0AAC0", "#DDE0EA"], // cool grey → soft white-blue
      ["#6B5B8A", "#C8C0D8"], // plum → light lavender
      ["#C0B8C8", "#E8E4ED"], // warm grey → pale mauve
      ["#5A6A9A", "#C0C8DC"], // medium blue → pale periwinkle
    ];
    return (
      <div className="space-y-8 overflow-hidden pb-24">
        <div className="animate-marquee-left flex gap-8">
          {gradients.map(([from, to], i) => (
            <div
              key={`row1-${i}`}
              style={{ background: `linear-gradient(to bottom, ${from}, ${to})` }}
              className="h-[300px] w-[400px] shrink-0 rounded-2xl"
            />
          ))}
        </div>
        <div className="animate-marquee-right flex gap-8">
          {gradients.map(([from, to], i) => (
            <div
              key={`row2-${i}`}
              style={{ background: `linear-gradient(to bottom, ${gradients[(i + 5) % gradients.length][0]}, ${gradients[(i + 5) % gradients.length][1]})` }}
              className="h-[300px] w-[400px] shrink-0 rounded-2xl"
            />
          ))}
        </div>
      </div>
    );
  })();

  /* ------------------------------------------------------------------ */
  /*  Clients section                                                   */
  /* ------------------------------------------------------------------ */
  const clientsSection = (
    <section className="px-8 pb-24">
      <div className="mx-auto max-w-[1280px]">
        <p className="mb-10 text-center text-base font-medium text-muted-foreground">
          {t("clients")}
        </p>
        <RotatingClients />
      </div>
    </section>
  );

  /* ------------------------------------------------------------------ */
  /*  Variant A — minimal hero + sliders                                */
  /* ------------------------------------------------------------------ */
  const variantA = (
    <div className="overflow-clip">
      {/* Clean hero — 90vh so sliders peek below */}
      <section className="relative flex h-[90svh] items-center justify-center bg-background overflow-hidden">
        <DotField />
        <div className="relative z-10 w-full px-8 text-foreground">
          <div className="mx-auto max-w-[1280px]">
            <AnimatedHero className="mx-auto max-w-[640px] text-center">
              <AnimatedHeroItem>
                <span className="text-sm font-semibold tracking-wide text-muted-foreground">
                  {t("tagline")}
                </span>
              </AnimatedHeroItem>
              <AnimatedHeroItem>
                <h1 className="mt-4 text-[48px] leading-[1.1] tracking-tight md:text-[52px] lg:text-[64px]">
                  {t("heroTitle")}
                </h1>
              </AnimatedHeroItem>
              <AnimatedHeroItem>
                <p className="mt-6 max-w-[480px] mx-auto text-[17px] leading-relaxed text-muted-foreground md:text-[20px]">
                  {t("subtitle")}
                </p>
              </AnimatedHeroItem>
              <AnimatedHeroItem>
                <div data-hero-cta className="mt-8 flex items-center justify-center gap-4">
                  <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
                    {t("cta")}
                  </Link>
                  <Link href="/work" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                    {t("ctaSecondary")}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </AnimatedHeroItem>
            </AnimatedHero>
          </div>
        </div>
      </section>

      {/* Scrolling card rows + clients — visible in bottom 10% */}
      <div className="bg-background text-foreground">
        {marqueeRows}
        {clientsSection}
      </div>
    </div>
  );

  /* ------------------------------------------------------------------ */
  /*  Variant B — full hero, no sliders                                 */
  /* ------------------------------------------------------------------ */
  const variantB = (
    <div className="overflow-clip">
      {/* Full hero with copy + CTAs */}
      <section className="hero-gradient relative flex min-h-[100svh] items-center">
        <AtomToggle />
        <div className="relative z-10 w-full px-8 text-white">
          <div className="mx-auto max-w-[1280px]">
            <AnimatedHero className="mx-auto max-w-[640px] lg:mx-0">
              <AnimatedHeroItem>
                <span className="text-sm font-semibold tracking-wide text-white/50">
                  {t("tagline")}
                </span>
              </AnimatedHeroItem>
              <AnimatedHeroItem>
                <h1 className="mt-4 text-[48px] leading-[1.1] tracking-tight md:text-[52px] lg:text-[64px]">
                  {t("heroTitle")}
                </h1>
              </AnimatedHeroItem>
              <AnimatedHeroItem>
                <p className="mt-6 max-w-[480px] text-[17px] leading-relaxed text-white/70 md:text-[20px]">
                  {t("subtitle")}
                </p>
              </AnimatedHeroItem>
              <AnimatedHeroItem>
                <div data-hero-cta className="mt-8 flex items-center gap-4">
                  <Link href="/contact" className={cn(buttonVariants({ variant: "outline-on-dark", size: "lg" }))}>
                    {t("cta")}
                  </Link>
                  <Link href="/work" className={cn(buttonVariants({ variant: "ghost-light", size: "lg" }))}>
                    {t("ctaSecondary")}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </AnimatedHeroItem>
            </AnimatedHero>
          </div>
        </div>
      </section>

      {/* Clients only (no sliders) */}
      <div className="relative z-10 -mt-1 bg-background text-foreground">
        {clientsSection}
      </div>
    </div>
  );

  return (
    <>
      <HomeVariantToggle variantA={variantA} variantB={variantB} />

      <div className="px-8"><div className="mx-auto max-w-[1280px]"><div className="h-px bg-black/5 dark:bg-white/10" /></div></div>

      {/* Featured Work — prominent, right after hero */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1280px]">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[28px] md:text-[36px] tracking-tight">{t("featuredWork")}</h2>
              <Link href="/work" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                {t("viewAllWork")} <ArrowRight size={14} />
              </Link>
            </div>
            <p className="text-muted-foreground mb-10 max-w-xl">{t("featuredWorkTagline")}</p>
          </AnimatedSection>
          <AnimatedGrid className="grid gap-8 md:grid-cols-2" staggerDelay={0.15}>
            {work.slice(0, 2).map((project) => (
              <AnimatedGridItem key={project.slug}>
                <div className="h-[400px] rounded-2xl border border-black/5 bg-[#f8f9fb] dark:border-white/10 dark:bg-[#101114]" />
                <div className="mt-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-medium">{project.client}</span>
                    <span className="text-xs text-muted-foreground">{project.year}</span>
                  </div>
                  <h3 className="text-xl font-medium tracking-tight">{project.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="flex gap-6 mt-4">
                      {project.metrics.map((metric: { value: string; label: string }) => (
                        <div key={metric.label}>
                          <div className="text-2xl font-semibold tracking-tight">{metric.value}</div>
                          <div className="text-xs text-muted-foreground">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.services.map((service) => (
                      <Badge key={service} variant="outline" className="text-xs border-border text-muted-foreground">{service}</Badge>
                    ))}
                  </div>
                </div>
              </AnimatedGridItem>
            ))}
          </AnimatedGrid>
        </div>
      </section>

      <div className="px-8"><div className="mx-auto max-w-[1280px]"><div className="h-px bg-black/5 dark:bg-white/10" /></div></div>

      {/* Manifesto — scroll-driven reveal */}
      <ScrollTextReveal
        label={t("introLabel")}
        segments={[
          { text: t("intro1") },
          { text: t("intro2") },
          { text: t("intro3a") },
          { text: t("intro3b"), style: "purple", icon: <Icon3DCore /> },
          { text: t("intro3c") },
          { text: t("intro4") },
          { text: t("intro5") },
          { text: t("intro6"), style: "orange", icon: <Icon3DFingerprint /> },
          { text: t("intro7"), style: "pink", icon: <Icon3DMagnifier /> },
          { text: t("intro8") },
          { text: t("intro9") },
          { text: t("intro10") },
          { text: t("intro11a") },
          { text: t("intro11b"), style: "blue", icon: <Icon3DHeart /> },
        ]}
        className="mx-auto max-w-[960px] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.4] tracking-tight"
        sparkles={false}
      />

      <div className="px-8"><div className="mx-auto max-w-[1280px]"><div className="h-px bg-black/5 dark:bg-white/10" /></div></div>

      {/* Why Radial */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1280px]">
          <AnimatedSection className="max-w-2xl mb-16">
            <h2 className="text-[28px] md:text-[36px] tracking-tight">{t("whyRadialTitle")}</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t("whyRadialText")}</p>
          </AnimatedSection>

          {/* Comparison cards — 4 columns with dividers, Radial card elevated */}
          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_auto] items-end gap-0">
              {/* Three comparison cards in one bordered container */}
              <div className="rounded-2xl border border-black/5 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 lg:col-span-3">
              {/* Freelancer */}
              <div className="p-6">
                <h3 className="text-xl font-medium tracking-tight mb-6">{t("whyCol1Title")}</h3>
                <ul className="space-y-3">
                  {[t("whyCol1Pro1"), t("whyCol1Pro2")].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check size={16} className="mt-0.5 shrink-0 text-foreground" />
                      {item}
                    </li>
                  ))}
                  {[t("whyCol1Con1"), t("whyCol1Con2"), t("whyCol1Con3")].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <X size={16} className="mt-0.5 shrink-0 text-muted-foreground/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Secondment */}
              <div className="p-6 border-l border-black/5 dark:border-white/10 max-sm:border-l-0 max-sm:border-t">
                <h3 className="text-xl font-medium tracking-tight mb-6">{t("whyCol3Title")}</h3>
                <ul className="space-y-3">
                  {[t("whyCol3Pro1"), t("whyCol3Pro2")].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check size={16} className="mt-0.5 shrink-0 text-foreground" />
                      {item}
                    </li>
                  ))}
                  {[t("whyCol3Con1"), t("whyCol3Con2"), t("whyCol3Con3")].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <X size={16} className="mt-0.5 shrink-0 text-muted-foreground/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Big agency */}
              <div className="p-6 border-l border-black/5 dark:border-white/10 max-sm:border-l-0 max-sm:border-t">
                <h3 className="text-xl font-medium tracking-tight mb-6">{t("whyCol4Title")}</h3>
                <ul className="space-y-3">
                  {[t("whyCol4Pro1"), t("whyCol4Pro2")].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check size={16} className="mt-0.5 shrink-0 text-foreground" />
                      {item}
                    </li>
                  ))}
                  {[t("whyCol4Con1"), t("whyCol4Con2"), t("whyCol4Con3")].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <X size={16} className="mt-0.5 shrink-0 text-muted-foreground/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              </div>

              {/* Radial — elevated card */}
              <div className="rounded-2xl bg-foreground text-background dark:bg-white dark:text-black p-6 -my-4 shadow-lg flex flex-col max-lg:mt-4 max-lg:-mb-0">
                <h3 className="text-xl font-medium tracking-tight mb-6">{t("whyCol2Title")}</h3>
                <ul className="space-y-3 flex-1">
                  {[t("whyCol2Pro1"), t("whyCol2Pro2"), t("whyCol2Pro3"), t("whyCol2Pro4"), t("whyCol2Pro5")].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-background/80 dark:text-black/70">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={cn(buttonVariants({ size: "default" }), "mt-6 w-full bg-background text-foreground hover:bg-background/90 dark:bg-black dark:text-white dark:hover:bg-black/90")}>
                  {t("cta")}
                </Link>
              </div>
            </div>
          </AnimatedSection>


        </div>
      </section>

      <div className="px-8"><div className="mx-auto max-w-[1280px]"><div className="h-px bg-black/5 dark:bg-white/10" /></div></div>

      {/* About */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1280px]">
          <AnimatedSection className="max-w-2xl">
            <h2 className="text-[28px] md:text-[36px] tracking-tight">{t("aboutTitle")}</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {t("aboutText")}
            </p>
            <div className="mt-6">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                {t("aboutCta")} <ArrowRight size={14} />
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedGrid className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4" staggerDelay={0.1}>
            {[
              { value: t("aboutStat1Value"), label: t("aboutStat1Label") },
              { value: t("aboutStat2Value"), label: t("aboutStat2Label") },
              { value: t("aboutStat3Value"), label: t("aboutStat3Label") },
              { value: t("aboutStat4Value"), label: t("aboutStat4Label") },
            ].map((stat) => (
              <AnimatedGridItem key={stat.label}>
                <div className="text-[36px] md:text-[48px] font-medium tracking-tight leading-none">{stat.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </AnimatedGridItem>
            ))}
          </AnimatedGrid>

          <div className="mt-16">
            <ScrollApproach
              items={[
                { title: t("aboutApproach1Title"), text: t("aboutApproach1Text"), icon: <Users size={18} /> },
                { title: t("aboutApproach2Title"), text: t("aboutApproach2Text"), icon: <Handshake size={18} /> },
                { title: t("aboutApproach3Title"), text: t("aboutApproach3Text"), icon: <Microscope size={18} /> },
                { title: t("aboutApproach4Title"), text: t("aboutApproach4Text"), icon: <Rocket size={18} /> },
              ]}
            />
          </div>
        </div>
      </section>

      <div className="px-8"><div className="mx-auto max-w-[1280px]"><div className="h-px bg-black/5 dark:bg-white/10" /></div></div>

      {/* AI */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1280px]">
          <AnimatedSection className="max-w-2xl">
            <h2 className="text-[28px] md:text-[36px] tracking-tight">{t("aiTitle")}</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t("aiText")}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t("aiText2")}</p>
          </AnimatedSection>

          <AnimatedGrid className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
            {[
              { title: t("aiPoint1Title"), text: t("aiPoint1Text") },
              { title: t("aiPoint2Title"), text: t("aiPoint2Text") },
              { title: t("aiPoint3Title"), text: t("aiPoint3Text") },
            ].map((item) => (
              <AnimatedGridItem key={item.title} className="rounded-2xl border border-black/5 p-6 dark:border-white/10">
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </AnimatedGridItem>
            ))}
            <AnimatedGridItem className="rounded-2xl bg-foreground text-background dark:bg-white dark:text-black p-6">
              <h3 className="text-base font-semibold">{t("aiPoint4Title")}</h3>
              <p className="mt-2 text-sm text-background/70 dark:text-black/70 leading-relaxed">{t("aiPoint4Text")}</p>
            </AnimatedGridItem>
          </AnimatedGrid>
        </div>
      </section>

      <div className="px-8"><div className="mx-auto max-w-[1280px]"><div className="h-px bg-black/5 dark:bg-white/10" /></div></div>

      {/* Testimonials */}
      <section className="py-24">
        <div className="px-8 mx-auto max-w-[1280px]">
          <AnimatedSection>
            <h2 className="text-[28px] md:text-[36px] tracking-tight mb-10">{t("testimonialsTitle")}</h2>
          </AnimatedSection>
        </div>
        <AnimatedSection>
          <TestimonialSlider items={testimonials} />
        </AnimatedSection>
      </section>

      {/* How We Can Help — Bento Grid */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1280px]">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-[28px] md:text-[36px] tracking-tight">{t("expertiseTitle")}</h2>
              <Link href="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                {t("viewAllExpertise")} <ArrowRight size={14} />
              </Link>
            </div>
          </AnimatedSection>
          {(() => {
            // Filter out Mendix service from homepage, then split into two columns
            const homepageServices = services.filter((s: { slug: string }) => s.slug !== "design-for-mendix");
            const col1 = homepageServices.filter((_: unknown, i: number) => i % 2 === 0);
            const col2 = homepageServices.filter((_: unknown, i: number) => i % 2 === 1);

            // Base image heights per card (visual variety)
            const baseHeights = [520, 400, 460, 440, 500, 380, 480];
            const col1BaseHeights = baseHeights.filter((_: number, i: number) => i % 2 === 0);
            const col2BaseHeights = baseHeights.filter((_: number, i: number) => i % 2 === 1);

            // Each card has ~120px of content (p-6 + text), gaps are 32px (gap-8)
            const CONTENT_HEIGHT = 120;
            const GAP = 32;

            const col1Total = col1BaseHeights.reduce((s: number, h: number) => s + h, 0) + col1.length * CONTENT_HEIGHT + (col1.length - 1) * GAP;
            const col2Total = col2BaseHeights.reduce((s: number, h: number) => s + h, 0) + col2.length * CONTENT_HEIGHT + (col2.length - 1) * GAP;

            // Distribute the height difference across the shorter column's image heights
            const col1Heights = [...col1BaseHeights];
            const col2Heights = [...col2BaseHeights];
            const diff = col1Total - col2Total;
            if (diff > 0) {
              // col2 is shorter — distribute extra height evenly
              const perCard = Math.floor(diff / col2Heights.length);
              const remainder = diff % col2Heights.length;
              col2Heights.forEach((_: number, i: number) => { col2Heights[i] += perCard + (i < remainder ? 1 : 0); });
            } else if (diff < 0) {
              const absDiff = Math.abs(diff);
              const perCard = Math.floor(absDiff / col1Heights.length);
              const remainder = absDiff % col1Heights.length;
              col1Heights.forEach((_: number, i: number) => { col1Heights[i] += perCard + (i < remainder ? 1 : 0); });
            }

            return (
              <div className="grid gap-8 md:grid-cols-2">
                <div className="flex flex-col gap-8">
                  {col1.map((service: { slug: string; title: string; description: string }, i: number) => (
                    <div
                      key={service.slug}
                      className="flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-background dark:border-white/10"
                    >
                      <div style={{ height: col1Heights[i] }} />
                      <div className="p-6">
                        <h3 className="text-xl font-medium tracking-tight">{service.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{service.description}</p>
                        <Link href="/services" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                          {t("learnMore")} <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-8">
                  {col2.map((service: { slug: string; title: string; description: string }, i: number) => (
                    <div
                      key={service.slug}
                      className="flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-background dark:border-white/10"
                    >
                      <div style={{ height: col2Heights[i] }} />
                      <div className="p-6">
                        <h3 className="text-xl font-medium tracking-tight">{service.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{service.description}</p>
                        <Link href="/services" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                          {t("learnMore")} <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-32">
        <AnimatedSection className="mx-auto max-w-[680px] text-center">
          <h2 className="text-3xl font-light leading-tight tracking-tight md:text-5xl">
            Let&apos;s build something that radiates.
          </h2>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
              {t("cta")}
            </Link>
            <Link href="/work" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              {t("viewAllWork")}
            </Link>
          </div>
        </AnimatedSection>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Radial",
            url: "https://radial.design",
            description: "Digital product design studio based in Rotterdam. We design and build digital products with AI-powered workflows.",
            email: "hello@radial.design",
            telephone: "+31639561580",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Voorhaven 27C",
              postalCode: "3025 HC",
              addressLocality: "Rotterdam",
              addressCountry: "NL",
            },
            knowsAbout: [
              "Digital Product Design",
              "UX Design",
              "UI Design",
              "Design Systems",
              "AI Integration",
              "Design Sprints",
              "MVP Development",
            ],
          }),
        }}
      />
    </>
  );
}
