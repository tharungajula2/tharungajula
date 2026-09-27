import type { CaseSession } from '../engine/case';
import type { CaseOutcome } from '../engine/learning/export';
import type { ConceptProgress } from '../engine/learning/mastery';
import type { ItemProgress } from '../engine/learning/scheduler';

export const SCHEMA_VERSION = 1;

export interface SavedState {
  version: number;
  items: Record<string, ItemProgress>;
  concepts: Record<string, ConceptProgress>;
  revealed: { date: string; conceptIds: string[] };
  streak: { last: string | null; count: number };
  caseOutcomes: CaseOutcome[];
  caseSession: CaseSession | null;
}

export interface StorageAdapter {
  load(): SavedState | null;
  save(state: SavedState): void;
  export(state: SavedState): string;
  import(json: string): SavedState;
}

export const emptySaved = (): SavedState => ({
  version: SCHEMA_VERSION,
  items: {},
  concepts: {},
  revealed: { date: '', conceptIds: [] },
  streak: { last: null, count: 0 },
  caseOutcomes: [],
  caseSession: null,
});

/** Migrations by version. Unknown or newer versions fall back to an empty state. */
export function migrate(raw: unknown): SavedState | null {
  if (!raw || typeof raw !== 'object') return null;
  const v = (raw as { version?: unknown }).version;
  if (v === SCHEMA_VERSION) return { ...emptySaved(), ...(raw as SavedState) };
  return null;
}
