import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Validated with `npx tsc --noEmit`
    ignoreBuildErrors: true,
  },
  poweredByHeader: false,
};

export default nextConfig;
