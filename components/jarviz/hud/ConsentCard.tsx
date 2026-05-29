'use client';

import { useJarvizStore, jarvizStore } from '@/lib/jarviz/useJarvizStore';
import { Camera, Mic, ArrowRight, ShieldCheck } from 'lucide-react';

interface ConsentCardProps {
  onDismiss: () => void;
}

export default function ConsentCard({ onDismiss }: ConsentCardProps) {
  const store = useJarvizStore();

  const handleEnableCamera = () => {
    jarvizStore.set({ cameraActive: true });
  };

  const handleEnableVoice = () => {
    // Basic verification of SpeechRecognition support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      jarvizStore.set({ 
        fsmState: 'ERROR', 
        errorReason: 'Voice Recognition unsupported on this browser.' 
      });
      return;
    }
    jarvizStore.set({ voiceActive: true, fsmState: 'LISTENING' });
  };

  return (
    <div className="w-full max-w-md bg-neutral-950/90 border border-white/10 p-6 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col space-y-5">
      <div className="space-y-1">
        <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold block">
          // INITIALIZATION_GATE
        </span>
        <h3 className="text-xl font-bold text-white tracking-tight uppercase">
          Multimodal Cockpit Authorization
        </h3>
      </div>

      <div className="space-y-4 text-xs font-mono uppercase tracking-wide text-white/60">
        {/* Camera Permission Info */}
        <div className="space-y-1.5 border-l-2 border-cyan-500/30 pl-3">
          <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <Camera className="w-3.5 h-3.5" />
            <span>Webcam Hand Tracking Consent</span>
          </div>
          <p className="leading-relaxed text-[10px] text-white/50">
            Uses your camera for gesture navigation. Processed entirely local in-browser — frames are never uploaded, stored, or sent to any server. Turn off anytime.
          </p>
        </div>

        {/* Mic Permission Info */}
        <div className="space-y-1.5 border-l-2 border-purple-500/30 pl-3">
          <div className="flex items-center gap-1.5 text-purple-400 font-bold">
            <Mic className="w-3.5 h-3.5" />
            <span>Browser Voice Commands</span>
          </div>
          <p className="leading-relaxed text-[10px] text-white/50 animate-fadeIn">
            Voice commands use your browser&apos;s speech recognition. Depending on the browser, audio may be processed by the browser vendor&apos;s speech service to produce text. This site does not store recordings or transcripts.
          </p>
        </div>
      </div>

      {/* Security Banner */}
      <div className="flex items-center gap-2 bg-cyan-950/20 border border-cyan-400/10 px-3 py-2 rounded-xl text-[9px] font-mono text-cyan-400 uppercase tracking-widest">
        <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>100% on-device vision privacy guaranteed</span>
      </div>

      {/* Button Controls */}
      <div className="flex flex-col gap-2 pt-2">
        <div className="flex gap-2">
          <button
            onClick={handleEnableCamera}
            disabled={store.cameraActive}
            className={`flex-1 flex items-center justify-center gap-2 font-mono text-[10px] font-bold tracking-wider py-2.5 rounded-xl uppercase transition-all cursor-pointer active:scale-98 ${
              store.cameraActive 
                ? 'bg-neutral-900 border border-white/5 text-white/30 cursor-not-allowed'
                : 'bg-cyan-950 hover:bg-cyan-900/30 border border-cyan-400/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{store.cameraActive ? 'Camera online' : 'Enable Camera'}</span>
          </button>

          <button
            onClick={handleEnableVoice}
            disabled={store.voiceActive}
            className={`flex-1 flex items-center justify-center gap-2 font-mono text-[10px] font-bold tracking-wider py-2.5 rounded-xl uppercase transition-all cursor-pointer active:scale-98 ${
              store.voiceActive
                ? 'bg-neutral-900 border border-white/5 text-white/30 cursor-not-allowed'
                : 'bg-purple-950/50 hover:bg-purple-900/30 border border-purple-400/40 text-purple-400'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>{store.voiceActive ? 'Voice online' : 'Enable Voice'}</span>
          </button>
        </div>

        <button
          onClick={onDismiss}
          className="w-full flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white font-mono text-[10px] py-2 rounded-xl uppercase transition-all cursor-pointer active:scale-98"
        >
          <span>Continue to HUD standby</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
