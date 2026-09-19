import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";

export default function VaultEntry() {
  return (
    <Link
      href="/vault"
      className="group flex items-center justify-between p-4 sm:p-5 rounded-lg border border-hairline bg-surface-raised hover:bg-surface-sunken/50 hover:border-hairline-strong transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)] select-none"
    >
      <div className="flex items-center gap-3.5">
        <div className="w-8 h-8 rounded-md bg-surface-sunken border border-hairline flex items-center justify-center text-ink-muted group-hover:text-ink transition-colors">
          <Lock className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-ink group-hover:text-ink transition-colors">
            Vault
          </h3>
          <p className="text-xs text-ink-faint">
            Flagship build
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs font-sans text-ink-faint group-hover:text-ink transition-colors shrink-0">
        <span>Open vault</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  );
}
