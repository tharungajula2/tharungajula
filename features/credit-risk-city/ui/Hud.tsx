'use client';

import { contentPack } from '../content';
import type { Readings } from '../living/bank';
import { cn } from '@/lib/utils';

const pct = (x: number, dp = 1) => `${(x * 100).toFixed(dp)}%`;

/** Reading progress and the city bank's headline numbers. */
export default function Hud({ live, readCount }: { live: Readings; readCount: number }) {
  const chips = [
    { label: 'Read', value: `${readCount}/${contentPack.districts.length}` },
    { label: 'CET1 ratio', value: pct(live.cet1Ratio) },
    { label: 'Total ECL', value: `₹${live.totalEcl.toFixed(2)} cr` },
    { label: 'Stage 3 ratio', value: pct(live.stage3Ratio) },
  ];
  return (
    <dl className={cn('flex gap-1.5 overflow-x-auto no-scrollbar')}>
      {chips.map((c) => (
        <div key={c.label} className="shrink-0 rounded-lg border border-hairline bg-surface-raised/95 px-2 py-1 text-center shadow-sm">
          <dt className="text-[9px] uppercase tracking-wide text-ink-faint">{c.label}</dt>
          <dd className="text-xs font-semibold tabular-nums">{c.value}</dd>
        </div>
      ))}
    </dl>
  );
}
