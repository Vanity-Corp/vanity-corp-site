"use client";
import React, { useEffect, useMemo, useState } from "react";

// ProcessStepper.tsx
// React + TypeScript single-file component using Tailwind CSS.
// Default export a React component. Drop it into a Next.js page or any React app.

type Step = {
  id: number;
  title: string;
  label: string;
};

export default function ProcessStepper() {
  const steps: Step[] = useMemo(
    () => [
      { id: 1, title: "01", label: "PRÉPARATION" },
      { id: 2, title: "02", label: "CRÉATION" },
      { id: 3, title: "03", label: "LIVRAISON" },
    ],
    []
  );

  // currentStep = how many steps have been "activated" (0..steps.length)
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    // start the sequential activation: every 1s activate next step until all are active
    const interval = setInterval(() => {
      setCurrentStep((s) => {
        if (s >= steps.length) {
          clearInterval(interval);
          return s;
        }
        return s + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [steps.length]);

  // percent of progress bar (0 -> 100). When currentStep === 0 -> 0%, when currentStep === steps.length -> 100%
  const progressPercent = useMemo(() => {
    return Math.round((currentStep / steps.length) * 100);
  }, [currentStep, steps.length]);

  return (
    <div className="w-full py-8 bg-[#1d2023] flex justify-center">
      <div className="w-full max-w-3xl px-6">
        <h2 className="text-center text-3xl font-extrabold text-white mb-6">
          Process
        </h2>

        <div className="relative">
          {/* rail */}
          <div className="h-0.5 absolute left-0 top-0 bg-white/60 rounded-full w-full mx-auto" />

          {/* progress bar (on top of rail) */}
          <div
            className="absolute left-0 top-0 -translate-y-1/2 h-0.5 bg-emerald-400 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
            aria-hidden
          />

          {/* markers row */}
          <div className="flex justify-between items-start mt-2">
            {steps.map((step, idx) => {
              const completed = idx < currentStep; // becomes true once the step has been activated

              return (
                <div key={step.id} className="flex flex-col items-center w-1/3">
                  {/* circular marker */}
                  <div className="relative mt-[-7%]">
                    <div
                      className={`w-8 h-8 rounded-full  flex items-center justify-center transition-all duration-500 ease-out ${
                        completed
                          ? "bg-emerald-400 scale-105 "
                          : "bg-transparent"
                      }`}
                      aria-hidden
                    />
                    {/* small inner white dot to mimic design */}
                    <div
                      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full transition-opacity duration-300 ${
                        completed ? "opacity-0" : "opacity-100 bg-white"
                      }`}
                    />
                  </div>

                  {/* big number */}
                  <div className="mt-3 text-4xl font-extrabold">
                    <span
                      className={`inline-block transition-colors duration-500 ${
                        completed ? "text-emerald-400" : "text-white/80"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>

                  {/* tilted label */}
                  <div
                    className={`mt-2 px-3 py-1 text-xl font-bold tracking-wide transform -rotate-3 shadow-sm transition-all duration-500 ${
                      completed
                        ? "bg-emerald-400 text-black shadow-emerald-600/30"
                        : "bg-white text-black/90"
                    }`}
                    style={{
                      boxShadow: completed
                        ? "0 6px 0 -3px rgba(16,185,129,0.4)"
                        : "0 6px 0 -3px rgba(0,0,0,0.06)",
                    }}
                  >
                    {step.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
