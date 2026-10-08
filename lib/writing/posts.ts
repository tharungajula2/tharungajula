import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const writingDirectory = path.join(process.cwd(), 'content', 'writing');

export interface WritingPostMeta {
  slug: string;
  title: string;
  date: string;
  description?: string;
  draft?: boolean;
}

export interface WritingPostData extends WritingPostMeta {
  content: string;
}

export function getWritingPosts(): WritingPostMeta[] {
  if (!fs.existsSync(writingDirectory)) return [];

  const fileNames = fs.readdirSync(writingDirectory);
  const posts: WritingPostMeta[] = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith('.md') || fileName.toLowerCase() === 'readme.md') {
      continue;
    }

    const fullPath = path.join(writingDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    if (data.draft === true) continue;
    if (!data.title || !data.date) continue;

    const slug = fileName.replace(/\.md$/, '');
    const dateStr = data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date).trim();

    posts.push({
      slug,
      title: String(data.title).trim(),
      date: dateStr,
      description: data.description ? String(data.description).trim() : undefined,
      draft: false,
    });
  }

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function getWritingPostData(slug: string): WritingPostData | null {
  const fullPath = path.join(writingDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath) || slug.toLowerCase() === 'readme') {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  if (data.draft === true || !data.title || !data.date) {
    return null;
  }

  const dateStr = data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date).trim();

  return {
    slug,
    title: String(data.title).trim(),
    date: dateStr,
    description: data.description ? String(data.description).trim() : undefined,
    draft: false,
    content,
  };
}
