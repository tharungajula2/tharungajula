import { MetadataRoute } from 'next';
import { getSortedDocumentsData } from '@/lib/notes/markdown';
import { getWritingPosts } from '@/lib/writing/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tharungajula.vercel.app';
  const notes = getSortedDocumentsData();
  const writingPosts = getWritingPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/builds`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/builds/credit-risk-city`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  if (writingPosts.length > 0) {
    staticRoutes.push({
      url: `${baseUrl}/writing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  const noteRoutes: MetadataRoute.Sitemap = notes.map((doc) => ({
    url: `${baseUrl}/notes/${doc.slug}`,
    lastModified: doc.updated ? new Date(doc.updated) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const writingRoutes: MetadataRoute.Sitemap = writingPosts.map((post) => ({
    url: `${baseUrl}/writing/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...noteRoutes, ...writingRoutes];
}
