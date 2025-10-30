import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.start.gg",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gametora.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "umamusu.wiki",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
