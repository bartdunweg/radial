import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Separator } from "@/components/ui/separator";

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
    <section className="px-8 pt-32 pb-24">
      <div className="mx-auto max-w-[1280px]">
        <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">{t("title")}</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t("subtitle")}</p>

        <Separator className="my-12" />

        <h2 className="text-2xl tracking-tight">{t("storyTitle")}</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">{t("storyText")}</p>

        <Separator className="my-12" />

        <h2 className="text-2xl tracking-tight mb-8">{t("approachTitle")}</h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {approaches.map((item) => (
            <div key={item.title}>
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <Separator className="my-12" />

        <h2 className="text-2xl tracking-tight mb-8">{t("teamTitle")}</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { initials: "BD", name: "Bart Dunweg", role: t("teamBart"), bio: t("teamBartBio") },
            { initials: "JO", name: "Jasper den Oude", role: t("teamJasper"), bio: t("teamJasperBio") },
            { initials: "EW", name: "Erwin de Witte", role: t("teamErwin"), bio: t("teamErwinBio") },
          ].map((member) => (
            <div key={member.name} className="flex flex-col items-start gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                {member.initials}
              </div>
              <div>
                <div className="font-semibold">{member.name}</div>
                <div className="text-sm text-muted-foreground">{member.role}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
