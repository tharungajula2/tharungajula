import { classifyIntent } from './router';
import { retrieveEvidence } from './retrieve';
import { generateGroundedAnswer, SCOPED_FALLBACK } from './generate';
import { verifyResponse } from './verify';
import { AgentResponse, EvidenceRecord } from './types';
import { PORTFOLIO_EVIDENCE } from '@/data/portfolio-evidence';

// ---------------------------------------------------------------------------
// Minimum relevance score threshold for retrieved evidence to be considered
// meaningful enough to proceed to generation.
// Evidence scoring is driven by router.ts targetId, tag overlap, and category
// alignment. A score of 0 from retrieveEvidence means no evidence was found.
// ---------------------------------------------------------------------------
const MIN_EVIDENCE_REQUIRED = 1;

export async function runAgentPipeline(query: string, apiKey?: string): Promise<AgentResponse> {
  // ── STEP 1: INTENT ROUTING ────────────────────────────────────────────────
  const intentResult = classifyIntent(query);

  // ── GROUNDING GATE A: UNKNOWN INTENT ─────────────────────────────────────
  // If the router could not map the query to a known portfolio intent,
  // refuse immediately — no evidence lookup, no generation.
  if (intentResult.intent === 'UNKNOWN') {
    return {
      answer: SCOPED_FALLBACK,
      sources: [],
      evidenceIds: [],
      intent: intentResult.intent,
      verified: true,
      refused: true,
      generationFailed: false,
    };
  }

  // ── STEP 2: RETRIEVAL ─────────────────────────────────────────────────────
  const retrievedEvidence = retrieveEvidence(query, intentResult);

  // ── GROUNDING GATE B: NO RELEVANT EVIDENCE ────────────────────────────────
  // Retrieval returned nothing — no fabricated answer, no biography fallback.
  if (retrievedEvidence.length < MIN_EVIDENCE_REQUIRED) {
    return {
      answer: SCOPED_FALLBACK,
      sources: [],
      evidenceIds: [],
      intent: intentResult.intent,
      verified: true,
      refused: true,
      generationFailed: false,
    };
  }

  // ── STEP 3: GROUNDED GENERATION (Pass 1) ─────────────────────────────────
  let generated = await generateGroundedAnswer(query, retrievedEvidence, intentResult, apiKey);

  // If generation itself decided to refuse (e.g. adversarial override returned SCOPED_FALLBACK),
  // propagate without going through the verification loop.
  if (generated.refused) {
    return {
      answer: generated.answer,
      sources: [],
      evidenceIds: [],
      intent: intentResult.intent,
      verified: true,
      refused: true,
      generationFailed: false,
    };
  }

  // ── STEP 4: VERIFICATION (Pass 1) ────────────────────────────────────────
  let verification = verifyResponse(generated.answer, retrievedEvidence, generated.evidenceIds);

  // ── RETRY IF VERIFICATION FAILED ─────────────────────────────────────────
  if (!verification.passed) {
    console.warn(`Verification failed on pass 1: ${verification.reason}. Retrying generation...`);
    const strictPrompt = `${query}\n(Note: State exact verified facts only. Do not claim unevidenced dates, backends, live APIs, or strategy ownership)`;
    generated = await generateGroundedAnswer(strictPrompt, retrievedEvidence, intentResult, apiKey);
    verification = verifyResponse(generated.answer, retrievedEvidence, generated.evidenceIds);
  }

  // ── FALLBACK REFUSAL IF VERIFICATION STILL FAILS ─────────────────────────
  if (!verification.passed) {
    return {
      answer: SCOPED_FALLBACK,
      sources: [],
      evidenceIds: [],
      intent: intentResult.intent,
      verified: false,
      refused: true,
      generationFailed: false,
    };
  }

  // ── STEP 5: ANSWER-LEVEL SOURCE FILTERING ────────────────────────────────
  // Only attach sources for records explicitly cited in generated.evidenceIds.
  const citedEvidenceRecords: EvidenceRecord[] = [];
  generated.evidenceIds.forEach((id) => {
    const found = PORTFOLIO_EVIDENCE.find((e) => e.id === id);
    if (found && !citedEvidenceRecords.some((c) => c.id === found.id)) {
      citedEvidenceRecords.push(found);
    }
  });

  // If no specific IDs were cited, fall back to the top retrieved record only
  if (citedEvidenceRecords.length === 0 && retrievedEvidence.length > 0) {
    citedEvidenceRecords.push(retrievedEvidence[0]);
  }

  const sources = citedEvidenceRecords.map((e) => ({
    id: e.id,
    title: e.title,
    url: e.publicUrl,
  }));

  return {
    answer: generated.answer,
    sources,
    evidenceIds: citedEvidenceRecords.map((e) => e.id),
    intent: intentResult.intent,
    verified: true,
    refused: false,
    generationFailed: generated.generationFailed,
  };
}
