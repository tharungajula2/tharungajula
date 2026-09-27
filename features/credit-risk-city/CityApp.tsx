'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import CaseView from './ui/CaseView';
import Hud from './ui/Hud';
import ListCity from './ui/ListCity';
import ProgressView from './ui/ProgressView';
import RoundView from './ui/RoundView';

const TABS = [
  { id: 'city', label: 'City' },
  { id: 'round', label: 'Daily Round' },
  { id: 'case', label: 'Case' },
  { id: 'progress', label: 'Progress' },
] as const;
type TabId = (typeof TABS)[number]['id'];

export default function CityApp() {
  const [tab, setTab] = useState<TabId>('round');
  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 px-4 py-4 sm:px-6">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">Credit Risk City</h1>
        <p className="text-xs text-ink-muted">Pass 1 · 2D city · placeholder content · the 3D city arrives in Pass 2</p>
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
