import type { NextConfig } from "next";

const configuredMediaHost = process.env.NEXT_PUBLIC_MEDIA_HOST?.trim();

const nextConfig: NextConfig = {
  output: "standalone",
  images: configuredMediaHost
    ? {
        remotePatterns: [
          {
            protocol: "https",
            hostname: configuredMediaHost,
          },
        ],
      }
    : undefined,
};

export default nextConfig;
