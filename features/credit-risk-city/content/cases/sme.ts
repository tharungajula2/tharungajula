import type { CaseDef, CaseStep, Item, SimEvent, SimRules, SimSetup } from '../types';
import { nextRandom, seedToState } from '../../engine/sim/prng';
import { initSim, runMonths } from '../../engine/sim/step';
import { totalRwa } from '../../engine/sim/capital';
import type { SimState } from '../../engine/sim/types';

// The SME lifecycle case. Every seed builds a fresh borrower, simulates its whole life,
// and writes the numeric questions and answers from that simulation — so they are always right.

export const SME_CASE_ID = 'sme-lifecycle';
export const SME_DEFAULT_SEED = 2718;

const COMPANIES = ['Shakti', 'Kaveri', 'Vardhman', 'Suryodaya', 'Deccan', 'Ganga', 'Sahyadri', 'Narmada'];
const TRADES = [
  { name: 'Auto Components', sector: 'auto parts for car makers' },
  { name: 'Textiles', sector: 'cotton yarn and fabric' },
  { name: 'Food Processing', sector: 'packaged snacks and spices' },
  { name: 'Pharma Packaging', sector: 'blister packs for drug makers' },
  { name: 'Steel Fabricators', sector: 'structural steel for builders' },
  { name: 'Polymers', sector: 'moulded plastic parts' },
];
const CITIES = ['Pune', 'Coimbatore', 'Ludhiana', 'Rajkot', 'Hosur', 'Vapi', 'Nashik', 'Indore'];

const r1 = (x: number) => Math.round(x * 10) / 10;
const r2 = (x: number) => Math.round(x * 100) / 100;
const pct = (x: number, dp = 1) => `${(x * 100).toFixed(dp)}%`;

/** Advances per step (index = step order), shared by the generator and the case runner. */
const ADVANCE = [0, 0, 0, 0, 7, 2, 2, 6, 2, 0, 0];

export interface SmeParams {
  company: string;
  city: string;
  sector: string;
  grade: string;
  slipGrade: string;
  term: number;
  wcLimit: number;
  wcDrawn: number;
  draw: number;
  ftp: number;
  lgdStated: number;
  margin: number;
  rateTl: number;
  rateWc: number;
  debtService: number;
  cfads: number;
  ebitda: number;
  plant: number;
  receivables: number;
  cviDip: number;
  cviSale: number;
  postWriteOff: number;
}

export function smeParams(seed: number, rules: SimRules): SmeParams {
  let st = seedToState(seed * 7919 + 17);
  const r = () => {
    const [v, n] = nextRandom(st);
    st = n;
    return v;
  };
  const pick = <T,>(xs: T[]) => xs[Math.floor(r() * xs.length)];
  const trade = pick(TRADES);
  const gradeIdx = 2 + Math.floor(r() * 3); // G3..G5
  const grade = rules.gradeOrder[gradeIdx];
  const slipGrade = rules.gradeOrder[gradeIdx + 2];
  const term = 12 + Math.floor(r() * 19);
  const wcLimit = 6 + Math.floor(r() * 9);
  const wcDrawn = r1(wcLimit * (0.5 + r() * 0.2));
  const draw = r1(Math.min(wcLimit - wcDrawn - 0.1, wcLimit * (0.1 + r() * 0.1)));
  const ftp = 0.065 + 0.005 * Math.floor(r() * 3);
  const lgdStated = 0.35 + 0.05 * Math.floor(r() * 4);
  const margin = 0.005 + 0.001 * Math.floor(r() * 6);
  const pd = rules.gradePd[grade].value;
  const capitalCharge = rules.riskWeights.sme.value * rules.cet1Target.value * rules.hurdleRate.value;
  const rateTl = Math.round((ftp + pd * lgdStated + capitalCharge + rules.opexRate.value + margin) * 10000) / 10000;
  const rateWc = rateTl + 0.005;
  const debtService = r1(term * rateTl + term / 5 + wcDrawn * rateWc);
  const dscr = [1.15, 1.2, 1.25, 1.3, 1.35, 1.4, 1.5][Math.floor(r() * 7)];
  const cfads = r1(debtService * dscr);
  const ebitda = r1(cfads * 1.25);
  const plant = r1(term * (0.6 + r() * 0.3));
  const receivables = r1(wcLimit * (0.7 + r() * 0.3));
  return {
    company: `${pick(COMPANIES)} ${trade.name}`,
    city: pick(CITIES),
    sector: trade.sector,
    grade,
    slipGrade,
    term,
    wcLimit,
    wcDrawn,
    draw,
    ftp,
    lgdStated,
    margin,
    rateTl,
    rateWc,
    debtService,
    cfads,
    ebitda,
    plant,
    receivables,
    cviDip: r2(0.93 + r() * 0.04),
    cviSale: r2(0.8 + r() * 0.1),
    postWriteOff: r1(term * (0.02 + r() * 0.02)),
  };
}

