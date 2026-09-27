import type { CaseDef, SimRules } from '../content/types';
import { initSim, runMonths } from './sim/step';
import type { SimState } from './sim/types';

export interface CaseSession {
  caseId: string;
  seed: number;
  stepIndex: number;
  sim: SimState;
  /** Snapshot before the most recent advance (for before/after reveals). */
  before: SimState | null;
  results: Record<string, boolean>;
  done: boolean;
}

export const caseContext = (s: Pick<CaseSession, 'caseId' | 'seed'>): string => `case:${s.caseId}:${s.seed}`;

export function startCase(def: CaseDef, seed: number, rules: SimRules): CaseSession {
  return {
    caseId: def.id,
    seed,
    stepIndex: 0,
    sim: initSim(def.setup, seed, rules),
    before: null,
    results: {},
    done: false,
  };
}

/** Run the current step's simulation advance (if any). Pure. */
export function advanceSim(session: CaseSession, def: CaseDef, rules: SimRules): CaseSession {
  const step = def.steps[session.stepIndex];
  const months = step?.advanceMonths ?? 0;
  if (months <= 0) return { ...session, before: session.sim };
  return { ...session, before: session.sim, sim: runMonths(session.sim, months, def.events, rules) };
}

export function recordResult(session: CaseSession, itemId: string, correct: boolean): CaseSession {
  return { ...session, results: { ...session.results, [itemId]: correct } };
}

export function nextStep(session: CaseSession, def: CaseDef): CaseSession {
  const stepIndex = session.stepIndex + 1;
  return { ...session, stepIndex, before: null, done: stepIndex >= def.steps.length };
}
