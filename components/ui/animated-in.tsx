"use client";

import { motion } from "framer-motion";
import { FADE_UP_DURATION_S, FADE_UP_Y } from "@/lib/motion";

/**
 * Fade-up-on-mount wrapper for above-the-fold content (hero blocks) where a
 * scroll-triggered `whileInView` reveal wouldn't make sense — the content is
 * already visible on load. Same duration/easing as the scroll-reveal variant
 * in lib/motion.ts for a consistent feel.
 */
export function AnimatedIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: FADE_UP_Y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: FADE_UP_DURATION_S, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
