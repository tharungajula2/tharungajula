import type { BorrowerDef, CollateralDef, DistrictId, FacilityDef, Segment, SimRules, SimSetup } from '../content/types';
import { nextRandom, seedToState } from '../engine/sim/prng';
import { initSim, pdFor, scenarioAt, stepMonth, computeKpis } from '../engine/sim/step';
import type { SimState } from '../engine/sim/types';

// The living city: a replenishing book of generated borrowers run month by month through the real engine.

export const BOOK_SIZE = 30;
/** The city bank pays out capital above this CET1 ratio. */
export const CET1_TARGET = 0.16;
export const CALM_FTP = 0.07;
export const STORM_FTP = 0.09;

export interface CityBank {
  sim: SimState;
  rng: number;
  nextId: number;
  storm: boolean;
  /** Facility ids originated in the most recent month. */
  fresh: string[];
  /** Month each facility defaulted (for the recovery docks). */
  defaultedAt: Record<string, number>;
  history: { month: number; cet1Ratio: number; stage3Ratio: number }[];
  /** Months in which capital fell below the 4.5% minimum and the bank was recapitalised to 8%. */
  recaps: number[];
}

const SEGMENTS: Segment[] = ['retail', 'sme', 'corporate'];

function draw(rng: number): [number, number] {
  return nextRandom(rng);
}

/** One new borrower with one facility (and collateral for some SMEs and corporates). */
function newLoan(id: number, rng: number): { b: BorrowerDef; f: FacilityDef; c: CollateralDef | null; rng: number } {
  let r = rng;
  const u = () => {
    const [v, n] = draw(r);
    r = n;
    return v;
  };
  const segment = SEGMENTS[Math.floor(u() * 3)];
  const grade = ['G3', 'G4', 'G4', 'G5', 'G5', 'G6'][Math.floor(u() * 6)];
  const size = segment === 'retail' ? 4 + u() * 6 : segment === 'sme' ? 6 + u() * 12 : 10 + u() * 15;
  const revolving = segment !== 'retail' && u() < 0.35;
  const b: BorrowerDef = { id: `b${id}`, name: `${segment} ${id}`, segment, grade };
  const f: FacilityDef = {
    id: `f${id}`,
    borrowerId: b.id,
    kind: revolving ? 'revolving' : 'term',
    limit: Math.round(size * (revolving ? 1.4 : 1) * 10) / 10,
    drawn: Math.round(size * 10) / 10,
    rate: 0.09 + ['G3', 'G4', 'G5', 'G6'].indexOf(grade) * 0.012,
    ftp: 0.07,
    remainingMonths: 24 + Math.floor(u() * 37),
  };
  const c = segment !== 'retail' && u() < 0.6 ? { id: `c${id}`, borrowerId: b.id, kind: 'Security', value: Math.round(size * (0.5 + u() * 0.6) * 10) / 10, haircut: 0.3, allocation: { [f.id]: 1 } } : null;
  return { b, f, c, rng: r };
}

export function createCityBank(seed: number, rules: SimRules): CityBank {
  let rng = seedToState(seed * 131 + 7);
  const setup: SimSetup = { bank: { cet1: 0 }, scenarioId: 'base', borrowers: [], facilities: [], collateral: [] };
  for (let i = 0; i < BOOK_SIZE; i++) {
    const n = newLoan(i + 1, rng);
    rng = n.rng;
    setup.borrowers.push(n.b);
    setup.facilities.push(n.f);
    if (n.c) setup.collateral.push(n.c);
  }
  const probe = initSim(setup, seed, rules);
  const cet1 = Math.round(probe.kpis.rwa * 0.16 * 10) / 10;
  const sim = initSim({ ...setup, bank: { cet1 } }, seed, rules);
  return { sim, rng, nextId: BOOK_SIZE + 1, storm: false, fresh: [], defaultedAt: {}, history: [{ month: 0, cet1Ratio: sim.kpis.cet1Ratio ?? 0, stage3Ratio: 0 }], recaps: [] };
}

