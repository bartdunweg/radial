import { ContactForm } from "./contact-form";
import { ThemeToggle } from "./theme-toggle";

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-stone-200 bg-white/80 backdrop-blur-lg dark:border-stone-800/50 dark:bg-stone-950/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <a href="#" className="font-display text-xl font-bold tracking-tight">
            Radial
          </a>
          <div className="hidden items-center gap-10 text-sm text-stone-500 md:flex dark:text-stone-400">
            <a href="#services" className="transition-colors hover:text-stone-900 dark:hover:text-white">
              Services
            </a>
            <a href="#work" className="transition-colors hover:text-stone-900 dark:hover:text-white">
              Work
            </a>
            <a href="#about" className="transition-colors hover:text-stone-900 dark:hover:text-white">
              About
            </a>
            <ThemeToggle />
            <a
              href="#contact"
              className="rounded-full bg-stone-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-800 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-200"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 pt-32 pb-20 text-center">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
            Digital Product Design Studio
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.08] tracking-tight md:text-7xl lg:text-8xl">
            We design products
            <br />
            <span className="text-stone-400 dark:text-stone-500">people love to use.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-stone-500 md:text-xl dark:text-stone-400">
            Radial is a design and engineering studio that crafts exceptional
            digital experiences. We combine human-centered design with AI to
            build products that matter.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-stone-950 px-8 py-4 text-base font-medium text-white transition-colors hover:bg-stone-800 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-200"
            >
              Start a Project
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 px-8 py-4 text-base font-medium text-stone-600 transition-colors hover:border-stone-400 hover:text-stone-900 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-500 dark:hover:text-white"
            >
              See Our Work
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-stone-200 py-24 lg:py-32 dark:border-stone-800/50">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
              What We Do
            </p>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              End-to-end product design
              <br className="hidden sm:block" />
              &amp; development.
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-stone-200 bg-stone-200 md:grid-cols-2 lg:grid-cols-3 dark:border-stone-800/50 dark:bg-stone-800/50">
            {[
              {
                title: "Product Strategy",
                description:
                  "We help you define your product vision, validate assumptions, and create a roadmap that aligns business goals with user needs.",
                number: "01",
              },
              {
                title: "UX & UI Design",
                description:
                  "Research-driven design that puts users first. From wireframes to high-fidelity interfaces, we craft experiences that feel intuitive.",
                number: "02",
              },
              {
                title: "Design Systems",
                description:
                  "Scalable component libraries and design tokens that ensure consistency and accelerate your team's velocity.",
                number: "03",
              },
              {
                title: "Web Development",
                description:
                  "Modern, performant applications built with Next.js, React, and the latest web technologies. Fast, accessible, and beautiful.",
                number: "04",
              },
              {
                title: "AI Integration",
                description:
                  "We embed AI into your product workflows — from intelligent automation to generative features that create real value for users.",
                number: "05",
              },
              {
                title: "Prototyping & Testing",
                description:
                  "Rapid prototypes and user testing to validate ideas early, reduce risk, and iterate toward the right solution.",
                number: "06",
              },
            ].map((service) => (
              <div
                key={service.number}
                className="group flex flex-col justify-between bg-stone-50 p-8 transition-colors hover:bg-stone-100 lg:p-10 dark:bg-stone-950 dark:hover:bg-stone-900/50"
              >
                <div>
                  <span className="mb-6 block font-display text-sm text-stone-400 dark:text-stone-600">
                    {service.number}
                  </span>
                  <h3 className="mb-3 font-display text-xl font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                    {service.description}
                  </p>
                </div>
                <div className="mt-8">
                  <span className="text-sm text-stone-300 transition-colors group-hover:text-stone-500 dark:text-stone-600 dark:group-hover:text-stone-400">
                    &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work / Portfolio */}
      <section id="work" className="border-t border-stone-200 py-24 lg:py-32 dark:border-stone-800/50">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
              Selected Work
            </p>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              Products we&apos;ve helped build.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Meridian",
                category: "Fintech Platform",
                description:
                  "A next-generation wealth management platform that simplifies complex financial planning through AI-powered insights.",
                accent: "from-blue-500/20 to-indigo-500/10",
              },
              {
                title: "Canopy",
                category: "Healthcare App",
                description:
                  "A patient engagement platform that connects care teams with patients through intelligent scheduling and real-time communication.",
                accent: "from-emerald-500/20 to-teal-500/10",
              },
              {
                title: "Arcline",
                category: "SaaS Dashboard",
                description:
                  "An analytics suite that transforms raw data into actionable insights with an interface designed for speed and clarity.",
                accent: "from-amber-500/20 to-orange-500/10",
              },
              {
                title: "Volta",
                category: "E-Commerce",
                description:
                  "A premium direct-to-consumer storefront that blends editorial content with seamless shopping — built for conversion.",
                accent: "from-rose-500/20 to-pink-500/10",
              },
            ].map((project) => (
              <div
                key={project.title}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-stone-200 transition-colors hover:border-stone-300 dark:border-stone-800/50 dark:hover:border-stone-700"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-900">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.accent}`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-4xl font-bold text-stone-300 transition-colors group-hover:text-stone-400 md:text-5xl dark:text-stone-700 dark:group-hover:text-stone-600">
                      {project.title}
                    </span>
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-stone-500">
                    {project.category}
                  </p>
                  <h3 className="mb-2 font-display text-xl font-semibold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-stone-200 py-24 lg:py-32 dark:border-stone-800/50">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
              About Radial
            </p>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              Design meets intelligence.
            </h2>
          </div>

          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <p className="text-lg leading-relaxed text-stone-500 dark:text-stone-400">
              We&apos;re a small, senior team of designers and engineers who
              believe that the best digital products come from deep
              collaboration, rigorous craft, and a relentless focus on the
              people who use them.
            </p>
            <p className="text-lg leading-relaxed text-stone-500 dark:text-stone-400">
              We leverage AI not as a gimmick, but as a genuine force
              multiplier — from accelerating research and ideation to
              embedding intelligent features directly into the products we
              build. This lets us deliver more, faster, without compromising
              on quality.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-8 text-center">
            {[
              { value: "50+", label: "Products Shipped" },
              { value: "8+", label: "Years in Business" },
              { value: "96%", label: "Client Retention" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-stone-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-stone-200 py-24 lg:py-32 dark:border-stone-800/50">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
              Get in Touch
            </p>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              Let&apos;s build something
              <br />
              great together.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-stone-500 dark:text-stone-400">
              Have a project in mind? We&apos;d love to hear about it. Tell us
              what you&apos;re working on and we&apos;ll get back to you
              within 24 hours.
            </p>
          </div>

          <div className="mx-auto max-w-xl">
            <ContactForm />
            <p className="mt-8 text-center text-sm text-stone-400 dark:text-stone-600">
              Or email us directly at{" "}
              <a
                href="mailto:hello@radial.studio"
                className="text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
              >
                hello@radial.studio
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-12 dark:border-stone-800/50">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <div>
              <span className="font-display text-lg font-bold tracking-tight">
                Radial
              </span>
              <p className="mt-1 text-sm text-stone-400 dark:text-stone-600">
                Digital Product Design Studio
              </p>
            </div>
            <p className="text-sm text-stone-400 dark:text-stone-600">
              &copy; {new Date().getFullYear()} Radial. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
