import type { Concept } from '../types';

// District 12 · Storm Centre — portfolio risk and stress testing.
export const storm: Concept[] = [
  {
    id: 'concentration', district: 'storm', layer: 'F', verified: false, anchor: 'storm-pie', prerequisites: [], links: ['connected-counterparties'],
    name: 'Concentration risk',
    oneLiner: 'Many loans exposed to the same driver can fail together.',
    explanation:
      'Concentration by name, group, sector, geography or collateral type defeats diversification: one shock hits many loans at once.\n\nIt is managed with limits, monitored in portfolio reports, and capitalised under Pillar 2 because Pillar 1 formulas assume a well-diversified book.',
    whyItMatters: 'Concentration limits need clean sector codes, group hierarchies and geography data.',
  },
  {
    id: 'correlation', district: 'storm', layer: 'F', verified: false, anchor: 'storm-chain', prerequisites: ['concentration', 'expected-loss'], links: ['unexpected-loss'],
    name: 'Default correlation and diversification',
    oneLiner: 'Diversification narrows the spread of losses, not their average.',
    explanation:
      'Defaults are correlated because borrowers share the same economy. The higher the correlation, the fatter the tail of the loss distribution.\n\nDiversifying across unrelated borrowers leaves expected loss unchanged but shrinks unexpected loss.',
    whyItMatters: 'It explains why concentrated books need more capital for the same expected loss.',
    misconception: '“Diversification lowers expected loss.” It lowers the volatility of loss.',
  },
  {
    id: 'stress-testing', district: 'storm', layer: 'F', verified: false, anchor: 'storm-dial', prerequisites: ['expected-loss'], links: ['capital-stack', 'forward-looking-scenarios'],
    name: 'Stress testing',
    oneLiner: 'Ask what a severe but plausible storm would do to losses and capital.',
    explanation:
      'A scenario (GDP falls, unemployment and rates rise) is translated into higher PDs and LGDs, then into losses, lower profits, higher RWA and a stressed capital ratio.\n\nReverse stress testing starts from failure and asks which scenario would cause it.',
    whyItMatters: 'Stress tests reuse ECL and capital engines with shocked inputs — the BA specifies the shocks and the run.',
  },
  {
    id: 'connected-counterparties', district: 'storm', layer: 'F', verified: false, anchor: 'storm-net', prerequisites: ['concentration', 'obligor-facility'], links: [],
    name: 'Connected counterparties and large exposures',
    oneLiner: 'Borrowers linked by control or economic dependence count as one risk.',
    explanation:
      'Group companies under common control, or firms that depend on each other for funding or revenue, are aggregated into one connected group.\n\nThe Basel large-exposures limit caps exposure to any group at 25% of Tier 1 capital.',
    whyItMatters: 'Group hierarchies are hard data problems: ownership, control and dependency must be captured and kept current.',
    embassy: { IN: 'RBI’s large exposures framework: 20% of Tier 1 for a single counterparty (up to 25% with board approval) and 25% for a group.' },
  },
  {
    id: 'portfolio-kpis', district: 'storm', layer: 'F', verified: false, anchor: 'storm-barometer', prerequisites: ['ifrs9-stages'], links: ['allowance-walk'],
    name: 'Portfolio credit KPIs',
    oneLiner: 'Stage 3 ratio, coverage and cost of risk — each with an exact definition.',
    explanation:
      'Stage 3 ratio = Stage 3 gross loans ÷ total gross loans.\nCoverage = allowance ÷ the loans it covers (often Stage 3 only).\nCost of risk = annual impairment charge ÷ average gross loans, usually in basis points.\n\nName them honestly: a Stage 3 ratio is not the same as an NPA ratio under local rules.',
    whyItMatters: 'KPI definitions are BA-owned: numerator, denominator, period and which balances count.',
  },
];
