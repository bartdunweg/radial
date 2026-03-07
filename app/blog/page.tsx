import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "../components/page-header";
import posts from "../../content/blog.json";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        label="Blog"
        title="Thoughts on design, product & AI."
        description="Insights from our team on building better digital products."
      />

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-navy-200 bg-white p-8 transition-all hover:border-accent-blue/30 hover:shadow-lg hover:shadow-accent-blue/5 dark:border-navy-800 dark:bg-navy-900 dark:hover:border-accent-blue/40 lg:p-10"
              >
                <div className="mb-4 flex items-center gap-3 text-xs text-navy-400">
                  <span className="rounded-md bg-navy-100 px-2 py-1 font-medium text-navy-600 dark:bg-navy-800 dark:text-navy-300">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="mb-3 text-xl font-semibold tracking-tight transition-colors group-hover:text-accent-blue">
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed text-navy-500 dark:text-navy-400">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between text-xs text-navy-400">
                  <span>{post.author}</span>
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
