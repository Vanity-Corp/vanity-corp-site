import { Footer } from "@/components/Footer";
import SparklesText from "@/components/ui/sparkles-text";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { getPortfolio, getPage, findSection } from "@/lib/payload-cms";

export default async function Realisations() {
  const [projects, page] = await Promise.all([
    getPortfolio(),
    getPage("realisations"),
  ]);
  const hero = findSection(page, "hero");
  const heroText = (hero?.text as string) ?? "On vous en met ";
  const heroText2 = (hero?.text2 as string) ?? "plein les yeux !";

  return (
    <div className="flex flex-col w-full justify-center items-center gap-10 ">
      <SparklesText
        text={heroText}
        text2={heroText2}
        className="text-2xl md:text-7xl h-[50vh] w-full flex text-center justify-center items-center"
      />

      <PortfolioGrid projects={projects} />
      <Footer />
    </div>
  );
}
