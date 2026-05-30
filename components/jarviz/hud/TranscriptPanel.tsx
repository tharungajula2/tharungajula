'use client';

import { useState, useRef, useEffect } from 'react';
import { useJarvizStore, jarvizStore } from '@/lib/jarviz/useJarvizStore';
import { parseVoiceCommand, GESTURE_MAP, isOpenEndedQuery } from '@/lib/jarviz/commands';
import { streamJarvizGemini } from '@/lib/jarviz/geminiClient';
import { speakJarviz, stopJarvizSpeech } from '@/lib/jarviz/speech';
import { Mic, Terminal, Send } from 'lucide-react';

interface TranscriptPanelProps {
  onExecuteCommand: (intent: string) => void;
}

export default function TranscriptPanel({ onExecuteCommand }: TranscriptPanelProps) {
  const store = useJarvizStore();
  const [inputValue, setInputValue] = useState('');
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleTypeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const query = inputValue.trim();
    jarvizStore.set({ 
      transcript: query,
      interimTranscript: ''
    });

    console.log('[TranscriptPanel] Processing typed query:', query);

    // Try parsing as deterministic command first
    const match = parseVoiceCommand(query);
    if (match.intent !== 'none') {
      jarvizStore.set({ 
        fsmState: 'COMMAND_CONFIRMED',
        confirmedCommand: match.label
      });
      
      onExecuteCommand(match.intent);
      
      if (match.responseSpeech) {
        await speakJarviz(match.responseSpeech, {
          onStart: () => jarvizStore.set({ fsmState: 'ROBOT_RESPONDING' }),
          onEnd: () => {
            const currentSnap = jarvizStore.getSnapshot();
            jarvizStore.set({ 
              fsmState: currentSnap.cameraActive ? 'VISION_ONLINE' : 'IDLE',
              confirmedCommand: '' 
            });
          }
        });
      } else {
        setTimeout(() => {
          const currentSnap = jarvizStore.getSnapshot();
          jarvizStore.set({ 
            fsmState: currentSnap.cameraActive ? 'VISION_ONLINE' : 'IDLE',
            confirmedCommand: '' 
          });
        }, 1200);
      }

    } else if (isOpenEndedQuery(query)) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      jarvizStore.set({
        fsmState: 'ROBOT_RESPONDING',
        isGeminiStreaming: true,
        transcript: `TYPE: "${query}" → GEMINI QUERY`
      });

      let lastUpdate = Date.now();

      await streamJarvizGemini({
        message: query,
        signal: controller.signal,
        onToken: (token, fullText) => {
          if (Date.now() - lastUpdate > 50) {
            jarvizStore.set({ transcript: `GEMINI: ${fullText}` });
            lastUpdate = Date.now();
          }
        },
        onDone: async (fullText) => {
          jarvizStore.set({ 
            transcript: `GEMINI: ${fullText}\n\n[GEMINI: STREAM COMPLETE]`,
            isGeminiStreaming: false 
          });
          abortControllerRef.current = null;

          await speakJarviz(fullText, {
            onStart: () => jarvizStore.set({ fsmState: 'ROBOT_RESPONDING' }),
            onEnd: () => {
              const currentSnap = jarvizStore.getSnapshot();
              jarvizStore.set({ fsmState: currentSnap.cameraActive ? 'VISION_ONLINE' : 'IDLE' });
            }
          });
        },
        onError: (err) => {
          console.error('[TranscriptPanel] Gemini error:', err);
          jarvizStore.set({
            fsmState: 'ERROR',
            errorReason: 'Gemini bridge unavailable. Local commands still online.',
            isGeminiStreaming: false
          });
          abortControllerRef.current = null;

          setTimeout(() => {
            const currentSnap = jarvizStore.getSnapshot();
            jarvizStore.set({ fsmState: currentSnap.cameraActive ? 'VISION_ONLINE' : 'IDLE' });
          }, 3000);
        }
      });
    } else {
      const fallbackSpeech = 'I can handle navigation commands like work, story, connect, and help.';
      await speakJarviz(fallbackSpeech, {
        onStart: () => jarvizStore.set({ fsmState: 'ROBOT_RESPONDING' }),
        onEnd: () => {
          const currentSnap = jarvizStore.getSnapshot();
          jarvizStore.set({ fsmState: currentSnap.cameraActive ? 'VISION_ONLINE' : 'IDLE' });
        }
      });
    }

    setInputValue('');
  };

  return (
    <div className="flex flex-col space-y-3 bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl w-full max-w-[320px] shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase">
          <Terminal className="w-3.5 h-3.5" />
          <span>COMMAND_BUS</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase">
            {store.voiceActive ? 'VOICE_ON' : 'VOICE_OFF'}
          </span>
          <div className={`w-1.5 h-1.5 rounded-full ${store.voiceActive ? 'bg-purple-400 animate-ping' : 'bg-white/20'}`} />
        </div>
      </div>

      {/* Transcription Terminal View */}
      <div className="h-28 bg-black/60 border border-white/5 rounded-xl p-3 overflow-y-auto no-scrollbar font-mono text-[10px] leading-relaxed flex flex-col justify-end space-y-1">
        {store.transcript ? (
          <div className="text-white/80 animate-fadeIn uppercase select-all relative">
            <span className="text-cyan-400/80 mr-1.5">&gt;&gt;</span>
            {store.transcript}
            {store.isGeminiStreaming && (
              <span className="inline-block w-1.5 h-3 ml-1 bg-cyan-400 animate-[pulse_1s_infinite]" />
            )}
          </div>
        ) : store.interimTranscript ? (
          <div className="text-white/40 italic">
            <span className="text-purple-400/80 mr-1.5">&gt;</span>
            {store.interimTranscript}
          </div>
        ) : (
          <div className="text-white/25 text-center select-none py-4">
            [COCKPIT LOGS CLEAR - READY FOR INPUT]
          </div>
        )}

        {store.confirmedCommand && (
          <div className="text-cyan-400 font-bold animate-pulse text-[9px] border-t border-cyan-500/20 pt-1 uppercase">
            ACTION: {store.confirmedCommand}
          </div>
        )}
      </div>

      {/* Stop Streaming Trigger */}
      {store.isGeminiStreaming && (
        <button
          type="button"
          onClick={() => {
            if (abortControllerRef.current) {
              abortControllerRef.current.abort();
            }
            stopJarvizSpeech();
            jarvizStore.set({
              isGeminiStreaming: false,
              fsmState: store.cameraActive ? 'VISION_ONLINE' : 'IDLE',
              transcript: 'GEMINI STREAM INTERRUPTED BY USER.'
            });
          }}
          className="w-full bg-red-950/30 hover:bg-red-950/60 border border-red-500/20 hover:border-red-500/50 text-red-300 font-mono text-[8px] tracking-widest py-1.5 rounded-xl uppercase transition-all cursor-pointer text-center active:scale-95 shadow-xl font-bold"
        >
          ■ STOP RESPONSE
        </button>
      )}

      {/* Typed Input Form Fallback */}
      <form onSubmit={handleTypeSubmit} className="flex gap-1.5">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type terminal command..."
            disabled={store.isGeminiStreaming}
            className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 text-[10px] font-mono text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50 uppercase tracking-wider disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={store.isGeminiStreaming}
          className="bg-white/5 hover:bg-cyan-950 hover:border-cyan-400/40 border border-white/10 text-white hover:text-cyan-400 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center active:scale-95 disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      <div className="text-[8px] font-mono text-white/30 uppercase text-center tracking-wider">
        Try &quot;work&quot;, &quot;story&quot;, &quot;connect&quot; or &quot;home&quot;
      </div>
    </div>
  );
}
