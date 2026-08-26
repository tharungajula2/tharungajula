import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/notebook',
        permanent: true,
      },
      {
        source: '/blog/notes',
        destination: '/notebook/notes',
        permanent: true,
      },
      {
        source: '/blog/notes/:slug',
        destination: '/notebook/notes/:slug',
        permanent: true,
      },
      {
        source: '/blog/notes/:slug/:section',
        destination: '/notebook/notes/:slug/:section',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/notebook',
        permanent: true,
      },
      {
        source: '/notebook/library',
        destination: '/notebook',
        permanent: false,
      },
      {
        source: '/notebook/library/:path*',
        destination: '/notebook',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
