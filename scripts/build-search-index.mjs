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
    if (!fs.existsSync(dir)) return;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      if (file.startsWith('_')) return;
      const p = path.join(dir, file);
      const stat = fs.statSync(p);
      if (stat.isDirectory()) {
        if (file !== 'notes') walkLibrary(p);
      } else if (file.endsWith('.md') && !file.startsWith('_')) {
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

  if (fs.existsSync(contentDir)) {
    const topDirs = fs.readdirSync(contentDir).filter(d => {
      if (d.startsWith('_') || d === 'notes' || d === 'log') return false;
      const p = path.join(contentDir, d);
      return fs.existsSync(p) && fs.statSync(p).isDirectory();
    });
    for (const d of topDirs) {
      walkLibrary(path.join(contentDir, d));
    }
  }

  // 2. INDEX SLIDE DECK NOTES
  const slidesDir = path.join(contentDir, 'slides');
  if (fs.existsSync(slidesDir)) {
    const slideFolders = fs.readdirSync(slidesDir).filter(f => !f.startsWith('_') && fs.statSync(path.join(slidesDir, f)).isDirectory());
    for (const folder of slideFolders) {
      const folderPath = path.join(slidesDir, folder);
      const htmlFile = fs.readdirSync(folderPath).find(f => f.endsWith('.dc.html') || f.endsWith('.html'));
      if (!htmlFile) continue;

      const rawHtml = fs.readFileSync(path.join(folderPath, htmlFile), 'utf8');
      const noteSlug = folder.replace(/\s+/g, '_');
      const orderMatch = folder.match(/^(\d+)[_-]/);
      const order = orderMatch ? parseInt(orderMatch[1], 10) : 1;
      const isCaseStudy = folder.toLowerCase().includes('case_study') || folder.toLowerCase().includes('case study');
      const docType = isCaseStudy ? 'case' : 'deck';
      const typeLabel = isCaseStudy ? `CASE STUDY ${String(order).padStart(3, '0')}` : `SLIDE DECK ${String(order).padStart(3, '0')}`;

      const h1Match = rawHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      const rawTitle = h1Match
        ? h1Match[1].replace(/<[^>]+>/g, '').replace(/&amp;/gi, '&').replace(/RiskMaster/i, 'Risk Master').trim()
        : folder.replace(/^\d+[_-]/, '').replace(/[-_]/g, ' ').replace(/RiskMaster/i, 'Risk Master');
      const noteTitle = `${typeLabel}: ${rawTitle}`;

      documents.push({
        id: `slide-note-${docIdCounter++}`,
        type: docType,
        title: noteTitle,
        parentTitle: isCaseStudy ? 'CASE STUDY' : 'SLIDE DECK',
        url: `/notebook/notes/${noteSlug}`,
        tags: ['Credit Risk', 'MFI', isCaseStudy ? 'Case Study' : 'Slide Deck', 'IIFL Samasta'],
        snippet: isCaseStudy ? `Interactive Case Study • ${noteTitle}` : `Interactive Slide Deck • ${noteTitle}`,
        text: `${noteTitle} ${cleanPlainText(rawHtml).slice(0, 5000)}`,
      });
    }
  }

  // 3. INDEX MD NOTES & NOTE SECTIONS
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
        parentTitle: 'NOTES OVERVIEW',
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
