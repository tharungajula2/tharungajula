"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { buildLog } from "@/data/buildlog";

export default function ConnectPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("tharun.gajula.2@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto py-32 px-6 pb-40">
      {/* AMBIENT GLOW */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-gradient-to-tr from-cyan-500/5 via-emerald-500/5 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* ─── SECTION 1: THE PITCH ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-16"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase opacity-70">
            // SIGNAL_OPEN
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight uppercase mb-6">
          OPEN TO MEANINGFUL WORK
        </h2>

        <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light max-w-prose">
          Seeking high-ownership Product Management, AI PM, or 0-to-1 PM roles at early-stage startups in Bengaluru. I thrive in ambiguous environments, translating complex business processes and high-friction quantitative logic into simple, pixel-perfect user experiences. If you need a high-agency builder to go from abstract systems design to shipped product architecture — let&apos;s talk.
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
          <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase opacity-70">
            // DIRECT_LINKS
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Email Card */}
          <div className="bg-black/50 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl group hover:border-white/20 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <span className="text-[9px] font-mono tracking-[0.3em] text-white/30 uppercase block mb-3">EMAIL</span>
            <a
              href="mailto:tharun.gajula.2@gmail.com"
              className="text-sm text-white/80 font-mono hover:text-cyan-400 transition-colors break-all leading-relaxed"
            >
              tharun.gajula.2@gmail.com
            </a>
            <button
              onClick={handleCopy}
              className="mt-4 w-full text-[9px] font-mono tracking-[0.2em] uppercase py-2 rounded-lg border border-white/10 text-white/40 hover:text-cyan-400 hover:border-cyan-400/30 transition-all cursor-pointer"
            >
              {copied ? "✓ COPIED" : "[ COPY ]"}
            </button>
          </div>

          {/* LinkedIn Card */}
          <a
            href="https://linkedin.com/in/tharungajula"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black/50 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl group hover:border-white/20 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] block"
          >
            <span className="text-[9px] font-mono tracking-[0.3em] text-white/30 uppercase block mb-3">LINKEDIN</span>
            <span className="text-sm text-white/80 font-mono group-hover:text-cyan-400 transition-colors break-all leading-relaxed">
              linkedin.com/in/tharungajula
            </span>
            <div className="mt-4 w-full text-[9px] font-mono tracking-[0.2em] uppercase py-2 rounded-lg border border-white/10 text-white/40 group-hover:text-cyan-400 group-hover:border-cyan-400/30 transition-all text-center">
              [ OPEN ↗ ]
            </div>
          </a>

          {/* GitHub Card */}
          <a
            href="https://github.com/tharungajula2"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black/50 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl group hover:border-white/20 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] block"
          >
            <span className="text-[9px] font-mono tracking-[0.3em] text-white/30 uppercase block mb-3">GITHUB</span>
            <span className="text-sm text-white/80 font-mono group-hover:text-cyan-400 transition-colors break-all leading-relaxed">
              github.com/tharungajula2
            </span>
            <div className="mt-4 w-full text-[9px] font-mono tracking-[0.2em] uppercase py-2 rounded-lg border border-white/10 text-white/40 group-hover:text-cyan-400 group-hover:border-cyan-400/30 transition-all text-center">
              [ OPEN ↗ ]
            </div>
          </a>
        </div>
      </motion.div>

      {/* ─── SECTION 3: RESUME DOWNLOAD ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-16"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase opacity-70">
            // RESUME
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <a
          href="/Tharun_Gajula_Resume.pdf"
          download
          className="flex items-center justify-center w-full bg-white/5 border border-white/10 hover:bg-white hover:text-black text-white transition-all text-xs sm:text-sm font-mono py-4 rounded-2xl tracking-[0.3em] uppercase group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          [ DOWNLOAD RESUME ]
        </a>
      </motion.div>

      {/* ─── SECTION 4: BUILD LOG ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-16"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase opacity-70">
            // BUILD_LOG
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <p className="text-white/60 font-mono text-sm mb-6">
          {buildLog.length} days of building
        </p>

        <div className="space-y-3">
          {[...buildLog]
            .sort((a, b) => b.day - a.day)
            .slice(0, 10)
            .map((entry) => (
              <div
                key={entry.day}
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-cyan-400 text-xs tracking-widest">
                    DAY {entry.day}
                  </span>
                  <span className="text-white/30 text-xs">{entry.date}</span>
                </div>
                <p className="text-white/90 text-sm mt-2">{entry.title}</p>
                <p className="text-white/50 text-xs mt-2 italic">
                  Learned: {entry.learned}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-white/10 text-white/40 text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {buildLog.length > 10 && (
          <p className="text-white/20 text-xs font-mono text-center mt-4">
            Showing latest 10 of {buildLog.length}
          </p>
        )}
      </motion.div>

      {/* ─── SECTION 5: STATUS INDICATOR ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10 flex items-center justify-center gap-2"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
        <span className="text-[10px] font-mono text-white/40 tracking-[0.15em]">
          Currently based in Bengaluru, India · Available immediately
        </span>
      </motion.div>
    </div>
  );
}
