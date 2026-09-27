import type { MissionDef, MissionGoal, SimEvent, SimRules } from '../content/types';
import { initSim, stepMonth } from './sim/step';
import type { SimState } from './sim/types';

export type MissionStatus = 'playing' | 'won' | 'lost';

export interface MissionSession {
  missionId: string;
  sim: SimState;
  /** Moves chosen for the next month. */
  queued: string[];
  used: Record<string, number>;
  history: { month: number; moves: string[] }[];
  status: MissionStatus;
}

export const missionContext = (id: string): string => `mission:${id}`;

export function goalValue(sim: SimState, goal: MissionGoal): number | null {
  switch (goal.kind) {
    case 'facilityStage':
      return sim.facilities.find((f) => f.id === goal.facilityId)?.stage ?? null;
    case 'cet1RatioBelow':
      return sim.kpis.cet1Ratio;
    case 'stage3RatioAbove':
      return sim.kpis.stage3Ratio;
  }
}

export function goalMet(sim: SimState, goal: MissionGoal): boolean {
  const v = goalValue(sim, goal);
  if (v === null) return false;
  switch (goal.kind) {
    case 'facilityStage':
      return v === goal.stage;
    case 'cet1RatioBelow':
      return v < goal.threshold;
    case 'stage3RatioAbove':
      return v > goal.threshold;
  }
}

export function startMission(def: MissionDef, rules: SimRules): MissionSession {
  return { missionId: def.id, sim: initSim(def.setup, 1, rules), queued: [], used: {}, history: [], status: 'playing' };
}

export function usesLeft(session: MissionSession, def: MissionDef, moveId: string): number {
  const move = def.moves.find((m) => m.id === moveId);
  if (!move) return 0;
  return (move.maxUses ?? 1) - (session.used[moveId] ?? 0);
}

export function toggleMove(session: MissionSession, def: MissionDef, moveId: string): MissionSession {
  if (session.status !== 'playing') return session;
  if (session.queued.includes(moveId)) return { ...session, queued: session.queued.filter((m) => m !== moveId) };
  if (usesLeft(session, def, moveId) <= 0) return session;
  return { ...session, queued: [...session.queued, moveId] };
}

/** Apply the queued moves as next month's events, step one month, then check the goal. Pure. */
export function advanceMission(session: MissionSession, def: MissionDef, rules: SimRules): MissionSession {
  if (session.status !== 'playing') return session;
  const month = session.sim.month + 1;
  const events: SimEvent[] = session.queued.map((id) => ({ ...def.moves.find((m) => m.id === id)!.event, month }) as SimEvent);
  const sim = stepMonth(session.sim, events, rules);
  const used = { ...session.used };
  for (const id of session.queued) used[id] = (used[id] ?? 0) + 1;
  const status: MissionStatus = goalMet(sim, def.goal) ? 'won' : sim.month >= def.maxMonths ? 'lost' : 'playing';
  return { ...session, sim, queued: [], used, history: [...session.history, { month, moves: session.queued }], status };
}
