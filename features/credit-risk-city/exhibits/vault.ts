import { rules } from '../content/rules';
import type { SimEvent, SimSetup } from '../content/types';
import { ecl12m, eclLifetime, eclRows } from '../engine/sim/ecl';
import { initSim, stepMonth } from '../engine/sim/step';
import { fmt, list, num, type Exhibit } from './types';

const MACHINE: SimSetup = {
  bank: { cet1: 50 },
  scenarioId: 'base',
  borrowers: [{ id: 'b', name: 'SME', segment: 'sme', grade: 'G4', scripted: true }],
  facilities: [{ id: 'f', borrowerId: 'b', kind: 'term', limit: 20, drawn: 20, rate: 0.105, ftp: 0.07, remainingMonths: 60 }],
  collateral: [{ id: 'c', borrowerId: 'b', kind: 'Plant', value: 14, haircut: 0.3 }],
};
const ACTIONS = ['wait', 'miss', 'payAll', 'down', 'up', 'watch'] as const;

/** Replay the player's month-by-month actions through the real engine. */
function replay(history: number[]) {
  let s = initSim(MACHINE, 1, rules);
  let grade = 3; // index of G4
  let watch = false;
  for (const code of history) {
    const a = ACTIONS[code];
    const month = s.month + 1;
    const ev: SimEvent[] = [];
    if (a === 'miss') ev.push({ month, kind: 'payment', facilityId: 'f', outcome: 'miss' });
    if (a === 'payAll') ev.push({ month, kind: 'payment', facilityId: 'f', outcome: 'payAll' });
    if (a === 'down' && grade < rules.gradeOrder.length - 1) ev.push({ month, kind: 'grade', borrowerId: 'b', grade: rules.gradeOrder[++grade] });
    if (a === 'up' && grade > 0) ev.push({ month, kind: 'grade', borrowerId: 'b', grade: rules.gradeOrder[--grade] });
    if (a === 'watch') {
      watch = !watch;
      ev.push({ month, kind: 'watchlist', borrowerId: 'b', on: watch });
    }
    s = stepMonth(s, ev, rules);
  }
  return s;
}

const loan = (pd: number, lgd: number, years: number) => ({ kind: 'term' as const, drawn: 100, undrawn: 0, remainingMonths: years * 12, eir: 0.08, pd, rv: 0, lgd });
const withLgd = (lgd: number) => ({ ...rules, unsecuredRecoveryRate: { ...rules.unsecuredRecoveryRate, value: 1 - lgd }, recoveryCostRate: { ...rules.recoveryCostRate, value: 0 }, recoveryMonths: { ...rules.recoveryMonths, value: 0 } });

