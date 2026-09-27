import type { SimEvent, SimRules, SimSetup } from '../../content/types';
import { allocatedValues } from './collateral';
import { totalRwa } from './capital';
import { ecl12m, eclLifetime, eclStage3 } from './ecl';
import { clamp, monthlyRate, safeDiv } from './math';
import { nextRandom, seedToState } from './prng';
import { calibrate, transitionRow } from './rollrates';
import type {
  BorrowerState,
  FacilityFlow,
  FacilityState,
  Kpis,
  LogEntry,
  MonthFlows,
  SimState,
  Stage,
} from './types';

const at = (arr: number[], m: number): number => arr[Math.min(m, arr.length - 1)];

export function scenarioAt(rules: SimRules, scenarioId: string, m: number): { macro: number; cvi: number } {
  const s = rules.scenarios[scenarioId] ?? rules.scenarios.base;
  return { macro: at(s.macro, m), cvi: at(s.cvi, m) };
}

export function pdFor(grade: string, macro: number, rules: SimRules): number {
  const base = rules.gradePd[grade]?.value;
  if (base === undefined) throw new Error(`Unknown grade ${grade}`);
  return clamp(base * macro, rules.pdFloor.value, rules.pdCap.value);
}

function cviNow(state: SimState, rules: SimRules): number {
  return state.cviOverride ?? scenarioAt(rules, state.scenarioId, state.month).cvi;
}

/** Recompute ECL for every facility; returns closing allowances (does not mutate). */
export function computeEcl(state: SimState, rules: SimRules): Record<string, number> {
  const cvi = cviNow(state, rules);
  const rv = allocatedValues(state.collateral, state.facilities, cvi, rules.ccfAccounting.value);
  const byId = new Map(state.borrowers.map((b) => [b.id, b]));
  const out: Record<string, number> = {};
  for (const f of state.facilities) {
    if (f.closed) {
      out[f.id] = 0;
      continue;
    }
    const b = byId.get(f.borrowerId)!;
    if (f.stage === 3) {
      const due = f.recoveryDueMonth ?? state.month + rules.recoveryMonths.value;
      out[f.id] = eclStage3(f.drawn, rv[f.id], f.rate, (due - state.month) / 12, rules);
      continue;
    }
    const input = {
      kind: f.kind,
      drawn: f.drawn,
      undrawn: f.undrawn,
      remainingMonths: f.remainingMonths,
      eir: f.rate,
      pd: b.pd,
      rv: rv[f.id],
    };
    out[f.id] = f.stage === 1 ? ecl12m(input, rules) : eclLifetime(input, rules);
  }
  return out;
}

export function computeKpis(state: SimState, rules: SimRules): Kpis {
  const open = state.facilities.filter((f) => !f.closed);
  const stageGca: Record<Stage, number> = { 1: 0, 2: 0, 3: 0 };
  let totalGca = 0;
  let totalEcl = 0;
  let stage3Allowance = 0;
  for (const f of open) {
    stageGca[f.stage] += f.drawn;
    totalGca += f.drawn;
    totalEcl += f.allowance;
    if (f.stage === 3) stage3Allowance += f.allowance;
  }
  const rwa = totalRwa(state.facilities, state.borrowers, rules);
  const hist = state.gcaHistory;
  const avgGca = hist.length ? hist.reduce((s, x) => s + x, 0) / hist.length : 0;
  const costOfRisk =
    state.month > 0 && avgGca > 0 ? (state.cumCharge * 12) / state.month / avgGca : null;
  return {
    totalGca,
    totalEcl,
    stage3Gca: stageGca[3],
    stage3Allowance,
    stage3Ratio: safeDiv(stageGca[3], totalGca),
    stage3Coverage: safeDiv(stage3Allowance, stageGca[3]),
    costOfRisk,
    rwa,
    cet1: state.cet1,
    cet1Ratio: safeDiv(state.cet1, rwa),
    stageGca,
  };
}

const emptyFlows = (month: number): MonthFlows => ({
  month,
  interestIncome: 0,
  fundingCost: 0,
  opex: 0,
  charge: 0,
  interestAdj: 0,
  writeOffs: 0,
  recoveryCash: 0,
  postWriteOffRecoveries: 0,
  net: 0,
  byFacility: {},
});

