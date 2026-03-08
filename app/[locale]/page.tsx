import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getContent } from "@/lib/content";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AtomToggle } from "../components/atom-toggle";
import { ScrollOrb } from "../components/scroll-orb";


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
                <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
                  {t("cta")}
                </Link>
                <Link href="/pricing" className="inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-b from-white/15 to-white/8 px-6 text-base font-medium text-white transition-colors hover:from-white/22 hover:to-white/12">
                  {t("ctaSecondary")}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* White radial gradient orb — grows on scroll */}
        <ScrollOrb />
      </section>

      {/* Content section — dark background */}
      <div className="relative z-10 -mt-1 bg-white text-foreground dark:bg-[#0A0A0A] dark:text-white">

      {/* Scrolling card rows */}
      <div className="space-y-4 overflow-hidden py-8">
        <div className="animate-marquee-left flex gap-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={`row1-${i}`}
              className="h-[300px] w-[400px] shrink-0 rounded-2xl bg-muted"
            />
          ))}
        </div>
        <div className="animate-marquee-right flex gap-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={`row2-${i}`}
              className="h-[300px] w-[400px] shrink-0 rounded-2xl bg-muted"
            />
          ))}
        </div>
      </div>

      {/* Clients */}
      <section className="px-8 py-16">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-10 text-center text-sm font-medium text-muted-foreground">
            {t("clients")}
          </p>
          <div className="overflow-hidden">
            <div className="animate-marquee-left flex items-center gap-16">
              {[...Array(3)].map((_, repeat) =>
                ["Uber", "Facebook", "Google", "Uber", "Facebook", "Google"].map(
                  (name, i) => (
                    <span
                      key={`logo-${repeat}-${i}`}
                      className="shrink-0 text-2xl font-semibold tracking-tight text-muted-foreground/50"
                    >
                      {name}
                    </span>
                  )
                )
              )}
            </div>
          </div>
        </div>
      </section>

      </div>{/* end content section */}
      </div>{/* end orb zone */}

      {/* Intro */}
      <section className="bg-white text-foreground dark:bg-[#0A0A0A] dark:text-white px-8 pb-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="h-px bg-border" />
          <div className="py-16 md:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl md:text-3xl tracking-tight">{t("introTitle")}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {t("introText")}
              </p>
            </div>
          </div>
          <div className="h-px bg-border" />
        </div>
      </section>

      {/* About */}
      <section className="bg-white text-foreground dark:bg-[#0A0A0A] dark:text-white px-8 pb-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="text-2xl md:text-3xl tracking-tight">{t("aboutTitle")}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {t("aboutText")}
              </p>
              <div className="mt-6">
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  {t("aboutCta")} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div className="space-y-6">
              {[
                { title: t("aboutApproach1Title"), text: t("aboutApproach1Text") },
                { title: t("aboutApproach2Title"), text: t("aboutApproach2Text") },
                { title: t("aboutApproach3Title"), text: t("aboutApproach3Text") },
              ].map((item) => (
                <div key={item.title}>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white text-foreground dark:bg-[#0A0A0A] dark:text-white pb-24">
        <div className="mx-auto max-w-[1280px] px-8">
          <h2 className="text-2xl md:text-3xl tracking-tight mb-10">{t("testimonialsTitle")}</h2>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 px-8 md:px-[max(2rem,calc((100vw-1280px)/2+2rem))]">
            {testimonials.map((item: { quote: string; author: string; role: string; company: string }) => (
              <div key={item.author} className="w-[380px] shrink-0 rounded-xl border border-border bg-muted p-8 flex flex-col justify-between min-h-[240px]">
                <blockquote className="text-base leading-relaxed text-muted-foreground">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                    {item.author.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{item.author}</div>
                    <div className="text-xs text-muted-foreground">{item.role}, {item.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="bg-white text-foreground dark:bg-[#0A0A0A] dark:text-white px-8 pb-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl tracking-tight">{t("featuredWork")}</h2>
            <Link href="/work" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              {t("viewAllWork")} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {work.slice(0, 2).map((project) => (
              <Card key={project.slug} className="bg-muted border-border text-white">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-muted text-foreground/80 border-0">{project.client}</Badge>
                    <span className="text-xs text-muted-foreground">{project.year}</span>
                  </div>
                  <CardTitle className="text-xl text-white">{project.title}</CardTitle>
                  <CardDescription className="mt-2 text-muted-foreground">{project.description}</CardDescription>
                  {project.metrics && (
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      {project.metrics.map((metric: { value: string; label: string }) => (
                        <div key={metric.label}>
                          <div className="text-lg font-bold tracking-tight">{metric.value}</div>
                          <p className="text-xs text-muted-foreground">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.services.map((service) => (
                      <Badge key={service} variant="outline" className="text-xs border-border text-muted-foreground">{service}</Badge>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="bg-white text-foreground dark:bg-[#0A0A0A] dark:text-white px-8 pb-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl tracking-tight">{t("expertiseTitle")}</h2>
            <Link href="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              {t("viewAllExpertise")} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`}>
                <Card className="bg-muted border-border h-full hover:bg-muted/80 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-base text-white">{service.title}</CardTitle>
                    <CardDescription className="mt-1 text-sm text-muted-foreground">{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white text-foreground dark:bg-[#0A0A0A] dark:text-white px-8 pt-24 pb-40">
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
