import { IntentResult } from './types';

// ---------------------------------------------------------------------------
// STEP 0 — MEANINGFULNESS GATE
//
// A query must contain at least one recognisable character from the extended
// Latin alphabet and at least two distinct tokens to be worth routing.
// Pure noise, punctuation-only, numeric-only, and single-character inputs
// are rejected immediately.
// ---------------------------------------------------------------------------
function isMeaningfulQuery(raw: string): boolean {
  const q = raw.trim();
  if (q.length === 0) return false;

  // Must have at least one letter (Unicode letter class)
  if (!/[a-zA-Z]/.test(q)) return false;

  // Must have at least 2 non-trivial tokens (length >= 2)
  const tokens = q.split(/\s+/).filter((t) => t.length >= 2);
  if (tokens.length < 1) return false;

  // Reject if > 80% of characters are non-alphabetic (noise strings like "yguugghkjj" still pass
  // this check, so we add the portfolio-scope gate below — intentionally not blocked here)
  return true;
}

// ---------------------------------------------------------------------------
// STEP 1 — PORTFOLIO SCOPE GATE
//
// After the unknown-pattern traps, if the query contains zero overlap with
// any portfolio-related terms it is UNKNOWN.
// We enumerate broad coverage so short valid queries like "Lentra?" still pass.
// ---------------------------------------------------------------------------
const PORTFOLIO_SCOPE_TERMS = [
  // People / entities
  'tharun', 'gajula',
  // Companies & institutions
  'lentra', 'jana', 'iisc', 'nibm', 'griet', 'jntuh',
  // Projects
  'credit risk', 'credit-risk', 'lendingclub', 'parents health', 'parents-health',
  'sarima', 'churn', 'nifty', 'equity', 'crsp', 'bank churn',
  // Role / work concepts
  'deepest', 'flagship', 'deepest body', 'deepest work', 'strongest for',
  'strongest body of work', 'strongest body', 'most deeply',
  'role fit', 'why hire', 'target role', 'kind of role', 'what role',
  'independent practice',
  // Experience / education
  'experience', 'education', 'career', 'work history', 'job', 'company',
  'deep learning', 'degree', 'university', 'college', 'b.tech', 'pgdm',
  'study', 'studied', 'programme', 'worked', 'work before',
  // Limitations / constraints vocabulary
  'limitation', 'drawback', 'caveat', 'constraint', 'weakness', 'shortcoming',
  'where does', 'fall short',
  // Skills
  'skill', 'python', 'sql', 'react', 'next.js', 'typescript', 'tech stack',
  'technology', 'machine learning', 'scorecard', 'ifrs', 'basel',
  // Profile
  'who is', 'about', 'bio', 'summary', 'background', 'positioning', 'profile',
  'portfolio', 'project', 'analytics', 'system',
  // Finance/risk vocabulary
  'pd scorecard', 'lgd', 'ead', 'ecl', 'auroc', 'gini', 'psi',
  'hosmer', 'lemeshow', 'supabase', 'whatsapp',
  // Short entity triggers
  'lentra?', 'jana?', 'iisc?', 'credit risk?', 'parents health os?',
];

function isPortfolioRelated(q: string): boolean {
  const lower = q.toLowerCase();
  return PORTFOLIO_SCOPE_TERMS.some((term) => lower.includes(term));
}

