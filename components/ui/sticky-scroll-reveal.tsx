"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type StickyItem = {
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
  content?: React.ReactNode;
};

export function StickyScroll({
  content,
  className,
}: {
  content: StickyItem[];
  className?: string;
}) {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = content.length;
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "h-[28rem] overflow-y-auto flex justify-center relative rounded-md p-6 gap-10",
        className
      )}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-2xl font-bold text-white"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-lg text-slate-300 max-w-sm mt-6"
              >
                {item.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="mt-6"
              >
                <Link
                  href={item.href}
                  className="inline-flex rounded-full bg-white text-black px-4 py-2 text-sm font-medium"
                >
                  {item.buttonLabel}
                </Link>
              </motion.div>
            </div>
          ))}
          <div className="h-20" />
        </div>
      </div>
      <div className="hidden lg:block h-72 w-96 rounded-md bg-white sticky top-10 overflow-hidden">
        {content[activeCard].content ?? (
          <div className="h-full w-full bg-gradient-to-br from-neutral-200 to-neutral-400" />
        )}
      </div>
    </motion.div>
  );
}
