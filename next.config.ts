import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Validated with `npx tsc --noEmit`
    ignoreBuildErrors: true,
  },
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/security-audit",
        destination: "/services/cybersecurity",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
