'use client';

import { create } from 'zustand';
import { contentPack } from '../content';
import type { Item } from '../content/types';
import { advanceSim, nextStep, recordResult, startCase, type CaseSession } from '../engine/case';
import { advanceMission, startMission, toggleMove, type MissionSession } from '../engine/mission';
import { caseFor } from './caseRuns';
import { addDays } from '../engine/learning/dates';
import { buildExport } from '../engine/learning/export';
import { newConceptProgress, recordEvidence } from '../engine/learning/mastery';
import { applyAnswer, effectiveDue, newItemProgress } from '../engine/learning/scheduler';
import { emptySaved, type SavedState } from '../storage/adapter';
import { localAdapter } from '../storage/local';
import { todayIso } from './today';

export interface AnswerArgs {
  item: Item;
  correct: boolean;
  confidence: 1 | 2 | 3;
  context: string;
  firstAttempt: boolean;
}

interface Actions {
  answer(a: AnswerArgs): void;
  markRevealed(conceptIds: string[]): void;
  completeRound(): void;
  startCase(seed: number): void;
  caseAdvance(): void;
  caseRecord(itemId: string, correct: boolean): void;
  caseNext(): void;
  mission: MissionSession | null;
  missionStart(id: string): void;
  missionToggle(moveId: string): void;
  missionAdvance(): void;
  missionClose(): void;
  dismissIntro(): void;
  toggleRead(district: string): void;
  setNextWalk(district: string, conceptId: string): void;
  markWalked(district: string): void;
  exportJson(): string;
  progressJson(): string;
  importJson(json: string): void;
  reset(): void;
}

export type CityStore = SavedState & Actions;

const initial = (): SavedState => {
  const saved = localAdapter.load() ?? emptySaved();
  // A save from an older case definition cannot be resumed: drop the run, keep all learning progress.
  if (saved.caseSession && saved.caseSession.caseId !== contentPack.cases[0].id) return { ...saved, caseSession: null };
  return saved;
};
const caseDef = (seed: number) => caseFor(seed).def;
const missionDef = (id: string) => contentPack.missions.find((m) => m.id === id)!;
const pick = (s: CityStore): SavedState => ({
  version: s.version,
  items: s.items,
  concepts: s.concepts,
  revealed: s.revealed,
  streak: s.streak,
  caseOutcomes: s.caseOutcomes,
  caseSession: s.caseSession,
  missionsWon: s.missionsWon,
  introSeen: s.introSeen,
  nextWalk: s.nextWalk,
  walked: s.walked,
  read: s.read,
});

export const useCity = create<CityStore>()((set, get) => ({
  ...initial(),
  mission: null,

  answer({ item, correct, confidence, context, firstAttempt }) {
    const today = todayIso();
    const s = get();
    const prev = s.items[item.id] ?? newItemProgress(item.id, today);
    const items = { ...s.items, [item.id]: applyAnswer(prev, { correct, confidence, today, firstAttempt }) };
    const revealedToday = s.revealed.date === today ? s.revealed.conceptIds : [];
    const concepts = { ...s.concepts };
    for (const cid of item.conceptIds) {
      concepts[cid] = recordEvidence(concepts[cid] ?? newConceptProgress(cid), {
        itemType: item.payload.type,
        correct,
        firstAttempt,
        context,
        today,
        revealedToday: revealedToday.includes(cid),
      });
    }
    set({ items, concepts });
  },

  markRevealed(conceptIds) {
    const today = todayIso();
    const s = get();
    const base = s.revealed.date === today ? s.revealed.conceptIds : [];
    set({ revealed: { date: today, conceptIds: Array.from(new Set([...base, ...conceptIds])) } });
  },

  completeRound() {
    const today = todayIso();
    const { streak } = get();
    if (streak.last === today) return;
    const count = streak.last === addDays(today, -1) ? streak.count + 1 : 1;
    set({ streak: { last: today, count } });
  },

  startCase(seed) {
    set({ caseSession: startCase(caseDef(seed), seed, contentPack.rules) });
  },
  caseAdvance() {
    const cs = get().caseSession;
    if (cs) set({ caseSession: advanceSim(cs, caseDef(cs.seed), contentPack.rules) });
  },
  caseRecord(itemId, correct) {
    const cs = get().caseSession;
    if (cs) set({ caseSession: recordResult(cs, itemId, correct) });
  },
  caseNext() {
    const cs = get().caseSession;
    if (!cs) return;
    const def = caseDef(cs.seed);
    let next: CaseSession = nextStep(cs, def);
    const step = def.steps[next.stepIndex];
    if (step && step.kind !== 'predict' && (step.advanceMonths ?? 0) > 0) {
      next = advanceSim(next, def, contentPack.rules);
    }
    if (next.done) {
      const results = Object.values(next.results);
      set({
        caseOutcomes: [
          ...get().caseOutcomes,
          { caseId: next.caseId, seed: next.seed, finishedOn: todayIso(), correct: results.filter(Boolean).length, answered: results.length },
        ],
      });
    }
    set({ caseSession: next });
  },

  missionStart(id) {
    set({ mission: startMission(missionDef(id), contentPack.rules) });
  },
  missionToggle(moveId) {
    const m = get().mission;
    if (m) set({ mission: toggleMove(m, missionDef(m.missionId), moveId) });
  },
  missionAdvance() {
    const m = get().mission;
    if (!m) return;
    const next = advanceMission(m, missionDef(m.missionId), contentPack.rules);
    const won = next.status === 'won' && !get().missionsWon.includes(next.missionId);
    set({ mission: next, ...(won ? { missionsWon: [...get().missionsWon, next.missionId] } : {}) });
  },
  missionClose() {
    set({ mission: null });
  },

  toggleRead(district) {
    const r = get().read;
    set({ read: r.includes(district) ? r.filter((x) => x !== district) : [...r, district] });
  },
  dismissIntro() {
    set({ introSeen: true });
  },
  setNextWalk(district, conceptId) {
    set({ nextWalk: { date: todayIso(), district, conceptId } });
  },
  markWalked(district) {
    const today = todayIso();
    const w = get().walked;
    const list = w.date === today ? w.districts : [];
    if (!list.includes(district)) set({ walked: { date: today, districts: [...list, district] } });
  },

  exportJson() {
    return localAdapter.export(pick(get()));
  },
  progressJson() {
    const s = get();
    return JSON.stringify(buildExport(contentPack, s.items, s.concepts, s.caseOutcomes, todayIso()), null, 2);
  },
  importJson(json) {
    set(localAdapter.import(json));
  },
  reset() {
    set({ ...emptySaved(), mission: null });
  },
}));

useCity.subscribe((s) => localAdapter.save(pick(s)));

export function dueCount(s: SavedState, today: string): number {
  return Object.values(s.items).filter((p) => effectiveDue(p) <= today).length;
}
