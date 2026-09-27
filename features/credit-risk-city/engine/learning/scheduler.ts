import { addDays, minDate, type IsoDate } from './dates';

export const INTERVALS = [0, 1, 3, 7, 16, 35] as const;
export const MAX_BOX = INTERVALS.length - 1;

export interface ItemProgress {
  itemId: string;
  box: number;
  due: IsoDate;
  extraDue: IsoDate[];
  attempts: number;
  misses: number;
  lastSeen: IsoDate | null;
  hypercorrection: boolean;
}

export function newItemProgress(itemId: string, today: IsoDate): ItemProgress {
  return { itemId, box: 0, due: today, extraDue: [], attempts: 0, misses: 0, lastSeen: null, hypercorrection: false };
}

export function effectiveDue(p: ItemProgress): IsoDate {
  return p.extraDue.reduce((d, x) => minDate(d, x), p.due);
}

export interface AnswerInput {
  correct: boolean;
  confidence: 1 | 2 | 3;
  today: IsoDate;
  firstAttempt: boolean;
}

/** Leitner update (City Bible v1.1 §5.2). In-session retries never change the box. */
export function applyAnswer(p: ItemProgress, a: AnswerInput): ItemProgress {
  const next: ItemProgress = { ...p, extraDue: p.extraDue.filter((d) => d > a.today), lastSeen: a.today };
  if (!a.firstAttempt) return next;
  next.attempts += 1;
  if (a.correct) {
    next.box = Math.min(MAX_BOX, p.box + 1);
    next.due = addDays(a.today, INTERVALS[next.box]);
  } else {
    next.misses += 1;
    next.box = 1;
    next.due = addDays(a.today, 1);
    if (a.confidence === 3) {
      next.hypercorrection = true;
      const extras = [addDays(a.today, 1), addDays(a.today, 3)];
      next.extraDue = Array.from(new Set([...next.extraDue, ...extras])).sort();
    }
  }
  return next;
}
