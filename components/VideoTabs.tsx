import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Video from "next-video";
import awesomeVideo from "/videos/DOWNTOWN part2.mp4";
import video2 from "/videos/Free HD Galaxy Seamless Loop - Stock Footage.mp4";
import video3 from "/videos/Rainy City Night - Royalty Free Stock Footage.mp4";
import { AnimatedButton } from "./AnimatedButton";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
export default function VideoTabs() {
  return (
    <Tabs
      defaultValue="1"
      className="flex flex-col items-center  justify-center w-2/3"
    >
      <TabsList className="mb-4">
        <TabsTrigger value="1">MODE/BEAUTÉ</TabsTrigger>
        <TabsTrigger value="2">CORPORATE/SOCIAL</TabsTrigger>
        <TabsTrigger value="3">ÉVÈNEMENT</TabsTrigger>
        <TabsTrigger value="4">SOCIAL MEDIA</TabsTrigger>
        <TabsTrigger value="5">LIFESTYLE/SPORTS</TabsTrigger>
      </TabsList>
      <TabsContent value="1" className="flex flex-row gap-10">
        <Video src={awesomeVideo} />
        <Video src={video2} />
      </TabsContent>
      <TabsContent value="2" className="flex flex-row gap-10">
        <Video src={awesomeVideo} />
        <Video src={video3} />
      </TabsContent>
      <TabsContent value="3" className="flex flex-row gap-10">
        <Video src={video3} />
        <Video src={video2} />
      </TabsContent>
      <TabsContent value="4" className="flex flex-row gap-10">
        <Video src={awesomeVideo} />
        <Video src={video3} />
      </TabsContent>
      <TabsContent value="5" className="flex flex-row gap-10">
        <Video src={awesomeVideo} />
        <Video src={video2} />
      </TabsContent>
    </Tabs>
  );
}
