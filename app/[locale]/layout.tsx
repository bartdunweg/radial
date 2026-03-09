import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "../components/theme-provider";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { VariantToggle } from "../components/variant-toggle";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: { default: t("siteTitle"), template: "%s — Radial" },
    description: t("siteDescription"),
    openGraph: {
      type: "website",
      locale: locale === "nl" ? "nl_NL" : "en_US",
      siteName: "Radial",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${satoshi.variable} antialiased`}>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar />
            <main className="relative z-10 bg-background">{children}</main>

            <Footer />
            <VariantToggle />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