function setupFor(p: SmeParams, rules: SimRules): SimSetup {
  const retail = Math.round(p.term * 6);
  const corpLimit = Math.round(p.term * 7);
  const corpDrawn = Math.round(p.term * 5.5);
  const base: SimSetup = {
    bank: { cet1: 0 },
    scenarioId: 'base',
    borrowers: [
      { id: 'b1', name: p.company, segment: 'sme', grade: p.grade, scripted: true },
      { id: 'bg1', name: 'Retail personal-loan book', segment: 'retail', grade: 'G5', scripted: true },
      { id: 'bg2', name: 'Corporate distributor', segment: 'corporate', grade: 'G3', scripted: true },
    ],
    facilities: [
      { id: 'tl1', borrowerId: 'b1', kind: 'term', limit: p.term, drawn: p.term, rate: p.rateTl, ftp: p.ftp, remainingMonths: 60 },
      { id: 'wc1', borrowerId: 'b1', kind: 'revolving', limit: p.wcLimit, drawn: p.wcDrawn, rate: p.rateWc, ftp: p.ftp, remainingMonths: 24 },
      { id: 'rp1', borrowerId: 'bg1', kind: 'term', limit: retail, drawn: retail, rate: 0.14, ftp: p.ftp, remainingMonths: 36 },
      { id: 'cd1', borrowerId: 'bg2', kind: 'revolving', limit: corpLimit, drawn: corpDrawn, rate: 0.095, ftp: p.ftp, remainingMonths: 24 },
    ],
    collateral: [
      { id: 'c1', borrowerId: 'b1', kind: 'Plant and machinery', value: p.plant, haircut: 0.3, allocation: { tl1: 1 } },
      { id: 'c2', borrowerId: 'b1', kind: 'Receivables', value: p.receivables, haircut: 0.4, allocation: { wc1: 1 } },
    ],
  };
  const s0 = initSim(base, 1, rules);
  const rwa = totalRwa(s0.facilities, s0.borrowers, rules);
  return { ...base, bank: { cet1: Math.round(rwa * 0.17 * 10) / 10 } };
}

function eventsFor(p: SmeParams): SimEvent[] {
  return [
    { month: 2, kind: 'payment', facilityId: 'wc1', outcome: 'payAll' },
    { month: 3, kind: 'draw', facilityId: 'wc1', amount: p.draw },
    { month: 6, kind: 'collateralIndex', value: p.cviDip },
    { month: 8, kind: 'payment', facilityId: 'tl1', outcome: 'miss' },
    { month: 8, kind: 'grade', borrowerId: 'b1', grade: p.slipGrade },
    { month: 9, kind: 'payment', facilityId: 'tl1', outcome: 'miss' },
    { month: 9, kind: 'watchlist', borrowerId: 'b1', on: true },
    { month: 10, kind: 'payment', facilityId: 'tl1', outcome: 'miss' },
    { month: 11, kind: 'payment', facilityId: 'tl1', outcome: 'miss' },
    { month: 11, kind: 'utp', borrowerId: 'b1', on: true },
    { month: 12, kind: 'recoveryDue', facilityId: 'tl1', atMonth: 17 },
    { month: 12, kind: 'recoveryDue', facilityId: 'wc1', atMonth: 14 },
    { month: 12, kind: 'repay', facilityId: 'wc1', amount: 0.5 },
    { month: 13, kind: 'collateralIndex', value: p.cviSale },
    { month: 19, kind: 'postWriteOffRecovery', facilityId: 'tl1', amount: p.postWriteOff },
  ];
}

