'use client';

import { useEffect, useRef, useState } from 'react';
import { jarvizStore } from '@/lib/jarviz/useJarvizStore';
import { splineController } from './SplineController';
import { GESTURE_MAP } from '@/lib/jarviz/commands';
import { Camera, AlertTriangle } from 'lucide-react';

// Module-scoped caching to prevent duplicate CDN loading/instantiations
let cachedVision: any = null;
let cachedRecognizer: any = null;
let loadingPromise: Promise<any> | null = null;

async function getOrLoadRecognizer(timeoutMs = 12000): Promise<any> {
  if (cachedRecognizer) {
    console.log('[JARVIZ Vision] Returning cached GestureRecognizer instance');
    return cachedRecognizer;
  }
  if (loadingPromise) {
    console.log('[JARVIZ Vision] Awaiting existing MediaPipe loading promise');
    return loadingPromise;
  }

  loadingPromise = (async () => {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('MediaPipe download timeout')), timeoutMs);
    });

    console.log('[JARVIZ Vision] MediaPipe import started');
    const importPromise = import('@mediapipe/tasks-vision');
    const { FilesetResolver, GestureRecognizer } = await Promise.race([importPromise, timeoutPromise]) as any;

    console.log('[JARVIZ Vision] WASM resolver started');
    let vision = cachedVision;
    if (!vision) {
      const visionPromise = FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm'
      );
      vision = await Promise.race([visionPromise, timeoutPromise]) as any;
      cachedVision = vision;
      console.log('[JARVIZ Vision] WASM resolver ready');
    }

    console.log('[JARVIZ Vision] model loading started');
    const recognizerPromise = GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: 'https://storage.googleapis.com/mediapipe-tasks/gesture_recognizer/gesture_recognizer.task',
        delegate: 'GPU',
      },
      runningMode: 'VIDEO',
      numHands: 2,
      minHandDetectionConfidence: 0.6,
      minHandPresenceConfidence: 0.6,
      minTrackingConfidence: 0.6,
    });
    const recognizer = await Promise.race([recognizerPromise, timeoutPromise]) as any;
    console.log('[JARVIZ Vision] recognizer ready');
    cachedRecognizer = recognizer;
    return recognizer;
  })();

  try {
    const res = await loadingPromise;
    return res;
  } catch (err) {
    console.error('[JARVIZ Vision] MediaPipe failed with error:', err);
    loadingPromise = null; // reset loading promise so we can retry later
    throw err;
  }
}

interface VisionEngineProps {
  enabled: boolean;
}

