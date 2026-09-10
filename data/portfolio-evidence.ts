import { EvidenceRecord } from '@/lib/agent/types';

export const PORTFOLIO_EVIDENCE: EvidenceRecord[] = [
  // ─── POSITIONING & PROFILE ───
  {
    id: 'profile-positioning',
    category: 'positioning',
    title: 'Core Positioning & Operating Philosophy',
    text: 'Tharun Gajula builds decision systems end to end — the model, the guardrails, and the product around them. His experience combines lending technology at Lentra AI, portfolio analytics at Jana Small Finance Bank, a Post Graduate Level Programme in Deep Learning at IISc Bengaluru (92%), and four years of independent practice building retail credit risk frameworks, applied ML models, and concept product systems.',
    tags: ['positioning', 'summary', 'background', 'overview', 'bio', 'profile', 'who is tharun'],
    publicUrl: 'https://tharungajula.vercel.app/profile',
  },
  {
    id: 'profile-role-fit',
    category: 'positioning',
    title: 'Role Fit & Target Opportunities',
    text: 'Target roles include Product Manager (Product, AI, Lending, Fintech), Forward-Deployed / Solutions Engineer, Analytics Manager, Founder\'s Office, and Retail Credit Risk / Model Validation seats in banks and NBFCs. Grounded in regulated domains where details matter, turning dense rules into working software.',
    tags: ['role', 'job', 'target', 'fit', 'career', 'hiring', 'looking for'],
    publicUrl: 'https://tharungajula.vercel.app/profile',
  },

  // ─── RETAIL CREDIT RISK ───
  {
    id: 'credit-risk-system',
    category: 'project',
    title: 'Retail Credit Risk Modelling System',
    text: 'An end-to-end retail credit risk system built on 466,285 public LendingClub open dataset loans from origination vintages 2007 to 2014. Includes a PD scorecard using Weight of Evidence (WoE) and Information Value (IV) binning with logistic regression, scaled into points and rating grades; a two-stage LGD hurdle recovery model across 50,968 defaulted loans (logistic regression for recovery probability + gradient boosting for recovery magnitude); EAD as outstanding principal at default; and Expected Loss. Extended into IFRS 9 / Ind AS 109 style ECL staging (Stage 1, 2, 3) using SICR criteria and 60-month lifetime PD term structures, plus Basel III Advanced IRB capital calculation ($2.295B RWA, $278.48M provision at 15.25% coverage on $1.827B exposure). Validated with an out-of-time AUROC of 0.692, out-of-time Gini of 0.385 (vs 0.368 development), and stable score PSI of 0.007. A local retrieval layer with Gemini analyst integration (src/creditrisk/ai/) sits beside the risk engine for synthesis and tool calling, with live execution unverified.',
    tags: ['credit risk', 'lendingclub', 'pd scorecard', 'lgd', 'ead', 'expected loss', 'ifrs 9', 'ecl', 'basel iii', 'irb', 'gini', 'auroc', 'psi', 'deepest work', 'flagship', 'gemini analyst'],
    publicUrl: 'https://github.com/tharungajula2/retail-credit-risk',
    limitations: [
      'Built on public US LendingClub open data (2007-2014), not proprietary or employer data.',
      'Out-of-time validation sample is the 2014 vintage (never 2015).',
      'Data is a cross-sectional snapshot, so roll-rate and transition matrices are cross-sectional proxies, not monthly panels.',
      'Calibration via Hosmer-Lemeshow testing passes on test (p=0.494) but fails out-of-time (p=0.001) due to extreme sample size sensitivity at 235,628 rows; there is no unqualified "passed" calibration claim.',
      'CCF proxy model for EAD runs on a simulated revolving portfolio, separate from the term-loan book.',
      'No tree challengers (XGBoost, Random Forest, LightGBM) were benchmarked or tested against the PD scorecard.',
      'A local retrieval layer and Gemini analyst integration sits beside the risk engine, but live execution is unverified.',
    ],
  },

  // ─── LOC-IQ ───
  {
    id: 'loc-iq-system',
    category: 'project',
    title: 'LOC-IQ — Address Consistency Console',
    text: 'An address-consistency investigation console for retail credit and fraud review that treats the declared address as a hypothesis under test. Resolves 6 applicant identifiers across 46 catalogued external data sources and 42 data fields into a six-layer weighted graph (IDENTIFIER, SOURCE, EVIDENCE, SIGNAL, CANDIDATE_LOCATION, DECISION) with 77 derived signals. Deterministic resolver computes heuristic effective weights (base weight × recency factor × IP trust factor), discounting hosting proxies to a tenth for physical location while elevating risk relevance. Normalizes weighted evidence pools via Hamilton largest remainder into an evidence share, yielding auditable decisions of CONSISTENT, CONFLICT, or REVIEW. Built with Next.js, React 19, TypeScript, and @xyflow/react.',
    tags: ['loc-iq', 'address consistency', 'investigation', 'evidence share', 'consistent conflict review', 'graph', 'reactflow'],
    publicUrl: 'https://loc-iq.vercel.app',
    limitations: [
      'The 46 API sources are a catalogued universe, NOT live-fetched at runtime.',
      'Runs entirely on worked demo scenarios with synthetic data; contains no statistical validation, ML layer, or live API fetching.',
      'Output is a deterministic evidence share, NEVER a location probability or confidence score.',
      'Decisions are CONSISTENT, CONFLICT, or REVIEW (never GREEN/AMBER/RED traffic lights or truth flags).',
      'Address mismatch is an address-consistency investigation, NOT a fraud detection engine.',
      'Contains no consent-gated or DPDP privacy-by-design claim.',
    ],
  },

  // ─── PARENTS HEALTH OS ───
  {
    id: 'parents-health-os',
    category: 'project',
    title: 'Parents Health OS — Eldercare Console',
    text: 'Remote eldercare coordination console for Indian families. Caregivers monitor medications, vitals, rules-based triage, and doctor-ready briefs from one dashboard while parents check in via simple Meta WhatsApp Cloud API (v25.0) messages with three button choices (TAKEN, SKIP, SNOOZE). Powered by a connected backend featuring Supabase Auth, 15 PostgreSQL tables protected by row-level security, private document storage, HMAC SHA-256 signed webhook verification, guarded atomic delivery transitions, and a compare-and-swap (CAS) scheduler with timestamp lease tokens for idempotency and crash recovery. Gemini parses uploaded lab reports into structured schema as a proposer with human-in-the-loop pending_review verification.',
    tags: ['parents health os', 'eldercare', 'healthcare', 'supabase', 'postgresql', 'rls', 'whatsapp', 'gemini', 'cas scheduler', 'compare and swap'],
    publicUrl: 'https://parents-health-os.vercel.app',
    limitations: [
      'Gemini parses lab reports into structured schema as a proposer with pending_review status; clinical thresholds are strictly guarded.',
      'Is NOT offline-first; the final service worker is network-only.',
      'Not autonomous; recurring execution requires external cron or pg_cron.',
      'Exactly-once delivery across the Meta boundary is not established because external sends and local writes cannot join a single ACID transaction.',
      'Is NOT a medical device and makes no diagnostic or clinical validation claims.',
    ],
  },

  // ─── CLIENT EQUITY STRATEGY IMPLEMENTATION ───
  {
    id: 'client-equity-implementation',
    category: 'analytics',
    title: 'Client Equity Strategy Implementation',
    text: 'Built the Python implementation of a client\'s cross-sectional equity strategies using client-provided US CRSP 500-stock data over a 10-year backtest. Implemented across 4 core scripts covering data alignment, cross-sectional and sector-neutral ranking, L1/L2 cvxpy turnover control, and benchmark tracking error analysis. Delivered performance analytics including Sharpe, Sortino, drawdown, and information ratio.',
    tags: ['client equity', 'quantitative equity', 'backtest', 'cvxpy', 'sharpe', 'python', 'crsp 500', 'sector neutral'],
    publicUrl: 'https://tharungajula.vercel.app/profile',
    limitations: [
      'The investment strategies and historical datasets were supplied by the client; Tharun built the Python engineering implementation.',
      'Does not imply personal ownership of the client\'s trading strategies.',
    ],
  },

  // ─── BANK CHURN ───
  {
    id: 'bank-churn-nn',
    category: 'analytics',
    title: 'Bank Customer Churn Neural Network',
    text: 'Customer attrition model built on a 10,000-customer retail banking dataset using Keras across five model variants. Applied SMOTE to handle class imbalance, lifting churn recall from 0.48 to 0.75 at 0.85 ROC-AUC. Precision was traded down deliberately from 0.79 to 0.51 because in retention operations, missing a true churner is significantly more costly than contacting a non-churning customer.',
    tags: ['bank churn', 'churn', 'keras', 'neural network', 'smote', 'recall', 'precision', 'applied ml'],
    publicUrl: 'https://tharungajula.vercel.app/profile',
  },

  // ─── SARIMA FORECASTING ───
  {
    id: 'sarima-forecasting',
    category: 'analytics',
    title: 'SARIMA Demand Forecasting',
    text: 'Time-series demand forecasting on a 204-month prescription series. Performed STL decomposition and ADF stationarity testing, evaluating 625 candidate SARIMA structures with rolling 12-month forecasts. Achieved a Mean Absolute Percentage Error (MAPE) of 7.90% compared to 12.69% for a naive seasonal baseline.',
    tags: ['sarima', 'forecasting', 'time series', 'stl decomposition', 'adf test', 'mape'],
    publicUrl: 'https://tharungajula.vercel.app/profile',
  },

  // ─── NIFTY 100 PORTFOLIO ───
  {
    id: 'nifty-100-optimisation',
    category: 'analytics',
    title: 'NIFTY 100 Portfolio Optimisation',
    text: 'Applied Modern Portfolio Theory (MPT) on 82 usable stocks from the NIFTY 100 index. Computed log returns, covariance matrix, and generated 10,000 Monte Carlo weight vectors to trace the efficient frontier, comparing equal-weighted portfolios against maximum Sharpe ratio allocations.',
    tags: ['nifty 100', 'portfolio optimisation', 'mpt', 'sharpe ratio', 'monte carlo', 'efficient frontier'],
    publicUrl: 'https://github.com/tharungajula2/Portfolio',
    limitations: [
      'An analytical research study, not an institutional production trading engine.',
    ],
  },

  // ─── CURIOSITY OS ───
  {
    id: 'curiosity-os',
    category: 'project',
    title: 'Curiosity OS — Thinking Skills Portal',
    text: 'A digital lab for training reasoning and questioning skills. Features an interactive 3D WebGL concept map of 147 reasoning concepts and 381 connections, 36 written activity playbooks, and 6 curated learning paths. Completely static, offline-friendly, with no logins, database, or tracking.',
    tags: ['curiosity os', 'webgl', '3d', 'concept map', 'reasoning', 'learning'],
    publicUrl: 'https://curiosity-os.vercel.app',
    limitations: [
      'Contains NO AI or machine learning of any kind; it is a static WebGL visual application.',
    ],
  },

  // ─── BETTER4U ───
  {
    id: 'better4u-brand',
    category: 'project',
    title: 'better4u — Consumer Brand Design',
    text: 'A better-for-you food and beverage concept brand web experience. Features 26 SKUs across six sub-brands, custom packaging renders, an interactive cart, double-sided label viewer, and a plant-points calculator.',
    tags: ['better4u', 'brand design', 'f&b', 'consumer brand', 'cart', 'packaging'],
    publicUrl: 'https://better4u.vercel.app/',
    limitations: [
      'Checkout is a visual demo prototype and does not process real payments or dispatch physical orders.',
    ],
  },

  // ─── WORK EXPERIENCE ───
  {
    id: 'exp-lentra',
    category: 'experience',
    title: 'Lentra AI — Business Analyst (Product Management)',
    text: 'April 2021 – October 2021 | Pune, India. Mapped end-to-end loan origination workflows for a B2B SaaS lending platform serving 12+ banking clients. Translated credit policy rules, eligibility criteria, and calculation logic into functional specs for the underwriting rule engine. Executed UAT, loan calculation validation, and Postman API testing ahead of client go-lives.',
    tags: ['lentra', 'lentra ai', 'business analyst', 'product management', 'underwriting', 'b2b saas', 'loan origination', 'uat', 'postman'],
    publicUrl: 'https://tharungajula.vercel.app/profile',
  },
  {
    id: 'exp-jana-sfb',
    category: 'experience',
    title: 'Jana Small Finance Bank — Manager, Loan Product & Portfolio Analytics',
    text: 'November 2021 – March 2022 | Bengaluru, India. Owned automated portfolio reporting for the retail lending book, cutting reporting turnaround by 30% by migrating recurring MIS onto scheduled SQL workflows. Produced portfolio quality MIS across delinquency buckets, DPD movement, PAR, and NPA positions. Translated credit policy rules into reporting metrics with retail & SME teams.',
    tags: ['jana', 'jana sfb', 'jana bank', 'manager', 'portfolio analytics', 'delinquency', 'par', 'npa', 'mis', 'sql', 'reporting'],
    publicUrl: 'https://tharungajula.vercel.app/profile',
  },
  {
    id: 'exp-independent-practice',
    category: 'experience',
    title: 'Independent Practice',
    text: 'April 2022 – Present | Remote, India. Self-directed technical practice spanning retail credit risk modelling (466k loan book), applied ML, IISc deep learning programme (92%), and concept product systems built end to end. Self-directed practice, not consulting or freelancing.',
    tags: ['independent practice', 'self-directed', 'remote', 'credit risk', 'deep learning', 'iisc'],
    publicUrl: 'https://tharungajula.vercel.app/profile',
  },

  // ─── EDUCATION ───
  {
    id: 'edu-iisc',
    category: 'education',
    title: 'IISc Bengaluru — PG Programme in Deep Learning',
    text: '2023 – 2025 | Grade: 92%. Post Graduate Level Programme in Deep Learning at the Indian Institute of Science (IISc), Bengaluru. Advanced neural networks, computer vision, sequence models, and deep learning architectures.',
    tags: ['iisc', 'iisc bengaluru', 'deep learning', 'neural networks', 'education', 'grade 92%'],
    publicUrl: 'https://tharungajula.vercel.app/profile',
  },
  {
    id: 'edu-nibm',
    category: 'education',
    title: 'NIBM Pune — PGDM Banking & Finance',
    text: '2019 – 2021 | Grade: 74.13%. Post Graduate Diploma in Management (PGDM) in Banking and Finance at the National Institute of Bank Management (NIBM), Pune—an RBI-promoted autonomous institute. Specialized in commercial banking, credit risk, Treasury, and financial analysis.',
    tags: ['nibm', 'nibm pune', 'pgdm', 'banking', 'rbi', 'education', 'finance'],
    publicUrl: 'https://tharungajula.vercel.app/profile',
  },
  {
    id: 'edu-griet',
    category: 'education',
    title: 'GRIET / JNTUH — B.Tech Mechanical Engineering',
    text: '2013 – 2017 | Grade: 85.62%. B.Tech in Mechanical Engineering at Gokaraju Rangaraju Institute of Engineering and Technology (GRIET), JNTUH, Hyderabad. Participated in SAE BAJA design competition.',
    tags: ['griet', 'jntuh', 'btech', 'mechanical engineering', 'sae baja', 'education'],
    publicUrl: 'https://tharungajula.vercel.app/profile',
  },

  // ─── SKILLS ───
  {
    id: 'skills-overview',
    category: 'skills',
    title: 'Evidenced Technical & Domain Skills',
    text: 'Credit Risk: PD scorecards, WoE/IV binning, LGD, EAD, Expected Loss, IFRS 9 ECL staging, Basel III IRB capital, AUROC/Gini/KS validation, PSI/CSI monitoring. Data & ML: Python (pandas, NumPy, scikit-learn, statsmodels, Keras), SQL, Logistic Regression, XGBoost, SMOTE, SARIMA. Engineering: Next.js, React, TypeScript, Tailwind CSS, LLM API integration, ReactFlow, Three.js/WebGL.',
    tags: ['skills', 'python', 'sql', 'next.js', 'typescript', 'react', 'credit risk', 'machine learning', 'scorecard', 'ifrs 9'],
    publicUrl: 'https://tharungajula.vercel.app/profile',
    limitations: [
      'Excludes SR 11-7 supervisory standard claim.',
      'Excludes DPDP privacy-by-design claim.',
      'Excludes Supabase/PostgreSQL active backend claim.',
      'Excludes KNIME, Power BI, FastAPI, LangGraph, pgvector, MCP, reinforcement learning, and NLP from active skill list.',
    ],
  },
];