/** Book the portfolio at month 0: Stage 1 everywhere, Day-1 ECL charged to P&L. */
export function initSim(setup: SimSetup, seed: number, rules: SimRules): SimState {
  const { macro } = scenarioAt(rules, setup.scenarioId, 0);
  const borrowers: BorrowerState[] = setup.borrowers.map((b) => {
    const pd = pdFor(b.grade, macro, rules);
    return {
      id: b.id,
      name: b.name,
      segment: b.segment,
      grade: b.grade,
      originGrade: b.grade,
      scripted: !!b.scripted,
      pd0: pd,
      pd,
      pdCapped: false,
      defaulted: false,
      watchlist: false,
      utp: false,
      cureStreak: 0,
      currentStreak: 0,
      maxKSeen: 0,
    };
  });
  const facilities: FacilityState[] = setup.facilities.map((f) => ({
    id: f.id,
    borrowerId: f.borrowerId,
    kind: f.kind,
    limit: f.limit,
    drawn: f.drawn,
    undrawn: f.kind === 'revolving' ? Math.max(0, f.limit - f.drawn) : 0,
    rate: f.rate,
    ftp: f.ftp,
    remainingMonths: f.remainingMonths,
    k: 0,
    arrears: 0,
    stage: 1,
    allowance: 0,
    sicrClearStreak: 0,
    recoveryDueMonth: null,
    closed: false,
    writtenOff: 0,
  }));
  const state: SimState = {
    month: 0,
    seed,
    rng: seedToState(seed),
    scenarioId: setup.scenarioId,
    cviOverride: null,
    cet1: setup.bank.cet1,
    borrowers,
    facilities,
    collateral: setup.collateral.map((c) => ({ ...c })),
    flows: [],
    gcaHistory: [],
    cumCharge: 0,
    kpis: undefined as unknown as Kpis,
    log: [],
  };
  const closing = computeEcl(state, rules);
  const flows = emptyFlows(0);
  for (const f of state.facilities) {
    const ff: FacilityFlow = { opening: 0, closing: closing[f.id], charge: closing[f.id], interestAdj: 0, writeOff: 0 };
    flows.byFacility[f.id] = ff;
    flows.charge += ff.charge;
    f.allowance = closing[f.id];
  }
  flows.net = -flows.charge;
  state.cet1 += flows.net;
  state.cumCharge = flows.charge;
  state.flows.push(flows);
  state.gcaHistory.push(state.facilities.reduce((s, f) => s + (f.closed ? 0 : f.drawn), 0));
  state.log.push({ month: 0, kind: 'book', text: `Portfolio booked. Day-1 Stage 1 ECL charged: ${flows.charge.toFixed(4)}.` });
  state.kpis = computeKpis(state, rules);
  return state;
}

function log(state: SimState, entry: Omit<LogEntry, 'month'>) {
  state.log.push({ month: state.month, ...entry });
}

