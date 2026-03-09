"use client";

import { useState, useEffect } from "react";

export function VariantToggle() {
  const [branded, setBranded] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-home-variant", branded ? "b" : "a");
  }, [branded]);

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 shadow-lg backdrop-blur-sm">
      <span className="text-xs text-muted-foreground mr-1">Branded</span>
      <button
        onClick={() => setBranded(!branded)}
        className={`relative h-7 w-12 rounded-full transition-colors ${
          branded ? "bg-foreground" : "bg-muted"
        }`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full transition-transform ${
            branded
              ? "left-0.5 translate-x-5 bg-background"
              : "left-0.5 translate-x-0 bg-muted-foreground"
          }`}
        />
      </button>
    </div>
  );
}
