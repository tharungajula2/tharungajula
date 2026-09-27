'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Button({ className, variant = 'primary', ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'quiet' }) {
  return (
    <button
      {...rest}
      className={cn(
        'min-h-[44px] px-4 rounded-lg text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none disabled:opacity-40 disabled:cursor-not-allowed',
        variant === 'primary' && 'bg-ink text-surface hover:opacity-90',
        variant === 'ghost' && 'border border-hairline-strong text-ink hover:bg-surface-sunken',
        variant === 'quiet' && 'text-ink-muted hover:text-ink',
        className,
      )}
    />
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('rounded-xl border border-hairline bg-surface-raised p-4 sm:p-5', className)}>{children}</div>;
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-surface-sunken text-ink-muted', className)}>{children}</span>;
}

export function Dot({ colour }: { colour: string }) {
  return <span aria-hidden className="inline-block h-3 w-3 shrink-0 rounded-full border border-hairline-strong" style={{ background: colour }} />;
}