/** Advance one month in the exact order of City Bible v1.1 §6.3. Pure: returns a new state. */
export function stepMonth(prev: SimState, events: SimEvent[], rules: SimRules): SimState {
  const s: SimState = structuredClone(prev);
  s.month = prev.month + 1;
  const m = s.month;
  const ev = events.filter((e) => e.month === m);
  const bById = new Map(s.borrowers.map((b) => [b.id, b]));
  const fById = new Map(s.facilities.map((f) => [f.id, f]));
  const flows = emptyFlows(m);
  const opening: Record<string, { drawn: number; allowance: number; stage: Stage }> = {};
  for (const f of s.facilities) opening[f.id] = { drawn: f.drawn, allowance: f.allowance, stage: f.stage };

  // 1. Scenario and state events, then PDs.
  for (const e of ev) {
    switch (e.kind) {
      case 'grade': {
        const b = bById.get(e.borrowerId);
        if (b) {
          log(s, { kind: 'grade', borrowerId: b.id, text: `${b.name} regraded ${b.grade} → ${e.grade}.` });
          b.grade = e.grade;
        }
        break;
      }
      case 'watchlist': {
        const b = bById.get(e.borrowerId);
        if (b) {
          b.watchlist = e.on;
          log(s, { kind: 'watchlist', borrowerId: b.id, text: `${b.name} ${e.on ? 'added to' : 'removed from'} watchlist.` });
        }
        break;
      }
      case 'utp': {
        const b = bById.get(e.borrowerId);
        if (b) {
          b.utp = e.on;
          log(s, { kind: 'utp', borrowerId: b.id, text: `${b.name}: unlikeliness-to-pay flag ${e.on ? 'raised' : 'cleared'}.` });
        }
        break;
      }
      case 'collateralIndex':
        s.cviOverride = e.value;
        log(s, { kind: 'collateralIndex', text: `Collateral value index set to ${e.value}.` });
        break;
      case 'recoveryDue': {
        const f = fById.get(e.facilityId);
        if (f) {
          f.recoveryDueMonth = e.atMonth;
          log(s, { kind: 'recoveryDue', facilityId: f.id, text: `Recovery for ${f.id} expected in month ${e.atMonth}.` });
        }
        break;
      }
      case 'draw': {
        const f = fById.get(e.facilityId);
        if (f && !f.closed && f.kind === 'revolving') {
          const amt = Math.min(e.amount, f.undrawn);
          f.drawn += amt;
          f.undrawn -= amt;
          log(s, { kind: 'draw', facilityId: f.id, text: `${f.id} drew ${amt.toFixed(2)}.` });
        }
        break;
      }
      case 'repay': {
        const f = fById.get(e.facilityId);
        if (f && !f.closed) {
          const amt = Math.min(e.amount, f.drawn);
          f.drawn -= amt;
          if (f.kind === 'revolving' && !bById.get(f.borrowerId)!.defaulted) f.undrawn = Math.max(0, f.limit - f.drawn);
          log(s, { kind: 'repay', facilityId: f.id, text: `${f.id} repaid ${amt.toFixed(2)}.` });
        }
        break;
      }
      default:
        break;
    }
  }
  const { macro } = scenarioAt(rules, s.scenarioId, m);
  for (const b of s.borrowers) b.pd = pdFor(b.grade, macro, rules);

  // 2–3. Scheduled cash flows and payment behaviour.
  const calib = new Map<string, number>();
  for (const f of s.facilities) {
    if (f.closed) continue;
    const b = bById.get(f.borrowerId)!;
    const iM = monthlyRate(f.rate);
    const interest = opening[f.id].drawn * iM;
    f.drawn += interest;
    const payEvent = ev.find((e) => e.kind === 'payment' && e.facilityId === f.id) as
      | Extract<SimEvent, { kind: 'payment' }>
      | undefined;

    if (b.defaulted) {
      // No new instalments fall due while defaulted; only scripted payments apply.
      if (payEvent?.outcome === 'payAll' && f.arrears > 0) {
        const cash = Math.min(f.arrears, f.drawn);
        f.drawn -= cash;
        f.arrears = 0;
        f.k = 0;
        log(s, { kind: 'payment', facilityId: f.id, text: `${f.id}: all arrears cleared (${cash.toFixed(2)}).` });
      }
      f.remainingMonths -= 1;
      continue;
    }

    const notYetDue = Math.max(0, f.drawn - interest - f.arrears);
    const principalDue =
      f.kind === 'term'
        ? f.remainingMonths > 0
          ? notYetDue / f.remainingMonths
          : notYetDue
        : f.remainingMonths > 0
          ? 0
          : notYetDue;
    const instalment = interest + principalDue;

    let outcome: 'payAll' | 'payCurrent' | 'miss';
    if (payEvent) outcome = payEvent.outcome;
    else if (b.scripted) outcome = 'payCurrent';
    else {
      let sParam = calib.get(b.id);
      if (sParam === undefined) {
        const c = calibrate(b.pd, rules);
        sParam = c.s;
        b.pdCapped = c.capped;
        if (c.capped) log(s, { kind: 'pdCapped', borrowerId: b.id, text: `${b.name}: PD not reachable at the miss cap.` });
        calib.set(b.id, sParam);
      }
      const row = transitionRow(Math.min(f.k, 3), sParam, rules);
      const [u, next] = nextRandom(s.rng);
      s.rng = next;
      outcome = u < row.miss ? 'miss' : u < row.miss + row.cure ? 'payAll' : 'payCurrent';
    }

    if (outcome === 'miss') {
      f.arrears += instalment;
      f.k += 1;
      log(s, { kind: 'payment', facilityId: f.id, text: `${f.id}: instalment missed (${f.k} unpaid).` });
    } else if (outcome === 'payAll') {
      const cash = Math.min(f.drawn, instalment + f.arrears);
      f.drawn -= cash;
      if (f.k > 0) log(s, { kind: 'payment', facilityId: f.id, text: `${f.id}: all arrears cleared.` });
      f.arrears = 0;
      f.k = 0;
    } else {
      f.drawn -= Math.min(f.drawn, instalment);
    }
    f.remainingMonths -= 1;
    if (f.kind === 'revolving') f.undrawn = Math.max(0, f.limit - f.drawn);
  }

  // 4. Arrears → borrower-level default and cure; rating migration for generated borrowers.
  for (const b of s.borrowers) {
    const own = s.facilities.filter((f) => f.borrowerId === b.id && !f.closed);
    if (own.length === 0) continue;
    const maxK = Math.max(...own.map((f) => f.k));
    if (!b.defaulted) {
      if (maxK >= 4 || b.utp) {
        b.defaulted = true;
        b.cureStreak = 0;
        for (const f of own) {
          f.undrawn = 0;
          if (f.recoveryDueMonth === null) f.recoveryDueMonth = m + rules.recoveryMonths.value;
        }
        log(s, { kind: 'default', borrowerId: b.id, text: `${b.name} DEFAULTED (${b.utp ? 'unlikely to pay' : 'more than 90 days past due'}). All facilities → Stage 3.` });
      }
    } else {
      b.cureStreak = maxK === 0 && !b.utp ? b.cureStreak + 1 : 0;
      if (b.cureStreak >= rules.stage3ProbationMonths.value) {
        b.defaulted = false;
        b.cureStreak = 0;
        for (const f of own) {
          f.recoveryDueMonth = null;
          f.stage = 2;
          f.sicrClearStreak = 0;
          if (f.kind === 'revolving') f.undrawn = Math.max(0, f.limit - f.drawn);
        }
        log(s, { kind: 'cure', borrowerId: b.id, text: `${b.name} cured after probation → Stage 2.` });
      }
    }
    if (!b.scripted) {
      if (maxK >= 2 && b.maxKSeen < 2) {
        const i = rules.gradeOrder.indexOf(b.grade);
        const next = rules.gradeOrder[Math.min(rules.gradeOrder.length - 1, i + 1)];
        if (next !== b.grade) {
          log(s, { kind: 'grade', borrowerId: b.id, text: `${b.name} downgraded ${b.grade} → ${next}.` });
          b.grade = next;
        }
      }
      b.currentStreak = maxK === 0 ? b.currentStreak + 1 : 0;
      if (b.currentStreak >= 6 && b.grade !== b.originGrade) {
        log(s, { kind: 'grade', borrowerId: b.id, text: `${b.name} restored to ${b.originGrade}.` });
        b.grade = b.originGrade;
      }
      b.pd = pdFor(b.grade, macro, rules);
    }
    b.maxKSeen = Math.max(b.maxKSeen, maxK);
  }

  // 5. Staging.
  for (const f of s.facilities) {
    if (f.closed) continue;
    const b = bById.get(f.borrowerId)!;
    const before = f.stage;
    if (b.defaulted) {
      f.stage = 3;
      f.sicrClearStreak = 0;
    } else {
      const triggered = sicrTriggered(f, b, rules);
      if (triggered) {
        f.stage = 2;
        f.sicrClearStreak = 0;
      } else if (f.stage === 2) {
        f.sicrClearStreak += 1;
        if (f.sicrClearStreak >= rules.stage2ProbationMonths.value) {
          f.stage = 1;
          f.sicrClearStreak = 0;
        }
      }
    }
    if (f.stage !== before) log(s, { kind: 'stage', facilityId: f.id, text: `${f.id}: Stage ${before} → Stage ${f.stage}.` });
  }

  // 6. Recovery and write-off.
  const cvi = cviNow(s, rules);
  const rv = allocatedValues(s.collateral, s.facilities, cvi, rules.ccfAccounting.value);
  const writeOffs: Record<string, number> = {};
  for (const f of s.facilities) {
    if (f.closed || f.stage !== 3 || f.recoveryDueMonth !== m) continue;
    const cash = Math.max(
      0,
      Math.min(f.drawn, rv[f.id]) +
        rules.unsecuredRecoveryRate.value * Math.max(0, f.drawn - rv[f.id]) -
        rules.recoveryCostRate.value * f.drawn,
    );
    f.drawn -= Math.min(cash, f.drawn);
    flows.recoveryCash += cash;
    writeOffs[f.id] = f.drawn;
    f.writtenOff += f.drawn;
    log(s, { kind: 'writeOff', facilityId: f.id, text: `${f.id}: recovered ${cash.toFixed(2)}, wrote off ${f.drawn.toFixed(2)}.` });
    f.drawn = 0;
    f.undrawn = 0;
    f.closed = true;
  }

  // 7–8. ECL and the allowance walk.
  const closing = computeEcl(s, rules);
  for (const f of s.facilities) {
    const o = opening[f.id];
    const interestAdj = o.stage === 3 && !prev.facilities.find((p) => p.id === f.id)!.closed ? o.allowance * monthlyRate(f.rate) : 0;
    const writeOff = writeOffs[f.id] ?? 0;
    const close = closing[f.id];
    const charge = close - o.allowance - interestAdj + writeOff;
    flows.byFacility[f.id] = { opening: o.allowance, closing: close, charge, interestAdj, writeOff };
    flows.charge += charge;
    flows.interestAdj += interestAdj;
    flows.writeOffs += writeOff;
    f.allowance = close;
  }

  // 9. P&L → CET1.
  for (const f of prev.facilities) {
    if (f.closed) continue;
    const o = opening[f.id];
    const iM = monthlyRate(f.rate);
    flows.interestIncome += o.stage === 3 ? (o.drawn - o.allowance) * iM : o.drawn * iM;
    flows.fundingCost += o.drawn * monthlyRate(f.ftp);
    flows.opex += (o.drawn * rules.opexRate.value) / 12;
  }
  for (const e of ev) {
    if (e.kind !== 'postWriteOffRecovery') continue;
    const f = fById.get(e.facilityId);
    if (f?.closed) {
      flows.postWriteOffRecoveries += e.amount;
      log(s, { kind: 'postWriteOffRecovery', facilityId: f.id, text: `${f.id}: ${e.amount.toFixed(2)} recovered after write-off (P&L income).` });
    }
  }
  flows.net = flows.interestIncome - flows.fundingCost - flows.opex - flows.charge + flows.postWriteOffRecoveries;
  s.cet1 += flows.net;
  s.cumCharge += flows.charge;
  s.flows.push(flows);
  s.gcaHistory.push(s.facilities.reduce((sum, f) => sum + (f.closed ? 0 : f.drawn), 0));

  // 10–11. Capital after P&L, KPIs.
  s.kpis = computeKpis(s, rules);
  return s;
}

