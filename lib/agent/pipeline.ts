import { classifyIntent } from './router';
import { retrieveEvidence } from './retrieve';
import { generateGroundedAnswer } from './generate';
import { verifyResponse } from './verify';
import { AgentResponse, EvidenceRecord } from './types';
import { PORTFOLIO_EVIDENCE } from '@/data/portfolio-evidence';

export async function runAgentPipeline(query: string, apiKey?: string): Promise<AgentResponse> {
  // STEP 1: INTENT ROUTING
  const intentResult = classifyIntent(query);

  // STEP 2: RETRIEVAL
  const retrievedEvidence = retrieveEvidence(query, intentResult);

  // REFUSAL FAST-PATH
  if (intentResult.intent === 'UNKNOWN' || retrievedEvidence.length === 0) {
    return {
      answer: "I don't have verified public evidence for that.",
      sources: [],
      evidenceIds: [],
      intent: intentResult.intent,
      verified: true,
      refused: true,
    };
  }

  // STEP 3: GROUNDED GENERATION (Pass 1)
  let generated = await generateGroundedAnswer(query, retrievedEvidence, intentResult, apiKey);

  // STEP 4: VERIFICATION (Pass 1)
  let verification = verifyResponse(generated.answer, retrievedEvidence, generated.evidenceIds);

  // RETRY IF VERIFICATION FAILED
  if (!verification.passed) {
    console.warn(`Verification failed on pass 1: ${verification.reason}. Retrying generation...`);
    const strictPrompt = `${query}\n(Note: State exact verified facts only. Do not claim unevidenced dates, backends, live APIs, or strategy ownership)`;
    generated = await generateGroundedAnswer(strictPrompt, retrievedEvidence, intentResult, apiKey);
    verification = verifyResponse(generated.answer, retrievedEvidence, generated.evidenceIds);
  }

  // FALLBACK REFUSAL IF VERIFICATION STILL FAILS
  if (!verification.passed) {
    return {
      answer: "I don't have verified public evidence for that.",
      sources: [],
      evidenceIds: [],
      intent: intentResult.intent,
      verified: false,
      refused: true,
    };
  }

  // STEP 5: ANSWER-LEVEL SOURCE FILTERING
  // Filter sources strictly to ONLY evidence records cited in generated.evidenceIds
  const citedEvidenceRecords: EvidenceRecord[] = [];
  generated.evidenceIds.forEach((id) => {
    const found = PORTFOLIO_EVIDENCE.find((e) => e.id === id);
    if (found && !citedEvidenceRecords.some((c) => c.id === found.id)) {
      citedEvidenceRecords.push(found);
    }
  });

  // If no specific IDs cited, fallback to top retrieved record only
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
    refused: generated.refused,
  };
}
