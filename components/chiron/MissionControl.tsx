'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ChironData, ChironTarget } from '@/lib/chiron-parser';

// ── Status config ────────────────────────────────────────────────────────────

const STATUS_MAP: Record<string, { label: string; color: string; dot: string }> = {
  '🟢 Preparing':    { label: 'PREPARING',    color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', dot: 'bg-emerald-400' },
  '🟡 Sent':         { label: 'SENT',         color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',   dot: 'bg-yellow-400' },
  '🔵 Interviewing': { label: 'INTERVIEWING', color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',         dot: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]' },
  '🔴 Rejected':     { label: 'REJECTED',     color: 'text-red-400/70 bg-red-400/5 border-red-400/10',          dot: 'bg-red-400/50' },
  '⚫ Ghosted':      { label: 'GHOSTED',      color: 'text-white/30 bg-white/5 border-white/10',                dot: 'bg-white/20' },
  '🏆 Offer':        { label: 'OFFER',         color: 'text-yellow-300 bg-yellow-300/10 border-yellow-300/30',   dot: 'bg-yellow-300 shadow-[0_0_12px_rgba(253,224,71,0.8)]' },
};

function StatusPill({ status }: { status: string }) {
  const cfg = STATUS_MAP[status] ?? { label: status, color: 'text-white/40 bg-white/5 border-white/10', dot: 'bg-white/30' };
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[9px] font-mono tracking-widest uppercase', cfg.color)}>
      <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', cfg.dot)} />
      {cfg.label}
    </span>
  );
}

// ── Metric card ──────────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent?: 'cyan' | 'orange' | 'red' | 'yellow';
  pulse?: boolean;
  delay?: number;
}

function MetricCard({ label, value, sub, accent = 'cyan', pulse = false, delay = 0 }: MetricCardProps) {
  const valueColors = {
    cyan:   'text-cyan-400',
    orange: 'text-orange-400',
    red:    'text-red-400',
    yellow: 'text-yellow-400',
  };
  const glowColors = {
    cyan:   'shadow-[0_0_30px_rgba(34,211,238,0.07)]',
    orange: 'shadow-[0_0_30px_rgba(251,146,60,0.07)]',
    red:    'shadow-[0_0_30px_rgba(239,68,68,0.07)]',
    yellow: 'shadow-[0_0_30px_rgba(250,204,21,0.07)]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        'bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 flex flex-col gap-2',
        'hover:border-white/20 transition-all duration-500',
        glowColors[accent]
      )}
    >
      <span className="text-[9px] font-mono tracking-[0.4em] text-white/30 uppercase">{label}</span>
      <span className={cn('text-3xl font-bold font-mono', valueColors[accent], pulse && value !== 0 ? 'animate-pulse' : '')}>
        {value}
      </span>
      {sub && <span className="text-[10px] font-mono text-white/30 leading-tight">{sub}</span>}
    </motion.div>
  );
}

// ── Target row ───────────────────────────────────────────────────────────────