export function sicrTriggered(f: FacilityState, b: BorrowerState, rules: SimRules): boolean {
  return f.k >= 2 || b.pd / b.pd0 >= rules.sicrPdRatio.value || b.watchlist;
}

export function runMonths(state: SimState, months: number, events: SimEvent[], rules: SimRules): SimState {
  let s = state;
  for (let i = 0; i < months; i++) s = stepMonth(s, events, rules);
  return s;
}

/** Read a sim output by key: facility:<id>:<field> | borrower:<id>:<field> | kpi:<field> | bank:cet1. */
export function simValue(state: SimState, key: string): number | null {
  const [scope, a, b] = key.split(':');
  if (scope === 'kpi') {
    const v = state.kpis[a as keyof Kpis];
    return typeof v === 'number' ? v : null;
  }
  if (scope === 'bank' && a === 'cet1') return state.cet1;
  if (scope === 'facility') {
    const f = state.facilities.find((x) => x.id === a);
    if (!f) return null;
    if (b === 'ecl') return f.allowance;
    const v = f[b as keyof FacilityState];
    return typeof v === 'number' ? v : null;
  }
  if (scope === 'borrower') {
    const x = state.borrowers.find((y) => y.id === a);
    if (!x) return null;
    const v = x[b as keyof BorrowerState];
    return typeof v === 'number' ? v : typeof v === 'boolean' ? Number(v) : null;
  }
  return null;
}
