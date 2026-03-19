import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getContent } from "@/lib/content";
import { ProcessScroll } from "../../components/process/process-scroll";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "process" });
  return { title: t("title"), description: t("description") };
}

/* Map services to process steps — slugs are looked up from content, labels are inline */
const STEP_SERVICES: Record<number, string[]> = {
  0: ["ux-ui-audit", "user-testing", "interviews"],
  1: ["design-sprint", "foundation-sprint"],
  2: ["product-design", "design-system", "brand-integration"],
  3: ["launch-mvp"],
};

/* Extra label-only items per step (no detail page) */
const STEP_LABELS: Record<number, string[]> = {
  0: ["Stakeholder Workshops"],
  1: ["Product Vision", "Flowcharts"],
  2: [],
  3: ["High-fidelity Prototyping", "Product Validation"],
};

export default async function ServicesV2Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("process");
  const st = await getTranslations("services");
  const { services } = getContent(locale);
  const serviceMap = new Map(services.map((s) => [s.slug, s]));

  const steps = [
    { number: "01", title: t("step1Title"), description: t("step1Description") },
    { number: "02", title: t("step2Title"), description: t("step2Description") },
    { number: "03", title: t("step3Title"), description: t("step3Description") },
    { number: "04", title: t("step4Title"), description: t("step4Description") },
  ].map((step, i) => ({
    ...step,
    services: [
      ...(STEP_SERVICES[i] || [])
        .map((slug) => serviceMap.get(slug))
        .filter(Boolean)
        .map((s) => ({ slug: s!.slug, title: s!.title, description: s!.description })),
      ...(STEP_LABELS[i] || []).map((title) => ({ title })),
    ],
  }));

  return (
    <section>
      <div className="px-8 pt-[212px] pb-16">
        <div className="mx-auto max-w-[1280px]">
          <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">{st("title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{st("subtitle")}</p>
        </div>
      </div>
      <ProcessScroll steps={steps} />
    </section>
  );
}
