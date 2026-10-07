import React from 'react';
import clsx from 'clsx';

export type CalloutType =
  | 'permanent-rule'
  | 'never-confuse'
  | 'trap'
  | 'mental-model'
  | 'key-insight';

interface CalloutProps {
  type: CalloutType;
  children: React.ReactNode;
}

const CALLOUT_LABELS: Record<CalloutType, string> = {
  'permanent-rule': 'PERMANENT RULE',
  'never-confuse': 'NEVER CONFUSE',
  'trap': 'PERMANENT TRAP',
  'mental-model': 'MENTAL MODEL',
  'key-insight': 'KEY INSIGHT',
};

const CALLOUT_STYLES: Record<CalloutType, string> = {
  'permanent-rule': 'border-l-2 border-foreground/60 bg-foreground/[0.02]',
  'never-confuse': 'border-l-2 border-amber-600/70 bg-amber-500/[0.03]',
  'trap': 'border-l-2 border-red-600/70 bg-red-500/[0.03]',
  'mental-model': 'border-l-2 border-indigo-600/70 bg-indigo-500/[0.03]',
  'key-insight': 'border-l-2 border-emerald-600/70 bg-emerald-500/[0.03]',
};

export function Callout({ type, children }: CalloutProps) {
  const label = CALLOUT_LABELS[type] || type.toUpperCase().replace('-', ' ');
  const style = CALLOUT_STYLES[type] || 'border-l-2 border-foreground/40 bg-foreground/[0.02]';

  if (type === 'never-confuse') {
    return (
      <div className={clsx('my-6 pl-4 py-3 pr-3 text-sm leading-relaxed', style)}>
        <div className="text-[11px] font-semibold tracking-wider uppercase text-muted/80 mb-3 font-sans">
          {label}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 font-serif text-[1.0625rem] leading-[1.7]">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={clsx('my-6 pl-4 py-3 pr-3 text-sm leading-relaxed', style)}>
      <div className="text-[11px] font-semibold tracking-wider uppercase text-muted/80 mb-1.5 font-sans">
        {label}
      </div>
      <div className="font-serif text-[1.0625rem] leading-[1.7]">
        {children}
      </div>
    </div>
  );
}
