import { contentPack } from '..';
import type { DistrictId } from '../types';
import { lessonFor } from './index';

/** A board in a district's walk-in gallery: one section's key line and main table — no maths. */
export interface Board {
  title: string;
  idea?: string;
  table?: { head: string[]; rows: string[][] };
  bullets?: string[];
}

export const MAX_ROWS = 7;

/** Strip markdown emphasis, code and HTML so board text is plain. */
export const plain = (s: string): string =>
  s
    .replace(/<[^>]+>/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim();

const cells = (line: string): string[] => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => plain(c));

/** Boards from a lesson's markdown: one per "## " section that has a key line, a table or a list. */
export function boardsFromMarkdown(md: string): Board[] {
  const sections = md.split(/^## /m).slice(1);
  const out: Board[] = [];
  for (const sec of sections) {
    const lines = sec.split('\n');
    const title = plain(lines[0].replace(/^\d+\s*—\s*/, ''));
    const body = lines.slice(1);
    const board: Board = { title };
    const ideaLine = body.find((l) => /^\*\*[^*].*\*\*$/.test(l.trim()) && !/^\*\*Read it as/.test(l.trim()));
    if (ideaLine) board.idea = plain(ideaLine);
    for (let i = 0; i < body.length - 1; i++) {
      if (/^\|.*\|\s*$/.test(body[i]) && /^\|[\s|:-]+\|\s*$/.test(body[i + 1])) {
        const head = cells(body[i]);
        const rows: string[][] = [];
        for (let j = i + 2; j < body.length && /^\|.*\|\s*$/.test(body[j]); j++) rows.push(cells(body[j]));
        board.table = { head, rows: rows.slice(0, MAX_ROWS) };
        break;
      }
    }
    if (!board.table) {
      const bullets = body.filter((l) => /^- /.test(l)).map((l) => plain(l.slice(2)));
      if (bullets.length) board.bullets = bullets.slice(0, 6);
    }
    if (board.idea || board.table || board.bullets) out.push(board);
  }
  return out;
}

/** A district's gallery: its one big idea, then a board per section of the lesson's surface layer. */
export function boardsFor(district: DistrictId): Board[] {
  const lesson = lessonFor(district);
  if (!lesson) return [];
  const name = contentPack.districts.find((d) => d.id === district)?.name ?? district;
  return [{ title: name, idea: lesson.idea }, ...boardsFromMarkdown(lesson.surface)];
}
