import Link from "next/link";
import FuzzyText from "@/components/FuzzyText";
import { Footer } from "@/components/Footer";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Undo2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center w-full">
      <main className="flex flex-col items-center justify-center h-screen text-center w-full">
        <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={0.5}
          enableHover={true}
          color="red"
          fontSize={300}
        >
          404
        </FuzzyText>
        <p className="my-4 text-2xl text-gray-200">
          Oups ! Cette page est introuvable.
        </p>
        <Link href="/">
          <HoverBorderGradient className="flex gap-2 items-center bg-white text-black">
            Retour à l’accueil <Undo2 />
          </HoverBorderGradient>
        </Link>
      </main>

      <Footer />
    </div>
  );
}
