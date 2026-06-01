"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const explorationAreas = [
  {
    tag: "01",
    title: "ML/DL Foundations",
    description: "Neural networks, backpropagation, transformers, attention, embeddings, and model behavior.",
  },
  {
    tag: "02",
    title: "RAG & Context Engineering",
    description: "Retrieval, chunking, grounding, context selection, and failure analysis.",
  },
  {
    tag: "03",
    title: "Evals & Observability",
    description: "Custom evaluation sets, tracing, latency, cost, and quality checks for AI systems.",
  },
  {
    tag: "04",
    title: "Agents & Memory",
    description: "Tool calling, state, long-term memory, guardrails, and multi-step task loops.",
  },
  {
    tag: "05",
    title: "AI Product Judgment",
    description: "Data strategy, fallback paths, uncertainty, trust, and deciding when AI should not be used.",
  },
  {
    tag: "06",
    title: "Product Seed",
    description: "Turning one useful system into a real product with users, reliability, and a clear problem.",
  },
];

const futureProofOfWork = [
  {
    title: "From-scratch neural net + attention explainer",
    description: "An explainer validating deep mechanics of backpropagation and token weights, working beneath the API layer.",
  },
  {
    title: "Evaluated RAG system",
    description: "A production-grade retrieval system with documented failure metrics, pipeline tracing, and deterministic fallbacks.",
  },
  {
    title: "Agent with memory, evals, guardrails, and observability",
    description: "A multi-step autonomous loop utilizing persistent memory structures, behavioral guardrails, and observable task logging.",
  },
  {
    title: "Fine-tuned model for a narrow task",
    description: "A practical model tuning experiment focusing on behavior adaptation and performance boundaries using targeted parameter updates.",
  },
  {
    title: "One project pushed toward a real product",
    description: "A deployed application centered entirely on solving a specific, real-world user problem with measurable latency and cost tradeoffs.",
  },
];

const learningTracks = [
  "ML/DL Core",
  "RAG",
  "Evals",
  "Agents & Memory",
  "AI Product",
  "Systems Design",
];

const featuredNotes = [
  {
    title: "Why I am studying AI systems from the foundations again",
    type: "concept",
    status: "draft",
    summary: "Why returning to foundational ML mechanics matters more than collecting API wrapper demos.",
    track: "ml-dl-core",
  },
  {
    title: "Why evals matter more than demos",
    type: "evals",
    status: "draft",
    summary: "A demo shows something can work once. Evals help show how often it works.",
    track: "evals",
  },
  {
    title: "What I learned building JARVIZ Live",
    type: "build-log",
    status: "active",
    summary: "What on-device vision, browser voice, streaming model output, and Spline taught me.",
    track: "agents",
  },
];

const compactResources = [
  {
    title: "Neural Networks: Zero to Hero",
    author: "Andrej Karpathy",
    track: "ML/DL Core",
  },
  {
    title: "Attention Is All You Need",
    author: "Vaswani et al.",
    track: "Transformers",
  },
  {
    title: "Creating Evals for Generative AI",
    author: "Hamel Husain",
    track: "Evals",
  },
  {
    title: "Seven Failure Points in RAG Systems",
    author: "Barnett et al.",
    track: "RAG",
  },
];

