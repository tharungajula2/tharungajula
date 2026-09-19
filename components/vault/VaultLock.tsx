"use client";

import { motion } from "framer-motion";
import { Lock, Unlock } from "lucide-react";
import { cn } from "@/lib/utils";

export type VaultState = "locked" | "unlocking" | "open" | "revealed";

interface VaultLockProps {
  state: VaultState;
}

export default function VaultLock({ state }: VaultLockProps) {
  const isLocked = state === "locked";
  const isUnlocking = state === "unlocking";
  const isRevealed = state === "revealed" || state === "open";

  return (
    <div className="flex flex-col items-center justify-center space-y-3 py-2 select-none">
      {/* LOCK GRAPHIC HOUSING */}
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={
            isUnlocking
              ? { scale: [1, 1.04, 1], rotate: [0, -2, 2, 0] }
              : { scale: 1 }
          }
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={cn(
            "w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center border transition-colors duration-200",
            isLocked && "bg-surface-sunken border-hairline text-ink-muted",
            (isUnlocking || isRevealed) && "bg-surface-raised border-hairline-strong text-ink"
          )}
        >
          {isRevealed || isUnlocking ? (
            <motion.div
              initial={{ opacity: 0.8, y: -1 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Unlock className="w-7 h-7 sm:w-8 sm:h-8 text-ink" />
            </motion.div>
          ) : (
            <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-ink-muted" />
          )}
        </motion.div>
      </div>

      {/* RESTRAINED METADATA TEXT */}
      <div className="text-center">
        <span className="text-xs font-sans text-ink-faint">
          {isLocked && "Vault secured"}
          {isUnlocking && "Unlocking…"}
          {isRevealed && "Unlocked"}
        </span>
      </div>
    </div>
  );
}