export default function VisionEngine({ enabled }: VisionEngineProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [streamActive, setStreamActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  // Idempotency and Lifecycle Refs
  const isStartingRef = useRef(false);
  const isStartedRef = useRef(false);
  const cancelledRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recognizerRef = useRef<any>(null);
  const startAttemptCountRef = useRef(0);

  // Active Loop Token to fully prevent orphaned requestAnimationFrame threads
  const activeLoopIdRef = useRef<number>(0);

  // Video frame control ref
  const lastVideoTimeRef = useRef<number>(-1);
  const [modelLoading, setModelLoading] = useState(false);

  // Gesture buffers & cooldowns
  const gestureHistoryRef = useRef<string[]>([]);
  const wristBufferRef = useRef<{ x: number; time: number }[]>([]);
  const cooldownUntilRef = useRef<number>(0);
  const lastTelemetryUpdateRef = useRef<number>(0);
  
  // FPS Tracking
  const lastFrameTimeRef = useRef<number>(performance.now());
  const [fps, setFps] = useState<number>(0);

  // Stabilized mount/prop trigger loop
  useEffect(() => {
    // Monkey-patch console.error to silence false positive MediaPipe internal INFO messages
    const originalConsoleError = console.error;
    console.error = (...args: any[]) => {
      const msg = args[0];
      if (
        typeof msg === 'string' &&
        (msg.includes('INFO: Created TensorFlow Lite') ||
         msg.includes('Created TensorFlow Lite XNNPACK delegate'))
      ) {
        console.info('[MediaPipe Info]', ...args);
        return;
      }
      originalConsoleError.apply(console, args);
    };

    if (!enabled) {
      console.log('[JARVIZ Vision] stopCamera complete: enabled is false');
      stopCamera();
      startAttemptCountRef.current = 0;
      console.error = originalConsoleError; // Restore original console
      return;
    }

    startCamera();

    return () => {
      stopCamera();
      console.error = originalConsoleError; // Restore original console
    };
  }, [enabled]);

  // Synchronize stream changes to video element after mount/render pass
  useEffect(() => {
    if (streamActive && streamRef.current && videoRef.current) {
      console.log('[JARVIZ Vision] Binding camera stream to video ref element');
      videoRef.current.srcObject = streamRef.current;
    }
  }, [streamActive]);

  const startCamera = async () => {
    // Guards to guarantee idempotency and avoid infinite loop recursions
    if (isStartingRef.current || isStartedRef.current) {
      console.log('[JARVIZ Vision] startCamera ignored: already starting/started');
      return;
    }

    // Safety DEV Kill Switch
    if (startAttemptCountRef.current >= 2) {
      console.error('[JARVIZ Vision] Vision startup loop prevented (max start count exceeded)');
      const loopError = 'Vision startup loop prevented.';
      setCameraError(loopError);
      jarvizStore.set({ 
        fsmState: 'ERROR', 
        errorReason: loopError, 
        cameraActive: false 
      });
      return;
    }

    console.log('[JARVIZ Vision] startCamera requested');
    isStartingRef.current = true;
    cancelledRef.current = false;
    startAttemptCountRef.current += 1;
    setCameraError(null);
    setModelLoading(true);
    
    // Set pending UI state exactly once
    jarvizStore.set({ fsmState: 'CAMERA_PERMISSION_PENDING' });

    try {
      // 1. Request Webcam Permission
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
        audio: false,
      });

      // Check if user closed cockpit/disabled camera mid-permission request
      if (cancelledRef.current) {
        console.log('[JARVIZ Vision] Camera startup aborted: component was disabled.');
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setStreamActive(true);

      // 2. Load MediaPipe dependencies lazily with caching, timeout, and one-time logging
      const recognizer = await getOrLoadRecognizer(12000);

      // Check again for cancellation before initializing WASM/task
      if (cancelledRef.current) {
        console.log('[JARVIZ Vision] Model initialization aborted: component disabled.');
        return;
      }

      recognizerRef.current = recognizer;
      setModelLoading(false);
      isStartedRef.current = true;
      console.log('[JARVIZ Vision] MediaPipe ready');
      
      // Update FSM state to ONLINE
      jarvizStore.set({ fsmState: 'VISION_ONLINE' });

      // Start the detection stream
      if (videoRef.current) {
        const video = videoRef.current;
        console.log('[JARVIZ Vision] video ready');
        if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
          startDetectLoop();
        } else {
          video.onloadedmetadata = () => {
            if (!cancelledRef.current) {
              startDetectLoop();
            }
          };
        }
      }

    } catch (err: any) {
      console.error('[VisionEngine] Camera/MediaPipe startup error:', err);
      stopCamera();
      
      const isTimeout = err.message?.includes('timeout');
      const errorMsg = isTimeout
        ? 'Gesture engine could not load. Voice and typed commands remain online.'
        : (err.name === 'NotAllowedError' 
          ? 'Camera permission denied.' 
          : 'Could not load MediaPipe resources.');
      
      setCameraError(errorMsg);
      
      jarvizStore.set({ 
        fsmState: 'ERROR', 
        errorReason: errorMsg, 
        cameraActive: false 
      });
    } finally {
      isStartingRef.current = false;
    }
  };

  const stopCamera = () => {
    cancelledRef.current = true;
    isStartedRef.current = false;
    isStartingRef.current = false;
    
    stopDetectLoop();

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    // We dereference the recognizer from the active component instead of closing the global cached instance
    recognizerRef.current = null;
    
    // Reset local telemetry caches
    gestureHistoryRef.current = [];
    wristBufferRef.current = [];
    setStreamActive(false);
    setModelLoading(false);
  };

  const startDetectLoop = () => {
    // Increment active loop token to invalidate any previous/parallel loops
    const currentLoopId = activeLoopIdRef.current + 1;
    activeLoopIdRef.current = currentLoopId;
    console.log('[JARVIZ Vision] detect loop started with active ID:', currentLoopId);

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const runDetect = () => {
      // Loop-Safety check: If loop token mismatches, kill the execution thread instantly
      if (cancelledRef.current || activeLoopIdRef.current !== currentLoopId || !videoRef.current || !recognizerRef.current) {
        console.log('[JARVIZ Vision] Terminating orphaned detect loop ID:', currentLoopId);
        return;
      }

      const video = videoRef.current;
      const recognizer = recognizerRef.current;
      const nowMs = performance.now();

      // 1. Calculate stable, realistic FPS (avoiding Infinity / fast-refresh batch spikes)
      const delta = nowMs - lastFrameTimeRef.current;
      lastFrameTimeRef.current = nowMs;
      
      let currentFps = 0;
      if (delta > 0) {
        currentFps = Math.round(1000 / delta);
        if (currentFps > 120) currentFps = 60; // Clamp outlier batch refresh triggers
      }
      setFps(currentFps);

      // 2. Perform frame inference
      if (
        video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
        video.currentTime !== lastVideoTimeRef.current
      ) {
        lastVideoTimeRef.current = video.currentTime;
        try {
          const result = recognizer.recognizeForVideo(video, nowMs);
          processGestureResult(result, nowMs);
        } catch (err) {
          console.error('[JARVIZ Vision] Inference exception:', err);
        }
      }

      if (!cancelledRef.current && activeLoopIdRef.current === currentLoopId) {
        rafRef.current = requestAnimationFrame(runDetect);
      }
    };

    rafRef.current = requestAnimationFrame(runDetect);
  };

  const stopDetectLoop = () => {
    activeLoopIdRef.current = 0; // Invalidates any running thread checks
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const processGestureResult = (result: any, nowMs: number) => {
    const hasHands = result.landmarks && result.landmarks.length > 0;
    
    if (!hasHands) {
      // Clean buffers
      gestureHistoryRef.current = [];
      wristBufferRef.current = [];

      // Throttle idle telemetry store updates (8-10 FPS max)
      if (nowMs - lastTelemetryUpdateRef.current > 110) {
        jarvizStore.set({ 
          fsmState: 'VISION_ONLINE',
          lastGesture: 'None',
          gestureConfidence: 0
        });
        lastTelemetryUpdateRef.current = nowMs;
      }
      return;
    }

    // 1. Coordinates Lookup (Index MCP 5 centered look-at)
    const landmarks = result.landmarks[0];
    const trackingLandmark = landmarks[5] || landmarks[0];

    // Screen-space mapping (Mirrored x for selfie-PIP natural direction)
    const screenX = 1 - trackingLandmark.x;
    const screenY = trackingLandmark.y;

    // Real-time look-at event dispatch (every frame for absolute fluid dynamics!)
    splineController.triggerSyntheticLookAt(screenX, screenY);

    // 2. Identify top gesture
    const gestures = result.gestures?.[0];
    const topGesture = gestures?.[0];
    let categoryName = topGesture?.categoryName || 'None';
    const score = topGesture?.score ?? 0;

    // Filter out low scores
    if (score < 0.6) {
      categoryName = 'None';
    }

    // 3. Static gesture smoothing (requires 5 consecutive matching frames)
    gestureHistoryRef.current.push(categoryName);
    if (gestureHistoryRef.current.length > 5) {
      gestureHistoryRef.current.shift();
    }

    const isConsecutive = gestureHistoryRef.current.length === 5 && 
                          gestureHistoryRef.current.every(g => g === categoryName && g !== 'None');

    // 4. Dynamic Swipe Engine (uses wrist landmark 0 rolling queue)
    const wrist = landmarks[0];
    const screenWristX = 1 - wrist.x;
    
    wristBufferRef.current.push({ x: screenWristX, time: nowMs });
    
    // Prune entries older than 400ms
    while (wristBufferRef.current.length > 0 && nowMs - wristBufferRef.current[0].time > 400) {
      wristBufferRef.current.shift();
    }
    
    // Limit buffer length to 8
    if (wristBufferRef.current.length > 8) {
      wristBufferRef.current.shift();
    }

    let detectedSwipe: 'swipe_left' | 'swipe_right' | null = null;
    const isCooldownActive = nowMs < cooldownUntilRef.current;

    // Perform swipe check if open hand and no cooldown
    if (wristBufferRef.current.length >= 4 && !isCooldownActive && (categoryName === 'Open_Palm' || categoryName === 'None')) {
      const deltaX = wristBufferRef.current[wristBufferRef.current.length - 1].x - wristBufferRef.current[0].x;
      
      if (deltaX > 0.18) {
        detectedSwipe = 'swipe_right';
        wristBufferRef.current = []; // Reset queue
      } else if (deltaX < -0.18) {
        detectedSwipe = 'swipe_left';
        wristBufferRef.current = []; // Reset queue
      }
    }

    // 5. Command Confirmation Dispatcher (instant confirmation, blocked by cooldown)
    if (!isCooldownActive) {
      if (detectedSwipe) {
        cooldownUntilRef.current = nowMs + 1200;
        const matchedCommand = GESTURE_MAP[detectedSwipe];
        
        if (matchedCommand) {
          jarvizStore.set({
            fsmState: 'COMMAND_CONFIRMED',
            confirmedCommand: matchedCommand.label,
            lastGesture: detectedSwipe,
            gestureConfidence: 1.0
          });
          
          setTimeout(() => {
            const current = jarvizStore.getSnapshot();
            if (current.fsmState === 'COMMAND_CONFIRMED') {
              jarvizStore.set({ confirmedCommand: '' });
            }
          }, 1500);
        }
      } else if (isConsecutive && GESTURE_MAP[categoryName]) {
        cooldownUntilRef.current = nowMs + 1200;
        gestureHistoryRef.current = []; // Clear
        const matchedCommand = GESTURE_MAP[categoryName];

        jarvizStore.set({
          fsmState: 'COMMAND_CONFIRMED',
          confirmedCommand: matchedCommand.label,
          lastGesture: categoryName,
          gestureConfidence: score
        });

        setTimeout(() => {
          const current = jarvizStore.getSnapshot();
          if (current.fsmState === 'COMMAND_CONFIRMED') {
            jarvizStore.set({ confirmedCommand: '' });
          }
        }, 1500);
      }
    }

    // 6. Throttled Telemetry Store Updates (8-10 FPS max to avoid React render spikes)
    const isCurrentlyConfirming = jarvizStore.getSnapshot().fsmState === 'COMMAND_CONFIRMED';
    if (!isCurrentlyConfirming) {
      const numHands = result.landmarks.length;
      
      // Victory / Two hands trigger map override check (unthrottled instant command)
      if (numHands === 2 && !isCooldownActive) {
        cooldownUntilRef.current = nowMs + 1200;
        jarvizStore.set({
          fsmState: 'COMMAND_CONFIRMED',
          confirmedCommand: GESTURE_MAP['Victory'].label,
          lastGesture: 'Two_Hands',
          gestureConfidence: 1.0
        });
        setTimeout(() => {
          const current = jarvizStore.getSnapshot();
          if (current.fsmState === 'COMMAND_CONFIRMED') {
            jarvizStore.set({ confirmedCommand: '' });
          }
        }, 1500);
      } else if (nowMs - lastTelemetryUpdateRef.current > 110) {
        // Standard throttled tracking updates
        const activeLabel = isConsecutive ? categoryName : 'None';
        jarvizStore.set({
          fsmState: isConsecutive ? 'GESTURE_CANDIDATE' : 'HAND_DETECTED',
          lastGesture: activeLabel !== 'None' ? activeLabel : (categoryName !== 'None' ? categoryName : 'Tracking...'),
          gestureConfidence: score > 0 ? score : 0.8
        });
        lastTelemetryUpdateRef.current = nowMs;
      }
    }
  };

  if (cameraError) {
    return (
      <div className="bg-red-950/40 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 max-w-sm mt-4">
        <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
        <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider">{cameraError}</span>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 bg-neutral-950">
      {streamActive ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover scale-x-[-1]"
          />
          <div className="absolute inset-0 border border-cyan-400/20 pointer-events-none flex flex-col justify-between p-2">
            <div className="flex justify-between items-center w-full">
              <div className="px-2 py-0.5 bg-cyan-950/80 border border-cyan-400/30 rounded text-[8px] font-mono text-cyan-400 tracking-widest uppercase">
                {modelLoading ? '● INITIALIZING MODELS' : '● LIVE ON-DEVICE CV'}
              </div>
              {!modelLoading && (
                <div className="px-2 py-0.5 bg-neutral-950/80 border border-white/5 rounded text-[8px] font-mono text-white/50 tracking-wider">
                  {fps} FPS
                </div>
              )}
            </div>

            {modelLoading ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-cyan-400 font-mono text-[9px] uppercase tracking-widest gap-2 bg-neutral-950/80 absolute inset-0">
                <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                <span>Downloading MediaPipe WASM...</span>
              </div>
            ) : (
              <div className="w-full flex justify-center pb-2">
                <div className="w-6 h-6 border border-dashed border-cyan-400/40 rounded-full animate-[spin_10s_linear_infinite] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-white/20 p-6">
          <Camera className="w-8 h-8 mb-2" strokeWidth={1} />
          <span className="text-[9px] font-mono tracking-widest uppercase">Video feed off</span>
        </div>
      )}
    </div>
  );
}
