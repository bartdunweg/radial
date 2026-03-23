import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getContent } from "@/lib/content";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { AnimatedSection, AnimatedGrid, AnimatedGridItem } from "../../components/animated-sections";

const authorInitials: Record<string, string> = {
  "Bart Dunweg": "BD",
  "Jasper den Ouden": "JO",
  "Elwin de Witte": "EW",
};

const authorPhotos: Record<string, string> = {
  "Bart Dunweg": "/team/bart.png",
  "Jasper den Ouden": "/team/jasper.png",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const meta = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("title"), description: meta("blogDescription") };
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
    <section className="px-8 pt-[212px] pb-24">
      <div className="mx-auto max-w-[720px]">
        <AnimatedSection>
          <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">{t("title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </AnimatedSection>

        <AnimatedGrid className="mt-12 flex flex-col gap-4" staggerDelay={0.1}>
          {blog.map((post) => (
            <AnimatedGridItem key={post.slug}>
              <Link href={`/insights/${post.slug}`}>
                <Card className="bg-card border-border h-full hover:shadow-card transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-xs text-muted-foreground">{post.readTime} {t("minRead")}</span>
                    </div>
                    <CardTitle className="text-base">{post.title}</CardTitle>
                    <CardDescription className="mt-2 text-sm">{post.excerpt}</CardDescription>
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                      {authorPhotos[post.author] ? (
                        <img src={authorPhotos[post.author]} alt={post.author} className="h-6 w-6 shrink-0 rounded-full object-cover" />
                      ) : (
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold">
                          {authorInitials[post.author] ?? post.author.split(" ").map(w => w[0]).join("")}
                        </span>
                      )}
                      {post.author} &middot;{" "}
                      {new Date(post.date).toLocaleDateString(
                        locale === "nl" ? "nl-NL" : "en-US",
                        { month: "long", day: "numeric", year: "numeric" }
                      )}
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </AnimatedGridItem>
          ))}
        </AnimatedGrid>
      </div>
    </section>
  );
}
