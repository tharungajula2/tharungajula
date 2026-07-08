"use client";

import { motion } from "framer-motion";

export default function BlogPage() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pt-20 px-6">
      {/* Ambient background glow matching existing pages */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-gradient-to-tr from-cyan-500/10 via-emerald-500/5 to-transparent blur-[120px] pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center flex flex-col items-center"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="absolute w-2 h-2 rounded-full bg-cyan-400 animate-ping opacity-75" />
          </div>
          <span className="ml-3 text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase font-semibold">
            SYSTEM_UPDATING
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-widest uppercase mb-6 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
          Blog
        </h2>

        <div className="bg-black/50 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 rounded-3xl relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-lg mx-auto">
          <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light italic">
            Build logs and product notes are moving here.
          </p>
        </div>

        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
          className="mt-12 w-px h-16 bg-gradient-to-b from-cyan-400/50 to-transparent mx-auto"
        />
      </motion.div>
    </div>
  );
}
