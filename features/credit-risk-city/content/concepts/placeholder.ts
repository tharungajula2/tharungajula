import type { Concept } from '../types';

// PLACEHOLDER concepts for districts not yet written (verified: false, placeholder: true).
// Each district's real content batch replaces its entries here.
const c = (x: Omit<Concept, 'verified' | 'links' | 'placeholder'> & { links?: string[] }): Concept => ({ links: [], ...x, verified: false, placeholder: true });

export const placeholderConcepts: Concept[] = [
  c({ id: 'counterparty-exposure', district: 'trading', layer: 'F', name: 'Counterparty exposure', anchor: 'trading-seesaw', prerequisites: ['obligor-facility'],
    oneLiner: 'A derivative’s exposure is its replacement cost, not its notional.',
    explanation: 'A swap with ₹100 crore notional may be worth ₹2 crore to you today; that positive value is what you lose if the counterparty defaults, and it moves with markets.',
    whyItMatters: 'Netting and collateral data decide the exposure the bank reports.' }),
  c({ id: 'concentration', district: 'storm', layer: 'F', name: 'Concentration', anchor: 'storm-pie', prerequisites: [],
    oneLiner: 'Many loans exposed to the same driver can fail together.',
    explanation: 'Concentration by name, group, sector or region defeats diversification when a shared shock arrives.',
    whyItMatters: 'Limit frameworks need clean group and sector hierarchies.' }),
  c({ id: 'securitisation', district: 'port', layer: 'D', name: 'Securitisation', anchor: 'port-containers', prerequisites: ['expected-loss'],
    oneLiner: 'Pool loans and pass their cash flows and losses to investors in tranches.',
    explanation: 'Junior tranches take losses first. Accounting derecognition and regulatory risk transfer are separate tests.',
    whyItMatters: 'Deep topic for now — know where it sits in the city.' }),
  c({ id: 'reporting-purpose', district: 'reporting', layer: 'F', name: 'Reporting purposes', anchor: 'report-clock', prerequisites: [],
    oneLiner: 'Financial statements, prudential returns and management reports answer different questions.',
    explanation: 'The same loan can show different numbers in each because definitions, scope and timing differ. Reconcile differences; never force them to match.',
    whyItMatters: 'Explaining reconciling items is core BA work.' }),
  c({ id: 'data-lineage', district: 'engineroom', layer: 'F', name: 'Data lineage', anchor: 'engine-pipes', prerequisites: [],
    oneLiner: 'Trace any number from source record, through each transformation, to the report.',
    explanation: 'Lineage records source fields, rules applied, and the target. Without it, nobody can explain or correct a reported figure.',
    whyItMatters: 'BCBS 239 expects banks to evidence it.' }),
  c({ id: 'three-lines', district: 'townhall', layer: 'F', name: 'Three lines of defence', anchor: 'hall-table', prerequisites: [],
    oneLiner: 'Business owns risk, risk management challenges it, audit assures independently.',
    explanation: 'The first line originates and manages risk, the second sets limits and challenges, the third tests the whole system.',
    whyItMatters: 'Knowing who signs off prevents requirements from stalling.' }),
  c({ id: 'jurisdiction-rulebooks', district: 'embassy', layer: 'F', name: 'Global standards vs local rulebooks', anchor: 'embassy-flags', prerequisites: [],
    oneLiner: 'Basel and IFRS set standards; each country implements its own version and dates.',
    explanation: 'Always check which rulebook, version and effective date apply before encoding a rule.',
    whyItMatters: 'Rule provenance is a requirement, not an afterthought.',
    embassy: { IN: 'RBI IRAC norms define NPAs; the RBI ECL framework has its own start date.', UK: 'PRA rules implement Basel 3.1.', EU: 'CRR3/CRD6.', US: 'CECL for accounting; US capital rules separately.' } }),
  c({ id: 'requirement-to-test', district: 'studio', layer: 'F', name: 'Rule → requirement → test → evidence', anchor: 'studio-thread', prerequisites: [],
    oneLiner: 'Translate each business rule into a testable requirement with evidence of passing.',
    explanation: 'A good requirement states the rule, the data it needs, thresholds, precedence, edge cases, and acceptance criteria a tester can prove.',
    whyItMatters: 'This is the BA’s core deliverable in every credit risk change.' }),
];