export default function AgenticAIPage() {
  return (
    <div className="relative w-full max-w-4xl mx-auto py-32 px-6 pb-48 select-none">
      {/* Ambient background glow matching existing pages */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-gradient-to-tr from-cyan-500/5 via-emerald-500/5 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* ─── SECTION 1: HERO & VISION ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-16"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase opacity-70">
            // AGENTIC_AI_TRACK
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight uppercase mb-6">
          Agentic AI & Product Systems
        </h2>

        <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light mb-8 max-w-prose">
          The next phase of my work is focused on reliable AI systems, deeper ML/DL foundations, and product judgment for software that does not behave deterministically.
        </p>

        {/* Narrative Box */}
        <div className="bg-black/50 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 rounded-3xl relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase block mb-3 opacity-60">
            // OBJECTIVE
          </span>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light italic">
            My portfolio shows the systems I have built so far. This page shows the direction I am building toward next: evaluated AI workflows, agent memory, retrieval systems, observability, and product decisions for probabilistic software.
          </p>
        </div>
      </motion.div>

      {/* ─── SECTION 2: EXPLORATION AREAS ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-20"
      >
        <div className="flex items-center gap-3 mb-8">
          <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase opacity-70">
            // EXPLORATION_AREAS
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {explorationAreas.map((area) => (
            <div
              key={area.title}
              className="bg-black/50 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl group hover:border-white/20 transition-all duration-500 shadow-[0_15px_30px_rgba(0,0,0,0.3)] flex flex-col justify-between"
            >
              <div>
                <span className="text-cyan-400 text-[9px] tracking-widest font-mono uppercase block mb-3 opacity-50">
                  // {area.tag}
                </span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  {area.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed font-light">
                  {area.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ─── SECTION 3: FUTURE PROOF-OF-WORK SYSTEMS ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-20"
      >
        <div className="flex items-center gap-3 mb-8">
          <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase opacity-70">
            // FUTURE_PROOF_OF_WORK
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <div className="relative pl-6 border-l border-cyan-400/20 space-y-8">
          {futureProofOfWork.map((item, index) => (
            <div key={item.title} className="relative group">
              {/* Timeline dot */}
              <div className="absolute left-[-29px] top-1.5 w-2 h-2 rounded-full bg-cyan-400 border border-black shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-transform duration-300 group-hover:scale-125" />

              <span className="text-cyan-400 text-[9px] tracking-widest font-mono uppercase block mb-1 opacity-50">
                PROTOTYPE 0{index + 1}
              </span>
              <h4 className="text-sm font-bold text-white uppercase tracking-wide mb-1.5">
                {item.title}
              </h4>
              <p className="text-xs text-white/50 leading-relaxed font-light max-w-2xl">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ─── SECTION 4: CURRENT FOCUS ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-20 max-w-xl mx-auto"
      >
        <div className="bg-black/50 backdrop-blur-2xl border border-cyan-500/20 p-6 rounded-3xl flex items-start gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="relative flex items-center justify-center mt-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="absolute w-2 h-2 rounded-full bg-cyan-400 animate-ping opacity-75" />
          </div>
          <div>
            <span className="text-[9px] font-mono tracking-[0.25em] text-cyan-400 uppercase font-semibold block mb-1">
              CURRENT FOCUS
            </span>
            <p className="text-sm text-white/75 leading-relaxed font-light">
              I am building a neural network from scratch in Python, calculating backpropagation by hand, and writing basic tests to check if AI outputs are actually correct.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ─── SECTION 5: FIELD NOTES ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-20"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase opacity-70">
            // FIELD_NOTES
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-3">
            Working notes
          </h3>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light">
            These are public notes from the same track: what I am learning, what I am building, and what I get wrong. They will grow as the Agentic AI work becomes real proof.
          </p>
        </div>

        {/* Compact Learning Track Chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {learningTracks.map((track) => (
            <span
              key={track}
              className="px-3 py-1 rounded-lg text-[9px] sm:text-[10px] font-mono uppercase tracking-wider border bg-black/40 text-cyan-400 border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.05)]"
            >
              {track}
            </span>
          ))}
        </div>

        {/* 3 Featured Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {featuredNotes.map((note) => (
            <div
              key={note.title}
              className="bg-black/50 backdrop-blur-2xl border border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:border-white/20 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-white/5 text-white/60 border border-white/10 uppercase">
                    {note.type}
                  </span>
                  <span className="text-[8px] font-mono text-cyan-400/80 uppercase">
                    ● {note.status}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 line-clamp-2">
                  {note.title}
                </h4>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                  {note.summary}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Resources Sub-row */}
        <div className="border-t border-white/5 pt-6">
          <span className="text-[9px] tracking-[0.3em] font-mono uppercase text-white/40 block mb-4">
            // SELECTED_RESOURCES_I_TRUST
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {compactResources.map((res) => (
              <div
                key={res.title}
                className="bg-black/50 backdrop-blur-2xl border border-white/5 p-4 rounded-xl hover:border-white/10 transition-all duration-300"
              >
                <span className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                  {res.track}
                </span>
                <h5 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                  {res.title} <span className="text-white/40 font-normal italic lowercase">by {res.author}</span>
                </h5>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ─── SECTION 6: CLOSING PRINCIPLE ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center max-w-2xl mx-auto mt-24"
      >
        <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase block mb-4 opacity-50">
          // PRINCIPLE
        </span>
        <p className="text-xs sm:text-sm text-white/40 italic leading-relaxed font-light">
          The goal is not to collect tools. The goal is to understand the core, build reliable systems, and choose problems worth solving.
        </p>
      </motion.div>
    </div>
  );
}
