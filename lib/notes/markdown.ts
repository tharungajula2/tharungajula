import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { SubjectId, ContentFormat, SUBJECT_MAP } from './subjects';

const contentDirectory = path.join(process.cwd(), 'content', 'notes');

export type { SubjectId, ContentFormat };
export type ContentStatus = 'draft' | 'live';

export interface DocumentMeta {
  slug: string;
  title: string;
  subject: SubjectId;
  topic?: string;
  format: ContentFormat;
  order?: number;
  status: ContentStatus;
  updated: string;
  description: string;
  verified?: string;
  created?: string;
  fileFormat: 'md' | 'html';
  tags: string[];
  readTime: string;
  wordCount: number;
}

export interface DocumentData extends DocumentMeta {
  content: string;
}

const WPM = 225;

function calculateReadTime(text: string): { readTime: string; wordCount: number } {
  const cleanText = text
    .replace(/^\s*<!--\s*[\s\S]*?-->/, ' ')
    .replace(/^\s*---[\s\S]*?---/, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' ');

  const words = cleanText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / WPM));
  return {
    readTime: `${minutes} min read`,
    wordCount: words,
  };
}

function parseTags(rawTags: unknown): string[] {
  if (Array.isArray(rawTags)) {
    return rawTags.map((t) => String(t).trim()).filter(Boolean);
  }
  if (typeof rawTags === 'string' && rawTags.trim()) {
    return rawTags.split(',').map((t) => t.trim()).filter(Boolean);
  }
  return [];
}

function formatDateString(val: unknown): string {
  if (!val) return '';
  if (val instanceof Date) {
    return val.toISOString().split('T')[0];
  }
  return String(val).trim();
}

function parseFrontmatter(fileContents: string) {
  const htmlCommentMatch = fileContents.match(/^\s*<!--\s*\n?(---\s*[\s\S]*?---)\s*\n?-->/);
  if (htmlCommentMatch) {
    const frontmatterText = htmlCommentMatch[1];
    const parsed = matter(frontmatterText);
    const content = fileContents.replace(/^\s*<!--\s*\n?---\s*[\s\S]*?---\s*\n?-->/, '').trim();
    return {
      data: parsed.data,
      content,
    };
  }
  return matter(fileContents);
}

function parseOrder(raw: unknown): number | undefined {
  if (typeof raw === 'number') return raw;
  if (typeof raw === 'string' && raw.trim()) {
    const parsed = parseInt(raw.trim(), 10);
    return isNaN(parsed) ? undefined : parsed;
  }
  return undefined;
}

function parseStatus(raw: unknown): ContentStatus {
  if (raw === 'draft') return 'draft';
  return 'live';
}

function parseVerified(raw: unknown): string {
  if (typeof raw === 'boolean') {
    return raw ? 'verified' : 'unverified';
  }
  if (typeof raw === 'string' && raw.trim()) {
    return raw.trim();
  }
  return 'unverified';
}

function extractTitleAndDescription(content: string, slug: string): { title: string; description: string } {
  const h1Match = content.match(/^#\s+(.+)$/m);
  let title = slug;
  let description = '';

  if (h1Match) {
    title = h1Match[1].trim();
    const afterH1 = content.slice((h1Match.index || 0) + h1Match[0].length);
    const paragraphs = afterH1
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p && !p.startsWith('#') && !p.startsWith('<') && !p.startsWith('---'));

    if (paragraphs.length > 0) {
      description = paragraphs[0].replace(/[*_]/g, '').trim();
    }
  }

  return { title, description };
}

interface RawFileRecord {
  fullPath: string;
  slug: string;
  subjectFolder: string;
  topicFolder?: string;
  isHtml: boolean;
}

function getAllContentFiles(dir: string = contentDirectory): RawFileRecord[] {
  if (!fs.existsSync(dir)) return [];
  const records: RawFileRecord[] = [];

  function walk(currentDir: string) {
    const items = fs.readdirSync(currentDir);
    for (const item of items) {
      if (item.startsWith('_') || item.startsWith('.')) continue;
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (stat.isFile() && (item.endsWith('.md') || item.endsWith('.html'))) {
        const relative = path.relative(contentDirectory, fullPath);
        const parts = relative.split(path.sep);

        let subjectFolder = '';
        let topicFolder: string | undefined = undefined;

        if (parts.length > 1) {
          subjectFolder = parts[0];
          if (parts.length > 2) {
            topicFolder = parts[1];
          }
        }

        const ext = path.extname(item);
        const slug = path.basename(item, ext);
        const isHtml = ext === '.html';

        records.push({
          fullPath,
          slug,
          subjectFolder,
          topicFolder,
          isHtml,
        });
      }
    }
  }

  walk(dir);
  return records;
}

