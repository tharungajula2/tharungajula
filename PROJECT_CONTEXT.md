# THARUN GAJULA // MASTER PROJECT CONTEXT
**Version: 10.0 — Total Identity Consolidation (2026-03-26)**

> **AI AGENT DIRECTIVE:** This is the absolute latest, 100% verified source of truth for the Tharun Gajula repository. Feed this file to any new AI agent to fully replicate the project—its current state, identity, design system, and component implementations. If building a new feature or migrating to a new chat, READ THIS ENTIRE DOCUMENT.

---

## 1. THE IDENTITY & MISSION

| Field | Value |
|---|---|
| **Name** | Tharun Gajula |
| **Archetype** | Learning Systems Builder / Risk Quant |
| **Location** | Bengaluru, India |
| **Philosophy** | Building systems that amplify thought. I bridge the gap between complex Business Strategy, Regulatory Compliance, and Applied AI. |
| **Site Mission** | This repository serves as the personal lab and public archive for experiments in systems-thinking, AI-native workflows, and experimental digital builds. |
| **Hero Tagline** | `Building Better Ways to Learn, Think, and Build.` |

---

## 2. THE DESIGN SYSTEM & UI TOKENS

> This is the visual DNA. Every component conforms to these strict tokens to maintain a premium, terminal-like glassmorphic aesthetic.

### 2A. Global Background & Grid
```css
/* Custom Global Background defined in app/layout.tsx */
background-color: #020617;  /* Tailwind slate-950 base */
/* Grid overlay: */
background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
background-size: 64px 64px; 
min-height: 100vh;
```
- **Refractive Orbs:** In `layout.tsx`, two ambient blurred orbs (`bg-cyan-600/20`) live at the top-left and bottom-right to create uniform glassmorphism refractions.
- **Transparent Surfaces:** All main pages (`app/page.tsx`, `app/profile/page.tsx`, etc.) use `bg-transparent` so that the global animated grid shines through unblocked over the entire application.

### 2B. Surface Variants

**HUD Panel** (Navbar, Dock):
```
bg-slate-900/30 backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),_0_0_20px_rgba(0,0,0,0.5)]
```

**Glowing Gateway Window** (The Portal Card):
```
bg-slate-900/50 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl
```

### 2C. Typography System
| Role | Classes |
|---|---|
| **H1s/Hero** | `font-heading text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400` |
| **Nav Links** | `font-mono uppercase tracking-widest text-[8px] md:text-[10px] text-slate-400 hover:text-cyan-400` |
| **Body Text** | `font-body text-sm leading-relaxed text-slate-300` |

### 2D. Font Sources (Google Fonts injected via Next.js)
```typescript
Inter       → variable: "--font-inter"  → className: font-body
Outfit      → variable: "--font-outfit" → className: font-heading
JetBrains   → variable: "--font-mono"   → className: font-mono
```

---

## 3. ROUTING & CURRENT ARCHITECTURE

This repository serves as the builder's public workspace and concept lab.

| Route | File | Background | Description |
|---|---|---|-----------|
| `/` | `app/page.tsx` | `bg-transparent` | Home Desktop: Navbar + Hero Text ("Building Better Ways"). |
| `/profile` | `app/profile/page.tsx` | `bg-transparent` | The Manifesto, Core Capabilities (Learning System Design, AI-Native Workflows, Thinking Tools, Public Build Practice), and Focus. Designed specifically to fit in one frame. |
| `/contact` | `app/contact/page.tsx` | `bg-transparent` | Comms relay for educational tech collaboration, research conversations, and system-building inquiries. |

---

## 4. COMPONENT MAP

### 4A. Layout Components

#### `components/layout/navbar.tsx`
- **Branding:** `THARUN GAJULA` + custom `<TllLogo />`.
- **System Tray:** A live IST (Indian Standard Time) clock ticker with an emerald pulsing dot. Includes a quick `Home` icon link.

#### `components/layout/footer.tsx` (THE APP DOCK)
- **Position:** Floating Pill HUD (`fixed bottom-6 left-1/2 -translate-x-1/2`).
- **Copyright:** Always set globally to © 2026 Tharun Gajula.
- **Pillars:** 
  1. `HOME` (/)
  2. `ABOUT` (/profile)
  3. `CONTACT` (/contact)

---

## 5. RECENT CLEANUP (Version 10.0)

1. **Total Identity Shift:** Consolidated all branding under **Tharun Gajula**. Eradicated sub-brands like "Curiosity OS" and "Learning Lab" in favor of a unified personal experimental lab.
2. **Legacy Sanitization:** Fully purged "tharun-os" and "tharunlearninglab" references from `package.json`, `package-lock.json`, and build caches.
3. **Registry Correction:** Fixed root-level issues that caused automated creation of legacy directories upon running the dev server.
4. **Spacecraft Purge:** Removed the 3D Spacecraft mesh from the homepage to achieve a minimalist, pure-space aesthetic while retaining the hardware-accelerated starfield.

---

## 6. ENCODING RULES FOR AI AGENTS (IN NEW CHATS)

If you have just arrived in a new chat thread and have been fed this document:
1. **You are in "Tharun Gajula", a personal builder's notebook & experimental workspace.**
2. **Never build modal popups.** Maintain the full-page, terminal-like architecture.
3. **Respect the color palette:** Slate-950 background, Cyan highlights, white/10 borders, glassmorphic `backdrop-blur` panes, `bg-transparent` wrappers on sections.
4. **Current Objective:** You now possess the 100% complete and verified context of this repository. Ask the user what feature they wish to build next upon this builder's headquarters.