/** Add a loan to a running simulation: same fields initSim would give it, at today's macro. */
function originate(sim: SimState, loan: ReturnType<typeof newLoan>, rules: SimRules): SimState {
  const one = initSim({ bank: { cet1: 0 }, scenarioId: sim.scenarioId, borrowers: [loan.b], facilities: [loan.f], collateral: loan.c ? [loan.c] : [] }, 1, rules);
  const macro = scenarioAt(rules, sim.scenarioId, sim.month).macro;
  const pd = pdFor(loan.b.grade, macro, rules);
  const b = { ...one.borrowers[0], pd, pd0: pd };
  const f = { ...one.facilities[0], allowance: 0 };
  return { ...sim, borrowers: [...sim.borrowers, b], facilities: [...sim.facilities, f], collateral: [...sim.collateral, ...one.collateral] };
}

/**
 * Turn the storm on or off. Switching it on brings a rating wave: when the outlook darkens, banks downgrade a large
 * slice of the book at once (about a quarter of borrowers one notch, a few two), so Stage 2 and lifetime ECL jump up front — the IFRS 9 cliff effect.
 */
export function setStorm(bank: CityBank, on: boolean, rules: SimRules): CityBank {
  if (on === bank.storm) return bank;
  if (!on) return { ...bank, storm: false };
  let rng = bank.rng;
  const borrowers = bank.sim.borrowers.map((b) => {
    if (b.defaulted) return b;
    const [u, n] = draw(rng);
    rng = n;
    const i = rules.gradeOrder.indexOf(b.grade);
    const notches = u < 0.05 ? 2 : u < 0.28 ? 1 : 0;
    return notches ? { ...b, grade: rules.gradeOrder[Math.min(rules.gradeOrder.length - 1, i + notches)], currentStreak: 0 } : b;
  });
  return { ...bank, rng, storm: true, sim: { ...bank.sim, borrowers } };
}

/** One month in the living city. Pure. */
export function tickCityBank(bank: CityBank, rules: SimRules): CityBank {
  // Rating migration: in a storm some borrowers are downgraded a notch each month; in calm, downgraded ones recover.
  let rng0 = bank.rng;
  const migrated = bank.sim.borrowers.map((b) => {
    if (b.defaulted) return b;
    const [u, n] = draw(rng0);
    rng0 = n;
    const i = rules.gradeOrder.indexOf(b.grade);
    const o = rules.gradeOrder.indexOf(b.originGrade);
    // While the storm lasts, downgrades are held: the engine restores a grade after 6 clean months, so reset that counter.
    if (bank.storm && u < 0.03 && i < rules.gradeOrder.length - 1) return { ...b, grade: rules.gradeOrder[i + 1], currentStreak: 0 };
    if (bank.storm && i > o) return { ...b, currentStreak: 0 };
    if (!bank.storm && u < 0.08 && i > o) return { ...b, grade: rules.gradeOrder[i - 1] };
    return b;
  });
  // Funding costs rise in a storm (credit spreads widen), squeezing the margin just as losses rise.
  const ftp = bank.storm ? STORM_FTP : CALM_FTP;
  let sim: SimState = { ...bank.sim, borrowers: migrated, facilities: bank.sim.facilities.map((f) => (f.ftp === ftp ? f : { ...f, ftp })), scenarioId: bank.storm ? 'storm' : 'base' };
  sim = stepMonth(sim, [], rules);
  const defaultedAt = { ...bank.defaultedAt };
  for (const f of sim.facilities) {
    const b = sim.borrowers.find((x) => x.id === f.borrowerId)!;
    if (b.defaulted && defaultedAt[f.id] === undefined) defaultedAt[f.id] = sim.month;
  }
  // Paid-off loans leave the book.
  sim = { ...sim, facilities: sim.facilities.map((f) => (!f.closed && f.stage !== 3 && f.kind === 'term' && f.drawn < 0.05 ? { ...f, closed: true, drawn: 0, allowance: 0 } : f)) };
  // Replenish: the branch books new loans to keep the book near its size.
  let rng = rng0;
  let nextId = bank.nextId;
  const fresh: string[] = [];
  const open = sim.facilities.filter((f) => !f.closed).length;
  for (let i = open; i < BOOK_SIZE; i++) {
    const n = newLoan(nextId, rng);
    rng = n.rng;
    sim = originate(sim, n, rules);
    fresh.push(n.f.id);
    nextId += 1;
  }
  // Keep the log and closed facilities bounded so a long session stays light.
  const keep = new Set(sim.facilities.filter((f) => !f.closed || sim.month - (defaultedAt[f.id] ?? -99) < 3).map((f) => f.id));
  sim = {
    ...sim,
    facilities: sim.facilities.filter((f) => keep.has(f.id)),
    borrowers: sim.borrowers.filter((b) => sim.facilities.some((f) => f.borrowerId === b.id && keep.has(f.id))),
    log: sim.log.slice(-60),
    flows: sim.flows.slice(-24),
    gcaHistory: sim.gcaHistory.slice(-24),
  };
  // Distribution policy: capital above a 16% CET1 target is paid out as dividends; below it, earnings are kept.
  sim = { ...sim, kpis: computeKpis(sim, rules) };
  const target = CET1_TARGET * sim.kpis.rwa;
  if (sim.cet1 > target) sim = { ...sim, cet1: target, kpis: computeKpis({ ...sim, cet1: target }, rules) };
  // Below the 4.5% minimum the supervisor forces a recapitalisation to 8% (shareholders put in new capital).
  let recaps = bank.recaps;
  if ((sim.kpis.cet1Ratio ?? 1) < 0.045) {
    const cet1 = 0.08 * sim.kpis.rwa;
    sim = { ...sim, cet1, kpis: computeKpis({ ...sim, cet1 }, rules) };
    recaps = [...recaps, sim.month].slice(-10);
  }
  const history = [...bank.history, { month: sim.month, cet1Ratio: sim.kpis.cet1Ratio ?? 0, stage3Ratio: sim.kpis.stage3Ratio ?? 0 }].slice(-36);
  return { ...bank, sim, rng, nextId, fresh, defaultedAt, history, recaps };
}

