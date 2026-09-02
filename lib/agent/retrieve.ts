import { PORTFOLIO_EVIDENCE } from '@/data/portfolio-evidence';
import { EvidenceRecord, IntentResult } from './types';

export function retrieveEvidence(query: string, intentResult: IntentResult): EvidenceRecord[] {
  if (intentResult.intent === 'UNKNOWN') {
    return [];
  }

  const q = query.toLowerCase();
  const queryTerms = q.split(/\s+/).filter((t) => t.length > 2);

  const scored = PORTFOLIO_EVIDENCE.map((record) => {
    let score = 0;

    // 1. Direct Target ID Match (Highest Priority)
    if (intentResult.targetId && record.id === intentResult.targetId) {
      score += 100;
    }

    // 2. Exact Title / Name Match
    if (q.includes(record.title.toLowerCase())) {
      score += 50;
    }

    // 3. Tag Matching
    record.tags.forEach((tag) => {
      const tagLower = tag.toLowerCase();
      if (q.includes(tagLower)) {
        score += 20;
      }
      queryTerms.forEach((term) => {
        if (tagLower.includes(term) && term.length > 3) {
          score += 5;
        }
      });
    });

    // 4. Intent Category Alignment
    switch (intentResult.intent) {
      case 'PROFILE':
        if (record.category === 'positioning') score += 30;
        break;
      case 'PROJECT':
        if (record.category === 'project' || record.category === 'analytics') score += 20;
        break;
      case 'EXPERIENCE':
        if (record.category === 'experience') score += 30;
        break;
      case 'EDUCATION':
        if (record.category === 'education') score += 30;
        break;
      case 'SKILLS':
        if (record.category === 'skills') score += 30;
        break;
      case 'ROLE_FIT':
        if (record.category === 'positioning' || record.id === 'credit-risk-system') {
          score += 25;
        }
        break;
      case 'LIMITATIONS':
        if (record.limitations && record.limitations.length > 0) score += 20;
        break;
    }

    return { record, score };
  });

  // Filter out non-matching records
  const candidates = scored.filter((item) => item.score > 15);
  if (candidates.length === 0) return [];

  // Sort by score descending
  candidates.sort((a, b) => b.score - a.score);

  const topScore = candidates[0].score;

  // IF TARGET ID WAS SPECIFIED: return ONLY target record + at most 1 closely related record
  if (intentResult.targetId) {
    const targetItem = candidates.find((c) => c.record.id === intentResult.targetId);
    if (targetItem) {
      const result = [targetItem.record];
      // Add a secondary record only if it has a high score relative to target (>= 40)
      const secondary = candidates.find(
        (c) => c.record.id !== intentResult.targetId && c.score >= 40
      );
      if (secondary) result.push(secondary.record);
      return result;
    }
  }

  // GENERAL RELEVANCE FILTERING: keep only records within 50% of top score
  const relativeThreshold = Math.max(25, topScore * 0.5);
  const filtered = candidates
    .filter((item) => item.score >= relativeThreshold)
    .map((item) => item.record);

  // Return at most 3 relevant records
  return filtered.slice(0, 3);
}
