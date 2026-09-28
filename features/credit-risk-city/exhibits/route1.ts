import { rules } from '../content/rules';
import { seededFallers } from './math';
import { action, bar, bars, chain, clamp01, fmt, gauge, num, on, ro, slider, toggle, type Exhibit, type Tone } from './types';

const dpdOf = (k: number) => (k === 0 ? 0 : 30 * k - 1);
const SIGNAL_NAMES: Record<string, string> = { bounce: 'Bounces', util: 'Maxed line', late: 'Late financials', sales: 'Sales falling', pledge: 'Share pledge', news: 'Bad news' };

/** Solve for the rate that discounts a bullet loan's cash flows to the net amount lent. */
function eirBullet(coupon: number, fee: number, years: number): number {
  const pv = (r: number) => {
    let s = 0;
    for (let t = 1; t <= years; t++) s += (coupon * 100) / Math.pow(1 + r, t);
    return s + 100 / Math.pow(1 + r, years);
  };
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (pv(mid) > 100 - fee) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

export const route1Exhibits: Exhibit[] = [
  // ── District 1 · The Mint ─────────────────────────────────────────────
  {
    id: 'ex-bs', conceptId: 'balance-sheet', district: 'mint', title: 'The balance-sheet scales',
    prompt: '₹100 crore of loans funded by deposits and a thin slice of equity. Add a loan loss and see which side gives.',
    controls: [slider('eq', 'Equity (of ₹100 cr assets)', 3, 15, 1, 'cr'), slider('loss', 'Loan loss', 0, 15, 0.5, 'cr')],
    initial: { eq: 8, loss: 0 },
    model(v) {
      const eq = num(v, 'eq');
      const loss = num(v, 'loss');
      const left = eq - loss;
      return {
        readouts: [ro('Deposits (still owed in full)', fmt(100 - eq, 'cr')), ro('Equity left', fmt(Math.max(0, left), 'cr'), left <= 0 ? 'bad' : 'accent'), ro('Status', left <= 0 ? 'Insolvent' : 'Solvent', left <= 0 ? 'bad' : 'good')],
        insight: left <= 0 ? 'The loss is bigger than equity: depositors are now exposed. This is why capital exists.' : `A ${fmt(loss / 100, 'pct')} loss on loans wipes out ${fmt(loss / eq, 'pct')} of equity. Thin equity makes small loan losses matter.`,
        scene: [bars([
          { label: 'Assets', segs: [{ value: 100 - loss, tone: 'good' }, { value: loss, tone: 'bad' }] },
          { label: 'Funding', segs: [{ value: 100 - eq, tone: 'muted' }, { value: Math.max(0, left), tone: 'accent' }, { value: Math.min(loss, eq), tone: 'bad' }] },
        ], undefined, 105, 'green = loans · grey = deposits · blue = equity · red = lost')],
      };
    },
  },
  {
    id: 'ex-nim', conceptId: 'net-interest-margin', district: 'mint', title: 'The margin waterfall',
    prompt: 'Per ₹100 of loans: interest in, interest out, costs, credit losses. See how little is left.',
    controls: [slider('lr', 'Loan rate', 0.06, 0.16, 0.005, 'pct'), slider('dr', 'Funding rate', 0.03, 0.09, 0.005, 'pct'), slider('op', 'Operating costs', 0, 0.03, 0.0025, 'pct'), slider('cl', 'Credit losses', 0, 0.04, 0.0025, 'pct')],
    initial: { lr: 0.11, dr: 0.065, op: 0.015, cl: 0.01 },
    model(v) {
      const ii = num(v, 'lr') * 100;
      const ie = num(v, 'dr') * 100;
      const nii = ii - ie;
      const op = num(v, 'op') * 100;
      const cl = num(v, 'cl') * 100;
      const profit = nii - op - cl;
      return {
        readouts: [ro('NIM', fmt(nii / 100, 'pct2'), 'accent'), ro('Profit before tax', fmt(profit / 100, 'pct2'), profit < 0 ? 'bad' : 'good'), ro('Losses as share of NII', fmt(cl / Math.max(nii, 0.01), 'pct'))],
        insight: profit < 0 ? 'Credit losses and costs have eaten the whole margin: the book loses money.' : `Credit losses take ${fmt(cl / Math.max(nii, 0.01), 'pct')} of the margin. That is why pricing must include expected loss.`,
        scene: [bars([
          bar('Interest in', ii, 'good'),
          { label: '− funding', base: nii, segs: [{ value: ie, tone: 'muted' }] },
          bar('NII', nii, 'accent', true),
          { label: '− costs', base: nii - op, segs: [{ value: op, tone: 'warn' }] },
          { label: '− losses', base: Math.max(0, profit), segs: [{ value: cl, tone: 'bad' }] },
          bar('Profit', profit, profit < 0 ? 'bad' : 'good'),
        ], undefined, 17)],
      };
    },
  },
  {
    id: 'ex-tv', conceptId: 'time-value', district: 'mint', title: 'The shrinking coin',
    prompt: '₹100 received later is worth less today. Raise the rate and stretch the wait.',
    controls: [slider('r', 'Discount rate', 0.02, 0.2, 0.01, 'pct'), slider('n', 'Years ahead', 1, 8, 1, 'yrs')],
    initial: { r: 0.1, n: 5 },
    model(v) {
      const r = num(v, 'r');
      const n = num(v, 'n');
      const pv = (t: number) => 100 / Math.pow(1 + r, t);
      return {
        readouts: [ro('₹100 in 1 year is worth', fmt(pv(1), 'cr')), ro(`₹100 in ${n} years is worth`, fmt(pv(n), 'cr'), 'accent')],
        insight: `At ${fmt(r, 'pct')}, waiting ${n} years costs ${fmt(100 - pv(n), 'cr')} of every ₹100. Slow recoveries are real losses.`,
        scene: [bars([bar('Now', 100, 'ink'), ...Array.from({ length: n }, (_, i) => bar(`Y${i + 1}`, pv(i + 1), i + 1 === n ? 'accent' : 'muted', i + 1 === n))], undefined, 105)],
      };
    },
  },
  {
    id: 'ex-eir', conceptId: 'effective-interest-rate', district: 'mint', title: 'The fee lens',
    prompt: 'A 5-year bullet loan of ₹100 at a fixed coupon. Charge an upfront fee and watch the effective rate rise above the coupon.',
    controls: [slider('c', 'Coupon', 0.05, 0.15, 0.005, 'pct'), slider('fee', 'Upfront fee', 0, 5, 0.25, 'cr'), slider('n', 'Term', 1, 10, 1, 'yrs')],
    initial: { c: 0.1, fee: 2, n: 5 },
    model(v) {
      const c = num(v, 'c');
      const e = eirBullet(c, num(v, 'fee'), num(v, 'n'));
      return {
        readouts: [ro('Coupon', fmt(c, 'pct2')), ro('Effective interest rate', fmt(e, 'pct2'), 'accent'), ro('Cash actually lent', fmt(100 - num(v, 'fee'), 'cr'))],
        insight: num(v, 'fee') === 0 ? 'No fee: the EIR equals the coupon.' : `The fee is income spread over the life: EIR ${fmt(e, 'pct2')} vs coupon ${fmt(c, 'pct2')}. Shorter terms spread it over fewer years, so the gap widens.`,
        scene: [gauge(e, 0.2, [{ to: c, tone: 'muted' }, { to: 0.2, tone: 'accent' }], 'EIR'), bars([bar('Coupon', c * 100, 'muted'), bar('EIR', e * 100, 'accent', true)], undefined, 20)],
      };
    },
  },
  // ── District 2 · Market Quarter ────────────────────────────────────────
  {
    id: 'ex-obligor', conceptId: 'obligor-facility', district: 'market', title: 'The nesting boxes',
    prompt: 'One borrower, several facilities. Default one facility and see what happens to the others.',
    controls: [slider('n', 'Facilities', 1, 4, 1, 'int'), toggle('def', 'One facility goes 90+ days past due')],
    initial: { n: 3, def: 0 },
    model(v) {
      const n = num(v, 'n');
      const d = on(v, 'def');
      const t: Tone = d ? 'bad' : 'good';
      return {
        readouts: [ro('Facilities in default', d ? `${n} of ${n}` : '0', d ? 'bad' : 'good')],
        insight: d ? 'Default is judged at obligor level: every facility of this borrower is now defaulted, even the ones still being paid.' : 'Group → obligor → facilities. Flip the switch to default just one facility.',
        scene: [chain([{ label: 'Group', tone: 'muted' }, { label: 'Obligor', tone: d ? 'bad' : 'accent', raised: true }, ...Array.from({ length: n }, (_, i) => ({ label: `Facility ${i + 1}`, tone: t }))])],
      };
    },
  },
  {
    id: 'ex-funded', conceptId: 'funded-unfunded', district: 'market', title: 'Funded and unfunded',
    prompt: 'A customer with a term loan, an unused line and a bank guarantee. Convert the unfunded parts into exposure.',
    controls: [slider('tl', 'Term loan (drawn)', 0, 50, 5, 'cr'), slider('und', 'Undrawn line', 0, 50, 5, 'cr'), slider('bg', 'Bank guarantee issued', 0, 50, 5, 'cr'), slider('ccf', 'Conversion factor', 0, 1, 0.1, 'pct')],
    initial: { tl: 30, und: 20, bg: 15, ccf: 0.4 },
    model(v) {
      const funded = num(v, 'tl');
      const unf = num(v, 'und') + num(v, 'bg');
      const exp = funded + num(v, 'ccf') * unf;
      return {
        readouts: [ro('Funded', fmt(funded, 'cr')), ro('Unfunded', fmt(unf, 'cr')), ro('Exposure', fmt(exp, 'cr'), 'warn')],
        insight: 'Unfunded does not mean riskless: undrawn lines get drawn and guarantees get called. The CCF turns promises into exposure.',
        scene: [bars([
          { label: 'Raw', segs: [{ value: funded, tone: 'accent' }, { value: unf, tone: 'muted' }] },
          { label: 'Exposure', segs: [{ value: funded, tone: 'accent' }, { value: num(v, 'ccf') * unf, tone: 'warn' }], highlight: true },
        ], undefined, 150)],
      };
    },
  },
  {
    id: 'ex-segments', conceptId: 'segments', district: 'market', title: 'The three lanes',
    prompt: 'Slide the loan size and watch which machinery takes it.',
    controls: [slider('size', 'Loan size (₹ crore, log scale 0–4)', 0, 4, 0.1, 'x')],
    initial: { size: 1.3 },
    model(v) {
      const amt = Math.pow(10, num(v, 'size')) / 100;
      const seg = amt < 1 ? 0 : amt < 50 ? 1 : 2;
      const names = ['Retail', 'SME', 'Corporate'];
      const route = ['Policy rules + scorecard, pooled', 'Credit officer analyses and rates', 'Full analysis, rating, committee'];
      return {
        readouts: [ro('Loan size', `₹${amt < 1 ? (amt * 100).toFixed(0) + ' lakh' : amt.toFixed(1) + ' crore'}`), ro('Segment', names[seg], 'accent'), ro('Decided by', route[seg])],
        insight: 'Thresholds are illustrative; every bank sets its own. The segment decides the model, the approval route and the regulatory exposure class.',
        scene: [chain(names.map((n, i) => ({ label: n, tone: i === seg ? 'accent' : 'muted', raised: i === seg })))],
      };
    },
  },
  {
    id: 'ex-amort', conceptId: 'amortising-revolving', district: 'market', title: 'Two repayment shapes',
    prompt: 'A ₹60 crore term loan and a ₹60 crore revolving line over 12 quarters. Add stress to see the revolver fill up.',
    controls: [toggle('rev', 'Show the revolving line'), toggle('stress', 'Borrower in trouble from quarter 7')],
    initial: { rev: 0, stress: 0 },
    model(v) {
      const rev = on(v, 'rev');
      const qs = Array.from({ length: 12 }, (_, i) => i + 1);
      const bal = (q: number) => (rev ? Math.min(60, 30 + (on(v, 'stress') && q >= 7 ? (q - 6) * 6 : 0)) : 60 * (1 - q / 12));
      return {
        readouts: [ro('Facility', rev ? 'Revolving line' : 'Amortising term loan'), ro('Balance at quarter 12', fmt(bal(12), 'cr'), 'accent')],
        insight: rev ? (on(v, 'stress') ? 'The revolver fills up exactly as the borrower weakens — exposure grows into default. That is what CCFs capture.' : 'The revolver hovers around its usage; exposure does not shrink on its own.') : 'The term loan pays down on schedule: exposure shrinks every quarter.',
        scene: [bars(qs.map((q) => bar(`Q${q}`, bal(q), rev ? 'warn' : 'accent')), [{ value: 60, label: 'limit', tone: 'ink' }], 65)],
      };
    },
  },
  // ── District 3 · The Branch ────────────────────────────────────────────
  {
    id: 'ex-5cs', conceptId: 'five-cs', district: 'branch', title: 'The five-finger check',
    prompt: 'Score the applicant on each C from 1 (weak) to 5 (strong). Capacity is the one that repays.',
    controls: ['character', 'capacity', 'capital', 'collateral', 'conditions'].map((c) => slider(c, c[0].toUpperCase() + c.slice(1), 1, 5, 1, 'int')),
    initial: { character: 4, capacity: 3, capital: 3, collateral: 5, conditions: 3 },
    model(v) {
      const keys = ['character', 'capacity', 'capital', 'collateral', 'conditions'];
      const weakest = keys.reduce((a, b) => (num(v, b) < num(v, a) ? b : a));
      const cap = num(v, 'capacity');
      return {
        readouts: [ro('Weakest C', weakest, num(v, weakest) <= 2 ? 'bad' : undefined), ro('View', cap <= 2 ? 'Decline or restructure' : cap === 3 ? 'Approve with conditions' : 'Approve', cap <= 2 ? 'bad' : 'good')],
        insight: cap <= 2 && num(v, 'collateral') >= 4 ? 'Strong collateral cannot fix weak capacity: you would be lending in order to foreclose.' : 'All five matter, but capacity decides whether the loan is repaid from cash rather than collateral.',
        scene: [bars(keys.map((k) => bar(k[0].toUpperCase() + k.slice(1, 4), num(v, k), num(v, k) <= 2 ? 'bad' : num(v, k) === 3 ? 'warn' : 'good', k === 'capacity')), undefined, 5.5)],
      };
    },
  },
  {
    id: 'ex-dscr', conceptId: 'repayment-capacity', district: 'branch', title: 'The DSCR gauge',
    prompt: 'Cash available against interest plus principal. Find the point where the needle crosses 1.0.',
    controls: [slider('cash', 'Cash available for debt service', 2, 20, 0.5, 'cr'), slider('int', 'Interest due', 0, 8, 0.25, 'cr'), slider('prin', 'Principal due', 0, 10, 0.25, 'cr')],
    initial: { cash: 9, int: 3, prin: 4.5 },
    model(v) {
      const ds = num(v, 'int') + num(v, 'prin');
      const d = ds > 0 ? num(v, 'cash') / ds : 5;
      return {
        readouts: [ro('Debt service', fmt(ds, 'cr')), ro('DSCR', fmt(d, 'x'), d < 1 ? 'bad' : d < 1.2 ? 'warn' : 'good')],
        insight: d < 1 ? 'Below 1.0: operating cash cannot meet this year’s interest and principal.' : d < 1.2 ? 'Covered, but with little cushion — below most policy minimums.' : 'A comfortable cushion. Note that principal counts, not just interest.',
        scene: [gauge(d, 3, [{ to: 1, tone: 'bad' }, { to: 1.2, tone: 'warn' }, { to: 3, tone: 'good' }], 'DSCR'), bars([bar('Cash', num(v, 'cash'), 'good'), { label: 'Debt service', segs: [{ value: num(v, 'int'), tone: 'warn' }, { value: num(v, 'prin'), tone: 'bad' }] }], undefined, 20)],
      };
    },
  },
  {
    id: 'ex-ratios', conceptId: 'financial-ratios', district: 'branch', title: 'Three ratio dials',
    prompt: 'Leverage, interest cover, liquidity. Change the financials and read all three dials.',
    controls: [slider('debt', 'Total debt', 0, 60, 1, 'cr'), slider('ebitda', 'EBITDA', 1, 20, 0.5, 'cr'), slider('int', 'Interest expense', 0.5, 8, 0.25, 'cr'), slider('ca', 'Current assets', 5, 40, 1, 'cr'), slider('cl', 'Current liabilities', 5, 40, 1, 'cr')],
    initial: { debt: 30, ebitda: 7.5, int: 3, ca: 18, cl: 12 },
    model(v) {
      const lev = num(v, 'debt') / num(v, 'ebitda');
      const cov = num(v, 'ebitda') / num(v, 'int');
      const cr = num(v, 'ca') / num(v, 'cl');
      return {
        readouts: [ro('Debt ÷ EBITDA', fmt(lev, 'x'), lev > 4 ? 'bad' : 'good'), ro('Interest cover', fmt(cov, 'x'), cov < 2 ? 'bad' : 'good'), ro('Current ratio', fmt(cr, 'x'), cr < 1 ? 'bad' : 'good')],
        insight: 'How much debt, how easily is interest covered, can short-term bills be paid. Every policy states exactly what counts as debt and EBITDA.',
        scene: [gauge(lev, 8, [{ to: 3, tone: 'good' }, { to: 4.5, tone: 'warn' }, { to: 8, tone: 'bad' }], 'Leverage'), gauge(cov, 8, [{ to: 1.5, tone: 'bad' }, { to: 3, tone: 'warn' }, { to: 8, tone: 'good' }], 'Cover'), gauge(cr, 3, [{ to: 1, tone: 'bad' }, { to: 1.3, tone: 'warn' }, { to: 3, tone: 'good' }], 'Liquidity')],
      };
    },
  },
  {
    id: 'ex-decision', conceptId: 'credit-decision', district: 'branch', title: 'The decision line',
    prompt: 'Policy rules first, then the score, then who may sign. Try a great score with a policy knock-out.',
    controls: [toggle('ko', 'Fails a hard policy rule'), slider('score', 'Score', 400, 800, 10, 'int'), slider('amt', 'Amount', 1, 200, 1, 'cr')],
    initial: { ko: 0, score: 640, amt: 25 },
    model(v) {
      const ko = on(v, 'ko');
      const sc = num(v, 'score');
      const amt = num(v, 'amt');
      const decision = ko ? 'Decline (policy)' : sc < 560 ? 'Decline (score)' : sc < 620 ? 'Refer' : 'Approve';
      const who = amt <= 10 ? 'Branch manager' : amt <= 75 ? 'Regional credit head' : 'Credit committee';
      return {
        readouts: [ro('Decision', decision, decision.startsWith('Approve') ? 'good' : decision === 'Refer' ? 'warn' : 'bad'), ro('Approver', ko ? '—' : who)],
        insight: ko ? 'A hard knock-out ends it before the score is even read. No score can override policy automatically.' : `Score ${sc}: ${decision}. At ₹${amt} crore the authority matrix routes it to the ${who.toLowerCase()} (illustrative limits).`,
        scene: [chain([
          { label: 'Policy', tone: ko ? 'bad' : 'good', raised: ko },
          { label: 'Score', tone: ko ? 'muted' : sc < 560 ? 'bad' : sc < 620 ? 'warn' : 'good' },
          { label: 'Authority', tone: ko ? 'muted' : 'accent' },
          { label: decision.split(' ')[0], tone: decision.startsWith('Approve') ? 'good' : decision === 'Refer' ? 'warn' : 'bad', raised: true },
        ], ko ? 0 : undefined)],
      };
    },
  },
  {
    id: 'ex-cov', conceptId: 'covenants', district: 'branch', title: 'The covenant fence',
    prompt: 'Leverage is tested every quarter against a covenant. Set how fast the borrower deteriorates and where the fence sits.',
    controls: [slider('drift', 'Leverage drift per quarter', 0, 0.4, 0.05, 'x'), slider('cap', 'Covenant: maximum debt ÷ EBITDA', 3, 5, 0.25, 'x')],
    initial: { drift: 0.2, cap: 4 },
    model(v) {
      const lev = (q: number) => 3 + num(v, 'drift') * (q - 1);
      const qs = Array.from({ length: 8 }, (_, i) => i + 1);
      const first = qs.find((q) => lev(q) > num(v, 'cap'));
      return {
        readouts: [ro('First breach', first ? `Quarter ${first}` : 'none in 8 quarters', first ? 'bad' : 'good')],
        insight: first ? `Breach in quarter ${first}: the bank gains rights (waive, reprice, tighten, demand repayment) long before a payment is missed. That is the point of covenants.` : 'Within the fence. Tighten the covenant or speed up the drift.',
        scene: [bars(qs.map((q) => bar(`Q${q}`, lev(q), lev(q) > num(v, 'cap') ? 'bad' : 'accent', q === first)), [{ value: num(v, 'cap'), label: 'covenant', tone: 'bad' }], 6.5)],
      };
    },
  },
  {
    id: 'ex-pricing', conceptId: 'risk-based-pricing', district: 'branch', title: 'The price tower',
    prompt: 'Stack the rate: funding, expected loss, capital charge, costs, margin. Make the borrower riskier.',
    controls: [slider('ftp', 'Funding (FTP)', 0.05, 0.09, 0.0025, 'pct'), slider('pd', 'PD', 0.002, 0.06, 0.002, 'pct'), slider('lgd', 'LGD', 0.2, 0.8, 0.05, 'pct'), slider('rw', 'Risk weight', 0.35, 1.5, 0.05, 'pct'), slider('m', 'Margin', 0, 0.02, 0.001, 'pct')],
    initial: { ftp: 0.07, pd: 0.01, lgd: 0.45, rw: 0.85, m: 0.008 },
    model(v) {
      const el = num(v, 'pd') * num(v, 'lgd');
      const cap = num(v, 'rw') * rules.cet1Target.value * rules.hurdleRate.value;
      const opex = rules.opexRate.value;
      const rate = num(v, 'ftp') + el + cap + opex + num(v, 'm');
      return {
        readouts: [ro('Expected loss', fmt(el, 'pct2')), ro('Capital charge', fmt(cap, 'pct2')), ro('Rate', fmt(rate, 'pct2'), 'accent')],
        insight: 'A riskier borrower pays twice: more expected loss, and more capital that must earn the hurdle return.',
        scene: [bars([{ label: 'Rate build-up', segs: [{ value: num(v, 'ftp'), tone: 'muted' }, { value: el, tone: 'bad' }, { value: cap, tone: 'warn' }, { value: opex, tone: 'ink' }, { value: num(v, 'm'), tone: 'good' }], highlight: true }], undefined, 0.2, 'funding · EL · capital · costs · margin')],
      };
    },
  },
  // ── District 4 · The Registry ──────────────────────────────────────────
  {
    id: 'ex-haircut', conceptId: 'collateral-haircut', district: 'registry', title: 'The valuation scissors',
    prompt: 'Market value, then the fall before sale, then the haircut. What is left is what you can count on.',
    controls: [slider('val', 'Market value', 10, 100, 5, 'cr'), slider('fall', 'Value fall before sale', 0, 0.5, 0.05, 'pct'), slider('hc', 'Haircut', 0, 0.6, 0.05, 'pct')],
    initial: { val: 50, fall: 0.1, hc: 0.3 },
    model(v) {
      const mv = num(v, 'val');
      const after = mv * (1 - num(v, 'fall'));
      const rec = after * (1 - num(v, 'hc'));
      return {
        readouts: [ro('After the fall', fmt(after, 'cr')), ro('Recoverable', fmt(rec, 'cr'), 'good'), ro('Cut away', fmt(mv - rec, 'cr'), 'bad')],
        insight: `Of ₹${mv} crore on paper, ₹${rec.toFixed(1)} crore is recoverable. Collateral lowers LGD — it never lowers the chance of default.`,
        scene: [bars([bar('Market', mv, 'ink'), bar('After fall', after, 'warn'), bar('Recoverable', rec, 'good', true)], undefined, 105)],
      };
    },
  },
  {
    id: 'ex-ltv', conceptId: 'ltv', district: 'registry', title: 'The LTV see-saw',
    prompt: 'A home loan against a home. Drop house prices and watch the cushion disappear.',
    controls: [slider('loan', 'Loan', 10, 90, 5, 'cr'), slider('val', 'Value at origination', 20, 120, 5, 'cr'), slider('chg', 'Price change since', -0.4, 0.3, 0.05, 'pct')],
    initial: { loan: 40, val: 50, chg: 0 },
    model(v) {
      const cur = num(v, 'val') * (1 + num(v, 'chg'));
      const o = num(v, 'loan') / num(v, 'val');
      const c = num(v, 'loan') / cur;
      return {
        readouts: [ro('LTV at origination', fmt(o, 'pct')), ro('Current LTV', fmt(c, 'pct'), c > 1 ? 'bad' : c > 0.8 ? 'warn' : 'good'), ro('Cushion', fmt(Math.max(0, cur - num(v, 'loan')), 'cr'))],
        insight: c > 1 ? 'Negative equity: the home is worth less than the loan. Default now means a loss even before costs.' : 'LTV is a policy limit at origination; the current, indexed LTV is what LGD models watch.',
        scene: [gauge(c, 1.5, [{ to: 0.8, tone: 'good' }, { to: 1, tone: 'warn' }, { to: 1.5, tone: 'bad' }], 'Current LTV'), bars([bar('Loan', num(v, 'loan'), 'accent'), bar('Home today', cur, 'good')], undefined, 160)],
      };
    },
  },
  {
    id: 'ex-guar', conceptId: 'guarantees', district: 'registry', title: 'Two ropes',
    prompt: 'The bank loses only if the borrower AND the guarantor both fail. Tie their fates together and see.',
    controls: [slider('pb', 'Borrower PD', 0.01, 0.2, 0.01, 'pct'), slider('pg', 'Guarantor PD', 0.005, 0.2, 0.005, 'pct'), slider('link', 'How linked are they?', 0, 1, 0.1, 'pct')],
    initial: { pb: 0.05, pg: 0.02, link: 0 },
    model(v) {
      const pb = num(v, 'pb');
      const pg = num(v, 'pg');
      const joint = pb * pg + num(v, 'link') * (Math.min(pb, pg) - pb * pg);
      return {
        readouts: [ro('Borrower fails', fmt(pb, 'pct')), ro('Both fail (bank loses)', fmt(joint, 'pct2'), 'bad'), ro('Protection', fmt(1 - joint / pb, 'pct'), 'good')],
        insight: num(v, 'link') >= 0.7 ? 'Tightly linked — like a promoter guaranteeing their own company. Both fail in the same storm; the guarantee protects little.' : 'An independent, strong guarantor cuts the chance of loss sharply. (Linkage here is an illustrative interpolation.)',
        scene: [bars([bar('Borrower fails', pb * 100, 'warn'), bar('Both fail', joint * 100, 'bad', true)], undefined, 21, '% chance')],
      };
    },
  },
  {
    id: 'ex-rank', conceptId: 'perfection-charge', district: 'registry', title: 'The ranking queue',
    prompt: 'A factory is sold. Two lenders claim it. Register your charge — or forget to — and change your rank.',
    controls: [slider('sale', 'Sale proceeds', 10, 100, 5, 'cr'), slider('other', 'Other lender’s claim', 0, 80, 5, 'cr'), toggle('reg', 'Our charge is registered'), toggle('first', 'We hold the first charge')],
    initial: { sale: 60, other: 40, reg: 1, first: 1 },
    model(v) {
      const sale = num(v, 'sale');
      const ours = 50;
      const claim = num(v, 'other');
      // The queue: a registered first charge is paid first; an unregistered charge ranks with unsecured creditors.
      const weFirst = on(v, 'reg') && on(v, 'first');
      const us0 = weFirst ? Math.min(ours, sale) : 0;
      const them = Math.min(claim, sale - us0);
      const left = sale - us0 - them;
      const us = weFirst ? us0 : on(v, 'reg') ? Math.min(ours, left) : Math.min(ours, left) * 0.2;
      return {
        readouts: [ro('Our claim', fmt(ours, 'cr')), ro('We recover', fmt(us, 'cr'), us >= ours ? 'good' : 'bad'), ro('Rank', !on(v, 'reg') ? 'Unsecured (not perfected)' : on(v, 'first') ? 'First charge' : 'Second charge')],
        insight: !on(v, 'reg') ? 'Unregistered: we queue with unsecured creditors and share what is left (illustratively 20%). The paperwork is the protection.' : on(v, 'first') ? 'First charge: paid before anyone else from the sale.' : 'Second charge: we are paid only from what is left after the first.',
        scene: [bars([bar('Sale', sale, 'ink'), bar('Other lender', them, 'muted'), bar('Us', us, us >= ours ? 'good' : 'bad', true)], undefined, 105)],
      };
    },
  },
  // ── District 5 · The Watchtower ────────────────────────────────────────
  {
    id: 'ex-dpd', conceptId: 'dpd-delinquency', district: 'watchtower', title: 'The DPD clock',
    prompt: 'Each button is one month. Try paying only this month’s instalment after missing one — the clock does not reset.',
    controls: [action('pay1', 'Pay one instalment'), action('miss', 'Pay nothing'), action('payAll', 'Pay everything owed'), action('reset', 'Start over')],
    initial: { k: 0, m: 0 },
    act(v, a) {
      if (a === 'reset') return { k: 0, m: 0 };
      const k = num(v, 'k');
      const next = a === 'miss' ? Math.min(k + 1, 5) : a === 'payAll' ? 0 : k;
      return { k: next, m: num(v, 'm') + 1 };
    },
    model(v) {
      const k = num(v, 'k');
      const dpd = dpdOf(k);
      const buckets = ['Current', '1–30', '31–60', '61–90', '90+'];
      const b = Math.min(k, 4);
      return {
        readouts: [ro('Month', String(num(v, 'm'))), ro('Unpaid instalments', String(k)), ro('Days past due', fmt(dpd, 'dpd'), k >= 4 ? 'bad' : k >= 2 ? 'warn' : undefined)],
        insight: k === 0 ? 'Current. Miss one, then pay one each month: the oldest stays unpaid, so you stay about 30 days late.' : k >= 4 ? 'More than 90 days past due: default.' : 'Payments go to the oldest dues first. Paying one instalment a month never catches up — only paying everything owed resets the clock.',
        scene: [gauge(Math.min(dpd, 120), 120, [{ to: 30, tone: 'good' }, { to: 90, tone: 'warn' }, { to: 120, tone: 'bad' }], 'DPD'), chain(buckets.map((l, i) => ({ label: l, tone: i === b ? (i >= 4 ? 'bad' : i >= 2 ? 'warn' : 'accent') : 'muted', raised: i === b })))],
      };
    },
  },
  {
    id: 'ex-ews', conceptId: 'early-warning', district: 'watchtower', title: 'The warning board',
    prompt: 'Light up the signals you see. Enough of them, and the borrower goes on the watchlist — before any payment is missed.',
    controls: [toggle('bounce', 'Cheques bouncing'), toggle('util', 'Line used to the limit'), toggle('late', 'Financials late'), toggle('sales', 'Sales falling'), toggle('pledge', 'Promoter pledged shares'), toggle('news', 'Adverse news')],
    initial: { bounce: 0, util: 1, late: 0, sales: 0, pledge: 0, news: 0 },
    model(v) {
      const w = { bounce: 3, util: 2, late: 1, sales: 2, pledge: 2, news: 1 } as Record<string, number>;
      const score = Object.keys(w).reduce((s, k) => s + (on(v, k) ? w[k] : 0), 0);
      const watch = score >= 4;
      return {
        readouts: [ro('Warning score', `${score} / 11`), ro('Watchlist', watch ? 'Yes' : 'No', watch ? 'bad' : 'good')],
        insight: watch ? 'On the watchlist: closer review, and a qualitative SICR trigger for Stage 2 — while payments are still current.' : 'Below the threshold (illustrative weights). Each signal needs a data source and an owner.',
        scene: [gauge(score, 11, [{ to: 4, tone: 'good' }, { to: 7, tone: 'warn' }, { to: 11, tone: 'bad' }], 'Score'), chain(Object.keys(w).map((k) => ({ label: SIGNAL_NAMES[k], tone: on(v, k) ? 'bad' : 'muted', raised: on(v, k) })))],
      };
    },
  },
  {
    id: 'ex-roll', conceptId: 'roll-rates', district: 'watchtower', title: 'The roll staircase',
    prompt: '₹100 crore enters 1–30 days past due. Set how much rolls down each step.',
    controls: [slider('r1', 'Roll 1–30 → 31–60', 0.05, 0.8, 0.05, 'pct'), slider('r2', 'Roll 31–60 → 61–90', 0.1, 0.9, 0.05, 'pct'), slider('r3', 'Roll 61–90 → default', 0.2, 0.95, 0.05, 'pct')],
    initial: { r1: 0.25, r2: 0.45, r3: 0.65 },
    model(v) {
      const b2 = 100 * num(v, 'r1');
      const b3 = b2 * num(v, 'r2');
      const d = b3 * num(v, 'r3');
      return {
        readouts: [ro('Reaches default', fmt(d, 'cr'), 'bad'), ro('Loss rate from 1–30', fmt(d / 100, 'pct'))],
        insight: 'Each step multiplies: small improvements in early collections cut losses a lot. Vintage curves compare these flows for loans booked in different months.',
        scene: [bars([bar('1–30', 100, 'accent'), bar('31–60', b2, 'warn'), bar('61–90', b3, 'warn'), bar('Default', d, 'bad', true)], undefined, 105)],
      };
    },
  },
  {
    id: 'ex-review', conceptId: 'annual-review', district: 'watchtower', title: 'The review calendar',
    prompt: 'How stale is the bank’s view of this borrower? Slide the months since the last review.',
    controls: [slider('mo', 'Months since last review', 0, 24, 1, 'int'), toggle('fin', 'New financials received'), toggle('val', 'Collateral revalued')],
    initial: { mo: 8, fin: 1, val: 0 },
    model(v) {
      const mo = num(v, 'mo');
      const overdue = mo > 12;
      const fresh = (on(v, 'fin') ? 1 : 0) + (on(v, 'val') ? 1 : 0);
      return {
        readouts: [ro('Review', overdue ? `Overdue by ${mo - 12} months` : `Due in ${12 - mo} months`, overdue ? 'bad' : 'good'), ro('Fresh inputs', `${fresh} of 2`)],
        insight: overdue ? 'An overdue review means the rating, covenants and collateral value are all stale — a control failure reported to management.' : 'Reviews refresh the rating, covenants, collateral value and the limit.',
        scene: [gauge(mo, 24, [{ to: 12, tone: 'good' }, { to: 15, tone: 'warn' }, { to: 24, tone: 'bad' }], 'Months'), chain([{ label: 'Financials', tone: on(v, 'fin') ? 'good' : 'warn' }, { label: 'Rating', tone: overdue ? 'bad' : 'good' }, { label: 'Collateral', tone: on(v, 'val') ? 'good' : 'warn' }])],
      };
    },
  },
  // ── District 6 · Recovery Docks ────────────────────────────────────────
  {
    id: 'ex-default', conceptId: 'default-definition', district: 'recovery', title: 'The default gate',
    prompt: 'Two ways through the gate: days past due, or unlikeliness to pay. Try an insolvency filing at 40 days.',
    controls: [slider('dpd', 'Days past due', 0, 150, 1, 'dpd'), toggle('insolv', 'Insolvency filing'), toggle('distress', 'Distressed restructuring')],
    initial: { dpd: 40, insolv: 0, distress: 0 },
    model(v) {
      const dpd = num(v, 'dpd') > 90;
      const utp = on(v, 'insolv') || on(v, 'distress');
      const d = dpd || utp;
      return {
        readouts: [ro('> 90 days past due', dpd ? 'Yes' : 'No', dpd ? 'bad' : undefined), ro('Unlikely to pay', utp ? 'Yes' : 'No', utp ? 'bad' : undefined), ro('Default', d ? 'YES' : 'no', d ? 'bad' : 'good')],
        insight: utp && !dpd ? 'Default without 90 days: unlikeliness to pay catches borrowers before the clock does.' : d ? 'In default: every facility of this borrower is now defaulted.' : 'Not in default yet.',
        scene: [gauge(num(v, 'dpd'), 150, [{ to: 90, tone: 'warn' }, { to: 150, tone: 'bad' }], 'DPD'), chain([{ label: '> 90 DPD', tone: dpd ? 'bad' : 'muted', raised: dpd }, { label: 'UTP', tone: utp ? 'bad' : 'muted', raised: utp }, { label: d ? 'DEFAULT' : 'Performing', tone: d ? 'bad' : 'good', raised: true }])],
      };
    },
  },
  {
    id: 'ex-cure', conceptId: 'collections-cure', district: 'recovery', title: 'The collections crowd',
    prompt: '100 borrowers just went 30 days late. Improve early and late collections and watch fewer fall to default.',
    controls: [slider('early', 'Early cure rate', 0, 0.9, 0.05, 'pct'), slider('late', 'Late cure rate', 0, 0.6, 0.05, 'pct'), action('again', 'Another cohort')],
    initial: { early: 0.5, late: 0.2, seed: 1 },
    act: (v, a) => (a === 'again' ? { ...v, seed: num(v, 'seed') + 1 } : v),
    model(v) {
      const pDefault = (1 - num(v, 'early')) * (1 - num(v, 'late')) * 0.8;
      const fallen = seededFallers(100, pDefault, num(v, 'seed') * 31 + 7);
      return {
        readouts: [ro('Expected to default', `${(pDefault * 100).toFixed(0)} of 100`), ro('This cohort', `${fallen.length} defaulted`, 'bad')],
        insight: 'Early contact cures most borrowers cheaply; every one cured early never reaches the recovery docks. A cure still needs probation before it counts as performing.',
        scene: [{ kind: 'crowd', total: 100, fallen }],
      };
    },
  },
  {
    id: 'ex-forb', conceptId: 'forbearance', district: 'recovery', title: 'The crutch',
    prompt: 'Two conditions make a change forbearance. Flip them and see how the loan must be flagged.',
    controls: [toggle('diff', 'Borrower in financial difficulty'), toggle('conc', 'Bank gives a concession'), slider('mo', 'Months performing since', 0, 24, 1, 'int')],
    initial: { diff: 1, conc: 1, mo: 3 },
    model(v) {
      const f = on(v, 'diff') && on(v, 'conc');
      const probation = num(v, 'mo') >= 12;
      return {
        readouts: [ro('Forbearance', f ? 'Yes — flag it' : 'No', f ? 'warn' : 'good'), ro('Flag can be removed', f ? (probation ? 'After review' : 'Not yet (probation)') : '—')],
        insight: f ? 'Difficulty plus concession = forbearance. It is flagged, can trigger Stage 2 or 3, and is not a cure. (Probation length is illustrative.)' : on(v, 'conc') ? 'A concession to a healthy borrower is a commercial renegotiation, not forbearance.' : 'No concession, no forbearance.',
        scene: [chain([{ label: 'Difficulty', tone: on(v, 'diff') ? 'bad' : 'muted', raised: on(v, 'diff') }, { label: 'Concession', tone: on(v, 'conc') ? 'warn' : 'muted', raised: on(v, 'conc') }, { label: f ? 'FORBORNE' : 'Not forborne', tone: f ? 'warn' : 'good', raised: true }]), gauge(num(v, 'mo'), 24, [{ to: 12, tone: 'warn' }, { to: 24, tone: 'good' }], 'Months')],
      };
    },
  },
  {
    id: 'ex-workout', conceptId: 'lgd-realised', district: 'recovery', title: 'The workout ledger',
    prompt: 'A ₹100 crore default. Recoveries come in over three years and cost money. Build the realised LGD.',
    controls: [slider('y1', 'Recovered in year 1', 0, 60, 5, 'cr'), slider('y2', 'Recovered in year 2', 0, 60, 5, 'cr'), slider('y3', 'Recovered in year 3', 0, 60, 5, 'cr'), slider('cost', 'Workout costs (year 1)', 0, 15, 1, 'cr'), slider('r', 'Discount rate', 0.05, 0.15, 0.01, 'pct')],
    initial: { y1: 20, y2: 30, y3: 10, cost: 5, r: 0.1 },
    model(v) {
      const r = num(v, 'r');
      const pv = [num(v, 'y1') - num(v, 'cost'), num(v, 'y2'), num(v, 'y3')].map((x, i) => x / Math.pow(1 + r, i + 1));
      const total = pv.reduce((s, x) => s + x, 0);
      const lgd = clamp01(1 - total / 100);
      const cash = num(v, 'y1') + num(v, 'y2') + num(v, 'y3') - num(v, 'cost');
      return {
        readouts: [ro('Cash recovered (net)', fmt(cash, 'cr')), ro('Present value', fmt(Math.max(0, total), 'cr'), 'good'), ro('Realised LGD', fmt(lgd, 'pct'), 'bad')],
        insight: `Cash says ${fmt(clamp01(1 - cash / 100), 'pct')} lost; discounted, it is ${fmt(lgd, 'pct')}. The written-off remainder stays legally owed — later recoveries are income.`,
        scene: [bars([bar('Owed', 100, 'ink'), ...pv.map((x, i) => bar(`PV Y${i + 1}`, Math.max(0, x), 'good')), bar('Loss', lgd * 100, 'bad', true)], undefined, 105)],
      };
    },
  },
];

