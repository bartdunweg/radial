"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

const options = [
  { value: "system", icon: Monitor, label: "System theme" },
  { value: "light", icon: Sun, label: "Light theme" },
  { value: "dark", icon: Moon, label: "Dark theme" },
] as const;

export function ThemeToggle({ isHome = false }: { isHome?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="flex h-8 w-[104px]" />;

  return (
    <div
      className={`inline-flex items-center rounded-full border p-0.5 ${
        isHome
          ? "border-white/20 bg-white/10 backdrop-blur-sm"
          : "border-border bg-transparent dark:border-white/15"
      }`}
      role="radiogroup"
      aria-label="Theme"
    >
      {options.map(({ value, icon: Icon, label }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            role="radio"
            aria-checked={active}
            aria-label={label}
            onClick={() => setTheme(value)}
            className={`relative flex h-7 w-7 items-center justify-center rounded-full transition-all ${
              active
                ? isHome
                  ? "bg-white/20 text-white shadow-sm"
                  : "bg-black text-white shadow-sm dark:bg-white/15 dark:text-white"
                : isHome
                  ? "text-white/50 hover:text-white/80"
                  : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon size={14} />
          </button>
        );
      })}
    </div>
  );
}
