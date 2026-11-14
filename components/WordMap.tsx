import WorldMap from "@/components/ui/world-map";
import type { CmsWorldMapDot } from "@/lib/payload-cms";

const DEFAULT_DOTS = [
  { start: { lat: 37, lng: 2.352222, label: "Paris" }, end: { lat: 25.0522, lng: -95.2437 } }, // usa
  { start: { lat: 37, lng: 2.352222, label: "Paris" }, end: { lat: 55.0522, lng: -110.2437 } }, // canada
  { start: { lat: 37, lng: 2.352222 }, end: { lat: 35.948002, lng: 7.44813 } }, // suisse
  { start: { lat: 37, lng: 2.352222 }, end: { lat: 40.845539, lng: 4.35571 } }, // Belgium
  { start: { lat: 37, lng: 2.352222 }, end: { lat: 35.6139, lng: 90.209 } }, // Asia
  { start: { lat: 37, lng: 2.352222 }, end: { lat: -40.1332, lng: 131.9113 } }, // Australia
  { start: { lat: 37, lng: 2.352222 }, end: { lat: -1.2921, lng: 15.8219 } }, // Africa
];

export function WorldMapSection({ dots: cmsDots }: { dots?: CmsWorldMapDot[] }) {
  const dots =
    cmsDots && cmsDots.length > 0
      ? cmsDots.map((d) => ({
          start: { lat: d.startLat, lng: d.startLng, label: d.startLabel ?? undefined },
          end: { lat: d.endLat, lng: d.endLng, label: d.endLabel ?? undefined },
        }))
      : DEFAULT_DOTS;

  return (
    <div className="my-8 w-[80%]">
      <WorldMap dots={dots} />
    </div>
  );
}
