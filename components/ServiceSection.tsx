import { Button } from "./ui/button";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
type Feature = {
  name: string;
  description: string;
  icon: LucideIcon;
};

type FeatureSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  features: Feature[];
  image: string;
  link: string;
  color: string;
  reverse?: boolean;
};

export default function FeatureSection({
  eyebrow,
  title,
  description,
  features,
  image,
  link,
  color,
  reverse = false,
}: FeatureSectionProps) {
  return (
    <div className="overflow-hidden max-w-[1920px] m-auto py-24 sm:py-32">
      <div className="px-6 sm:px-10 lg:px-32">
        <div className="mx-auto  grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className={clsx(reverse && "lg:order-2")}>
            <div className="lg:max-w-lg">
              <h2 className={`text-base/7 font-semibold ${color}`}>
                {eyebrow}
              </h2>

              <p className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {title}
              </p>

              <p className="mt-6 text-lg text-gray-300">{description}</p>

              <dl className="mt-10 space-y-8 text-base text-gray-400">
                {features.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-white">
                        <Icon
                          className={`absolute top-1 left-1 size-5 ${color}`}
                        />
                        {feature.name}
                      </dt>{" "}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  );
                })}
              </dl>
              <Button className="mt-10 text-base sm:text-xl uppercase rounded-full">
                <Link href={link}>Voir plus de details</Link>
              </Button>
            </div>
          </div>

          <div className={clsx(reverse && "lg:order-1")}>
            <Image
              src={image}
              alt={title}
              width={2432}
              height={1442}
              className="w-full max-w-3xl rounded-xl object-cover shadow-xl ring-1 ring-white/10 h-[320px] sm:h-[500px] lg:h-[700px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
