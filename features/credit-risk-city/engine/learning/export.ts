import type { ContentPack } from '../../content/types';
import { conceptState, type ConceptProgress, type MasteryState } from './mastery';
import type { ItemProgress } from './scheduler';
import type { IsoDate } from './dates';

export interface CaseOutcome {
  caseId: string;
  seed: number;
  finishedOn: IsoDate;
  correct: number;
  answered: number;
}

export interface ProgressExport {
  schema: 'crc-progress';
  version: number;
  exportedOn: IsoDate;
  mastery: { conceptId: string; name: string; district: string; state: MasteryState }[];
  weakestItems: { itemId: string; box: number; misses: number; attempts: number }[];
  hypercorrection: string[];
  cases: CaseOutcome[];
}

export function buildExport(
  pack: ContentPack,
  items: Record<string, ItemProgress>,
  concepts: Record<string, ConceptProgress>,
  cases: CaseOutcome[],
  today: IsoDate,
): ProgressExport {
  const weakest = Object.values(items)
    .filter((p) => p.attempts > 0)
    .sort((a, b) => a.box - b.box || b.misses - a.misses)
    .slice(0, 20)
    .map((p) => ({ itemId: p.itemId, box: p.box, misses: p.misses, attempts: p.attempts }));
  return {
    schema: 'crc-progress',
    version: 1,
    exportedOn: today,
    mastery: pack.concepts.map((c) => ({
      conceptId: c.id,
      name: c.name,
      district: c.district,
      state: conceptState(c, concepts),
    })),
    weakestItems: weakest,
    hypercorrection: Object.values(items).filter((p) => p.hypercorrection).map((p) => p.itemId),
    cases,
  };
}
