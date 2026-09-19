import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/work',
        destination: '/agent',
        permanent: true,
      },
      {
        source: '/story',
        destination: '/agent',
        permanent: true,
      },
      {
        source: '/notebook',
        destination: '/agent',
        permanent: true,
      },
      {
        source: '/notebook/:path*',
        destination: '/agent',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/agent',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