const f = (s: SimState, id: string) => s.facilities.find((x) => x.id === id)!;

export interface SmeOutcomes {
  eclBeforeSlip: number;
  eclAfterSlip: number;
  slipBucket: number;
  stage3Ratio: number;
  sme3Gca: number;
  bookGca: number;
  allowanceAtDefault: number;
  writeOff: number;
  writeOffBucket: number;
  eadAtDefault: number;
  saleCash: number;
  rwaBeforeDefault: number;
  rwaAtDefault: number;
}

/** Run the full life once and read off the numbers the questions need. */
export function simulateSme(setup: SimSetup, events: SimEvent[], seed: number, rules: SimRules): { outcomes: SmeOutcomes; checkpoints: SimState[] } {
  const checkpoints: SimState[] = [];
  let s = initSim(setup, seed, rules);
  for (const adv of ADVANCE) {
    s = runMonths(s, adv, events, rules);
    checkpoints.push(s);
  }
  const atMonitor = checkpoints[4]; // month 7
  const atSlip = checkpoints[5]; // month 9
  const atDefault = checkpoints[6]; // month 11
  const atRecover = checkpoints[7]; // month 17
  const ratio = f(atSlip, 'tl1').allowance / f(atMonitor, 'tl1').allowance;
  const allowanceAtDefault = f(atDefault, 'tl1').allowance;
  const writeOff = f(atRecover, 'tl1').writtenOff;
  return {
    checkpoints,
    outcomes: {
      eclBeforeSlip: f(atMonitor, 'tl1').allowance,
      eclAfterSlip: f(atSlip, 'tl1').allowance,
      slipBucket: ratio < 2 ? 0 : ratio < 5 ? 1 : ratio < 15 ? 2 : 3,
      stage3Ratio: atDefault.kpis.stage3Ratio ?? 0,
      sme3Gca: f(atDefault, 'tl1').drawn + f(atDefault, 'wc1').drawn,
      bookGca: atDefault.kpis.totalGca,
      allowanceAtDefault,
      writeOff,
      writeOffBucket: writeOff < allowanceAtDefault * 0.95 ? 0 : writeOff <= allowanceAtDefault * 1.05 ? 1 : 2,
      eadAtDefault: f(atDefault, 'tl1').drawn,
      saleCash: atRecover.flows[17].recoveryCash,
      rwaBeforeDefault: atSlip.kpis.rwa,
      rwaAtDefault: atDefault.kpis.rwa,
    },
  };
}

const STEPS: Omit<CaseStep, 'advanceMonths'>[] = [
  { id: 's1', title: 'Apply', district: 'market', kind: 'act', brief: '', itemIds: ['case-apply-obligor', 'case-apply-segment', 'case-apply-ead'] },
  { id: 's2', title: 'Analyse', district: 'branch', kind: 'act', brief: '', itemIds: ['case-analyse-dscr', 'case-analyse-leverage'] },
  { id: 's3', title: 'Decide & structure', district: 'registry', kind: 'act', brief: '', itemIds: ['case-decide-price', 'case-decide-haircut', 'case-decide-covenant'] },
  { id: 's4', title: 'Book — Day 1', district: 'observatory', kind: 'predict', brief: '', itemIds: ['case-book-ecl', 'case-book-el', 'case-book-rwa'] },
  { id: 's5', title: 'Monitor', district: 'watchtower', kind: 'predict', brief: '', itemIds: ['case-monitor-stage'] },
  { id: 's6', title: 'Slip', district: 'vault', kind: 'predict', brief: '', itemIds: ['case-slip-stage', 'case-slip-ecl'] },
  { id: 's7', title: 'Default', district: 'recovery', kind: 'predict', brief: '', itemIds: ['case-default-wc', 'case-default-s3ratio'] },
  { id: 's8', title: 'Recover', district: 'registry', kind: 'predict', brief: '', itemIds: ['case-recover-writeoff', 'case-recover-lgd'] },
  { id: 's9', title: 'Write-off & feedback', district: 'recovery', kind: 'reveal', brief: '', itemIds: ['case-writeoff-sequence'] },
  { id: 's10', title: 'Report', district: 'reporting', kind: 'explain', brief: '', itemIds: ['case-report-rwa', 'case-report-explain'] },
  { id: 's11', title: 'BA Job', district: 'studio', kind: 'baJob', brief: '', itemIds: ['case-ba-stage2', 'case-ba-uat'] },
];

