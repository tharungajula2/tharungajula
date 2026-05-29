import type { Application } from '@splinetool/runtime';

class SplineControllerManager {
  private splineApp: Application | null = null;
  private canvasElement: HTMLCanvasElement | null = null;

  setApplication(app: Application) {
    this.splineApp = app;
    console.log('[SplineController] Spline Application instance registered.');
    
    // SPIKE STEP: Enable global window-wide events for Look At triggers
    try {
      app.setGlobalEvents(true);
      console.log('[SplineController] setGlobalEvents(true) called successfully.');
    } catch (err) {
      console.warn('[SplineController] Failed to setGlobalEvents(true):', err);
    }

    // Try to find target objects for verification/direct rotation fallback
    try {
      // Find the Spline canvas element in DOM
      this.canvasElement = document.querySelector('canvas');
      if (this.canvasElement) {
        console.log('[SplineController] Canvas element identified in DOM.');
      }
    } catch (err) {
      console.warn('[SplineController] Error locating canvas:', err);
    }
  }

  getApp() {
    return this.splineApp;
  }

  /**
   * Performs the feasibility spike:
   * Dispatches synthetic pointermove & mousemove events directly to the window
   * at specified viewport coordinates (relative to the canvas).
   */
  triggerSyntheticLookAt(normalizedX: number, normalizedY: number) {
    if (!this.canvasElement) {
      this.canvasElement = document.querySelector('canvas');
    }
    
    const canvas = this.canvasElement;
    if (!canvas) {
      console.warn('[SplineController] Synthetic lookat failed: Canvas not found.');
      return;
    }

    const rect = canvas.getBoundingClientRect();
    // Map normalized webcam coords [0, 1] to exact window pixels
    const clientX = rect.left + normalizedX * rect.width;
    const clientY = rect.top + normalizedY * rect.height;

    // Disabled to prevent DevTools console spam and maintain high performance
    // console.log(`[SplineController] SPIKE DISPATCH: pointermove/mousemove at x:${clientX.toFixed(1)}, y:${clientY.toFixed(1)}`);

    try {
      // Create and dispatch PointerEvent
      const pointerEvent = new PointerEvent('pointermove', {
        clientX,
        clientY,
        bubbles: true,
        cancelable: true,
        view: window
      });
      window.dispatchEvent(pointerEvent);

      // Create and dispatch MouseEvent fallback
      const mouseEvent = new MouseEvent('mousemove', {
        clientX,
        clientY,
        bubbles: true,
        cancelable: true,
        view: window
      });
      window.dispatchEvent(mouseEvent);
    } catch (err) {
      console.error('[SplineController] Error dispatching synthetic pointer events:', err);
    }
  }

  dispose() {
    this.splineApp = null;
    this.canvasElement = null;
  }
}

export const splineController = new SplineControllerManager();
