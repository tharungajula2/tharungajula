import { MetadataRoute } from 'next';
import { getAllTracks, getVolumesForTrack, getAllChapterParams } from '@/lib/notes';

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
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/notes`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // 2. Track pages (/blog/credit-risk, /blog/fde)
  const tracks = getAllTracks();
  const trackPages: MetadataRoute.Sitemap = tracks.map((t) => ({
    url: `${baseUrl}/blog/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 3. Volume pages (/blog/credit-risk/04-scorecards, etc.)
  const volumePages: MetadataRoute.Sitemap = [];
  for (const track of tracks) {
    const volumes = getVolumesForTrack(track.slug);
    for (const vol of volumes) {
      volumePages.push({
        url: `${baseUrl}/blog/${track.slug}/${vol.folderName}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  // 4. Chapter pages (/blog/credit-risk/04-scorecards/1-what-a-scorecard-is, etc.)
  const chapterParams = getAllChapterParams();
  const chapterPages: MetadataRoute.Sitemap = chapterParams.map((ch) => ({
    url: `${baseUrl}/blog/${ch.track}/${ch.volume}/${ch.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...trackPages,
    ...volumePages,
    ...chapterPages,
  ];
}
