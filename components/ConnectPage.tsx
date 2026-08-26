"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ConnectPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("tharun.gajula.2@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto py-24 sm:py-32 px-4 sm:px-6 pb-44 sm:pb-40">
      {/* AMBIENT GLOW */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-gradient-to-tr from-accent-glow via-accent-glow/5 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* ─── SECTION 1: THE PITCH ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-16"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-accent text-xs sm:text-[10px] font-semibold tracking-[0.4em] font-mono uppercase dark:opacity-70">
            // COLLABORATION
          </span>
          <div className="h-px flex-1 bg-hairline-faint" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight leading-tight uppercase mb-6">
          COLLABORATION
        </h2>

        <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-normal dark:font-light max-w-prose">
          I build decision systems end to end — the model, the guardrails, and the product around them. If something here is useful to you, get in touch.
        </p>
      </motion.div>

      {/* ─── SECTION 2: DIRECT LINKS ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-16"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-accent text-xs sm:text-[10px] font-semibold tracking-[0.4em] font-mono uppercase dark:opacity-70">
            // DIRECT_LINKS
          </span>
          <div className="h-px flex-1 bg-hairline-faint" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Email Card */}
          <div className="bg-surface-raised backdrop-blur-2xl border border-hairline p-5 sm:p-6 rounded-2xl group hover:border-hairline transition-all duration-500 shadow-[0_10px_30px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between">
            <div>
              <span className="text-xs sm:text-[10px] font-mono font-semibold tracking-[0.3em] text-ink-faint uppercase block mb-3">EMAIL</span>
              <a
                href="mailto:tharun.gajula.2@gmail.com"
                className="text-base sm:text-lg font-normal text-ink font-mono hover:text-accent transition-colors break-all leading-snug block"
              >
                tharun.gajula.2@gmail.com
              </a>
            </div>
            <button
              onClick={handleCopy}
              className="mt-6 w-full text-xs sm:text-[10px] font-mono font-semibold tracking-[0.2em] uppercase py-2 rounded-lg border border-hairline text-ink-faint hover:text-accent hover:border-accent-dim transition-all cursor-pointer"
            >
              {copied ? "✓ COPIED" : "[ COPY ]"}
            </button>
          </div>

          {/* LinkedIn Card */}
          <a
            href="https://linkedin.com/in/tharungajula"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface-raised backdrop-blur-2xl border border-hairline p-5 sm:p-6 rounded-2xl group hover:border-hairline transition-all duration-500 shadow-[0_10px_30px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between"
          >
            <div>
              <span className="text-xs sm:text-[10px] font-mono font-semibold tracking-[0.3em] text-ink-faint uppercase block mb-3">LINKEDIN</span>
              <span className="text-base sm:text-lg font-normal text-ink font-mono group-hover:text-accent transition-colors break-all leading-snug block">
                linkedin.com/in/tharungajula
              </span>
            </div>
            <div className="mt-6 w-full text-xs sm:text-[10px] font-mono font-semibold tracking-[0.2em] uppercase py-2 rounded-lg border border-hairline text-ink-faint group-hover:text-accent group-hover:border-accent-dim transition-all text-center">
              [ OPEN ↗ ]
            </div>
          </a>

          {/* GitHub Card */}
          <a
            href="https://github.com/tharungajula2"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface-raised backdrop-blur-2xl border border-hairline p-5 sm:p-6 rounded-2xl group hover:border-hairline transition-all duration-500 shadow-[0_10px_30px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between"
          >
            <div>
              <span className="text-xs sm:text-[10px] font-mono font-semibold tracking-[0.3em] text-ink-faint uppercase block mb-3">GITHUB</span>
              <span className="text-base sm:text-lg font-normal text-ink font-mono group-hover:text-accent transition-colors break-all leading-snug block">
                github.com/tharungajula2
              </span>
            </div>
            <div className="mt-6 w-full text-xs sm:text-[10px] font-mono font-semibold tracking-[0.2em] uppercase py-2 rounded-lg border border-hairline text-ink-faint group-hover:text-accent group-hover:border-accent-dim transition-all text-center">
              [ OPEN ↗ ]
            </div>
          </a>
        </div>
      </motion.div>

      {/* ─── SECTION 3: STATUS INDICATOR ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 flex items-center justify-center gap-2 mt-12"
      >
        <div className="w-2 h-2 rounded-full bg-signal animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
        <span className="text-[10px] sm:text-xs font-mono font-semibold text-ink-muted tracking-[0.15em] uppercase">
          Based in Bengaluru · Available immediately
        </span>
      </motion.div>
    </div>
  );
}
