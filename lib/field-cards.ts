export interface FieldCard {
  id: string;
  packNumber: string;
  title: string;
  subject: string;
  description: string;
  missions: number;
  cards: number;
  tags: string[];
  href: string;
}

export const FIELD_CARDS: FieldCard[] = [
  {
    id: 'field-cards-001',
    packNumber: 'FIELD CARDS #001',
    title: 'Retail Credit Risk — Field Cards',
    subject: 'CREDIT RISK • FIELD CARDS',
    description:
      'PD, LGD, EAD, IFRS 9 staging, prudential floors and Basel capital, from first principles and written for the Indian rulebook. 10 missions, 119 cards.',
    missions: 10,
    cards: 119,
    tags: ['CREDIT RISK', 'PD LGD EAD', 'IFRS 9', 'BASEL III', 'RBI'],
    href: '/field-cards/retail-credit-risk-pack-01.html',
  },
  {
    id: 'field-cards-002',
    packNumber: 'FIELD CARDS #002',
    title: 'AI Engineering — Field Cards',
    subject: 'AI ENGINEERING • FIELD CARDS',
    description:
      'AI engineering from first principles: tokens, attention, retrieval, agents, serving, evaluation, security and governance — the field practice, compressed.',
    missions: 10,
    cards: 106,
    tags: ['AI ENGINEERING', 'ATTENTION', 'RAG', 'AGENTS', 'EVALS & GOVERNANCE'],
    href: '/field-cards/ai-engineering-pack-02.html',
  },
  {
    id: 'field-cards-003',
    packNumber: 'FIELD CARDS #003',
    title: 'Credit Risk & Python — Field Cards',
    subject: 'CREDIT RISK & PYTHON • FIELD CARDS',
    description:
      'Python as a professional instrument inside a credit risk function: the data frame, the evidence, the model, the system, and what it takes to keep a decision defensible.',
    missions: 10,
    cards: 104,
    tags: ['CREDIT RISK', 'PYTHON', 'WOE & IV', 'MODELING', 'PRODUCTION SYSTEMS'],
    href: '/field-cards/credit-risk-python-pack-03.html',
  },
];

export function getFieldCards(): FieldCard[] {
  return FIELD_CARDS;
}
