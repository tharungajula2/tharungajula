import { MetadataRoute } from 'next';
import { getAllUniverseIds, getAllPublicModules } from '@/lib/life-lab/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tharungajula.com'; // Updated from tharungajula.vercel.app for production canonicality

  // Static Pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  return [...staticPages];
}
