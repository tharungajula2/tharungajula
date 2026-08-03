import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

export interface ChapterFrontmatter {
  track: string;
  trackLabel: string;
  volume: string;
  volumeSlug: string;
  volumeTitle: string;
  order: number;
  title: string;
  slug: string;
  sectionNumber: string | null;
  part: string | null;
  kind: 'front' | 'narrative' | 'interrogation' | 'scene' | string;
  sourceFile: string;
  tags: string[];
  hasSayThis: boolean;
  wordCount: number;
  status: string;
  section: string | null;
  summary: string;
  enriched: boolean;
}

export interface VolumeMetadata {
  title: string;
  track: string;
  volume: string;
  folderName: string;
}

export interface TrackMetadata {
  slug: string;
  label: string;
  volumeCount: number;
  chapterCount: number;
  totalWordCount: number;
}

export interface ChapterRecord {
  frontmatter: ChapterFrontmatter;
  rawContent: string;
  filePath: string;
  volumeFolder: string;
}

export interface VolumeRecord {
  metadata: VolumeMetadata;
  folderName: string;
  trackSlug: string;
  chapters: ChapterRecord[];
}

export interface TrackRecord {
  slug: string;
  label: string;
  volumes: VolumeRecord[];
}

interface CacheData {
  tracks: Map<string, TrackRecord>;
  allChapters: ChapterRecord[];
  allVolumes: VolumeRecord[];
  totalCiteTagsStripped: number;
}

// Global module-level cache
let cachedData: CacheData | null = null;
let totalCiteCount = 0;

// D1 FIX: Custom rehype plugin to strip leading H1 from body if present
function rehypeStripLeadingH1() {
  return (tree: any) => {
    for (let i = 0; i < tree.children.length; i++) {
      const child = tree.children[i];
      if (child.type === 'element') {
        if (child.tagName === 'h1') {
          tree.children.splice(i, 1);
        }
        break;
      }
    }
  };
}

// D2 FIX: Custom rehype plugin to wrap <table> in <div class="table-wrapper">
function rehypeWrapTables() {
  return (tree: any) => {
    visit(tree, 'element', (node: any, index: number | undefined, parent: any) => {
      if (node.tagName === 'table') {
        if (parent && parent.tagName === 'div' && parent.properties?.className?.includes('table-wrapper')) {
          return;
        }
        if (parent && typeof index === 'number') {
          const wrapper = {
            type: 'element',
            tagName: 'div',
            properties: { className: ['table-wrapper'] },
            children: [node],
          };
          parent.children[index] = wrapper;
        }
      }
    });
  };
}

// Custom rehype plugin to unwrap <cite index="..."> tags
function rehypeUnwrapCite() {
  return (tree: any) => {
    visit(tree, 'element', (node: any, index: number | undefined, parent: any) => {
      if (node.tagName === 'cite') {
        totalCiteCount++;
        if (parent && typeof index === 'number') {
          parent.children.splice(index, 1, ...node.children);
          return index;
        }
      }
    });
  };
}

// Custom rehype plugin to convert paragraph-opening emojis into 5 distinct callout containers
function rehypeTransformCallouts() {
  return (tree: any) => {
    visit(tree, 'element', (node: any) => {
      if (node.tagName === 'p' && node.children && node.children.length > 0) {
        const firstChild = node.children[0];
        let text = '';
        if (firstChild.type === 'text') {
          text = firstChild.value.trim();
        }

        if (text.startsWith('📘')) {
          node.tagName = 'div';
          node.properties = { className: ['callout-definition'] };
          firstChild.value = firstChild.value.replace(/^📘\s*/, '');
          node.children.unshift({
            type: 'element',
            tagName: 'span',
            properties: { className: ['callout-label', 'label-definition'] },
            children: [{ type: 'text', value: '[ DEFINITION ] ' }]
          });
        } else if (text.startsWith('🔴')) {
          node.tagName = 'div';
          node.properties = { className: ['callout-trap'] };
          firstChild.value = firstChild.value.replace(/^🔴\s*/, '');
          node.children.unshift({
            type: 'element',
            tagName: 'div',
            properties: { className: ['callout-label', 'label-trap'] },
            children: [{ type: 'text', value: '[ TRAP ]' }]
          });
        } else if (text.startsWith('⚠️')) {
          node.tagName = 'div';
          node.properties = { className: ['callout-warning'] };
          firstChild.value = firstChild.value.replace(/^⚠️\s*/, '');
          node.children.unshift({
            type: 'element',
            tagName: 'div',
            properties: { className: ['callout-label', 'label-warning'] },
            children: [{ type: 'text', value: '[ WARNING ]' }]
          });
        } else if (text.startsWith('✅')) {
          node.tagName = 'div';
          node.properties = { className: ['callout-check'] };
          firstChild.value = firstChild.value.replace(/^✅\s*/, '');
          const originalChildren = [...node.children];
          node.children = [
            {
              type: 'element',
              tagName: 'div',
              properties: { className: ['callout-check-header'] },
              children: [{ type: 'text', value: '[ VERIFY CHECK ]' }]
            },
            {
              type: 'element',
              tagName: 'div',
              properties: { className: ['callout-check-body'] },
              children: originalChildren
            }
          ];
        } else if (text.startsWith('🧮')) {
          node.tagName = 'div';
          node.properties = { className: ['callout-worked'] };
          firstChild.value = firstChild.value.replace(/^🧮\s*/, '');
          node.children.unshift({
            type: 'element',
            tagName: 'div',
            properties: { className: ['callout-label', 'label-worked'] },
            children: [{ type: 'text', value: '[ WORKED EXAMPLE ]' }]
          });
        }
      }
    });
  };
}

