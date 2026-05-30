'use client';

import { useJarvizStore, JarvizState } from '@/lib/jarviz/useJarvizStore';

const STATE_LABELS: Record<JarvizState, { text: string; color: string }> = {
  IDLE: { text: 'SYSTEM: STANDBY', color: 'text-white/40 border-white/10' },
  CAMERA_PERMISSION_PENDING: { text: 'AWAITING CAMERA…', color: 'text-yellow-400 border-yellow-500/30' },
  VISION_ONLINE: { text: 'VISION ONLINE', color: 'text-cyan-400 border-cyan-500/30' },
  HAND_DETECTED: { text: 'TRACKING_ACTIVE', color: 'text-emerald-400 border-emerald-500/30 animate-pulse' },
  GESTURE_CANDIDATE: { text: 'READING GESTURE…', color: 'text-cyan-300 border-cyan-400/40' },
  COMMAND_CONFIRMED: { text: '✓ COMMAND REGISTERED', color: 'text-white bg-cyan-950 border-cyan-400' },
  LISTENING: { text: 'LISTENING…', color: 'text-purple-400 border-purple-500/30 animate-pulse' },
  ROBOT_RESPONDING: { text: 'ROBOT RESPONDING', color: 'text-sky-400 border-sky-500/30' },
  PAUSED: { text: 'PAUSED', color: 'text-red-400 border-red-500/20' },
  ERROR: { text: 'CORE FAILURE', color: 'text-red-500 border-red-500' },
};

export default function StatusReadout() {
  const store = useJarvizStore();
  let current = STATE_LABELS[store.fsmState] || STATE_LABELS.IDLE;

  if (store.isGeminiStreaming) {
    current = { text: 'GEMINI STREAM ACTIVE', color: 'text-purple-400 border-purple-500/40 animate-pulse bg-purple-950/15 shadow-[0_0_20px_rgba(168,85,247,0.15)]' };
  }

  return (
    <div className="flex flex-col space-y-1 select-none pointer-events-none">
      <span className="text-[9px] font-mono tracking-[0.4em] text-white/30 uppercase">
        FSM STATUS REGISTER
      </span>
      <div className={`px-4 py-2 border rounded-xl font-mono text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-between min-w-[220px] bg-black/60 backdrop-blur-md shadow-2xl ${current.color}`}>
        <span>{current.text}</span>
        {store.fsmState === 'HAND_DETECTED' && (
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        )}
      </div>

      <span className="text-[9px] font-mono tracking-[0.4em] text-white/30 uppercase pt-1.5">
        ROBOT STATE REGISTER
      </span>
      <div className="px-4 py-2 border border-cyan-500/20 bg-black/60 rounded-xl font-mono text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-between min-w-[220px] text-cyan-400 font-bold shadow-2xl">
        <span>{store.robotReaction}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
      </div>

      {store.errorReason && (
        <span className="text-[9px] font-mono text-red-400/80 max-w-[220px] leading-tight mt-1 uppercase">
          ERR: {store.errorReason}
        </span>
      )}
    </div>
  );
}
