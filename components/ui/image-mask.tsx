import Image from "next/image";
import React from "react";

type Props = {
  src: string;
  alt?: string;
  // we keep only a single "default" variant but allow choosing one of the 4 outlines via `shape`
  variant?: "default";
  shape?: "one" | "two" | "three" | "four";
  className?: string;
  width?: number;
  height?: number;
};

const svgToDataUrl = (svg: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

// Four replacement outlines (converted to white-filled paths for mask usage)
const masks = {
  one: svgToDataUrl(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 221 122' width='221' height='122'>
      <path fill='%23fff' d='M221 28V14H43H24H4C1.79086 14 0 15.7909 0 18V81.5C0 83.7091 1.79086 85.5 4 85.5H20C22.2091 85.5 24 87.2909 24 89.5V94V103V118C24 120.209 25.7909 122 28 122H203C205.209 122 207 120.209 207 118V64C207 61.791 208.791 60 211 60H217C219.209 60 221 58.209 221 56V28Z'/>
    </svg>
  `),

  two: svgToDataUrl(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 221 122' width='221' height='122'>
      <path fill='%23fff' d='M221 108V122H43H24H4C1.79086 122 0 120.209 0 118V54.5C0 52.2909 1.79086 50.5 4 50.5H20C22.2091 50.5 24 48.7091 24 46.5V42V33V18C24 15.791 25.7909 14 28 14H203C205.209 14 207 15.791 207 18V72C207 74.209 208.791 76 211 76H217C219.209 76 221 77.791 221 80V108Z' />
    </svg>
  `),

  three: svgToDataUrl(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 221 122' width='221' height='122'>
      <path fill='%23fff' d='M183 118C183 120.209 184.791 122 187 122H217C219.209 122 221 120.209 221 118V108V94V23C221 20.791 219.209 19 217 19H182C179.791 19 178 17.209 178 15V4C178 1.791 176.209 0 174 0H28C25.7909 0 24 1.791 24 4V19V28V76C24 78.2091 22.2091 80 20 80H4C1.79086 80 0 81.7909 0 84V104C0 106.209 1.79086 108 4 108H24H43H179C181.209 108 183 109.791 183 112V118Z' />
    </svg>
  `),

  four: svgToDataUrl(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 221 122' width='221' height='122'>
      <path fill='%23fff' d='M217 122H187L43 122H24H4C1.79086 122 0 120.209 0 118V67.5C0 65.2909 1.79086 63.5 4 63.5H20C22.2091 63.5 24 61.7091 24 59.5V28V19V3.99999C24 1.79099 25.7909 7.62939e-06 28 7.62939e-06H193C195.209 7.62939e-06 197 1.79099 197 3.99999V15C197 17.209 198.791 19 201 19H217C219.209 19 221 20.791 221 23V94V108V118C221 120.209 219.209 122 217 122Z' />
    </svg>
  `),
} as const;

const defaultStyle: React.CSSProperties = {
  boxShadow: "0 14px 36px rgba(0,0,0,0.16)",
};

export default function DefaultImageMask({
  src,
  alt = "image",
  variant = "default",
  shape = "one",
  className = "",
  width = 1213,
  height = 667,
}: Props) {
  // only default variant is supported; user can choose which of the 4 outlines to use via `shape`
  const mask = (masks as any)[shape] ?? masks.one;

  return (
    <figure
      aria-label={alt}
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: `${width}/${height}`,
        backgroundColor: "#111827",
        ...defaultStyle,
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: "cover", transition: "transform 360ms ease" }}
        className="w-full h-full object-cover will-change-transform hover:scale-105"
      />
    </figure>
  );
}

export const MaskDefaultOne = (p: Omit<Props, "shape">) => (
  <DefaultImageMask {...p} shape="one" />
);
export const MaskDefaultTwo = (p: Omit<Props, "shape">) => (
  <DefaultImageMask {...p} shape="two" />
);
export const MaskDefaultThree = (p: Omit<Props, "shape">) => (
  <DefaultImageMask {...p} shape="three" />
);
export const MaskDefaultFour = (p: Omit<Props, "shape">) => (
  <DefaultImageMask {...p} shape="four" />
);

/*
Usage:
<DefaultImageMask src="/photo.jpg" shape="one" />
<DefaultImageMask src="/photo.jpg" shape="three" />

This component removes all previous mask variants and exposes only a "default" mask component with 4 outline shapes (one..four) matching the SVGs you provided.
*/
