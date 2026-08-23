"use client";

import { AiConceptBadge, TeachingIllustrationBadge } from "./Badges";

const aiConcepts = [
  { concept: "1. LLM", rule: "Model ≠ application.", desc: "Generates or transforms language based on supplied context as one system component." },
  { concept: "2. RAG", rule: "Retrieve first, generate with context second.", desc: "Retrieves domain knowledge and injects it as context before LLM generation." },
  { concept: "3. WORKFLOW", rule: "Path designed in advance.", desc: "Developer-defined deterministic sequence when the execution path is known." },
  { concept: "4. AGENT", rule: "Model chooses allowed actions dynamically.", desc: "Model-directed loop observing state and choosing next action from allowed tools." },
  { concept: "5. TOOL", rule: "Model decides. Tool does.", desc: "External executable function (DB query, API call, calculator, file I/O)." },
  { concept: "6. GUARDRAIL", rule: "Code enforcement close to execution.", desc: "Constraint on input, output or tool action enforced deterministically in code." },
  { concept: "7. EVAL", rule: "Turn expectations into automated tests.", desc: "Fixed known test cases checking output quality and safety after system changes." },
  { concept: "8. TRACE", rule: "Linked record of observable run steps.", desc: "Sequence of steps, tool calls, and results for debugging and latency analysis." },
];

export default function AiSystemsSection() {
  return (
    <section id="ai-systems" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-cyan-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // SPECIALIZED LAYER — AI SYSTEMS ARCHITECTURE
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            08. AI Systems Architecture: Eight Core Concepts
          </h2>
          <AiConceptBadge />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          AI systems extend traditional software engineering by combining probabilistic language models with deterministic workflows, vector retrieval, tools, and code-level guardrails.
        </p>

        {/* 8 Concepts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs mb-8">
          {aiConcepts.map((ac) => (
            <div key={ac.concept} className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
              <span className="text-cyan-400 font-bold block mb-1">{ac.concept}</span>
              <div className="text-[10px] font-bold text-accent mb-1">// {ac.rule}</div>
              <p className="text-ink-muted text-[11px] leading-relaxed">{ac.desc}</p>
            </div>
          ))}
        </div>

        {/* AI System Stack Visual */}
        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl font-mono text-xs text-center mb-6">
          <div className="text-cyan-400 font-bold mb-3">// COMPUTE & REASONING STACK VISUAL</div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-ink-muted text-[11px]">
            <span className="bg-surface-raised p-2 rounded border border-hairline text-ink">USER</span>
            <span className="text-cyan-400">→</span>
            <span className="bg-surface-raised p-2 rounded border border-hairline text-ink">INTERFACE</span>
            <span className="text-cyan-400">→</span>
            <span className="bg-surface-raised p-2 rounded border border-hairline text-ink">WORKFLOW / AGENT</span>
            <span className="text-cyan-400">→</span>
            <span className="bg-cyan-500/10 text-cyan-300 p-2 rounded border border-cyan-500/30 font-bold">LLM (RAG / TOOLS / RULES)</span>
            <span className="text-cyan-400">→</span>
            <span className="bg-surface-raised p-2 rounded border border-hairline text-ink">OUTPUT</span>
            <span className="text-cyan-400">→</span>
            <span className="bg-surface-raised p-2 rounded border border-hairline text-ink">GUARDRAILS</span>
            <span className="text-cyan-400">→</span>
            <span className="bg-surface-raised p-2 rounded border border-hairline text-ink">TRACE & EVALS</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-cyan-400 font-bold block mb-1">LOGS</span>
            <p className="text-ink-muted text-[11px]">Record individual isolated system events.</p>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-cyan-400 font-bold block mb-1">TRACES</span>
            <p className="text-ink-muted text-[11px]">Connect full multi-step request runs.</p>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-cyan-400 font-bold block mb-1">EVALS</span>
            <p className="text-ink-muted text-[11px]">Judge system output quality against expected behavior.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
