import type { ItemPayload, Tol } from '../../content/types';

export type Response =
  | { type: 'selfGrade'; ticked: number[] }
  | { type: 'option'; index: number }
  | { type: 'number'; value: number }
  | { type: 'buckets'; assignment: number[] }
  | { type: 'order'; order: string[] };

export interface GradeResult {
  correct: boolean;
  score: number;
}

export const PASS_SCORE = 0.8;

export function withinTolerance(value: number, target: number, tol: Tol): boolean {
  if (!Number.isFinite(value)) return false;
  const diff = Math.abs(value - target);
  return tol.kind === 'abs' ? diff <= tol.value + 1e-12 : diff <= Math.abs(target) * tol.value + 1e-12;
}

/** Length of the longest subsequence of `given` that appears in the correct relative order. */
export function longestOrderedSubsequence(correct: string[], given: string[]): number {
  const pos = new Map(correct.map((s, i) => [s, i]));
  const seq = given.map((g) => pos.get(g) ?? -1).filter((x) => x >= 0);
  const tails: number[] = [];
  for (const x of seq) {
    let lo = 0;
    let hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = x;
  }
  return tails.length;
}

export interface Grader {
  grade(payload: ItemPayload, response: Response, simTarget?: number | null): GradeResult;
}

const fail: GradeResult = { correct: false, score: 0 };

/** Self-grade + automatic grading (slice 1). An AI grader can wrap this for recall/explain later. */
export const defaultGrader: Grader = {
  grade(payload, response, simTarget) {
    switch (payload.type) {
      case 'recall':
      case 'explain': {
        if (response.type !== 'selfGrade') return fail;
        const ticked = new Set(response.ticked);
        const total = payload.keyPoints.length;
        const hit = payload.keyPoints.filter((_, i) => ticked.has(i)).length;
        const essentialOk = payload.keyPoints.every((k, i) => !k.essential || ticked.has(i));
        const score = total ? hit / total : 0;
        return { correct: essentialOk && hit >= Math.ceil(PASS_SCORE * total), score };
      }
      case 'choice':
      case 'spot':
      case 'anchor': {
        if (response.type !== 'option') return fail;
        const ok = response.index === payload.answerIndex;
        return { correct: ok, score: ok ? 1 : 0 };
      }
      case 'calculate': {
        if (response.type !== 'number') return fail;
        const ok = withinTolerance(response.value, payload.answer, payload.tolerance);
        return { correct: ok, score: ok ? 1 : 0 };
      }
      case 'predict': {
        if (payload.numeric) {
          if (response.type !== 'number' || simTarget === null || simTarget === undefined) return fail;
          const ok = withinTolerance(response.value, simTarget, payload.numeric.tolerance);
          return { correct: ok, score: ok ? 1 : 0 };
        }
        if (response.type !== 'option') return fail;
        const ok = response.index === payload.answerIndex;
        return { correct: ok, score: ok ? 1 : 0 };
      }
      case 'classify': {
        if (response.type !== 'buckets') return fail;
        const n = payload.entries.length;
        const right = payload.entries.filter((e, i) => response.assignment[i] === e.bucket).length;
        const score = n ? right / n : 0;
        return { correct: score >= PASS_SCORE, score };
      }
      case 'sequence': {
        if (response.type !== 'order') return fail;
        const n = payload.steps.length;
        const score = n ? longestOrderedSubsequence(payload.steps, response.order) / n : 0;
        return { correct: score >= PASS_SCORE, score };
      }
    }
  },
};
