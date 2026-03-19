import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export function PreFooterCTA() {
  const t = useTranslations("home");

  return (
    <section className="relative flex items-center justify-center bg-background px-8 py-32">
      <div className="text-center">
        <h2 className="mx-auto max-w-[680px] text-3xl font-light leading-tight tracking-tight text-foreground md:text-5xl">
          Let&apos;s build something that radiates.
        </h2>
        <div className="mt-10 flex items-center justify-center">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-foreground py-2 pr-6 pl-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            <Image
              src="/team/jasper.png"
              alt={t("ctaContact")}
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
            {t("ctaButton")}
          </Link>
        </div>
      </div>
    </section>
  );
}
