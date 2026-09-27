import type { Concept } from '../types';

// District 14 · Reporting Tower — regulatory, financial and management reporting.
export const reporting: Concept[] = [
  {
    id: 'reporting-purpose', district: 'reporting', layer: 'F', verified: false, anchor: 'report-clock', prerequisites: [], links: ['reconciliation'],
    name: 'Three kinds of reporting',
    oneLiner: 'Financial statements, prudential returns and management information answer different questions.',
    explanation:
      'Financial reporting (accounting standards) tells investors about performance and position.\nPrudential reporting (regulator templates) tells supervisors about capital, exposures and asset quality.\nManagement information tells the bank’s own leaders what to act on.\n\nThe same loan can show different numbers in each because definitions, scope and timing differ.',
    whyItMatters: 'Explaining the differences — not forcing them to match — is core BA work.',
  },
  {
    id: 'regulatory-returns', district: 'reporting', layer: 'F', verified: false, anchor: 'report-templates', prerequisites: ['reporting-purpose'], links: ['data-quality'],
    name: 'Regulatory returns',
    oneLiner: 'Fixed templates, fixed definitions, fixed deadlines — and validation rules the regulator checks.',
    explanation:
      'Returns cover capital adequacy, large exposures, asset quality, liquidity and more. Each cell has a definition; templates carry validation rules (totals, cross-checks) that must pass before submission.\n\nLate or wrong returns are a regulatory breach in their own right.',
    whyItMatters: 'Every template cell needs a mapped source, a rule and an owner — the BA’s regulatory-reporting job.',
    embassy: { IN: 'Large credits (₹5 crore and above) are also reported to RBI’s CRILC, including SMA status.' },
  },
  {
    id: 'reconciliation', district: 'reporting', layer: 'F', verified: false, anchor: 'report-balance', prerequisites: ['reporting-purpose'], links: ['data-lineage'],
    name: 'Reconciliation to the ledger',
    oneLiner: 'Risk numbers must tie back to the general ledger, with every difference explained.',
    explanation:
      'Risk systems hold loan-level data; finance holds the general ledger. Reconciliation compares them, explains known differences (accrued interest, fees, timing, scope), and investigates the unexplained remainder against a tolerance.\n\nAn unexplained gap means one of the two numbers is wrong.',
    whyItMatters: 'Reconciliation rules and break reports are standard BA deliverables in any reporting change.',
  },
  {
    id: 'disclosures', district: 'reporting', layer: 'F', verified: false, anchor: 'report-window', prerequisites: ['reporting-purpose', 'allowance-walk'], links: ['three-pillars'],
    name: 'Public disclosures',
    oneLiner: 'Accounting and Pillar 3 disclosures show the market how credit risk is measured and moving.',
    explanation:
      'IFRS 7 requires credit-risk disclosures such as loans and allowances by stage and the allowance movement table. Pillar 3 requires standard templates on capital, RWA, asset quality and credit-risk mitigation.\n\nDisclosed figures must agree with the audited accounts and the regulatory returns.',
    whyItMatters: 'Disclosure tables are built from the same data as internal reports, so definitions must line up.',
  },
];