// Custom rehype plugin to transform inline bracketed status tags into first-class UI chips
function rehypeTransformStatusTags() {
  return (tree: any) => {
    const statusRegex = /\[(IN FORCE|DRAFT|VERIFY|RECEIPT|FROM [^\]]+)\]/g;

    visit(tree, 'text', (node: any, index: number | undefined, parent: any) => {
      if (!node.value || !statusRegex.test(node.value)) return;
      statusRegex.lastIndex = 0;

      const text = node.value;
      const newChildren = [];
      let lastIdx = 0;

      let match;
      while ((match = statusRegex.exec(text)) !== null) {
        const matchStart = match.index;
        const matchEnd = statusRegex.lastIndex;
        const tagContent = match[1];

        if (matchStart > lastIdx) {
          newChildren.push({ type: 'text', value: text.slice(lastIdx, matchStart) });
        }

        let chipClass = 'status-chip';
        if (tagContent === 'IN FORCE') chipClass += ' status-in-force';
        else if (tagContent === 'DRAFT') chipClass += ' status-draft';
        else if (tagContent === 'VERIFY') chipClass += ' status-verify';
        else if (tagContent === 'RECEIPT') chipClass += ' status-receipt';
        else if (tagContent.startsWith('FROM ')) chipClass += ' status-from';

        newChildren.push({
          type: 'element',
          tagName: 'span',
          properties: { className: [chipClass] },
          children: [{ type: 'text', value: tagContent }]
        });

        lastIdx = matchEnd;
      }

      if (lastIdx < text.length) {
        newChildren.push({ type: 'text', value: text.slice(lastIdx) });
      }

      if (parent && typeof index === 'number') {
        parent.children.splice(index, 1, ...newChildren);
        return index + newChildren.length;
      }
    });
  };
}

// Reusable unified processor instance with Shiki code highlighting
export const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeStripLeadingH1)
  .use(rehypeWrapTables)
  .use(rehypeUnwrapCite)
  .use(rehypeTransformCallouts)
  .use(rehypeTransformStatusTags)
  .use(rehypePrettyCode, {
    theme: {
      dark: 'github-dark-dimmed',
      light: 'github-light',
    },
    keepBackground: false,
  })
  .use(rehypeSlug)
  .use(rehypeStringify);

const REQUIRED_CHAPTER_KEYS: (keyof ChapterFrontmatter)[] = [
  'track', 'trackLabel', 'volume', 'volumeSlug', 'volumeTitle',
  'order', 'title', 'slug', 'sectionNumber', 'part', 'kind',
  'sourceFile', 'tags', 'hasSayThis', 'wordCount', 'status',
  'section', 'summary', 'enriched'
];

const REQUIRED_VOLUME_KEYS: (keyof VolumeMetadata)[] = [
  'title', 'track', 'volume'
];

