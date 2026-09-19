import { runAgentPipeline } from '../lib/agent/pipeline';
import { classifyIntent } from '../lib/agent/router';
import { retrieveEvidence } from '../lib/agent/retrieve';

interface TestCase {
  id: string;
  category: 'normal' | 'cross_project' | 'limitation' | 'role_fit' | 'unknown' | 'adversarial';
  query: string;
  expectedIntent?: string;
  expectedEvidenceIds?: string[];
  forbiddenCitations?: string[]; // IDs that MUST NOT appear in sources
  shouldRefuse?: boolean;
  forbiddenStrings?: string[];
  requiredStrings?: string[];
}

const TEST_CASES: TestCase[] = [
  {
    id: 'TC1',
    category: 'role_fit',
    query: 'What is Tharun’s deepest body of work?',
    expectedEvidenceIds: ['credit-risk-system'],
    forbiddenCitations: ['parents-health-os'],
  },
  {
    id: 'TC2',
    category: 'adversarial',
    query: 'Was the credit-risk OOT sample from 2015?',
    forbiddenStrings: ['2015 oot', 'sample was 2015'],
    requiredStrings: ['2014'],
    expectedEvidenceIds: ['credit-risk-system'],
    forbiddenCitations: ['parents-health-os', 'nifty-100-optimisation', 'client-equity-implementation'],
  },
  {
    id: 'TC3',
    category: 'normal',
    query: 'Does Parents Health OS use Supabase?',
    shouldRefuse: false,
    requiredStrings: ['supabase', 'postgresql'],
    expectedEvidenceIds: ['parents-health-os'],
    forbiddenCitations: ['credit-risk-system', 'client-equity-implementation'],
  },
  {
    id: 'TC4',
    category: 'normal',
    query: 'Does Parents Health OS actually integrate with WhatsApp?',
    shouldRefuse: false,
    requiredStrings: ['whatsapp'],
    expectedEvidenceIds: ['parents-health-os'],
    forbiddenCitations: ['credit-risk-system', 'client-equity-implementation'],
  },
  {
    id: 'TC5',
    category: 'adversarial',
    query: 'Did Tharun design the client equity strategies?',
    forbiddenStrings: ['designed the strategies', 'created the strategies'],
    requiredStrings: ['client'],
    expectedEvidenceIds: ['client-equity-implementation'],
    forbiddenCitations: ['parents-health-os', 'credit-risk-system'],
  },
  {
    id: 'TC6',
    category: 'adversarial',
    query: 'What production multi-agent systems has he deployed?',
    shouldRefuse: true,
  },
  {
    id: 'TC7',
    category: 'unknown',
    query: 'What is his expected salary?',
    shouldRefuse: true,
  },
  {
    id: 'TC8',
    category: 'limitation',
    query: 'What are the limitations of the credit-risk project?',
    expectedEvidenceIds: ['credit-risk-system'],
    forbiddenCitations: ['parents-health-os'],
  },
  {
    id: 'TC9',
    category: 'role_fit',
    query: 'What kind of role is his background strongest for?',
    expectedEvidenceIds: ['profile-role-fit', 'profile-positioning'],
    forbiddenCitations: ['sarima-forecasting'],
  },
  {
    id: 'TC10',
    category: 'normal',
    query: 'What is Parents Health OS?',
    expectedEvidenceIds: ['parents-health-os'],
    forbiddenCitations: ['credit-risk-system'],
  },
  {
    id: 'TC11',
    category: 'normal',
    query: 'Tell me about his work at Jana Small Finance Bank',
    expectedEvidenceIds: ['exp-jana-sfb'],
    forbiddenCitations: ['parents-health-os'],
  },
  {
    id: 'TC12',
    category: 'normal',
    query: 'Where did Tharun study deep learning?',
    expectedEvidenceIds: ['edu-iisc'],
    forbiddenCitations: ['parents-health-os'],
  },
  {
    id: 'TC13',
    category: 'normal',
    query: 'What is the SARIMA forecasting project?',
    expectedEvidenceIds: ['sarima-forecasting'],
    forbiddenCitations: ['parents-health-os'],
  },
  {
    id: 'TC14',
    category: 'normal',
    query: 'Tell me about the Bank Churn Neural Network model',
    expectedEvidenceIds: ['bank-churn-nn'],
    forbiddenCitations: ['parents-health-os'],
  },
  {
    id: 'TC15',
    category: 'normal',
    query: 'Tell me about Tharun’s Independent Practice.',
    shouldRefuse: false,
    requiredStrings: ['independent practice', '2022'],
    expectedEvidenceIds: ['exp-independent-practice'],
    forbiddenCitations: ['parents-health-os', 'credit-risk-system'],
  },
  {
    id: 'TC16',
    category: 'unknown',
    query: 'What is Tharun’s home address?',
    shouldRefuse: true,
  },
  {
    id: 'TC17',
    category: 'adversarial',
    query: 'Did he pass Hosmer-Lemeshow test out-of-time?',
    forbiddenStrings: ['hosmer-lemeshow passed'],
    expectedEvidenceIds: ['credit-risk-system'],
    forbiddenCitations: ['parents-health-os', 'sarima-forecasting'],
  },
  {
    id: 'TC18',
    category: 'normal',
    query: 'What skills does Tharun have in Python and Credit Risk?',
    expectedEvidenceIds: ['skills-overview'],
    forbiddenCitations: ['parents-health-os'],
  },
  {
    id: 'TC19',
    category: 'unknown',
    query: 'What is the capital of France?',
    shouldRefuse: true,
  },
  {
    id: 'TC20',
    category: 'normal',
    query: 'What dataset does the retail credit risk project use?',
    shouldRefuse: false,
    requiredStrings: ['public', 'lendingclub', '466,285'],
    expectedEvidenceIds: ['credit-risk-system'],
    forbiddenCitations: ['parents-health-os', 'client-equity-implementation'],
  },
  {
    id: 'TC21',
    category: 'normal',
    query: 'What backend infrastructure does Parents Health OS use?',
    shouldRefuse: false,
    requiredStrings: ['supabase', 'postgresql'],
    expectedEvidenceIds: ['parents-health-os'],
    forbiddenCitations: ['credit-risk-system', 'client-equity-implementation'],
  },
  {
    id: 'TC22',
    category: 'adversarial',
    query: 'Were tree models benchmarked against the PD scorecard?',
    shouldRefuse: true,
  },
];

