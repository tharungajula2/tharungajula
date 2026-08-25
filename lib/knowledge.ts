import fs from 'fs';
import path from 'path';

export type MajorCategory = 'finance-risk' | 'ai-data-tech' | 'business-product' | 'general-reference';
export type ContentFormat = 'field_card' | 'manual';

export interface KnowledgeItem {
  id: string;
  type: ContentFormat;
  formatLabel: 'HTML Field Card' | 'Mastery Manual';
  category: MajorCategory;
  categoryLabel: string;
  title: string;
  description: string;
  relativePath: string;
  href: string;
  isExternal: boolean;
}

export const CATEGORY_LABELS: Record<MajorCategory, string> = {
  'finance-risk': 'Finance & Risk',
  'ai-data-tech': 'AI / Data / Tech',
  'business-product': 'Business / Product',
  'general-reference': 'General Reference',
};

const ALLOWED_CATEGORIES: MajorCategory[] = [
  'finance-risk',
  'ai-data-tech',
  'business-product',
  'general-reference',
];

const GITHUB_REPO_MANUALS_BASE = 'https://github.com/tharungajula2/tharungajula/blob/main/content/manuals';

function cleanText(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

function formatFilenameToTitle(filename: string): string {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  return nameWithoutExt
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function parseHtmlMetadata(filePath: string, relativePath: string, category: MajorCategory): KnowledgeItem {
  let title = '';
  let description = '';

  try {
    const raw = fs.readFileSync(filePath, 'utf8');

    const titleMatch = raw.match(/<title[^>]*>(.*?)<\/title>/i);
    if (titleMatch && titleMatch[1]) {
      title = cleanText(titleMatch[1]);
    }

    if (!title) {
      const h1Match = raw.match(/<h1[^>]*>(.*?)<\/h1>/i);
      if (h1Match && h1Match[1]) {
        title = cleanText(h1Match[1].replace(/<[^>]+>/g, ''));
      }
    }

    const metaDescMatch =
      raw.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i) ||
      raw.match(/<meta\s+content=["'](.*?)["']\s+name=["']description["']/i);
    if (metaDescMatch && metaDescMatch[1]) {
      description = cleanText(metaDescMatch[1]);
    }
  } catch (err) {
    console.error(`Error reading HTML metadata from ${filePath}:`, err);
  }

  const filename = path.basename(filePath);
  if (!title) {
    title = formatFilenameToTitle(filename);
  }
  if (!description) {
    description = `Standalone HTML Field Card under ${CATEGORY_LABELS[category]}.`;
  }

  const id = `fc-${category}-${filename.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  return {
    id,
    type: 'field_card',
    formatLabel: 'HTML Field Card',
    category,
    categoryLabel: CATEGORY_LABELS[category],
    title,
    description,
    relativePath,
    href: `/field-cards/${relativePath.replace(/\\/g, '/')}`,
    isExternal: false,
  };
}

function parseMarkdownMetadata(filePath: string, relativePath: string, category: MajorCategory): KnowledgeItem {
  let title = '';
  let description = '';

  try {
    const raw = fs.readFileSync(filePath, 'utf8');

    const fmTitleMatch = raw.match(/^title:\s*["']?(.*?)["']?$/m);
    if (fmTitleMatch && fmTitleMatch[1]) {
      title = cleanText(fmTitleMatch[1]);
    }

    if (!title) {
      const h1Match = raw.match(/^#\s+(.*)$/m);
      if (h1Match && h1Match[1]) {
        title = cleanText(h1Match[1]);
      }
    }

    const fmDescMatch = raw.match(/^description:\s*["']?(.*?)["']?$/m);
    if (fmDescMatch && fmDescMatch[1]) {
      description = cleanText(fmDescMatch[1]);
    }

    if (!description) {
      const bodyLines = raw
        .replace(/^---[\s\S]*?---/, '')
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.length > 0 && !l.startsWith('#'));
      if (bodyLines.length > 0) {
        description = cleanText(bodyLines[0].slice(0, 180));
      }
    }
  } catch (err) {
    console.error(`Error reading Markdown metadata from ${filePath}:`, err);
  }

  const filename = path.basename(filePath);
  if (!title) {
    title = formatFilenameToTitle(filename);
  }
  if (!description) {
    description = `Markdown Mastery Manual under ${CATEGORY_LABELS[category]}.`;
  }

  const id = `manual-${category}-${filename.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  const normalizedRelPath = relativePath.replace(/\\/g, '/');

  return {
    id,
    type: 'manual',
    formatLabel: 'Mastery Manual',
    category,
    categoryLabel: CATEGORY_LABELS[category],
    title,
    description,
    relativePath,
    href: `${GITHUB_REPO_MANUALS_BASE}/${normalizedRelPath}`,
    isExternal: true,
  };
}

export function getKnowledgeItems(): KnowledgeItem[] {
  const items: KnowledgeItem[] = [];
  const baseContentDir = path.join(process.cwd(), 'content');

  // 1. Scan field_cards
  const fieldCardsDir = path.join(baseContentDir, 'field_cards');
  if (fs.existsSync(fieldCardsDir)) {
    for (const cat of ALLOWED_CATEGORIES) {
      const catDir = path.join(fieldCardsDir, cat);
      if (!fs.existsSync(catDir)) continue;

      const files = fs.readdirSync(catDir);
      for (const file of files) {
        if (file.startsWith('.') || !file.endsWith('.html')) continue;
        const filePath = path.join(catDir, file);
        const relativePath = `${cat}/${file}`;
        items.push(parseHtmlMetadata(filePath, relativePath, cat));
      }
    }
  }

  // 2. Scan manuals
  const manualsDir = path.join(baseContentDir, 'manuals');
  if (fs.existsSync(manualsDir)) {
    for (const cat of ALLOWED_CATEGORIES) {
      const catDir = path.join(manualsDir, cat);
      if (!fs.existsSync(catDir)) continue;

      const files = fs.readdirSync(catDir);
      for (const file of files) {
        if (file.startsWith('.') || !file.endsWith('.md')) continue;
        const filePath = path.join(catDir, file);
        const relativePath = `${cat}/${file}`;
        items.push(parseMarkdownMetadata(filePath, relativePath, cat));
      }
    }
  }

  return items.sort((a, b) => a.title.localeCompare(b.title));
}
