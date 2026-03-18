"use client";

import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
        Something went wrong
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        An unexpected error occurred.
      </p>
      <button
        onClick={reset}
        className={cn(buttonVariants({ size: "lg" }), "mt-8")}
      >
        Try again
      </button>
    </section>
  );
}
