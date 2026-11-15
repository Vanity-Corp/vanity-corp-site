import { cn } from "@/lib/utils";
import React from "react";

// Deterministic pseudo-random (seeded by index) instead of Math.random() —
// purely decorative positions, but Math.random() during render produces
// different values on the server vs. the client during hydration, which
// React flags as a mismatch. A seeded generator renders identically both
// times while still looking random.
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number || 20).fill(true);
  return (
    <>
      {meteors.map((el, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={{
            top: 0,
            left: Math.floor(seededRandom(idx) * 800 - 400) + "px",
            animationDelay: seededRandom(idx + 0.3) * 0.6 + 0.2 + "s",
            animationDuration: Math.floor(seededRandom(idx + 0.7) * 8 + 2) + "s",
          }}
        ></span>
      ))}
    </>
  );
};
