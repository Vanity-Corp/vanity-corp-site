import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: '"images.unsplash.com"',
        pathname: "**",
      },
    ], // Remplacez par vos domaines externes
  },
};

export default withNextVideo(nextConfig);