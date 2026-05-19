# BRAIN ARCHITECTURE — The Complete Beginner's Guide

**Last Updated:** May 12, 2026  
**Purpose:** Understand every folder, file, and connection inside this portfolio's intelligence and data layers.

---

## 1. THE BIG PICTURE — Data Layer vs. Brain

The architecture has evolved into two distinct layers:
1. **The Static Data Layer (`data/`)**: Drives the public UI natively via TypeScript arrays.
2. **The Brain Layer (`brain/`)**: An offline, Git-ignored personal CRM and knowledge compilation pipeline.

The complex markdown-parsing pipeline that previously drove the UI has been decoupled. The web application is now purely powered by structured TypeScript files for maximum performance and predictability.

---

## 2. THE UI DATA LAYER (`data/`)

The public interface reads entirely from static TypeScript definitions.

### `data/neuralData.ts`
Drives the 2D `NeuralGraph` component. 
- Defines the `nodes` (projects, skills, roles) with group IDs and size values.
- Defines the `links` (edges) creating the force-directed physics simulation of Tharun's capabilities.

### `data/systems.ts`
Drives list-based archives and concept prototype displays.
- Stores metadata (status, tags, URL) for projects like Parents Health OS, Trellis, and Quant OS.

---

## 3. THE HIDDEN MISSION CONTROL & CRM

**CRITICAL UPDATE:** The frontend CHIRON Tracker dashboard and its associated Vault Authentication have been **completely removed** from the web application. 

The Mission Control is now a purely **offline, local-first workflow** residing in the `brain/` directory. There is no web interface for CRM tracking.

### 3.1 The Target Pipeline (`brain/raw/strategy/founder-target-list.md`)
This is the "Source of Truth" for the active outreach strategy. 
- Uses a markdown table with status emojis.
- Exists only locally on Tharun's machine.

### 3.2 The Outreach Log (`brain/raw/strategy/outreach-notes.md`)
A qualitative dump for field intel and the 4-point outreach checklist.

---

## 4. AGENT / AI INTERACTION POINTS

The portfolio features a native, edge-deployed AI interaction layer rather than just static documentation.

### 4.1 The Interface (`AIChatPanel.tsx`)
- Triggered via the "Talk to Me" CTA on the 3D Spline Avatar.
- A glassmorphic slide-up panel that maintains a conversational thread.

### 4.2 The Engine (`app/api/chat/route.ts`)
- Uses the **Edge Runtime** to bypass standard serverless timeouts.
- Connects directly to **Gemini 2.5 Flash-Lite** via a streaming REST API endpoint (SSE).

### 4.3 The Knowledge Base (`lib/ai-context.ts`)
- The AI does not hallucinate; it is strictly grounded by the `THARUN_CONTEXT` string.
- This file acts as the master AI knowledge base, injecting verified details about the Agentic Engineering focus, quantitative background, and design philosophy into every system prompt.

---

## 5. THE APPLICATION FACTORY (OFFLINE)

The `brain/Templates/Application_Factory` is designed to be **duplicated** locally for every founder target.

1. **Research First**: `10_research.md` forces mapping of 4 Pillars to the founder's problem.
2. **Proof of Work**: Focuses on "48-hour builds" before interviews.
3. **The Narrative**: `30_cover_letter.md` uses a "Credibility → Motivation → Bridge" framework.

---

## 6. THE DATA PIPELINE — End-to-End Summary

```
PUBLIC UI PIPELINE:
data/*.ts files  →  React Components (NeuralGraph, WorkOverview)  →  Next.js Static Render

AI PIPELINE:
User Input  →  AIChatPanel  →  Edge API Route + ai-context.ts  →  Gemini API  →  Streaming Response

OFFLINE CRM PIPELINE:
Master Source V5  →  Application Factory (Templates)  →  Founder Target List (Local Markdown)
```

---

*End of Brain Architecture Documentation.*
