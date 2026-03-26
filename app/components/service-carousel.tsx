"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function ServiceCarousel({
  header,
  children,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      ro.disconnect();
    };
  }, [checkScroll]);

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth",
    });
  }

  return (
    <div>
      <div className="mx-auto max-w-[1280px] px-8">
        <div className="flex items-end justify-between gap-4">
          <div>{header}</div>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Scroll left"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Scroll right"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="mt-8 overflow-x-auto scrollbar-hide"
      >
        <div className="flex gap-5 px-8 md:px-[max(2rem,calc((100vw-1280px)/2+2rem))]">
          {children}
        </div>
      </div>
    </div>
  );
}
