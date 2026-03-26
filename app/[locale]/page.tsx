import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getContent } from "@/lib/content";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Check, X, Search, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";
import { AtomToggle } from "../components/atom-toggle";
import { RotatingClients } from "../components/rotating-clients";
import { TestimonialAccordion } from "../components/testimonial-accordion";
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
import { Icon3DCore, Icon3DFingerprint, Icon3DMagnifier, Icon3DHeart } from "../components/manifesto-icons";
import { ProcessColumn } from "../components/process/process-column";
import { AiComparisonToggle } from "../components/ai-comparison-toggle";



export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const pt = await getTranslations("process");
  const meta = await getTranslations("metadata");
  const { work, services, expertise, testimonials } = getContent(locale);
  const serviceSlugMap = new Map(services.map((s: { title: string; slug: string }) => [s.title, s.slug]));
  const serviceBySlug = new Map(services.map((s: { slug: string; title: string; description: string }) => [s.slug, s]));

  /* ------------------------------------------------------------------ */
  /*  Process steps for pioneer section                                  */
  /* ------------------------------------------------------------------ */
  const processSteps = expertise.map((exp: { slug: string; title: string; services: string[] }, i: number) => ({
    number: String(i + 1).padStart(2, "0"),
    title: pt(`step${i + 1}Title`),
    description: pt(`step${i + 1}Description`),
    services: exp.services
      .map((slug: string) => serviceBySlug.get(slug))
      .filter((s): s is { slug: string; title: string; description: string } => !!s)
      .map((s) => ({ slug: s.slug, title: s.title, description: s.description })),
    expertiseSlug: exp.slug,
  }));

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
                <h1 className="text-[48px] leading-[1.1] tracking-tight md:text-[52px] lg:text-[64px]">
                  {t("heroTitle1")}<br />{t("heroTitle2")}
                </h1>
              </AnimatedHeroItem>
              <AnimatedHeroItem>
                <p className="mt-6 max-w-[480px] mx-auto text-[17px] leading-relaxed text-muted-foreground md:text-[20px]">
                  {t("subtitle1")}<br />{t("subtitle2")}
                </p>
              </AnimatedHeroItem>
              <AnimatedHeroItem>
                <div data-hero-cta className="mt-8 flex items-center justify-center gap-4">
                  <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
                    {t("cta")}
                  </Link>
                  <Link href="/projects" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                    {t("ctaSecondary")}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </AnimatedHeroItem>
            </AnimatedHero>
          </div>
        </div>

      </section>

      {/* Scrolling card rows + clients */}
      <div className="bg-background text-foreground">
        {marqueeRows}
        <section className="px-8 pb-24">
          <div className="mx-auto max-w-[1280px]">
            <p className="mb-10 text-center text-base font-medium text-muted-foreground">
              {t("clients")}
            </p>
            <RotatingClients />
          </div>
        </section>
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
                <h1 className="text-[48px] leading-[1.1] tracking-tight md:text-[52px] lg:text-[64px]">
                  {t("heroTitle1")}<br />{t("heroTitle2")}
                </h1>
              </AnimatedHeroItem>
              <AnimatedHeroItem>
                <p className="mt-6 max-w-[480px] text-[17px] leading-relaxed text-white/70 md:text-[20px]">
                  {t("subtitle1")}<br />{t("subtitle2")}
                </p>
              </AnimatedHeroItem>
              <AnimatedHeroItem>
                <div data-hero-cta className="mt-8 flex items-center gap-4">
                  <Link href="/contact" className={cn(buttonVariants({ variant: "outline-on-dark", size: "lg" }))}>
                    {t("cta")}
                  </Link>
                  <Link href="/projects" className={cn(buttonVariants({ variant: "ghost-light", size: "lg" }))}>
                    {t("ctaSecondary")}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </AnimatedHeroItem>
            </AnimatedHero>
          </div>
        </div>

        {/* Clients pinned to bottom of hero — desktop only */}
        <div className="absolute bottom-16 left-0 right-0 z-10 hidden md:block px-8">
          <div className="mx-auto max-w-[1280px]">
            <RotatingClients count={6} />
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <>
      <HomeVariantToggle variantA={variantA} variantB={variantB} />

      <div className="px-8"><div className="mx-auto max-w-[1280px]"><div className="h-px bg-black/5 dark:bg-white/10" /></div></div>

      {/* Manifesto — scroll-driven reveal */}
      <ScrollTextReveal
        label={undefined}
        coreText={t("intro4core")}
        segments={[
          { text: t("intro1a"), style: "accent" },
          { text: t("intro1b"), style: "accent" },
          { text: t("intro2") },
          { text: t("intro3b") },
        ]}
        segmentsAfter={[
          { text: t("intro4rest") },
          { text: t("intro5") },
          { text: t("intro5b") },
          { text: t("intro6") },
          { text: t("intro7") },
        ]}
        className="mx-auto max-w-[960px] text-[22px] md:text-[28px] leading-[1.4] tracking-tight text-center"
        sparkles={false}
      />

      <div className="px-8"><div className="mx-auto max-w-[1280px]"><div className="h-px bg-black/5 dark:bg-white/10" /></div></div>

      {/* Pioneers + AI Comparison — combined */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 md:items-start">
            {/* Left — text */}
            <AnimatedSection>
              <h2 className="text-[28px] md:text-[36px] tracking-tight">{t("aiTitle")}</h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t("aiText")}</p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t("aiText2")}</p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t("aiText3")}</p>
            </AnimatedSection>

            {/* Right — interactive AI comparison */}
            <AnimatedSection delay={0.15}>
              <AiComparisonToggle
                items={[1, 2, 3, 4, 5].map((i) => ({
                  aiTitle: t(`he${i}AITitle`),
                  aiText: t(`he${i}AIText`),
                  humanTitle: t(`he${i}HumanTitle`),
                  humanText: t(`he${i}HumanText`),
                }))}
                toggleLabel={t("heToggleLabel")}
                aiColumnLabel={t("heColAI")}
                humanColumnLabel={t("heColHuman")}
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div className="px-8"><div className="mx-auto max-w-[1280px]"><div className="h-px bg-black/5 dark:bg-white/10" /></div></div>

      {/* Process steps — scroll animation */}
      <section className="px-8">
        <div className="mx-auto max-w-[1280px]">
          <ProcessColumn steps={processSteps} />
        </div>
      </section>

      <div className="px-8"><div className="mx-auto max-w-[1280px]"><div className="h-px bg-black/5 dark:bg-white/10" /></div></div>

      {/* Featured Work */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1280px]">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[28px] md:text-[36px] tracking-tight">{t("featuredWork")}</h2>
              <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                {t("viewAllWork")} <ArrowRight size={14} />
              </Link>
            </div>
            <p className="text-muted-foreground mb-10 max-w-xl">{t("featuredWorkTagline")}</p>
          </AnimatedSection>
          <AnimatedGrid className="grid gap-8 md:grid-cols-2" staggerDelay={0.15}>
            {work.slice(0, 2).map((project) => (
              <AnimatedGridItem key={project.slug} className="flex flex-col">
                <div className="h-[400px] rounded-2xl border border-black/5 bg-[#f8f9fb] dark:border-white/10 dark:bg-[#101114]" />
                <div className="mt-4 flex flex-1 flex-col">
                  <div className="mb-2">
                    <span className="text-sm font-medium">{project.client}</span>
                  </div>
                  <h3 className="text-xl font-medium tracking-tight">{project.title}</h3>
                  <p className="mt-3 flex-1 text-base text-muted-foreground line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {project.services.map((service) => {
                      const slug = serviceSlugMap.get(service);
                      return slug ? (
                        <Link key={service} href={`/expertise/${slug}`}>
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
                        {project.metrics.map((metric: { value: string; label: string }) => (
                          <div key={metric.label}>
                            <div className="text-2xl font-semibold tracking-tight">{metric.value}</div>
                            <div className="text-xs text-muted-foreground">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </AnimatedGridItem>
            ))}
          </AnimatedGrid>
        </div>
      </section>

      <div className="px-8"><div className="mx-auto max-w-[1280px]"><div className="h-px bg-black/5 dark:bg-white/10" /></div></div>

      {/* About */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-start">
            <AnimatedSection>
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

            {/* Photo grid — 2 left, 1 right */}
            <AnimatedSection delay={0.15}>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-3">
                  <div className="group relative aspect-[3/2] overflow-hidden rounded-2xl bg-muted">
                    <img src="/about/phone-app.webp" alt="App on phone" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                    <img src="/about/working.webp" alt="Designer at work" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl bg-muted">
                  <img src="/about/calling.webp" alt="Phone call" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div className="px-8"><div className="mx-auto max-w-[1280px]"><div className="h-px bg-black/5 dark:bg-white/10" /></div></div>

      {/* Why Radial */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1280px]">
          <AnimatedSection className="max-w-2xl mb-16">
            <h2 className="text-[28px] md:text-[36px] tracking-tight">{t("whyRadialTitle")}</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t("whyRadialText")}</p>
          </AnimatedSection>

          {/* Comparison columns with dividers */}
          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
              {/* Freelancer */}
              <div className="py-2 sm:pr-8">
                <h3 className="text-lg font-medium tracking-tight mb-6">{t("whyCol1Title")}</h3>
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
              <div className="py-2 sm:px-8 lg:border-l border-black/5 dark:border-white/10 max-sm:border-t max-sm:pt-8 max-sm:mt-6">
                <h3 className="text-lg font-medium tracking-tight mb-6">{t("whyCol3Title")}</h3>
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
              <div className="py-2 sm:px-8 lg:border-l border-black/5 dark:border-white/10 max-sm:border-t max-sm:pt-8 max-sm:mt-6 max-lg:border-t max-lg:pt-8 max-lg:mt-6 max-lg:border-l-0">
                <h3 className="text-lg font-medium tracking-tight mb-6">{t("whyCol4Title")}</h3>
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

              {/* Radial Studio */}
              <div className="py-2 sm:pl-8 lg:border-l border-black/5 dark:border-white/10 max-sm:border-t max-sm:pt-8 max-sm:mt-6 max-lg:border-l max-lg:border-t-0">
                <h3 className="text-lg font-semibold tracking-tight mb-6">{t("whyCol2Title")}</h3>
                <ul className="space-y-3">
                  {[t("whyCol2Pro1"), t("whyCol2Pro2"), t("whyCol2Pro3"), t("whyCol2Pro4"), t("whyCol2Pro5")].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <Check size={16} className="mt-0.5 shrink-0 text-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={cn(buttonVariants({ size: "default" }), "mt-8 w-full")}>
                  {t("cta")}
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="px-8"><div className="mx-auto max-w-[1280px]"><div className="h-px bg-black/5 dark:bg-white/10" /></div></div>

      {/* Testimonials */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1280px]">
          <AnimatedSection>
            <h2 className="text-[28px] md:text-[36px] tracking-tight mb-10">{t("testimonialsTitle")}</h2>
          </AnimatedSection>
          <AnimatedSection>
            <TestimonialAccordion items={testimonials} />
          </AnimatedSection>
        </div>
      </section>

      <div className="h-px bg-black/5 dark:bg-white/10" />

      {/* CTA */}
      <section className="relative px-8 py-32 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,91,228,0.06) 0%, rgba(180,130,255,0.04) 30%, rgba(255,180,200,0.03) 50%, transparent 80%)",
          }}
        />
        <AnimatedSection className="relative mx-auto max-w-[680px] text-center">
          <h2 className="text-3xl font-light leading-tight tracking-tight md:text-5xl">
            {t("ctaHeadline")}
          </h2>
          <div className="mt-10 flex items-center justify-center">
            <Link
              href="/contact"
              className="inline-flex h-11 items-center gap-3 rounded-full bg-foreground pr-6 pl-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              <img
                src="/team/jasper.png"
                alt={t("ctaContact")}
                width={36}
                height={36}
                className="h-7 w-7 rounded-full object-cover"
              />
              {t("ctaButton")}
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
            url: "https://studioradial.com",
            logo: "https://studioradial.com/logo.svg",
            description: meta("orgDescription"),
            foundingDate: "2014",
            email: "hello@studioradial.com",
            telephone: "+31639561580",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Voorhaven 27C",
              postalCode: "3025 HC",
              addressLocality: "Rotterdam",
              addressCountry: "NL",
            },
            sameAs: [
              "https://www.linkedin.com/company/studioradial",
              "https://www.instagram.com/studioradial",
            ],
            knowsAbout: [
              "Digital Product Design",
              "UX Research",
              "UX Design",
              "UI Design",
              "Design Systems",
              "AI Integration",
              "Design Sprints",
              "MVP Development",
              "Prototyping",
            ],
          }),
        }}
      />
    </>
  );
}
