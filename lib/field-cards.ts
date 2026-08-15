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
    id: 'ai-stack-v01',
    category: 'AI & ENGINEERING',
    packNumber: 'FIELD CARDS V01',
    title: 'The AI Stack',
    subject: 'AI STACK • FIELD CARDS',
    description:
      'A complete map of how an AI system is actually built, for a reader starting from zero.',
    missions: 10,
    cards: 97,
    tags: ['AI STACK', 'ARCHITECTURE', 'COMPUTE & INFRA', 'RETRIEVAL & AGENTS', 'GOVERNANCE'],
    href: '/field-cards/ai_stack_v01.html',
  },
  {
    id: 'claude-at-work-v01',
    category: 'AI & ENGINEERING',
    packNumber: 'FIELD CARDS V01',
    title: 'Claude at Work',
    subject: 'CLAUDE • FIELD CARDS',
    description:
      "An operator's cheat sheet. Every lever, where it lives, and when to pull it — written for someone with no technical background inside a real company.",
    missions: 12,
    cards: 97,
    tags: ['CLAUDE', 'PROMPTING', 'WORKFLOWS', 'OPERATIONS', 'CHEAT SHEET'],
    href: '/field-cards/claude_at_work_v01.html',
  },
  {
    id: 'python-field-v01',
    category: 'AI & ENGINEERING',
    packNumber: 'FIELD CARDS V01',
    title: 'Python on the Field',
    subject: 'PYTHON • FIELD CARDS',
    description:
      'A working reference for anyone who can read code but freezes at a blank file. Every card gives a first line, not a lecture.',
    missions: 15,
    cards: 98,
    tags: ['PYTHON', 'SYNTAX', 'DATA FRAMES', 'WORKFLOWS', 'OPERATIONS'],
    href: '/field-cards/python_field_v01.html',
  },

  // --- FINANCE ---
  {
    id: 'credit-risk-v01',
    category: 'FINANCE',
    packNumber: 'FIELD CARDS V01',
    title: 'Credit Risk, India',
    subject: 'CREDIT RISK • FIELD CARDS',
    description:
      'The reasoning layer. What every measure means, why the rulebook says what it says, and what changes on 1 April 2027.',
    missions: 12,
    cards: 68,
    tags: ['CREDIT RISK', 'RBI RULEBOOK', 'PD LGD EAD', 'IFRS 9', 'CAPITAL'],
    href: '/field-cards/credit_risk_v01.html',
  },
  {
    id: 'investing-india-v01',
    category: 'FINANCE',
    packNumber: 'FIELD CARDS V01',
    title: 'Investing, India',
    subject: 'INVESTING • FIELD CARDS',
    description:
      'For a beginner putting their own money to work over a long horizon. What the instruments are, what they cost, what the rules say, and where people actually lose.',
    missions: 12,
    cards: 62,
    tags: ['INVESTING', 'EQUITY', 'MUTUAL FUNDS', 'TAX & RULES', 'ASSET ALLOCATION'],
    href: '/field-cards/investing_india_v01.html',
  },
  {
    id: 'positioning-v01',
    category: 'FINANCE',
    packNumber: 'FIELD CARDS V01',
    title: 'Positioning',
    subject: 'POSITIONING • FIELD CARDS',
    description:
      'Deploying capital in India with intent. What edge actually is, what the numbers really are, and how to act when the moment comes without the mind getting in the way.',
    missions: 14,
    cards: 77,
    tags: ['POSITIONING', 'CAPITAL DEPLOYMENT', 'RISK EDGE', 'PSYCHOLOGY', 'EXECUTION'],
    href: '/field-cards/positioning_v01.html',
  },
];

export function getFieldCards(): FieldCard[] {
  return FIELD_CARDS;
}


