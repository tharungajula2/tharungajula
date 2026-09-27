import { describe, expect, it } from 'vitest';
import { rules } from '../../content/rules';
import type { SimEvent, SimSetup } from '../../content/types';
import { initSim, runMonths, simValue, stepMonth } from '../sim/step';

const setup: SimSetup = {
  bank: { cet1: 10 },
  scenarioId: 'base',
  borrowers: [{ id: 'b', name: 'B', segment: 'sme', grade: 'G4', scripted: true }],
  facilities: [
    { id: 't', borrowerId: 'b', kind: 'term', limit: 20, drawn: 20, rate: 0.1, ftp: 0.07, remainingMonths: 60 },
    { id: 'r', borrowerId: 'b', kind: 'revolving', limit: 10, drawn: 5, rate: 0.1, ftp: 0.07, remainingMonths: 24 },
  ],
  collateral: [{ id: 'c', borrowerId: 'b', kind: 'plant', value: 12, haircut: 0.3 }],
};
const miss = (month: number, facilityId = 't'): SimEvent => ({ month, kind: 'payment', facilityId, outcome: 'miss' });
const payAll = (month: number, facilityId = 't'): SimEvent => ({ month, kind: 'payment', facilityId, outcome: 'payAll' });

describe('booking', () => {
  it('starts in Stage 1 with a day-1 ECL charge hitting CET1', () => {
    const s = initSim(setup, 1, rules);
    expect(s.facilities.every((f) => f.stage === 1)).toBe(true);
    expect(s.flows[0].charge).toBeGreaterThan(0);
    expect(s.cet1).toBeCloseTo(10 - s.flows[0].charge, 12);
  });
});

describe('arrears, staging and default (Bible §6.2, §6.4)', () => {
  it('one miss (DPD 29) stays Stage 1; two misses (DPD 59) → Stage 2', () => {
    const s1 = runMonths(initSim(setup, 1, rules), 1, [miss(1)], rules);
    expect(s1.facilities[0].k).toBe(1);
    expect(s1.facilities[0].stage).toBe(1);
    const s2 = stepMonth(s1, [miss(2)], rules);
    expect(s2.facilities[0].stage).toBe(2);
  });
  it('k = 4 (DPD > 90) defaults the borrower: every facility → Stage 3, undrawn cancelled', () => {
    const s = runMonths(initSim(setup, 1, rules), 4, [miss(1), miss(2), miss(3), miss(4)], rules);
    expect(s.borrowers[0].defaulted).toBe(true);
    expect(s.facilities.map((f) => f.stage)).toEqual([3, 3]);
    expect(s.facilities[1].undrawn).toBe(0);
  });
  it('UTP defaults without arrears', () => {
    const s = runMonths(initSim(setup, 1, rules), 1, [{ month: 1, kind: 'utp', borrowerId: 'b', on: true }], rules);
    expect(s.facilities.map((f) => f.stage)).toEqual([3, 3]);
  });
  it('Stage 2 exits only after all triggers are clear for 3 months', () => {
    let s = runMonths(initSim(setup, 1, rules), 2, [miss(1), miss(2)], rules);
    s = stepMonth(s, [payAll(3)], rules); // clear month 1
    expect(s.facilities[0].stage).toBe(2);
    s = stepMonth(s, [], rules); // clear month 2
    expect(s.facilities[0].stage).toBe(2);
    s = stepMonth(s, [], rules); // clear month 3 → exit
    expect(s.facilities[0].stage).toBe(1);
  });
  it('a still-elevated PD blocks the Stage 2 cure even when payments are current', () => {
    let s = runMonths(initSim(setup, 1, rules), 1, [{ month: 1, kind: 'grade', borrowerId: 'b', grade: 'G6' }], rules);
    expect(s.facilities[0].stage).toBe(2);
    s = runMonths(s, 6, [], rules);
    expect(s.facilities[0].stage).toBe(2);
  });
  it('Stage 3 cures to Stage 2 (never straight to Stage 1) after 3 current months', () => {
    const ev = [miss(1), miss(2), miss(3), miss(4), payAll(5)];
    let s = runMonths(initSim(setup, 1, rules), 5, ev, rules); // arrears cleared: current month 1
    expect(s.facilities[0].stage).toBe(3);
    s = stepMonth(s, ev, rules); // current month 2
    expect(s.facilities[0].stage).toBe(3);
    s = stepMonth(s, ev, rules); // current month 3 → cure
    expect(s.borrowers[0].defaulted).toBe(false);
    expect(s.facilities[0].stage).toBe(2);
  });
});

