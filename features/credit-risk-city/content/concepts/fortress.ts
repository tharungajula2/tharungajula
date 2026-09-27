import type { Concept } from '../types';

// District 11 · Capital Fortress — Basel capital and prudential rules.
export const fortress: Concept[] = [
  {
    id: 'provisions-vs-capital', district: 'fortress', layer: 'F', verified: false, anchor: 'fort-walls', prerequisites: ['expected-loss', 'balance-sheet'], links: ['unexpected-loss'],
    name: 'Provisions vs capital',
    oneLiner: 'Provisions cover expected loss; capital absorbs unexpected loss.',
    explanation:
      'Provisions (allowances) reduce the carrying value of loans for losses the bank expects. Capital is the equity buffer that absorbs losses beyond that.\n\nBoth are accounting and regulatory quantities, not piles of cash in a vault.',
    whyItMatters: 'Mixing the two is the most common conceptual error in credit reporting.',
  },
  {
    id: 'rwa-capital-ratio', district: 'fortress', layer: 'F', verified: false, anchor: 'fort-weights', prerequisites: ['provisions-vs-capital'], links: ['sa-vs-irb'],
    name: 'RWA and the capital ratio',
    oneLiner: 'Capital ratio = eligible capital ÷ risk-weighted assets.',
    explanation:
      'RWA = exposure × risk weight, summed across the book (plus market and operational risk).\n\nLosses reduce capital; riskier or defaulted exposures raise RWA. Both push the ratio down.',
    whyItMatters: 'Exposure class, CCF and risk-weight mappings are BA-owned rules behind every capital return.',
  },
  {
    id: 'capital-stack', district: 'fortress', layer: 'F', verified: false, anchor: 'fort-layers', prerequisites: ['rwa-capital-ratio'], links: [],
    name: 'The capital stack and minimums',
    oneLiner: 'CET1 absorbs losses first, then Additional Tier 1, then Tier 2.',
    explanation:
      'Basel III minimums as a share of RWA: CET1 4.5%, Tier 1 6%, total capital 8%. A capital conservation buffer of 2.5% of CET1 sits on top, plus any countercyclical and systemic buffers.\n\nDipping into buffers restricts dividends and bonuses before minimums are breached.',
    whyItMatters: 'Capital returns report each layer against its minimum and buffers.',
    embassy: { IN: 'RBI sets higher minimums: CET1 5.5%, Tier 1 7%, total capital (CRAR) 9%, plus the 2.5% conservation buffer.' },
  },
  {
    id: 'sa-vs-irb', district: 'fortress', layer: 'F', verified: false, anchor: 'fort-two-gates', prerequisites: ['rwa-capital-ratio', 'pd'], links: ['model-validation'],
    name: 'Standardised vs IRB',
    oneLiner: 'Standardised uses prescribed risk weights; IRB feeds the bank’s own estimates into a supervisory formula.',
    explanation:
      'Standardised approach: risk weights set by exposure class, external rating or loan characteristics (such as LTV).\nFoundation IRB: the bank estimates PD; supervisory LGD and EAD.\nAdvanced IRB: the bank estimates PD, LGD and EAD.\n\nUnder the final Basel III reforms, IRB RWA cannot fall below 72.5% of the standardised figure (the output floor).',
    whyItMatters: 'Which approach applies to which portfolio decides the data and models a capital engine needs.',
  },
  {
    id: 'leverage-ratio', district: 'fortress', layer: 'F', verified: false, anchor: 'fort-plumb-line', prerequisites: ['capital-stack'], links: [],
    name: 'Leverage ratio',
    oneLiner: 'Tier 1 capital ÷ total exposure, with no risk weights: a backstop against model error.',
    explanation:
      'The exposure measure includes on-balance-sheet assets, derivatives and off-balance-sheet items. Basel’s minimum is 3%.\n\nBecause it ignores risk weights, it catches banks whose risk-weighted ratios look strong only because the weights are low.',
    whyItMatters: 'A second capital constraint the bank must meet, with its own exposure definitions.',
    embassy: { IN: 'RBI requires 4% for domestic systemically important banks and 3.5% for other banks.' },
  },
  {
    id: 'three-pillars', district: 'fortress', layer: 'F', verified: false, anchor: 'fort-pillars', prerequisites: ['rwa-capital-ratio'], links: ['concentration'],
    name: 'The three pillars',
    oneLiner: 'Pillar 1 minimum capital, Pillar 2 supervisory review, Pillar 3 market disclosure.',
    explanation:
      'Pillar 1: formula capital for credit, market and operational risk.\nPillar 2: the bank’s own assessment (ICAAP) and the supervisor’s review, covering risks Pillar 1 misses, such as concentration and interest-rate risk in the banking book.\nPillar 3: public disclosure so markets can judge the bank.',
    whyItMatters: 'Each pillar has its own reports, owners and data requirements.',
  },
];
