import { rules } from '../content/rules';
import { netRecovery } from '../engine/sim/ecl';
import { lossHistogram, seededFallers, vasicekQuantile } from './math';
import { fmt, num, type Exhibit } from './types';

const survival = (h: number, t: number) => Math.pow(1 - h, t);

export const observatoryExhibits: Exhibit[] = [
  {
    id: 'ex-pd-crowd', conceptId: 'pd', district: 'observatory',
    title: 'The PD crowd',
    prompt: 'Set a PD, then run year after year. Watch how many of the 100 fall — it is never exactly the PD.',
    controls: [
      { kind: 'slider', id: 'pd', label: 'PD (12-month)', min: 0.005, max: 0.2, step: 0.005, fmt: 'pct' },
      { kind: 'action', id: 'year', label: 'Run another year' },
    ],
    initial: { pd: 0.05, seed: 1 },
    act: (v, a) => (a === 'year' ? { ...v, seed: num(v, 'seed') + 1 } : v),
    model(v) {
      const pd = num(v, 'pd');
      const fallen = seededFallers(100, pd, num(v, 'seed') * 97 + Math.round(pd * 1000));
      return {
        readouts: [
          { label: 'PD', value: fmt(pd, 'pct') },
          { label: 'Expected defaults', value: (pd * 100).toFixed(1) },
          { label: 'Defaults this year', value: String(fallen.length), tone: 'bad' },
          { label: 'Year', value: String(num(v, 'seed')) },
        ],
        insight:
          fallen.length === Math.round(pd * 100)
            ? 'This year matched the PD exactly — run another year and it probably won’t.'
            : `PD ${fmt(pd, 'pct')} expected about ${(pd * 100).toFixed(0)} defaults; this year ${fallen.length} fell. PD is an average over many years and borrowers, not a count.`,
        scene: [{ kind: 'crowd', total: 100, fallen }],
      };
    },
  },
  {
    id: 'ex-lgd', conceptId: 'lgd', district: 'observatory',
    title: 'The recovery crane',
    prompt: 'A ₹100 crore exposure defaults. Change the collateral, the haircut and how long recovery takes.',
    controls: [
      { kind: 'slider', id: 'coll', label: 'Collateral value', min: 0, max: 150, step: 5, fmt: 'cr' },
      { kind: 'slider', id: 'hc', label: 'Haircut', min: 0, max: 0.6, step: 0.05, fmt: 'pct' },
      { kind: 'slider', id: 'yrs', label: 'Years to recover', min: 0, max: 5, step: 0.5, fmt: 'yrs' },
      { kind: 'slider', id: 'rate', label: 'Discount rate', min: 0.04, max: 0.16, step: 0.01, fmt: 'pct' },
    ],
    initial: { coll: 80, hc: 0.3, yrs: 1.5, rate: 0.1 },
    model(v) {
      const ead = 100;
      const rv = num(v, 'coll') * (1 - num(v, 'hc'));
      const net = netRecovery(ead, rv, rules.unsecuredRecoveryRate.value, rules.recoveryCostRate.value);
      const pv = net / Math.pow(1 + num(v, 'rate'), num(v, 'yrs'));
      const lgd = Math.max(0, Math.min(1, 1 - pv / ead));
      return {
        readouts: [
          { label: 'Recoverable value', value: fmt(rv, 'cr') },
          { label: 'Net recovery (cash)', value: fmt(net, 'cr') },
          { label: 'Present value', value: fmt(pv, 'cr'), tone: 'good' },
          { label: 'LGD', value: fmt(lgd, 'pct'), tone: 'bad' },
        ],
        insight:
          num(v, 'yrs') >= 3
            ? 'The same cash arriving years later is worth much less today: time alone raises the loss.'
            : rv >= ead
              ? 'Collateral covers the exposure, yet costs and time still leave a loss. Secured does not mean zero LGD.'
              : 'Collateral lowers the loss, but only after the haircut — and the unsecured part recovers little.',
        scene: [
          { kind: 'bars', max: 110, bars: [
            { label: 'Exposure', segs: [{ value: ead, tone: 'ink' }] },
            { label: 'What comes back (PV)', segs: [{ value: pv, tone: 'good' }, { value: ead - pv, tone: 'bad' }] },
          ], caption: 'green = recovered today’s value · red = loss' },
        ],
      };
    },
  },
  {
    id: 'ex-ead', conceptId: 'ead-ccf', district: 'observatory',
    title: 'The drawdown tank',
    prompt: 'A revolving line: the tank is the limit, the water is what is drawn. Borrowers in trouble open the tap.',
    controls: [
      { kind: 'slider', id: 'limit', label: 'Limit', min: 10, max: 100, step: 5, fmt: 'cr' },
      { kind: 'slider', id: 'drawn', label: 'Drawn today', min: 0, max: 100, step: 1, fmt: 'cr' },
      { kind: 'slider', id: 'ccf', label: 'Credit conversion factor', min: 0, max: 1, step: 0.05, fmt: 'pct' },
    ],
    initial: { limit: 50, drawn: 20, ccf: 0.5 },
    model(v) {
      const limit = num(v, 'limit');
      const drawn = Math.min(num(v, 'drawn'), limit);
      const undrawn = limit - drawn;
      const ead = drawn + num(v, 'ccf') * undrawn;
      return {
        readouts: [
          { label: 'Drawn', value: fmt(drawn, 'cr') },
          { label: 'Undrawn', value: fmt(undrawn, 'cr') },
          { label: 'EAD', value: fmt(ead, 'cr'), tone: 'warn' },
          { label: 'Utilisation', value: fmt(drawn / limit, 'pct') },
        ],
        insight: `Exposure at default is not today’s ₹${drawn.toFixed(0)} crore: the CCF expects ${fmt(num(v, 'ccf'), 'pct')} of the undrawn ₹${undrawn.toFixed(0)} crore to be drawn before default.`,
        scene: [{ kind: 'tank', limit, drawn, ead, maxLimit: 100 }],
      };
    },
  },
  {
    id: 'ex-el', conceptId: 'expected-loss', district: 'observatory',
    title: 'Three dials, one pile',
    prompt: 'Turn PD, LGD and EAD. The pile is their product — watch what doubling any one does.',
    controls: [
      { kind: 'slider', id: 'pd', label: 'PD', min: 0.005, max: 0.1, step: 0.005, fmt: 'pct' },
      { kind: 'slider', id: 'lgd', label: 'LGD', min: 0.1, max: 0.9, step: 0.05, fmt: 'pct' },
      { kind: 'slider', id: 'ead', label: 'EAD', min: 10, max: 200, step: 10, fmt: 'cr' },
    ],
    initial: { pd: 0.02, lgd: 0.4, ead: 100 },
    model(v) {
      const pd = num(v, 'pd');
      const lgd = num(v, 'lgd');
      const ead = num(v, 'ead');
      const el = pd * lgd * ead;
      return {
        readouts: [
          { label: 'PD × LGD × EAD', value: `${fmt(pd, 'pct')} × ${fmt(lgd, 'pct')} × ₹${ead}` },
          { label: 'Expected loss', value: fmt(el, 'cr'), tone: 'bad' },
          { label: 'As % of EAD', value: fmt(pd * lgd, 'pct2') },
        ],
        insight: 'Doubling any one of the three doubles the expected loss. It is an average: no single loan loses exactly this.',
        scene: [
          { kind: 'gauge', value: pd, max: 0.1, zones: [{ to: 0.02, tone: 'good' }, { to: 0.05, tone: 'warn' }, { to: 0.1, tone: 'bad' }], label: 'PD' },
          { kind: 'gauge', value: lgd, max: 1, zones: [{ to: 0.3, tone: 'good' }, { to: 0.6, tone: 'warn' }, { to: 1, tone: 'bad' }], label: 'LGD' },
          { kind: 'gauge', value: ead, max: 200, zones: [{ to: 200, tone: 'accent' }], label: 'EAD' },
          { kind: 'bars', max: Math.sqrt(18), bars: [{ label: 'Expected loss', segs: [{ value: Math.sqrt(el), tone: 'bad' }] }], caption: 'height ∝ √EL' },
        ],
      };
    },
  },
  {
    id: 'ex-ul', conceptId: 'unexpected-loss', district: 'observatory',
    title: 'The loss distribution',
    prompt: 'Each bar is how often a year’s losses land there. Raise correlation: the average stays, the bad tail stretches.',
    controls: [
      { kind: 'slider', id: 'pd', label: 'PD', min: 0.005, max: 0.08, step: 0.005, fmt: 'pct' },
      { kind: 'slider', id: 'rho', label: 'Correlation between borrowers', min: 0.02, max: 0.3, step: 0.02, fmt: 'pct' },
    ],
    initial: { pd: 0.02, rho: 0.12 },
    model(v) {
      const pd = num(v, 'pd');
      const rho = num(v, 'rho');
      const lgd = 0.45;
      const el = pd * lgd;
      const var999 = vasicekQuantile(0.999, pd, rho) * lgd;
      const maxLoss = Math.max(var999 * 1.25, el * 3);
      const bins = 14;
      const h = lossHistogram(pd, lgd, rho, bins, maxLoss);
      return {
        readouts: [
          { label: 'Expected loss (average year)', value: fmt(el, 'pct2'), tone: 'accent' },
          { label: '1-in-1,000-year loss', value: fmt(var999, 'pct2'), tone: 'bad' },
          { label: 'Unexpected loss', value: fmt(var999 - el, 'pct2'), tone: 'warn' },
        ],
        insight: `Provisions cover the average (${fmt(el, 'pct2')} of the book). Capital must cover the gap to a 1-in-1,000 year (${fmt(var999 - el, 'pct2')}). More correlation = borrowers fail together = a longer tail.`,
        scene: [{
          kind: 'bars', caption: 'loss rate in a year →  (height ∝ √frequency, so the rare tail stays visible)',
          bars: h.map((m, i) => {
            const mid = ((i + 0.5) * maxLoss) / bins;
            return { label: i % 3 === 0 ? fmt(mid, 'pct') : '', segs: [{ value: Math.sqrt(Math.max(0, m)) * 100, tone: mid <= el ? 'accent' : mid <= var999 ? 'warn' : 'bad' }] };
          }),
        }],
      };
    },
  },
  {
    id: 'ex-pit', conceptId: 'pit-ttc', district: 'observatory',
    title: 'Weather and climate',
    prompt: 'Move through the economic cycle. The point-in-time PD follows the weather; the through-the-cycle PD is the climate.',
    controls: [{ kind: 'slider', id: 'year', label: 'Year of the cycle', min: 1, max: 8, step: 1, fmt: 'int' }],
    initial: { year: 3 },
    model(v) {
      const ttc = 0.02;
      const years = Array.from({ length: 8 }, (_, i) => i + 1);
      const pit = (y: number) => ttc * (1 + 0.7 * Math.sin(((y - 1) / 8) * 2 * Math.PI));
      const now = num(v, 'year');
      return {
        readouts: [
          { label: 'Point-in-time PD now', value: fmt(pit(now), 'pct2'), tone: 'accent' },
          { label: 'Through-the-cycle PD', value: fmt(ttc, 'pct2'), tone: 'ink' },
        ],
        insight: pit(now) > ttc * 1.2 ? 'Downturn: PIT PD is well above the long-run average. IFRS 9 must reflect this now.' : pit(now) < ttc * 0.8 ? 'Boom: PIT PD is below average. Capital models built on long-run PDs don’t fall with it.' : 'Mid-cycle: the two are close.',
        scene: [{
          kind: 'bars', max: 0.04,
          bars: years.map((y) => ({ label: `Y${y}`, segs: [{ value: pit(y), tone: y === now ? 'accent' : 'muted' }], highlight: y === now })),
          lines: [{ value: ttc, label: 'TTC', tone: 'ink' }],
        }],
      };
    },
  },
  {
    id: 'ex-lifetime', conceptId: 'lifetime-pd', district: 'observatory',
    title: 'The survival steps',
    prompt: 'Each step is a year. You can only default once, so the chance of defaulting in a later year shrinks.',
    controls: [
      { kind: 'slider', id: 'pd', label: 'Annual PD', min: 0.01, max: 0.2, step: 0.01, fmt: 'pct' },
      { kind: 'slider', id: 'yrs', label: 'Remaining life', min: 1, max: 10, step: 1, fmt: 'yrs' },
    ],
    initial: { pd: 0.05, yrs: 5 },
    model(v) {
      const h = num(v, 'pd');
      const n = num(v, 'yrs');
      const years = Array.from({ length: n }, (_, i) => i + 1);
      const cum = 1 - survival(h, n);
      return {
        readouts: [
          { label: '12-month PD', value: fmt(h, 'pct') },
          { label: `Lifetime PD (${n} yrs)`, value: fmt(cum, 'pct'), tone: 'bad' },
          { label: 'Naive sum (wrong)', value: fmt(h * n, 'pct'), tone: 'muted' },
        ],
        insight: `Lifetime PD is ${fmt(cum, 'pct')}, not ${fmt(h * n, 'pct')}: each year’s marginal PD applies only to those still surviving.`,
        scene: [{
          kind: 'bars', max: 0.2,
          bars: years.map((y) => ({ label: `Y${y}`, segs: [{ value: survival(h, y - 1) - survival(h, y), tone: 'bad' }] })),
          caption: 'marginal PD per year',
        }],
      };
    },
  },
];
