'use client';

import { useEffect, useRef, useState } from 'react';
import { useJarvizStore, jarvizStore } from '@/lib/jarviz/useJarvizStore';
import { parseVoiceCommand, isOpenEndedQuery } from '@/lib/jarviz/commands';
import { speakJarviz, stopJarvizSpeech, loadVoices } from '@/lib/jarviz/speech';
import { streamJarvizGemini } from '@/lib/jarviz/geminiClient';

declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

interface VoiceEngineProps {
  enabled: boolean;
}

export default function VoiceEngine({ enabled }: VoiceEngineProps) {
  const recognitionRef = useRef<any>(null);
  const restartTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isStartedRef = useRef(false);
  const errorCountRef = useRef(0);
  const forceStoppedRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Pre-load voices on mount
  useEffect(() => {
    loadVoices();
  }, []);

  // Sync state loop based on enabled prop
  useEffect(() => {
    if (enabled) {
      forceStoppedRef.current = false;
      errorCountRef.current = 0;
      startListening();
    } else {
      forceStoppedRef.current = true;
      stopListening();
    }

    return () => {
      stopListening();
    };
  }, [enabled]);

  const startListening = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      console.warn('[JARVIZ Voice] SpeechRecognition unsupported in this browser.');
      jarvizStore.set({
        fsmState: 'ERROR',
        errorReason: 'Browser voice recognition is unsupported on this browser. Using typed command fallback.',
        voiceActive: false
      });
      return;
    }

    if (isStartedRef.current) return;

    // Clear any pending restart timer
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }

    try {
      console.log('[JARVIZ Voice] Initializing browser voice recognition');
      jarvizStore.set({ fsmState: 'LISTENING' });

      const recognition = new SpeechRecognitionCtor();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        console.log('[JARVIZ Voice] Audio capture session active');
        isStartedRef.current = true;
        errorCountRef.current = 0;
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcriptSegment = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptSegment;
          } else {
            interimTranscript += transcriptSegment;
          }
        }

        if (interimTranscript) {
          jarvizStore.set({ interimTranscript });
        }

        if (finalTranscript) {
          console.log('[JARVIZ Voice] Final Transcript recognized:', finalTranscript);
          processFinalTranscript(finalTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        const error = event.error;
        console.error('[JARVIZ Voice] Recognition error event:', error);

        if (error === 'aborted') {
          // Normal stop, no scary error
          isStartedRef.current = false;
          return;
        }

        if (error === 'no-speech') {
          // Ignore and let it restart gently without counting as a failure
          return;
        }

        // Increase error count for critical/permission failures
        errorCountRef.current += 1;

        if (error === 'not-allowed' || error === 'service-not-allowed') {
          jarvizStore.set({
            fsmState: 'ERROR',
            errorReason: 'Webcam/Microphone permission denied. Falling back to typed inputs.',
            voiceActive: false
          });
          stopListening();
        } else {
          // General errors (network, audio-capture, etc.)
          if (errorCountRef.current >= 3) {
            jarvizStore.set({
              fsmState: 'ERROR',
              errorReason: `Voice Engine error: ${error}. Using typed command fallback.`,
              voiceActive: false
            });
            stopListening();
          }
        }
      };

      recognition.onend = () => {
        console.log('[JARVIZ Voice] Session ended');
        isStartedRef.current = false;

        // Auto-restart if we are still active and haven't force-stopped
        if (!forceStoppedRef.current && enabled && errorCountRef.current < 3) {
          if (restartTimerRef.current) {
            clearTimeout(restartTimerRef.current);
          }
          restartTimerRef.current = setTimeout(() => {
            if (!forceStoppedRef.current && enabled) {
              startListening();
            }
          }, 600); // 600ms delay to prevent rapid restart loops
        }
      };

      recognitionRef.current = recognition;
      recognition.start();

    } catch (err: any) {
      console.error('[JARVIZ Voice] Exception starting voice recognition:', err);
      jarvizStore.set({
        fsmState: 'ERROR',
        errorReason: 'Could not initialize speech recognition. Using typed fallback.',
        voiceActive: false
      });
    }
  };

  const stopListening = () => {
    forceStoppedRef.current = true;
    
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.onstart = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.stop();
      } catch (err) {
        console.warn('[JARVIZ Voice] Stop recognition exception:', err);
      }
      recognitionRef.current = null;
    }

    isStartedRef.current = false;
    stopJarvizSpeech();
  };

  const processFinalTranscript = async (text: string) => {
    jarvizStore.set({
      transcript: text,
      interimTranscript: ''
    });

    const command = parseVoiceCommand(text);

    if (command.intent !== 'none') {
      // Confirmed navigation command found
      jarvizStore.set({
        fsmState: 'COMMAND_CONFIRMED',
        confirmedCommand: command.label
      });

      if (command.responseSpeech) {
        // Speak short confirmation response
        jarvizStore.set({ fsmState: 'ROBOT_RESPONDING' });
        await speakJarviz(command.responseSpeech);
      }

      // Restore active state
      setTimeout(() => {
        const store = jarvizStore.getSnapshot();
        if (store.fsmState === 'ROBOT_RESPONDING' || store.fsmState === 'COMMAND_CONFIRMED') {
          jarvizStore.set({ 
            fsmState: store.voiceActive ? 'LISTENING' : 'IDLE',
            confirmedCommand: '' 
          });
        }
      }, 1500);

    } else if (isOpenEndedQuery(text)) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      jarvizStore.set({
        fsmState: 'ROBOT_RESPONDING',
        isGeminiStreaming: true,
        transcript: `VOICE: "${text}" → GEMINI QUERY`
      });

      let accumulatedAnswer = '';
      let lastUpdate = Date.now();

      await streamJarvizGemini({
        message: text,
        signal: controller.signal,
        onToken: (token, fullText) => {
          accumulatedAnswer = fullText;
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
          
          await speakJarviz(fullText);

          setTimeout(() => {
            const store = jarvizStore.getSnapshot();
            jarvizStore.set({ fsmState: store.voiceActive ? 'LISTENING' : 'IDLE' });
          }, 2000);
        },
        onError: (err) => {
          console.error('[VoiceEngine] Gemini error:', err);
          jarvizStore.set({
            fsmState: 'ERROR',
            errorReason: 'Gemini bridge unavailable. Local commands still online.',
            isGeminiStreaming: false
          });
          abortControllerRef.current = null;

          setTimeout(() => {
            const store = jarvizStore.getSnapshot();
            jarvizStore.set({ fsmState: store.voiceActive ? 'LISTENING' : 'IDLE' });
          }, 3000);
        }
      });
    } else {
      const fallbackSpeech = 'I can handle navigation commands like work, story, connect, and help.';
      jarvizStore.set({
        fsmState: 'ROBOT_RESPONDING',
        transcript: 'Try work, story, connect, or home.'
      });

      await speakJarviz(fallbackSpeech);

      setTimeout(() => {
        const store = jarvizStore.getSnapshot();
        jarvizStore.set({ fsmState: store.voiceActive ? 'LISTENING' : 'IDLE' });
      }, 3000);
    }
  };

  return null; // Hidden status controller
}
