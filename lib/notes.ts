import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
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

let cachedData: CacheData | null = null;
let totalCiteCount = 0;

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

function getRawText(node: any): string {
  if (!node) return '';
  if (node.type === 'text') return node.value || '';
  if (node.children && Array.isArray(node.children)) {
    return node.children.map(getRawText).join('');
  }
  return '';
}

function rehypeTransformCallouts() {
  return (tree: any) => {
    visit(tree, 'element', (node: any) => {
      if ((node.tagName === 'p' || node.tagName === 'blockquote') && node.children && node.children.length > 0) {
        const fullText = getRawText(node).trim();

        // 1. SAY THIS / SCRIPT CALLOUT (► SAY THIS or ►)
        if (fullText.includes('► SAY THIS') || fullText.startsWith('►')) {
          node.tagName = 'div';
          node.properties = { className: ['callout-say-this'] };

          visit(node, 'text', (textNode: any) => {
            if (textNode.value && textNode.value.includes('►')) {
              textNode.value = textNode.value
                .replace(/►\s*SAY THIS/g, '')
                .replace(/►/g, '')
                .trimStart();
            }
          });

          visit(node, 'element', (elNode: any, elIdx: number | undefined, elParent: any) => {
            if (elNode.tagName === 'strong' && getRawText(elNode).trim() === '') {
              if (elParent && typeof elIdx === 'number') {
                elParent.children.splice(elIdx, 1);
              }
            }
          });

          node.children.unshift({
            type: 'element',
            tagName: 'div',
            properties: { className: ['callout-label', 'label-say-this'] },
            children: [{ type: 'text', value: '[ SAY THIS ]' }]
          });
          return;
        }

        // 2. TRADE-OFF CALLOUT (⚖️ or ⚖)
        if (fullText.includes('⚖')) {
          node.tagName = 'div';
          node.properties = { className: ['callout-tradeoff'] };
          
          visit(node, 'text', (textNode: any) => {
            if (textNode.value) {
              textNode.value = textNode.value.replace(/^[\u2696\uFE0F\u2696]\s*/g, '').replace(/[\u2696\uFE0F\u2696]/g, '');
            }
          });

          node.children.unshift({
            type: 'element',
            tagName: 'div',
            properties: { className: ['callout-label', 'label-tradeoff'] },
            children: [{ type: 'text', value: '[ TRADE-OFF ]' }]
          });
          return;
        }

        // 3. DEFINITION (📘)
        if (fullText.startsWith('📘')) {
          node.tagName = 'div';
          node.properties = { className: ['callout-definition'] };
          visit(node, 'text', (textNode: any) => {
            if (textNode.value && textNode.value.startsWith('📘')) {
              textNode.value = textNode.value.replace(/^📘\s*/, '');
            }
          });
          node.children.unshift({
            type: 'element',
            tagName: 'span',
            properties: { className: ['callout-label', 'label-definition'] },
            children: [{ type: 'text', value: '[ DEFINITION ] ' }]
          });
          return;
        }

        // 4. TRAP (🔴)
        if (fullText.startsWith('🔴')) {
          node.tagName = 'div';
          node.properties = { className: ['callout-trap'] };
          visit(node, 'text', (textNode: any) => {
            if (textNode.value && textNode.value.startsWith('🔴')) {
              textNode.value = textNode.value.replace(/^🔴\s*/, '');
            }
          });
          node.children.unshift({
            type: 'element',
            tagName: 'div',
            properties: { className: ['callout-label', 'label-trap'] },
            children: [{ type: 'text', value: '[ TRAP ]' }]
          });
          return;
        }

        // 5. WARNING (⚠️)
        if (fullText.startsWith('⚠️')) {
          node.tagName = 'div';
          node.properties = { className: ['callout-warning'] };
          visit(node, 'text', (textNode: any) => {
            if (textNode.value && textNode.value.startsWith('⚠️')) {
              textNode.value = textNode.value.replace(/^⚠️\s*/, '');
            }
          });
          node.children.unshift({
            type: 'element',
            tagName: 'div',
            properties: { className: ['callout-label', 'label-warning'] },
            children: [{ type: 'text', value: '[ WARNING ]' }]
          });
          return;
        }

        // 6. CHECK (✅)
        if (fullText.startsWith('✅')) {
          node.tagName = 'div';
          node.properties = { className: ['callout-check'] };
          visit(node, 'text', (textNode: any) => {
            if (textNode.value && textNode.value.startsWith('✅')) {
              textNode.value = textNode.value.replace(/^✅\s*/, '');
            }
          });
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
          return;
        }

        // 7. WORKED EXAMPLE (🧮)
        if (fullText.startsWith('🧮')) {
          node.tagName = 'div';
          node.properties = { className: ['callout-worked'] };
          visit(node, 'text', (textNode: any) => {
            if (textNode.value && textNode.value.startsWith('🧮')) {
              textNode.value = textNode.value.replace(/^🧮\s*/, '');
            }
          });
          node.children.unshift({
            type: 'element',
            tagName: 'div',
            properties: { className: ['callout-label', 'label-worked'] },
            children: [{ type: 'text', value: '[ WORKED EXAMPLE ]' }]
          });
          return;
        }
      }
    });

    // Handle mid-paragraph 📘 definitions
    visit(tree, 'element', (node: any) => {
      if ((node.tagName === 'p' || node.tagName === 'div') && node.children) {
        for (let i = 1; i < node.children.length; i++) {
          const child = node.children[i];
          if (child.type === 'text' && child.value.includes('📘')) {
            child.value = child.value.replace(/📘\s*/g, '[ DEFINITION ] ');
          }
        }
      }
    });
  };
}

