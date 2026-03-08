import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getContent } from "@/lib/content";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("title") };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const { blog } = getContent(locale);

  return (
    <section className="px-8 pt-32 pb-24">
      <div className="mx-auto max-w-[1280px]">
        <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">{t("title")}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {blog.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="bg-card border-border h-full hover:shadow-card transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">{post.readTime} {t("minRead")}</span>
                  </div>
                  <CardTitle className="text-base">{post.title}</CardTitle>
                  <CardDescription className="mt-2 text-sm">{post.excerpt}</CardDescription>
                  <div className="mt-4 text-xs text-muted-foreground">
                    {post.author} &middot;{" "}
                    {new Date(post.date).toLocaleDateString(
                      locale === "nl" ? "nl-NL" : "en-US",
                      { month: "long", day: "numeric", year: "numeric" }
                    )}
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
