import { MetadataRoute } from 'next';
import { getAllNoteParams, getAllNoteSectionParams, getAllLogMonthParams } from '@/lib/notes';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tharungajula.vercel.app';

  // 1. Core static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/story`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/connect`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/notebook`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/notebook/notes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/notebook/log`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // 2. Note overview pages
  const noteParams = getAllNoteParams();
  const notePages: MetadataRoute.Sitemap = noteParams.map((n) => ({
    url: `${baseUrl}/notebook/notes/${n.note}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 3. Note section pages
  const noteSectionParams = getAllNoteSectionParams();
  const noteSectionPages: MetadataRoute.Sitemap = noteSectionParams.map((ns) => ({
    url: `${baseUrl}/notebook/notes/${ns.note}/${ns.section}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // 4. Log month pages
  const logMonthParams = getAllLogMonthParams();
  const logMonthPages: MetadataRoute.Sitemap = logMonthParams.map((m) => ({
    url: `${baseUrl}/notebook/log/${m.month}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...notePages,
    ...noteSectionPages,
    ...logMonthPages,
  ];
}
