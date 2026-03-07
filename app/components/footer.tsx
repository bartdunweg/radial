import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-navy-200 py-16 dark:border-navy-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight">
              radial<span className="text-accent-blue">.</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-navy-500 dark:text-navy-400">
              Digital Product Design Studio
            </p>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-navy-400">
              Pages
            </p>
            <div className="flex flex-col gap-2 text-sm text-navy-500 dark:text-navy-400">
              <Link href="/services" className="transition-colors hover:text-navy-950 dark:hover:text-white">Services</Link>
              <Link href="/work" className="transition-colors hover:text-navy-950 dark:hover:text-white">Work</Link>
              <Link href="/blog" className="transition-colors hover:text-navy-950 dark:hover:text-white">Blog</Link>
              <Link href="/contact" className="transition-colors hover:text-navy-950 dark:hover:text-white">Contact</Link>
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-navy-400">
              Headquarters
            </p>
            <p className="text-sm text-navy-600 dark:text-navy-300">
              Amsterdam, Netherlands
            </p>
            <p className="mt-1 text-sm text-navy-500 dark:text-navy-400">
              hello@radial.studio
            </p>
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
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-navy-200 pt-8 text-xs text-navy-400 md:flex-row dark:border-navy-800">
          <p>&copy; {new Date().getFullYear()} Radial. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer transition-colors hover:text-navy-600 dark:hover:text-navy-300">
              Privacy Policy
            </span>
            <span className="cursor-pointer transition-colors hover:text-navy-600 dark:hover:text-navy-300">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
