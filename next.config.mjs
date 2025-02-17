/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "vanitycorp.fr",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "aceternity.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
