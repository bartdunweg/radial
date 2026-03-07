import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "../components/page-header";
import work from "../../content/work.json";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        label="Portfolio"
        title="Products we've helped shape."
        description="A selection of projects where we've partnered with ambitious teams to design and build exceptional digital products."
      />

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="space-y-12">
            {work.map((project) => (
              <div
                key={project.slug}
                id={project.slug}
                className="scroll-mt-28 overflow-hidden rounded-3xl border border-navy-200 dark:border-navy-800"
              >
                <div
                  className={`relative aspect-[21/9] overflow-hidden bg-gradient-to-br ${project.gradient} bg-navy-100 dark:bg-navy-900`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-bold text-navy-300/60 md:text-7xl dark:text-navy-700">
                      {project.title}
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12">
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-accent-blue">
                        {project.client} &middot; {project.year}
                      </p>
                      <h2 className="text-3xl font-bold tracking-tight">
                        {project.title}
                      </h2>
                      <p className="mt-4 text-lg leading-relaxed text-navy-500 dark:text-navy-400">
                        {project.longDescription}
                      </p>
                    </div>
                    <div>
                      <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-navy-400">
                        Services Used
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.services.map((s) => (
                          <span
                            key={s}
                            className="rounded-lg border border-navy-200 px-3 py-1.5 text-xs font-medium text-navy-600 dark:border-navy-700 dark:text-navy-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-950 py-24">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Want to be our next case study?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-navy-400">
            We&apos;d love to learn about your project.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-sm font-medium text-navy-950 shadow-sm transition-colors hover:bg-navy-100"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
