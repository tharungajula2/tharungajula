'use client';

import { useJarvizStore, robotReact } from '@/lib/jarviz/useJarvizStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Mic, Cpu, Eye, AlertTriangle, Moon, CheckCircle, Radio } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function RobotLivenessOverlay() {
  const store = useJarvizStore();
  const reaction = store.robotReaction;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [ackText, setAckText] = useState('');

  // Detect media query for reduced motion
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // Set transient command text for Acknowledge animation
  useEffect(() => {
    if (reaction === 'acknowledge' && store.confirmedCommand) {
      const label = store.confirmedCommand.toUpperCase();
      if (label.includes('WORK')) setAckText('WORK MODULE ACTIVATED');
      else if (label.includes('STORY')) setAckText('EVOLUTION TIMELINE ONLINE');
      else if (label.includes('CONNECT')) setAckText('CONNECT TERMINAL ESTABLISHED');
      else if (label.includes('THESIS') || label.includes('HOME')) setAckText('THESIS CORE INITIALIZED');
      else if (label.includes('HELP')) setAckText('COMMAND GRAMMAR MATCHED');
      else if (label.includes('PAUSE')) setAckText('STANDBY MODE INITIATED');
      else setAckText(`${label} ENGAGED`);
    }
  }, [reaction, store.confirmedCommand]);

  // Determine label and color scheme based on active state
  let statusLabel = 'JARVIZ STANDBY';
  let statusColor = 'text-neutral-500 border-neutral-800 bg-neutral-950/80';
  let icon = <Moon className="w-4 h-4 text-neutral-500" />;

  switch (reaction) {
    case 'wake':
      statusLabel = 'JARVIZ ACTIVE';
      statusColor = 'text-cyan-400 border-cyan-400/50 bg-cyan-950/85 shadow-[0_0_20px_rgba(6,182,212,0.25)]';
      icon = <Cpu className="w-4 h-4 text-cyan-400 animate-spin" />;
      break;
    case 'track':
      statusLabel = 'HAND TRACKING';
      statusColor = 'text-cyan-400 border-cyan-400/60 bg-cyan-950/85 shadow-[0_0_25px_rgba(6,182,212,0.3)] animate-pulse';
      icon = <Eye className="w-4 h-4 text-cyan-400" />;
      break;
    case 'acknowledge':
      statusLabel = '✓ MATRICES MATCHED';
      statusColor = 'text-emerald-400 border-emerald-400/70 bg-emerald-950/90 shadow-[0_0_30px_rgba(16,185,129,0.35)]';
      icon = <CheckCircle className="w-4 h-4 text-emerald-400" />;
      break;
    case 'listen':
      statusLabel = 'VOICE LISTENING';
      statusColor = 'text-purple-400 border-purple-400/60 bg-purple-950/85 shadow-[0_0_25px_rgba(168,85,247,0.3)] animate-pulse';
      icon = <Mic className="w-4 h-4 text-purple-400" />;
      break;
    case 'thinking':
      statusLabel = 'THINKING (GEMINI)';
      statusColor = 'text-fuchsia-400 border-fuchsia-400/60 bg-fuchsia-950/85 shadow-[0_0_30px_rgba(240,46,170,0.35)]';
      icon = <Cpu className="w-4 h-4 text-fuchsia-400 animate-spin" />;
      break;
    case 'speaking':
      statusLabel = 'RESPONDING';
      statusColor = 'text-cyan-400 border-cyan-400/60 bg-cyan-950/85 shadow-[0_0_25px_rgba(6,182,212,0.3)]';
      icon = <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />;
      break;
    case 'error':
      statusLabel = 'ANOMALY DETECTED';
      statusColor = 'text-red-400 border-red-500/70 bg-red-950/90 shadow-[0_0_30px_rgba(239,68,68,0.4)]';
      icon = <AlertTriangle className="w-4 h-4 text-red-400 animate-bounce" />;
      break;
    case 'pause':
    case 'sleep':
      statusLabel = 'SYSTEM STANDBY';
      statusColor = 'text-neutral-500 border-neutral-800 bg-neutral-950/80';
      icon = <Moon className="w-4 h-4 text-neutral-500" />;
      break;
  }

  // Double rotation speeds for maximum visual excitement
  const spinTransition: any = prefersReducedMotion 
    ? {} 
    : { repeat: Infinity, duration: 6, ease: 'linear' };

  return (
    <div className="absolute inset-0 pointer-events-none z-[85] flex flex-col items-center justify-center select-none w-full h-full">
      {/* 1. Global Scanline & Color Glow Pulse overlays (HYPER VISIBLE) */}
      <AnimatePresence>
        {reaction === 'thinking' && !prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[linear-gradient(rgba(240,46,170,0)_50%,rgba(240,46,170,0.3)_50%)] bg-[length:100%_6px] mix-blend-overlay shadow-[inset_0_0_80px_rgba(240,46,170,0.2)]"
          />
        )}

        {reaction === 'listen' && !prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            exit={{ opacity: 0 }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' } as any}
            className="absolute inset-0 shadow-[inset_0_0_70px_rgba(168,85,247,0.2)] pointer-events-none"
          />
        )}

        {reaction === 'acknowledge' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.65, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
            className="absolute inset-0 bg-cyan-400/15 border-[3px] border-cyan-400/40 blur-[2px] shadow-[inset_0_0_100px_rgba(6,182,212,0.3)]"
          />
        )}

        {reaction === 'error' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.75, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-red-500/15 border-[3px] border-red-500/40 blur-[2px] shadow-[inset_0_0_100px_rgba(239,68,68,0.45)]"
          />
        )}
      </AnimatePresence>

      {/* 2. Cybernetic Spatial Reticle Wrapper - aligned exactly with the physical center of the robot head */}
      <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
        
        {/* Neon HUD Reticles (HYPER VISIBLE NEON GLOWS) */}
        <AnimatePresence>
          {/* Cyan/Purple Wake/Track locked outer brackets */}
          {(reaction === 'track' || reaction === 'wake') && (
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 0.85, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              className="absolute inset-0 border border-cyan-400/40 rounded-full"
              style={{ width: '92%', height: '92%', margin: 'auto', borderStyle: 'double', borderWidth: '3px' }}
            />
          )}

          {/* Double Neon Rotating Thinking Tech Rings */}
          {reaction === 'thinking' && (
            <>
              <motion.div
                initial={{ rotate: 0, scale: 0.85, opacity: 0 }}
                animate={{ rotate: 360, scale: 1, opacity: 0.95 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={spinTransition as any}
                className="absolute inset-0 border-2 border-dashed border-fuchsia-500/80 rounded-full shadow-[0_0_20px_rgba(240,46,170,0.4)]"
                style={{ width: '85%', height: '85%', margin: 'auto' }}
              />
              <motion.div
                initial={{ rotate: 360, scale: 0.95, opacity: 0 }}
                animate={{ rotate: 0, scale: 1.05, opacity: 0.7 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ ...spinTransition, duration: 10 } as any}
                className="absolute inset-0 border border-cyan-400/50 border-dashed rounded-full"
                style={{ width: '95%', height: '95%', margin: 'auto' }}
              />
            </>
          )}

          {/* Glowing Breath Ring during Voice Listening */}
          {reaction === 'listen' && (
            <>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={prefersReducedMotion ? { opacity: 0.7 } : { scale: [0.92, 1.08, 0.92], opacity: [0.4, 0.85, 0.4] }}
                exit={{ opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="absolute inset-0 border-2 border-purple-500/50 bg-purple-500/10 rounded-full blur-[3px] shadow-[0_0_25px_rgba(168,85,247,0.3)]"
                style={{ width: '94%', height: '94%', margin: 'auto' }}
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={prefersReducedMotion ? { opacity: 0.5 } : { scale: [0.98, 1.03, 0.98], opacity: [0.3, 0.6, 0.3] }}
                exit={{ opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                className="absolute inset-0 border border-dashed border-purple-400/40 rounded-full"
                style={{ width: '86%', height: '86%', margin: 'auto' }}
              />
            </>
          )}

          {/* Active Speaking Halo */}
          {reaction === 'speaking' && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={prefersReducedMotion ? { opacity: 0.6 } : { scale: [0.96, 1.04, 0.96], opacity: [0.4, 0.8, 0.4] }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="absolute inset-0 border-2 border-cyan-400/50 bg-cyan-400/5 rounded-full blur-[2px] shadow-[0_0_30px_rgba(6,182,212,0.35)]"
              style={{ width: '92%', height: '92%', margin: 'auto' }}
            />
          )}
        </AnimatePresence>

        {/* HUD Targeting brackets in tracking mode */}
        <AnimatePresence>
          {reaction === 'track' && (
            <>
              {/* Left bracket */}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 0.9 }}
                exit={{ x: -30, opacity: 0 }}
                className="absolute left-0 w-6 h-20 border-l-4 border-t-4 border-b-4 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
              />
              {/* Right bracket */}
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 0.9 }}
                exit={{ x: 30, opacity: 0 }}
                className="absolute right-0 w-6 h-20 border-r-4 border-t-4 border-b-4 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
              />
              {/* Central target tick marks */}
              <div className="absolute inset-0 flex items-center justify-between px-10 pointer-events-none opacity-40">
                <div className="w-3 h-0.5 bg-cyan-400" />
                <div className="w-3 h-0.5 bg-cyan-400" />
              </div>
            </>
          )}
        </AnimatePresence>

        {/* Speaking Voice Waveform Overlay (HYPER VISIBLE VIBRANT WAVE BARS) */}
        <AnimatePresence>
          {reaction === 'speaking' && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
              className="absolute bottom-4 flex items-center justify-center gap-1.5 bg-black/90 border border-cyan-400/50 px-5 py-2.5 rounded-2xl backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            >
              <div className="flex gap-1 items-end h-7 w-20">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={prefersReducedMotion ? { height: 14 } : { height: [8, 28, 8] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.4 + i * 0.12,
                      ease: 'easeInOut',
                    }}
                    className="w-2 bg-gradient-to-t from-cyan-500 to-cyan-300 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                    style={{ height: '8px' }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Listening Pulsing Mic Waveform */}
          {reaction === 'listen' && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
              className="absolute bottom-4 flex items-center justify-center gap-2 bg-black/90 border border-purple-400/50 px-5 py-2.5 rounded-2xl backdrop-blur-xl animate-[pulse_1.5s_infinite] shadow-[0_0_25px_rgba(168,85,247,0.35)]"
            >
              <Mic className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-purple-400 font-black uppercase">MIC SENSING</span>
            </motion.div>
          )}

          {/* Acknowledge Event telemetry banner (BRIGHT GLOW PILL) */}
          {reaction === 'acknowledge' && ackText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className="absolute bottom-4 bg-emerald-950/90 border-2 border-emerald-400/80 px-6 py-3 rounded-2xl backdrop-blur-xl flex items-center gap-2.5 shadow-[0_0_35px_rgba(16,185,129,0.4)]"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] font-mono tracking-widest text-emerald-300 font-black uppercase">{ackText}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Outer Cybernetic Status Register Pill (LARGE & VIBRANT) */}
      <motion.div
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut',
        }}
        className={`mt-4 border-2 px-6 py-3 rounded-2xl backdrop-blur-xl font-mono text-[10px] tracking-[0.3em] font-black flex items-center gap-2.5 uppercase shadow-2xl select-none ${statusColor}`}
      >
        {icon}
        <span>{statusLabel}</span>
      </motion.div>
    </div>
  );
}
