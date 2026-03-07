import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "../components/page-header";
import services from "../../content/services.json";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        label="Services"
        title="How we add value to your team."
        description="Radial is a studio bringing value to our customers as efficiently as possible by designing validated digital solutions."
      />

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="space-y-12">
            {services.map((service) => (
              <div
                key={service.slug}
                id={service.slug}
                className="scroll-mt-28 rounded-2xl border border-navy-200 bg-white p-8 dark:border-navy-800 dark:bg-navy-900 lg:p-12"
              >
                <div className="grid gap-8 lg:grid-cols-2">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-navy-500 dark:text-navy-400">
                      {service.longDescription}
                    </p>
                  </div>
                  <div>
                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-navy-400">
                      Deliverables
                    </p>
                    <ul className="space-y-3">
                      {service.deliverables.map((d) => (
                        <li
                          key={d}
                          className="flex items-center gap-3 text-sm text-navy-600 dark:text-navy-300"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
                          {d}
                        </li>
                      ))}
                    </ul>
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
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-navy-400">
            Tell us about your project and we&apos;ll find the right approach.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-sm font-medium text-navy-950 shadow-sm transition-colors hover:bg-navy-100"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
