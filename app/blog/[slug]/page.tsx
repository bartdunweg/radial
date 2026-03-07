import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import posts from "../../../content/blog.json";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = posts.find((p) => p.slug === slug);
    if (!post) return { title: "Post Not Found" };
    return { title: post.title };
  });
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const paragraphs = post.content.split("\n\n");

  return (
    <article className="pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-3xl px-6">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-navy-500 transition-colors hover:text-navy-950 dark:text-navy-400 dark:hover:text-white"
        >
          &larr; Back to Blog
        </Link>

        <div className="mb-6 flex items-center gap-3 text-xs text-navy-400">
          <span className="rounded-md bg-navy-100 px-2 py-1 font-medium text-navy-600 dark:bg-navy-800 dark:text-navy-300">
            {post.category}
          </span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {post.title}
        </h1>

        <div className="mt-6 flex items-center gap-4 border-b border-navy-200 pb-8 text-sm text-navy-500 dark:border-navy-800 dark:text-navy-400">
          <span>{post.author}</span>
          <span>&middot;</span>
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="mt-10 space-y-6">
          {paragraphs.map((p, i) => {
            if (p.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="mt-4 text-2xl font-bold tracking-tight"
                >
                  {p.replace("## ", "")}
                </h2>
              );
            }
            return (
              <p
                key={i}
                className="text-base leading-relaxed text-navy-600 dark:text-navy-300"
              >
                {p}
              </p>
            );
          })}
        </div>
      </div>
    </article>
  );
}
