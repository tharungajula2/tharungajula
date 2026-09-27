import type { Concept } from '../types';

// District 18 · BA Studio — business-analysis craft.
export const studio: Concept[] = [
  {
    id: 'requirement-to-test', district: 'studio', layer: 'F', verified: false, anchor: 'studio-board', prerequisites: [], links: ['traceability'],
    name: 'Rule → requirement → test → evidence',
    oneLiner: 'Turn each business rule into a testable requirement, and keep evidence that it passed.',
    explanation:
      'A good requirement states the rule, its source, the data it needs, thresholds, precedence, edge cases, and acceptance criteria a tester can prove or disprove.\n\n“Stage 2 if more than 30 DPD” becomes: which DPD field, measured when, what happens at exactly 30, and what evidence shows it works.',
    whyItMatters: 'This is the BA’s core deliverable in every credit-risk change.',
  },
  {
    id: 'traceability', district: 'studio', layer: 'F', verified: false, anchor: 'studio-thread', prerequisites: ['requirement-to-test'], links: ['data-lineage'],
    name: 'Traceability',
    oneLiner: 'Link every requirement to its source rule, its design, its tests and its evidence.',
    explanation:
      'A traceability matrix connects regulation or policy → requirement → data and design → test cases → test results. It proves coverage (nothing missed) and shows the impact of any change.',
    whyItMatters: 'Auditors and validators ask for it; without it a change cannot be shown to be complete.',
  },
  {
    id: 'data-mapping', district: 'studio', layer: 'F', verified: false, anchor: 'studio-map', prerequisites: ['data-lineage'], links: ['risk-data-architecture'],
    name: 'Source-to-target data mapping',
    oneLiner: 'For every target field: its source, its transformation, its default and its grain.',
    explanation:
      'The mapping document lists each target field, the source system and field, the transformation rule, what happens when the source is missing, and the grain (account, facility, obligor).\n\nMost reporting defects trace back to a mapping gap.',
    whyItMatters: 'It is the specification that data engineers build from.',
  },
  {
    id: 'uat', district: 'studio', layer: 'F', verified: false, anchor: 'studio-bench', prerequisites: ['requirement-to-test'], links: ['controls'],
    name: 'User acceptance testing',
    oneLiner: 'The business proves the change does what it needs, before it goes live.',
    explanation:
      'UAT runs scenarios written from the requirements, including boundary cases (exactly 30 DPD, exactly 90) and negative cases. Defects are logged, triaged and retested; sign-off is formal and evidenced.',
    whyItMatters: 'BAs write the scenarios, prepare the test data and chase sign-off.',
  },
  {
    id: 'brd-frd', district: 'studio', layer: 'F', verified: false, anchor: 'studio-two-docs', prerequisites: [], links: ['requirement-to-test'],
    name: 'Business vs functional requirements',
    oneLiner: 'Business requirements say what and why; functional requirements say how the system behaves.',
    explanation:
      'Business requirement: “Loans with a significant increase in credit risk must carry lifetime ECL.”\nFunctional requirement: “The engine sets stage = 2 when DPD > 30 or PD ratio ≥ 2 or watchlist = Y.”\n\nIn agile teams these become user stories with acceptance criteria.',
    whyItMatters: 'Mixing the two produces documents that neither the business nor developers can use.',
  },
];
