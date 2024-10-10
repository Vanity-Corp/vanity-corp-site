import { Footer } from "@/components/Footer";
import SparklesText from "@/components/ui/sparkles-text";
import { WorkParallax } from "@/components/WorkParallax";

import React from "react";

export default function Realisations() {
  return (
    <div className="flex flex-col w-full justify-center items-center gap-10">
      <WorkParallax />
      <div className="md:hidden h-full w-full">
        <SparklesText
          text="On vous en met "
          text2="plein les yeux !"
          className="text-2xl h-[50vh] w-full flex justify-center items-center"
        />
      </div>
      <Footer />
    </div>
  );
}
