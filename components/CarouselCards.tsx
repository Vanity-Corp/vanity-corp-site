import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const carouselData = [
  { id: 1, hours: "+1623 heures de montage", icon: "/editing.webp" },
  { id: 2, hours: " +590 idées crées", icon: "/lightbolb.webp" },
  {
    id: 3,
    hours: "Boom ! Des centaines d'abonnés gagnés",
    icon: "/subscribers.webp",
  },
];

export function CarouselCard() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[70%] max-w-sm"
    >
      <CarouselContent className="w-full">
        {carouselData.map((item) => (
          <CarouselItem key={item.id}>
            <div className="p-1">
              <Card className="rounded-3xl bg-white">
                <CardContent className="flex h-[200px] flex-col items-center justify-center p-6 rounded-3xl">
                  <Image
                    src={item.icon}
                    width={40}
                    height={40}
                    alt="illustration"
                  />
                  <div className="text-xl text-black font-semibold text-center">
                    {item.hours}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
