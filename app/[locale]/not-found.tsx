import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-8 text-center">
      <h1 className="text-6xl font-bold tracking-tight md:text-8xl">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        This page doesn&apos;t exist.
      </p>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8")}>
        Go home
      </Link>
    </section>
  );
}