function loadContentData(): CacheData {
  if (cachedData) {
    return cachedData;
  }

  const contentDir = path.join(process.cwd(), 'blog_content');
  if (!fs.existsSync(contentDir)) {
    throw new Error(`Content directory missing: ${contentDir}`);
  }

  const trackRecords = new Map<string, TrackRecord>();
  const allChapters: ChapterRecord[] = [];
  const allVolumes: VolumeRecord[] = [];

  const EXCLUDED_DIRS = new Set(['1_case_studies', 'notes']);
  const trackDirs = fs.readdirSync(contentDir).filter(dirName => {
    if (EXCLUDED_DIRS.has(dirName)) return false;
    const fullPath = path.join(contentDir, dirName);
    return fs.statSync(fullPath).isDirectory();
  });

  for (const trackDirName of trackDirs) {
    const trackPath = path.join(contentDir, trackDirName);
    const volumeFolderNames = fs.readdirSync(trackPath).filter(vName => {
      const fullVPath = path.join(trackPath, vName);
      return fs.statSync(fullVPath).isDirectory();
    }).sort((a, b) => {
      const numA = parseInt(a.split('-')[0], 10) || 0;
      const numB = parseInt(b.split('-')[0], 10) || 0;
      return numA - numB;
    });

    const volumeRecords: VolumeRecord[] = [];
    let trackLabel = trackDirName;
    const volumeFolderSet = new Set<string>();

    for (const volumeFolderName of volumeFolderNames) {
      if (volumeFolderSet.has(volumeFolderName)) {
        throw new Error(`[Content Validation Error] Duplicate volume folder "${volumeFolderName}" found in track "${trackDirName}"`);
      }
      volumeFolderSet.add(volumeFolderName);

      const volumePath = path.join(trackPath, volumeFolderName);
      const files = fs.readdirSync(volumePath).filter(f => f.endsWith('.md'));

      const volumeMetaFile = path.join(volumePath, '_volume.md');
      let volumeMetadata: VolumeMetadata;

      if (fs.existsSync(volumeMetaFile)) {
        const rawVol = fs.readFileSync(volumeMetaFile, 'utf8');
        const parsedVol = matter(rawVol);
        const data = parsedVol.data;

        for (const key of REQUIRED_VOLUME_KEYS) {
          if (!(key in data) || data[key] === undefined) {
            throw new Error(`[Content Validation Error] File "${volumeMetaFile}" is missing required key "${key}"`);
          }
        }

        volumeMetadata = {
          title: String(data.title),
          track: String(data.track),
          volume: String(data.volume),
          folderName: volumeFolderName,
        };
      } else {
        throw new Error(`[Content Validation Error] Missing _volume.md in ${volumePath}`);
      }

      const chapterFiles = files.filter(f => f !== '_volume.md').sort();
      const chapterRecords: ChapterRecord[] = [];
      const chapterSlugSet = new Set<string>();

      for (const chapterFile of chapterFiles) {
        const chapterFilePath = path.join(volumePath, chapterFile);
        const rawContent = fs.readFileSync(chapterFilePath, 'utf8');
        const parsed = matter(rawContent);
        const data = parsed.data;

        for (const key of REQUIRED_CHAPTER_KEYS) {
          if (!(key in data) || data[key] === undefined) {
            throw new Error(`[Content Validation Error] File "${chapterFilePath}" is missing required frontmatter key "${key}"`);
          }
        }

        const frontmatter = data as ChapterFrontmatter;
        if (chapterSlugSet.has(frontmatter.slug)) {
          throw new Error(`[Content Validation Error] Duplicate chapter slug "${frontmatter.slug}" in file "${chapterFilePath}" (volume "${volumeFolderName}")`);
        }
        chapterSlugSet.add(frontmatter.slug);

        if (frontmatter.trackLabel) {
          trackLabel = frontmatter.trackLabel;
        }

        const record: ChapterRecord = {
          frontmatter,
          rawContent: parsed.content,
          filePath: chapterFilePath,
          volumeFolder: volumeFolderName,
        };

        chapterRecords.push(record);
        allChapters.push(record);
      }

      chapterRecords.sort((a, b) => a.frontmatter.order - b.frontmatter.order);

      const volRecord: VolumeRecord = {
        metadata: volumeMetadata,
        folderName: volumeFolderName,
        trackSlug: trackDirName,
        chapters: chapterRecords,
      };

      volumeRecords.push(volRecord);
      allVolumes.push(volRecord);
    }

    trackRecords.set(trackDirName, {
      slug: trackDirName,
      label: trackLabel,
      volumes: volumeRecords,
    });
  }

  cachedData = {
    tracks: trackRecords,
    allChapters,
    allVolumes,
    totalCiteTagsStripped: totalCiteCount,
  };

  return cachedData;
}

// ─── PUBLIC API ───

