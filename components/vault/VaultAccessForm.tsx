"use client";

import React, { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const VAULT_PASSCODE = "0327";

interface VaultAccessFormProps {
  onUnlockSuccess: () => void;
  isUnlocking: boolean;
}

export default function VaultAccessForm({
  onUnlockSuccess,
  isUnlocking,
}: VaultAccessFormProps) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isUnlocking) return;

    const candidate = passcode.trim();

    if (candidate !== VAULT_PASSCODE) {
      setError("Incorrect passcode.");
      return;
    }

    setError("");
    onUnlockSuccess();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
    setPasscode(val);
    if (error) setError("");
  };

  return (
    <form
      onSubmit={handleUnlock}
      className="w-full max-w-sm mx-auto flex flex-col items-center space-y-4 py-2"
    >
      <div className="w-full text-center">
        <label
          htmlFor="vault-passcode-input"
          className="text-xs font-semibold uppercase tracking-wider text-ink-faint block mb-2"
        >
          Passcode
        </label>

        {/* VISUAL 4-DIGIT CELLS */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex justify-center gap-2 sm:gap-3 cursor-text my-1"
        >
          {[0, 1, 2, 3].map((index) => {
            const char = passcode[index];
            const isFocused =
              passcode.length === index ||
              (passcode.length === 4 && index === 3);

            return (
              <div
                key={index}
                className={cn(
                  "w-11 h-12 sm:w-12 sm:h-13 rounded-lg border flex items-center justify-center font-mono text-base sm:text-lg font-semibold transition-all select-none",
                  char
                    ? "border-hairline-strong bg-surface-raised text-ink"
                    : "border-hairline bg-surface-sunken text-ink-faint",
                  isFocused && !isUnlocking && "ring-1 ring-ink/30 border-ink/40"
                )}
              >
                {char || <span className="w-1.5 h-1.5 rounded-full bg-ink-faint/30" />}
              </div>
            );
          })}
        </div>

        {/* ACCESSIBLE REAL INPUT */}
        <input
          ref={inputRef}
          id="vault-passcode-input"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          autoComplete="off"
          value={passcode}
          onChange={handleChange}
          disabled={isUnlocking}
          className="sr-only"
        />
      </div>

      {/* INLINE ERROR MESSAGE */}
      {error && (
        <div
          role="alert"
          className="text-xs font-sans text-ink-muted text-center font-medium transition-opacity"
        >
          {error}
        </div>
      )}

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={passcode.trim().length !== 4 || isUnlocking}
        className="w-full sm:w-auto min-w-[140px] bg-ink text-surface-raised hover:bg-ink/90 disabled:opacity-25 disabled:cursor-not-allowed font-sans text-xs font-medium px-4 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
      >
        <span>Unlock vault</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </form>
  );
}
