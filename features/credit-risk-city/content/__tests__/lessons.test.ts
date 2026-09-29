import katex from 'katex';
import { describe, expect, it } from 'vitest';
import { contentPack } from '..';
import { lessons } from '../lessons';

const words = (s: string) => s.replace(/<svg[\s\S]*?<\/svg>/g, '').split(/\s+/).filter(Boolean).length;
const all = Object.values(lessons).map((l) => l!);

describe('district lessons (cheatsheet format)', () => {
  it('every district has a lesson', () => {
    for (const d of contentPack.districts) expect(lessons[d.id], d.id).toBeDefined();
  });
  it.each(all)('$district: idea, surface and deeper layers are substantial', (l) => {
    expect(l.idea.length).toBeGreaterThan(60);
    expect(words(l.surface)).toBeGreaterThan(250); // the surface is a tight cheatsheet read; depth lives in "Go deeper"
    expect(words(l.deeper)).toBeGreaterThan(300);
    expect(l.minutes).toBeGreaterThan(0);
  });
  it.each(all)('$district: SVGs are balanced, sized by viewBox and labelled', (l) => {
    const text = l.surface + l.deeper;
    const opens = text.match(/<svg\b/g) ?? [];
    expect(opens.length).toBeGreaterThanOrEqual(1);
    expect((text.match(/<\/svg>/g) ?? []).length).toBe(opens.length);
    for (const svg of text.match(/<svg\b[^>]*>/g) ?? []) {
      expect(svg).toMatch(/viewBox="/);
      expect(svg).toMatch(/aria-label="/);
      expect(svg).toMatch(/role="img"/);
    }
    expect((text.match(/<text\b/g) ?? []).length).toBe((text.match(/<\/text>/g) ?? []).length);
    expect((text.match(/<g\b/g) ?? []).length).toBe((text.match(/<\/g>/g) ?? []).length);
  });
  it.each(all)('$district: every table header separator matches its columns', (l) => {
    const lines = (l.surface + '\n' + l.deeper).split('\n');
    for (let i = 0; i < lines.length - 1; i++) {
      if (/^\|.*\|$/.test(lines[i]) && /^\|[\s|:-]+\|$/.test(lines[i + 1])) {
        expect(lines[i + 1].split('|').length, `${l.district}: ${lines[i]}`).toBe(lines[i].split('|').length);
      }
    }
  });
  it.each(all)('$district: formula blocks are closed', (l) => {
    for (const layer of [l.surface, l.deeper]) {
      expect((layer.match(/```/g) ?? []).length % 2).toBe(0);
      expect((layer.match(/\$\$/g) ?? []).length % 2).toBe(0);
    }
  });
  it.each(all)('$district: every formula is valid KaTeX', (l) => {
    for (const m of (l.surface + l.deeper).matchAll(/\$\$\n([\s\S]*?)\n\$\$/g)) {
      expect(() => katex.renderToString(m[1], { displayMode: true, throwOnError: true }), m[1]).not.toThrow();
    }
  });
});
