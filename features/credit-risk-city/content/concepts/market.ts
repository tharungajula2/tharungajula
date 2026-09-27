import type { Concept } from '../types';

// District 2 · Market Quarter — borrowers, products and exposure structure.
export const market: Concept[] = [
  {
    id: 'obligor-facility', district: 'market', layer: 'F', verified: false, anchor: 'market-boxes', prerequisites: [], links: ['default-definition'],
    name: 'Obligor → facility → account',
    oneLiner: 'Who owes (obligor), under which agreement (facility), recorded where (account).',
    explanation:
      'One obligor can hold several facilities (a term loan, a working-capital line). One facility can be booked in several accounts or sub-limits.\n\nDefault is usually judged at obligor level, so trouble on one facility pulls the borrower’s other facilities in with it.',
    whyItMatters: 'Getting the grain wrong double-counts exposure or hides it — in limits, provisions and every regulatory return.',
  },
  {
    id: 'funded-unfunded', district: 'market', layer: 'F', verified: false, anchor: 'market-tap', prerequisites: ['obligor-facility'], links: [],
    name: 'Funded vs unfunded exposure',
    oneLiner: 'Drawn money is funded; undrawn limits, guarantees and letters of credit are unfunded — but still risky.',
    explanation:
      'A ₹10 crore line with ₹6 crore drawn has ₹4 crore undrawn. Borrowers in trouble tend to draw more, so part of the undrawn amount is converted into exposure with a credit conversion factor (CCF).\n\nGuarantees and letters of credit issued for a customer are unfunded today but can turn into loans if they are called.',
    whyItMatters: 'Limits, EAD and capital all treat the undrawn and off-balance-sheet parts differently — and each needs its own data field.',
    embassy: { IN: 'Indian banks call these fund-based and non-fund-based limits.' },
  },
  {
    id: 'segments', district: 'market', layer: 'F', verified: false, anchor: 'market-lanes', prerequisites: [], links: ['credit-decision'],
    name: 'Retail, SME and corporate segments',
    oneLiner: 'Retail, SME and corporate lending run on different machinery.',
    explanation:
      'Retail: many small, similar loans managed as pools, decided by scorecards and policy rules.\nCorporate: fewer, larger borrowers, each analysed and rated by credit officers.\nSME sits in between — often scored when small, rated when larger.\n\nThe segment decides the model, the approval route, the monitoring and the regulatory exposure class.',
    whyItMatters: 'Segment mapping is a key data rule: a misclassified SME gets the wrong model, risk weight and report line.',
  },
  {
    id: 'amortising-revolving', district: 'market', layer: 'F', verified: false, anchor: 'market-wheel', prerequisites: ['obligor-facility'], links: ['funded-unfunded'],
    name: 'Term loans vs revolving facilities',
    oneLiner: 'Term loans repay on a schedule; revolving lines can be drawn, repaid and drawn again up to a limit.',
    explanation:
      'Term loans amortise (equal instalments, like an EMI) or repay in one bullet at maturity.\nRevolving facilities (overdraft, cash credit, credit card) have a limit; utilisation = drawn ÷ limit.\n\nA revolving exposure can grow exactly when the borrower is getting weaker.',
    whyItMatters: 'Repayment schedules drive EAD, DPD and cash-flow projections; revolving behaviour drives CCFs.',
    misconception: '“The limit is the exposure.” Exposure is the drawn amount plus the part of the undrawn likely to be drawn.',
  },
];
