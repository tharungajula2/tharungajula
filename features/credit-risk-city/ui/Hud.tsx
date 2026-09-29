'use client';

import { contentPack } from '../content';

/** Reading progress. */
export default function Hud({ readCount }: { readCount: number }) {
  return (
    <dl className="flex gap-1.5">
      <div className="shrink-0 rounded-lg border border-hairline bg-surface-raised/95 px-2 py-1 text-center shadow-sm">
        <dt className="text-[9px] uppercase tracking-wide text-ink-faint">Read</dt>
        <dd className="text-xs font-semibold tabular-nums">{readCount}/{contentPack.districts.length}</dd>
      </div>
    </dl>
  );
}
