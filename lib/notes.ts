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
        if (child.tagName === 'h1' || child.tagName === 'h2') {
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
    .replace(/^---[\s\S]*?---/, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/^#+\s+.*$/gm, '')
    .replace(/^>\s*/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/&amp;/gi, '&')
    .replace(/\r\n|\r/g, '\n')
    .trim();

  const paragraphs = cleanText
    .split('\n\n')
    .map(p => p.replace(/\s+/g, ' ').trim())
    .filter(p => p.length > 0 && !p.toLowerCase().startsWith('status:') && !p.toLowerCase().startsWith('companion to:'));

  if (paragraphs.length === 0) return '';

  const firstPara = paragraphs[0];
  const sentences = firstPara.match(/[^.!?]+[.!?]+/g);
  if (sentences && sentences.length >= 2) {
    return (sentences[0] + ' ' + sentences[1]).trim();
  }
  if (sentences && sentences.length === 1) {
    return sentences[0].trim();
  }

  return firstPara.slice(0, 180).trim();
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

// ─── LOG PARSER & HELPERS ───

export interface LogEntry {
  date: string;
  slug: string;
  title: string;
  body: string;
  summary: string;
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

    const cleanText = body
      .replace(/```[\s\S]*?```/g, '')
      .replace(/\$\$[\s\S]*?\$\$/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/[#*`_$>|\\-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const summary = cleanText.slice(0, 160) || 'Log entry details.';

    entries.push({
      date,
      slug: date,
      title: entryTitle.trim(),
      body,
      summary,
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

export async function getLogMonthData(month: string): Promise<(MonthLogRecord & { entries: (LogEntry & { htmlContent: string })[] }) | null> {
  const data = getLogMonth(month);
  if (!data) return null;

  const entriesWithHtml = await Promise.all(
    data.entries.map(async (entry) => {
      let htmlContent = entry.body;
      try {
        const vfile = await markdownProcessor.process(entry.body);
        htmlContent = String(vfile);
      } catch (err) {
        console.error('Error processing log entry markdown:', err);
        htmlContent = `<p>${entry.body}</p>`;
      }
      return {
        ...entry,
        htmlContent,
      };
    })
  );

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