export type VanStatus = 'current' | 'late' | 'stage2' | 'defaulted';

export interface Readings {
  month: number;
  storm: boolean;
  gca: number;
  stageShare: [number, number, number];
  delinquentShare: number;
  inWorkout: number;
  avgPd: number;
  cet1Ratio: number;
  stage3Ratio: number;
  costOfRisk: number;
  totalEcl: number;
  newLoans: number;
  lastRecap: number | null;
  collateralCover: number;
  vans: { id: string; status: VanStatus; fresh: boolean }[];
}

export function readings(bank: CityBank): Readings {
  const s = bank.sim;
  const open = s.facilities.filter((f) => !f.closed);
  const gca = open.reduce((a, f) => a + f.drawn, 0) || 1;
  const byStage = [1, 2, 3].map((st) => open.filter((f) => f.stage === st).reduce((a, f) => a + f.drawn, 0) / gca) as [number, number, number];
  const late = open.filter((f) => f.k > 0 && f.stage !== 3).reduce((a, f) => a + f.drawn, 0) / gca;
  const pdAvg = s.borrowers.length ? s.borrowers.reduce((a, b) => a + b.pd, 0) / s.borrowers.length : 0;
  const coll = s.collateral.reduce((a, c) => a + c.value * (1 - c.haircut), 0) / gca;
  return {
    month: s.month,
    storm: bank.storm,
    gca,
    stageShare: byStage,
    delinquentShare: late,
    inWorkout: open.filter((f) => f.stage === 3).length,
    avgPd: pdAvg,
    cet1Ratio: s.kpis.cet1Ratio ?? 0,
    stage3Ratio: s.kpis.stage3Ratio ?? 0,
    costOfRisk: s.kpis.costOfRisk ?? 0,
    totalEcl: s.kpis.totalEcl,
    newLoans: bank.fresh.length,
    lastRecap: bank.recaps.length ? bank.recaps[bank.recaps.length - 1] : null,
    collateralCover: coll,
    vans: open.map((f) => ({
      id: f.id,
      status: f.stage === 3 ? 'defaulted' : f.stage === 2 ? 'stage2' : f.k > 0 ? 'late' : 'current',
      fresh: bank.fresh.includes(f.id),
    })),
  };
}

