import type { Concept } from '../types';

// District 5 · The Watchtower — servicing, monitoring and early warning.
export const watchtower: Concept[] = [
  {
    id: 'dpd-delinquency', district: 'watchtower', layer: 'F', verified: false, anchor: 'watch-clock', prerequisites: ['obligor-facility'], links: ['default-definition'],
    name: 'Days past due and delinquency buckets',
    oneLiner: 'Days past due counts how late the oldest unpaid amount is.',
    explanation:
      'Buckets: current, 1–30, 31–60, 61–90 and 90+ days past due.\n\nPayments are usually applied to the oldest dues first, so paying only the latest instalment does not reduce DPD. More than 90 days past due is the common payment trigger for default.',
    whyItMatters: 'DPD logic drives staging, default and reporting — and payment-allocation bugs break all three at once.',
    embassy: { IN: 'RBI special mention categories: SMA-0 (1–30), SMA-1 (31–60), SMA-2 (61–90 days past due) before an account becomes an NPA.' },
  },
  {
    id: 'early-warning', district: 'watchtower', layer: 'F', verified: false, anchor: 'watch-board', prerequisites: ['dpd-delinquency'], links: ['covenants'],
    name: 'Early-warning signals',
    oneLiner: 'Signs of stress that show up before payments are missed.',
    explanation:
      'Payment signals: bounced cheques, late payments on other lenders’ loans.\nUsage signals: a line suddenly used to the limit.\nFinancial signals: falling sales, covenant breaches, late financial statements.\nExternal signals: rating downgrades, adverse news, promoter share pledges.\n\nStrong signals put the borrower on a watchlist for closer review.',
    whyItMatters: 'Watchlist flags feed staging rules, so each signal needs a data source, a threshold and an owner.',
  },
  {
    id: 'roll-rates', district: 'watchtower', layer: 'F', verified: false, anchor: 'watch-stairs', prerequisites: ['dpd-delinquency'], links: [],
    name: 'Roll rates and vintages',
    oneLiner: 'Track how balances move between buckets each month, and compare loans by the month they were booked.',
    explanation:
      'Roll rate: the share of a bucket that moves to the next, worse bucket a month later (for example 25% of 1–30 rolls to 31–60).\n\nVintage analysis groups loans by booking month and compares their losses at the same months on book, so a bad batch of originations shows up early.',
    whyItMatters: 'Collections planning, early loss estimates and origination feedback all run on these two views.',
  },
  {
    id: 'annual-review', district: 'watchtower', layer: 'F', verified: false, anchor: 'watch-calendar', prerequisites: ['early-warning'], links: ['credit-decision'],
    name: 'Periodic review and rating refresh',
    oneLiner: 'Every borrower is re-examined on a cycle: fresh financials, a fresh rating, a fresh look at the security.',
    explanation:
      'Commercial borrowers are typically reviewed at least annually: new financial statements, re-rating, covenant checks, collateral revaluation and limit renewal.\n\nA stale rating or overdue review means the bank is measuring risk with old information.',
    whyItMatters: 'Review-due dates, overdue-review reports and rating timestamps are standard BA requirements.',
  },
];
