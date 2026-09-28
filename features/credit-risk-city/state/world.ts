'use client';

import { create } from 'zustand';
import type { DistrictId } from '../content/types';
import type { WalkQuestion } from '../ui/world/walk';
import { exhibits } from '../exhibits';
import type { Vals } from '../exhibits/types';

export interface WalkState {
  questions: WalkQuestion[];
  index: number;
  /** Per question: the district tapped or option chosen, and whether it was right. */
  answers: { given: string; correct: boolean }[];
}

interface WorldStore {
  selected: DistrictId | null;
  openConcept: string | null;
  roundDistrict: DistrictId | null;
  engineView: boolean;
  walk: WalkState | null;
  interior: { district: DistrictId; active: number } | null;
  hovered: DistrictId | null;
  setHovered(id: DistrictId | null): void;
  exhibitVals: Record<string, Vals>;
  enterInterior(d: DistrictId, active?: number): void;
  leaveInterior(): void;
  setExhibit(i: number): void;
  setVal(exhibitId: string, key: string, value: number): void;
  exhibitAct(exhibitId: string, actionId: string): void;
  select(id: DistrictId | null, conceptId?: string | null): void;
  setRoundDistrict(id: DistrictId | null): void;
  toggleEngine(): void;
  walkStart(questions: WalkQuestion[]): void;
  walkTap(id: DistrictId): void;
  walkChoose(index: number): void;
  walkNext(): void;
  walkEnd(): void;
}

export const useWorld = create<WorldStore>()((set, get) => ({
  selected: null,
  openConcept: null,
  roundDistrict: null,
  engineView: false,
  walk: null,
  interior: null,
  hovered: null,
  setHovered(id) {
    if (get().hovered !== id) set({ hovered: id });
  },
  exhibitVals: {},
  enterInterior(d, active = 0) {
    set({ interior: { district: d, active } });
  },
  leaveInterior() {
    set({ interior: null });
  },
  setExhibit(i) {
    const it = get().interior;
    if (it) set({ interior: { ...it, active: i } });
  },
  setVal(exhibitId, key, value) {
    const cur = get().exhibitVals[exhibitId] ?? exhibits.find((e) => e.id === exhibitId)!.initial;
    set({ exhibitVals: { ...get().exhibitVals, [exhibitId]: { ...cur, [key]: value } } });
  },
  exhibitAct(exhibitId, actionId) {
    const ex = exhibits.find((e) => e.id === exhibitId)!;
    const cur = get().exhibitVals[exhibitId] ?? ex.initial;
    if (ex.act) set({ exhibitVals: { ...get().exhibitVals, [exhibitId]: ex.act(cur, actionId) } });
  },
  select(id, conceptId = null) {
    set({ selected: id, openConcept: conceptId });
  },
  setRoundDistrict(id) {
    set({ roundDistrict: id });
  },
  toggleEngine() {
    set({ engineView: !get().engineView });
  },
  walkStart(questions) {
    set({ walk: { questions, index: 0, answers: [] } });
  },
  walkTap(id) {
    const w = get().walk;
    if (!w) return;
    const q = w.questions[w.index];
    if (!q || q.kind !== 'where' || w.answers.length > w.index) return;
    set({ walk: { ...w, answers: [...w.answers, { given: id, correct: id === q.answer }] } });
  },
  walkChoose(index) {
    const w = get().walk;
    if (!w) return;
    const q = w.questions[w.index];
    if (!q || q.kind !== 'what' || w.answers.length > w.index) return;
    set({ walk: { ...w, answers: [...w.answers, { given: String(index), correct: index === q.answerIndex }] } });
  },
  walkNext() {
    const w = get().walk;
    if (w) set({ walk: { ...w, index: w.index + 1 } });
  },
  walkEnd() {
    set({ walk: null });
  },
}));
