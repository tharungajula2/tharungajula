import type { Concept } from '../types';

// District 10 · Provision Vault — IFRS 9, CECL and provisioning.
export const vault: Concept[] = [
  {
    id: 'ifrs9-stages', district: 'vault', layer: 'F', verified: false, anchor: 'vault-doors', prerequisites: ['expected-loss'], links: ['sicr'],
    name: 'IFRS 9 stages',
    oneLiner: 'Stage 1: 12-month ECL. Stage 2: lifetime ECL. Stage 3: credit-impaired, lifetime ECL.',
    explanation:
      'Every loan starts in Stage 1 with a day-1 allowance — no loss event is needed. A significant increase in credit risk moves it to Stage 2 (lifetime ECL). Default moves it to Stage 3, where interest is recognised on the net amount.',
    whyItMatters: 'Stage rules are among the most-specified logic in any ECL engine.',
    misconception: '“Stage 2 means default.” Stage 2 is deterioration; Stage 3 is default.',
  },
  {
    id: 'sicr', district: 'vault', layer: 'F', verified: false, anchor: 'vault-door2', prerequisites: ['ifrs9-stages', 'dpd-delinquency'], links: ['early-warning'],
    name: 'Significant increase in credit risk (SICR)',
    oneLiner: 'Compare today’s default risk with the risk when the loan was first recognised.',
    explanation:
      'Quantitative: lifetime (or 12-month) PD has risen by more than a set relative threshold since origination.\nQualitative: watchlist, forbearance, covenant breach.\nBackstop: more than 30 days past due is presumed to be SICR (rebuttable).\n\nExits need the triggers to clear, often with a probation period.',
    whyItMatters: 'A BA writes these triggers as testable rules: thresholds, precedence, exits and the data behind each.',
    misconception: '“SICR is about today’s PD level.” It is about the change since origination.',
    sources: [{ label: 'IFRS 9, 5.5.3–5.5.11', asOf: '2026-09' }],
  },
  {
    id: 'ecl-measurement', district: 'vault', layer: 'F', verified: false, anchor: 'vault-tank', prerequisites: ['ifrs9-stages', 'lifetime-pd'], links: ['effective-interest-rate'],
    name: 'Measuring ECL',
    oneLiner: 'Unbiased, probability-weighted, discounted, and using reasonable forward-looking information.',
    explanation:
      'For each future period: marginal PD × LGD × EAD × discount factor (at the EIR), summed over 12 months (Stage 1) or the remaining life (Stage 2).\n\nThe estimate must be unbiased and probability-weighted across possible outcomes, reflect the time value of money, and use reasonable and supportable information about the future.',
    whyItMatters: 'Every term in the formula is a data feed and a design decision the BA documents.',
  },
  {
    id: 'forward-looking-scenarios', district: 'vault', layer: 'F', verified: false, anchor: 'vault-weather-vane', prerequisites: ['ecl-measurement'], links: ['pit-ttc'],
    name: 'Forward-looking scenarios and overlays',
    oneLiner: 'ECL is weighted across several economic scenarios, not taken from one forecast.',
    explanation:
      'Banks run a base, an upside and one or more downside scenarios, each with a probability weight.\n\nLosses rise faster in bad scenarios than they fall in good ones, so the weighted ECL is higher than the ECL of the base case alone. Management overlays capture risks the models miss — and must be justified and governed.',
    whyItMatters: 'Scenario weights and overlays are among the most scrutinised numbers in the audit of a bank’s provisions.',
  },
  {
    id: 'allowance-walk', district: 'vault', layer: 'F', verified: false, anchor: 'vault-ledger', prerequisites: ['ifrs9-stages'], links: ['lgd-realised'],
    name: 'The allowance walk',
    oneLiner: 'Opening allowance + P&L charge − write-offs = closing allowance.',
    explanation:
      'The allowance is a balance-sheet stock; the impairment charge is a P&L flow. Write-offs use up allowance without touching P&L again.\n\nThe walk (movement table) explains every change: new loans, stage transfers, model changes, write-offs.',
    whyItMatters: 'The movement table is a required disclosure and a favourite reconciliation for auditors and BAs.',
    misconception: '“The P&L charge equals the allowance.” The charge is the change in the stock, adjusted for write-offs.',
  },
  {
    id: 'cecl-vs-ifrs9', district: 'vault', layer: 'F', verified: false, anchor: 'vault-twin-keys', prerequisites: ['ifrs9-stages'], links: ['jurisdiction-rulebooks'],
    name: 'IFRS 9 vs CECL',
    oneLiner: 'IFRS 9 stages its losses; US CECL takes lifetime losses on every loan from day one.',
    explanation:
      'IFRS 9: 12-month ECL for Stage 1, lifetime for Stages 2 and 3.\nCECL (US GAAP): lifetime expected losses for all loans at origination; no stages.\n\nBoth are forward-looking; CECL front-loads more allowance at origination.',
    whyItMatters: 'Global banks run both; the BA must know which rulebook a requirement comes from.',
    embassy: { IN: 'Ind AS 109 (IFRS 9-based) applies to NBFCs; RBI’s ECL framework for banks is scheduled to start on 1 April 2027.', US: 'CECL under ASC 326.' },
  },
];
