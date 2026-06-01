"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// --- STATIC DATA DEFINITIONS (Safely filtering draft-private items) ---

const learningTracks = [
  { id: "all", label: "All Tracks" },
  { id: "ml-dl-core", label: "ML/DL Core" },
  { id: "transformers", label: "Transformers" },
  { id: "rag", label: "RAG" },
  { id: "evals", label: "Evals" },
  { id: "agents", label: "Agents & Memory" },
  { id: "ai-product", label: "AI Product" },
  { id: "systems-design", label: "Systems Design" },
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

const publicNotes = [
  {
    slug: "why-foundations-again",
    title: "Why I am studying AI systems from the foundations again",
    type: "concept",
    status: "draft",
    tags: ["ml-dl-core", "ai-product"],
    confidence: "Fairly-Sure",
    summary: "Why returning to foundational ML mechanics matters more than collecting API wrapper demos.",
    track: "ml-dl-core",
  },
  {
    slug: "prompt-engineering-vs-context-engineering",
    title: "Prompt engineering vs context engineering",
    type: "prompt-workflow",
    status: "seed",
    tags: ["prompt-workflow", "ai-product"],
    confidence: "Exploring",
    summary: "Prompt engineering is wording. Context engineering is deciding what the model sees at all. The second one matters more.",
    track: "ai-product",
  },
  {
    slug: "what-rag-solves",
    title: "What RAG actually solves — and what it does not",
    type: "rag",
    status: "draft",
    tags: ["rag", "systems-design"],
    confidence: "Fairly-Sure",
    summary: "Understanding exactly what retrieval-augmented generation solves and where it hits structural limitations.",
    track: "rag",
  },
  {
    slug: "why-evals-matter-more-than-demos",
    title: "Why evals matter more than demos",
    type: "evals",
    status: "draft",
    tags: ["evals", "ai-product"],
    confidence: "Fairly-Sure",
    summary: "A demo shows something can work once. Evals help show how often it works.",
    track: "evals",
  },
  {
    slug: "agents-memory-tool-calling",
    title: "Notes on agents, memory, and tool calling",
    type: "agent-memory",
    status: "seed",
    tags: ["agents", "memory"],
    confidence: "Exploring",
    summary: "Dissecting agent system memory partitions, tool selection bottlenecks, and cognitive planning loops.",
    track: "agents",
  },
  {
    slug: "jarviz-live-build-log",
    title: "What I learned building JARVIZ Live",
    type: "build-log",
    status: "active",
    tags: ["build-log", "portfolio", "systems-design"],
    confidence: "Confident",
    summary: "What on-device vision, browser voice, streaming model output, and Spline taught me.",
    track: "agents",
  },
  {
    slug: "what-i-need-to-understand-about-transformers",
    title: "What I need to understand about transformers",
    type: "concept",
    status: "draft",
    tags: ["transformers", "ml-dl-core"],
    confidence: "Exploring",
    summary: "Actually walking through attention math, weight dynamics, and positional encoders instead of using high-level libraries.",
    track: "transformers",
  },
  {
    slug: "ai-pm-designing-for-uncertainty",
    title: "AI PM notes: designing for uncertainty",
    type: "ai-product",
    status: "draft",
    tags: ["ai-product", "evals"],
    confidence: "Fairly-Sure",
    summary: "How to build interfaces, diagnostic alerts, and system boundaries around probabilistic models.",
    track: "ai-product",
  },
  {
    slug: "current-learning-stack",
    title: "My current learning stack",
    type: "resource",
    status: "active",
    tags: ["resources", "ml-dl-core"],
    confidence: "Confident",
    summary: "A small, curated stack of deep technical resources I am actively using.",
    track: "ml-dl-core",
  },
  {
    slug: "daily-knowledge-commit-system",
    title: "Daily knowledge commit system",
    type: "prompt-workflow",
    status: "active",
    tags: ["prompt-workflow", "build-log"],
    confidence: "Confident",
    summary: "How I use continuous small contributions to maintain this public technical notebook.",
    track: "ai-product",
  },
];

const publicResources = [
  {
    title: "Neural Networks: Zero to Hero",
    author: "Andrej Karpathy",
    status: "reading",
    track: "ml-dl-core",
    reason: "An exceptional, building-from-scratch journey through multi-layer perceptrons, backpropagation, and language models.",
  },
  {
    title: "Attention Is All You Need",
    author: "Vaswani et al.",
    status: "reading",
    track: "transformers",
    reason: "The foundational paper introducing the Transformer architecture, replacing recurrent models with parallelized self-attention.",
  },
  {
    title: "Creating Evals for Generative AI",
    author: "Hamel Husain",
    status: "reading",
    track: "evals",
    reason: "A practical guide to implementing robust model evaluations, replacing subjective vibe checks with systematic testing.",
  },
  {
    title: "Seven Failure Points in RAG Systems",
    author: "Barnett et al.",
    status: "reading",
    track: "rag",
    reason: "A diagnostic research study dissecting the seven primary friction points inside retrieval-augmented generation loops.",
  },
  {
    title: "Lost in the Middle",
    author: "Liu et al.",
    status: "reading",
    track: "rag",
    reason: "An essential study documenting how language models selectively process information at the boundaries of large context inputs.",
  },
];

const glossaryTerms = [
  {
    term: "Attention",
    definition: "Attention is a mathematical mechanism that allows a language model to compute correlations between different words (tokens) in a sentence, calculating dynamically which words are most relevant to one another regardless of their physical distance.",
    track: "transformers",
  },
  {
    term: "Embedding",
    definition: "An embedding is a process that translates discrete human-readable text tokens into lists of numbers (high-dimensional vectors). This places words with similar meanings or contexts physically closer to each other in a mathematical geometric space.",
    track: "ml-dl-core",
  },
  {
    term: "Context Window",
    definition: "A context window represents the total volume of input and output text (measured in tokens) that a generative model can actively process and remember during a single inference execution.",
    track: "transformers",
  },
  {
    term: "Retrieval-Augmented Generation (RAG)",
    definition: "RAG is a pipeline design pattern where a user query is first used to search an external vector database for relevant documents. These documents are then injected directly into the LLM system prompt to ground its response in factual sources.",
    track: "rag",
  },
  {
    term: "Evaluations (Evals)",
    definition: "Evaluations (evals) are structured, repeatable testing frameworks and datasets designed to measure the quality, accuracy, cost, and latency of a generative AI model's output against target benchmarks.",
    track: "evals",
  },
  {
    term: "Agent Memory",
    definition: "Agent memory represents the structured state architectures that allow autonomous agents to persist, retrieve, and update information across multiple steps of an execution loop or over multiple separate user sessions.",
    track: "agents",
  },
];

export default function FieldNotesPage() {
  const [selectedTrack, setSelectedTrack] = useState("all");

  const filteredNotes = selectedTrack === "all"
    ? publicNotes
    : publicNotes.filter(note => note.track === selectedTrack || note.tags.includes(selectedTrack));

  return (
    <div className="relative w-full max-w-4xl mx-auto py-32 px-6 pb-48 select-none">
      {/* Ambient background glow matching existing portfolio components */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-gradient-to-tr from-cyan-500/5 via-teal-500/5 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* ─── SECTION 1: HERO ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase opacity-70">
            // FIELD_NOTES
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight uppercase mb-6">
          Learning to build AI systems, in the open.
        </h2>

        <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light mb-8 max-w-2xl">
          A working notebook — what I am learning, what I am building, and what I get wrong.
        </p>

        {/* ─── SECTION 2: INTRO CARD ─── */}
        <div className="bg-black/50 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 rounded-3xl relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-8">
          <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase block mb-3 opacity-60">
            // NOTEBOOK_ROLE
          </span>
          <p className="text-sm sm:text-base text-white/75 leading-relaxed font-light">
            I am spending the next several months going deeper on how AI systems actually work: the ML/DL core, RAG, evals, agents, memory, and the product judgment around them. This is where I write it down as I go. Some notes are finished. Most are still growing. That is the point.
          </p>
        </div>

        {/* ─── SECTION 3: CURRENT FOCUS CARD ─── */}
        <div className="bg-black/50 backdrop-blur-2xl border border-cyan-500/20 p-6 rounded-3xl flex items-start gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="relative flex items-center justify-center mt-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="absolute w-2 h-2 rounded-full bg-cyan-400 animate-ping opacity-75" />
          </div>
          <div>
            <span className="text-[9px] font-mono tracking-[0.25em] text-cyan-400 uppercase font-semibold block mb-1">
              CURRENT FOCUS
            </span>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                ML/DL Foundations & Evals
              </span>
            </div>
            <p className="text-sm text-white/75 leading-relaxed font-light">
              I am building a neural network from scratch in Python, calculating backpropagation by hand, and writing basic tests to check if AI outputs are actually correct.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ─── SECTION 4: FEATURED NOTES ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-16"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase opacity-70">
            // FEATURED_NOTES
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </motion.div>

      {/* ─── SECTION 5: LEARNING TRACKS (FILTERING) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase opacity-70">
            // FILTER_BY_TRACK
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <div className="flex flex-wrap gap-2">
          {learningTracks.map((track) => (
            <button
              key={track.id}
              onClick={() => setSelectedTrack(track.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider border transition-all duration-200",
                selectedTrack === track.id
                  ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                  : "bg-black/40 text-white/50 border-white/5 hover:border-white/20 hover:text-white"
              )}
            >
              {track.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ─── SECTION 6: NOTES INDEX ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-16"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase opacity-70">
            // PUBLIC_NOTES_INDEX ({filteredNotes.length})
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredNotes.map((note) => (
              <motion.div
                layout
                key={note.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-black/50 backdrop-blur-2xl border border-white/10 p-5 rounded-2xl hover:border-white/20 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-white/5 text-white/60 border border-white/10 uppercase">
                      {note.type}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-cyan-500/5 text-cyan-400 border border-cyan-500/10 uppercase">
                      ● {note.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[9px] font-mono text-white/40">
                    <span>CONFIDENCE:</span>
                    <span className="text-cyan-400/80">{note.confidence}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white uppercase tracking-wider mb-2">
                  {note.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed font-light mb-3">
                  {note.summary}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {note.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-mono text-white/30">
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ─── SECTION 7: RESOURCES I TRUST ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-16"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase opacity-70">
            // RESOURCES_I_TRUST
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <div className="space-y-3">
          {publicResources.map((res) => (
            <div
              key={res.title}
              className="bg-black/50 backdrop-blur-2xl border border-white/5 p-4 rounded-xl flex flex-col sm:flex-row sm:items-start justify-between gap-4"
            >
              <div className="flex-1">
                <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                  {res.track} // {res.status}
                </span>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1.5">
                  {res.title} <span className="text-white/40 font-normal italic lowercase">by {res.author}</span>
                </h4>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                  {res.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ─── SECTION 8: GLOSSARY ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-16"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase opacity-70">
            // GLOSSARY
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {glossaryTerms.map((item) => (
            <div
              key={item.term}
              className="bg-black/50 backdrop-blur-2xl border border-white/5 p-5 rounded-xl hover:border-white/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  {item.term}
                </h4>
                <span className="text-[8px] font-mono text-cyan-400 uppercase">
                  {item.track}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                {item.definition}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ─── SECTION 9: CLOSING PRINCIPLE ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center max-w-md mx-auto pt-8 border-t border-white/5"
      >
        <p className="text-[10px] font-mono tracking-widest text-cyan-400/70 uppercase mb-2">
          // NOTEBOOK_CLOSING
        </p>
        <p className="text-xs sm:text-sm text-white/50 font-light italic leading-relaxed">
          "Notes change as I learn. If something here is wrong, it gets fixed. That is how a notebook should work."
        </p>
      </motion.div>
    </div>
  );
}
