"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  color?: string;
  colorDark?: string;
  logo?: string;
}

function isDarkColor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}

export function TestimonialAccordion({ items }: { items: Testimonial[] }) {
  const featured = items.slice(0, 3);
  const [active, setActive] = useState(0);

  return (
    <div className="flex gap-4 h-[400px] md:h-[480px]">
      {featured.map((item, i) => {
        const isActive = active === i;
        const bg = item.color || "#f5f5f5";
        const bgDark = item.colorDark || bg;
        const dark = isDarkColor(bg);
        const darkDark = isDarkColor(bgDark);
        const textColor = dark ? "#ffffff" : "#0A0A0A";
        const textColorDark = darkDark ? "#ffffff" : "#0A0A0A";
        const mutedColor = dark ? "rgba(255,255,255,0.55)" : "rgba(10,10,10,0.45)";
        const mutedColorDark = darkDark ? "rgba(255,255,255,0.55)" : "rgba(10,10,10,0.45)";
        const logoFilter = dark ? "brightness(0) invert(1)" : "none";

        return (
          <button
            key={item.author}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "relative overflow-hidden rounded-2xl transition-all duration-300 ease-in-out cursor-pointer text-left",
              isActive ? "flex-[4]" : "flex-[1]"
            )}
            style={{
              "--tc-bg": bg,
              "--tc-bg-dark": bgDark,
              "--tc-text": textColor,
              "--tc-text-dark": textColorDark,
              "--tc-muted": mutedColor,
              "--tc-muted-dark": mutedColorDark,
              "--tc-logo-filter": logoFilter,
              "--tc-logo-filter-dark": darkDark ? "brightness(0) invert(1)" : "none",
              backgroundColor: "var(--tc-bg)",
            } as React.CSSProperties}
          >
            <style>{`
              @media (prefers-color-scheme: dark) {
                [data-tc-idx="${i}"] { background-color: var(--tc-bg-dark) !important; }
                [data-tc-idx="${i}"] .tc-text { color: var(--tc-text-dark) !important; }
                [data-tc-idx="${i}"] .tc-muted { color: var(--tc-muted-dark) !important; }
                [data-tc-idx="${i}"] .tc-logo { filter: var(--tc-logo-filter-dark) !important; }
              }
              .dark [data-tc-idx="${i}"] { background-color: var(--tc-bg-dark) !important; }
              .dark [data-tc-idx="${i}"] .tc-text { color: var(--tc-text-dark) !important; }
              .dark [data-tc-idx="${i}"] .tc-muted { color: var(--tc-muted-dark) !important; }
              .dark [data-tc-idx="${i}"] .tc-logo { filter: var(--tc-logo-filter-dark) !important; }
            `}</style>
            <div data-tc-idx={i} className="absolute inset-0" style={{ backgroundColor: "inherit" }}>
              {/* Background watermark logo */}
              {item.logo && (
                <div className="absolute bottom-6 right-6 pointer-events-none">
                  <Image
                    src={item.logo}
                    alt=""
                    width={720}
                    height={720}
                    className="tc-logo object-contain opacity-[0.08]"
                    style={{ filter: logoFilter }}
                  />
                </div>
              )}

              {/* Collapsed state — logo only */}
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                  isActive ? "opacity-0 pointer-events-none" : "opacity-100"
                )}
              >
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt={item.company}
                    width={80}
                    height={32}
                    className="tc-logo -rotate-90 object-contain"
                    style={{ filter: logoFilter }}
                  />
                ) : (
                  <span
                    className="tc-text text-sm font-medium tracking-widest uppercase -rotate-90 whitespace-nowrap"
                    style={{ color: textColor }}
                  >
                    {item.company}
                  </span>
                )}
              </div>

              {/* Expanded state — quote + author */}
              <div
                className={cn(
                  "absolute inset-0 flex flex-col justify-between p-8 md:p-10 transition-opacity duration-300",
                  isActive ? "opacity-100 delay-300" : "opacity-0 pointer-events-none delay-0"
                )}
              >
                <blockquote
                  className="tc-text text-xl md:text-2xl lg:text-[28px] leading-snug font-medium tracking-tight"
                  style={{ color: textColor }}
                >
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3 mt-auto pt-6">
                  <div>
                    <div className="tc-text text-sm font-medium" style={{ color: textColor }}>
                      {item.author}
                    </div>
                    <div className="tc-muted text-xs" style={{ color: mutedColor }}>
                      {item.role}, {item.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
