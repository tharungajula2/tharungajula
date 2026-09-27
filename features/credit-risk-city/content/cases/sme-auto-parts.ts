import type { CaseDef } from '../types';

// PLACEHOLDER case: proves every mechanic (11 steps, every SimEvent kind). Numbers in ₹ crore.
export const smeAutoParts: CaseDef = {
  id: 'sme-auto-parts',
  title: 'The auto-parts maker',
  defaultSeed: 7,
  placeholder: true,
  setup: {
    bank: { cet1: 40 },
    scenarioId: 'base',
    borrowers: [
      { id: 'b1', name: 'Auto-parts maker (SME)', segment: 'sme', grade: 'G4', scripted: true },
      { id: 'bg1', name: 'Retail personal-loan pool', segment: 'retail', grade: 'G5' },
      { id: 'bg2', name: 'Corporate distributor', segment: 'corporate', grade: 'G3' },
    ],
    facilities: [
      { id: 'tl1', borrowerId: 'b1', kind: 'term', limit: 20, drawn: 20, rate: 0.105, ftp: 0.07, remainingMonths: 60 },
      { id: 'wc1', borrowerId: 'b1', kind: 'revolving', limit: 10, drawn: 6, rate: 0.11, ftp: 0.07, remainingMonths: 24 },
      { id: 'rp1', borrowerId: 'bg1', kind: 'term', limit: 150, drawn: 150, rate: 0.14, ftp: 0.07, remainingMonths: 36 },
      { id: 'cd1', borrowerId: 'bg2', kind: 'revolving', limit: 160, drawn: 120, rate: 0.095, ftp: 0.07, remainingMonths: 24 },
    ],
    collateral: [
      { id: 'c1', borrowerId: 'b1', kind: 'Plant and machinery', value: 15, haircut: 0.3, allocation: { tl1: 1 } },
      { id: 'c2', borrowerId: 'b1', kind: 'Receivables', value: 8, haircut: 0.4, allocation: { wc1: 1 } },
    ],
  },
  events: [
    { month: 2, kind: 'payment', facilityId: 'wc1', outcome: 'payAll' },
    { month: 3, kind: 'draw', facilityId: 'wc1', amount: 2 },
    { month: 6, kind: 'collateralIndex', value: 0.95 },
    { month: 8, kind: 'payment', facilityId: 'tl1', outcome: 'miss' },
    { month: 8, kind: 'grade', borrowerId: 'b1', grade: 'G6' },
    { month: 9, kind: 'payment', facilityId: 'tl1', outcome: 'miss' },
    { month: 9, kind: 'watchlist', borrowerId: 'b1', on: true },
    { month: 10, kind: 'payment', facilityId: 'tl1', outcome: 'miss' },
    { month: 11, kind: 'payment', facilityId: 'tl1', outcome: 'miss' },
    { month: 11, kind: 'utp', borrowerId: 'b1', on: true },
    { month: 12, kind: 'recoveryDue', facilityId: 'tl1', atMonth: 17 },
    { month: 12, kind: 'recoveryDue', facilityId: 'wc1', atMonth: 14 },
    { month: 12, kind: 'repay', facilityId: 'wc1', amount: 0.5 },
    { month: 13, kind: 'collateralIndex', value: 0.85 },
    { month: 19, kind: 'postWriteOffRecovery', facilityId: 'tl1', amount: 0.5 },
  ],
  steps: [
    { id: 's1', title: 'Apply', district: 'market', kind: 'act', brief: 'An auto-parts maker asks for a ₹20 crore term loan and a ₹10 crore working-capital line.', itemIds: ['case-apply-obligor'] },
    { id: 's2', title: 'Analyse', district: 'branch', kind: 'act', brief: 'Cash available for debt service is ₹6.0 crore a year; scheduled interest and principal are ₹4.8 crore.', itemIds: ['case-analyse-dscr'] },
    { id: 's3', title: 'Decide & structure', district: 'registry', kind: 'act', brief: 'Approve with plant and receivables as security. Price it.', itemIds: ['case-decide-price'] },
    { id: 's4', title: 'Book — Day 1', district: 'observatory', kind: 'predict', brief: 'The loans are booked today. Nothing has gone wrong yet.', itemIds: ['case-book-ecl'], advanceMonths: 0 },
    { id: 's5', title: 'Monitor', district: 'watchtower', kind: 'predict', brief: 'Seven months pass. The line is drawn further; collateral values dip 5%.', itemIds: ['case-monitor-stage'], advanceMonths: 7 },
    { id: 's6', title: 'Slip', district: 'vault', kind: 'predict', brief: 'Two term-loan instalments are missed and the borrower is downgraded two notches.', itemIds: ['case-slip-stage', 'case-slip-ecl'], advanceMonths: 2 },
    { id: 's7', title: 'Default', district: 'recovery', kind: 'predict', brief: 'Two more instalments are missed and the bank judges the borrower unlikely to pay. The working-capital line is still being serviced on time.', itemIds: ['case-default-wc', 'case-default-s3ratio'], advanceMonths: 2 },
    { id: 's8', title: 'Recover', district: 'registry', kind: 'predict', brief: 'Receivables are collected, then the plant is sold after values fall a further 10%.', itemIds: ['case-recover-writeoff'], advanceMonths: 6 },
    { id: 's9', title: 'Write-off & feedback', district: 'recovery', kind: 'reveal', brief: 'What was not recovered is written off; later, a little more comes in.', itemIds: ['case-writeoff-sequence'], advanceMonths: 2 },
    { id: 's10', title: 'Report', district: 'reporting', kind: 'explain', brief: 'Read the case through the bank’s reports.', itemIds: ['case-report-explain'] },
    { id: 's11', title: 'BA Job', district: 'studio', kind: 'baJob', brief: 'Turn one rule the case used into a requirement and a test.', itemIds: ['case-ba-stage2'] },
  ],
};
