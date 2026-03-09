import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getContent } from "@/lib/content";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AtomToggle } from "../components/atom-toggle";
import { RotatingClients } from "../components/rotating-clients";
import { TestimonialSlider } from "../components/testimonial-slider";


export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const { work, services, testimonials } = getContent(locale);

  return (
    <>
      {/* Orb zone — clipped so the orb doesn't bleed into sections below */}
      <div className="overflow-clip">

      {/* Hero */}
      <section className="hero-gradient relative flex min-h-[100svh] items-center">
        {/* Atom core + Three.js sphere (toggle) */}
        <AtomToggle />

        <div className="relative z-10 w-full px-8 text-white">
          <div className="mx-auto max-w-[1280px]">
            <div className="mx-auto max-w-[640px] lg:mx-0">
              <h1 className="text-[48px] leading-[1.1] tracking-tight md:text-[52px] lg:text-[64px]">
                {t("title")}
              </h1>
              <p className="mt-6 max-w-[480px] text-[17px] leading-relaxed text-white/70 md:text-[20px]">
                {t("subtitle")}
              </p>
              <div data-hero-cta className="mt-8 flex items-center gap-4">
                <Link href="/contact" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-base font-medium text-black transition-colors hover:bg-white/90">
                  {t("cta")}
                </Link>
                <Link href="/pricing" className="inline-flex h-11 items-center gap-2 rounded-full bg-white/15 px-6 text-base font-medium text-white transition-colors hover:bg-white/25">
                  {t("ctaSecondary")}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content section — dark background */}
      <div className="relative z-10 -mt-1 bg-background text-foreground">

      {/* Scrolling card rows */}
      {(() => {
        const row1 = Array.from({ length: 12 });
        const row2 = Array.from({ length: 12 });
        return (
          <div className="space-y-8 overflow-hidden pb-24">
            <div className="animate-marquee-left flex gap-4">
              {row1.map((_, i) => (
                <div
                  key={`row1-${i}`}
                  className="h-[300px] w-[500px] shrink-0 rounded-2xl border border-black/5 bg-[#f8f9fb] dark:border-white/10 dark:bg-[#101114]"
                />
              ))}
            </div>
            <div className="animate-marquee-right flex gap-4">
              {row2.map((_, i) => (
                <div
                  key={`row2-${i}`}
                  className="h-[300px] w-[500px] shrink-0 rounded-2xl border border-black/5 bg-[#f8f9fb] dark:border-white/10 dark:bg-[#101114]"
                />
              ))}
            </div>
          </div>
        );
      })()}

      {/* Clients */}
      <section className="px-8 pb-24">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-10 text-center text-base font-medium text-muted-foreground">
            {t("clients")}
          </p>
          <RotatingClients />
        </div>
      </section>

      </div>{/* end content section */}
      </div>{/* end orb zone */}

      <div className="px-8"><div className="mx-auto max-w-[1280px]"><div className="h-px bg-black/5 dark:bg-white/10" /></div></div>

      {/* Intro */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[28px] md:text-[36px] tracking-tight">{t("introTitle")}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t("introText")}
            </p>
          </div>
        </div>
      </section>

      <div className="px-8"><div className="mx-auto max-w-[1280px]"><div className="h-px bg-black/5 dark:bg-white/10" /></div></div>

      {/* About */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1280px]">
          {/* Header + intro */}
          <div className="max-w-2xl">
            <h2 className="text-[28px] md:text-[36px] tracking-tight">{t("aboutTitle")}</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {t("aboutText")}
            </p>
            <div className="mt-6">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                {t("aboutCta")} <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: t("aboutStat1Value"), label: t("aboutStat1Label") },
              { value: t("aboutStat2Value"), label: t("aboutStat2Label") },
              { value: t("aboutStat3Value"), label: t("aboutStat3Label") },
              { value: t("aboutStat4Value"), label: t("aboutStat4Label") },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-[36px] md:text-[48px] font-medium tracking-tight leading-none">{stat.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* USPs */}
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {[
              { title: t("aboutApproach1Title"), text: t("aboutApproach1Text") },
              { title: t("aboutApproach2Title"), text: t("aboutApproach2Text") },
              { title: t("aboutApproach3Title"), text: t("aboutApproach3Text") },
              { title: t("aboutApproach4Title"), text: t("aboutApproach4Text") },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-black/5 bg-background p-6 dark:border-white/10">
                <h3 className="text-xl font-medium tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Radial */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="max-w-2xl mb-16">
            <h2 className="text-[28px] md:text-[36px] tracking-tight">{t("whyRadialTitle")}</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t("whyRadialText")}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Freelancer */}
            <div className="rounded-2xl border border-black/5 bg-background p-6 dark:border-white/10">
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

            {/* Radial */}
            <div className="rounded-2xl border-2 border-accent bg-accent/5 p-6 flex flex-col -mt-4 -mb-4">
              <h3 className="text-xl font-medium tracking-tight mb-6">{t("whyCol2Title")}</h3>
              <ul className="space-y-3 flex-1">
                {[t("whyCol2Pro1"), t("whyCol2Pro2"), t("whyCol2Pro3"), t("whyCol2Pro4"), t("whyCol2Pro5")].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className={cn(buttonVariants({ size: "default" }), "mt-6 w-full")}>
                {t("cta")}
              </Link>
            </div>

            {/* Secondment */}
            <div className="rounded-2xl border border-black/5 bg-background p-6 dark:border-white/10">
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
            <div className="rounded-2xl border border-black/5 bg-background p-6 dark:border-white/10">
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
        </div>
      </section>

      <div className="px-8"><div className="mx-auto max-w-[1280px]"><div className="h-px bg-black/5 dark:bg-white/10" /></div></div>

      {/* Testimonials */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-[28px] md:text-[36px] tracking-tight mb-10">{t("testimonialsTitle")}</h2>
          <TestimonialSlider items={testimonials} />
        </div>
      </section>

      {/* Featured Work */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-[28px] md:text-[36px] tracking-tight">{t("featuredWork")}</h2>
            <Link href="/work" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              {t("viewAllWork")} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {work.slice(0, 2).map((project) => (
              <div key={project.slug}>
                <div className="h-[400px] rounded-2xl border border-black/5 bg-[#f8f9fb] dark:border-white/10 dark:bg-[#101114]" />
                <div className="mt-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-medium">{project.client}</span>
                    <span className="text-xs text-muted-foreground">{project.year}</span>
                  </div>
                  <h3 className="text-xl font-medium tracking-tight">{project.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.services.map((service) => (
                      <Badge key={service} variant="outline" className="text-xs border-border text-muted-foreground">{service}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Can Help — Bento Grid */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-[28px] md:text-[36px] tracking-tight">{t("expertiseTitle")}</h2>
            <Link href="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              {t("viewAllExpertise")} <ArrowRight size={14} />
            </Link>
          </div>
          {(() => {
            // Split services into two columns
            const col1 = services.filter((_: unknown, i: number) => i % 2 === 0);
            const col2 = services.filter((_: unknown, i: number) => i % 2 === 1);

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
        <div className="mx-auto max-w-[680px] text-center">
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
        </div>
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
