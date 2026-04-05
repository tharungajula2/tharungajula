import { MetadataRoute } from 'next';
import { getAllUniverseIds, getAllPublicModules } from '@/lib/atlas/content';

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
      url: `${baseUrl}/atlas`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // Atlas Universes
  const universeIds = await getAllUniverseIds();
  const universePages = universeIds.map((id) => ({
    url: `${baseUrl}/atlas/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Atlas Modules
  const modules = await getAllPublicModules();
  const modulePages = modules.map((m) => ({
    url: `${baseUrl}/atlas/${m.universe}/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...universePages, ...modulePages];
}