function rehypeCleanStraySymbols() {
  return (tree: any) => {
    visit(tree, 'text', (node: any) => {
      if (node.value && (node.value.includes('►') || node.value.includes('⚖'))) {
        node.value = node.value
          .replace(/►\s*SAY THIS/g, 'SAY THIS')
          .replace(/►/g, '')
          .replace(/[\u2696\uFE0F\u2696]/g, '');
      }
    });
  };
}

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

export const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeKatex)
  .use(rehypeStripLeadingH1)
  .use(rehypeWrapTables)
  .use(rehypeUnwrapCite)
  .use(rehypeTransformCallouts)
  .use(rehypeCleanStraySymbols)
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

  const contentDir = path.join(process.cwd(), 'content');
  if (!fs.existsSync(contentDir)) {
    throw new Error(`Content directory missing: ${contentDir}`);
  }

  const trackRecords = new Map<string, TrackRecord>();
  const allChapters: ChapterRecord[] = [];
  const allVolumes: VolumeRecord[] = [];

  const EXCLUDED_DIRS = new Set(['1_case_studies', 'notes']);
  const trackDirs = fs.existsSync(contentDir) ? fs.readdirSync(contentDir).filter(dirName => {
    if (dirName.startsWith('_')) return false;
    if (EXCLUDED_DIRS.has(dirName)) return false;
    const fullPath = path.join(contentDir, dirName);
    return fs.statSync(fullPath).isDirectory();
  }) : [];

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

// ─── NOTES CONTENT & SECTION SPLITTING LAYER ─────────────────────────

const notesDir = path.join(process.cwd(), 'content', 'notes');
const slidesDir = path.join(process.cwd(), 'content', 'slides');

export interface NoteFrontmatter {
  title: string;
  subtitle?: string;
  slug: string;
  summary?: string;
  date?: string | null;
  order?: number;
  tags?: string[];
  isSlideDeck?: boolean;
  deckHtmlPath?: string;
  slideCount?: number;
}

export interface NoteSectionHeader {
  title: string;
  slug: string;
  wordCount: number;
  readingTimeMinutes: number;
}

export interface NoteSectionRecord extends NoteSectionHeader {
  rawContent: string;
  slideIndex?: number;
}

export interface NoteRecord {
  frontmatter: NoteFrontmatter;
  preambleRaw: string;
  preambleHtml: string;
  description: string;
  sections: NoteSectionRecord[];
  totalWordCount: number;
  totalReadingTimeMinutes: number;
  isSlideDeck?: boolean;
  deckHtmlPath?: string;
  slideCount?: number;
}

