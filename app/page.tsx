import Link from "next/link";
import services from "../content/services.json";
import work from "../content/work.json";

const clients = [
  "Adyen", "Heineken", "KPN", "Miro", "Bol.com",
  "Leaseplan", "Magnet.me", "Temper", "Whoppah", "GVB", "Van Dale",
];

const testimonials = [
  {
    quote: "Radial helped us rethink our entire product experience. The result exceeded our expectations — both in design quality and user satisfaction.",
    name: "Sarah Chen",
    role: "Head of Product, Meridian",
  },
  {
    quote: "Their research-driven approach meant we didn't just get pretty screens — we got a product that actually solves problems for our users.",
    name: "James van der Berg",
    role: "CTO, Canopy",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/3 h-[600px] w-[600px] rounded-full bg-accent-blue/5 blur-3xl dark:bg-accent-blue/10" />
          <div className="absolute right-1/4 bottom-1/3 h-[500px] w-[500px] rounded-full bg-accent-cyan/5 blur-3xl dark:bg-accent-cyan/8" />
        </div>

        <div className="relative mx-auto max-w-5xl pt-32 pb-16 text-center lg:pt-40">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-navy-500 dark:text-navy-400">
            Digital Product Design Studio
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-[5.5rem]">
            Shaping tomorrow&apos;s
            <br />
            <span className="bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent">
              digital products.
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-navy-500 dark:text-navy-400">
            We&apos;re problem solvers. We listen, observe, create and validate.
            Following a human-centred approach, we work closely with you to get
            results fast and efficiently.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-navy-700 px-8 py-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-navy-600"
            >
              Start a Project
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center rounded-lg border border-navy-200 px-8 py-4 text-sm font-medium text-navy-600 transition-colors hover:border-navy-300 hover:text-navy-950 dark:border-navy-700 dark:text-navy-400 dark:hover:border-navy-500 dark:hover:text-white"
            >
              See Our Work
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 flex flex-col items-center gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-navy-400">
            Scroll to explore
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-navy-400 to-transparent" />
        </div>
      </section>

      {/* Client logos marquee */}
      <section className="overflow-hidden border-y border-navy-200 py-8 dark:border-navy-800">
        <div className="animate-marquee flex items-center gap-16 whitespace-nowrap">
          {[...clients, ...clients].map((client, i) => (
            <span
              key={`${client}-${i}`}
              className="text-sm font-medium uppercase tracking-[0.15em] text-navy-300 dark:text-navy-600"
            >
              {client}
            </span>
          ))}
        </div>
      </section>

      {/* Services preview */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-accent-blue">
                Services
              </p>
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                How we add value
                <br />
                to your team.
              </h2>
            </div>
            <Link
              href="/services"
              className="text-sm font-medium text-accent-blue transition-colors hover:text-accent-cyan"
            >
              View all services &rarr;
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map((service) => (
              <Link
                key={service.slug}
                href={`/services#${service.slug}`}
                className="group rounded-2xl border border-navy-200 bg-white p-8 transition-all hover:border-accent-blue/30 hover:shadow-lg hover:shadow-accent-blue/5 dark:border-navy-800 dark:bg-navy-900 dark:hover:border-accent-blue/40 lg:p-10"
              >
                <h3 className="mb-3 text-xl font-semibold tracking-tight">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-navy-500 dark:text-navy-400">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote banner */}
      <section className="bg-navy-950 py-24 dark:bg-navy-900/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              &ldquo;Good design boosts conversion rates through simplification
              and persuasion. A trustworthy look-and-feel contributes to
              credibility.&rdquo;
            </h2>
          </div>
        </div>
      </section>

      {/* Work preview */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-accent-blue">
                Selected Work
              </p>
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                Products we&apos;ve helped shape.
              </h2>
            </div>
            <Link
              href="/work"
              className="text-sm font-medium text-accent-blue transition-colors hover:text-accent-cyan"
            >
              View all work &rarr;
            </Link>
          </div>

          <div className="space-y-8">
            {work.slice(0, 2).map((project) => (
              <Link
                key={project.slug}
                href={`/work#${project.slug}`}
                className="group block cursor-pointer overflow-hidden rounded-3xl border border-navy-200 transition-all hover:border-navy-300 dark:border-navy-800 dark:hover:border-navy-700"
              >
                <div
                  className={`relative aspect-[21/9] overflow-hidden bg-gradient-to-br ${project.gradient} bg-navy-100 dark:bg-navy-900`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-bold text-navy-300/60 transition-colors group-hover:text-navy-400/60 md:text-7xl dark:text-navy-700 dark:group-hover:text-navy-600">
                      {project.title}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-8 md:flex-row md:items-center md:justify-between lg:p-10">
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-accent-blue">
                      {project.client}
                    </p>
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                  <p className="max-w-md text-sm leading-relaxed text-navy-500 dark:text-navy-400">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-navy-200 py-24 lg:py-32 dark:border-navy-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-accent-blue">
              Testimonials
            </p>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              What others have to say.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-navy-200 bg-white p-8 dark:border-navy-800 dark:bg-navy-900 lg:p-10"
              >
                <blockquote className="mb-8 text-lg leading-relaxed text-navy-600 dark:text-navy-300">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-navy-500 dark:text-navy-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-950 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Let&apos;s build something
              <br />
              <span className="bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent">
                great together.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-navy-400">
              Have a project in mind? We&apos;d love to hear about it.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-sm font-medium text-navy-950 shadow-sm transition-colors hover:bg-navy-100"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
