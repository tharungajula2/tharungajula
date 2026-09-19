import { IntentResult } from './types';

export function classifyIntent(query: string): IntentResult {
  const q = query.toLowerCase().trim();

  // 1. REFUSAL / UNKNOWN TRAPS
  const unknownPatterns = [
    'salary', 'compensation', 'pay', 'money', 'ctc', 'package',
    'private doc', 'private project',
    'weather', 'recipe', 'capital of', 'who won',
    'home address', 'phone number', 'personal email', 'multi-agent', 'multi agent',
    'production agent', 'tree model', 'tree challenger', 'benchmarked against'
  ];
  if (unknownPatterns.some((p) => q.includes(p))) {
    return { intent: 'UNKNOWN', keywords: ['unknown', 'refusal'] };
  }

  // 2. ROLE FIT & DEEPEST WORK
  if (
    q.includes('deepest body of work') ||
    q.includes('deepest work') ||
    q.includes('flagship') ||
    q.includes('strongest for') ||
    q.includes('kind of role') ||
    q.includes('target role') ||
    q.includes('role fit') ||
    q.includes('why hire') ||
    q.includes('what role')
  ) {
    let targetId: string | undefined;
    if (q.includes('deepest') || q.includes('flagship')) targetId = 'credit-risk-system';
    else targetId = 'profile-role-fit';
    return { intent: 'ROLE_FIT', keywords: ['role_fit', 'deepest_work', 'positioning'], targetId };
  }

  // 3. LIMITATIONS
  if (
    q.includes('limitation') ||
    q.includes('drawback') ||
    q.includes('caveat') ||
    q.includes('constraint') ||
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
    if (q.includes('credit-risk') || q.includes('credit risk') || q.includes('2015') || q.includes('hosmer') || q.includes('lemeshow')) targetId = 'credit-risk-system';
    else if (q.includes('parents health')) targetId = 'parents-health-os';
    else if (q.includes('equity') || q.includes('crsp')) targetId = 'client-equity-implementation';
    return { intent: 'LIMITATIONS', keywords: ['limitations', 'caveats', 'constraints'], targetId };
  }

  // 4. PROJECTS
  if (
    q.includes('parents health') ||
    q.includes('retail credit risk') ||
    q.includes('credit risk') ||
    q.includes('project') ||
    q.includes('flagship') ||
    q.includes('app') ||
    q.includes('prototype')
  ) {
    let targetId: string | undefined;
    if (q.includes('credit risk') || q.includes('credit-risk') || q.includes('deepest')) targetId = 'credit-risk-system';
    else if (q.includes('parents health')) targetId = 'parents-health-os';
    return { intent: 'PROJECT', keywords: ['project', 'systems', 'code'], targetId };
  }

  // 5. ANALYTICS
  if (
    q.includes('churn') ||
    q.includes('sarima') ||
    q.includes('forecasting') ||
    q.includes('nifty') ||
    q.includes('client equity') ||
    q.includes('crsp') ||
    q.includes('analytics')
  ) {
    return { intent: 'PROJECT', keywords: ['analytics', 'modelling', 'quant'] };
  }

  // 6. EXPERIENCE
  if (
    q.includes('lentra') ||
    q.includes('jana') ||
    q.includes('experience') ||
    q.includes('work history') ||
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

  // 7. EDUCATION
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
    q.includes('pgdm')
  ) {
    let targetId: string | undefined;
    if (q.includes('iisc') || q.includes('deep learning')) targetId = 'edu-iisc';
    else if (q.includes('nibm')) targetId = 'edu-nibm';
    else if (q.includes('griet')) targetId = 'edu-griet';
    return { intent: 'EDUCATION', keywords: ['education', 'degree', 'iisc', 'nibm'], targetId };
  }

  // 8. SKILLS
  if (
    q.includes('skill') ||
    q.includes('python') ||
    q.includes('sql') ||
    q.includes('react') ||
    q.includes('next.js') ||
    q.includes('tech stack') ||
    q.includes('technology')
  ) {
    return { intent: 'SKILLS', keywords: ['skills', 'tools', 'languages'] };
  }

  // 9. GENERAL PROFILE
  if (
    q.includes('who is') ||
    q.includes('about') ||
    q.includes('tharun') ||
    q.includes('bio') ||
    q.includes('summary') ||
    q.includes('background') ||
    q.includes('positioning')
  ) {
    return { intent: 'PROFILE', keywords: ['profile', 'positioning', 'summary'] };
  }

  // Fallback to PROFILE for general portfolio queries
  return { intent: 'PROFILE', keywords: ['portfolio', 'overview'] };
}