function loadDocumentRecord(fileRecord: RawFileRecord): DocumentData | null {
  const fileContents = fs.readFileSync(fileRecord.fullPath, 'utf8');
  const matterResult = parseFrontmatter(fileContents);

  const status = parseStatus(matterResult.data.status);

  // Subject: folder wins over frontmatter
  let subject: SubjectId;
  const folderSubj = fileRecord.subjectFolder ? fileRecord.subjectFolder.toLowerCase() : '';

  if (folderSubj && folderSubj in SUBJECT_MAP) {
    subject = folderSubj as SubjectId;
  } else if (matterResult.data.subject && String(matterResult.data.subject).toLowerCase() in SUBJECT_MAP) {
    subject = String(matterResult.data.subject).toLowerCase() as SubjectId;
  } else {
    throw new Error(
      `Unknown or missing subject folder "${fileRecord.subjectFolder}" for note file "${fileRecord.fullPath}". Allowed subjects: ${Object.keys(SUBJECT_MAP).join(', ')}.`
    );
  }

  const format: ContentFormat =
    matterResult.data.format === 'article' || matterResult.data.format === 'masterclass'
      ? matterResult.data.format
      : 'masterclass';

  const order = parseOrder(matterResult.data.order);
  const verified = parseVerified(matterResult.data.verified);
  const { readTime, wordCount } = calculateReadTime(matterResult.content);

  const fallbacks = extractTitleAndDescription(matterResult.content, fileRecord.slug);
  const title = matterResult.data.title || fallbacks.title;
  const description = matterResult.data.description || fallbacks.description;

  return {
    slug: fileRecord.slug,
    title,
    description,
    verified,
    fileFormat: fileRecord.isHtml ? 'html' : 'md',
    format,
    subject,
    topic: fileRecord.topicFolder,
    order,
    status,
    tags: parseTags(matterResult.data.tags),
    created: formatDateString(matterResult.data.created),
    updated: formatDateString(matterResult.data.updated || matterResult.data.date),
    readTime,
    wordCount,
    content: matterResult.content,
  };
}

export function getSortedDocumentsData(): DocumentMeta[] {
  const files = getAllContentFiles();

  // Slug uniqueness check
  const slugMap = new Map<string, string>();
  for (const f of files) {
    if (slugMap.has(f.slug)) {
      throw new Error(`Duplicate note slug "${f.slug}" found in "${f.fullPath}" and "${slugMap.get(f.slug)}".`);
    }
    slugMap.set(f.slug, f.fullPath);
  }

  const allDocumentsData = files
    .map(loadDocumentRecord)
    .filter((doc): doc is DocumentData => doc !== null && doc.status === 'live');

  return allDocumentsData.sort((a, b) => {
    // Ordered notes first, sorted by order
    if (a.order !== undefined && b.order !== undefined) {
      if (a.order !== b.order) return a.order - b.order;
    } else if (a.order !== undefined && b.order === undefined) {
      return -1;
    } else if (a.order === undefined && b.order !== undefined) {
      return 1;
    }

    // Secondary sort: updated date descending
    if (a.updated !== b.updated) {
      return b.updated.localeCompare(a.updated);
    }
    // Tertiary sort: title alphabetically
    return a.title.localeCompare(b.title);
  });
}

export function getDocumentData(slug: string): DocumentData | null {
  const files = getAllContentFiles();

  // Check duplicate slug
  const slugMap = new Map<string, string>();
  let targetFile: RawFileRecord | null = null;

  for (const f of files) {
    if (slugMap.has(f.slug)) {
      throw new Error(`Duplicate note slug "${f.slug}" found in "${f.fullPath}" and "${slugMap.get(f.slug)}".`);
    }
    slugMap.set(f.slug, f.fullPath);
    if (f.slug === slug) {
      targetFile = f;
    }
  }

  if (!targetFile) {
    return null;
  }

  const doc = loadDocumentRecord(targetFile);
  if (!doc || doc.status !== 'live') {
    return null;
  }

  return doc;
}