function briefs(p: SmeParams): string[] {
  const loc = `${p.company}, ${p.city}`;
  return [
    `${loc} makes ${p.sector}. It asks for a ₹${p.term} crore five-year term loan and a ₹${p.wcLimit} crore working-capital line, ₹${p.wcDrawn} crore drawn at the start.`,
    `Cash available for debt service is ₹${p.cfads} crore a year; scheduled interest and principal are ₹${p.debtService} crore. EBITDA is ₹${p.ebitda} crore.`,
    `Approve, secured on plant and machinery (valued ₹${p.plant} crore) and receivables (₹${p.receivables} crore). Price it.`,
    'The loans are booked today. Nothing has gone wrong yet.',
    `Seven months pass. The line is drawn a further ₹${p.draw} crore; collateral values dip ${Math.round((1 - p.cviDip) * 100)}%.`,
    `Two term-loan instalments are missed and the borrower is downgraded two notches (${p.grade} → ${p.slipGrade}).`,
    'Two more instalments are missed and the bank judges the borrower unlikely to pay. The working-capital line is still being serviced on time.',
    `Receivables are collected, then the plant is sold after values fall to ${Math.round(p.cviSale * 100)}% of the original.`,
    `What was not recovered is written off; later, ₹${p.postWriteOff} crore more comes in.`,
    'Read the case through the bank’s reports.',
    'Turn one rule the case used into a requirement and a test.',
  ];
}

