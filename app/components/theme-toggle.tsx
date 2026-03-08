"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ isHome = false }: { isHome?: boolean }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-5 w-5" />;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={
        isHome
          ? "flex h-[44px] w-[44px] items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
          : "flex h-[44px] w-[44px] items-center justify-center rounded-full text-foreground transition-colors hover:bg-black/5 dark:text-white dark:hover:bg-white/10"
      }
      aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
