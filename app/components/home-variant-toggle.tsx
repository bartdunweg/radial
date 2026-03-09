"use client";

import { useState, useEffect, type ReactNode } from "react";

interface Props {
  variantA: ReactNode;
  variantB: ReactNode;
}

export function HomeVariantToggle({ variantA, variantB }: Props) {
  const [variant, setVariant] = useState<"a" | "b">("b");

  useEffect(() => {
    const el = document.documentElement;
    const update = () => setVariant((el.getAttribute("data-home-variant") as "a" | "b") || "b");
    update();
    const observer = new MutationObserver(update);
    observer.observe(el, { attributes: true, attributeFilter: ["data-home-variant"] });
    return () => observer.disconnect();
  }, []);

  return <>{variant === "a" ? variantA : variantB}</>;
}