function TargetRow({ target, index }: { target: ChironTarget; index: number }) {
  const isGhosted  = target.status === '⚫ Ghosted';
  const isRejected = target.status === '🔴 Rejected';
  const isDim = isGhosted || isRejected;

  return (
    <motion.tr
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.05 * index }}
      className={cn(
        'border-b border-white/5 group hover:bg-white/[0.02] transition-colors duration-200',
        isDim && 'opacity-40'
      )}
    >
      <td className="py-3 px-4 text-sm font-medium text-white group-hover:text-cyan-100 transition-colors">
        {target.company}
      </td>
      <td className="py-3 px-4 text-xs text-white/50 font-light hidden sm:table-cell">
        {target.role}
      </td>
      <td className="py-3 px-4 text-xs text-white/40 font-mono hidden md:table-cell">
        {target.founder}
      </td>
      <td className="py-3 px-4 text-[9px] font-mono text-white/25 hidden lg:table-cell">
        {target.dateSent !== '-' ? target.dateSent : '—'}
      </td>
      <td className="py-3 px-4">
        <StatusPill status={target.status} />
      </td>
      <td className="py-3 px-4 text-[9px] font-mono hidden xl:table-cell">
        {target.followUpDue !== '-' ? (
          <span className="text-yellow-400/70">{target.followUpDue}</span>
        ) : (
          <span className="text-white/15">—</span>
        )}
      </td>
    </motion.tr>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function MissionControl({ data }: { data: ChironData }) {
  const { targets, metrics, qualitativeNotes } = data;

  const streakLabel = metrics.streakDays > 0
    ? `🔥 Day ${metrics.streakDays}: Engine Hot`
    : '— Streak Broken';

  return (
    <div className="min-h-screen w-full bg-slate-950 relative overflow-x-hidden">

      {/* ── Ambient orbs ────────────────────────────────────────── */}
      <div className="fixed top-[-10%] left-[-5%] w-[45%] h-[45%] rounded-full bg-cyan-600/8 blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-cyan-600/8 blur-[140px] pointer-events-none" />

      {/* ── Grid overlay ────────────────────────────────────────── */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* ── Scanlines ───────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.07)_50%)] bg-[length:100%_2px] opacity-20" />

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">

        {/* ── HEADER ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-1 border-b border-white/10 pb-6"
        >
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 text-[9px] tracking-[0.5em] font-mono uppercase opacity-60">
              // PRIVATE SYSTEM
            </span>
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-[9px] font-mono text-white/20 tracking-widest uppercase">
              {new Date().toISOString().slice(0, 10)}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-[0.2em] text-white uppercase font-mono">
            CHIRON{' '}
            <span className="text-cyan-400">//</span>
            {' '}MISSION CONTROL
          </h1>
          <p className="text-xs text-white/30 font-mono tracking-wide">
            Anti-Ghosting Pipeline · {metrics.totalVolume} targets in system
          </p>
        </motion.div>

        {/* ── METRICS ROW ─────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Outreach Streak"
            value={streakLabel}
            sub="Consecutive days active"
            accent="orange"
            delay={0}
          />
          <MetricCard
            label="Total Volume"
            value={metrics.totalVolume}
            sub="Applications in pipeline"
            accent="cyan"
            delay={0.08}
          />
          <MetricCard
            label="Systematic Rejections"
            value={metrics.ghostCount}
            sub="No reply after follow-up"
            accent="red"
            delay={0.16}
          />
          <MetricCard
            label="Follow-Ups Due"
            value={metrics.followUpsDueCount}
            sub="Action required today"
            accent="yellow"
            pulse={metrics.followUpsDueCount > 0}
            delay={0.24}
          />
        </div>

        {/* ── PIPELINE TABLE ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        >
          {/* Section header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
            <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase opacity-70">
              // ACTIVE PIPELINE
            </span>
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-[9px] font-mono text-white/20 tracking-widest">
              {metrics.activeCount} ACTIVE
            </span>
          </div>

          <AnimatePresence>
            {targets.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-sm font-mono text-white/20 tracking-widest uppercase">
                  No targets loaded. Add rows to founder-target-list.md
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      {['Company', 'Role', 'Founder', 'Date Sent', 'Status', 'Follow-Up Due'].map((h) => (
                        <th
                          key={h}
                          className={cn(
                            'py-3 px-4 text-left text-[9px] font-mono tracking-[0.3em] text-white/25 uppercase',
                            h === 'Role'          && 'hidden sm:table-cell',
                            h === 'Founder'       && 'hidden md:table-cell',
                            h === 'Date Sent'     && 'hidden lg:table-cell',
                            h === 'Follow-Up Due' && 'hidden xl:table-cell',
                          )}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {targets.map((t, i) => (
                      <TargetRow key={`${t.company}-${i}`} target={t} index={i} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── QUALITATIVE NOTES TERMINAL ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        >
          {/* Section header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
            <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase opacity-70">
              // FIELD INTEL
            </span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="px-6 py-5 font-mono text-xs space-y-3">
            {qualitativeNotes.length === 0 ? (
              <p className="text-white/20 tracking-widest uppercase text-[10px]">
                No field notes yet. Add bullet points to outreach-notes.md
              </p>
            ) : (
              qualitativeNotes.map((note, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * i + 0.4 }}
                  className="flex items-start gap-3 group"
                >
                  <span className="text-cyan-400/50 mt-0.5 shrink-0 group-hover:text-cyan-400 transition-colors">›</span>
                  <span className="text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">{note}</span>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* ── FOOTER ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center justify-between pt-2 pb-6"
        >
          <span className="text-[9px] font-mono text-white/15 tracking-[0.3em] uppercase">
            CHIRON v1.0 · Private · Not indexed
          </span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-mono text-white/15 tracking-widest uppercase">System Online</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
