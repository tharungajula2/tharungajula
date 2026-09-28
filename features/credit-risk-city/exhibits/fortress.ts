import { irbRiskWeight, vasicekQuantile } from './math';
import { fmt, list, num, type Exhibit } from './types';

const EXPOSURES = [
  { label: 'Home loans', rw: 0.35, size: 100 },
  { label: 'Corporate', rw: 1.0, size: 100 },
  { label: 'Defaulted', rw: 1.5, size: 50 },
] as const;

export const fortressExhibits: Exhibit[] = [
  {
    id: 'ex-pvc', conceptId: 'provisions-vs-capital', district: 'fortress',
    title: 'Moat and wall',
    prompt: 'The moat (provisions) holds the expected loss. The wall (capital) holds the bad year. Change the portfolio.',
    controls: [
      { kind: 'slider', id: 'pd', label: 'PD', min: 0.005, max: 0.08, step: 0.005, fmt: 'pct' },
      { kind: 'slider', id: 'lgd', label: 'LGD', min: 0.1, max: 0.9, step: 0.05, fmt: 'pct' },
    ],
    initial: { pd: 0.02, lgd: 0.45 },
    model(v) {
      const pd = num(v, 'pd');
      const lgd = num(v, 'lgd');
      const el = pd * lgd * 100;
      const bad = vasicekQuantile(0.999, pd, 0.15) * lgd * 100;
      return {
        readouts: [
          { label: 'Provisions (expected loss)', value: fmt(el, 'cr'), tone: 'accent' },
          { label: 'Capital (unexpected loss)', value: fmt(bad - el, 'cr'), tone: 'warn' },
          { label: '1-in-1,000-year loss', value: fmt(bad, 'cr'), tone: 'bad' },
        ],
        insight: 'On a ₹100 crore book: the expected loss is provided for; capital covers the distance from there to a 1-in-1,000-year loss. Neither is a pile of cash.',
        scene: [{ kind: 'bars', bars: [{ label: 'Loss-absorbing layers', segs: [{ value: el, tone: 'accent' }, { value: bad - el, tone: 'warn' }] }], lines: [{ value: bad, label: '99.9% year', tone: 'bad' }] }],
      };
    },
  },
  {
    id: 'ex-rwa', conceptId: 'rwa-capital-ratio', district: 'fortress',
    title: 'The weighing room',
    prompt: 'Add exposures and watch RWA and the ratio. Same rupees, very different weights.',
    controls: [
      { kind: 'action', id: 'a0', label: '+ ₹100 cr home loans (35%)' },
      { kind: 'action', id: 'a1', label: '+ ₹100 cr corporate (100%)' },
      { kind: 'action', id: 'a2', label: '+ ₹50 cr defaulted (150%)' },
      { kind: 'action', id: 'reset', label: 'Reset' },
      { kind: 'slider', id: 'cet1', label: 'CET1 capital', min: 10, max: 80, step: 1, fmt: 'cr' },
    ],
    initial: { h: [0, 1], cet1: 25 },
    act: (v, a) => (a === 'reset' ? { ...v, h: [] } : { ...v, h: [...list(v, 'h'), Number(a.slice(1))] }),
    model(v) {
      const h = list(v, 'h');
      const byType = EXPOSURES.map((e, i) => {
        const n = h.filter((x) => x === i).length;
        return { ...e, exp: n * e.size, rwa: n * e.size * e.rw };
      });
      const exp = byType.reduce((s, x) => s + x.exp, 0);
      const rwa = byType.reduce((s, x) => s + x.rwa, 0);
      const ratio = rwa > 0 ? num(v, 'cet1') / rwa : 0;
      const tones = ['good', 'accent', 'bad'] as const;
      return {
        readouts: [
          { label: 'Exposure', value: fmt(exp, 'cr') },
          { label: 'RWA', value: fmt(rwa, 'cr'), tone: 'warn' },
          { label: 'CET1 ratio', value: rwa > 0 ? fmt(ratio, 'pct') : '—', tone: ratio < 0.07 ? 'bad' : 'good' },
        ],
        insight: rwa === 0 ? 'Add some exposures.' : `₹${exp.toFixed(0)} crore of exposure weighs ₹${rwa.toFixed(0)} crore of RWA. ${ratio < 0.07 ? 'Below 7% (4.5% minimum + 2.5% buffer): capital actions needed.' : 'Above the 7% CET1 minimum plus buffer.'}`,
        scene: [
          { kind: 'bars', bars: [
            { label: 'Exposure', segs: byType.map((x, i) => ({ value: x.exp, tone: tones[i] })) },
            { label: 'RWA', segs: byType.map((x, i) => ({ value: x.rwa, tone: tones[i] })), highlight: true },
          ] },
          { kind: 'gauge', value: Math.min(ratio, 0.25), max: 0.25, zones: [{ to: 0.045, tone: 'bad' }, { to: 0.07, tone: 'warn' }, { to: 0.25, tone: 'good' }], label: 'CET1 ratio' },
        ],
      };
    },
  },
  {
    id: 'ex-stack', conceptId: 'capital-stack', district: 'fortress',
    title: 'The layered wall',
    prompt: 'Losses eat the wall from the top of CET1 down. Push losses until you cross the buffer, then the minimum.',
    controls: [
      { kind: 'slider', id: 'cet1', label: 'CET1 (% of RWA)', min: 0.05, max: 0.16, step: 0.005, fmt: 'pct' },
      { kind: 'slider', id: 'at1', label: 'Additional Tier 1', min: 0, max: 0.03, step: 0.005, fmt: 'pct' },
      { kind: 'slider', id: 't2', label: 'Tier 2', min: 0, max: 0.04, step: 0.005, fmt: 'pct' },
      { kind: 'slider', id: 'loss', label: 'Losses (% of RWA)', min: 0, max: 0.1, step: 0.005, fmt: 'pct' },
    ],
    initial: { cet1: 0.11, at1: 0.015, t2: 0.02, loss: 0 },
    model(v) {
      const cet1 = Math.max(0, num(v, 'cet1') - num(v, 'loss'));
      const t1 = cet1 + num(v, 'at1');
      const tot = t1 + num(v, 't2');
      const state = cet1 < 0.045 ? 'Below the 4.5% CET1 minimum: a regulatory breach.' : cet1 < 0.07 ? 'Inside the conservation buffer: dividends and bonuses are restricted.' : t1 < 0.06 || tot < 0.08 ? 'CET1 is fine but a Tier 1 or total-capital minimum is breached.' : 'All minimums and the buffer are met.';
      return {
        readouts: [
          { label: 'CET1', value: fmt(cet1, 'pct'), tone: cet1 < 0.045 ? 'bad' : cet1 < 0.07 ? 'warn' : 'good' },
          { label: 'Tier 1', value: fmt(t1, 'pct'), tone: t1 < 0.06 ? 'bad' : 'good' },
          { label: 'Total capital', value: fmt(tot, 'pct'), tone: tot < 0.08 ? 'bad' : 'good' },
        ],
        insight: state,
        scene: [{
          kind: 'bars', max: 0.2,
          bars: [{ label: 'Capital (% of RWA)', segs: [{ value: cet1, tone: 'accent' }, { value: num(v, 'at1'), tone: 'gold' }, { value: num(v, 't2'), tone: 'muted' }] }],
          lines: [{ value: 0.045, label: 'CET1 min 4.5%', tone: 'bad' }, { value: 0.07, label: '+ buffer 7%', tone: 'warn' }, { value: 0.08, label: 'Total 8%', tone: 'ink' }],
        }],
      };
    },
  },
  {
    id: 'ex-irb', conceptId: 'sa-vs-irb', district: 'fortress',
    title: 'Two gates',
    prompt: 'A ₹100 crore unrated corporate loan. Standardised says 100%. The IRB formula uses your PD and LGD — until the floor.',
    controls: [
      { kind: 'slider', id: 'pd', label: 'PD', min: 0.001, max: 0.1, step: 0.001, fmt: 'pct' },
      { kind: 'slider', id: 'lgd', label: 'LGD', min: 0.1, max: 0.9, step: 0.05, fmt: 'pct' },
      { kind: 'slider', id: 'm', label: 'Maturity', min: 1, max: 5, step: 0.5, fmt: 'yrs' },
    ],
    initial: { pd: 0.005, lgd: 0.45, m: 2.5 },
    model(v) {
      const sa = 100;
      const irb = irbRiskWeight(num(v, 'pd'), num(v, 'lgd'), num(v, 'm')) * 100;
      const floor = 0.725 * sa;
      const applied = Math.max(irb, floor);
      return {
        readouts: [
          { label: 'Standardised RWA', value: fmt(sa, 'cr') },
          { label: 'IRB RWA (formula)', value: fmt(irb, 'cr'), tone: 'accent' },
          { label: 'After the 72.5% output floor', value: fmt(applied, 'cr'), tone: irb < floor ? 'warn' : undefined },
        ],
        insight: irb < floor ? `The model says ₹${irb.toFixed(0)} crore, but the output floor lifts it to ₹${floor.toFixed(1)} crore: IRB can never go below 72.5% of standardised.` : 'Riskier than the standardised weight assumes: IRB asks for more capital here.',
        scene: [{ kind: 'bars', bars: [
          { label: 'Standardised', segs: [{ value: sa, tone: 'muted' }] },
          { label: 'IRB formula', segs: [{ value: irb, tone: 'accent' }] },
          { label: 'Applied', segs: [{ value: applied, tone: irb < floor ? 'warn' : 'accent' }], highlight: true },
        ], lines: [{ value: floor, label: 'floor 72.5%', tone: 'bad' }] }],
      };
    },
  },
  {
    id: 'ex-lev', conceptId: 'leverage-ratio', district: 'fortress',
    title: 'The plumb line',
    prompt: 'Lower the average risk weight: the risk-based ratio looks superb — but the plumb line ignores weights.',
    controls: [
      { kind: 'slider', id: 't1', label: 'Tier 1 capital', min: 10, max: 80, step: 1, fmt: 'cr' },
      { kind: 'slider', id: 'rw', label: 'Average risk weight', min: 0.1, max: 1, step: 0.05, fmt: 'pct' },
    ],
    initial: { t1: 25, rw: 0.2 },
    model(v) {
      const exp = 1000;
      const t1 = num(v, 't1');
      const risk = t1 / (exp * num(v, 'rw'));
      const lev = t1 / exp;
      return {
        readouts: [
          { label: 'Tier 1 ratio (risk-based)', value: fmt(risk, 'pct'), tone: risk >= 0.06 ? 'good' : 'bad' },
          { label: 'Leverage ratio', value: fmt(lev, 'pct'), tone: lev >= 0.03 ? 'good' : 'bad' },
        ],
        insight: risk >= 0.06 && lev < 0.03 ? 'The risk-based ratio passes easily, yet leverage fails: low weights hid a thin capital base. That is exactly what the backstop is for.' : lev < 0.03 ? 'Leverage below the 3% minimum.' : 'Both constraints met.',
        scene: [
          { kind: 'gauge', value: Math.min(risk, 0.3), max: 0.3, zones: [{ to: 0.06, tone: 'bad' }, { to: 0.3, tone: 'good' }], label: 'Tier 1 ratio' },
          { kind: 'gauge', value: Math.min(lev, 0.08), max: 0.08, zones: [{ to: 0.03, tone: 'bad' }, { to: 0.08, tone: 'good' }], label: 'Leverage' },
        ],
      };
    },
  },
  {
    id: 'ex-pillars', conceptId: 'three-pillars', district: 'fortress',
    title: 'The three pillars',
    prompt: 'Pillar 1 sets the formula floor. Add risks the formula misses and watch Pillar 2 add capital on top.',
    controls: [
      { kind: 'slider', id: 'p1', label: 'Pillar 1 (formula) capital', min: 50, max: 120, step: 5, fmt: 'cr' },
      { kind: 'toggle', id: 'conc', label: 'Large single-name concentration' },
      { kind: 'toggle', id: 'irrbb', label: 'Big interest-rate mismatch' },
    ],
    initial: { p1: 80, conc: 0, irrbb: 0 },
    model(v) {
      const p1 = num(v, 'p1');
      const p2 = p1 * (0.15 * num(v, 'conc') + 0.1 * num(v, 'irrbb'));
      return {
        readouts: [
          { label: 'Pillar 1 capital', value: fmt(p1, 'cr') },
          { label: 'Pillar 2 add-on', value: fmt(p2, 'cr'), tone: p2 > 0 ? 'warn' : undefined },
          { label: 'Total requirement', value: fmt(p1 + p2, 'cr'), tone: 'accent' },
        ],
        insight: p2 > 0 ? 'Pillar 1 formulas assume a diversified book and ignore banking-book rate risk; the ICAAP and supervisor add Pillar 2 capital for them. Pillar 3 then discloses it all publicly.' : 'Pillar 1 alone. Switch on a risk the formula does not see.',
        scene: [{ kind: 'bars', bars: [{ label: 'Capital requirement', segs: [{ value: p1, tone: 'accent' }, { value: p2, tone: 'warn' }] }] }],
      };
    },
  },
];