export function getAllTracks(): TrackMetadata[] {
  const data = loadContentData();
  const tracks: TrackMetadata[] = [];

  for (const track of data.tracks.values()) {
    let chapterCount = 0;
    let totalWordCount = 0;

    for (const vol of track.volumes) {
      chapterCount += vol.chapters.length;
      for (const ch of vol.chapters) {
        totalWordCount += ch.frontmatter.wordCount || 0;
      }
    }

    tracks.push({
      slug: track.slug,
      label: track.label,
      volumeCount: track.volumes.length,
      chapterCount,
      totalWordCount,
    });
  }

  return tracks;
}

export function getTrack(trackSlug: string): TrackRecord | null {
  const data = loadContentData();
  return data.tracks.get(trackSlug) || null;
}

export function getVolumesForTrack(trackSlug: string): VolumeRecord[] {
  const track = getTrack(trackSlug);
  return track ? track.volumes : [];
}

export function getChaptersForVolume(trackSlug: string, volumeFolder: string): ChapterFrontmatter[] {
  const data = loadContentData();
  const track = data.tracks.get(trackSlug);
  if (!track) return [];

  const vol = track.volumes.find(v => v.folderName === volumeFolder);
  if (!vol) return [];

  return vol.chapters.map(c => c.frontmatter);
}

export function getAllChaptersForTrack(trackSlug: string): { frontmatter: ChapterFrontmatter; volumeFolder: string }[] {
  const data = loadContentData();
  const track = data.tracks.get(trackSlug);
  if (!track) return [];

  const result: { frontmatter: ChapterFrontmatter; volumeFolder: string }[] = [];
  for (const vol of track.volumes) {
    for (const ch of vol.chapters) {
      result.push({
        frontmatter: ch.frontmatter,
        volumeFolder: vol.folderName,
      });
    }
  }
  return result;
}

function deriveDescription(rawContent: string): string {
  const cleanText = rawContent
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/^#+\s+.*$/gm, '')
    .replace(/\r\n|\r/g, '\n')
    .trim();

  const paragraphs = cleanText.split('\n\n').map(p => p.trim()).filter(Boolean);
  if (paragraphs.length === 0) return '';

  const firstPara = paragraphs[0].replace(/\n/g, ' ');
  const sentences = firstPara.match(/[^.!?]+[.!?]+/g);
  if (sentences && sentences.length >= 2) {
    return (sentences[0] + ' ' + sentences[1]).trim();
  }
  if (sentences && sentences.length === 1) {
    return sentences[0].trim();
  }

  return firstPara.slice(0, 160).trim();
}

export interface HeadingItem {
  id: string;
  text: string;
}

function extractHeadings(html: string): HeadingItem[] {
  const headings: HeadingItem[] = [];
  const regex = /<h2[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const id = match[1];
    const text = match[2].replace(/<[^>]+>/g, '').trim();
    if (id && text) {
      headings.push({ id, text });
    }
  }
  return headings;
}

export async function getChapter(
  trackSlug: string,
  volumeFolder: string,
  chapterSlug: string
): Promise<{
  frontmatter: ChapterFrontmatter;
  html: string;
  description: string;
  headings: HeadingItem[];
} | null> {
  const data = loadContentData();
  const track = data.tracks.get(trackSlug);
  if (!track) return null;

  const vol = track.volumes.find(v => v.folderName === volumeFolder);
  if (!vol) return null;

  const chapterRecord = vol.chapters.find(c => c.frontmatter.slug === chapterSlug);
  if (!chapterRecord) return null;

  const vfile = await markdownProcessor.process(chapterRecord.rawContent);
  const html = String(vfile);
  const description = deriveDescription(chapterRecord.rawContent);
  const headings = extractHeadings(html);

  return {
    frontmatter: chapterRecord.frontmatter,
    html,
    description,
    headings,
  };
}

export function getPrevNextChapters(
  trackSlug: string,
  volumeFolder: string,
  chapterSlug: string
): {
  prev: { title: string; volumeFolder: string; slug: string } | null;
  next: { title: string; volumeFolder: string; slug: string } | null;
} {
  const allTrackChapters = getAllChaptersForTrack(trackSlug);
  const currentIndex = allTrackChapters.findIndex(
    item => item.volumeFolder === volumeFolder && item.frontmatter.slug === chapterSlug
  );

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prevItem = currentIndex > 0 ? allTrackChapters[currentIndex - 1] : null;
  const nextItem = currentIndex < allTrackChapters.length - 1 ? allTrackChapters[currentIndex + 1] : null;

  return {
    prev: prevItem ? { title: prevItem.frontmatter.title, volumeFolder: prevItem.volumeFolder, slug: prevItem.frontmatter.slug } : null,
    next: nextItem ? { title: nextItem.frontmatter.title, volumeFolder: nextItem.volumeFolder, slug: nextItem.frontmatter.slug } : null,
  };
}

