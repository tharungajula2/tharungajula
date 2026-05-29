/**
 * GestureEngine.ts
 * Implements rule-based finger math, velocity queues, and confirmation thresholds for Phase 1.
 * Currently serves as a placeholder during the Phase 0 Spline spike.
 */

export interface HandLandmark {
  x: number;
  y: number;
  z: number;
}

export class GestureEngine {
  private wristXBuffer: number[] = [];
  private bufferSize = 8;

  /**
   * Pushes a wrist X position (normalized [0, 1]) and checks for swipe gestures.
   * mirror = CSS scaleX(-1) in mind, direction determined in screen space.
   */
  trackSwipe(wristX: number, timestamp: number): 'swipe_left' | 'swipe_right' | null {
    this.wristXBuffer.push(wristX);
    if (this.wristXBuffer.length > this.bufferSize) {
      this.wristXBuffer.shift();
    }

    if (this.wristXBuffer.length < this.bufferSize) return null;

    const deltaX = this.wristXBuffer[this.wristXBuffer.length - 1] - this.wristXBuffer[0];
    
    // Swipe left/right heuristics from spec: delta threshold 0.18
    if (deltaX > 0.18) {
      this.wristXBuffer = []; // Clear buffer to prevent double fires
      return 'swipe_right';
    } else if (deltaX < -0.18) {
      this.wristXBuffer = [];
      return 'swipe_left';
    }

    return null;
  }

  /**
   * Custom heuristic fallback for finger extensions
   * computed using 21 landmarks returned by MediaPipe.
   */
  analyzeFingers(landmarks: HandLandmark[]): string {
    if (!landmarks || landmarks.length < 21) return 'Unknown';
    return 'Placeholder';
  }
}

export const gestureEngine = new GestureEngine();
