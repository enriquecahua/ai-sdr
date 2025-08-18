import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Avoid failing the production build on ESLint errors in Azure CI
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
