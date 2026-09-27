import type { SimRules } from '../../content/types';
import { clamp } from './math';

/** Survival to time t (years) with annual conditional PD h. */
export const survival = (h: number, t: number): number => Math.pow(1 - h, t);

/** Period boundaries t_0 = 0, t_j = min(j, L). */
export function boundaries(L: number): number[] {
  if (L <= 0) return [0];
  const out = [0];
  for (let j = 1; j < L; j++) out.push(j);
  out.push(L);
  return out;
}

/** Scheduled term-loan balance at time t (years) under equal-principal amortisation. */
export function termBalanceAt(drawn: number, remainingMonths: number, t: number): number {
  if (remainingMonths <= 0) return drawn;
  return drawn * Math.max(0, 1 - (12 * t) / remainingMonths);
}

/** Net recovery cash on an exposure, given recoverable collateral value RV. */
export function netRecovery(exposure: number, rv: number, unsecuredRate: number, costRate: number): number {
  const secured = Math.min(exposure, rv);
  const unsecured = unsecuredRate * Math.max(0, exposure - rv);
  return Math.max(0, secured + unsecured - costRate * exposure);
}

export interface EclInput {
  kind: 'term' | 'revolving';
  drawn: number;
  undrawn: number;
  remainingMonths: number;
  eir: number;
  pd: number;
  /** Haircut-adjusted, index-adjusted collateral value allocated to this facility. */
  rv: number;
}

export function remainingLifeYears(x: Pick<EclInput, 'drawn' | 'undrawn' | 'remainingMonths'>): number {
  if (x.drawn <= 0 && x.undrawn <= 0) return 0;
  if (x.remainingMonths <= 0) return x.drawn > 0 ? 1 / 12 : 0;
  return x.remainingMonths / 12;
}

export function eadAt(x: EclInput, t: number, rules: SimRules): number {
  if (x.kind === 'term') return termBalanceAt(x.drawn, x.remainingMonths, t);
  return x.drawn + rules.ccfAccounting.value * x.undrawn;
}

export function lgdFor(ead: number, x: EclInput, rules: SimRules): number {
  if (ead <= 0) return 0;
  const net = netRecovery(ead, x.rv, rules.unsecuredRecoveryRate.value, rules.recoveryCostRate.value);
  const tau = rules.recoveryMonths.value / 12;
  return clamp(1 - (net * Math.pow(1 + x.eir, -tau)) / ead, 0, 1);
}

export interface PeriodRow {
  from: number;
  to: number;
  pd: number;
  ead: number;
  lgd: number;
  df: number;
  ecl: number;
}

export function eclRows(x: EclInput, rules: SimRules, horizonYears?: number): PeriodRow[] {
  const L = remainingLifeYears(x);
  const limit = horizonYears === undefined ? L : Math.min(L, horizonYears);
  const b = boundaries(limit);
  const rows: PeriodRow[] = [];
  for (let j = 1; j < b.length; j++) {
    const from = b[j - 1];
    const to = b[j];
    const pd = survival(x.pd, from) - survival(x.pd, to);
    const ead = eadAt(x, from, rules);
    const lgd = lgdFor(ead, x, rules);
    const df = Math.pow(1 + x.eir, -to);
    rows.push({ from, to, pd, ead, lgd, df, ecl: pd * lgd * ead * df });
  }
  return rows;
}

export const ecl12m = (x: EclInput, rules: SimRules): number =>
  eclRows(x, rules, 1).reduce((s, r) => s + r.ecl, 0);

export const eclLifetime = (x: EclInput, rules: SimRules): number =>
  eclRows(x, rules).reduce((s, r) => s + r.ecl, 0);

/** Stage 3: carrying amount minus PV of expected net recoveries. The loss itself is never discounted. */
export function eclStage3(
  gca: number,
  rv: number,
  eir: number,
  tauRemainingYears: number,
  rules: SimRules,
): number {
  if (gca <= 0) return 0;
  const net = netRecovery(gca, rv, rules.unsecuredRecoveryRate.value, rules.recoveryCostRate.value);
  const pv = net * Math.pow(1 + eir, -Math.max(0, tauRemainingYears));
  return clamp(gca - pv, 0, gca);
}
