import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

/**
 * EXPECTED COUNT DERIVATION (run count_raw_source.js to regenerate)
 * All counts are from raw markdown source, excluding frontmatter and code blocks.
 *
 * CALLOUT EMOJIS (paragraph-opening lines):
 *   📘 Definition: 86   🔴 Trap: 66   ⚠️  Warning: 63   ✅ Check: 39   🧮 Worked: 28
 *
 * STATUS CHIPS [TAG] in body prose:
 *   [VERIFY] raw in body: 46 total across all .md files
 *     - 8 in YAML frontmatter (title: "THE [VERIFY] LIST") — not parsed as body
 *     - 8 in leading h1 headings (# §N · THE [VERIFY] LIST) — stripped by rehypeStripLeadingH1
 *     - 30 in body prose/tables — CONVERTED TO CHIPS  ← assertion value
 *   [RECEIPT]: 26   [IN FORCE]: 20   [DRAFT]: 11   [FROM ...]: 6
 *
 * 22 volume pages (10 credit-risk + 10 fde + /blog/notes + /blog/specimen):
 *   /blog/notes is a static page in staticPages, not in volumePages.
 *   /blog/specimen is also a static page. The build showed 22 because the
 *   route /blog/[track]/[volume] includes 20 real volumes, and the build
 *   route listing grouped them under the dynamic segment. The extra 2 were
 *   the 2 track pages /blog/credit-risk and /blog/fde counted together.
 *   (The route table showed ● /blog/[track] with 2 paths and ● /blog/[track]/[volume]
 *    with 20 paths; "22 volume pages" in the prior report was a miscount.)
 */

const contentDir = path.join(process.cwd(), 'blog_content');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== '1_case_studies') {
        results = results.concat(walk(filePath));
      }
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  });
  return results;
}

// Rehype plugins matching lib/notes.ts
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

function rehypeTransformCallouts() {
  return (tree) => {
    visit(tree, 'element', (node) => {
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

    // Handle mid-paragraph 📘 definitions
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

function rehypeTransformStatusTags() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!node.value || typeof index !== 'number' || !parent) return;
      const statusRegex = /\[(IN FORCE|DRAFT|VERIFY|RECEIPT|FROM [^\]]+)\]/g;
      if (!statusRegex.test(node.value)) return;
      statusRegex.lastIndex = 0; // RESET LAST INDEX!

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
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeStripLeadingH1)
  .use(rehypeWrapTables)
  .use(rehypeUnwrapCite)
  .use(rehypeTransformCallouts)
  .use(rehypeTransformStatusTags)
  .use(rehypeSlug)
  .use(rehypeStringify);

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
    chipVerify: 0,
    chipReceipt: 0,
    chipInForce: 0,
    chipDraft: 0,
    chipFrom: 0,
    survivingCites: 0,
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

    // 1. Check duplicate body h1
    if (/<h1[^>]*>/i.test(html)) {
      duplicateH1Count++;
      console.error(`[FAIL] Duplicate H1 in file: ${path.relative(contentDir, filePath)}`);
    }

    // 2. Check unwrapped tables
    const tableMatches = [...html.matchAll(/<table[^>]*>/gi)];
    const wrappedTableMatches = [...html.matchAll(/<div class="table-wrapper">\s*<table[^>]*>/gi)];
    if (tableMatches.length !== wrappedTableMatches.length) {
      unwrappedTableCount += (tableMatches.length - wrappedTableMatches.length);
      console.error(`[FAIL] Unwrapped table found in: ${path.relative(contentDir, filePath)}`);
    }

    // 3. Count Callouts
    const defInClass = (html.match(/class="callout-definition"/g) || []).length;
    const defInLabel = (html.match(/\[ DEFINITION \]/g) || []).length;
    counts.definition += Math.max(defInClass, defInLabel);

    counts.trap += (html.match(/class="callout-trap"/g) || []).length;
    counts.warning += (html.match(/class="callout-warning"/g) || []).length;
    counts.check += (html.match(/class="callout-check"/g) || []).length;
    counts.worked += (html.match(/class="callout-worked"/g) || []).length;

    // 4. Count Status Chips
    counts.chipVerify += (html.match(/status-verify/g) || []).length;
    counts.chipReceipt += (html.match(/status-receipt/g) || []).length;
    counts.chipInForce += (html.match(/status-in-force/g) || []).length;
    counts.chipDraft += (html.match(/status-draft/g) || []).length;
    counts.chipFrom += (html.match(/status-from/g) || []).length;

    // 5. Check surviving cite tags
    if (/<cite/i.test(html)) {
      counts.survivingCites += (html.match(/<cite/gi) || []).length;
      console.error(`[FAIL] Surviving <cite> tag in: ${path.relative(contentDir, filePath)}`);
    }

    // 6. Check duplicate heading IDs per page
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

  // 7. Check Prev/Next Links across tracks
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
  console.log(`   - Definition: ${counts.definition} (Expected: 86)`);
  console.log(`   - Trap:       ${counts.trap} (Expected: 66)`);
  console.log(`   - Warning:    ${counts.warning} (Expected: 63)`);
  console.log(`   - Check:      ${counts.check} (Expected: 39)`);
  console.log(`   - Worked:     ${counts.worked} (Expected: 28)`);
  if (counts.definition !== 86 || counts.trap !== 66 || counts.warning !== 63 || counts.check !== 39 || counts.worked !== 28) {
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

  console.log(`6. Duplicate Heading ID Pages: ${counts.duplicateHeadingIdPages} (Expected: 0)`);
  if (counts.duplicateHeadingIdPages !== 0) failed = true;

  console.log(`7. Prev/Next Link Failures: ${prevNextFailures} (Expected: 0)`);
  if (prevNextFailures !== 0) failed = true;

  console.log('\n=======================================');
  if (failed) {
    console.error('❌ PIPELINE VERIFICATION FAILED!');
    process.exit(1);
  } else {
    console.log('✅ ALL 7 VERIFICATION ASSERTIONS PASSED PERFECTLY!');
    process.exit(0);
  }
}

runVerification().catch(err => {
  console.error(err);
  process.exit(1);
});