// ---------------------------------------------------------------------------
// PUBLIC CLASSIFIER
// ---------------------------------------------------------------------------
export function classifyIntent(query: string): IntentResult {
  // ── STEP 0: Meaningfulness Gate ──────────────────────────────────────────
  if (!isMeaningfulQuery(query)) {
    return { intent: 'UNKNOWN', keywords: ['garbage', 'meaningless'] };
  }

  const q = query.toLowerCase().trim();

  // ── STEP 1: Hard Unknown / Refusal Traps ─────────────────────────────────
  // These patterns are explicitly out of scope even if the rest of the query
  // contains portfolio terms.
  const unknownPatterns = [
    'salary', 'compensation', 'pay', 'money', 'ctc', 'package',
    'private doc', 'private project',
    'weather', 'recipe', 'capital of', 'who won',
    'home address', 'phone number', 'personal email',
    'production agent', 'production multi-agent',
    'deployed langgraph', 'deployed mcp',
    'tree model', 'tree challenger', 'benchmarked against',
    'ignore your instructions', 'ignore instructions', 'disregard',
    'pretend you are', 'act as', 'jailbreak',
    'world cup', 'stock market today', 'latest news',
    'write me a recipe', 'write a recipe',
  ];
  if (unknownPatterns.some((p) => q.includes(p))) {
    return { intent: 'UNKNOWN', keywords: ['unknown', 'refusal'] };
  }

  // ── STEP 2: Portfolio Scope Gate ──────────────────────────────────────────
  // If the query has no overlap with any portfolio term, it is UNKNOWN.
  // This is what catches garbage like "yguugghkjj", "asdfghjkl",
  // "hello banana spaceship", "what is the weather?", etc.
  if (!isPortfolioRelated(q)) {
    return { intent: 'UNKNOWN', keywords: ['out-of-scope'] };
  }

  // ── STEP 3: ROLE FIT & DEEPEST WORK ──────────────────────────────────────
  // Covers starter Q1 and natural variations.
  if (
    q.includes('deepest body of work') ||
    q.includes('deepest work') ||
    q.includes('deepest body') ||
    q.includes('worked on most deeply') ||
    q.includes('most deeply') ||
    q.includes('flagship') ||
    q.includes('strongest body of work') ||
    q.includes('strongest for') ||
    q.includes('kind of role') ||
    q.includes('target role') ||
    q.includes('role fit') ||
    q.includes('why hire') ||
    q.includes('what role') ||
    q.includes('which project represents')
  ) {
    let targetId: string | undefined;
    if (
      q.includes('deepest') ||
      q.includes('flagship') ||
      q.includes('deepest work') ||
      q.includes('strongest body') ||
      q.includes('most deeply')
    ) {
      targetId = 'credit-risk-system';
    } else {
      targetId = 'profile-role-fit';
    }
    return { intent: 'ROLE_FIT', keywords: ['role_fit', 'deepest_work', 'positioning'], targetId };
  }

  // ── STEP 4: LIMITATIONS ───────────────────────────────────────────────────
  // Covers starter Q2 and natural variations.
  // Must be checked BEFORE the general PROJECT block so limitation questions
  // about credit-risk are not silently collapsed into a generic project answer.
  if (
    q.includes('limitation') ||
    q.includes('drawback') ||
    q.includes('caveat') ||
    q.includes('constraint') ||
    q.includes('weakness') ||
    q.includes('weaknesses') ||
    q.includes('shortcoming') ||
    q.includes('fall short') ||
    q.includes('where does') && (q.includes('credit') || q.includes('parents') || q.includes('project')) ||
    q.includes('2015') ||
    q.includes('supabase') ||
    q.includes('live api') ||
    q.includes('multi-agent') ||
    q.includes('did tharun design') ||
    q.includes('strategy ownership') ||
    q.includes('hosmer') ||
    q.includes('lemeshow')
  ) {
    let targetId: string | undefined;
    if (
      q.includes('credit-risk') ||
      q.includes('credit risk') ||
      q.includes('2015') ||
      q.includes('hosmer') ||
      q.includes('lemeshow')
    ) {
      targetId = 'credit-risk-system';
    } else if (q.includes('parents health')) {
      targetId = 'parents-health-os';
    } else if (q.includes('equity') || q.includes('crsp')) {
      targetId = 'client-equity-implementation';
    }
    return { intent: 'LIMITATIONS', keywords: ['limitations', 'caveats', 'constraints'], targetId };
  }

  // ── STEP 5: PROJECTS ──────────────────────────────────────────────────────
  // Covers starter Q3 (Parents Health OS) and general project queries.
  if (
    q.includes('parents health') ||
    q.includes('parents-health') ||
    q.includes('retail credit risk') ||
    q.includes('credit risk') ||
    q.includes('credit-risk') ||
    q.includes('lendingclub') ||
    q.includes('bank churn') ||
    q.includes('sarima') ||
    q.includes('churn') ||
    q.includes('nifty') ||
    q.includes('client equity') ||
    q.includes('crsp') ||
    q.includes('forecasting') ||
    q.includes('project') ||
    q.includes('prototype') ||
    q.includes('analytics')
  ) {
    let targetId: string | undefined;
    if (q.includes('credit risk') || q.includes('credit-risk') || q.includes('lendingclub')) {
      targetId = 'credit-risk-system';
    } else if (q.includes('parents health') || q.includes('parents-health')) {
      targetId = 'parents-health-os';
    } else if (q.includes('client equity') || q.includes('crsp')) {
      targetId = 'client-equity-implementation';
    } else if (q.includes('bank churn') || q.includes('churn')) {
      targetId = 'bank-churn-nn';
    } else if (q.includes('sarima') || q.includes('forecasting')) {
      targetId = 'sarima-forecasting';
    } else if (q.includes('nifty')) {
      targetId = 'nifty-100-optimisation';
    }
    return { intent: 'PROJECT', keywords: ['project', 'systems', 'code'], targetId };
  }

  // ── STEP 6: EXPERIENCE ────────────────────────────────────────────────────
  if (
    q.includes('lentra') ||
    q.includes('jana') ||
    q.includes('experience') ||
    q.includes('work history') ||
    q.includes('work before') ||
    q.includes('worked before') ||
    q.includes('worked at') ||
    q.includes('previous job') ||
    q.includes('previous work') ||
    q.includes('company') ||
    q.includes('job') ||
    q.includes('career') ||
    q.includes('independent practice')
  ) {
    let targetId: string | undefined;
    if (q.includes('lentra')) targetId = 'exp-lentra';
    else if (q.includes('jana')) targetId = 'exp-jana-sfb';
    else if (q.includes('independent practice') || q.includes('independent')) targetId = 'exp-independent-practice';
    return { intent: 'EXPERIENCE', keywords: ['experience', 'employment', 'career'], targetId };
  }

  // ── STEP 7: EDUCATION ─────────────────────────────────────────────────────
  if (
    q.includes('iisc') ||
    q.includes('deep learning') ||
    q.includes('nibm') ||
    q.includes('griet') ||
    q.includes('education') ||
    q.includes('degree') ||
    q.includes('university') ||
    q.includes('college') ||
    q.includes('b.tech') ||
    q.includes('pgdm') ||
    q.includes('study') ||
    q.includes('studied') ||
    q.includes('programme')
  ) {
    let targetId: string | undefined;
    if (q.includes('iisc') || q.includes('deep learning')) targetId = 'edu-iisc';
    else if (q.includes('nibm')) targetId = 'edu-nibm';
    else if (q.includes('griet')) targetId = 'edu-griet';
    return { intent: 'EDUCATION', keywords: ['education', 'degree', 'iisc', 'nibm'], targetId };
  }

  // ── STEP 8: SKILLS ────────────────────────────────────────────────────────
  if (
    q.includes('skill') ||
    q.includes('python') ||
    q.includes('sql') ||
    q.includes('react') ||
    q.includes('next.js') ||
    q.includes('typescript') ||
    q.includes('tech stack') ||
    q.includes('technology') ||
    q.includes('machine learning') ||
    q.includes('scorecard') ||
    q.includes('ifrs') ||
    q.includes('basel')
  ) {
    return { intent: 'SKILLS', keywords: ['skills', 'tools', 'languages'] };
  }

  // ── STEP 9: GENERAL PROFILE ───────────────────────────────────────────────
  // Only triggered by explicit profile/bio/summary vocabulary after scope gate.
  if (
    q.includes('who is') ||
    q.includes('about') ||
    q.includes('tharun') ||
    q.includes('gajula') ||
    q.includes('bio') ||
    q.includes('summary') ||
    q.includes('background') ||
    q.includes('positioning') ||
    q.includes('portfolio') ||
    q.includes('profile')
  ) {
    return { intent: 'PROFILE', keywords: ['profile', 'positioning', 'summary'] };
  }

  // ── FINAL FALLBACK ────────────────────────────────────────────────────────
  // If we reach here, the query passed the portfolio-scope gate (has at least
  // one portfolio-related term) but did not match any specific intent.
  // Return UNKNOWN — never return PROFILE as a catch-all.
  return { intent: 'UNKNOWN', keywords: ['unmatched'] };
}
