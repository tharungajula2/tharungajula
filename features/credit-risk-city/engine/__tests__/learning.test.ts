import { describe, expect, it } from 'vitest';
import { contentPack } from '../../content';
import { addDays, daysBetween } from '../learning/dates';
import { applyAnswer, effectiveDue, newItemProgress } from '../learning/scheduler';
import { conceptState, districtState, newConceptProgress, recordEvidence, type ConceptProgress } from '../learning/mastery';
import { defaultGrader, longestOrderedSubsequence } from '../learning/grading';
import { buildRound, interleave } from '../learning/round';
import type { Concept } from '../../content/types';

const T = '2026-10-01';

describe('dates', () => {
  it('adds and diffs days in UTC', () => {
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(daysBetween('2026-10-01', '2026-10-08')).toBe(7);
  });
});

describe('Leitner scheduler (Bible §5.2)', () => {
  it('correct first attempt moves up a box', () => {
    const p = applyAnswer(newItemProgress('x', T), { correct: true, confidence: 2, today: T, firstAttempt: true });
    expect(p.box).toBe(1);
    expect(p.due).toBe(addDays(T, 1));
  });
  it('wrong → box 1, due tomorrow', () => {
    let p = newItemProgress('x', T);
    for (let i = 0; i < 3; i++) p = applyAnswer(p, { correct: true, confidence: 2, today: T, firstAttempt: true });
    p = applyAnswer(p, { correct: false, confidence: 1, today: T, firstAttempt: true });
    expect(p.box).toBe(1);
    expect(p.due).toBe(addDays(T, 1));
    expect(p.hypercorrection).toBe(false);
  });
  it('in-session retries never change the box', () => {
    const p0 = applyAnswer(newItemProgress('x', T), { correct: false, confidence: 1, today: T, firstAttempt: true });
    const p1 = applyAnswer(p0, { correct: true, confidence: 3, today: T, firstAttempt: false });
    expect(p1.box).toBe(p0.box);
    expect(p1.due).toBe(p0.due);
    expect(p1.attempts).toBe(p0.attempts);
  });
  it('hypercorrection adds persistent day+1 and day+3 obligations', () => {
    let p = newItemProgress('x', T);
    for (let i = 0; i < 4; i++) p = applyAnswer(p, { correct: true, confidence: 3, today: T, firstAttempt: true });
    p = applyAnswer(p, { correct: false, confidence: 3, today: T, firstAttempt: true });
    expect(p.extraDue).toEqual([addDays(T, 1), addDays(T, 3)]);
    const d1 = addDays(T, 1);
    p = applyAnswer(p, { correct: true, confidence: 2, today: d1, firstAttempt: true });
    expect(p.extraDue).toEqual([addDays(T, 3)]);
    expect(effectiveDue(p)).toBe(addDays(T, 3));
  });
});

describe('mastery (Bible §5.4–5.5)', () => {
  const ev = (over: Partial<Parameters<typeof recordEvidence>[1]>) => ({
    itemType: 'recall' as const, correct: true, firstAttempt: true, context: 'round', today: T, revealedToday: false, ...over,
  });
  it('recall and application are both required; round answers never count as application', () => {
    let p = recordEvidence(newConceptProgress('c'), ev({}));
    expect(p.recalled).toBe(true);
    p = recordEvidence(p, ev({ itemType: 'choice', context: 'round' }));
    expect(p.applied).toHaveLength(0);
    p = recordEvidence(p, ev({ itemType: 'choice', context: 'case:x:1' }));
    expect(p.applied).toHaveLength(1);
  });
  it('mastered = recalled twice on separate answers + applied once (one sitting is enough)', () => {
    const concept = { id: 'c', prerequisites: [] } as unknown as Concept;
    let p: ConceptProgress = newConceptProgress('c');
    p = recordEvidence(p, ev({}));
    expect(conceptState(concept, { c: p })).toBe('recalled');
    p = recordEvidence(p, ev({ itemType: 'choice', context: 'exhibit:ex-pd-crowd' }));
    expect(conceptState(concept, { c: p })).toBe('applied');
    p = recordEvidence(p, ev({}));
    expect(conceptState(concept, { c: p })).toBe('mastered');
  });
  it('a retry never earns cold recall; a first-attempt miss decays mastered to recalled', () => {
    let p: ConceptProgress = { ...newConceptProgress('c'), seen: true, recalled: true, coldRecall: true, lastReview: T, applied: [{ context: 'case:a:1', on: T }, { context: 'case:a:2', on: T }] };
    const concept = { id: 'c', prerequisites: [] } as unknown as Concept;
    expect(conceptState(concept, { c: p })).toBe('mastered');
    p = recordEvidence(p, ev({ correct: false, today: addDays(T, 10) }));
    expect(conceptState(concept, { c: p })).toBe('recalled');
    const retry = recordEvidence({ ...newConceptProgress('d'), lastReview: T }, ev({ firstAttempt: false, today: addDays(T, 30) }));
    expect(retry.coldRecall).toBe(false);
    expect(retry.recalled).toBe(false);
  });
  it('prerequisites below recalled lock the concept', () => {
    const concept = { id: 'b', prerequisites: ['a'] } as unknown as Concept;
    expect(conceptState(concept, {})).toBe('locked');
    const a = recordEvidence(newConceptProgress('a'), ev({}));
    expect(conceptState(concept, { a })).toBe('new');
  });
});

describe('district state', () => {
  it('is locked only when every concept is locked', () => {
    expect(districtState(['locked', 'locked'])).toBe('locked');
    expect(districtState(['locked', 'new', 'recalled'])).toBe('new');
    expect(districtState(['mastered', 'applied'])).toBe('applied');
  });
});

