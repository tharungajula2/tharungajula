'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './primitives';
import CaseView from './CaseView';
import Hud from './Hud';
import ListCity from './ListCity';
import ProgressView from './ProgressView';
import RoundView from './RoundView';

const TABS = [
  { id: 'city', label: 'City' },
  { id: 'round', label: 'Daily Round' },
  { id: 'case', label: 'Case' },
  { id: 'progress', label: 'Progress' },
] as const;
type TabId = (typeof TABS)[number]['id'];

export default function ListApp({ onOpen3D }: { onOpen3D?: () => void }) {
  const [tab, setTab] = useState<TabId>('city');
  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 px-4 py-4 sm:px-6">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">Credit Risk City</h1>
          <p className="text-xs text-ink-muted">2D view · same city, same progress · placeholder content</p>
        </div>
        {onOpen3D && <Button variant="ghost" onClick={onOpen3D}>Open 3D city</Button>}
      </div>
      <Hud />
      <nav className="flex gap-1 rounded-xl border border-hairline bg-surface-sunken p-1" aria-label="Game sections">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            aria-current={tab === t.id ? 'page' : undefined}
            className={cn(
              'min-h-[44px] flex-1 rounded-lg text-sm font-medium focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none',
              tab === t.id ? 'bg-surface-raised text-ink shadow-sm' : 'text-ink-muted',
            )}
          >
            {t.label}
          </button>
        ))}
      </nav>
      {tab === 'city' && <ListCity />}
      {tab === 'round' && <RoundView />}
      {tab === 'case' && <CaseView />}
      {tab === 'progress' && <ProgressView />}
    </div>
  );
}
