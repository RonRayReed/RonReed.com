import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Local development (no Docker)
      { protocol: "http", hostname: "localhost", port: "1337" },
      // Docker internal network
      { protocol: "http", hostname: "backend", port: "1337" },
    ],
  },
};

export default nextConfig;
