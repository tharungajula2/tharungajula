import { normCdf, normInv, seededFallers, vasicekQuantile } from './math';
import { action, bar, bars, chain, clamp01, fmt, gauge, num, on, ro, slider, toggle, type Exhibit } from './types';

const BANDS = [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5];
/** Share of a normal(μ,1) population in each of 6 score bands. */
const bandShares = (mu: number) => BANDS.map((c, i) => {
  const lo = i === 0 ? -Infinity : c - 0.5;
  const hi = i === BANDS.length - 1 ? Infinity : c + 0.5;
  return normCdf(hi - mu) - normCdf(lo - mu);
});

export const route2Exhibits: Exhibit[] = [
  // ── District 8 · Model Lab ─────────────────────────────────────────────
  {
    id: 'ex-score', conceptId: 'scorecard', district: 'modellab', title: 'The points machine',
    prompt: 'Characteristics earn points; points meet a cut-off. Build an applicant and move the cut-off.',
    controls: [slider('age', 'Years with employer (points)', 0, 60, 5, 'int'), slider('inc', 'Income band (points)', 0, 80, 5, 'int'), slider('del', 'Past delinquencies (points lost)', 0, 100, 10, 'int'), slider('cut', 'Cut-off', 560, 700, 10, 'int')],
    initial: { age: 30, inc: 45, del: 20, cut: 620 },
    model(v) {
      const score = 550 + num(v, 'age') + num(v, 'inc') - num(v, 'del');
      const ok = score >= num(v, 'cut');
      return {
        readouts: [ro('Score', String(score), 'accent'), ro('Decision', ok ? 'Approve' : 'Decline', ok ? 'good' : 'bad'), ro('Margin to cut-off', `${score - num(v, 'cut')} points`)],
        insight: 'Raising the cut-off approves fewer, safer applicants; the model itself (and its Gini) does not change.',
        scene: [bars([
          bar('Base 550', 50, 'muted'),
          { label: '+ tenure', base: 50, segs: [{ value: num(v, 'age'), tone: 'good' }] },
          { label: '+ income', base: 50 + num(v, 'age'), segs: [{ value: num(v, 'inc'), tone: 'good' }] },
          { label: '− delinquency', base: score - 500, segs: [{ value: num(v, 'del'), tone: 'bad' }] },
          bar(`Score ${score}`, score - 500, ok ? 'good' : 'bad', true),
        ], [{ value: num(v, 'cut') - 500, label: `cut-off ${num(v, 'cut')}`, tone: 'ink' }], 240, 'axis starts at 500 points')],
      };
    },
  },
  {
    id: 'ex-calib', conceptId: 'discrimination-calibration', district: 'modellab', title: 'Order and level',
    prompt: 'Predicted vs actual default rate by grade. Break the ranking, then break the level — they are different failures.',
    controls: [slider('scale', 'Predicted ÷ actual (calibration)', 0.3, 2, 0.1, 'x'), slider('rank', 'Ranking power', 0, 1, 0.1, 'pct')],
    initial: { scale: 1, rank: 1 },
    model(v) {
      const base = [0.005, 0.01, 0.02, 0.04, 0.08];
      const avg = base.reduce((s, x) => s + x, 0) / base.length;
      const actual = base.map((b) => avg + num(v, 'rank') * (b - avg));
      const pred = base.map((b) => b * num(v, 'scale'));
      const calOk = Math.abs(num(v, 'scale') - 1) <= 0.15;
      const rankOk = num(v, 'rank') >= 0.6;
      return {
        readouts: [ro('Discrimination', rankOk ? 'Good' : 'Weak', rankOk ? 'good' : 'bad'), ro('Calibration', calOk ? 'Good' : num(v, 'scale') < 1 ? 'Under-predicts' : 'Over-predicts', calOk ? 'good' : 'bad')],
        insight: !rankOk ? 'Grades no longer separate risk: actual default rates flatten out. That is a discrimination problem — Gini falls.' : !calOk ? 'Ranking is fine but predicted levels are off: a calibration problem. Gini would not notice.' : 'Grades rank risk well and predictions match outcomes.',
        scene: [bars(base.flatMap((_, i) => [{ label: `G${i + 1} pred`, segs: [{ value: pred[i] * 100, tone: 'accent' as const }] }, { label: 'actual', segs: [{ value: actual[i] * 100, tone: 'warn' as const }] }]), undefined, 17, '% default rate: blue predicted, amber actual')],
      };
    },
  },
  {
    id: 'ex-auc', conceptId: 'gini-auc', district: 'modellab', title: 'Two humps',
    prompt: 'Scores of good and bad borrowers. Pull the humps apart and watch AUC and Gini climb.',
    controls: [slider('d', 'Separation between goods and bads', 0, 3, 0.1, 'x')],
    initial: { d: 1.2 },
    model(v) {
      const d = num(v, 'd');
      const auc = normCdf(d / Math.SQRT2);
      const gini = 2 * auc - 1;
      const xs = Array.from({ length: 10 }, (_, i) => -3 + i * 0.8);
      const pdf = (x: number, m: number) => Math.exp(-((x - m) ** 2) / 2);
      return {
        readouts: [ro('AUC', auc.toFixed(3), 'accent'), ro('Gini', gini.toFixed(3), gini < 0.4 ? 'warn' : 'good')],
        insight: 'AUC is the chance a random bad scores worse than a random good. It measures separation only — not whether PDs are the right level.',
        scene: [bars(xs.flatMap((x, i) => [{ label: i % 3 === 0 ? `${x.toFixed(1)}` : '', segs: [{ value: pdf(x, 0), tone: 'bad' as const }] }, { label: '', segs: [{ value: pdf(x, d), tone: 'good' as const }] }]), undefined, 1.1, 'score →  (red = bads, green = goods)')],
      };
    },
  },
  {
    id: 'ex-validation', conceptId: 'model-validation', district: 'modellab', title: 'The validation bench',
    prompt: 'A model reaches validation. Tick what was done — and who did it.',
    controls: [toggle('cs', 'Conceptual soundness reviewed'), toggle('oa', 'Back-tested against outcomes'), toggle('om', 'Ongoing monitoring in place'), toggle('ind', 'Validators independent of developers')],
    initial: { cs: 1, oa: 1, om: 0, ind: 1 },
    model(v) {
      const parts = ['cs', 'oa', 'om'].filter((k) => on(v, k)).length;
      const ind = on(v, 'ind');
      const verdict = !ind ? 'Not a validation' : parts === 3 ? 'Approved' : parts >= 2 ? 'Approved with findings' : 'Rejected';
      return {
        readouts: [ro('Parts covered', `${parts} of 3`), ro('Outcome', verdict, verdict === 'Approved' ? 'good' : verdict === 'Rejected' || !ind ? 'bad' : 'warn')],
        insight: !ind ? 'Developers checking their own model is a review, not a validation. Independence is the whole point.' : 'Is it built right, did it predict right, is it still working. Findings go into the model inventory with owners and dates.',
        scene: [chain([{ label: 'Soundness', tone: on(v, 'cs') ? 'good' : 'bad' }, { label: 'Outcomes', tone: on(v, 'oa') ? 'good' : 'bad' }, { label: 'Monitoring', tone: on(v, 'om') ? 'good' : 'bad' }, { label: verdict === 'Approved with findings' ? 'Findings' : verdict === 'Not a validation' ? 'Invalid' : verdict, tone: verdict === 'Approved' ? 'good' : !ind || verdict === 'Rejected' ? 'bad' : 'warn', raised: true }], ind ? undefined : 2)],
      };
    },
  },
  {
    id: 'ex-psi', conceptId: 'population-stability', district: 'modellab', title: 'The drifting population',
    prompt: 'The scorecard was built on one population. Shift today’s applicants and watch the PSI thermometer.',
    controls: [slider('shift', 'Shift in applicant scores', -1.5, 1.5, 0.1, 'x')],
    initial: { shift: 0.3 },
    model(v) {
      const e = bandShares(0);
      const a = bandShares(num(v, 'shift'));
      const psi = e.reduce((s, x, i) => s + (a[i] - x) * Math.log(a[i] / x), 0);
      return {
        readouts: [ro('PSI', psi.toFixed(3), psi > 0.25 ? 'bad' : psi > 0.1 ? 'warn' : 'good'), ro('Reading', psi > 0.25 ? 'Significant shift' : psi > 0.1 ? 'Some shift' : 'Stable')],
        insight: psi > 0.25 ? 'The model is scoring a different population from the one it learned on. Investigate before trusting its PDs.' : 'PSI compares today’s mix across score bands with the development mix (rule-of-thumb bands 0.10 / 0.25).',
        scene: [gauge(psi, 0.5, [{ to: 0.1, tone: 'good' }, { to: 0.25, tone: 'warn' }, { to: 0.5, tone: 'bad' }], 'PSI'), bars(e.flatMap((x, i) => [{ label: `B${i + 1}`, segs: [{ value: x * 100, tone: 'muted' as const }] }, { label: '', segs: [{ value: a[i] * 100, tone: 'accent' as const }] }]), undefined, 45, 'grey = development · blue = today')],
      };
    },
  },
  // ── District 9 · Trading Floor ─────────────────────────────────────────
  {
    id: 'ex-mtm', conceptId: 'counterparty-exposure', district: 'trading', title: 'The see-saw swap',
    prompt: 'A ₹100 crore swap. Move rates: the value swings between you and your counterparty. Exposure is only the positive side.',
    controls: [slider('move', 'Rate move (basis points)', -200, 200, 10, 'int')],
    initial: { move: 50 },
    model(v) {
      const mtm = (100 * num(v, 'move') * 3.5) / 10000;
      const exp = Math.max(0, mtm);
      return {
        readouts: [ro('Notional', fmt(100, 'cr')), ro('Market value to us', `${mtm >= 0 ? '+' : '−'}${fmt(Math.abs(mtm), 'cr')}`), ro('Our exposure', fmt(exp, 'cr'), exp > 0 ? 'warn' : 'good')],
        insight: exp > 0 ? `If the counterparty fails now we lose the replacement value, ₹${exp.toFixed(1)} crore — not the ₹100 crore notional.` : 'The trade is worth something to them, not us: we have no exposure today, but they have exposure to us.',
        scene: [bars([bar('Notional', 100, 'muted'), bar('Our exposure', exp, 'warn', true), bar('Their exposure', Math.max(0, -mtm), 'accent')], undefined, 105)],
      };
    },
  },
  {
    id: 'ex-netting', conceptId: 'netting-collateral', district: 'trading', title: 'The netting scales',
    prompt: 'Three trades with one counterparty. Switch netting on, then add margin.',
    controls: [slider('t1', 'Trade 1 value', -20, 20, 1, 'cr'), slider('t2', 'Trade 2 value', -20, 20, 1, 'cr'), slider('t3', 'Trade 3 value', -20, 20, 1, 'cr'), toggle('net', 'Enforceable netting agreement'), slider('vm', 'Margin held', 0, 20, 1, 'cr')],
    initial: { t1: 10, t2: -6, t3: 3, net: 0, vm: 0 },
    model(v) {
      const t = [num(v, 't1'), num(v, 't2'), num(v, 't3')];
      const gross = t.reduce((s, x) => s + Math.max(0, x), 0);
      const net = Math.max(0, t.reduce((s, x) => s + x, 0));
      const pre = on(v, 'net') ? net : gross;
      const after = Math.max(0, pre - num(v, 'vm'));
      return {
        readouts: [ro('Gross positive', fmt(gross, 'cr')), ro('Net', fmt(net, 'cr')), ro('Exposure after margin', fmt(after, 'cr'), 'warn')],
        insight: on(v, 'net') ? 'Netting lets the negative trade offset the positives; margin covers the rest. Both depend on legal agreements the data must capture.' : 'Without netting every positive trade is exposure, and the negative one still has to be paid in full.',
        scene: [bars([bar('Gross', gross, 'muted'), bar('Net', net, 'accent'), bar('After margin', after, 'warn', true)], undefined, 62)],
      };
    },
  },
  {
    id: 'ex-saccr', conceptId: 'pfe-saccr', district: 'trading', title: 'Today plus tomorrow',
    prompt: 'SA-CCR adds how far exposure could grow (PFE) to what it is today (RC), then scales by 1.4.',
    controls: [slider('rc', 'Replacement cost (today)', 0, 20, 0.5, 'cr'), slider('pfe', 'Potential future exposure', 0, 20, 0.5, 'cr')],
    initial: { rc: 4, pfe: 6 },
    model(v) {
      const ead = 1.4 * (num(v, 'rc') + num(v, 'pfe'));
      return {
        readouts: [ro('RC + PFE', fmt(num(v, 'rc') + num(v, 'pfe'), 'cr')), ro('EAD = 1.4 × (RC + PFE)', fmt(ead, 'cr'), 'warn')],
        insight: 'Even a trade worth zero today carries PFE: the counterparty might default later, when the trade is worth a lot.',
        scene: [bars([bar('RC', num(v, 'rc'), 'accent'), bar('PFE', num(v, 'pfe'), 'muted'), bar('EAD', ead, 'warn', true)], undefined, 58)],
      };
    },
  },
  {
    id: 'ex-wwr', conceptId: 'wrong-way-risk', district: 'trading', title: 'Crossed arrows',
    prompt: 'In a stress, exposure rises. What if the counterparty weakens in that same stress?',
    controls: [slider('link', 'How much the counterparty suffers in the same stress', 0, 1, 0.1, 'pct')],
    initial: { link: 0 },
    model(v) {
      const pdCalm = 0.01;
      const expCalm = 5;
      const expStress = 15;
      const pdStress = pdCalm * (1 + 7 * num(v, 'link'));
      const elInd = pdCalm * 0.6 * ((expCalm + expStress) / 2);
      const elWwr = 0.6 * 0.5 * (pdCalm * expCalm + pdStress * expStress);
      return {
        readouts: [ro('Expected loss if independent', fmt(elInd, 'cr')), ro('Expected loss with wrong-way risk', fmt(elWwr, 'cr'), 'bad')],
        insight: num(v, 'link') > 0.3 ? 'Exposure peaks exactly when default is most likely: the loss is far larger than a model assuming independence would show.' : 'Low linkage: exposure and default move roughly independently.',
        scene: [bars([bar('Independent', elInd, 'muted'), bar('Wrong-way', elWwr, 'bad', true)], undefined, 0.4)],
      };
    },
  },
  {
    id: 'ex-cva', conceptId: 'cva', district: 'trading', title: 'The price tag',
    prompt: 'CVA prices the counterparty’s default risk into the trade. Widen their credit spread — no default needed for a loss.',
    controls: [slider('ee', 'Expected exposure', 1, 30, 1, 'cr'), slider('s', 'Counterparty credit spread (bps)', 20, 800, 20, 'int'), slider('t', 'Remaining life', 1, 10, 1, 'yrs')],
    initial: { ee: 10, s: 100, t: 5 },
    model(v) {
      const cva = (s: number) => num(v, 'ee') * (1 - Math.exp(-(s / 10000) * num(v, 't')));
      const now = cva(num(v, 's'));
      const base = cva(100);
      return {
        readouts: [ro('CVA', fmt(now, 'cr'), 'bad'), ro('Change vs 100 bps', `${now >= base ? '−' : '+'}${fmt(Math.abs(now - base), 'cr')} P&L`, now > base ? 'bad' : 'good')],
        insight: 'CVA ≈ expected exposure × the market-implied chance of default over the life. Spreads move daily, so CVA is a P&L risk — hence its own capital charge. (Simplified formula.)',
        scene: [bars([bar('CVA at 100 bps', base, 'muted'), bar('CVA now', now, 'bad', true)], undefined, cva(800) * 1.1)],
      };
    },
  },
  // ── District 12 · Storm Centre ─────────────────────────────────────────
  {
    id: 'ex-conc', conceptId: 'concentration', district: 'storm', title: 'One big slice',
    prompt: 'A ₹1,000 crore book and ₹100 crore of capital. Grow the largest borrower and see what one default does.',
    controls: [slider('top', 'Largest borrower’s share of the book', 0.01, 0.3, 0.01, 'pct'), slider('lgd', 'LGD', 0.2, 0.8, 0.05, 'pct')],
    initial: { top: 0.05, lgd: 0.45 },
    model(v) {
      const big = 1000 * num(v, 'top');
      const hit = big * num(v, 'lgd');
      return {
        readouts: [ro('Largest exposure', fmt(big, 'cr')), ro('Loss if it defaults', fmt(hit, 'cr'), 'bad'), ro('Share of capital lost', fmt(hit / 100, 'pct'), hit > 50 ? 'bad' : 'warn')],
        insight: hit > 50 ? 'One name can take out half the capital: this is why concentration limits and Pillar 2 add-ons exist.' : 'Diversified enough that one default is survivable.',
        scene: [gauge(hit / 100, 1.5, [{ to: 0.25, tone: 'good' }, { to: 0.5, tone: 'warn' }, { to: 1.5, tone: 'bad' }], 'Capital hit'), bars([bar('Largest', big, 'warn'), bar('Rest', 1000 - big, 'muted')], undefined, 1050)],
      };
    },
  },
  {
    id: 'ex-corr', conceptId: 'correlation', district: 'storm', title: 'The shared storm',
    prompt: '100 borrowers, 3% PD each. Each year the economy draws a shock that hits them all. Raise correlation and run years.',
    controls: [slider('rho', 'Correlation', 0, 0.5, 0.05, 'pct'), action('year', 'Run another year')],
    initial: { rho: 0.1, seed: 3 },
    act: (v, a) => (a === 'year' ? { ...v, seed: num(v, 'seed') + 1 } : v),
    model(v) {
      const pd = 0.03;
      const rho = num(v, 'rho');
      const u = ((num(v, 'seed') * 0.6180339887) % 1) * 0.998 + 0.001;
      const z = normInv(u);
      const pz = rho === 0 ? pd : normCdf((normInv(pd) - Math.sqrt(rho) * z) / Math.sqrt(1 - rho));
      const fallen = seededFallers(100, pz, num(v, 'seed') * 13 + Math.round(rho * 100));
      const bad = vasicekQuantile(0.99, pd, Math.max(rho, 0.001)) * 100;
      return {
        readouts: [ro('Economy this year', z < -1 ? 'Recession' : z > 1 ? 'Boom' : 'Normal', z < -1 ? 'bad' : z > 1 ? 'good' : undefined), ro('Defaults this year', String(fallen.length), 'bad'), ro('1-in-100-year defaults', bad.toFixed(0))],
        insight: rho >= 0.2 ? 'High correlation: most years are calm, but a bad year takes many borrowers at once. The average is still 3.' : 'Low correlation: defaults are scattered and close to 3 every year.',
        scene: [{ kind: 'crowd', total: 100, fallen }],
      };
    },
  },
  {
    id: 'ex-stress', conceptId: 'stress-testing', district: 'storm', title: 'The storm dial',
    prompt: 'Turn up the recession. PDs and LGDs rise, profits fall, RWA inflate. Does the CET1 ratio hold above the line?',
    controls: [slider('sev', 'Severity (GDP fall)', 0, 0.08, 0.005, 'pct')],
    initial: { sev: 0.03 },
    model(v) {
      const sev = num(v, 'sev');
      const cet1 = 120;
      const rwa = 1000;
      const loss = 1000 * 0.02 * (1 + sev * 60) * (0.45 + sev * 2) - 1000 * 0.02 * 0.45;
      const rwaS = rwa * (1 + sev * 3);
      const ratio = (cet1 - loss) / rwaS;
      return {
        readouts: [ro('Extra credit losses', fmt(loss, 'cr'), 'bad'), ro('Stressed RWA', fmt(rwaS, 'cr')), ro('Stressed CET1 ratio', fmt(ratio, 'pct'), ratio < 0.07 ? 'bad' : 'good')],
        insight: ratio < 0.045 ? 'The bank breaches its minimum in this scenario: it needs capital or a smaller risk appetite now, not after the storm.' : ratio < 0.07 ? 'It survives but falls into the buffer: dividends would be restricted.' : 'Resilient to this scenario. Reverse stress testing asks what scenario would break it. (Illustrative sensitivities.)',
        scene: [bars([bar('Today', (cet1 / rwa) * 100, 'good'), bar('Stressed', Math.max(0, ratio * 100), ratio < 0.07 ? 'bad' : 'accent', true)], [{ value: 4.5, label: 'minimum', tone: 'bad' }, { value: 7, label: '+ buffer', tone: 'warn' }], 14, 'CET1 ratio %')],
      };
    },
  },
  {
    id: 'ex-group', conceptId: 'connected-counterparties', district: 'storm', title: 'The hidden net',
    prompt: 'Three companies, ₹40 crore each. Reveal their links: one group means one limit.',
    controls: [toggle('own', 'A and B share an owner'), toggle('dep', 'C depends on A for most revenue'), slider('t1', 'Tier 1 capital', 200, 800, 50, 'cr')],
    initial: { own: 0, dep: 0, t1: 400 },
    model(v) {
      const n = 1 + (on(v, 'own') ? 1 : 0) + (on(v, 'dep') ? 1 : 0);
      const group = 40 * n;
      const limit = 0.25 * num(v, 't1');
      return {
        readouts: [ro('Largest connected group', fmt(group, 'cr'), group > limit ? 'bad' : 'good'), ro('Limit (25% of Tier 1)', fmt(limit, 'cr')), ro('Status', group > limit ? 'Breach' : 'Within limit', group > limit ? 'bad' : 'good')],
        insight: 'Control or economic dependence joins borrowers into one risk. Missing links in the data hide limit breaches.',
        scene: [chain([{ label: 'A', tone: 'accent', raised: true }, { label: 'B', tone: on(v, 'own') ? 'accent' : 'muted', raised: on(v, 'own') }, { label: 'C', tone: on(v, 'dep') ? 'accent' : 'muted', raised: on(v, 'dep') }]), bars([bar('Group', group, group > limit ? 'bad' : 'accent', true)], [{ value: limit, label: 'limit', tone: 'bad' }], 210)],
      };
    },
  },
  {
    id: 'ex-kpis', conceptId: 'portfolio-kpis', district: 'storm', title: 'The barometers',
    prompt: 'Three KPIs from the same book. Change the inputs and read each definition off its dial.',
    controls: [slider('gca', 'Total gross loans', 500, 3000, 100, 'cr'), slider('s3', 'Stage 3 gross loans', 0, 200, 5, 'cr'), slider('allow', 'Stage 3 allowance', 0, 150, 5, 'cr'), slider('chg', 'Annual impairment charge', 0, 90, 5, 'cr')],
    initial: { gca: 1500, s3: 60, allow: 30, chg: 30 },
    model(v) {
      const r = num(v, 's3') / num(v, 'gca');
      const cov = num(v, 's3') > 0 ? Math.min(num(v, 'allow') / num(v, 's3'), 1) : 0;
      const cor = num(v, 'chg') / num(v, 'gca');
      return {
        readouts: [ro('Stage 3 ratio', fmt(r, 'pct2')), ro('Stage 3 coverage', fmt(cov, 'pct')), ro('Cost of risk', `${(cor * 10000).toFixed(0)} bps`)],
        insight: 'Stage 3 ratio = Stage 3 ÷ total gross loans. Coverage = allowance ÷ Stage 3 loans. Cost of risk = charge ÷ average loans. Name them exactly — a Stage 3 ratio is not an NPA ratio.',
        scene: [gauge(r, 0.1, [{ to: 0.03, tone: 'good' }, { to: 0.06, tone: 'warn' }, { to: 0.1, tone: 'bad' }], 'Stage 3'), gauge(cov, 1, [{ to: 0.4, tone: 'bad' }, { to: 0.6, tone: 'warn' }, { to: 1, tone: 'good' }], 'Coverage'), gauge(cor, 0.05, [{ to: 0.01, tone: 'good' }, { to: 0.02, tone: 'warn' }, { to: 0.05, tone: 'bad' }], 'Cost of risk')],
      };
    },
  },
  // ── District 13 · The Port ─────────────────────────────────────────────
  {
    id: 'ex-sec', conceptId: 'securitisation', district: 'port', title: 'Loading the ship',
    prompt: 'Move ₹100 crore of loans into a vehicle and sell notes. Keep a slice yourself and see what really left.',
    controls: [slider('ret', 'Share the bank retains', 0, 1, 0.05, 'pct')],
    initial: { ret: 0.05 },
    model(v) {
      const ret = num(v, 'ret');
      return {
        readouts: [ro('Funding raised', fmt(100 * (1 - ret), 'cr'), 'good'), ro('Kept on our books', fmt(100 * ret, 'cr'))],
        insight: 'Securitisation turns loans into funding. Whether risk and capital also leave depends on which slice the bank keeps — the first-loss slice keeps most of the risk.',
        scene: [chain([{ label: 'Loans', tone: 'accent' }, { label: 'Vehicle', tone: 'muted', raised: true }, { label: 'Notes sold', tone: 'good' }]), bars([bar('Sold', 100 * (1 - ret), 'good'), bar('Kept', 100 * ret, 'warn')], undefined, 105)],
      };
    },
  },
  {
    id: 'ex-tranche', conceptId: 'tranching', district: 'port', title: 'The waterfall locks',
    prompt: 'Losses fill the bottom lock first. Raise pool losses and move the tranche boundaries.',
    controls: [slider('loss', 'Pool loss', 0, 0.4, 0.01, 'pct'), slider('a1', 'Equity / mezzanine boundary', 0.02, 0.1, 0.01, 'pct'), slider('a2', 'Mezzanine / senior boundary', 0.1, 0.3, 0.01, 'pct')],
    initial: { loss: 0.12, a1: 0.05, a2: 0.15 },
    model(v) {
      const L = num(v, 'loss');
      const a1 = num(v, 'a1');
      const a2 = Math.max(num(v, 'a2'), a1 + 0.01);
      const hit = (lo: number, hi: number) => clamp01((Math.min(L, hi) - lo) / (hi - lo));
      const eq = hit(0, a1);
      const mz = hit(a1, a2);
      const sr = hit(a2, 1);
      return {
        readouts: [ro('Equity lost', fmt(eq, 'pct'), eq > 0 ? 'bad' : undefined), ro('Mezzanine lost', fmt(mz, 'pct'), mz > 0 ? 'bad' : undefined), ro('Senior lost', fmt(sr, 'pct'), sr > 0 ? 'bad' : 'good')],
        insight: 'Attachment and detachment points decide who is hit. Thin junior tranches are wiped out by modest losses; the senior is untouched until losses pass its attachment point.',
        scene: [bars([
          { label: 'Equity', segs: [{ value: eq * 100, tone: 'bad' }, { value: (1 - eq) * 100, tone: 'muted' }] },
          { label: 'Mezzanine', segs: [{ value: mz * 100, tone: 'bad' }, { value: (1 - mz) * 100, tone: 'muted' }] },
          { label: 'Senior', segs: [{ value: sr * 100, tone: 'bad' }, { value: (1 - sr) * 100, tone: 'good' }] },
        ], undefined, 105, 'red = share of each tranche lost')],
      };
    },
  },
  {
    id: 'ex-srt', conceptId: 'risk-transfer', district: 'port', title: 'The gangway',
    prompt: 'Choose which tranches you sell. Accounting and capital ask different questions.',
    controls: [toggle('eq', 'Sell the equity (first-loss) tranche'), toggle('mz', 'Sell the mezzanine tranche'), toggle('sr', 'Sell the senior tranche')],
    initial: { eq: 0, mz: 1, sr: 1 },
    model(v) {
      const share = (on(v, 'eq') ? 0.6 : 0) + (on(v, 'mz') ? 0.3 : 0) + (on(v, 'sr') ? 0.1 : 0);
      const derec = on(v, 'sr') && on(v, 'mz') && on(v, 'eq');
      const srt = share >= 0.5;
      return {
        readouts: [ro('Risk transferred (illustrative)', fmt(share, 'pct')), ro('Accounting: loans off balance sheet', derec ? 'Likely' : 'Unlikely', derec ? 'good' : 'warn'), ro('Capital relief (SRT)', srt ? 'Plausible' : 'Unlikely', srt ? 'good' : 'bad')],
        insight: !on(v, 'eq') ? 'Keeping the first-loss tranche keeps most of the risk — capital relief is hard to justify even if most notes were sold.' : 'Two separate tests: derecognition for the balance sheet, significant risk transfer for capital. A deal can pass one and fail the other.',
        scene: [chain([{ label: 'Equity', tone: on(v, 'eq') ? 'good' : 'bad', raised: on(v, 'eq') }, { label: 'Mezzanine', tone: on(v, 'mz') ? 'good' : 'warn', raised: on(v, 'mz') }, { label: 'Senior', tone: on(v, 'sr') ? 'good' : 'muted', raised: on(v, 'sr') }]), gauge(share, 1, [{ to: 0.5, tone: 'warn' }, { to: 1, tone: 'good' }], 'Risk out')],
      };
    },
  },
  {
    id: 'ex-cds', conceptId: 'credit-protection', district: 'port', title: 'The lifebuoy',
    prompt: 'Buy protection on a borrower. You now lose only if both the borrower and the protection seller fail.',
    controls: [slider('pb', 'Borrower PD', 0.01, 0.2, 0.01, 'pct'), slider('ps', 'Protection seller PD', 0.002, 0.1, 0.002, 'pct'), slider('link', 'Seller linked to borrower', 0, 1, 0.1, 'pct'), toggle('mis', 'Protection ends before the loan')],
    initial: { pb: 0.05, ps: 0.01, link: 0, mis: 0 },
    model(v) {
      const pb = num(v, 'pb');
      const ps = num(v, 'ps');
      const joint = pb * ps + num(v, 'link') * (Math.min(pb, ps) - pb * ps);
      const eff = on(v, 'mis') ? joint + (pb - joint) * 0.4 : joint;
      return {
        readouts: [ro('Unprotected loss chance', fmt(pb, 'pct')), ro('With protection', fmt(eff, 'pct2'), 'good')],
        insight: on(v, 'mis') ? 'A maturity mismatch leaves the later years uncovered (illustratively 40% of the risk). Check maturity, currency and the reference obligation.' : 'Protection swaps borrower risk for seller risk. A seller linked to the borrower gives wrong-way protection.',
        scene: [bars([bar('No protection', pb * 100, 'bad'), bar('Protected', eff * 100, 'good', true)], undefined, 21, '% chance of loss')],
      };
    },
  },
];
