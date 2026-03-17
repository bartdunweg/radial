import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

import blogEn from "@/content/en/blog.json";

const authorInitials: Record<string, string> = {
  "Bart Dunweg": "BD",
  "Jasper den Ouden": "JO",
  "Elwin de Witte": "EW",
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    blogEn.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const { blog } = getContent(locale);
  const post = blog.find((p) => p.slug === slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const { blog } = getContent(locale);
  const post = blog.find((p) => p.slug === slug);

  if (!post) notFound();

  const paragraphs = post.content.split("\n\n");

  return (
    <article className="px-8 pt-[212px] pb-24">
      <div className="mx-auto max-w-[720px]">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} /> {t("backToBlog")}
        </Link>

        <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">{post.title}</h1>

        <div className="mt-6 flex items-center gap-4 border-b border-border pb-8 text-sm text-muted-foreground">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
            {authorInitials[post.author] ?? post.author.split(" ").map(w => w[0]).join("")}
          </span>
          <span>{post.author}</span>
          <span>&middot;</span>
          <span>
            {new Date(post.date).toLocaleDateString(
              locale === "nl" ? "nl-NL" : "en-US",
              { month: "long", day: "numeric", year: "numeric" }
            )}
          </span>
          <span>&middot;</span>
          <span>{post.readTime} {t("minRead")}</span>
        </div>

        <div className="mt-10 space-y-6">
          {paragraphs.map((p, i) => {
            if (p.startsWith("## ")) {
              return <h2 key={i} className="mt-4 text-xl font-semibold tracking-tight">{p.replace("## ", "")}</h2>;
            }
            return <p key={i} className="text-muted-foreground leading-[1.7]">{p}</p>;
          })}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            author: { "@type": "Person", name: post.author },
            datePublished: post.date,
            publisher: {
              "@type": "Organization",
              name: "Radial",
              url: "https://radial.design",
            },
          }),
        }}
      />
    </article>
  );
}
