import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
    useCache: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hbdezjdbrvrwbivhapvl.supabase.co",
      },
      {
        protocol: "https",
        hostname: 'deifkwefumgah.cloudfront.net'
      }
    ],
  },
};

export default nextConfig;