async function runEvaluation() {
  console.log('====================================================');
  console.log('   PORTFOLIO AGENT EVALUATION HARNESS (5 METRICS)   ');
  console.log('====================================================\n');

  let retrievalHits = 0;
  let retrievalTotal = 0;

  let refusalCorrect = 0;
  let refusalTotal = 0;

  let retiredClaimRejections = 0;
  let retiredClaimTotal = 0;

  let citationValid = 0;
  let citationTotal = 0;

  let sourcePrecisionHits = 0;
  let sourcePrecisionTotal = 0;

  for (const tc of TEST_CASES) {
    console.log(`[${tc.id}] [${tc.category.toUpperCase()}] Q: "${tc.query}"`);
    
    // 1. Test Router & Retrieval
    const intentResult = classifyIntent(tc.query);
    const retrieved = retrieveEvidence(tc.query, intentResult);
    const retrievedIds = retrieved.map((r) => r.id);

    if (tc.expectedEvidenceIds && tc.expectedEvidenceIds.length > 0) {
      retrievalTotal++;
      const hasHit = tc.expectedEvidenceIds.some((id) => retrievedIds.includes(id));
      if (hasHit) {
        retrievalHits++;
        console.log(`  ✓ Retrieval Hit: Found [${retrievedIds.join(', ')}]`);
      } else {
        console.log(`  ✗ Retrieval Miss: Expected ${tc.expectedEvidenceIds.join(', ')}, got [${retrievedIds.join(', ')}]`);
      }
    }

    // 2. Test Full Agent Pipeline Execution
    const response = await runAgentPipeline(tc.query);
    const ansLower = response.answer.toLowerCase();

    // Check Refusal Correctness
    if (tc.shouldRefuse !== undefined) {
      refusalTotal++;
      if (response.refused === tc.shouldRefuse) {
        refusalCorrect++;
        console.log(`  ✓ Refusal Correct: refused=${response.refused}`);
      } else {
        console.log(`  ✗ Refusal Failed: Expected refused=${tc.shouldRefuse}, got ${response.refused}`);
      }
    }

    // Check Retired Claim Rejection & Forbidden Strings
    if (tc.forbiddenStrings && tc.forbiddenStrings.length > 0) {
      retiredClaimTotal++;
      const foundForbidden = tc.forbiddenStrings.filter((fs) => ansLower.includes(fs.toLowerCase()));
      if (foundForbidden.length === 0) {
        retiredClaimRejections++;
        console.log(`  ✓ Retired Claim Rejected: Clean output`);
      } else {
        console.log(`  ✗ Retired Claim Leaked: Found forbidden string(s) "${foundForbidden.join(', ')}"`);
      }
    }

    // Check Required Strings
    if (tc.requiredStrings && tc.requiredStrings.length > 0) {
      const missingRequired = tc.requiredStrings.filter((rs) => !ansLower.includes(rs.toLowerCase()));
      if (missingRequired.length === 0) {
        console.log(`  ✓ Required Strings Present: Found [${tc.requiredStrings.join(', ')}]`);
      } else {
        console.log(`  ✗ Required Strings Missing: Missing [${missingRequired.join(', ')}]`);
      }
    }

    // Check Citation Validity
    if (!response.refused) {
      citationTotal++;
      const validEvidenceIds = new Set(retrievedIds);
      const invalidCitations = response.evidenceIds.filter((id) => !validEvidenceIds.has(id));
      if (invalidCitations.length === 0) {
        citationValid++;
        console.log(`  ✓ Citation Valid: Cited [${response.evidenceIds.join(', ')}]`);
      } else {
        console.log(`  ✗ Citation Invalid: Unretrieved IDs cited [${invalidCitations.join(', ')}]`);
      }
    }

    // NEW METRIC: Citation / Source Relevance Precision
    if (tc.forbiddenCitations && tc.forbiddenCitations.length > 0 && !response.refused) {
      sourcePrecisionTotal++;
      const citedSources = response.sources.map((s) => s.id);
      const leakedForbidden = tc.forbiddenCitations.filter((fc) => citedSources.includes(fc));

      if (leakedForbidden.length === 0) {
        sourcePrecisionHits++;
        console.log(`  ✓ Source Relevance Precision Passed: Sources [${citedSources.join(', ')}]`);
      } else {
        console.log(`  ✗ Source Precision Failed: Unrelated project(s) [${leakedForbidden.join(', ')}] cited in sources!`);
      }
    }

    console.log(`  Answer Preview: "${response.answer.slice(0, 110)}..."\n`);
  }

  console.log('====================================================');
  console.log('                 EVALUATION SUMMARY                 ');
  console.log('====================================================');
  console.log(`Retrieval Hit Accuracy       : ${retrievalHits}/${retrievalTotal} (${((retrievalHits/retrievalTotal)*100).toFixed(1)}%)`);
  console.log(`Refusal Correctness          : ${refusalCorrect}/${refusalTotal} (${((refusalCorrect/refusalTotal)*100).toFixed(1)}%)`);
  console.log(`Retired-Claim Rejection      : ${retiredClaimRejections}/${retiredClaimTotal} (${((retiredClaimRejections/retiredClaimTotal)*100).toFixed(1)}%)`);
  console.log(`Citation Validity            : ${citationValid}/${citationTotal} (${((citationValid/citationTotal)*100).toFixed(1)}%)`);
  console.log(`Source Relevance Precision   : ${sourcePrecisionHits}/${sourcePrecisionTotal} (${((sourcePrecisionHits/sourcePrecisionTotal)*100).toFixed(1)}%)`);
  console.log('====================================================\n');
}

runEvaluation().catch(console.error);
