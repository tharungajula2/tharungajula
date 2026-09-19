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

  // Claim 2: Offline-first claim
  if (
    (ansLower.includes('offline-first') || ansLower.includes('offline first')) &&
    !ansLower.includes('not offline-first') && !ansLower.includes('not offline first') && !ansLower.includes('never offline-first') && !ansLower.includes('is not offline-first')
  ) {
    forbiddenClaims.push('Offline-first claim (Parents Health OS is network-only)');
  }

  // Claim 3: Records held on-device claim
  if (
    (ansLower.includes('records held on-device') || ansLower.includes('on-device records') || ansLower.includes('records held on device')) &&
    !ansLower.includes('not held on-device') && !ansLower.includes('no on-device records') && !ansLower.includes('not on-device')
  ) {
    forbiddenClaims.push('Records held on-device claim');
  }

  // Claim 4: Exactly-once delivery claim
  if (
    (ansLower.includes('exactly-once delivery') || ansLower.includes('exactly once delivery')) &&
    !ansLower.includes('not established') && !ansLower.includes('no exactly-once') && !ansLower.includes('not guaranteed')
  ) {
    forbiddenClaims.push('Exactly-once delivery claim');
  }

  // Claim 5: Autonomous / always-running claim
  if (
    (ansLower.includes('autonomous') || ansLower.includes('always-running') || ansLower.includes('always running')) &&
    !ansLower.includes('not autonomous') && !ansLower.includes('never autonomous') && !ansLower.includes('not always-running')
  ) {
    forbiddenClaims.push('Autonomous / always-running claim');
  }

  // Claim 6: Location probability claim
  if (
    ansLower.includes('location probability') &&
    !ansLower.includes('not a probability') && !ansLower.includes('never a probability') && !ansLower.includes('never a location probability') && !ansLower.includes('does not produce')
  ) {
    forbiddenClaims.push('Location probability claim');
  }

  // Claim 7: Confidence score / percentage claim
  if (
    (ansLower.includes('confidence score') || ansLower.includes('confidence percentage')) &&
    !ansLower.includes('not a confidence') && !ansLower.includes('never a confidence') && !ansLower.includes('never a probability') && !ansLower.includes('does not produce')
  ) {
    forbiddenClaims.push('Confidence score claim');
  }

  // Claim 8: Fraud detection engine claim
  if (
    ansLower.includes('fraud detection engine') &&
    !ansLower.includes('not a fraud detection') && !ansLower.includes('is an address-consistency') && !ansLower.includes('address-consistency investigation')
  ) {
    forbiddenClaims.push('Fraud detection engine claim');
  }

  // Claim 9: Truth flag claim
  if (
    ansLower.includes('truth flag') &&
    !ansLower.includes('no truth flag') && !ansLower.includes('never a truth flag') && !ansLower.includes('there is no truth flag')
  ) {
    forbiddenClaims.push('Truth flag claim');
  }

  // Claim 10: GREEN AMBER RED claim
  if (
    (ansLower.includes('green amber red') || ansLower.includes('green/amber/red') || ansLower.includes('green, amber, red')) &&
    !ansLower.includes('not green') && !ansLower.includes('never green') && !ansLower.includes('not green/amber/red')
  ) {
    forbiddenClaims.push('GREEN AMBER RED decision claim');
  }

  // Claim 11: Consent-gated claim
  if (
    (ansLower.includes('consent-gated') || ansLower.includes('consent gated')) &&
    !ansLower.includes('no consent-gated') && !ansLower.includes('contains no consent') && !ansLower.includes('not consent-gated')
  ) {
    forbiddenClaims.push('Consent-gated claim');
  }

  // Claim 12: DPDP claim
  if (
    (ansLower.includes('dpdp compliant') || ansLower.includes('dpdp compliance') || ansLower.includes('dpdp aware') || ansLower.includes('dpdp')) &&
    !ansLower.includes('no dpdp') && !ansLower.includes('contains no dpdp')
  ) {
    forbiddenClaims.push('DPDP compliance claim');
  }

  // Claim 13: Tree challengers tested claim
  if (
    (ansLower.includes('tree challengers tested') || ansLower.includes('tree models were benchmarked') || ansLower.includes('benchmarked tree models') || ansLower.includes('tree models benchmarked')) &&
    !ansLower.includes('no tree challengers') && !ansLower.includes('not benchmarked') && !ansLower.includes('no tracked') && !ansLower.includes('were benchmarked')
  ) {
    forbiddenClaims.push('Tree challengers tested claim');
  }

  // Claim 14: Gemini analyst run live claim
  if (
    (ansLower.includes('gemini analyst') || ansLower.includes('gemini integration')) &&
    (ansLower.includes('run live') || ansLower.includes('has been run') || ansLower.includes('executed live') || ansLower.includes('verified live execution')) &&
    !ansLower.includes('unverified') && !ansLower.includes('not verified') && !ansLower.includes('no tracked live response')
  ) {
    forbiddenClaims.push('Gemini analyst run live claim');
  }


  // Claim 16: Production Multi-Agent Systems (Existing)
  if (
    ansLower.includes('production multi-agent') ||
    ansLower.includes('deployed langgraph') ||
    ansLower.includes('deployed mcp') ||
    ansLower.includes('production agentic framework')
  ) {
    forbiddenClaims.push('Production multi-agent deployment claim');
  }

  // Claim 17: Client Strategy Ownership (Existing)
  if (
    (ansLower.includes('designed the client\'s equity') || ansLower.includes('created the equity strategies') || ansLower.includes('designed the strategies')) &&
    !ansLower.includes('supplied by the client') && !ansLower.includes('client-supplied')
  ) {
    forbiddenClaims.push('Client equity strategy ownership claim (strategies were supplied by client)');
  }

  // Claim 18: Unqualified Hosmer-Lemeshow calibration pass (Existing)
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
