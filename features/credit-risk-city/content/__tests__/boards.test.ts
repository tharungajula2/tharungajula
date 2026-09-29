import { describe, expect, it } from 'vitest';
import { contentPack } from '..';
import { boardsFor, boardsFromMarkdown, MAX_ROWS } from '../lessons/boards';

describe('walk-in boards (built from the lesson notes)', () => {
  it('every district gets its big-idea board plus at least three section boards', () => {
    for (const d of contentPack.districts) expect(boardsFor(d.id).length, d.id).toBeGreaterThanOrEqual(4);
  });
  it('boards carry plain text only — no maths, markdown or HTML', () => {
    for (const d of contentPack.districts) {
      for (const b of boardsFor(d.id)) {
        const text = [b.title, b.idea ?? '', ...(b.bullets ?? []), ...(b.table?.head ?? []), ...(b.table?.rows.flat() ?? [])].join(' ');
        expect(text, `${d.id}: ${b.title}`).not.toMatch(/\$\$|\*\*|<svg|<text|\\text/);
        expect(b.idea || b.table || b.bullets, `${d.id}: ${b.title}`).toBeTruthy();
        if (b.table) {
          expect(b.table.rows.length).toBeLessThanOrEqual(MAX_ROWS);
          for (const r of b.table.rows) expect(r.length, `${d.id}: ${b.title}`).toBe(b.table.head.length);
        }
      }
    }
  });
  it('named examples exist: Basel pillars, IFRS 9 SICR, the BA requirement levels', () => {
    expect(boardsFor('fortress').some((b) => /pillars/i.test(b.title) && b.table)).toBe(true);
    expect(boardsFor('vault').some((b) => /Stage 2/.test(b.title) && b.table)).toBe(true);
    expect(boardsFor('studio').some((b) => /Requirements/.test(b.title) && b.table)).toBe(true);
  });
  it('parses a key line, a table and bullets; skips maths', () => {
    const md = '## 1 — Test\n\n**The key line.**\n\n$$\nx\n$$\n\n| A | B |\n|---|---|\n| **1** | 2 |\n\n## 2 — List\n\n- one\n- two\n';
    const b = boardsFromMarkdown(md);
    expect(b[0]).toEqual({ title: 'Test', idea: 'The key line.', table: { head: ['A', 'B'], rows: [['1', '2']] } });
    expect(b[1]).toEqual({ title: 'List', bullets: ['one', 'two'] });
  });
});
