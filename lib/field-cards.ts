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
  isWip?: boolean;
  status: 'active' | 'vault';
  focus?: { note: string; missionsDone: number };
}

// Put a pack in rotation: status:'active' + add focus{}. Retire it: status:'vault'.
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
    isWip: true,
    status: 'vault',
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
    isWip: true,
    status: 'vault',
  },
  {
    id: 'sql-v01',
    category: 'AI & ENGINEERING',
    packNumber: 'FIELD CARDS V01',
    title: 'Reading Data with SQL',
    subject: 'SQL • FIELD CARDS',
    description:
      'From an unfamiliar table to a number worth signing. Grain, retrieval, absence, joins, aggregation, windows, composition, reconciliation and query plans.',
    missions: 10,
    cards: 89,
    tags: ['SQL', 'QUERIES', 'JOINS', 'AGGREGATION', 'WINDOW FUNCTIONS', 'QUERY PLANS'],
    href: '/field-cards/sql_v01.html',
    isWip: true,
    status: 'vault',
  },
  {
    id: 'applied-analytics-v03',
    category: 'AI & ENGINEERING',
    packNumber: 'FIELD CARDS V03',
    title: 'Applied Analytics',
    subject: 'ANALYTICS • FIELD CARDS',
    description:
      'A universal workflow, the seven model families behind it, then every project on the record — each compressed to the figure, the mechanism, and the objection that follows it.',
    missions: 9,
    cards: 55,
    tags: ['APPLIED ANALYTICS', 'MACHINE LEARNING', 'FORECASTING', 'PORTFOLIO', 'WORKFLOW'],
    href: '/field-cards/applied_analytics_v03.html',
    isWip: true,
    status: 'vault',
  },
  {
    id: 'business-analysis-delivery-v01',
    category: 'AI & ENGINEERING',
    packNumber: 'FIELD CARDS V01',
    title: 'Business Analysis & Delivery',
    subject: 'BUSINESS ANALYSIS • FIELD CARDS',
    description:
      'How a business problem becomes a running system in banking and lending. Discovery, requirements, solution design, data, assurance, release, and product decisions.',
    missions: 12,
    cards: 118,
    tags: ['BUSINESS ANALYSIS', 'REQUIREMENTS', 'PRODUCT DELIVERY', 'BANKING', 'WORKFLOW'],
    href: '/field-cards/business_analysis_delivery_v01.html',
    isWip: true,
    status: 'vault',
  },

  // --- FINANCE ---
  {
    id: 'credit-risk-uk-v01',
    category: 'FINANCE',
    packNumber: 'FIELD CARDS V01',
    title: 'Credit Risk & the Regulated Balance Sheet',
    subject: 'CREDIT RISK • UK EDITION',
    description:
      'How an internationally-active UK bank turns a rulebook into a number, files it to the regulator, and proves every figure — and the business-analysis work that builds the systems underneath.',
    missions: 16,
    cards: 102,
    tags: ['CREDIT RISK', 'UK / BASEL', 'BALANCE SHEET', 'PRA RULEBOOK', 'IFRS 9', 'RWA'],
    href: '/field-cards/credit_risk_uk_v01.html',
    isWip: true,
    status: 'active',
    focus: {
      note: 'UK/Basel position — balance sheet, capital, provisions & regulatory filing.',
      missionsDone: 0,
    },
  },
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
    isWip: true,
    status: 'vault',
  },
  {
    id: 'credit-modelling-v01',
    category: 'FINANCE',
    packNumber: 'FIELD CARDS V01',
    title: 'Retail Credit Risk System',
    subject: 'CREDIT MODELLING • FIELD CARDS',
    description:
      'From a raw loan table to a defended number: the target, the scorecard, the loss components, the provision, the capital charge, and the evidence for each.',
    missions: 17,
    cards: 144,
    tags: ['CREDIT MODELLING', 'SCORECARD', 'PROVISIONING', 'CAPITAL CHARGE', 'RETAIL RISK'],
    href: '/field-cards/credit_modelling_v01.html',
    isWip: true,
    status: 'vault',
  },
  {
    id: 'traded-products-v01',
    category: 'FINANCE',
    packNumber: 'FIELD CARDS V01',
    title: 'The Traded Balance Sheet',
    subject: 'TRADED PRODUCTS • FIELD CARDS',
    description:
      'Fixed income, derivatives and foreign exchange, from no prior knowledge. Instrument mechanics, pricing arithmetic, and credit exposure in Indian markets.',
    missions: 10,
    cards: 90,
    tags: ['TRADED PRODUCTS', 'FIXED INCOME', 'DERIVATIVES', 'FOREX', 'INDIAN MARKETS'],
    href: '/field-cards/traded_products_v01.html',
    isWip: true,
    status: 'vault',
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
    isWip: true,
    status: 'vault',
  },
];

export function getFieldCards(): FieldCard[] {
  return FIELD_CARDS;
}
