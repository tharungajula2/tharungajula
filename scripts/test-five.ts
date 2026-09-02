import { runAgentPipeline } from '../lib/agent/pipeline';

const FIVE_QUESTIONS = [
  "What is Tharun’s deepest body of work?",
  "Was the credit-risk OOT sample from 2015?",
  "Does Parents Health OS use Supabase?",
  "Did Tharun design the client equity strategies?",
  "What production multi-agent systems has he deployed?",
];

async function testFive() {
  console.log('=== EXACT ANSWERS FOR THE FIVE TEST QUESTIONS ===\n');
  for (let i = 0; i < FIVE_QUESTIONS.length; i++) {
    const q = FIVE_QUESTIONS[i];
    const res = await runAgentPipeline(q);
    console.log(`QUESTION ${i + 1}: ${q}`);
    console.log(`ANSWER:\n${res.answer}`);
    if (res.sources.length > 0) {
      console.log(`SOURCES: ${res.sources.map((s) => s.title).join(' | ')}`);
    }
    console.log(`REFUSED: ${res.refused} | VERIFIED: ${res.verified}`);
    console.log('----------------------------------------------------\n');
  }
}

testFive().catch(console.error);
