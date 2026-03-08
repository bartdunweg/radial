import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button-variants";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <section className="px-8 pt-32 pb-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-xl">
          <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">{t("title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-16 lg:grid-cols-[1fr_320px]">
          <form className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">{t("nameLabel")}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={t("namePlaceholder")}
                  required
                  className="flex h-11 w-full rounded-full border border-border bg-white px-4 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none dark:bg-card"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">{t("emailLabel")}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  required
                  className="flex h-11 w-full rounded-full border border-border bg-white px-4 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none dark:bg-card"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium">{t("companyLabel")}</label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder={t("companyPlaceholder")}
                className="flex h-11 w-full rounded-full border border-border bg-white px-4 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none dark:bg-card"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">{t("messageLabel")}</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder={t("messagePlaceholder")}
                required
                className="flex w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none dark:bg-card"
              />
            </div>
            <button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
              {t("submit")}
            </button>
          </form>

          <div>
            <Separator className="mb-8 lg:hidden" />
            <div className="space-y-6">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">{t("email")}</div>
                <a href="mailto:hello@radial.design" className="text-sm transition-colors hover:text-muted-foreground">
                  hello@radial.design
                </a>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">{t("phone")}</div>
                <a href="tel:+31639561580" className="text-sm transition-colors hover:text-muted-foreground">
                  +31 (6) 39 56 15 80
                </a>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">{t("address")}</div>
                <p className="text-sm">Voorhaven 27C<br />3025 HC Rotterdam</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
