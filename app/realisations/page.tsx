import { Footer } from "@/components/Footer";
import SparklesText from "@/components/ui/sparkles-text";
import { WorkFocusCards } from "@/components/WorkCards";

import React from "react";

export default function Realisations() {
  return (
    <div className="flex flex-col w-full justify-center items-center gap-10 ">
      <SparklesText
        text="On vous en met "
        text2="plein les yeux !"
        className="text-2xl md:text-7xl h-[50vh] w-full flex justify-center items-center"
      />
      <WorkFocusCards />
      <Footer />
    </div>
  );
}
