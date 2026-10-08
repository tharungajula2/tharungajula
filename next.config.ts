import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/agent',
        destination: '/',
        permanent: true,
      },
      {
        source: '/connect',
        destination: '/',
        permanent: true,
      },
      {
        source: '/work',
        destination: '/',
        permanent: true,
      },
      {
        source: '/story',
        destination: '/',
        permanent: true,
      },
      {
        source: '/notebook',
        destination: '/notes',
        permanent: true,
      },
      {
        source: '/notebook/:path*',
        destination: '/notes/:path*',
        permanent: true,
      },
      {
        source: '/vault',
        destination: '/builds',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/notes/:path*',
        permanent: true,
      },
      {
        source: '/:slug(agentic-ai-ba-cheatsheet|my-work-cheatsheet|credit-risk-cheatsheet)',
        destination: '/notes/:slug',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
