import { MetadataRoute } from 'next';
import { getAllTracks, getVolumesForTrack, getAllChapterParams, getAllNoteParams, getAllNoteSectionParams } from '@/lib/notes';

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
      url: `${baseUrl}/notebook/library`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
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

  // 4. Track pages (/notebook/library/credit-risk, /notebook/library/fde)
  const tracks = getAllTracks();
  const trackPages: MetadataRoute.Sitemap = tracks.map((t) => ({
    url: `${baseUrl}/notebook/library/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 5. Volume pages (/notebook/library/credit-risk/04-scorecards, etc.)
  const volumePages: MetadataRoute.Sitemap = [];
  for (const track of tracks) {
    const volumes = getVolumesForTrack(track.slug);
    for (const vol of volumes) {
      volumePages.push({
        url: `${baseUrl}/notebook/library/${track.slug}/${vol.folderName}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  // 6. Chapter pages (/notebook/library/credit-risk/04-scorecards/1-what-a-scorecard-is, etc.)
  const chapterParams = getAllChapterParams();
  const chapterPages: MetadataRoute.Sitemap = chapterParams.map((ch) => ({
    url: `${baseUrl}/notebook/library/${ch.track}/${ch.volume}/${ch.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...notePages,
    ...noteSectionPages,
    ...trackPages,
    ...volumePages,
    ...chapterPages,
  ];
}
