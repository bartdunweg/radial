import "./globals.css";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="antialiased">
        <section className="flex min-h-screen flex-col items-center justify-center px-8 text-center animate-[fadeIn_0.5s_ease-out]">
          <h1 className="text-6xl font-bold tracking-tight md:text-8xl">404</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            This page doesn&apos;t exist.
          </p>
          <a
            href="/"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Go home
          </a>
        </section>
      </body>
    </html>
  );
}
