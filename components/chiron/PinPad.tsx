'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const CORRECT_PIN = '0327';
const PIN_LENGTH = 4;

const KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['CLR', '0', '⌫'],
];

export default function PinPad() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [shake, setShake] = useState(false);

  // ── Key press handler ────────────────────────────────────────────
  const handleKey = useCallback((key: string) => {
    if (status === 'error' || status === 'success') return;

    if (key === 'CLR') {
      setInput('');
      return;
    }
    if (key === '⌫') {
      setInput(prev => prev.slice(0, -1));
      return;
    }
    if (input.length >= PIN_LENGTH) return;

    const next = input + key;
    setInput(next);

    if (next.length === PIN_LENGTH) {
      setTimeout(() => {
        if (next === CORRECT_PIN) {
          setStatus('success');
          // Set cookie: chiron_auth=CHIRON_UNLOCKED; max-age 24 h; SameSite=Strict
          document.cookie = `chiron_auth=CHIRON_UNLOCKED; max-age=${60 * 60 * 24}; path=/; SameSite=Strict`;
          setTimeout(() => window.location.reload(), 700);
        } else {
          setStatus('error');
          setShake(true);
          setTimeout(() => {
            setInput('');
            setStatus('idle');
            setShake(false);
          }, 800);
        }
      }, 120);
    }
  }, [input, status]);

  // ── Physical keyboard support ────────────────────────────────────
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') handleKey(e.key);
      else if (e.key === 'Backspace') handleKey('⌫');
      else if (e.key === 'Escape') handleKey('CLR');
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKey]);

  // ── Derived state ────────────────────────────────────────────────
  const dotColor =
    status === 'error'   ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]' :
    status === 'success' ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]' :
                           'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]';

  const emptyDotColor =
    status === 'error'   ? 'border-red-500/40' :
    status === 'success' ? 'border-emerald-400/40' :
                           'border-white/20';

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 relative overflow-hidden select-none">

      {/* ── Ambient orbs ─────────────────────────────────────────── */}
      <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-600/10 blur-[140px] pointer-events-none" />

      {/* ── Grid overlay ─────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* ── Scanline overlay ─────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] opacity-20" />

      {/* ── Vault card ───────────────────────────────────────────── */}
      <motion.div
        animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 flex flex-col items-center gap-8 bg-black/50 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-[0_0_80px_rgba(0,0,0,0.8)] w-[340px]"
      >
        {/* ── Header ───────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-1 w-full">
          <span className="text-cyan-400 text-[9px] tracking-[0.5em] font-mono uppercase opacity-60">
            // SYSTEM ACCESS
          </span>
          <div className="h-px w-full bg-white/5 my-1" />
          <h1 className="text-xl font-bold tracking-[0.25em] text-white uppercase font-mono">
            CHIRON
          </h1>
          <p className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">
            Mission Control
          </p>
        </div>

        {/* ── PIN dot indicators ───────────────────────────────── */}
        <div className="flex items-center gap-4">
          {Array.from({ length: PIN_LENGTH }).map((_, i) => (
            <motion.div
              key={i}
              animate={
                i < input.length
                  ? { scale: [1, 1.3, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 0.15 }}
              className={cn(
                'w-3 h-3 rounded-full border transition-all duration-200',
                i < input.length
                  ? `border-transparent ${dotColor}`
                  : `${emptyDotColor} bg-transparent`
              )}
            />
          ))}
        </div>

        {/* ── Status message ───────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {status === 'error' && (
            <motion.p
              key="err"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="-mt-4 text-[10px] font-mono tracking-widest text-red-400/80 uppercase"
            >
              ACCESS DENIED
            </motion.p>
          )}
          {status === 'success' && (
            <motion.p
              key="ok"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="-mt-4 text-[10px] font-mono tracking-widest text-emerald-400/80 uppercase"
            >
              UNLOCKING...
            </motion.p>
          )}
        </AnimatePresence>

        {/* ── Number pad ───────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {KEYS.flat().map((key) => {
            const isAction = key === 'CLR' || key === '⌫';
            return (
              <motion.button
                key={key}
                whileTap={{ scale: 0.88 }}
                onClick={() => handleKey(key)}
                className={cn(
                  'relative h-14 rounded-xl font-mono text-sm tracking-wider transition-all duration-150 cursor-pointer',
                  'border backdrop-blur-md',
                  isAction
                    ? 'text-white/40 border-white/5 bg-white/3 hover:text-white/70 hover:border-white/10'
                    : 'text-white border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.08)]',
                  status !== 'idle' && 'pointer-events-none'
                )}
              >
                {key}
              </motion.button>
            );
          })}
        </div>

        {/* ── Footer ───────────────────────────────────────────── */}
        <div className="flex items-center gap-2 w-full">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[9px] font-mono text-white/20 tracking-[0.3em] uppercase">
            Encrypted · Private · Local
          </span>
        </div>
      </motion.div>

    </div>
  );
}
