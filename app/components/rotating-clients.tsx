"use client";

import { useEffect, useState, useCallback } from "react";

const allClients = [
  "Heineken", "Uber", "KPN", "Adyen", "Bol.com", "Rijksoverheid", "SPIE", "Miro",
  "Louwman", "Temper", "GVB", "Van Dale", "Magnet.me", "Hopin", "Leaseplan", "Whoppah",
];

const VISIBLE_COUNT = 8;

export function RotatingClients() {
  const [visible, setVisible] = useState(allClients.slice(0, VISIBLE_COUNT));
  const [fadingOut, setFadingOut] = useState<number | null>(null);
  const [fadingIn, setFadingIn] = useState<number | null>(null);
  const [nextPool, setNextPool] = useState(VISIBLE_COUNT);

  const swapOne = useCallback(() => {
    const slotIndex = Math.floor(Math.random() * VISIBLE_COUNT);

    setFadingOut(slotIndex);

    setTimeout(() => {
      setVisible((prev) => {
        const next = [...prev];
        const currentVisible = new Set(next);
        let poolIndex = nextPool;
        // Find a name not currently visible
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
  }, [nextPool]);

  useEffect(() => {
    const interval = setInterval(swapOne, 2000);
    return () => clearInterval(interval);
  }, [swapOne]);

  return (
    <div className="grid grid-cols-4 md:grid-cols-8">
      {visible.map((name, i) => (
        <div
          key={i}
          className="flex items-center justify-center"
        >
          <span
            style={{ fontFamily: "var(--font-satoshi), sans-serif" }}
            className={`text-lg font-medium tracking-tight text-muted-foreground transition-all duration-300 md:text-2xl ${
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