export const vaultExhibits: Exhibit[] = [
  {
    id: 'ex-stages', conceptId: 'ifrs9-stages', district: 'vault',
    title: 'The three doors',
    prompt: 'This loan is real: every button is one month in the simulation. Make it change doors — then bring it back.',
    controls: [
      { kind: 'action', id: 'wait', label: 'Pay on time' },
      { kind: 'action', id: 'miss', label: 'Miss a payment' },
      { kind: 'action', id: 'payAll', label: 'Clear all arrears' },
      { kind: 'action', id: 'down', label: 'Downgrade a notch' },
      { kind: 'action', id: 'up', label: 'Upgrade a notch' },
      { kind: 'action', id: 'watch', label: 'Toggle watchlist' },
      { kind: 'action', id: 'reset', label: 'Start over' },
    ],
    initial: { h: [] },
    act: (v, a) => (a === 'reset' ? { h: [] } : { h: [...list(v, 'h'), ACTIONS.indexOf(a as (typeof ACTIONS)[number])] }),
    model(v) {
      const s = replay(list(v, 'h'));
      const f = s.facilities[0];
      const b = s.borrowers[0];
      const stage = (f.closed ? 3 : f.stage) as 1 | 2 | 3;
      const dpd = f.k === 0 ? 0 : 30 * f.k - 1;
      return {
        readouts: [
          { label: 'Month', value: String(s.month) },
          { label: 'Days past due', value: fmt(dpd, 'dpd'), tone: f.k >= 2 ? 'bad' : f.k === 1 ? 'warn' : undefined },
          { label: 'Grade · PD ratio', value: `${b.grade} · ${(b.pd / b.pd0).toFixed(1)}×` },
          { label: 'Stage', value: `Stage ${stage}`, tone: stage === 1 ? 'stage1' : stage === 2 ? 'stage2' : 'stage3' },
          { label: 'Provision', value: fmt(f.allowance, 'cr'), tone: 'bad' },
        ],
        insight:
          stage === 3
            ? b.defaulted ? 'Default: more than 90 days past due. Lifetime ECL on a credit-impaired loan. Clear the arrears, then it needs 3 clean months to cure — back to Stage 2, never straight to 1.' : 'Credit-impaired.'
            : stage === 2
              ? `Stage 2: ${f.k >= 2 ? 'more than 30 days past due' : 'PD at least twice its origination level'}. The provision jumped to lifetime ECL. Clear the trigger and it needs 3 clean months to return.`
              : s.month === 0 ? 'Day 1: already a 12-month ECL provision, before anything goes wrong.' : 'Stage 1: 12-month ECL. One missed payment (under 30 days) is not enough to move it.',
        scene: [{ kind: 'doors', token: stage, tokenLabel: `${fmt(f.allowance, 'cr')}`, provision: f.allowance, provisionMax: 12 }],
      };
    },
  },
  {
    id: 'ex-sicr', conceptId: 'sicr', district: 'vault',
    title: 'The trigger panel',
    prompt: 'Three ways into Stage 2. Set where the loan started and where it is now.',
    controls: [
      { kind: 'slider', id: 'pd0', label: 'PD at origination', min: 0.002, max: 0.05, step: 0.002, fmt: 'pct' },
      { kind: 'slider', id: 'pd', label: 'PD today', min: 0.002, max: 0.15, step: 0.002, fmt: 'pct' },
      { kind: 'slider', id: 'dpd', label: 'Days past due', min: 0, max: 120, step: 1, fmt: 'dpd' },
      { kind: 'toggle', id: 'watch', label: 'On the watchlist' },
    ],
    initial: { pd0: 0.01, pd: 0.015, dpd: 0, watch: 0 },
    model(v) {
      const ratio = num(v, 'pd') / num(v, 'pd0');
      const dpd = num(v, 'dpd');
      const t = { pd: ratio >= rules.sicrPdRatio.value, dpd: dpd > 30, watch: num(v, 'watch') === 1 };
      const stage: 1 | 2 | 3 = dpd > 90 ? 3 : t.pd || t.dpd || t.watch ? 2 : 1;
      const fired = [t.pd && 'PD ratio ≥ 2×', t.dpd && '> 30 days past due', t.watch && 'watchlist'].filter(Boolean).join(', ');
      return {
        readouts: [
          { label: 'PD ratio (today ÷ origination)', value: fmt(ratio, 'x'), tone: t.pd ? 'bad' : 'good' },
          { label: 'Triggers fired', value: fired || 'none' },
          { label: 'Stage', value: `Stage ${stage}`, tone: stage === 1 ? 'stage1' : stage === 2 ? 'stage2' : 'stage3' },
        ],
        insight:
          stage === 3 ? 'More than 90 days past due is default: Stage 3, whatever the PD says.'
            : num(v, 'pd') >= 0.03 && !t.pd ? `PD is high (${fmt(num(v, 'pd'), 'pct')}) but it started high: no significant increase since origination, so still Stage 1.`
            : stage === 2 ? `Stage 2 via ${fired}. Any one trigger is enough.`
            : 'No trigger fired. Note: a low PD that has doubled would trigger — it is the change that counts.',
        scene: [
          { kind: 'gauge', value: Math.min(ratio, 5), max: 5, zones: [{ to: rules.sicrPdRatio.value, tone: 'good' }, { to: 5, tone: 'bad' }], label: 'PD ratio' },
          { kind: 'gauge', value: dpd, max: 120, zones: [{ to: 30, tone: 'good' }, { to: 90, tone: 'warn' }, { to: 120, tone: 'bad' }], label: 'DPD' },
          { kind: 'doors', token: stage, tokenLabel: '', provision: stage, provisionMax: 3 },
        ],
      };
    },
  },
  {
    id: 'ex-ecl', conceptId: 'ecl-measurement', district: 'vault',
    title: 'The ECL timeline',
    prompt: 'Each bar is one year’s expected loss, already discounted. Stage 1 counts only the first; flip to lifetime.',
    controls: [
      { kind: 'slider', id: 'pd', label: 'Annual PD', min: 0.005, max: 0.1, step: 0.005, fmt: 'pct' },
      { kind: 'slider', id: 'lgd', label: 'LGD', min: 0.1, max: 0.9, step: 0.05, fmt: 'pct' },
      { kind: 'slider', id: 'yrs', label: 'Remaining life', min: 1, max: 8, step: 1, fmt: 'yrs' },
      { kind: 'toggle', id: 'life', label: 'Lifetime (Stage 2)' },
    ],
    initial: { pd: 0.03, lgd: 0.45, yrs: 5, life: 0 },
    model(v) {
      const r = withLgd(num(v, 'lgd'));
      const x = loan(num(v, 'pd'), num(v, 'lgd'), num(v, 'yrs'));
      const rows = eclRows(x, r);
      const e12 = ecl12m(x, r);
      const eL = eclLifetime(x, r);
      const life = num(v, 'life') === 1;
      return {
        readouts: [
          { label: '12-month ECL (Stage 1)', value: fmt(e12, 'cr'), tone: life ? 'muted' : 'bad' },
          { label: 'Lifetime ECL (Stage 2)', value: fmt(eL, 'cr'), tone: life ? 'bad' : 'muted' },
          { label: 'Lifetime ÷ 12-month', value: fmt(eL / e12, 'x') },
        ],
        insight: 'Each year = marginal PD × LGD × EAD (shrinking as the loan amortises) × discount factor. Moving to Stage 2 adds every later year at once — that is the cliff.',
        scene: [{
          kind: 'bars',
          bars: rows.map((row, i) => ({ label: `Y${i + 1}`, segs: [{ value: row.ecl, tone: i === 0 || life ? 'bad' : 'muted' }], highlight: i === 0 })),
          caption: '₹ crore per year, on a ₹100 crore loan',
        }],
      };
    },
  },
  {
    id: 'ex-scenarios', conceptId: 'forward-looking-scenarios', district: 'vault',
    title: 'Three weathers',
    prompt: 'Weight the scenarios. Make the downside harsher and see the weighted ECL rise above the base case.',
    controls: [
      { kind: 'slider', id: 'wb', label: 'Base weight', min: 0, max: 1, step: 0.05, fmt: 'pct' },
      { kind: 'slider', id: 'wd', label: 'Downside weight', min: 0, max: 1, step: 0.05, fmt: 'pct' },
      { kind: 'slider', id: 'sev', label: 'Downside PD multiplier', min: 1.5, max: 5, step: 0.5, fmt: 'x' },
    ],
    initial: { wb: 0.6, wd: 0.2, sev: 3 },
    model(v) {
      const r = withLgd(0.45);
      const e = (m: number) => eclLifetime(loan(Math.min(0.99, 0.02 * m), 0.45, 5), r);
      const wb = num(v, 'wb');
      const wd = Math.min(num(v, 'wd'), 1 - wb);
      const wu = Math.max(0, 1 - wb - wd);
      const [eu, eb, ed] = [e(0.6), e(1), e(num(v, 'sev'))];
      const w = wu * eu + wb * eb + wd * ed;
      return {
        readouts: [
          { label: 'Weights up / base / down', value: `${fmt(wu, 'pct')} / ${fmt(wb, 'pct')} / ${fmt(wd, 'pct')}` },
          { label: 'Base-case ECL', value: fmt(eb, 'cr') },
          { label: 'Weighted ECL (reported)', value: fmt(w, 'cr'), tone: 'bad' },
        ],
        insight: w > eb ? `Weighted ECL is ${fmt(w / eb, 'x')} the base case: losses rise faster in the downside than they fall in the upside.` : 'With little downside weight, the weighted ECL sits near the base case.',
        scene: [{
          kind: 'bars',
          bars: [
            { label: 'Upside', segs: [{ value: eu, tone: 'good' }] },
            { label: 'Base', segs: [{ value: eb, tone: 'muted' }] },
            { label: 'Downside', segs: [{ value: ed, tone: 'warn' }] },
            { label: 'Weighted', segs: [{ value: w, tone: 'bad' }], highlight: true },
          ],
          lines: [{ value: eb, label: 'base', tone: 'ink' }],
        }],
      };
    },
  },
  {
    id: 'ex-walk', conceptId: 'allowance-walk', district: 'vault',
    title: 'The allowance waterfall',
    prompt: 'The allowance is a stock; the charge is a flow. Write off loans and watch what happens to P&L.',
    controls: [
      { kind: 'slider', id: 'open', label: 'Opening allowance', min: 20, max: 100, step: 5, fmt: 'cr' },
      { kind: 'slider', id: 'newl', label: 'Charge: new loans', min: 0, max: 20, step: 1, fmt: 'cr' },
      { kind: 'slider', id: 'move', label: 'Charge: stage moves', min: -10, max: 30, step: 1, fmt: 'cr' },
      { kind: 'slider', id: 'wo', label: 'Write-offs', min: 0, max: 40, step: 1, fmt: 'cr' },
    ],
    initial: { open: 50, newl: 5, move: 7, wo: 8 },
    model(v) {
      const o = num(v, 'open');
      const charge = num(v, 'newl') + num(v, 'move');
      const wo = Math.min(num(v, 'wo'), o + charge);
      const close = o + charge - wo;
      return {
        readouts: [
          { label: 'P&L impairment charge', value: fmt(charge, 'cr'), tone: 'bad' },
          { label: 'Write-offs (no P&L)', value: fmt(wo, 'cr') },
          { label: 'Closing allowance', value: fmt(close, 'cr'), tone: 'accent' },
        ],
        insight: 'Write-offs shrink the allowance without touching P&L again — the loss was charged when it was provided for.',
        scene: [{
          kind: 'bars',
          bars: [
            { label: 'Opening', segs: [{ value: o, tone: 'muted' }] },
            { label: '+ charge', base: charge >= 0 ? o : o + charge, segs: [{ value: Math.abs(charge), tone: charge >= 0 ? 'bad' : 'good' }] },
            { label: '− write-offs', base: o + charge - wo, segs: [{ value: wo, tone: 'good' }] },
            { label: 'Closing', segs: [{ value: close, tone: 'accent' }], highlight: true },
          ],
        }],
      };
    },
  },
  {
    id: 'ex-cecl', conceptId: 'cecl-vs-ifrs9', district: 'vault',
    title: 'Two keys, day one',
    prompt: 'The same new loan under both rulebooks. Lengthen it and watch CECL’s day-one allowance pull away.',
    controls: [
      { kind: 'slider', id: 'pd', label: 'Annual PD', min: 0.005, max: 0.08, step: 0.005, fmt: 'pct' },
      { kind: 'slider', id: 'yrs', label: 'Loan life', min: 1, max: 10, step: 1, fmt: 'yrs' },
    ],
    initial: { pd: 0.02, yrs: 5 },
    model(v) {
      const r = withLgd(0.45);
      const x = loan(num(v, 'pd'), 0.45, num(v, 'yrs'));
      const i9 = ecl12m(x, r);
      const cecl = eclLifetime(x, r);
      return {
        readouts: [
          { label: 'IFRS 9 day 1 (Stage 1, 12-month)', value: fmt(i9, 'cr') },
          { label: 'CECL day 1 (lifetime)', value: fmt(cecl, 'cr'), tone: 'bad' },
          { label: 'IFRS 9 if it slips to Stage 2', value: fmt(cecl, 'cr'), tone: 'muted' },
        ],
        insight: 'CECL books the lifetime loss on day one; IFRS 9 waits for a significant increase in risk, then catches up in one jump.',
        scene: [{ kind: 'bars', bars: [
          { label: 'IFRS 9 · day 1', segs: [{ value: i9, tone: 'stage1' }] },
          { label: 'CECL · day 1', segs: [{ value: cecl, tone: 'bad' }], highlight: true },
          { label: 'IFRS 9 · Stage 2', segs: [{ value: cecl, tone: 'stage2' }] },
        ] }],
      };
    },
  },
];
