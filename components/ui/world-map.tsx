// components/ui/world-map.tsx
"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { useTheme } from "next-themes";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
    color?: string;
  }>;
  lineColor?: string;
}

export default function WorldMap({
  dots = [],
  lineColor = "#8000FF",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [svgMap, setSvgMap] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    let mounted = true;
    // run off the main render path
    const t = setTimeout(async () => {
      try {
        // dynamic import so dotted-map isn't bundled / executed until now
        const DottedMapModule = await import("dotted-map");
        const DottedMap = (DottedMapModule as any).default ?? DottedMapModule;
        const map = new DottedMap({ height: 100, grid: "diagonal" });
        const svg = map.getSVG({
          radius: 0.22,
          color: "#FFFFFF40",
          shape: "circle",
          // adapt bg to theme
          backgroundColor: "black",
        });
        if (mounted) setSvgMap(svg);
      } catch (e) {
        console.error("Failed to build dotted map:", e);
      }
    }, 0);

    return () => {
      mounted = false;
      clearTimeout(t);
    };
  }, [theme]);

  const projectPoint = useMemo(
    () => (lat: number, lng: number) => {
      const x = (lng + 180) * (800 / 360);
      const y = (90 - lat) * (400 / 180);
      return { x, y };
    },
    []
  );

  const createCurvedPath = useMemo(
    () => (start: { x: number; y: number }, end: { x: number; y: number }) => {
      const midX = (start.x + end.x) / 2;
      const midY = Math.min(start.y, end.y) - 50;
      return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
    },
    []
  );

  if (!svgMap) {
    // easy placeholder while SVG builds + chunk downloads
    return <div className="w-full aspect-[2/1] rounded-lg bg-neutral-100/20" />;
  }

  return (
    <div className="w-full aspect-[2/1] bg-transparent rounded-lg relative font-sans">
      <Image
        width={1000}
        height={1000}
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        alt="world map"
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8000FF" /> {/* Purple */}
            <stop offset="50%" stopColor="#FF0080" /> {/* Pink/magenta */}
            <stop offset="100%" stopColor="#FF7F00" /> {/* Orange */}
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          const d = createCurvedPath(startPoint, endPoint);
          return (
            <g key={i}>
              <motion.path
                d={d}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }} // triggers when in viewport
                viewport={{ once: true, amount: 0.5 }} // animate only once when 50% visible
                transition={{ duration: 1, delay: 0.5 * i, ease: "easeOut" }}
              />
              <circle
                cx={startPoint.x}
                cy={startPoint.y}
                r="2"
                fill={lineColor}
              />
              <circle cx={endPoint.x} cy={endPoint.y} r="2" fill={lineColor} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
