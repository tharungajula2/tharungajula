import { MetadataRoute } from 'next';
import { getAllLogMonthParams } from '@/lib/notes';
import { getKnowledgeItems } from '@/lib/knowledge';

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
      url: `${baseUrl}/notebook/log`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // 2. Dynamic Field Cards pages (served directly from content/field_cards)
  const knowledgeItems = getKnowledgeItems();
  const fieldCardPages: MetadataRoute.Sitemap = knowledgeItems
    .filter((item) => item.type === 'field_card')
    .map((card) => ({
      url: `${baseUrl}${card.href}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  // 3. Log month pages
  const logMonthParams = getAllLogMonthParams();
  const logMonthPages: MetadataRoute.Sitemap = logMonthParams.map((m) => ({
    url: `${baseUrl}/notebook/log/${m.month}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...fieldCardPages,
    ...logMonthPages,
  ];
}
