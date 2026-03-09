"use client";

import { useState, useEffect, type ReactNode } from "react";

interface Props {
  variantA: ReactNode;
  variantB: ReactNode;
}

export function HomeVariantToggle({ variantA, variantB }: Props) {
  const [variant, setVariant] = useState<"a" | "b">("a");

  useEffect(() => {
    document.documentElement.setAttribute("data-home-variant", variant);
    return () => document.documentElement.removeAttribute("data-home-variant");
  }, [variant]);

  return (
    <>
      {variant === "a" ? variantA : variantB}

      {/* Floating toggle */}
      <div className="fixed bottom-6 right-6 z-[999] flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 shadow-lg backdrop-blur-sm">
        <span className="text-xs text-muted-foreground mr-1">Variant</span>
        <button
          onClick={() => setVariant("a")}
          className={`h-7 w-7 rounded-full text-xs font-medium transition-colors ${
            variant === "a"
              ? "bg-foreground text-background"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          A
        </button>
        <button
          onClick={() => setVariant("b")}
          className={`h-7 w-7 rounded-full text-xs font-medium transition-colors ${
            variant === "b"
              ? "bg-foreground text-background"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          B
        </button>
      </div>
    </>
  );
}