function itemsFor(p: SmeParams, o: SmeOutcomes, rules: SimRules): Item[] {
  const pd = rules.gradePd[p.grade].value;
  const rw = rules.riskWeights.sme.value;
  const ccfAcc = rules.ccfAccounting.value;
  const ccfReg = rules.ccfRegulatory.value;
  const undrawn = r2(p.wcLimit - p.wcDrawn);
  const ead = r2(p.wcDrawn + ccfAcc * undrawn);
  const dscr = r2(p.cfads / p.debtService);
  const lev = r2((p.term + p.wcDrawn) / p.ebitda);
  const capitalCharge = rw * rules.cet1Target.value * rules.hurdleRate.value;
  const rateAns = r2((p.ftp + pd * p.lgdStated + capitalCharge + rules.opexRate.value + p.margin) * 100);
  const recoverable = r2(p.plant * 0.7);
  const el = Math.round(pd * p.lgdStated * p.term * 10000) / 10000;
  const rwa = r2((p.term + p.wcDrawn + ccfReg * undrawn) * rw);
  const eadD = r2(o.eadAtDefault);
  const cash = r2(o.saleCash);
  const lgdAns = r2((1 - cash / Math.pow(1 + p.rateTl, 0.5) / eadD) * 100);
  const rwaFell = o.rwaAtDefault < o.rwaBeforeDefault;
  const slipOpts = ['Less than 2 times', 'About 2–5 times', 'About 5–15 times', 'More than 15 times'];
  return [
    { id: 'case-apply-obligor', conceptIds: ['obligor-facility'], difficulty: 1, prompt: `${p.company} asks for a term loan and a working-capital line. How many obligors and facilities is that?`,
      payload: { type: 'choice', options: ['One obligor, one facility', 'One obligor, two facilities', 'Two obligors, two facilities', 'Two obligors, one facility'], answerIndex: 1 },
      explanation: 'One legal borrower (obligor) holding two separate agreements (facilities).' },
    { id: 'case-apply-segment', conceptIds: ['segments'], difficulty: 1, prompt: `A ₹${p.term + p.wcLimit} crore request from a mid-sized manufacturer. How is it most likely assessed?`,
      payload: { type: 'choice', options: ['Automatically by a retail scorecard', 'By a credit officer who analyses and rates it', 'By the regulator', 'By the collections team'], answerIndex: 1 },
      explanation: 'An SME of this size is analysed and rated individually, closer to corporate lending than retail.' },
    { id: 'case-apply-ead', conceptIds: ['funded-unfunded'], difficulty: 2, prompt: `The working-capital line is ₹${p.wcLimit} crore with ₹${p.wcDrawn} crore drawn. With a ${Math.round(ccfAcc * 100)}% conversion factor on the undrawn part, what is its exposure at default (₹ crore)?`,
      payload: { type: 'calculate', answer: ead, tolerance: { kind: 'abs', value: 0.02 }, unit: '₹ crore', worked: [`Undrawn = ${p.wcLimit} − ${p.wcDrawn} = ${undrawn}`, `EAD = ${p.wcDrawn} + ${ccfAcc} × ${undrawn}`, `= ${ead}`] },
      explanation: 'Drawn plus the share of the undrawn expected to be drawn by default.' },
    { id: 'case-analyse-dscr', conceptIds: ['repayment-capacity'], difficulty: 1, prompt: `Cash available for debt service ₹${p.cfads} crore; scheduled interest and principal ₹${p.debtService} crore. What is the DSCR?`,
      payload: { type: 'calculate', answer: dscr, tolerance: { kind: 'abs', value: 0.01 }, unit: '×', worked: ['DSCR = cash available ÷ debt service', `= ${p.cfads} ÷ ${p.debtService}`, `= ${dscr}`] },
      explanation: `Cash covers debt service ${dscr} times.` },
    { id: 'case-analyse-leverage', conceptIds: ['financial-ratios'], difficulty: 1, prompt: `After drawdown, total debt is the term loan (₹${p.term} crore) plus the drawn line (₹${p.wcDrawn} crore). EBITDA is ₹${p.ebitda} crore. What is debt ÷ EBITDA?`,
      payload: { type: 'calculate', answer: lev, tolerance: { kind: 'abs', value: 0.02 }, unit: '×', worked: [`Debt = ${p.term} + ${p.wcDrawn} = ${r2(p.term + p.wcDrawn)}`, `Leverage = ${r2(p.term + p.wcDrawn)} ÷ ${p.ebitda}`, `= ${lev}×`] },
      explanation: `About ${lev} years of EBITDA to repay the debt.` },
    { id: 'case-decide-price', conceptIds: ['risk-based-pricing'], difficulty: 3,
      prompt: `Price the term loan (annual %). FTP ${pct(p.ftp)}, PD ${pct(pd, 2)}, LGD ${pct(p.lgdStated, 0)}, SME risk weight ${Math.round(rw * 100)}%, target CET1 ${pct(rules.cet1Target.value, 0)}, hurdle ${pct(rules.hurdleRate.value, 0)}, opex ${pct(rules.opexRate.value, 0)}, margin ${pct(p.margin)}.`,
      payload: { type: 'calculate', answer: rateAns, tolerance: { kind: 'abs', value: 0.05 }, unit: '%', worked: [`Expected loss = ${pct(pd, 2)} × ${pct(p.lgdStated, 0)} = ${(pd * p.lgdStated * 100).toFixed(3)}%`, `Capital charge = ${Math.round(rw * 100)}% × 11% × 15% = ${(capitalCharge * 100).toFixed(4)}%`, `Rate = ${(p.ftp * 100).toFixed(1)} + ${(pd * p.lgdStated * 100).toFixed(3)} + ${(capitalCharge * 100).toFixed(4)} + 1 + ${(p.margin * 100).toFixed(1)}`, `= ${rateAns}%`] },
      explanation: 'Funding + expected loss + capital charge + opex + margin.' },
    { id: 'case-decide-haircut', conceptIds: ['collateral-haircut'], difficulty: 1, prompt: `The plant is valued at ₹${p.plant} crore with a 30% haircut. What is its recoverable value (₹ crore)?`,
      payload: { type: 'calculate', answer: recoverable, tolerance: { kind: 'abs', value: 0.02 }, unit: '₹ crore', worked: [`${p.plant} × (1 − 0.30)`, `= ${recoverable}`] },
      explanation: 'Market value cut for the risks of a forced sale.' },
    { id: 'case-decide-covenant', conceptIds: ['covenants'], difficulty: 2, prompt: 'Which covenant most directly protects the bank’s view of repayment capacity?',
      payload: { type: 'choice', options: ['Minimum DSCR, tested on each set of financials', 'The borrower keeps its head office in the same city', 'The borrower banks only with us', 'A maximum number of employees'], answerIndex: 0 },
      explanation: 'A DSCR covenant flags weakening capacity early and gives the bank rights to act.' },
    { id: 'case-book-ecl', conceptIds: ['ifrs9-stages'], difficulty: 1, prompt: 'The loans are booked today and nothing has gone wrong. What provision does the bank hold on the term loan?',
      payload: { type: 'predict', options: ['None — nothing has gone wrong yet', '12-month expected credit loss (Stage 1)', 'Lifetime expected credit loss', 'The full loan amount'], answerIndex: 1, bindTo: 'facility:tl1:stage' },
      explanation: 'IFRS 9 is forward-looking: a Stage 1 allowance and a P&L charge exist from day 1.' },
    { id: 'case-book-el', conceptIds: ['expected-loss'], difficulty: 2, prompt: `Rough one-year expected loss on the term loan: PD ${pct(pd, 2)}, LGD ${pct(p.lgdStated, 0)}, exposure ₹${p.term} crore (₹ crore, 4 decimals).`,
      payload: { type: 'calculate', answer: el, tolerance: { kind: 'abs', value: 0.002 }, unit: '₹ crore', worked: ['EL = PD × LGD × EAD', `= ${pd} × ${p.lgdStated} × ${p.term}`, `= ${el}`] },
      explanation: 'The simulation’s Stage 1 ECL is close to this, but amortisation, collateral and discounting move it.' },
    { id: 'case-book-rwa', conceptIds: ['rwa-capital-ratio'], difficulty: 2, prompt: `Standardised RWA for the SME: term loan ₹${p.term} crore, line drawn ₹${p.wcDrawn} crore with ₹${undrawn} crore undrawn at a ${Math.round(ccfReg * 100)}% CCF, all at an ${Math.round(rw * 100)}% risk weight (₹ crore).`,
      payload: { type: 'calculate', answer: rwa, tolerance: { kind: 'abs', value: 0.05 }, unit: '₹ crore', worked: [`Exposure = ${p.term} + ${p.wcDrawn} + ${ccfReg} × ${undrawn} = ${r2(p.term + p.wcDrawn + ccfReg * undrawn)}`, `RWA = × ${rw}`, `= ${rwa}`] },
      explanation: 'Exposure (with the regulatory CCF) times the risk weight.' },
    { id: 'case-monitor-stage', conceptIds: ['early-warning'], difficulty: 1,
      prompt: 'Seven months of on-time payments; the line is drawn harder and collateral values dip a little. Where is the term loan?',
      payload: { type: 'predict', options: ['Stage 1', 'Stage 2', 'Stage 3'], answerIndex: 0, bindTo: 'facility:tl1:stage' },
      explanation: 'No trigger has fired: payments are current, the rating is unchanged, and a small collateral dip changes LGD, not staging.' },
    { id: 'case-slip-stage', conceptIds: ['sicr'], difficulty: 2, prompt: 'Two instalments are missed and the borrower is downgraded two notches. Where does the term loan go?',
      payload: { type: 'predict', options: ['Stays in Stage 1', 'Stage 2', 'Stage 3'], answerIndex: 1, bindTo: 'facility:tl1:stage' },
      explanation: 'More than 30 days past due and a large PD increase are SICR triggers: Stage 2, but not yet default.' },
    { id: 'case-slip-ecl', conceptIds: ['sicr', 'lifetime-pd'], difficulty: 3, prompt: 'By how much does the term loan’s provision grow when it moves to Stage 2?',
      payload: { type: 'predict', options: slipOpts, answerIndex: o.slipBucket, bindTo: 'facility:tl1:ecl' },
      explanation: `Here it went from ₹${o.eclBeforeSlip.toFixed(3)} to ₹${o.eclAfterSlip.toFixed(3)} crore: a higher PD and a lifetime horizon instead of 12 months multiply together.` },
    { id: 'case-default-wc', conceptIds: ['default-definition'], difficulty: 2, prompt: 'The working-capital line is still paid on time. After the borrower defaults, what stage is that line in?',
      payload: { type: 'predict', options: ['Stage 1', 'Stage 2', 'Stage 3'], answerIndex: 2, bindTo: 'facility:wc1:stage' },
      explanation: 'Default is judged at obligor level, so every facility of the borrower becomes credit-impaired.' },
    { id: 'case-default-s3ratio', conceptIds: ['portfolio-kpis', 'default-definition'], difficulty: 3,
      prompt: `The SME’s two facilities total about ₹${Math.round(o.sme3Gca)} crore in a book of about ₹${Math.round(o.bookGca)} crore. Predict the bank’s Stage 3 ratio after the default, within 2 percentage points (as a decimal, e.g. 0.07).`,
      payload: { type: 'predict', numeric: { tolerance: { kind: 'abs', value: 0.02 }, unit: 'ratio' }, bindTo: 'kpi:stage3Ratio' },
      explanation: 'Both facilities move to Stage 3 together — including the one still being paid.' },
    { id: 'case-recover-writeoff', conceptIds: ['collateral-haircut', 'lgd-realised'], difficulty: 2,
      prompt: 'The plant is sold after values fall further. Compared with the Stage 3 allowance held at default, the term-loan write-off will be…',
      payload: { type: 'predict', options: ['Lower (by more than 5%)', 'About the same (within 5%)', 'Higher (by more than 5%)'], answerIndex: o.writeOffBucket, bindTo: 'facility:tl1:writtenOff' },
      explanation: `Allowance at default ₹${o.allowanceAtDefault.toFixed(2)} crore; write-off ₹${o.writeOff.toFixed(2)} crore. Weaker sale prices and interest that kept accruing both push the write-off up.` },
    { id: 'case-recover-lgd', conceptIds: ['lgd-realised', 'lgd'], difficulty: 3,
      prompt: `Term-loan exposure at default was ₹${eadD} crore. The plant sale brought ₹${cash} crore net, six months later. Discounting at the loan’s ${pct(p.rateTl, 2)} rate, what was the realised LGD (%)?`,
      payload: { type: 'calculate', answer: lgdAns, tolerance: { kind: 'abs', value: 0.5 }, unit: '%', worked: [`PV = ${cash} ÷ (1 + ${p.rateTl})^0.5 = ${r2(cash / Math.pow(1 + p.rateTl, 0.5))}`, `LGD = 1 − ${r2(cash / Math.pow(1 + p.rateTl, 0.5))} ÷ ${eadD}`, `= ${lgdAns}%`] },
      explanation: 'Time counts: the half-year wait makes the loss bigger than cash alone suggests.' },
    { id: 'case-writeoff-sequence', conceptIds: ['lgd-realised'], difficulty: 2, prompt: 'Order what happened to the term loan after default.',
      payload: { type: 'sequence', steps: ['Default: Stage 3 allowance set', 'Collateral sold', 'Unrecovered balance written off', 'Later recovery booked as income'] },
      explanation: 'Allowance first, then realisation, then write-off; post-write-off recoveries go to profit and loss.' },
    { id: 'case-report-rwa', conceptIds: ['rwa-capital-ratio', 'sa-vs-irb'], difficulty: 3,
      prompt: `At default the SME’s risk weight rose from 85% to the defaulted weight. What happened to the bank’s total RWA between month 9 and month 11?`,
      payload: { type: 'choice', options: ['It rose', 'It fell'], answerIndex: rwaFell ? 1 : 0 },
      explanation: `RWA went from ₹${o.rwaBeforeDefault.toFixed(1)} to ₹${o.rwaAtDefault.toFixed(1)} crore. Under the standardised approach a defaulted exposure is measured net of its specific provisions, so a large allowance can shrink RWA even though the risk weight rises. The capital ratio still fell, because the loss cut CET1.` },
    { id: 'case-report-explain', conceptIds: ['reporting-purpose', 'portfolio-kpis'], difficulty: 3, prompt: 'Using the case: explain what happened to the Stage 3 ratio and the CET1 ratio from default to write-off.',
      payload: { type: 'explain', modelAnswer: 'At default the Stage 3 ratio jumped and CET1 fell with the impairment charge. After recovery and write-off the loans left the book, so the Stage 3 ratio fell back, while CET1 kept the loss; later earnings and the post-write-off recovery rebuilt it.',
        keyPoints: [{ text: 'Stage 3 ratio jumps at default', essential: true }, { text: 'CET1 falls by the impairment charge', essential: true }, { text: 'Write-off removes loans, so the Stage 3 ratio falls', essential: true }, { text: 'Post-write-off recovery is income', essential: false }] },
      explanation: 'A falling Stage 3 ratio after write-offs is not an improvement in credit quality — read ratios with their movements.' },
    { id: 'case-ba-stage2', conceptIds: ['requirement-to-test'], difficulty: 3, prompt: 'Write the requirement for the Stage 2 trigger used in the case. Then self-check against the key points.',
      payload: { type: 'recall', modelAnswer: 'Move a facility to Stage 2 when it is not in default and any trigger is true: more than 30 days past due, current 12-month PD ≥ 2× origination PD, or watchlist. Exit to Stage 1 only after all triggers are false for 3 consecutive months. Data: DPD, current and origination PD, watchlist flag. Test: a facility at 31 DPD moves to Stage 2; at 2 clear months it stays in Stage 2; at 3 it returns to Stage 1.',
        keyPoints: [{ text: 'All three triggers with thresholds', essential: true }, { text: 'Excludes defaulted facilities', essential: false }, { text: 'Exit rule with probation', essential: true }, { text: 'Required data fields', essential: false }, { text: 'At least one boundary test', essential: true }] },
      explanation: 'Thresholds, precedence, exits, data and a boundary test — that is a testable requirement.' },
    { id: 'case-ba-uat', conceptIds: ['uat'], difficulty: 2, prompt: 'You are writing UAT for the case’s default rule (more than 90 DPD, or unlikely to pay). Which pair of test cases matters most?',
      payload: { type: 'choice', options: ['90 DPD stays performing; 91 DPD defaults', '0 DPD and 200 DPD', 'Two loans with the same balance', 'A loan with no collateral and one with collateral'], answerIndex: 0 },
      explanation: 'Boundary pairs catch off-by-one errors in the rule.' },
  ];
}

/** Build the whole case for a seed: definition + items with answers taken from its own simulation. */
export function buildSmeCase(seed: number, rules: SimRules): { def: CaseDef; items: Item[] } {
  const p = smeParams(seed, rules);
  const setup = setupFor(p, rules);
  const events = eventsFor(p);
  const { outcomes } = simulateSme(setup, events, seed, rules);
  const text = briefs(p);
  const def: CaseDef = {
    id: SME_CASE_ID,
    title: 'The SME lifecycle',
    subtitle: `${p.company}, ${p.city} — ${p.sector}, rated ${p.grade}`,
    defaultSeed: SME_DEFAULT_SEED,
    generator: 'sme-v1',
    setup,
    events,
    steps: STEPS.map((s, i) => ({ ...s, brief: text[i], ...(ADVANCE[i] || s.kind === 'predict' ? { advanceMonths: ADVANCE[i] } : {}) })),
  };
  return { def, items: itemsFor(p, outcomes, rules) };
}

