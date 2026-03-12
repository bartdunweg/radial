"use client";

import { useEffect, useState, useCallback } from "react";

const allClients = [
  "Heineken", "Uber", "Kpn", "Adyen", "Bol.com", "Rijksoverheid", "Spie", "Miro",
  "Louwman", "Temper", "Gvb", "Van dale", "Magnet.me", "Hopin", "Leaseplan", "Whoppah",
];

interface RotatingClientsProps {
  className?: string;
  count?: number;
}

export function RotatingClients({ className, count = 8 }: RotatingClientsProps) {
  const [visible, setVisible] = useState(allClients.slice(0, count));
  const [fadingOut, setFadingOut] = useState<number | null>(null);
  const [fadingIn, setFadingIn] = useState<number | null>(null);
  const [nextPool, setNextPool] = useState(count);

  const swapOne = useCallback(() => {
    const slotIndex = Math.floor(Math.random() * count);

    setFadingOut(slotIndex);

    setTimeout(() => {
      setVisible((prev) => {
        const next = [...prev];
        const currentVisible = new Set(next);
        let poolIndex = nextPool;
        let newName = allClients[poolIndex % allClients.length];
        let attempts = 0;
        while (currentVisible.has(newName) && attempts < allClients.length) {
          poolIndex++;
          newName = allClients[poolIndex % allClients.length];
          attempts++;
        }
        next[slotIndex] = newName;
        setNextPool((poolIndex + 1) % allClients.length);
        return next;
      });
      setFadingOut(null);
      setFadingIn(slotIndex);

      setTimeout(() => {
        setFadingIn(null);
      }, 300);
    }, 300);
  }, [nextPool, count]);

  useEffect(() => {
    const interval = setInterval(swapOne, 2000);
    return () => clearInterval(interval);
  }, [swapOne]);

  const gridClass = count <= 6
    ? "grid grid-cols-3 md:grid-cols-6"
    : "grid grid-cols-4 md:grid-cols-8";

  return (
    <div className={gridClass}>
      {visible.map((name, i) => (
        <div
          key={i}
          className="flex items-center justify-center"
        >
          <span
            style={{ fontFamily: "var(--font-satoshi), sans-serif" }}
            className={`text-lg font-medium tracking-tight ${className || "text-muted-foreground"} transition-all duration-300 md:text-2xl ${
              fadingOut === i
                ? "-translate-y-2 opacity-0"
                : fadingIn === i
                  ? "translate-y-0 opacity-100"
                  : "translate-y-0 opacity-100"
            }`}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}
