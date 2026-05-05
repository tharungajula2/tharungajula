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
        'bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between min-h-[140px]',
        'hover:border-white/20 transition-all duration-500',
        glowColors[accent]
      )}
    >
      <div className="space-y-1">
        <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.3em] text-white/50 uppercase block leading-tight">{label}</span>
        <span className={cn(
          'font-bold font-mono block leading-none break-words',
          typeof value === 'string' && value.length > 10 ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl',
          valueColors[accent], 
          pulse && value !== 0 ? 'animate-pulse' : ''
        )}>
          {value}
        </span>
      </div>
      {sub && <span className="text-[10px] font-mono text-white/40 leading-relaxed border-t border-white/5 pt-2 mt-2">{sub}</span>}
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
        isDim && 'opacity-30'
      )}
    >
      <td className="py-3 px-4 text-xs sm:text-sm font-medium text-white group-hover:text-cyan-100 transition-colors">
        {target.company}
      </td>
      <td className="py-3 px-4 text-[10px] sm:text-xs text-white/60 font-light hidden sm:table-cell">
        {target.role}
      </td>
      <td className="py-3 px-4 text-[10px] text-white/50 font-mono hidden md:table-cell">
        {target.founder}
      </td>
      <td className="py-3 px-4 text-[9px] font-mono text-white/40 hidden lg:table-cell">
        {target.dateSent !== '-' ? target.dateSent : '—'}
      </td>
      <td className="py-3 px-4">
        <StatusPill status={target.status} />
      </td>
      <td className="py-3 px-4 text-[9px] font-mono hidden xl:table-cell">
        {target.followUpDue !== '-' ? (
          <span className="text-yellow-400/80">{target.followUpDue}</span>
        ) : (
          <span className="text-white/20">—</span>
        )}
      </td>
    </motion.tr>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function MissionControl({ data }: { data: ChironData }) {
  const { targets, metrics, qualitativeNotes } = data;

  const streakLabel = metrics.streakDays > 0
    ? `DAY ${metrics.streakDays}`
    : 'BROKEN';
  
  const streakSub = metrics.streakDays > 0
    ? 'Engine Hot // Consecutive days'
    : 'No active streak detected';

  return (
    <div className="min-h-screen w-full bg-[#020617] relative overflow-x-hidden text-slate-300">

      {/* ── Ambient orbs ────────────────────────────────────────── */}
      <div className="fixed top-[-10%] left-[-5%] w-[45%] h-[45%] rounded-full bg-cyan-600/10 blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-cyan-600/8 blur-[140px] pointer-events-none" />

      {/* ── Grid overlay ────────────────────────────────────────── */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* ── Scanlines ───────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.07)_50%)] bg-[length:100%_4px] opacity-20" />

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12">

        {/* ── HEADER ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-3 border-b border-white/10 pb-8"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-cyan-400 text-[10px] tracking-[0.4em] font-mono uppercase font-bold">
              // PRIVATE_SYSTEM
            </span>
            <div className="h-px flex-1 bg-white/10 min-w-[20px]" />
            <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">
              SYNC_DATE: {new Date().toISOString().slice(0, 10)}
            </span>
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-white uppercase font-mono leading-none">
              CHIRON <span className="text-cyan-400">/</span> MISSION CONTROL
            </h1>
            <p className="text-[10px] sm:text-xs text-white/40 font-mono tracking-[0.2em] uppercase">
              Anti-Ghosting Pipeline • <span className="text-white/60">{metrics.totalVolume}</span> targets analyzed
            </p>
          </div>
        </motion.div>

        {/* ── METRICS ROW ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Outreach Streak"
            value={streakLabel}
            sub={streakSub}
            accent="orange"
            delay={0}
          />
          <MetricCard
            label="Pipeline Volume"
            value={metrics.totalVolume}
            sub="Active applications in scope"
            accent="cyan"
            delay={0.08}
          />
          <MetricCard
            label="Ghost Rate"
            value={metrics.ghostCount}
            sub="Zero response after follow-up"
            accent="red"
            delay={0.16}
          />
          <MetricCard
            label="Follow-Ups Due"
            value={metrics.followUpsDueCount}
            sub="Requires immediate action"
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
          className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Section header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <span className="text-cyan-400 text-[10px] tracking-[0.3em] font-mono uppercase font-bold">
                // ACTIVE_PIPELINE
              </span>
              <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse hidden sm:block" />
            </div>
            <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">
              STATUS: <span className="text-white/70">{metrics.activeCount} ACTIVE</span>
            </span>
          </div>

          <AnimatePresence>
            {targets.length === 0 ? (
              <div className="px-6 py-20 text-center space-y-2">
                <p className="text-xs font-mono text-white/40 tracking-widest uppercase">
                  No active targets detected in source
                </p>
                <p className="text-[10px] font-mono text-white/20 uppercase">
                  Populate brain/raw/strategy/founder-target-list.md
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/[0.01] border-b border-white/5">
                      {['Company', 'Role', 'Founder', 'Sent', 'Status', 'Follow-up'].map((h) => (
                        <th
                          key={h}
                          className={cn(
                            'py-4 px-4 text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase font-bold',
                            h === 'Role'      && 'hidden sm:table-cell',
                            h === 'Founder'   && 'hidden md:table-cell',
                            h === 'Sent'      && 'hidden lg:table-cell',
                            h === 'Follow-up' && 'hidden xl:table-cell',
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
          className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Section header */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10 bg-white/[0.02]">
            <span className="text-cyan-400 text-[10px] tracking-[0.3em] font-mono uppercase font-bold">
              // FIELD_INTEL_STREAM
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="px-6 py-8 font-mono text-[11px] sm:text-xs space-y-4">
            {qualitativeNotes.length === 0 ? (
              <div className="space-y-1">
                <p className="text-white/30 tracking-widest uppercase text-[10px]">
                  No intelligence stream available
                </p>
                <p className="text-white/10 uppercase text-[9px]">
                  Waiting for data in outreach-notes.md
                </p>
              </div>
            ) : (
              qualitativeNotes.map((note, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * i + 0.4 }}
                  className="flex items-start gap-4 group"
                >
                  <span className="text-cyan-500/60 mt-1 shrink-0 group-hover:text-cyan-400 transition-colors">›</span>
                  <span className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors border-l border-white/5 pl-4">{note}</span>
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
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-12 border-t border-white/5"
        >
          <span className="text-[9px] font-mono text-white/30 tracking-[0.4em] uppercase">
            CHIRON_v1.0 // ENCRYPTED_CORE // NO_INDEX
          </span>
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
            <span className="text-[9px] font-mono text-white/60 tracking-[0.2em] uppercase font-bold">SYSTEM_ONLINE</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
