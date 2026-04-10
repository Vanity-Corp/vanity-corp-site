"use client";

type StepperProps = {
  steps: string[];
  currentStep: number;
};

export default function ReactBitsStepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between gap-2">
        {steps.map((label, index) => {
          const isActive = index <= currentStep;
          const isCurrent = index === currentStep;
          return (
            <div key={label} className="flex items-center w-full last:w-auto">
              <div className="flex flex-col items-center">
                <div
                  className={`h-9 w-9 rounded-full border-2 flex items-center justify-center text-xs font-semibold transition-all ${
                    isActive
                      ? "border-[#D33E6B] bg-white text-[#D33E6B]"
                      : "border-zinc-300 bg-zinc-100 text-zinc-500"
                  } ${isCurrent ? "scale-105" : ""}`}
                >
                  {index + 1}
                </div>
                <span className="mt-2 text-[11px] md:text-xs text-center text-zinc-700 max-w-20">
                  {label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-[2px] flex-1 mx-2 md:mx-3 transition-colors ${
                    index < currentStep ? "bg-[#D33E6B]" : "bg-zinc-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
