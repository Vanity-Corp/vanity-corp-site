"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function VideoTabs() {
  return (
    <Tabs
      defaultValue="corporate"
      className="flex flex-col items-center justify-center w-full "
    >
      <TabsList className="mb-4 flex flex-wrap justify-center">
        <TabsTrigger value="corporate">Corporate</TabsTrigger>
        <TabsTrigger value="clipMusicaux">Clip musicaux</TabsTrigger>
        <TabsTrigger value="videosYoutube">Vidéos Youtube</TabsTrigger>
        <TabsTrigger value="reseauxSociaux">Réseaux Sociaux</TabsTrigger>
        <TabsTrigger value="mariages">Mariages</TabsTrigger>
      </TabsList>
      <TabsContent
        value="corporate"
        className="w-full flex justify-center items-center"
      >
        <div className="grid grid-cols-3 gap-4 aspect-w-16 aspect-h-9">
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/P-p6UCSI_9Y"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/B24bXC6JeL8"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/fw7BHL8SGdA"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/JigOgTgga8I"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/vssf-pslUUY"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/vkOw8YWW5SI"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/lYfrCJ2sb6Q"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/g7Ow3zjhvVw"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/bvN1oaxa6UY"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/LBcJyhv7HLU"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/SVEWluZm5Gg"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </TabsContent>

      <TabsContent
        value="clipMusicaux"
        className="w-full flex justify-center items-center"
      >
        <div className="grid grid-cols-3 gap-4 aspect-w-16 aspect-h-9">
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/-w3Es3FWQbc"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/3lnQqy2rEas"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/Kz-Wb80y1Ew"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/wtnoCLyCaC8"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/mxeo3zaf0Vo"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </TabsContent>

      <TabsContent
        value="videosYoutube"
        className="w-full flex justify-center items-center"
      >
        <div className="grid grid-cols-3 gap-4 aspect-w-16 aspect-h-9">
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/dJSDUQT4-8A"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/-Mi9ZGXi6CA"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/0hP97zNWvLc"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/Q9kkYBtzoqw"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/RLAGjujRzJk"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/mtHZkhw22dk"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value="reseauxSociaux"
        className="w-full flex justify-center items-center"
      >
        <div className="grid grid-cols-3 gap-4 aspect-w-16 aspect-h-9">
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/90WkKZWJrT0"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/kfROVwkBIIk"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/z_BfOMxJPOA"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/Z8AAFNOmkZo"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/tcldKtr6NMU"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/Q4zuEgYl4sg"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/06Qd0PysEMM"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/WMdE7ukPtkk"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/jYjMa1UO_r8"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/ENkjsIglKt4"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/gNfPSqIe64A"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/cXPU2MUau1s"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/zb0_rgtAijI"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/pJh6t6mNlXs"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </TabsContent>

      <TabsContent
        value="mariages"
        className="w-full flex justify-center items-center"
      >
        <div className="grid grid-cols-3 gap-4 aspect-w-16 aspect-h-9">
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/cpSECAvIVHg"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            <iframe
              width={460}
              height={315}
              src="https://www.youtube.com/embed/mBy8MELq7r4"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
