import BannerSlider from "@/components/BannerSlider";
import { Footer } from "@/components/Footer";
import QuoteEstimator from "@/components/QuoteEstimator";
import React from "react";

export default function Estimation() {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <QuoteEstimator />
      <Footer />
    </div>
  );
}
