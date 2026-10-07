import { notFound } from 'next/navigation';
import { getDocumentData, getSortedDocumentsData } from '@/lib/notes/markdown';
import { extractHeadings, renderMarkdown } from '@/lib/notes/render';
import ClientReader from './ClientReader';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const documents = getSortedDocumentsData();
  return documents.map((doc) => ({
    slug: doc.slug,
  }));
}

const DEFAULT_DESCRIPTION = "Learning out loud. Finance, health and AI — and now and then, life. One subject at a time, explained badly until it isn't.";

function truncateDescription(desc: string, maxLen = 155): string {
  if (!desc || !desc.trim()) {
    return DEFAULT_DESCRIPTION;
  }
  const clean = desc.trim();
  if (clean.length <= maxLen) return clean;
  const truncated = clean.slice(0, maxLen);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + '…';
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const doc = getDocumentData(resolvedParams.slug);

  if (!doc) {
    return { title: 'Not Found' };
  }

  const description = truncateDescription(doc.description);
  const publishedTime = doc.created || undefined;
  const modifiedTime = doc.updated || undefined;

  return {
    title: doc.title,
    description,
    alternates: {
      canonical: `/notes/${resolvedParams.slug}`,
    },
    openGraph: {
      type: 'article',
      siteName: 'Tharun Gajula',
      url: `/notes/${resolvedParams.slug}`,
      title: doc.title,
      description,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Tharun Gajula — Notes',
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: doc.title,
      description,
      images: ['/og-image.png'],
    },
  };
}

function processHtmlNoteContent(rawContent: string): string {
  // 1. Strip outer doctype/html/head/body tags if present
  let clean = rawContent.replace(/<!DOCTYPE[^>]*>/gi, '');
  clean = clean.replace(/<\/?(html|head|body)[^>]*>/gi, '');

  // 2. Strip duplicate chrome elements from standalone HTML files
  clean = clean.replace(/<div\s+id=["'](?:bar|top|rail|idx)["'][^>]*>[\s\S]*?<\/div>/gi, '');
  clean = clean.replace(/<button\s+id=["'](?:toTop|close|count)["'][^>]*>[\s\S]*?<\/button>/gi, '');

  // 3. Scope CSS rules (body, html, :root) to .notes-html-note to prevent style leakage
  clean = clean.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (_, css) => {
    const scopedCss = css
      .replace(/body\s*\{/g, '.notes-html-note {')
      .replace(/html\s*\{/g, '.notes-html-note {')
      .replace(/:root\s*\{/g, '.notes-html-note {');
    return `<style>${scopedCss}</style>`;
  });

  // 4. Wrap standalone tables in .table-wrapper for touch scrolling
  clean = clean.replace(/<table(?:\s+[^>]*)?>[\s\S]*?<\/table>/gi, (tableHtml) => {
    if (tableHtml.includes('calc-table')) return tableHtml;
    return `<div class="table-wrapper">${tableHtml}</div>`;
  });

  return clean;
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const doc = getDocumentData(resolvedParams.slug);

  if (!doc) {
    notFound();
  }

  const headings = extractHeadings(doc.content);

  if (doc.fileFormat === 'html') {
    const cleanContent = processHtmlNoteContent(doc.content);
    return (
      <ClientReader doc={doc} headings={headings}>
        <div
          className="notes-html-note w-full min-w-0 max-w-none"
          dangerouslySetInnerHTML={{ __html: cleanContent }}
        />
      </ClientReader>
    );
  }

  const reactContent = await renderMarkdown(doc.content);

  return (
    <ClientReader doc={doc} headings={headings}>
      {reactContent}
    </ClientReader>
  );
}