const pct = (x: number, dp = 1) => `${(x * 100).toFixed(dp)}%`;

/** What each district's instrument is showing right now, in words. */
export function liveLine(d: DistrictId, r: Readings): string {
  const econ = r.storm ? 'in the storm' : 'in calm weather';
  switch (d) {
    case 'mint': return `The city bank holds ₹${r.gca.toFixed(0)} crore of loans; the coin stack is the loan book.`;
    case 'market': return `${r.vans.length} loans are on the road, across retail, SME and corporate borrowers.`;
    case 'branch': return r.newLoans ? `The branch booked ${r.newLoans} new loan${r.newLoans > 1 ? 's' : ''} this month to replace those that left.` : 'No new loans this month — the book is full.';
    case 'registry': return `Collateral after haircuts covers ${pct(r.collateralCover, 0)} of the book.`;
    case 'watchtower': return `${pct(r.delinquentShare)} of the book is past due but not in default. The beacon turns amber above 3% and red above 8%.`;
    case 'recovery': return r.inWorkout ? `${r.inWorkout} defaulted loan${r.inWorkout > 1 ? 's are' : ' is'} in workout at the docks — the cranes are working.` : 'No loans in workout: the cranes are idle.';
    case 'observatory': return `Average 12-month PD across borrowers: ${pct(r.avgPd, 2)} ${econ}.`;
    case 'modellab': return 'The city runs on grade PDs calibrated into monthly roll rates — the same engine as the case.';
    case 'trading': return 'The city bank has no derivatives book; counterparty risk lives only in the exhibits.';
    case 'vault': return `Stage mix by balance: ${pct(r.stageShare[0], 0)} Stage 1 · ${pct(r.stageShare[1], 0)} Stage 2 · ${pct(r.stageShare[2], 0)} Stage 3.`;
    case 'fortress': return `CET1 ratio ${pct(r.cet1Ratio)}. The wall stands that high; the red line is the 7% minimum plus buffer.`;
    case 'storm': return r.storm ? 'Storm on: PDs are 1.8× normal and collateral is worth 15% less. Watch the doors and the wall.' : 'Calm. Switch the economy to Storm and watch the city react.';
    case 'port': return 'Nothing is securitised yet — every loan stays on the bank’s books.';
    case 'reporting': return `Stage 3 ratio ${pct(r.stage3Ratio, 2)} · cost of risk ${(r.costOfRisk * 10000).toFixed(0)} bps (annualised).`;
    case 'engineroom': return `Month ${r.month}: every number on these buildings flows from one simulation, through the pipes below.`;
    case 'townhall': return r.lastRecap !== null && r.month - r.lastRecap < 6 ? `Capital fell below the 4.5% minimum in month ${r.lastRecap}: the bank was forced to raise new capital back to 8%.` : r.cet1Ratio < 0.07 ? 'Capital is inside the buffer — dividends stop and the board escalates.' : r.cet1Ratio < 0.16 ? 'Below the 16% target: the bank keeps its earnings to rebuild capital.' : 'Within risk appetite; excess capital is paid out as dividends.';
    case 'embassy': return 'The city bank follows one rulebook: the illustrative Basel-and-IFRS 9 rules in the Bible.';
    case 'studio': return 'Every building is a requirement you could write: what it measures, from which data, with which threshold.';
  }
}

/** How much of a district is "built": mean of its concepts' mastery weights. */
export const STATE_WEIGHT = { locked: 0, new: 0, learning: 0.25, recalled: 0.5, applied: 0.75, mastered: 1 } as const;
export function builtShare(states: (keyof typeof STATE_WEIGHT)[]): number {
  return states.length ? states.reduce((a, s) => a + STATE_WEIGHT[s], 0) / states.length : 0;
}
