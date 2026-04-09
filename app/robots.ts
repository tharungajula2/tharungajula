import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/life-lab',
    },
    sitemap: 'https://tharungajula.com/sitemap.xml',
  };
}
