import type { Concept } from '../types';

// District 16 · Town Hall — governance, conduct and accountability.
export const townhall: Concept[] = [
  {
    id: 'three-lines', district: 'townhall', layer: 'F', verified: false, anchor: 'hall-table', prerequisites: [], links: ['model-validation'],
    name: 'Three lines of defence',
    oneLiner: 'The business owns risk, risk management challenges it, internal audit assures independently.',
    explanation:
      'First line: originates loans and owns the risks and controls. Second line: sets policy and limits, monitors and challenges. Third line: tests the whole system independently and reports to the board’s audit committee.',
    whyItMatters: 'Knowing who owns, who challenges and who signs off stops requirements from stalling.',
  },
  {
    id: 'risk-appetite', district: 'townhall', layer: 'F', verified: false, anchor: 'hall-dial', prerequisites: ['three-lines'], links: ['concentration'],
    name: 'Risk appetite',
    oneLiner: 'How much risk the board is willing to take, written as measurable limits.',
    explanation:
      'The risk appetite statement sets board-level metrics (capital ratio floor, Stage 3 ratio ceiling, concentration limits). These cascade into business limits.\n\nMetrics carry early-warning triggers and hard limits; breaches are escalated to named owners within set times.',
    whyItMatters: 'Appetite metrics need precise definitions and data so breaches are detected, not argued about.',
  },
  {
    id: 'committees-policy', district: 'townhall', layer: 'F', verified: false, anchor: 'hall-gavel', prerequisites: ['three-lines'], links: ['credit-decision'],
    name: 'Credit policy and committees',
    oneLiner: 'The board approves policy and appetite; committees and delegated authorities apply them.',
    explanation:
      'The board (through its risk committee) approves the credit policy and risk appetite. Management committees approve large exposures, models and policy exceptions. Individuals approve within their delegated limits.\n\nMinutes and decision records are the evidence that the governance worked.',
    whyItMatters: 'Approval workflows and authority matrices are encoded in systems the BA specifies.',
  },
  {
    id: 'conduct', district: 'townhall', layer: 'F', verified: false, anchor: 'hall-scales', prerequisites: [], links: ['collections-cure'],
    name: 'Conduct and fair lending',
    oneLiner: 'Lend transparently, affordably and fairly — and collect fairly too.',
    explanation:
      'Clear pricing and terms, affordability checks, no discrimination, fair treatment in collections and of customers in difficulty.\n\nConduct failures bring fines, redress and reputational damage even when the credit risk was well managed.',
    whyItMatters: 'Conduct rules become system requirements: disclosures, cooling-off periods, collection-contact limits.',
    embassy: { IN: 'RBI Fair Practices Code for lenders, and RBI’s digital lending guidelines (2022).', UK: 'FCA Consumer Duty.' },
  },
];
