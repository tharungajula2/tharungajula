export interface FieldCard {
  id: string;
  category: string;
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
  // --- AI & ENGINEERING ---
  {
    id: 'ai-stack-v02',
    category: 'AI & ENGINEERING',
    packNumber: 'FIELD CARDS V02',
    title: 'The AI Stack',
    subject: 'AI STACK • FIELD CARDS',
    description:
      'A complete map of how an AI system is actually built, for a reader starting from zero.',
    missions: 10,
    cards: 110,
    tags: ['AI STACK', 'ARCHITECTURE', 'COMPUTE & INFRA', 'RETRIEVAL & AGENTS', 'GOVERNANCE'],
    href: '/field-cards/ai_stack_v02.html',
  },
  {
    id: 'python-v02',
    category: 'AI & ENGINEERING',
    packNumber: 'FIELD CARDS V02',
    title: 'Python for Credit Risk',
    subject: 'PYTHON • FIELD CARDS',
    description:
      'The language, the data stack and the model workflow, taught entirely on a loan book. Every line runs. Every example is a real credit calculation rather than a toy.',
    missions: 15,
    cards: 110,
    tags: ['PYTHON', 'SYNTAX', 'DATA FRAMES', 'WORKFLOWS', 'OPERATIONS'],
    href: '/field-cards/python_v02.html',
  },

  // --- FINANCE ---
  {
    id: 'credit-risk-v02',
    category: 'FINANCE',
    packNumber: 'FIELD CARDS V02',
    title: 'Credit Risk, India',
    subject: 'CREDIT RISK • FIELD CARDS',
    description:
      'Measurement, capital, provisioning, funding and the data that carries all of it. Written for the person who has to turn a rulebook into a number, and then defend the number.',
    missions: 16,
    cards: 137,
    tags: ['CREDIT RISK', 'RBI RULEBOOK', 'PD LGD EAD', 'IFRS 9', 'CAPITAL'],
    href: '/field-cards/credit_risk_v02.html',
  },
  {
    id: 'investing-v02',
    category: 'FINANCE',
    packNumber: 'FIELD CARDS V02',
    title: 'Investing, India',
    subject: 'INVESTING • FIELD CARDS',
    description:
      'For a beginner putting their own money to work over a long horizon. What the instruments are, what they cost, what the rules say, and where people actually lose.',
    missions: 12,
    cards: 100,
    tags: ['INVESTING', 'EQUITY', 'VALUATION', 'ASSET ALLOCATION', 'TAX & RULES', 'BEHAVIOUR'],
    href: '/field-cards/investing_v02.html',
  },
];

export function getFieldCards(): FieldCard[] {
  return FIELD_CARDS;
}


