import { describe, expect, it } from 'vitest';
import { contentPack } from '../../content';
import { advanceMission, goalValue, startMission, toggleMove, usesLeft } from '../mission';

const rules = contentPack.rules;
const def = (id: string) => contentPack.missions.find((m) => m.id === id)!;
function play(id: string, plan: string[][]) {
  const d = def(id);
  let s = startMission(d, rules);
  for (const month of plan) {
    for (const mv of month) s = toggleMove(s, d, mv);
    s = advanceMission(s, d, rules);
    if (s.status !== 'playing') break;
  }
  while (s.status === 'playing') s = advanceMission(s, d, rules);
  return s;
}
const subsets = <T,>(xs: T[]): T[][] => xs.reduce<T[][]>((acc, x) => acc.concat(acc.map((a) => [...a, x])), [[]]);

describe('Break the Bank missions', () => {
  it('there are three, each starting away from its goal', () => {
    expect(contentPack.missions).toHaveLength(3);
    for (const m of contentPack.missions) expect(startMission(m, rules).status).toBe('playing');
  });
  it('doing nothing always loses', () => {
    for (const m of contentPack.missions) expect(play(m.id, []).status).toBe('lost');
  });
  it('mission 1: only real SICR triggers win', () => {
    expect(play('stage2-no-miss', [['down1']]).status).toBe('won');
    expect(play('stage2-no-miss', [['watch']]).status).toBe('won');
    expect(play('stage2-no-miss', [['draw', 'cvi']]).status).toBe('lost');
  });
  it('mission 2: no single move breaks CET1; the unsecured pair does', () => {
    for (const m of def('break-cet1').moves) expect(play('break-cet1', [[m.id]]).status, m.id).toBe('lost');
    expect(play('break-cet1', [['sme-utp', 'ret-down']]).status).toBe('won');
    expect(play('break-cet1', [['corp-down', 'cvi']]).status).toBe('lost');
    const winners = subsets(def('break-cet1').moves.map((m) => m.id)).filter((ss) => ss.length && play('break-cet1', [ss]).status === 'won');
    for (const w of winners) expect(w).toEqual(expect.arrayContaining(['sme-utp', 'ret-down']));
  });
  it('mission 3: four missed payments on the big borrower, or the mid SME plus the small UTP', () => {
    expect(play('stage3-ratio', [['big-miss'], ['big-miss'], ['big-miss'], ['big-miss']]).status).toBe('won');
    expect(play('stage3-ratio', [['mid-miss'], ['mid-miss'], ['mid-miss'], ['mid-miss']]).status).toBe('lost');
    expect(play('stage3-ratio', [['mid-miss', 'small-utp'], ['mid-miss'], ['mid-miss'], ['mid-miss']]).status).toBe('won');
    expect(play('stage3-ratio', [['small-utp', 'ret-down']]).status).toBe('lost');
  });
  it('moves respect their use limits and can be un-queued', () => {
    const d = def('stage3-ratio');
    let s = startMission(d, rules);
    s = toggleMove(s, d, 'small-utp');
    s = advanceMission(s, d, rules);
    expect(usesLeft(s, d, 'small-utp')).toBe(0);
    expect(toggleMove(s, d, 'small-utp').queued).toEqual([]);
    s = toggleMove(s, d, 'big-miss');
    expect(toggleMove(s, d, 'big-miss').queued).toEqual([]);
    expect(goalValue(s.sim, d.goal)).toBeGreaterThan(0);
  });
});
