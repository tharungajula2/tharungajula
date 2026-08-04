import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

const contentDir = path.join(process.cwd(), 'content');
const notesDir = path.join(contentDir, 'notes');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== '1_case_studies' && file !== 'notes') {
        results = results.concat(walk(filePath));
      }
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  });
  return results;
}

function rehypeStripLeadingH1() {
  return (tree) => {
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
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
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
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'cite') {
        if (parent && typeof index === 'number') {
          parent.children.splice(index, 1, ...node.children);
          return index;
        }
      }
    });
  };
}

function getRawText(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value || '';
  if (node.children && Array.isArray(node.children)) {
    return node.children.map(getRawText).join('');
  }
  return '';
}

function rehypeTransformCallouts() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if ((node.tagName === 'p' || node.tagName === 'blockquote') && node.children && node.children.length > 0) {
        const fullText = getRawText(node).trim();

        if (fullText.includes('► SAY THIS') || fullText.startsWith('►')) {
          node.tagName = 'div';
          node.properties = { className: ['callout-say-this'] };

          visit(node, 'text', (textNode) => {
            if (textNode.value && textNode.value.includes('►')) {
              textNode.value = textNode.value
                .replace(/►\s*SAY THIS/g, '')
                .replace(/►/g, '')
                .trimStart();
            }
          });

          visit(node, 'element', (elNode, elIdx, elParent) => {
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
        } else if (fullText.includes('⚖')) {
          node.tagName = 'div';
          node.properties = { className: ['callout-tradeoff'] };
          
          visit(node, 'text', (textNode) => {
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
        } else if (fullText.startsWith('📘')) {
          node.tagName = 'div';
          node.properties = { className: ['callout-definition'] };
          visit(node, 'text', (textNode) => {
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
        } else if (fullText.startsWith('🔴')) {
          node.tagName = 'div';
          node.properties = { className: ['callout-trap'] };
          visit(node, 'text', (textNode) => {
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
        } else if (fullText.startsWith('⚠️')) {
          node.tagName = 'div';
          node.properties = { className: ['callout-warning'] };
          visit(node, 'text', (textNode) => {
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
        } else if (fullText.startsWith('✅')) {
          node.tagName = 'div';
          node.properties = { className: ['callout-check'] };
          visit(node, 'text', (textNode) => {
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
        } else if (fullText.startsWith('🧮')) {
          node.tagName = 'div';
          node.properties = { className: ['callout-worked'] };
          visit(node, 'text', (textNode) => {
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
        }
      }
    });

    visit(tree, 'element', (node) => {
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
  return (tree) => {
    visit(tree, 'text', (node) => {
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
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!node.value || typeof index !== 'number' || !parent) return;
      const statusRegex = /\[(IN FORCE|DRAFT|VERIFY|RECEIPT|FROM [^\]]+)\]/g;
      if (!statusRegex.test(node.value)) return;
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

const processor = unified()
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
  .use(rehypeSlug)
  .use(rehypeStringify);

function generateSectionSlug(headingText) {
  return headingText
    .replace(/[§·]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function runVerification() {
  console.log('=== STARTING PIPELINE VERIFICATION SUITE ===\n');

  const files = walk(contentDir).filter(f => path.basename(f) !== '_volume.md');
  console.log(`Auditing ${files.length} chapter files...\n`);

  let duplicateH1Count = 0;
  let unwrappedTableCount = 0;

  let counts = {
    definition: 0,
    trap: 0,
    warning: 0,
    check: 0,
    worked: 0,
    sayThis: 0,
    tradeoff: 0,
    chipVerify: 0,
    chipReceipt: 0,
    chipInForce: 0,
    chipDraft: 0,
    chipFrom: 0,
    survivingCites: 0,
    survivingSymbols: 0,
    duplicateHeadingIdPages: 0,
  };

  const trackChapters = {
    'credit-risk': [],
    'fde': [],
  };

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    const frontmatter = parsed.data;

    const track = frontmatter.track;
    const volFolder = path.basename(path.dirname(filePath));
    const slug = frontmatter.slug;
    const title = frontmatter.title;

    if (trackChapters[track]) {
      trackChapters[track].push({
        file: filePath,
        volFolder,
        slug,
        title,
        order: frontmatter.order,
      });
    }

    const vfile = await processor.process(parsed.content);
    const html = String(vfile);

    if (/<h1[^>]*>/i.test(html)) {
      duplicateH1Count++;
      console.error(`[FAIL] Duplicate H1 in file: ${path.relative(contentDir, filePath)}`);
    }

    const tableMatches = [...html.matchAll(/<table[^>]*>/gi)];
    const wrappedTableMatches = [...html.matchAll(/<div class="table-wrapper">\s*<table[^>]*>/gi)];
    if (tableMatches.length !== wrappedTableMatches.length) {
      unwrappedTableCount += (tableMatches.length - wrappedTableMatches.length);
      console.error(`[FAIL] Unwrapped table found in: ${path.relative(contentDir, filePath)}`);
    }

    const defInClass = (html.match(/class="callout-definition"/g) || []).length;
    const defInLabel = (html.match(/\[ DEFINITION \]/g) || []).length;
    counts.definition += Math.max(defInClass, defInLabel);

    counts.trap += (html.match(/class="callout-trap"/g) || []).length;
    counts.warning += (html.match(/class="callout-warning"/g) || []).length;
    counts.check += (html.match(/class="callout-check"/g) || []).length;
    counts.worked += (html.match(/class="callout-worked"/g) || []).length;

    counts.chipVerify += (html.match(/status-verify/g) || []).length;
    counts.chipReceipt += (html.match(/status-receipt/g) || []).length;
    counts.chipInForce += (html.match(/status-in-force/g) || []).length;
    counts.chipDraft += (html.match(/status-draft/g) || []).length;
    counts.chipFrom += (html.match(/status-from/g) || []).length;

    if (/<cite/i.test(html)) {
      counts.survivingCites += (html.match(/<cite/gi) || []).length;
      console.error(`[FAIL] Surviving <cite> tag in: ${path.relative(contentDir, filePath)}`);
    }

    const idsOnPage = new Set();
    const headingIdMatches = [...html.matchAll(/<h[1-6][^>]*id="([^"]+)"[^>]*>/gi)];
    let pageHasDupId = false;
    for (const match of headingIdMatches) {
      const id = match[1];
      if (idsOnPage.has(id)) {
        pageHasDupId = true;
        break;
      }
      idsOnPage.add(id);
    }
    if (pageHasDupId) counts.duplicateHeadingIdPages++;
  }

  // --- AUDIT NOTES IN CONTENT/NOTES ---
  console.log('\nAuditing daily notes in content/notes...\n');
  const noteFiles = fs.existsSync(notesDir) ? fs.readdirSync(notesDir).filter(f => f.endsWith('.md')) : [];
  let noteVerificationFailures = 0;
  const noteSummary = [];

  for (const nFile of noteFiles) {
    const nPath = path.join(notesDir, nFile);
    const raw = fs.readFileSync(nPath, 'utf8');
    const parsed = matter(raw);

    const lines = parsed.content.split(/\r?\n/);
    const h1s = lines.filter(l => l.startsWith('# '));

    let sectionH1s = h1s;
    if (h1s.length > 1) {
      sectionH1s = h1s.slice(1);
    }

    const slugs = sectionH1s.map(h => generateSectionSlug(h.slice(2)));
    const slugSet = new Set(slugs);
    if (slugSet.size !== slugs.length) {
      noteVerificationFailures++;
      console.error(`[FAIL] Duplicate section slug found in note: ${nFile}`);
    }

    const vfile = await processor.process(parsed.content);
    const html = String(vfile);

    const noteSayThis = (html.match(/class="callout-say-this"/g) || []).length;
    const noteTradeoff = (html.match(/class="callout-tradeoff"/g) || []).length;
    counts.sayThis += noteSayThis;
    counts.tradeoff += noteTradeoff;

    if (html.includes('►') || html.includes('⚖')) {
      counts.survivingSymbols++;
      console.error(`[FAIL] Stray ► or ⚖️ symbol found in compiled note output: ${nFile}`);
    }

    const nTableMatches = [...html.matchAll(/<table[^>]*>/gi)];
    const nWrappedMatches = [...html.matchAll(/<div class="table-wrapper">\s*<table[^>]*>/gi)];
    if (nTableMatches.length !== nWrappedMatches.length) {
      unwrappedTableCount += (nTableMatches.length - nWrappedMatches.length);
      console.error(`[FAIL] Unwrapped table in note: ${nFile}`);
    }

    noteSummary.push({
      file: nFile,
      sectionCount: sectionH1s.length,
      firstSlugs: slugs.slice(0, 3),
      sayThisCount: noteSayThis,
      tradeoffCount: noteTradeoff,
    });
  }

  let prevNextFailures = 0;
  for (const trackSlug of Object.keys(trackChapters)) {
    const list = trackChapters[trackSlug];

    for (let i = 0; i < list.length; i++) {
      const hasPrev = i > 0;
      const hasNext = i < list.length - 1;

      if (i > 0 && !hasPrev) {
        prevNextFailures++;
        console.error(`[FAIL] Missing prev link for chapter ${list[i].slug}`);
      }
      if (i < list.length - 1 && !hasNext) {
        prevNextFailures++;
        console.error(`[FAIL] Missing next link for chapter ${list[i].slug}`);
      }
    }
  }

  let failed = false;

  console.log('--- VERIFICATION ASSERTION RESULTS ---');
  console.log(`1. Duplicate H1s in body: ${duplicateH1Count} (Expected: 0)`);
  if (duplicateH1Count !== 0) failed = true;

  console.log(`2. Unwrapped <table> elements: ${unwrappedTableCount} (Expected: 0)`);
  if (unwrappedTableCount !== 0) failed = true;

  console.log(`3. Rendered Callout Counts:`);
  console.log(`   - Definition: ${counts.definition} (Expected: 87)`);
  console.log(`   - Trap:       ${counts.trap} (Expected: 66)`);
  console.log(`   - Warning:    ${counts.warning} (Expected: 63)`);
  console.log(`   - Check:      ${counts.check} (Expected: 39)`);
  console.log(`   - Worked:     ${counts.worked} (Expected: 28)`);
  console.log(`   - Say This:   ${counts.sayThis} (Note callout)`);
  console.log(`   - Trade-off:  ${counts.tradeoff} (Note callout)`);
  if (counts.definition !== 87 || counts.trap !== 66 || counts.warning !== 63 || counts.check !== 39 || counts.worked !== 28) {
    failed = true;
  }

  console.log(`4. Rendered Status Chip Counts:`);
  console.log(`   - VERIFY:   ${counts.chipVerify} (Expected: 30)`);
  console.log(`   - RECEIPT:  ${counts.chipReceipt} (Expected: 26)`);
  console.log(`   - IN FORCE: ${counts.chipInForce} (Expected: 20)`);
  console.log(`   - DRAFT:    ${counts.chipDraft} (Expected: 11)`);
  console.log(`   - FROM:     ${counts.chipFrom} (Expected: 6)`);
  if (counts.chipVerify !== 30 || counts.chipReceipt !== 26 || counts.chipInForce !== 20 || counts.chipDraft !== 11 || counts.chipFrom !== 6) {
    failed = true;
  }

  console.log(`5. Surviving <cite> tags: ${counts.survivingCites} (Expected: 0)`);
  if (counts.survivingCites !== 0) failed = true;

  console.log(`6. Surviving stray ► or ⚖️ symbols: ${counts.survivingSymbols} (Expected: 0)`);
  if (counts.survivingSymbols !== 0) failed = true;

  console.log(`7. Duplicate Heading ID Pages: ${counts.duplicateHeadingIdPages} (Expected: 0)`);
  if (counts.duplicateHeadingIdPages !== 0) failed = true;

  console.log(`8. Prev/Next Link Failures: ${prevNextFailures} (Expected: 0)`);
  if (prevNextFailures !== 0) failed = true;

  console.log(`9. Note Section Verification Failures: ${noteVerificationFailures} (Expected: 0)`);
  if (noteVerificationFailures !== 0) failed = true;

  console.log('\n--- DAILY NOTES AUDIT SUMMARY ---');
  noteSummary.forEach(n => {
    console.log(`• ${n.file}: ${n.sectionCount} sections`);
    console.log(`  First 3 slugs: ${JSON.stringify(n.firstSlugs)}`);
    console.log(`  Callouts -> Say This: ${n.sayThisCount}, Trade-off: ${n.tradeoffCount}`);
  });

  console.log('\n=======================================');
  if (failed) {
    console.error('❌ PIPELINE VERIFICATION FAILED!');
    process.exit(1);
  } else {
    console.log('✅ ALL VERIFICATION ASSERTIONS PASSED PERFECTLY!');
    process.exit(0);
  }
}

runVerification().catch(err => {
  console.error(err);
  process.exit(1);
});
