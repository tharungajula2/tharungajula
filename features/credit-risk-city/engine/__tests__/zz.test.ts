import { test } from 'vitest';
import { missions } from '../../content/missions';
import { rules } from '../../content/rules';
import { advanceMission, startMission, toggleMove, goalValue } from '../mission';
import type { MissionDef } from '../../content/types';
const moves = ['sme-utp', 'corp-down', 'cvi', 'ret-down'];
function subsets<T>(xs: T[]): T[][] { return xs.reduce<T[][]>((acc, x) => acc.concat(acc.map((a) => [...a, x])), [[]]).slice(1); }
function run(def: MissionDef, ms: string[]) {
  let s = startMission(def, rules);
  for (const mv of ms) s = toggleMove(s, def, mv);
  for (let i = 0; i < def.maxMonths && s.status === 'playing'; i++) s = advanceMission(s, def, rules);
  return goalValue(s.sim, def.goal)!;
}
test('x', () => {
  const base = missions.find((m) => m.id === 'break-cet1')!;
  for (const [smeAmt, retGrade, cet1, maxMonths] of [[5, 'G6', 22, 2], [4, 'G6', 21, 2], [5, 'G6', 20, 2], [6, 'G6', 22, 2]] as const) {
    const def: MissionDef = structuredClone(base);
    def.maxMonths = maxMonths;
    def.setup.bank.cet1 = cet1;
    def.setup.facilities.find((f) => f.id === 's1')!.drawn = smeAmt;
    def.setup.facilities.find((f) => f.id === 's1')!.limit = smeAmt;
    (def.moves.find((m) => m.id === 'ret-down')!.event as { grade: string }).grade = retGrade;
    const start = goalValue(startMission(def, rules).sim, def.goal)!;
    const res = subsets(moves).map((ss) => `${ss.join('+')}=${(run(def, ss) * 100).toFixed(2)}`);
    console.log(`\nsme=${smeAmt} ret=${retGrade} cet1=${cet1} months=${maxMonths} start=${(start * 100).toFixed(2)}\n  ` + res.join('\n  '));
  }
});
