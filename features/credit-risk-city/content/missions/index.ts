import type { MissionDef } from '../types';

// Break the Bank: make moves month by month to push the bank into a state. Each teaches one mechanism.
export const missions: MissionDef[] = [
  {
    id: 'stage2-no-miss',
    kind: 'break',
    title: 'Stage 2 without a missed payment',
    district: 'vault',
    brief:
      'An SME term loan is performing perfectly. Push it into Stage 2 within two months — but the borrower never misses a payment. Pick the moves that are real SICR triggers.',
    setup: {
      bank: { cet1: 40 },
      scenarioId: 'base',
      borrowers: [
        { id: 'b1', name: 'SME borrower', segment: 'sme', grade: 'G4', scripted: true },
        { id: 'bg', name: 'Rest of the book', segment: 'corporate', grade: 'G3', scripted: true },
      ],
      facilities: [
        { id: 'tl1', borrowerId: 'b1', kind: 'term', limit: 20, drawn: 20, rate: 0.105, ftp: 0.07, remainingMonths: 60 },
        { id: 'wc1', borrowerId: 'b1', kind: 'revolving', limit: 10, drawn: 5, rate: 0.11, ftp: 0.07, remainingMonths: 24 },
        { id: 'bg1', borrowerId: 'bg', kind: 'term', limit: 200, drawn: 200, rate: 0.095, ftp: 0.07, remainingMonths: 48 },
      ],
      collateral: [{ id: 'c1', borrowerId: 'b1', kind: 'Plant', value: 18, haircut: 0.3, allocation: { tl1: 1 } }],
    },
    goal: { kind: 'facilityStage', facilityId: 'tl1', stage: 2 },
    maxMonths: 2,
    moves: [
      { id: 'draw', label: 'Borrower draws ₹4 crore more on its line', event: { kind: 'draw', facilityId: 'wc1', amount: 4 } },
      { id: 'cvi', label: 'Collateral values fall 20%', event: { kind: 'collateralIndex', value: 0.8 } },
      { id: 'down1', label: 'Downgrade one notch (G4 → G5)', event: { kind: 'grade', borrowerId: 'b1', grade: 'G5' } },
      { id: 'watch', label: 'Put the borrower on the watchlist', event: { kind: 'watchlist', borrowerId: 'b1', on: true } },
    ],
    debrief:
      'SICR compares today’s risk with the risk at origination. A one-notch downgrade here doubles the PD (0.5% → 1%), which meets the 2× threshold; the watchlist is a qualitative trigger. A heavier line and weaker collateral raise the ECL, but they are not staging triggers — the loan stays in Stage 1 with a bigger 12-month allowance.',
    itemIds: ['vault-sicr-choice', 'vault-sicr-spot'],
  },
  {
    id: 'break-cet1',
    kind: 'break',
    title: 'Break the CET1 ratio',
    district: 'fortress',
    brief:
      'Push the bank’s CET1 ratio below 10.5% within two months. No single move is enough — and the bank earns interest every month, which rebuilds capital. Find the combination that hits hardest.',
    setup: {
      bank: { cet1: 20 },
      scenarioId: 'base',
      borrowers: [
        { id: 'corp', name: 'Large corporate', segment: 'corporate', grade: 'G4', scripted: true },
        { id: 'sme', name: 'Unsecured SME', segment: 'sme', grade: 'G5', scripted: true },
        { id: 'ret', name: 'Retail book', segment: 'retail', grade: 'G4', scripted: true },
      ],
      facilities: [
        { id: 'c1', borrowerId: 'corp', kind: 'term', limit: 60, drawn: 60, rate: 0.1, ftp: 0.07, remainingMonths: 48 },
        { id: 's1', borrowerId: 'sme', kind: 'term', limit: 5, drawn: 5, rate: 0.12, ftp: 0.07, remainingMonths: 36 },
        { id: 'r1', borrowerId: 'ret', kind: 'term', limit: 100, drawn: 100, rate: 0.14, ftp: 0.07, remainingMonths: 36 },
      ],
      collateral: [{ id: 'cc', borrowerId: 'corp', kind: 'Property', value: 70, haircut: 0.3, allocation: { c1: 1 } }],
    },
    goal: { kind: 'cet1RatioBelow', threshold: 0.105 },
    maxMonths: 2,
    moves: [
      { id: 'sme-utp', label: 'Unsecured SME: judged unlikely to pay', event: { kind: 'utp', borrowerId: 'sme', on: true } },
      { id: 'corp-down', label: 'Corporate downgraded two notches (G4 → G6)', event: { kind: 'grade', borrowerId: 'corp', grade: 'G6' } },
      { id: 'cvi', label: 'Property values fall 30%', event: { kind: 'collateralIndex', value: 0.7 } },
      { id: 'ret-down', label: 'Unsecured retail book downgraded two notches (G4 → G6)', event: { kind: 'grade', borrowerId: 'ret', grade: 'G6' } },
    ],
    debrief:
      'Capital falls through the P&L: every move that raises ECL cuts CET1, while monthly interest income rebuilds it. The unsecured losses do the damage — the SME default costs almost its whole balance, and the downgrade pushes the ₹100 crore unsecured retail book into Stage 2 lifetime ECL. The secured corporate barely moves the ratio: its property absorbs most of the loss, even after values fall. Note that total RWA falls at the SME’s default, because a defaulted exposure is measured net of its provision.',
    itemIds: ['fort-explain', 'fort-ratio-calc'],
  },
  {
    id: 'stage3-ratio',
    kind: 'break',
    title: 'Drive the Stage 3 ratio above 20%',
    district: 'storm',
    brief:
      'Push the bank’s Stage 3 ratio above 20% within four months. You cannot simply declare the big borrowers unlikely to pay — they have to miss payments.',
    setup: {
      bank: { cet1: 30 },
      scenarioId: 'base',
      borrowers: [
        { id: 'big', name: 'Large corporate', segment: 'corporate', grade: 'G4', scripted: true },
        { id: 'mid', name: 'Mid-sized SME', segment: 'sme', grade: 'G5', scripted: true },
        { id: 'ret', name: 'Retail book', segment: 'retail', grade: 'G4', scripted: true },
        { id: 'small', name: 'Small SME', segment: 'sme', grade: 'G5', scripted: true },
      ],
      facilities: [
        { id: 'big1', borrowerId: 'big', kind: 'term', limit: 40, drawn: 40, rate: 0.1, ftp: 0.07, remainingMonths: 60 },
        { id: 'mid1', borrowerId: 'mid', kind: 'term', limit: 15, drawn: 15, rate: 0.115, ftp: 0.07, remainingMonths: 48 },
        { id: 'mid2', borrowerId: 'mid', kind: 'revolving', limit: 10, drawn: 5, rate: 0.12, ftp: 0.07, remainingMonths: 24 },
        { id: 'ret1', borrowerId: 'ret', kind: 'term', limit: 70, drawn: 70, rate: 0.14, ftp: 0.07, remainingMonths: 36 },
        { id: 'small1', borrowerId: 'small', kind: 'term', limit: 8, drawn: 8, rate: 0.12, ftp: 0.07, remainingMonths: 36 },
      ],
      collateral: [],
    },
    goal: { kind: 'stage3RatioAbove', threshold: 0.2 },
    maxMonths: 4,
    moves: [
      { id: 'big-miss', label: 'Large corporate misses an instalment', event: { kind: 'payment', facilityId: 'big1', outcome: 'miss' }, maxUses: 4 },
      { id: 'mid-miss', label: 'Mid-sized SME misses a term-loan instalment', event: { kind: 'payment', facilityId: 'mid1', outcome: 'miss' }, maxUses: 4 },
      { id: 'small-utp', label: 'Small SME: judged unlikely to pay', event: { kind: 'utp', borrowerId: 'small', on: true } },
      { id: 'ret-down', label: 'Retail book downgraded two notches', event: { kind: 'grade', borrowerId: 'ret', grade: 'G6' } },
    ],
    debrief:
      'Default needs more than 90 days past due — four missed monthly instalments — or unlikeliness to pay. Downgrades never reach Stage 3. When the mid-sized SME defaults, its working-capital line goes to Stage 3 too, even though that line was paid: default is borrower-level.',
    itemIds: ['storm-kpi-calc', 'recovery-default-choice'],
  },
];
