import { Footer } from "@/components/Footer";
import SparklesText from "@/components/ui/sparkles-text";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { getPortfolio } from "@/lib/payload-cms";

export default async function Realisations() {
  const projects = await getPortfolio();

  return (
    <div className="flex flex-col w-full justify-center items-center gap-10 ">
      <SparklesText
        text="On vous en met "
        text2="plein les yeux !"
        className="text-2xl md:text-7xl h-[50vh] w-full flex text-center justify-center items-center"
      />

      <PortfolioGrid projects={projects} />
      <Footer />
    </div>
  );
}
