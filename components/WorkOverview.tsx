"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const pillars = [
  {
    label: "Product Ownership",
    description: "Fintech product ownership — loan workflows, PRDs, and API integrations inside institutional banking.",
    proofs: [
      "B2B Loan Origination — Mapped workflows and managed PRDs across 12+ bank integrations at Lentra AI.",
      "Credit Risk Products — Built scoring models and loan workflows at Jana Small Finance Bank. Cut reporting turnaround by 30%.",
      "UAT & API Integration — Structured test suites and API specs across engineering, risk, and operations teams.",
    ],
  },
  {
    label: "Quantitative Systems",
    description: "Scoring models, neural networks, and forecasting engines built on financial data.",
    proofs: [
      "Credit Risk Modeling — WoE scorecards and default classifiers on Lending Club data.",
      "Prediction & Forecasting — Bank churn neural network, SARIMA demand forecasting.",
      "Portfolio Optimization — NIFTY 100 efficient frontier and Sharpe analysis.",
    ],
    link: {
      text: "View analytics portfolio →",
      href: "https://github.com/tharungajula2/Portfolio",
    },
  },
  {
    label: "AI Prototyping",
    description: "Functional AI products, built end to end — from user problem to working interface.",
    proofs: [
      "VIZIER — Multi-agent assistant with human-in-the-loop approval on every action.",
      "JARVIZ Live — AI portfolio cockpit with live chat, streaming responses, and guided UI state.",
      "Parents Health OS — Remote elder-care console with WhatsApp check-ins and doctor-ready briefs.",
      "Quant OS — Spatial knowledge graph for quant finance with a RAG-grounded AI terminal.",
      "Curiosity OS — Cognition lab with runnable playbooks and a 3D causal knowledge map.",
    ],
  },
  {
    label: "Adaptive Craft",
    description: "Interface development and product storytelling — clean experiences out of dense logic.",
    proofs: [
      "Product Development — Next.js, React, Tailwind.",
      "Spatial & Interface Design — Layouts that keep complex information readable.",
      "Visual & GTM Execution — Product walkthroughs and brand assets.",
    ],
  },
];

export default function WorkOverview() {
  const [showStack, setShowStack] = useState(false);
  return (
    <div className="relative w-full max-w-5xl mx-auto py-32 px-6 pb-40">
      {/* AMBIENT GLOW */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-gradient-to-tr from-cyan-500/5 via-emerald-500/5 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase opacity-70">
            // CAPABILITY_MAP
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase">
          What I Bring
        </h2>
      </motion.div>

      {/* 4 PILLAR CARDS */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
            className="bg-black/50 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col"
          >
            {/* Pillar Label */}
            <h3 className="text-base font-bold text-white tracking-wide uppercase mb-1">
              {pillar.label}
            </h3>
            <p className="text-xs text-white/50 leading-relaxed mb-4">
              {pillar.description}
            </p>

            {/* Proof Points */}
            <ul className="space-y-2 flex-1">
              {pillar.proofs.map((proof) => (
                <li
                  key={proof}
                  className="text-xs text-white/70 leading-relaxed flex items-start gap-2"
                >
                  <span className="text-cyan-400/60 mt-0.5 shrink-0">›</span>
                  {proof}
                </li>
              ))}
            </ul>

            {/* Optional Link */}
            {pillar.link && (
              <a
                href={pillar.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-[10px] font-mono text-cyan-400/70 hover:text-cyan-400 transition-colors tracking-wide"
              >
                {pillar.link.text}
              </a>
            )}
          </motion.div>
        ))}
      </div>

      {/* PRODUCTION STACK BLOCK */}
      <div className="relative z-10 flex flex-col items-center mb-12">
        <button
          onClick={() => setShowStack(!showStack)}
          className="text-[10px] font-mono tracking-[0.25em] text-cyan-400 bg-white/5 border border-cyan-400/20 px-5 py-2.5 rounded-full cursor-pointer hover:bg-cyan-400/10 hover:border-cyan-400/50 transition-all duration-300 uppercase select-none font-semibold text-center"
        >
          {showStack ? "Hide Production Stack" : "View Production Stack"}
        </button>

        <AnimatePresence>
          {showStack && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl bg-black/60 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-left"
            >
              <h4 className="text-xs font-bold text-white tracking-widest uppercase mb-3 font-mono border-b border-white/5 pb-2">
                // How I Build
              </h4>
              <ul className="space-y-2 text-xs text-white/70 font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <span><strong>Models:</strong> Claude 4.6 Sonnet, Gemini Flash 3.0</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <span><strong>Orchestration:</strong> Agentic Workflows, Model Context Protocol (MCP)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <span><strong>Backend/Data:</strong> FastAPI, Postgres + pgvector for RAG</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <span><strong>Frontend:</strong> Next.js, Tailwind, GSAP</span>
                </li>
                <li className="flex items-start gap-2 border-t border-white/5 pt-2 mt-2">
                  <span className="text-cyan-400">•</span>
                  <span className="italic text-white/50"><strong>Focus:</strong> Systems that solve a real problem and stay usable.</span>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SYNTHESIS LINE */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 text-sm text-white/40 italic leading-relaxed max-w-2xl mx-auto text-center font-light"
      >
        The quant background brings rigor. The fintech years bring product judgment. The lab brings speed. The craft makes it usable.
      </motion.p>
    </div>
  );
}
