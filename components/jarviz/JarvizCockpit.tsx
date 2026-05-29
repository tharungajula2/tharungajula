'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useJarvizStore, jarvizStore } from '@/lib/jarviz/useJarvizStore';
import HudFrame from './hud/HudFrame';
import StatusReadout from './hud/StatusReadout';
import GestureTelemetry from './hud/GestureTelemetry';
import TranscriptPanel from './hud/TranscriptPanel';
import ConsentCard from './hud/ConsentCard';
import CommandMap from './hud/CommandMap';
import VoiceEngine from './VoiceEngine';
import { X, BookOpen } from 'lucide-react';
import { GESTURE_MAP, parseVoiceCommand } from '@/lib/jarviz/commands';

interface JarvizCockpitProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'thesis' | 'neural' | 'evolution' | 'connect';
  setActiveTab: (tab: 'thesis' | 'neural' | 'evolution' | 'connect') => void;
}

export default function JarvizCockpit({ isOpen, onClose, activeTab, setActiveTab }: JarvizCockpitProps) {
  const store = useJarvizStore();
  const [showConsent, setShowConsent] = useState(true);
  const [showCommandMap, setShowCommandMap] = useState(false);
  const [navFlash, setNavFlash] = useState<string | null>(null);

  const triggerNavFlash = (message: string) => {
    setNavFlash(message);
    // Clear flash after 2500ms
    setTimeout(() => {
      setNavFlash(null);
    }, 2500);
  };

  // Esc Key support
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Command Bus Store Listener
  useEffect(() => {
    if (!isOpen) return;
    const unsubscribe = jarvizStore.subscribe(() => {
      const state = jarvizStore.getSnapshot();
      if (state.fsmState === 'COMMAND_CONFIRMED' && state.confirmedCommand) {
        const label = state.confirmedCommand;
        
        // Find by label in GESTURE_MAP first
        const gestureEntry = Object.values(GESTURE_MAP).find(cmd => cmd.label === label);
        if (gestureEntry) {
          executeCommandIntent(gestureEntry.intent);
          return;
        }

        // Otherwise parse directly from transcript
        const voiceMatch = parseVoiceCommand(state.transcript);
        if (voiceMatch.intent !== 'none') {
          executeCommandIntent(voiceMatch.intent);
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, [isOpen, setActiveTab]);

  const handleClose = () => {
    // Reset permissions & state when closing
    jarvizStore.reset();
    setShowConsent(true);
    onClose();
  };

  const executeCommandIntent = (intent: string) => {
    console.log('[JarvizCockpit] Executing matched intent:', intent);
    switch (intent) {
      case 'nav_work':
        setActiveTab('neural');
        triggerNavFlash('NAVIGATION CONFIRMED → WORK');
        break;
      case 'nav_story':
        setActiveTab('evolution');
        triggerNavFlash('NAVIGATION CONFIRMED → STORY');
        break;
      case 'nav_connect':
        setActiveTab('connect');
        triggerNavFlash('NAVIGATION CONFIRMED → CONNECT');
        break;
      case 'nav_home':
        setActiveTab('thesis');
        triggerNavFlash('RETURNING → THESIS');
        break;
      case 'show_help':
        setShowCommandMap(true);
        triggerNavFlash('COMMAND MATRIX OPENED');
        break;
      case 'pause':
        jarvizStore.set({ cameraActive: false, voiceActive: false, fsmState: 'PAUSED' });
        triggerNavFlash('SYSTEM STANDBY / DEACTIVATED');
        break;
      case 'greet':
        triggerNavFlash('SYSTEM AWAKE / WAKEUP PULSE');
        break;
      default:
        break;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-md flex flex-col justify-between overflow-hidden"
      >
        <HudFrame>
          <VoiceEngine enabled={store.voiceActive} />
          
          {/* Navigation Confirmation Flash Banner */}
          <AnimatePresence>
            {navFlash && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ type: 'spring', damping: 20 }}
                className="absolute top-24 left-1/2 -translate-x-1/2 z-[55] px-6 py-2.5 bg-cyan-950/90 border border-cyan-400/40 text-cyan-300 font-mono text-xs tracking-[0.2em] uppercase rounded-full shadow-[0_0_30px_rgba(6,182,212,0.3)] pointer-events-none select-none flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                {navFlash}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Workspace HUD Layout */}
          <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 relative">
            
            {/* TOP HEADER CONTROLS */}
            <div className="flex justify-between items-start w-full flex-wrap gap-4">
              <div className="flex items-start gap-4 flex-wrap">
                <StatusReadout />
                
                {/* Active View Indicator */}
                <div className="flex flex-col space-y-1 select-none pointer-events-none border-l border-white/10 pl-4">
                  <span className="text-[9px] font-mono tracking-[0.4em] text-white/30 uppercase">
                    ACTIVE VIEWPORT
                  </span>
                  <div className="px-3.5 py-2 border border-cyan-500/20 bg-cyan-950/20 backdrop-blur-md rounded-xl font-mono text-[10px] tracking-widest text-cyan-400 font-bold uppercase">
                    {activeTab === 'thesis' && 'THESIS / CORE'}
                    {activeTab === 'neural' && 'WORK / NEURAL'}
                    {activeTab === 'evolution' && 'STORY / EVOLUTION'}
                    {activeTab === 'connect' && 'CONTACT / CONNECT'}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowCommandMap(true)}
                  className="bg-black/60 hover:bg-cyan-950/40 border border-white/10 hover:border-cyan-400/40 text-white/70 hover:text-cyan-400 font-mono text-[9px] tracking-widest px-3 py-2 rounded-xl uppercase transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-xl"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Command manual</span>
                </button>

                <button
                  onClick={handleClose}
                  className="bg-black/60 hover:bg-red-950/40 border border-white/10 hover:border-red-500/40 text-white/70 hover:text-red-400 font-mono text-[9px] tracking-widest px-3 py-2 rounded-xl uppercase transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-xl"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Exit cockpit</span>
                </button>
              </div>
            </div>

            {/* Mobile / Viewport Guard Banner */}
            {isMobile && (
              <div className="mx-auto my-2 w-full max-w-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 font-mono text-[9px] tracking-wider py-2 px-4 rounded-xl uppercase text-center select-none animate-pulse">
                ⚠️ System Advisory: Best experienced on desktop Chrome with webcam & mic enabled. Typed commands remain fully online.
              </div>
            )}

            {/* MIDDLE COCKPIT DISPLAY */}
            <div className="flex-1 flex items-center justify-center relative w-full my-4">
              {showConsent && (
                <div className="z-50 max-w-full">
                  <ConsentCard onDismiss={() => setShowConsent(false)} />
                </div>
              )}

              {/* Feasibility spike instructions */}
              {!showConsent && !store.cameraActive && (
                <div className="text-center font-mono uppercase text-white/30 text-[10px] tracking-[0.2em] leading-relaxed max-w-xs animate-[gentlePulse_3s_ease-in-out_infinite]">
                  [Click Enable Camera above to run on-device computer vision and start Spline synthetic-pointer LookAt spike simulation]
                </div>
              )}
            </div>

            {/* BOTTOM HUD INTERFACE BAR */}
            <div className="flex flex-col sm:flex-row justify-between items-end w-full gap-4">
              {/* Telemetry panel */}
              {store.cameraActive ? (
                <div className="animate-slideUp max-w-full">
                  <GestureTelemetry />
                </div>
              ) : (
                <div className="h-10 invisible" />
              )}

              {/* Chat panel */}
              <div className="max-w-full">
                <TranscriptPanel onExecuteCommand={executeCommandIntent} />
              </div>
            </div>

          </div>
        </HudFrame>

        {/* Command Matrix Overlay */}
        <AnimatePresence>
          {showCommandMap && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-[90]"
            >
              <CommandMap onClose={() => setShowCommandMap(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
