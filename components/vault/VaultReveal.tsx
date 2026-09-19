"use client";

import { motion } from "framer-motion";
import { FlaskConical } from "lucide-react";

export default function VaultReveal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-xl mx-auto pt-6 sm:pt-8 border-t border-hairline text-center space-y-4 select-text"
    >
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-semibold text-ink tracking-tight">
          Flagship build
        </h2>
        <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-md mx-auto">
          The first major app inside the Tharun Gajula Hive.
        </p>
      </div>

      <div className="pt-2">
        <button
          disabled
          className="bg-surface-sunken text-ink-muted border border-hairline font-sans text-xs font-medium px-4 py-2.5 rounded-lg cursor-not-allowed inline-flex items-center gap-2 opacity-70"
        >
          <FlaskConical className="w-3.5 h-3.5 text-ink-faint" />
          <span>Enter lab (In development)</span>
        </button>
      </div>
    </motion.div>
  );
}