describe('grading (Bible §5.1)', () => {
  it('self-grade needs 80% and all essentials', () => {
    const payload = { type: 'recall' as const, modelAnswer: '', keyPoints: [
      { text: 'a', essential: true }, { text: 'b', essential: false }, { text: 'c', essential: false }, { text: 'd', essential: false }, { text: 'e', essential: false }] };
    expect(defaultGrader.grade(payload, { type: 'selfGrade', ticked: [0, 1, 2, 3] }).correct).toBe(true);
    expect(defaultGrader.grade(payload, { type: 'selfGrade', ticked: [1, 2, 3, 4] }).correct).toBe(false);
    expect(defaultGrader.grade(payload, { type: 'selfGrade', ticked: [0, 1, 2] }).correct).toBe(false);
  });
  it('sequence partial credit = longest ordered subsequence', () => {
    expect(longestOrderedSubsequence(['a', 'b', 'c', 'd', 'e'], ['a', 'c', 'b', 'd', 'e'])).toBe(4);
    const payload = { type: 'sequence' as const, steps: ['a', 'b', 'c', 'd', 'e'] };
    expect(defaultGrader.grade(payload, { type: 'order', order: ['a', 'c', 'b', 'd', 'e'] })).toEqual({ correct: true, score: 0.8 });
    expect(defaultGrader.grade(payload, { type: 'order', order: ['b', 'a', 'd', 'c', 'e'] }).correct).toBe(false);
  });
  it('numeric tolerance and sim-bound predictions', () => {
    const calc = { type: 'calculate' as const, answer: 10, tolerance: { kind: 'rel' as const, value: 0.05 }, unit: '' };
    expect(defaultGrader.grade(calc, { type: 'number', value: 10.4 }).correct).toBe(true);
    expect(defaultGrader.grade(calc, { type: 'number', value: 10.6 }).correct).toBe(false);
    const pred = { type: 'predict' as const, numeric: { tolerance: { kind: 'abs' as const, value: 0.03 }, unit: '' }, bindTo: 'kpi:x' };
    expect(defaultGrader.grade(pred, { type: 'number', value: 0.08 }, 0.105).correct).toBe(true);
    expect(defaultGrader.grade(pred, { type: 'number', value: 0.08 }, null).correct).toBe(false);
  });
});

describe('Daily Round (Bible §5.3)', () => {
  it('fresh player gets up to 9 new items plus one anchor item, no predict items', () => {
    const round = buildRound({ pack: contentPack, items: {}, concepts: {}, today: T });
    const types = round.map((i) => i.payload.type);
    expect(types).not.toContain('predict');
    expect(types.filter((t) => t === 'anchor')).toHaveLength(1);
    expect(types[types.length - 1]).toBe('anchor');
    expect(round.length - 1).toBe(9);
    const concepts = round.filter((i) => i.payload.type !== 'anchor').map((i) => i.conceptIds[0]);
    expect(new Set(concepts).size).toBe(9); // nine different ideas, not nine questions on two
  });
  it('new items shrink back to 20% of the round when plenty is due', () => {
    const due = contentPack.items.filter((i) => i.payload.type !== 'predict' && i.payload.type !== 'anchor').slice(0, 7);
    const progress = Object.fromEntries(due.map((i) => [i.id, { ...newItemProgress(i.id, T), attempts: 1 }]));
    const round = buildRound({ pack: contentPack, items: progress, concepts: {}, today: T });
    const fresh = round.filter((i) => !progress[i.id] && i.payload.type !== 'anchor');
    expect(fresh).toHaveLength(2);
  });
  it('due items come first and are interleaved across districts when possible', () => {
    const pool = (d: string) => contentPack.items.filter((i) => i.payload.type !== 'predict' && i.payload.type !== 'anchor' && !i.id.startsWith('case-') && contentPack.concepts.find((c) => c.id === i.conceptIds[0])!.district === d);
    const due = [...pool('mint').slice(0, 3), ...pool('market').slice(0, 3), ...pool('branch').slice(0, 3)];
    const progress = Object.fromEntries(due.map((i) => [i.id, { ...newItemProgress(i.id, T), attempts: 1 }]));
    const round = buildRound({ pack: contentPack, items: progress, concepts: {}, today: T });
    const main = round.filter((i) => i.payload.type !== 'anchor');
    const district = (id: string) => contentPack.concepts.find((c) => c.id === contentPack.items.find((i) => i.id === id)!.conceptIds[0])!.district;
    for (const d of due) expect(main.map((i) => i.id)).toContain(d.id);
    for (let k = 1; k < main.length; k++) expect(district(main[k].id)).not.toBe(district(main[k - 1].id));
  });
  it('a round is never empty: with nothing due and nothing new, it fills with early reviews', () => {
    const later = addDays(T, 30);
    const progress = Object.fromEntries(contentPack.items.map((i) => [i.id, { ...newItemProgress(i.id, T), due: later, attempts: 1 }]));
    const round = buildRound({ pack: contentPack, items: progress, concepts: {}, today: T });
    expect(round.filter((i) => i.payload.type !== 'anchor').length).toBe(9);
  });
  it('interleave falls back gracefully when only one district exists', () => {
    const same = contentPack.items.filter((i) => i.conceptIds[0] === 'ifrs9-stages' || i.conceptIds[0] === 'sicr');
    expect(interleave(contentPack, same)).toHaveLength(same.length);
  });
});
