"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    label: "Quantitative Systems",
    description: "Scoring models, neural networks, and forecasting on real financial data.",
    proofs: [
      "Credit risk analytics (PD/LGD/EAD) — Jana Small Finance Bank",
      "Bank churn prediction — neural networks",
      "Antidiabetic medicine forecasting — time-series",
      "NIFTY 100 portfolio optimization",
      "Lending Club credit risk modeling",
    ],
    link: {
      text: "View analytics portfolio →",
      href: "https://github.com/tharungajula2/Portfolio",
    },
  },
  {
    label: "Product & Ops",
    description: "Shipped lending products, translated business to tech, ran operations.",
    proofs: [
      "B2B loan origination systems — Lentra AI",
      "Credit risk frameworks across Retail & SME portfolios",
      "Stakeholder management across 12+ bank integrations",
      "30% turnaround reduction in credit decisioning",
    ],
  },
  {
    label: "AI-Native Building",
    description: "5 full-stack prototypes in 90 days. Research-backed, design-led.",
    proofs: [
      "Mila — psychology-backed dating (3-layer matching algorithm)",
      "Trellis — therapy-client matching (52-variable algorithm)",
      "Yukti OS — geriatric care system",
      "Curiosity OS — 147-node knowledge pedagogy",
      "IISc Deep Learning programme — 92%",
    ],
  },
  {
    label: "Adaptive Craft",
    description: "Visual design, video, web — whatever the problem needs, learned on the spot.",
    proofs: [
      "Web design & development (Next.js, React, Tailwind)",
      "Visual design (Canva, image editing, brand systems)",
      "Video editing & Loom production",
      "Systems thinking across unfamiliar domains",
    ],
  },
];

export default function WorkOverview() {
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

      {/* SYNTHESIS LINE */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 text-sm text-white/40 italic leading-relaxed max-w-2xl mx-auto text-center font-light"
      >
        These work together. The analytics gives me rigor. The product work gives me judgment.
        The AI building gives me speed. The craft makes it all presentable.
      </motion.p>
    </div>
  );
}
