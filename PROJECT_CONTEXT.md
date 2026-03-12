# CURIOSITY OS // MASTER PROJECT CONTEXT
**Version: 8.0 — The Static Headquarters Sync (2026-03-12)**

> **AI AGENT DIRECTIVE:** This is the absolute latest, 100% verified source of truth for the Tharun OS / Tharun Learning Lab repository. Feed this file to any new AI agent to fully replicate the project—its current state, identity, design system, and component implementations. If building a new feature or migrating to a new chat, READ THIS ENTIRE DOCUMENT.

---

## 1. THE IDENTITY & MISSION

| Field | Value |
|---|---|
| **Name** | Tharun Kumar Gajula |
| **Archetype** | Curriculum Architect & Builder |
| **Location** | Bengaluru, India |
| **Philosophy** | "AI is a million times better at following recipes. The human mind must evolve to command the machine rather than compete with it." |
| **Site Mission** | "Tharun Learning Lab" is now a **static headquarters** and portal front-end serving as the gateway to the external "CURIOSITY OS" app. It represents an educational revolution: replacing industrial-era rote memorization with First Principles thinking and cognitive engineering. |
| **Hero Tagline** | `Rewiring the Future of Education.` |
| **Hero Description** | "Welcome to Tharun Learning Lab. I am building CURIOSITY OS—a radical ecosystem replacing industrial-era memorization with AI symbiosis, cognitive engines, and human resilience. These are my daily experiments." |

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
background-size: 64px 64px; /* Increased from 32px to 64px for architectural spaciousness */
min-height: 100vh;
```
- **Refractive Orbs:** In `layout.tsx`, two ambient blurred orbs (`bg-cyan-600/20`) live at the top-left and bottom-right to create uniform glassmorphism refractions.

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

This repository transitioned from a dynamic markdown Zettelkasten blog into a **Static Headquarters & Gateway**.

| Route | File | Background | Description |
|---|---|---|-----------|
| `/` | `app/page.tsx` | `bg-transparent` | Home Desktop: Navbar + Hero Text + "Rewiring the Future" manifesto. |
| `/profile` | `app/profile/page.tsx` | `bg-slate-950` | The Manifesto, Core Capabilities (Cognitive Engine, Cybernetic Arsenal), and Focus. |
| `/contact` | `app/contact/page.tsx` | `bg-slate-950` | Comms relay for educational tech collaboration. |
| `/map` | `app/map/page.tsx` | `bg-slate-950` | **THE PORTAL:** A static gateway window. The Zettelkasten code has been stripped entirely. This page now features a massive glowing button linking externally to `https://curiosity-os.vercel.app/`. |

---

## 4. COMPONENT MAP

### 4A. Layout Components

#### `components/layout/navbar.tsx`
- **Branding:** `THARUN LEARNING LAB` + custom `<TllLogo />`.
- **System Tray:** A live IST (Indian Standard Time) clock ticker with an emerald pulsing dot. Includes a quick `Home` icon link.

#### `components/layout/footer.tsx` (THE APP DOCK)
- **Position:** Floating Pill HUD (`fixed bottom-6 left-1/2 -translate-x-1/2`).
- **Pillars:** 
  1. `HOME` (/)
  2. `ABOUT` (/profile)
  3. `PORTAL` (/map)
  4. `CONTACT` (/contact)

### 4B. The Exogenous Shift (Zettelkasten Deprecation)
**CRITICAL NOTE FOR AGENTS:** 
Prior to Version 8.0, this repository parsed Markdown files to build a 3D Knowledge Graph on the Map page.
**This architecture has been deprecated in this repository.** The dynamic graph and Markdown components have been physically moved to the external `https://curiosity-os.vercel.app/` deployment. This specific repository (`tharun-os`) is now purely the sleek, static front-door to that universe. Do not attempt to re-implement markdown parsing on the `/map` page.

---

## 5. RECENT MILESTONES (AS OF TODAY)

1. **Rebranding:** Renamed all instances of "Tharun OS" to "Tharun Learning Lab".
2. **SEO Metadata Update:** Cleaned `app/layout.tsx` metadata to reflect CURIOSITY OS, Curriculum Architect, and AI Education keywords.
3. **Map Transformation:** Nuked the 3D WebGL graph and React states. Built a glowing glassmorphic preview window leading to the external web app.
4. **CSS Upgrades:** Increased global CSS grid sizing to 64px for greater visual breathing room.
5. **Footer Mod:** Changed the "MAP" dock label to "PORTAL".

---

## 6. ENCODING RULES FOR AI AGENTS (IN NEW CHATS)

If you have just arrived in a new chat thread and have been fed this document:
1. **You are in "Tharun Learning Lab", not the dynamic markdown app.**
2. **Never build modal popups.** Maintain the full-page, terminal-like architecture.
3. **Respect the color palette:** Slate-950 background, Cyan highlights, white/10 borders, glassmorphic `backdrop-blur` panes.
4. **Current Objective:** You now possess the 100% complete and verified context of this repository. Ask the user what feature they wish to build next upon this static headquarters.
