import type { Concept } from '../types';

// District 6 · Recovery Docks — distress, collections, recovery and write-off.
export const recovery: Concept[] = [
  {
    id: 'default-definition', district: 'recovery', layer: 'F', verified: false, anchor: 'recovery-gate', prerequisites: ['dpd-delinquency'], links: ['obligor-facility'],
    name: 'Default definition',
    oneLiner: 'Default = more than 90 days past due on a material amount, or judged unlikely to pay.',
    explanation:
      'Unlikeliness to pay (UTP) catches borrowers before 90 days: insolvency filings, distressed restructuring, selling the loan at a large credit loss.\n\nDefault is usually judged at obligor level, so every facility of that borrower becomes defaulted — including ones still being paid.',
    whyItMatters: 'One definition must feed accounting, capital and reporting consistently, and it drives the data used to build PD models.',
    embassy: { IN: 'Under RBI IRAC norms a loan becomes a non-performing asset (NPA) when interest or principal is overdue for more than 90 days.' },
  },
  {
    id: 'collections-cure', district: 'recovery', layer: 'F', verified: false, anchor: 'recovery-bridge', prerequisites: ['dpd-delinquency'], links: [],
    name: 'Collections and cure',
    oneLiner: 'Collections works to bring late borrowers back; a cure is a return to fully up to date.',
    explanation:
      'Early collections (reminders, calls) aim to cure quickly. Later stages escalate: field visits, restructuring talks, legal notices, enforcement.\n\nA cure means all arrears are cleared. Most frameworks also require a probation period of good behaviour before the borrower counts as fully performing again.',
    whyItMatters: 'Cure rules and probation periods are exact logic in staging and default systems.',
  },
  {
    id: 'forbearance', district: 'recovery', layer: 'F', verified: false, anchor: 'recovery-crutch', prerequisites: ['default-definition'], links: ['collections-cure'],
    name: 'Forbearance and restructuring',
    oneLiner: 'A concession given because the borrower is in financial difficulty — not a commercial renegotiation.',
    explanation:
      'Examples: extending the tenor, a repayment holiday, cutting the rate, capitalising arrears — when the borrower could not otherwise pay.\n\nForborne loans are flagged and tracked. A restructuring can hide arrears, so it is not a cure by itself.',
    whyItMatters: 'The forbearance flag changes staging, default and reporting; missing flags make a book look healthier than it is.',
    embassy: { IN: 'RBI prudential norms attach asset-classification consequences to restructuring of stressed accounts.' },
  },
  {
    id: 'lgd-realised', district: 'recovery', layer: 'F', verified: false, anchor: 'recovery-crane', prerequisites: ['default-definition', 'time-value'], links: ['collateral-haircut'],
    name: 'Realised loss and write-off',
    oneLiner: 'Loss = what was owed at default minus the present value of what came back, net of costs.',
    explanation:
      'Workout LGD = 1 − PV(recoveries − costs) ÷ exposure at default.\n\nA write-off removes the unrecoverable balance from the books, using the provision already held. It does not cancel the borrower’s legal debt, and later recoveries are booked as income.',
    whyItMatters: 'Realised losses are the evidence used to build and back-test LGD models.',
  },
];
