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
import { X, BookOpen } from 'lucide-react';
import { GESTURE_MAP } from '@/lib/jarviz/commands';

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

  // Esc Key support
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
        // Match label back to GESTURE_MAP intent
        const label = state.confirmedCommand;
        const entry = Object.entries(GESTURE_MAP).find(([_, cmd]) => cmd.label === label);
        if (entry) {
          executeCommandIntent(entry[1].intent);
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
        break;
      case 'nav_story':
        setActiveTab('evolution');
        break;
      case 'nav_connect':
        setActiveTab('connect');
        break;
      case 'nav_home':
        setActiveTab('thesis');
        break;
      case 'show_help':
        setShowCommandMap(true);
        break;
      case 'pause':
        jarvizStore.set({ cameraActive: false, voiceActive: false, fsmState: 'PAUSED' });
        break;
      case 'greet':
        // Wake pulse / css pulse reaction on robot
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
          {/* Main Workspace HUD Layout */}
          <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 relative">
            
            {/* TOP HEADER CONTROLS */}
            <div className="flex justify-between items-start w-full">
              <StatusReadout />

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
