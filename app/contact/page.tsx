import type { Metadata } from "next";
import { PageHeader } from "../components/page-header";
import { ContactForm } from "../contact-form";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        title="Let's build something great together."
        description="Have a project in mind? We'd love to hear about it. Tell us what you're working on and we'll get back to you within 24 hours."
      />

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <ContactForm />
            </div>
            <div className="space-y-10">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-navy-400">
                  Email
                </p>
                <a
                  href="mailto:hello@radial.studio"
                  className="text-lg font-medium transition-colors hover:text-accent-blue"
                >
                  hello@radial.studio
                </a>
              </div>
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-navy-400">
                  Headquarters
                </p>
                <p className="text-lg font-medium">Amsterdam, Netherlands</p>
              </div>
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-navy-400">
                  Follow Us
                </p>
                <div className="flex gap-6 text-sm text-navy-500 dark:text-navy-400">
                  <span className="cursor-pointer transition-colors hover:text-navy-950 dark:hover:text-white">
                    LinkedIn
                  </span>
                  <span className="cursor-pointer transition-colors hover:text-navy-950 dark:hover:text-white">
                    Dribbble
                  </span>
                  <span className="cursor-pointer transition-colors hover:text-navy-950 dark:hover:text-white">
                    Instagram
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