export function getAllVolumeParams(): { track: string; volume: string }[] {
  const data = loadContentData();
  const params: { track: string; volume: string }[] = [];

  for (const vol of data.allVolumes) {
    params.push({
      track: vol.trackSlug,
      volume: vol.folderName,
    });
  }

  return params;
}

export function getAllChapterParams(): { track: string; volume: string; slug: string }[] {
  const data = loadContentData();
  const params: { track: string; volume: string; slug: string }[] = [];

  for (const ch of data.allChapters) {
    params.push({
      track: ch.frontmatter.track,
      volume: ch.volumeFolder,
      slug: ch.frontmatter.slug,
    });
  }

  return params;
}

export function getStrippedCiteCount(): number {
  loadContentData();
  return totalCiteCount;
}

// ─── NOTES CONTENT LAYER ───────────────────────────────────────────────────
// Forgiving schema: only `title` is required. Supports optional `summary`,
// `date` (ISO string or Date), and `tags`. If frontmatter is absent entirely,
// derives a title from the first heading or the filename.

const notesDir = path.join(process.cwd(), 'blog_content', 'notes');

export interface NoteFrontmatter {
  title: string;
  slug: string;
  summary?: string;
  date?: string | null;
  tags?: string[];
}

function deriveNoteTitle(body: string, filename: string): string {
  // Try first heading
  const headingMatch = body.match(/^#{1,6}\s+(.+)$/m);
  if (headingMatch) return headingMatch[1].trim();
  // Fall back to filename without extension, humanised
  return path.basename(filename, '.md')
    .replace(/^\d{4}-\d{2}-\d{2}-/, '') // strip leading date
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function filenameToSlug(filename: string): string {
  return path.basename(filename, '.md');
}

export function getAllNotes(): NoteFrontmatter[] {
  if (!fs.existsSync(notesDir)) return [];

  const files = fs.readdirSync(notesDir)
    .filter(f => f.endsWith('.md'))
    .sort(); // filename order as tiebreaker

  const notes: NoteFrontmatter[] = files.map(filename => {
    const filePath = path.join(notesDir, filename);
    const raw = fs.readFileSync(filePath, 'utf8');
    let parsed: ReturnType<typeof matter>;
    try {
      parsed = matter(raw);
    } catch {
      parsed = { data: {}, content: raw } as ReturnType<typeof matter>;
    }

    const data = parsed.data;
    const slug = filenameToSlug(filename);
    const title = (data.title as string) || deriveNoteTitle(parsed.content, filename);

    return {
      title,
      slug,
      summary: (data.summary as string) || undefined,
      date: (data.date as string) || null,
      tags: (data.tags as string[]) || [],
    };
  });

  // Sort: date desc (notes with dates first), then filename asc
  return notes.sort((a, b) => {
    if (a.date && b.date) return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (a.date) return -1;
    if (b.date) return 1;
    return a.slug.localeCompare(b.slug);
  });
}

export function getAllNoteParams(): { slug: string }[] {
  if (!fs.existsSync(notesDir)) return [];
  return fs.readdirSync(notesDir)
    .filter(f => f.endsWith('.md'))
    .map(f => ({ slug: filenameToSlug(f) }));
}

export async function getNote(slug: string): Promise<{
  frontmatter: NoteFrontmatter;
  html: string;
  description: string;
} | null> {
  if (!fs.existsSync(notesDir)) return null;

  const filePath = path.join(notesDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  let parsed: ReturnType<typeof matter>;
  try {
    parsed = matter(raw);
  } catch {
    parsed = { data: {}, content: raw } as ReturnType<typeof matter>;
  }

  const data = parsed.data;
  const title = (data.title as string) || deriveNoteTitle(parsed.content, filePath);

  const frontmatter: NoteFrontmatter = {
    title,
    slug,
    summary: (data.summary as string) || undefined,
    date: (data.date as string) || null,
    tags: (data.tags as string[]) || [],
  };

  const vfile = await markdownProcessor.process(parsed.content);
  const html = String(vfile);
  const description = deriveDescription(parsed.content);

  return { frontmatter, html, description };
}
