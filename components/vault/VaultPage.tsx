"use client";

import { useState } from "react";
import VaultLock, { VaultState } from "./VaultLock";
import VaultAccessForm from "./VaultAccessForm";
import VaultReveal from "./VaultReveal";

export default function VaultPage() {
  const [vaultState, setVaultState] = useState<VaultState>("locked");

  const handleUnlockSuccess = () => {
    setVaultState("unlocking");

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const delay = prefersReducedMotion ? 50 : 750;

    setTimeout(() => {
      setVaultState("revealed");
    }, delay);
  };

  return (
    <div className="w-full max-w-2xl sm:max-w-[760px] mx-auto py-6 sm:py-12 px-2 sm:px-4">
      {/* PAGE HEADER */}
      <div className="mb-6 sm:mb-10 text-left">
        <h1 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight mb-2">
          Vault
        </h1>
        <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
          A protected space for the flagship build.
        </p>
      </div>

      {/* VAULT EXPERIENCE CONTAINER */}
      <div className="space-y-6">
        <VaultLock state={vaultState} />

        {vaultState !== "revealed" && vaultState !== "open" ? (
          <VaultAccessForm
            onUnlockSuccess={handleUnlockSuccess}
            isUnlocking={vaultState === "unlocking"}
          />
        ) : (
          <VaultReveal />
        )}
      </div>
    </div>
  );
}
