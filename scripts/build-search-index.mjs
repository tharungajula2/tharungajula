import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');
const notesDir = path.join(contentDir, 'notes');
const outputIndexFile = path.join(process.cwd(), 'public', 'search-index.json');

function cleanPlainText(markdown) {
  return markdown
    .replace(/^---[\s\S]*?---/, '')
    .replace(/<[^>]*>/g, '')
    .replace(/#+\s+/g, '')
    .replace(/\!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
    .replace(/[`*~_]/g, '')
    .replace(/\$\$.*?\$\$/gs, '')
    .replace(/\$.*?\$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function generateSectionSlug(headingText) {
  return headingText
    .replace(/[§·]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function buildSearchIndex() {
  const startTime = Date.now();
  console.log('=== BUILDING SEARCH INDEX ===\n');

  const documents = [];
  let docIdCounter = 1;

  // 1. INDEX TEXTBOOK CHAPTERS (LIBRARY)
  function walkLibrary(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const p = path.join(dir, file);
      const stat = fs.statSync(p);
      if (stat.isDirectory()) {
        if (file !== 'notes') walkLibrary(p);
      } else if (file.endsWith('.md') && file !== '_volume.md') {
        const raw = fs.readFileSync(p, 'utf8');
        const parsed = matter(raw);
        const fm = parsed.data;

        const track = fm.track || 'library';
        const volFolder = path.basename(path.dirname(p));
        const slug = fm.slug;
        const title = fm.title || slug;
        const volTitle = fm.volumeTitle || volFolder;
        const url = `/notebook/library/${track}/${volFolder}/${slug}`;
        const plain = cleanPlainText(parsed.content);

        documents.push({
          id: `lib-${docIdCounter++}`,
          type: 'library',
          title,
          parentTitle: `${track.toUpperCase()} // ${volTitle}`,
          url,
          tags: fm.tags || [track],
          snippet: plain.slice(0, 160),
          text: `${title} ${volTitle} ${plain.slice(0, 1500)}`,
        });
      }
    });
  }

  walkLibrary(path.join(contentDir, 'credit-risk'));
  walkLibrary(path.join(contentDir, 'fde'));

  // 2. INDEX DAILY NOTES & NOTE SECTIONS
  if (fs.existsSync(notesDir)) {
    const noteFiles = fs.readdirSync(notesDir).filter(f => f.endsWith('.md'));
    for (const file of noteFiles) {
      const nPath = path.join(notesDir, file);
      const noteSlug = file.replace('.md', '');
      const raw = fs.readFileSync(nPath, 'utf8');
      const parsed = matter(raw);
      const fm = parsed.data;

      const noteTitle = fm.title || noteSlug;
      const lines = parsed.content.split(/\r?\n/);

      // Note overview entry
      const overviewText = cleanPlainText(lines.slice(0, 40).join('\n'));
      documents.push({
        id: `note-${docIdCounter++}`,
        type: 'note',
        title: noteTitle,
        parentTitle: 'DAILY NOTES OVERVIEW',
        url: `/notebook/notes/${noteSlug}`,
        tags: fm.tags || ['notes'],
        snippet: fm.subtitle || overviewText.slice(0, 160),
        text: `${noteTitle} ${fm.subtitle || ''} ${overviewText}`,
      });

      // Section entries
      let currentSectionTitle = '';
      let currentLines = [];

      for (const line of lines) {
        if (line.startsWith('# ')) {
          if (currentSectionTitle && currentLines.length > 0) {
            const secSlug = generateSectionSlug(currentSectionTitle);
            const secText = cleanPlainText(currentLines.join('\n'));
            documents.push({
              id: `note-sec-${docIdCounter++}`,
              type: 'note',
              title: currentSectionTitle.replace(/^[§#·\s]+/, ''),
              parentTitle: `NOTE // ${noteTitle}`,
              url: `/notebook/notes/${noteSlug}/${secSlug}`,
              tags: fm.tags || ['notes'],
              snippet: secText.slice(0, 160),
              text: `${currentSectionTitle} ${noteTitle} ${secText.slice(0, 1500)}`,
            });
          }
          currentSectionTitle = line.slice(2).trim();
          currentLines = [];
        } else {
          currentLines.push(line);
        }
      }

      if (currentSectionTitle && currentLines.length > 0) {
        const secSlug = generateSectionSlug(currentSectionTitle);
        const secText = cleanPlainText(currentLines.join('\n'));
        documents.push({
          id: `note-sec-${docIdCounter++}`,
          type: 'note',
          title: currentSectionTitle.replace(/^[§#·\s]+/, ''),
          parentTitle: `NOTE // ${noteTitle}`,
          url: `/notebook/notes/${noteSlug}/${secSlug}`,
          tags: fm.tags || ['notes'],
          snippet: secText.slice(0, 160),
          text: `${currentSectionTitle} ${noteTitle} ${secText.slice(0, 1500)}`,
        });
      }
    }
  }

  const jsonString = JSON.stringify(documents);
  fs.writeFileSync(outputIndexFile, jsonString, 'utf8');

  const sizeKb = (Buffer.byteLength(jsonString) / 1024).toFixed(1);
  const durationMs = Date.now() - startTime;

  console.log(`✅ Search index built successfully!`);
  console.log(`• Total Indexed Documents: ${documents.length}`);
  console.log(`• Search Index File Size: ${sizeKb} KB (Target: < 1500 KB)`);
  console.log(`• Prebuild Time Added: ${durationMs} ms`);
  console.log(`• Saved to: ${outputIndexFile}\n`);
}

buildSearchIndex();
