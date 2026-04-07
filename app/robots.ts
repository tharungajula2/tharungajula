import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/atlas',
    },
    sitemap: 'https://tharungajula.vercel.app/sitemap.xml',
  };
}
