import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Validated with `npx tsc --noEmit`
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
