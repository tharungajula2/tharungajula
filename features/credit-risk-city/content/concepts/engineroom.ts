import type { Concept } from '../types';

// District 15 · Engine Room — data, lineage, systems and controls.
export const engineroom: Concept[] = [
  {
    id: 'data-lineage', district: 'engineroom', layer: 'F', verified: false, anchor: 'engine-pipes', prerequisites: [], links: ['bcbs239'],
    name: 'Data lineage',
    oneLiner: 'Trace any reported number back through every transformation to its source record.',
    explanation:
      'Lineage records the source fields, each transformation and business rule applied, and the target field in the report.\n\nWithout it, nobody can explain a reported figure, assess the impact of a change, or fix an error at its source.',
    whyItMatters: 'Lineage is expected by supervisors and is the first thing auditors ask for.',
  },
  {
    id: 'bcbs239', district: 'engineroom', layer: 'F', verified: false, anchor: 'engine-gauges', prerequisites: ['data-lineage'], links: ['reconciliation'],
    name: 'BCBS 239',
    oneLiner: 'Basel principles for risk data aggregation and risk reporting.',
    explanation:
      'Issued in 2013: governance and infrastructure, then aggregation capabilities (accuracy, completeness, timeliness, adaptability), then reporting practices (accurate, comprehensive, clear, timely, distributed to the right people).\n\nThe test: can the bank produce accurate risk data quickly in a crisis?',
    whyItMatters: 'Many risk-data programmes exist because of BCBS 239 findings.',
  },
  {
    id: 'data-quality', district: 'engineroom', layer: 'F', verified: false, anchor: 'engine-filter', prerequisites: [], links: ['regulatory-returns'],
    name: 'Data quality',
    oneLiner: 'Complete, accurate, valid, timely, consistent and unique — measured, not assumed.',
    explanation:
      'Data-quality rules test each critical field (for example: collateral value present, not negative, not older than its revaluation date). Results are scored against thresholds; breaches become issues with owners and fix dates.\n\nFix issues at the source, not with manual patches downstream.',
    whyItMatters: 'Critical data elements, DQ rules and thresholds are specified by BAs.',
  },
  {
    id: 'risk-data-architecture', district: 'engineroom', layer: 'F', verified: false, anchor: 'engine-map', prerequisites: ['data-lineage'], links: ['ecl-measurement'],
    name: 'Risk data architecture',
    oneLiner: 'Source systems → data platform → risk engines → reports.',
    explanation:
      'Loan origination and loan management systems, collateral, customer and ledger systems feed a data platform (warehouse or lake). Risk engines (ECL, capital, stress testing) consume it and write results back for reporting.\n\nEach hop needs agreed keys, grain and timing.',
    whyItMatters: 'Knowing where each field is born and consumed is the backbone of every impact assessment.',
  },
  {
    id: 'controls', district: 'engineroom', layer: 'F', verified: false, anchor: 'engine-valve', prerequisites: [], links: ['three-lines'],
    name: 'Controls and maker-checker',
    oneLiner: 'Preventive controls stop errors; detective controls find them.',
    explanation:
      'Preventive: validations at entry, access rights, maker-checker (one person enters, another approves). Detective: reconciliations, exception reports, reviews.\n\nAutomated controls are more reliable than manual ones; every control needs an owner and evidence that it ran.',
    whyItMatters: 'New processes need their controls designed in — a BA deliverable, not an afterthought.',
  },
];
