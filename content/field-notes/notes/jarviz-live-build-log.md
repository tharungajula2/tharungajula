---
title: "What I learned building JARVIZ Live"
slug: "jarviz-live-build-log"
type: "build-log"
status: "active"
date: "2026-06-01"
updated: "2026-06-01"
tags: ["build-log", "portfolio", "systems-design"]
relatedTrack: "agents"
relatedProject: "jarviz-live"
visibility: "public"
summary: "An honest teardown of implementing local MediaPipe vision, Web Speech interfaces, and Edge SSE streams."
sourceType: "original"
confidenceLevel: "confident"
---

JARVIZ Live runs MediaPipe vision on-device, browser voice recognition, and a Gemini model streamed over Edge SSE, with a Spline 3D scene. Here's what each part actually taught me — including the parts that fought back.

## What this note is for
To document the actual hardware, latency, and integration engineering trade-offs faced when coordinating multi-modal inputs with local web animations.

## What I need to understand
- How to further minimize on-device frame processing overhead when running computer vision inside standard browser threads.
- Mitigating natural transcription noise in Web Speech API interfaces without introducing lag in execution.
- Optimizing SSE connection states to recover instantly from temporary network drops.

## Next update
Add the exact state-machine logic diagram used to handle camera calibration and consent transitions.
