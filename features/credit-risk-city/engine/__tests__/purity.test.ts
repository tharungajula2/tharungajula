import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = join(__dirname, '..');
const files = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return f === '__tests__' ? [] : files(p);
    return p.endsWith('.ts') ? [p] : [];
  });

describe('engine purity (Bible §11)', () => {
  const src = files(root).map((p) => ({ p, code: readFileSync(p, 'utf8') }));
  it('imports nothing from React, Three, Next, zustand or the DOM', () => {
    for (const { p, code } of src) {
      expect(code, p).not.toMatch(/from ['"](react|react-dom|three|next|zustand|@react-three)[/'"]/);
      expect(code, p).not.toMatch(/\b(window|document|localStorage)\./);
    }
  });
  it('never reads the clock or Math.random', () => {
    for (const { p, code } of src) {
      expect(code, p).not.toMatch(/Math\.random|Date\.now|new Date\(\)/);
    }
  });
});
