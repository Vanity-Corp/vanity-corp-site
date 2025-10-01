import React from "react";

interface BannerVideoProps {
  /** Path or URL to your video (mp4/webm) */
  src: string;
  /** Optional fallback image for mobile / browsers that block autoplay */
  poster?: string;
  /** Content on top of the video */
  children?: React.ReactNode;
  className?: string;
}

const BannerVideo: React.FC<BannerVideoProps> = ({
  src,
  poster,
  children,
  className,
}) => {
  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`}>
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover object-bottom"
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Optional dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        {children}
      </div>
    </div>
  );
};

export default BannerVideo;
