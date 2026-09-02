import { EvidenceRecord, VerificationResult } from './types';

export function verifyResponse(
  answer: string,
  retrievedEvidence: EvidenceRecord[],
  citedIds: string[]
): VerificationResult {
  const ansLower = answer.toLowerCase();
  const forbiddenClaims: string[] = [];

  // 1. Check Citation Existence & Retrieval Inclusion
  const retrievedIds = new Set(retrievedEvidence.map((e) => e.id));
  const invalidCitations = citedIds.filter((id) => !retrievedIds.has(id));
  if (invalidCitations.length > 0) {
    return {
      passed: false,
      reason: `Unretrieved or invalid citation IDs found: ${invalidCitations.join(', ')}`,
    };
  }

  // 2. Check Citation Lexical & Entity Relevance
  for (const id of citedIds) {
    const record = retrievedEvidence.find((e) => e.id === id);
    if (record) {
      const titleLower = record.title.toLowerCase();
      // Check if title or key tags appear in either answer text or retrieved context
      const tagMatch = record.tags.some((tag) => ansLower.includes(tag.toLowerCase()) || titleLower.includes(tag.toLowerCase()));
      if (!tagMatch && !ansLower.includes(record.id.toLowerCase())) {
        return {
          passed: false,
          reason: `Cited evidence ID "${id}" lacks lexical/entity relevance to answer`,
        };
      }
    }
  }

  // 3. Check Forbidden / Retired Claims

  // Claim 1: Asserting that OOT sample was 2015 or used 2015 data
  if (
    (ansLower.includes('oot sample was 2015') || ansLower.includes('2015 oot sample') || ansLower.includes('2015 vintage for oot') || ansLower.includes('oot sample from 2015')) &&
    !ansLower.includes('not 2015') && !ansLower.includes('does not contain 2015') && !ansLower.includes('never 2015')
  ) {
    forbiddenClaims.push('2015 OOT sample claim (OOT sample is 2014 vintage)');
  }

  // Claim 2: Parents Health OS Supabase / PostgreSQL backend
  if (
    (ansLower.includes('parents health') || ansLower.includes('parents health os')) &&
    (ansLower.includes('uses supabase') || ansLower.includes('postgresql backend') || ansLower.includes('connected supabase') || ansLower.includes('live database'))
  ) {
    forbiddenClaims.push('Parents Health OS connected backend claim (it is offline-first with on-device records)');
  }

  // Claim 3: LOC-IQ Live APIs
  if (
    (ansLower.includes('loc-iq') || ansLower.includes('location intelligence')) &&
    (ansLower.includes('fetches 46 apis live') || ansLower.includes('calls 46 apis live') || ansLower.includes('live api fetching') || ansLower.includes('connects to live apis'))
  ) {
    forbiddenClaims.push('LOC-IQ live API fetching claim (APIs are catalogued, scenarios run on synthetic demo data)');
  }

  // Claim 4: DPDP Compliance
  if (ansLower.includes('dpdp compliant') || ansLower.includes('dpdp compliance') || ansLower.includes('dpdp aware')) {
    forbiddenClaims.push('DPDP compliance claim');
  }

  // Claim 5: Production Multi-Agent Systems
  if (
    ansLower.includes('production multi-agent') ||
    ansLower.includes('deployed langgraph') ||
    ansLower.includes('deployed mcp') ||
    ansLower.includes('production agentic framework')
  ) {
    forbiddenClaims.push('Production multi-agent deployment claim');
  }

  // Claim 6: Client Strategy Ownership
  if (
    (ansLower.includes('designed the client\'s equity') || ansLower.includes('created the equity strategies') || ansLower.includes('designed the strategies')) &&
    !ansLower.includes('supplied by the client') && !ansLower.includes('client-supplied')
  ) {
    forbiddenClaims.push('Client equity strategy ownership claim (strategies were supplied by client)');
  }

  // Claim 7: Unqualified Hosmer-Lemeshow calibration pass
  if (ansLower.includes('hosmer-lemeshow passed') || ansLower.includes('passed hosmer-lemeshow')) {
    if (!ansLower.includes('sample size') && !ansLower.includes('fails out-of-time') && !ansLower.includes('test sample')) {
      forbiddenClaims.push('Unqualified Hosmer-Lemeshow calibration claim');
    }
  }

  if (forbiddenClaims.length > 0) {
    return {
      passed: false,
      reason: `Forbidden claim(s) detected: ${forbiddenClaims.join('; ')}`,
      forbiddenClaimsFound: forbiddenClaims,
    };
  }

  return { passed: true };
}
