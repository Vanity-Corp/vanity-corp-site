"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";

const videos = {
  corporate: [
    "https://www.youtube.com/embed/B24bXC6JeL8",
    "https://www.youtube.com/embed/fw7BHL8SGdA",
    "https://www.youtube.com/embed/JigOgTgga8I",
    "https://www.youtube.com/embed/vssf-pslUUY",
    "https://www.youtube.com/embed/vkOw8YWW5SI",
    "https://www.youtube.com/embed/lYfrCJ2sb6Q",
    "https://www.youtube.com/embed/g7Ow3zjhvVw",
    "https://www.youtube.com/embed/bvN1oaxa6UY",
    "https://www.youtube.com/embed/LBcJyhv7HLU",
    "https://www.youtube.com/embed/SVEWluZm5Gg",
  ],
  clipMusicaux: [
    "https://www.youtube.com/embed/-w3Es3FWQbc",
    "https://www.youtube.com/embed/3lnQqy2rEas",
    "https://www.youtube.com/embed/Kz-Wb80y1Ew",
    "https://www.youtube.com/embed/wtnoCLyCaC8",
    "https://www.youtube.com/embed/mxeo3zaf0Vo",
  ],
  videosYoutube: [
    "https://www.youtube.com/embed/dJSDUQT4-8A",
    "https://www.youtube.com/embed/-Mi9ZGXi6CA",
    "https://www.youtube.com/embed/0hP97zNWvLc",
    "https://www.youtube.com/embed/Q9kkYBtzoqw",
    "https://www.youtube.com/embed/RLAGjujRzJk",
    "https://www.youtube.com/embed/mtHZkhw22dk",
  ],
  reseauxSociaux: [
    "https://www.youtube.com/embed/90WkKZWJrT0",
    "https://www.youtube.com/embed/kfROVwkBIIk",
    "https://www.youtube.com/embed/z_BfOMxJPOA",
    "https://www.youtube.com/embed/Z8AAFNOmkZo",
    "https://www.youtube.com/embed/tcldKtr6NMU",
  ],
  mariages: ["https://www.youtube.com/embed/mBy8MELq7r4"],
};

export default function VideoTabs() {
  return (
    <Tabs
      defaultValue="corporate"
      className="flex flex-col items-center justify-center w-full"
    >
      <TabsList className="mb-4 flex flex-wrap justify-center">
        <TabsTrigger className="text-[10px] md:text-base" value="corporate">
          Corporate
        </TabsTrigger>
        <TabsTrigger className="text-[10px] md:text-base" value="clipMusicaux">
          Clip musicaux
        </TabsTrigger>
        <TabsTrigger className="text-[10px] md:text-base" value="videosYoutube">
          Vidéos Youtube
        </TabsTrigger>
        <TabsTrigger
          className="text-[10px] md:text-base"
          value="reseauxSociaux"
        >
          Réseaux Sociaux
        </TabsTrigger>
        <TabsTrigger className="text-[10px] md:text-base" value="mariages">
          Mariages
        </TabsTrigger>
      </TabsList>
      {Object.entries(videos).map(([category, urls]) => (
        <TabsContent
          key={category}
          value={category}
          className="w-full flex justify-center px-10 items-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 md:px-32 gap-4 w-full">
            {urls.map((url, index) => {
              // Extract the video ID from the URL
              const id = url.split("/embed/")[1];
              return (
                <div key={index} className="relative">
                  <HeroVideoDialog
                    className="block"
                    animationStyle="from-center"
                    videoSrc={url}
                    thumbnailSrc={`https://i.ytimg.com/vi/${id}/sddefault.jpg`}
                    thumbnailAlt={`YouTube video thumbnail ${index + 1}`}
                  />
                </div>
              );
            })}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