export function compareNotes(a: NoteFrontmatter | NoteRecord, b: NoteFrontmatter | NoteRecord): number {
  const fmA = 'frontmatter' in a ? a.frontmatter : a;
  const fmB = 'frontmatter' in b ? b.frontmatter : b;

  const orderA = fmA.order;
  const orderB = fmB.order;

  const hasOrderA = typeof orderA === 'number';
  const hasOrderB = typeof orderB === 'number';

  if (hasOrderA && hasOrderB) {
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    const da = fmA.date ? new Date(fmA.date).getTime() : 0;
    const db = fmB.date ? new Date(fmB.date).getTime() : 0;
    if (da !== db) return db - da;
    return fmA.slug.localeCompare(fmB.slug);
  }

  if (hasOrderA && !hasOrderB) return -1;
  if (!hasOrderA && hasOrderB) return 1;

  const da = fmA.date ? new Date(fmA.date).getTime() : 0;
  const db = fmB.date ? new Date(fmB.date).getTime() : 0;
  if (da !== db) return db - da;
  return fmA.slug.localeCompare(fmB.slug);
}

export function generateSectionSlug(headingText: string): string {
  return headingText
    .replace(/[§·]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function deriveNoteTitle(body: string, filename: string): string {
  const headingMatch = body.match(/^#{1,6}\s+(.+)$/m);
  if (headingMatch) return headingMatch[1].trim();
  return path.basename(filename, '.md')
    .replace(/^\d{4}-\d{2}-\d{2}-/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getGitCommitDate(filePath: string): string | null {
  try {
    const stdout = execSync(`git log -1 --format=%cd --date=iso-strict "${filePath}"`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'],
    }).trim();
    if (stdout && !isNaN(new Date(stdout).getTime())) {
      return stdout.slice(0, 10);
    }
  } catch {
    // Fallback if git fails
  }
  return null;
}

function filenameToSlug(filename: string): string {
  return path.basename(filename, '.md');
}

function countWords(str: string): number {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

export function getAllSlideDeckFolders(): string[] {
  if (!fs.existsSync(slidesDir)) return [];
  return fs.readdirSync(slidesDir).filter(f => {
    if (f.startsWith('_')) return false;
    const p = path.join(slidesDir, f);
    return fs.statSync(p).isDirectory();
  }).sort((a, b) => {
    const numA = parseInt(a.split('_')[0], 10) || 0;
    const numB = parseInt(b.split('_')[0], 10) || 0;
    return numA - numB;
  });
}

export function parseSlideDeckFolder(folderName: string): NoteRecord | null {
  const folderPath = path.join(slidesDir, folderName);
  if (!fs.existsSync(folderPath) || !fs.statSync(folderPath).isDirectory()) return null;

  const files = fs.readdirSync(folderPath);
  const htmlFile = files.find(f => f.endsWith('.dc.html') || f.endsWith('.html'));
  if (!htmlFile) return null;

  const htmlPath = path.join(folderPath, htmlFile);
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  const orderMatch = folderName.match(/^(\d+)[_-]/);
  const order = orderMatch ? parseInt(orderMatch[1], 10) : 1;
  const noteNumStr = `NOTE ${String(order).padStart(3, '0')}`;

  let title = `${noteNumStr}: ${folderName.replace(/^\d+[_-]/, '').replace(/[-_]/g, ' ')}`;
  const h1Match = htmlContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) {
    const rawH1 = h1Match[1].replace(/<[^>]+>/g, '').trim();
    if (rawH1) {
      title = `${noteNumStr}: ${rawH1}`;
    }
  }

  let subtitle = "Interactive credit risk slide deck & preparation reference.";
  const pMatch = htmlContent.match(/<p[^>]*style="[^"]*var\(--t-sub\)[^"]*"[^>]*>([\s\S]*?)<\/p>/i) || htmlContent.match(/<p[^>]*class="[^"]*sub[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
  if (pMatch) {
    subtitle = pMatch[1].replace(/<[^>]+>/g, '').trim();
  }

  const sectionRegex = /<section\s+([^>]*)>([\s\S]*?)<\/section>/gi;
  const sections: NoteSectionRecord[] = [];
  let secMatch: RegExpExecArray | null;
  let slideIdx = 0;

  while ((secMatch = sectionRegex.exec(htmlContent)) !== null) {
    slideIdx++;
    const attrs = secMatch[1];
    const body = secMatch[2];

    const labelMatch = attrs.match(/data-label="([^"]+)"/i);
    let secTitle = labelMatch ? labelMatch[1] : `Slide ${slideIdx}`;

    const h1SecMatch = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (h1SecMatch) {
      const parsedH1 = h1SecMatch[1].replace(/<[^>]+>/g, '').trim();
      if (parsedH1) secTitle = parsedH1;
    }

    sections.push({
      title: secTitle,
      slug: `slide-${slideIdx}`,
      wordCount: countWords(body.replace(/<[^>]+>/g, ' ')),
      readingTimeMinutes: 1,
      rawContent: secTitle,
      slideIndex: slideIdx,
    });
  }

  const slideCount = slideIdx || 99;
  const totalWordCount = countWords(htmlContent.replace(/<[^>]+>/g, ' '));
  const totalReadingTimeMinutes = Math.max(Math.ceil(slideCount * 0.75), 10);
  const slug = folderName.replace(/\s+/g, '_');
  const deckHtmlPath = `/slides/${encodeURIComponent(folderName)}/${encodeURIComponent(htmlFile)}`;

  const frontmatter: NoteFrontmatter = {
    title,
    subtitle,
    slug,
    date: '2026-08-05',
    order,
    tags: ['Credit Risk', 'MFI', 'Slide Deck', 'IIFL Samasta'],
    isSlideDeck: true,
    deckHtmlPath,
    slideCount,
  };

  return {
    frontmatter,
    preambleRaw: subtitle,
    preambleHtml: `<p>${subtitle}</p>`,
    description: subtitle,
    sections,
    totalWordCount,
    totalReadingTimeMinutes,
    isSlideDeck: true,
    deckHtmlPath,
    slideCount,
  };
}

function parseNoteFile(filePath: string): NoteRecord {
  const filename = path.basename(filePath);
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
  let date = data.date ? String(data.date) : null;

  if (date) {
    if (isNaN(new Date(date).getTime())) {
      console.warn(`[Note Warning] Malformed date "${date}" in note file ${filename}.`);
      date = null;
    } else {
      date = new Date(date).toISOString().slice(0, 10);
    }
  }

  if (!date) {
    date = getGitCommitDate(filePath);
  }

  const frontmatter: NoteFrontmatter = {
    title,
    subtitle: (data.subtitle as string) || undefined,
    slug,
    summary: (data.summary as string) || undefined,
    date,
    order: typeof data.order === 'number' ? data.order : undefined,
    tags: Array.isArray(data.tags) ? data.tags : [],
  };

  const contentLines = parsed.content.split(/\r?\n/);
  
  const h1Indices: { lineIdx: number; text: string }[] = [];
  contentLines.forEach((line, idx) => {
    if (line.startsWith('# ')) {
      const headingText = line.slice(2).trim();
      h1Indices.push({ lineIdx: idx, text: headingText });
    }
  });

  let preambleRaw = parsed.content;
  const sections: NoteSectionRecord[] = [];
  const slugSet = new Set<string>();

  let sectionHeadings = h1Indices;
  if (h1Indices.length > 1) {
    const firstTitleClean = h1Indices[0].text.toLowerCase();
    const fmTitleClean = title.toLowerCase();
    if (firstTitleClean.includes(fmTitleClean) || fmTitleClean.includes(firstTitleClean) || h1Indices[0].lineIdx === 0 || h1Indices[0].lineIdx < 5) {
      sectionHeadings = h1Indices.slice(1);
    }
  }

  if (sectionHeadings.length > 0) {
    const firstSectionLineIdx = sectionHeadings[0].lineIdx;
    preambleRaw = contentLines.slice(0, firstSectionLineIdx).join('\n');

    for (let i = 0; i < sectionHeadings.length; i++) {
      const current = sectionHeadings[i];
      const startLine = current.lineIdx;
      const endLine = i < sectionHeadings.length - 1 ? sectionHeadings[i + 1].lineIdx : contentLines.length;
      
      const secLines = contentLines.slice(startLine, endLine);
      const secRaw = secLines.join('\n');
      const secSlug = generateSectionSlug(current.text);

      if (slugSet.has(secSlug)) {
        throw new Error(`[Content Validation Error] Duplicate section slug "${secSlug}" in note "${filename}".`);
      }
      slugSet.add(secSlug);

      const words = countWords(secRaw);
      sections.push({
        title: current.text,
        slug: secSlug,
        wordCount: words,
        readingTimeMinutes: Math.max(1, Math.ceil(words / 200)),
        rawContent: secRaw,
      });
    }
  }

  const preambleWords = countWords(preambleRaw);
  const totalWordCount = preambleWords + sections.reduce((acc, s) => acc + s.wordCount, 0);

  return {
    frontmatter,
    preambleRaw,
    preambleHtml: '',
    description: deriveDescription(parsed.content),
    sections,
    totalWordCount,
    totalReadingTimeMinutes: Math.max(1, Math.ceil(totalWordCount / 200)),
  };
}

export function getAllDetailedNotes(): NoteRecord[] {
  const records: NoteRecord[] = [];

  // 1. Slide Deck Notes
  const slideFolders = getAllSlideDeckFolders();
  for (const folder of slideFolders) {
    const slideRecord = parseSlideDeckFolder(folder);
    if (slideRecord) {
      records.push(slideRecord);
    }
  }

  // 2. Markdown Notes (if any)
  if (fs.existsSync(notesDir)) {
    const files = fs.readdirSync(notesDir).filter(f => f.endsWith('.md'));
    for (const filename of files) {
      records.push(parseNoteFile(path.join(notesDir, filename)));
    }
  }

  return records.sort(compareNotes);
}

export function getAllNotes(): NoteFrontmatter[] {
  return getAllDetailedNotes().map(r => r.frontmatter);
}

export function getAllNoteParams(): { note: string }[] {
  return getAllDetailedNotes().map(n => ({ note: n.frontmatter.slug }));
}

export function getAllNoteSectionParams(): { note: string; section: string }[] {
  const params: { note: string; section: string }[] = [];
  const allDetailed = getAllDetailedNotes();

  for (const record of allDetailed) {
    for (const sec of record.sections) {
      params.push({ note: record.frontmatter.slug, section: sec.slug });
    }
  }
  return params;
}

export async function getNoteOverview(noteSlug: string): Promise<NoteRecord | null> {
  const allNotes = getAllDetailedNotes();
  const normalizedRequested = decodeURIComponent(noteSlug).replace(/\s+/g, '_');

  const found = allNotes.find(
    n =>
      n.frontmatter.slug === noteSlug ||
      n.frontmatter.slug === decodeURIComponent(noteSlug) ||
      n.frontmatter.slug.replace(/\s+/g, '_') === normalizedRequested
  );
  if (found) return found;

  return null;
}

export async function getNoteSection(
  noteSlug: string,
  sectionSlug: string
): Promise<{
  noteTitle: string;
  noteSlug: string;
  section: {
    title: string;
    slug: string;
    html: string;
    wordCount: number;
    readingTimeMinutes: number;
  };
  headings: HeadingItem[];
  allSections: { title: string; slug: string }[];
  currentIndex: number;
  totalSections: number;
  prevSection: { title: string; slug: string } | null;
  nextSection: { title: string; slug: string } | null;
} | null> {
  if (!fs.existsSync(notesDir)) return null;
  const filePath = path.join(notesDir, `${noteSlug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const record = parseNoteFile(filePath);
  const secIdx = record.sections.findIndex(s => s.slug === sectionSlug);
  if (secIdx === -1) return null;

  const sec = record.sections[secIdx];
  const vfile = await markdownProcessor.process(sec.rawContent);
  const html = String(vfile);
  const headings = extractHeadings(html);

  const prevSec = secIdx > 0 ? record.sections[secIdx - 1] : null;
  const nextSec = secIdx < record.sections.length - 1 ? record.sections[secIdx + 1] : null;

  return {
    noteTitle: record.frontmatter.title,
    noteSlug,
    section: {
      title: sec.title,
      slug: sec.slug,
      html,
      wordCount: sec.wordCount,
      readingTimeMinutes: sec.readingTimeMinutes,
    },
    headings,
    allSections: record.sections.map(s => ({ title: s.title, slug: s.slug })),
    currentIndex: secIdx,
    totalSections: record.sections.length,
    prevSection: prevSec ? { title: prevSec.title, slug: prevSec.slug } : null,
    nextSection: nextSec ? { title: nextSec.title, slug: nextSec.slug } : null,
  };
}

// ─── LOG PARSER & HELPERS ───

export interface LogEntry {
  date: string;
  slug: string;
  title: string;
  body: string;
  month: string;
}

export interface MonthLogRecord {
  month: string;
  title: string;
  entries: LogEntry[];
}

const contentDir = path.join(process.cwd(), 'content');
const logDir = path.join(contentDir, 'log');

export function parseLogFile(filePath: string): MonthLogRecord | null {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(raw);
  const month = parsed.data.month || path.basename(filePath, '.md');
  const title = parsed.data.title || month;

  const content = parsed.content;
  const rawSections = content.split(/^---$/m);
  const entries: LogEntry[] = [];

  for (const section of rawSections) {
    const trimmed = section.trim();
    if (!trimmed) continue;

    const match = trimmed.match(/^##\s+(\d{4}-\d{2}-\d{2})\s+—\s+(.+?)(?:\r?\n|$)/);
    if (!match) {
      console.warn(`[Log Parser Warning] Malformed entry heading in ${filePath}: "${trimmed.slice(0, 40)}..."`);
      continue;
    }

    const [, date, entryTitle] = match;
    const body = trimmed.slice(match[0].length).trim();

    entries.push({
      date,
      slug: date,
      title: entryTitle.trim(),
      body,
      month,
    });
  }

  return {
    month,
    title,
    entries,
  };
}

export function getAllLogMonths(): MonthLogRecord[] {
  if (!fs.existsSync(logDir)) return [];
  const files = fs.readdirSync(logDir).filter(f => f.endsWith('.md') && !f.startsWith('_')).sort().reverse();
  const result: MonthLogRecord[] = [];
  for (const file of files) {
    const rec = parseLogFile(path.join(logDir, file));
    if (rec) result.push(rec);
  }
  return result;
}

export function getLogMonth(month: string): MonthLogRecord | null {
  if (!fs.existsSync(logDir)) return null;
  const filePath = path.join(logDir, `${month}.md`);
  if (!fs.existsSync(filePath)) return null;
  return parseLogFile(filePath);
}

export function getLogMonthData(month: string): (MonthLogRecord & { entries: (LogEntry & { htmlContent: string })[] }) | null {
  const data = getLogMonth(month);
  if (!data) return null;

  const entriesWithHtml = data.entries.map((entry) => {
    let htmlContent = entry.body;
    try {
      const vfile = markdownProcessor.processSync(entry.body);
      htmlContent = String(vfile);
    } catch (err) {
      htmlContent = `<p>${entry.body}</p>`;
    }
    return {
      ...entry,
      htmlContent,
    };
  });

  return {
    ...data,
    entries: entriesWithHtml,
  };
}

export function getAllLogEntries(): LogEntry[] {
  const months = getAllLogMonths();
  const entries: LogEntry[] = [];
  for (const m of months) {
    entries.push(...m.entries);
  }
  return entries;
}

export function getAllLogMonthParams(): { month: string }[] {
  const months = getAllLogMonths();
  return months.map(m => ({ month: m.month }));
}

