import type { Concept, ItemType } from '../../content/types';
import { daysBetween, type IsoDate } from './dates';

export type MasteryState = 'locked' | 'new' | 'learning' | 'recalled' | 'applied' | 'mastered';
export const STATE_ORDER: MasteryState[] = ['locked', 'new', 'learning', 'recalled', 'applied', 'mastered'];
export const RECALL_TYPES: ItemType[] = ['recall', 'explain', 'calculate', 'anchor'];

export interface ConceptProgress {
  conceptId: string;
  seen: boolean;
  recalled: boolean;
  /** Distinct application contexts with a correct answer, and the date each was earned. */
  applied: { context: string; on: IsoDate }[];
  coldRecall: boolean;
  lastReview: IsoDate | null;
  decayedOn: IsoDate | null;
}

export function newConceptProgress(conceptId: string): ConceptProgress {
  return { conceptId, seen: false, recalled: false, applied: [], coldRecall: false, lastReview: null, decayedOn: null };
}

export const isApplicationContext = (context: string): boolean =>
  context.startsWith('case:') || context.startsWith('mission:');

/** State ignoring prerequisites. */
export function ownState(p: ConceptProgress): Exclude<MasteryState, 'locked'> {
  if (!p.seen) return 'new';
  if (!p.recalled) return 'learning';
  const appliedSinceDecay = p.decayedOn ? p.applied.some((a) => a.on >= p.decayedOn!) : p.applied.length > 0;
  if (!appliedSinceDecay) return 'recalled';
  const distinct = new Set(p.applied.map((a) => a.context)).size;
  if (distinct >= 2 && p.coldRecall) return 'mastered';
  return 'applied';
}

export function conceptState(
  concept: Concept,
  progress: Record<string, ConceptProgress>,
): MasteryState {
  const recalledIdx = STATE_ORDER.indexOf('recalled');
  for (const pre of concept.prerequisites) {
    const pp = progress[pre];
    if (!pp || STATE_ORDER.indexOf(ownState(pp)) < recalledIdx) return 'locked';
  }
  return ownState(progress[concept.id] ?? newConceptProgress(concept.id));
}

export interface EvidenceInput {
  itemType: ItemType;
  correct: boolean;
  firstAttempt: boolean;
  context: string;
  today: IsoDate;
  /** True if an explanation for an item on this concept was revealed earlier today. */
  revealedToday: boolean;
}

/** Record one answer as evidence for one concept (City Bible v1.1 §5.4–5.5). */
export function recordEvidence(p: ConceptProgress, e: EvidenceInput): ConceptProgress {
  const next: ConceptProgress = { ...p, applied: [...p.applied], seen: true };
  if (!e.firstAttempt) return next;
  const wasMastered = ownState(p) === 'mastered';
  const cold =
    !e.revealedToday && p.lastReview !== null && daysBetween(p.lastReview, e.today) >= 7;
  if (e.correct) {
    if (RECALL_TYPES.includes(e.itemType)) {
      next.recalled = true;
      if (cold) next.coldRecall = true;
    }
    if (isApplicationContext(e.context) && !next.applied.some((a) => a.context === e.context)) {
      next.applied.push({ context: e.context, on: e.today });
    }
  } else if (wasMastered) {
    next.coldRecall = false;
    next.decayedOn = e.today;
  }
  next.lastReview = e.today;
  return next;
}

/** A district is locked only when every concept in it is locked; otherwise it shows the lowest open state. */
export function districtState(states: MasteryState[]): MasteryState {
  const open = states.filter((s) => s !== 'locked');
  return open.length ? lowestState(open) : states.length ? 'locked' : 'new';
}

/** The lowest state across a district's Foundation concepts. */
export function lowestState(states: MasteryState[]): MasteryState {
  if (states.length === 0) return 'new';
  return states.reduce((lo, s) => (STATE_ORDER.indexOf(s) < STATE_ORDER.indexOf(lo) ? s : lo));
}