describe('allowance walk and P&L (Bible §6.3)', () => {
  it('Charge = Closing − Opening − InterestAdj + WriteOffs every month, for every facility', () => {
    const ev: SimEvent[] = [miss(1), miss(2), miss(3), miss(4), { month: 5, kind: 'recoveryDue', facilityId: 't', atMonth: 8 }];
    let s = initSim(setup, 3, rules);
    for (let m = 1; m <= 10; m++) {
      s = stepMonth(s, ev, rules);
      for (const f of Object.values(s.flows[m].byFacility)) {
        expect(f.charge).toBeCloseTo(f.closing - f.opening - f.interestAdj + f.writeOff, 12);
      }
    }
    expect(s.facilities[0].closed).toBe(true);
    expect(s.facilities[0].writtenOff).toBeGreaterThan(0);
  });
  it('a quiet Stage 3 month has zero impairment charge; income is recognised on the net amount', () => {
    // With no unsecured recovery and no costs, recoveries do not depend on the growing balance,
    // so gross interest accrual is exactly offset by the allowance interest adjustment (unwinding).
    const r = { ...rules, unsecuredRecoveryRate: { ...rules.unsecuredRecoveryRate, value: 0 }, recoveryCostRate: { ...rules.recoveryCostRate, value: 0 } };
    const ev: SimEvent[] = [{ month: 1, kind: 'utp', borrowerId: 'b', on: true }, { month: 1, kind: 'recoveryDue', facilityId: 't', atMonth: 20 }, { month: 1, kind: 'recoveryDue', facilityId: 'r', atMonth: 20 }];
    const s1 = runMonths(initSim(setup, 1, r), 2, ev, r);
    const s2 = stepMonth(s1, ev, r);
    const f = s2.flows[3].byFacility.t;
    expect(Math.abs(f.charge)).toBeLessThan(1e-9);
    const open = s1.facilities[0];
    const iM = Math.pow(1.1, 1 / 12) - 1;
    expect(s2.flows[3].byFacility.t.interestAdj).toBeCloseTo(open.allowance * iM, 12);
    const income = (open.drawn - open.allowance) * iM + (s1.facilities[1].drawn - s1.facilities[1].allowance) * iM;
    expect(s2.flows[3].interestIncome).toBeCloseTo(income, 12);
  });
  it('CET1 moves by exactly the month’s net P&L, and the ratio uses post-P&L CET1', () => {
    const s0 = initSim(setup, 1, rules);
    const s1 = stepMonth(s0, [], rules);
    expect(s1.cet1).toBeCloseTo(s0.cet1 + s1.flows[1].net, 12);
    expect(s1.kpis.cet1Ratio).toBeCloseTo(s1.cet1 / s1.kpis.rwa, 12);
  });
  it('post-write-off recoveries are income only after closure', () => {
    const ev: SimEvent[] = [
      { month: 1, kind: 'utp', borrowerId: 'b', on: true },
      { month: 1, kind: 'recoveryDue', facilityId: 't', atMonth: 2 },
      { month: 3, kind: 'postWriteOffRecovery', facilityId: 't', amount: 0.7 },
    ];
    const s = runMonths(initSim(setup, 1, rules), 3, ev, rules);
    expect(s.flows[3].postWriteOffRecoveries).toBe(0.7);
  });
});

describe('determinism and generated borrowers', () => {
  const gen: SimSetup = { ...setup, borrowers: [{ id: 'b', name: 'B', segment: 'retail', grade: 'G7' }] };
  it('same seed → identical run; different seed → can differ', () => {
    const a = runMonths(initSim(gen, 42, rules), 24, [], rules);
    const b = runMonths(initSim(gen, 42, rules), 24, [], rules);
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
    const outcomes = new Set<string>();
    for (let seed = 1; seed <= 20; seed++) {
      const r = runMonths(initSim(gen, seed, rules), 24, [], rules);
      outcomes.add(r.facilities.map((f) => `${f.k}:${f.stage}`).join('|'));
    }
    expect(outcomes.size).toBeGreaterThan(1);
  });
  it('simValue reads facility, borrower and KPI keys', () => {
    const s = initSim(setup, 1, rules);
    expect(simValue(s, 'facility:t:stage')).toBe(1);
    expect(simValue(s, 'facility:t:ecl')).toBe(s.facilities[0].allowance);
    expect(simValue(s, 'kpi:cet1Ratio')).toBe(s.kpis.cet1Ratio);
    expect(simValue(s, 'borrower:b:defaulted')).toBe(0);
    expect(simValue(s, 'nope:x')).toBeNull();
  });
});
