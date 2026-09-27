import type { Concept } from '../types';

// District 17 · Embassy Row — India and cross-jurisdiction differences.
export const embassy: Concept[] = [
  {
    id: 'jurisdiction-rulebooks', district: 'embassy', layer: 'F', verified: false, anchor: 'embassy-flags', prerequisites: [], links: ['cecl-vs-ifrs9'],
    name: 'Global standards vs local rulebooks',
    oneLiner: 'Basel and IFRS set standards; each country writes its own version, with its own dates.',
    explanation:
      'The Basel Committee and IASB have no legal power over banks. National regulators and accounting bodies implement their standards, often with changes and on their own timetable.\n\nBefore encoding a rule, confirm the jurisdiction, the version and the effective date.',
    whyItMatters: 'Rule provenance is a requirement field, not an afterthought.',
  },
  {
    id: 'india-irac', district: 'embassy', layer: 'F', verified: false, anchor: 'embassy-india', prerequisites: ['default-definition'], links: ['dpd-delinquency'],
    name: 'India: IRAC asset classification',
    oneLiner: 'Standard → sub-standard → doubtful → loss, driven by how long a loan has been an NPA.',
    explanation:
      'A loan becomes an NPA when overdue for more than 90 days. It is sub-standard for its first 12 months as an NPA, then doubtful, and loss once identified as uncollectible.\n\nProvisions rise with the category: for example 0.40% on most standard assets, 15% on sub-standard, and higher percentages as doubtful assets age.',
    whyItMatters: 'Indian banks run IRAC classification and provisioning alongside any ECL model.',
    embassy: { IN: 'RBI Master Circular on Income Recognition, Asset Classification and Provisioning (IRAC).' },
  },
  {
    id: 'uk-eu-basel31', district: 'embassy', layer: 'F', verified: false, anchor: 'embassy-europe', prerequisites: ['jurisdiction-rulebooks', 'sa-vs-irb'], links: [],
    name: 'UK and EU: implementing Basel 3.1',
    oneLiner: 'Same Basel reforms, different laws and start dates.',
    explanation:
      'The EU implemented the final Basel III reforms through CRR3, applying from 1 January 2025, with the output floor phased in towards 72.5%. The UK’s PRA implements them as Basel 3.1 from 1 January 2027.\n\nDetails differ — exposure classes, transitional rules, some risk weights.',
    whyItMatters: 'Cross-border banks must map one portfolio to two sets of rules.',
  },
  {
    id: 'us-framework', district: 'embassy', layer: 'F', verified: false, anchor: 'embassy-us', prerequisites: ['jurisdiction-rulebooks', 'cecl-vs-ifrs9'], links: ['stress-testing'],
    name: 'United States: CECL, capital and stress tests',
    oneLiner: 'US GAAP CECL for provisions; federal capital rules; annual stress tests set a capital buffer.',
    explanation:
      'Provisions follow CECL (lifetime from day one). Capital rules come from the Federal Reserve, OCC and FDIC. Large banks run supervisory stress tests, whose results set each bank’s stress capital buffer.',
    whyItMatters: 'US requirements arrive through different regulators and documents than Basel-style jurisdictions.',
  },
  {
    id: 'nbfc-sbr', district: 'embassy', layer: 'F', verified: false, anchor: 'embassy-ladder', prerequisites: ['jurisdiction-rulebooks'], links: [],
    name: 'India: NBFC scale-based regulation',
    oneLiner: 'RBI regulates NBFCs in layers, with stricter rules for bigger, more connected firms.',
    explanation:
      'Since RBI’s 2021 framework, NBFCs sit in a base, middle, upper or top layer by size and risk. Upper-layer NBFCs face bank-like rules on capital, governance and concentration.\n\nNBFCs follow Ind AS 109 (IFRS 9-based) for provisioning.',
    whyItMatters: 'Many Indian lending-tech clients are NBFCs, so their layer decides which rules apply.',
  },
];
