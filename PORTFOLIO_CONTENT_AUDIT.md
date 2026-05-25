# PORTFOLIO WEBSITE: COMPLETE CONTENT AUDIT & COPY BLUEPRINT
**Target Project**: Tharun Gajula Portfolio
**Current Version Audit Date**: May 25, 2026
**Prepared for**: Major Website Revamp & Portfolio Consolidation

---

## EXECUTIVE SUMMARY & AUDIT FINDINGS

Before listing the page-by-page copy, here are the critical structural and textual findings discovered during this audit of the codebase:

1. **Email Address Inconsistency (RESOLVED & CONSOLIDATED)**:
   * **Connect Tab & Master Context**: Updated to use `tharun.gajula.2@gmail.com` everywhere.
   * **Outreach Data File**: Updated to use `tharun.gajula.2@gmail.com`.
   * *Status*: Successfully resolved across all files for perfect brand alignment.
2. **Ghost Pages & Unused Assets (Technical Debt)**:
   * **`sitemap.ts`** declares a `${baseUrl}/contact` route, but there is no such page directory in the `app` router. The app operates entirely as a single-screen tabs-state component (`app/page.tsx`).
   * **`ProjectArc.tsx`** is a beautiful strategic pipeline terminal component found under `/components` but is currently **completely commented out/unreferenced** in `app/page.tsx`.
   * **Outreach Components (`components/outreach/` - HeroThesis, ProfileTracks, SoftCTA, SystemsArchive)**: Fully functional templates powered by `data/outreach/homepage.ts` are left unused in the active page router but present in the codebase.
3. **Graph Cluster Designations**:
   * The requested **"Green Nodes"** represent **Group 2: The 90-Day Product Lab / Product OS concept prototypes**. They are colored Sharp Emerald (`#10B981`) and carry matching green particles.
   * **Group 5** is your **Prime Node** ("Agentic Engineering"), colored Deep Orange (`#F97316`), and carries a special text tag overlay `// DECADE FOCUS`.

---

## INDEX OF PORTFOLIO MODULES

* [1. GLOBAL SYSTEM SHELL & METADATA](#1-global-system-shell--metadata)
  * [1.1 Page SEO & OpenGraph Meta (layout.tsx)](#11-page-seo--opengraph-meta-layouttsx)
  * [1.2 Navigation & Sticky Header (page.tsx)](#12-navigation--sticky-header-pagetx)
  * [1.3 Navigation Dock (page.tsx)](#13-navigation-dock-pagetx)
  * [1.4 System HUD & Alerts (page.tsx)](#14-system-hud--alerts-pagetx)
* [2. TAB 1: THESIS VIEW (SplineAvatar.tsx)](#2-tab-1-thesis-view-splineavatartsx)
  * [2.1 Overlay Overlay HUD](#21-overlay-overlay-hud)
* [3. TAB 2: WORK VIEW (Capability Pillars & Graph)](#3-tab-2-work-view-capability-pillars--graph)
  * [3.1 Executive Summary: WorkOverview.tsx](#31-executive-summary-workoverviewtsx)
  * [3.2 The Interactive Neural Map: data/neuralData.ts](#32-the-interactive-neural-map-dataneuraldatats)
* [4. TAB 3: STORY VIEW (EvolutionTimeline.tsx)](#4-tab-3-story-view-evolutiontimelinetx)
  * [4.1 Introductory Brief](#41-introductory-brief)
  * [4.2 Core Timeline Milestones](#42-core-timeline-milestones)
* [5. TAB 4: CONNECT VIEW (ConnectPage.tsx)](#5-tab-4-connect-view-connectpagetsx)
  * [5.1 Signal & Opportunity Pitch](#51-signal--opportunity-pitch)
  * [5.2 Direct Communication Cards](#52-direct-communication-cards)
  * [5.3 Document Vault / Resume](#53-document-vault--resume)
  * [5.4 Developer Build Logs (data/buildlog.ts)](#54-developer-build-logs-databuildlogts)
  * [5.5 Dynamic Status Indicator](#55-dynamic-status-indicator)
* [6. INTERACTIVE AI CHATBOT (AIChatPanel.tsx & ai-context.ts)](#6-interactive-ai-chatbot-aichatpaneltsx--ai-contextts)
  * [6.1 User Interface & Suggestion Chips](#61-user-interface--suggestion-chips)
  * [6.2 The Master Prompt Context (THARUN_CONTEXT)](#62-the-master-prompt-context-tharun_context)
* [7. INACTIVE / STRATEGIC CODEBASE ASSETS](#7-inactive--strategic-codebase-assets)
  * [7.1 Project Arc Terminal Component (ProjectArc.tsx)](#71-project-arc-terminal-component-projectarctsx)
  * [7.2 Custom Outreach Templates (data/outreach/homepage.ts)](#72-custom-outreach-templates-dataoutreachhomepagets)

---

## 1. GLOBAL SYSTEM SHELL & METADATA

### 1.1 Page SEO & OpenGraph Meta (`layout.tsx`)
This is the hidden user-facing structural copy injected into browsers, search engines, and social media crawls.

*   **Browser Title (Default)**: `Tharun Gajula | Systems Thinking & AI-Native Workflows`
*   **Browser Title (Dynamic Templates)**: `%s | Tharun Gajula`
*   **Description**: `A public archive of experiments in learning systems, AI-native workflows, and systems-thinking by Tharun Gajula.`
*   **Keywords**: `Tharun Gajula`, `AI Workflows`, `Learning Systems`, `Cognitive Architecture`, `Systems Thinking`, `Bangalore`
*   **Authors**: `Tharun Kumar Gajula` (URL: `https://tharungajula.vercel.app`)
*   **OpenGraph Metadata**:
    *   *Title*: `Tharun Gajula`
    *   *Description*: `Systems Thinking, AI-Native Workflows, and Experimental Builds.`
    *   *URL*: `https://tharungajula.vercel.app`
    *   *Site Name*: `Tharun Gajula`
    *   *Locale*: `en_US`

### 1.2 Navigation & Sticky Header (`page.tsx`)
Injected globally at the top boundary of the viewport.

*   **Primary Brand Header / Logo**: `THARUN GAJULA` (Resets view to 'thesis' landing tab on click)
*   **Anchor Links (Right-aligned)**:
    *   Label: `GITHUB` (Target: `https://github.com/tharungajula2`)
    *   Label: `LINKEDIN` (Target: `https://linkedin.com/in/tharungajula`)

### 1.3 Navigation Dock (`page.tsx`)
Floating interactive dock at the bottom of the viewport for primary view shifting.

*   **Action Tab 1**: `// WORK`
*   **Action Tab 2**: `// STORY`
*   **Action Tab 3**: `// CONNECT`

### 1.4 System HUD & Alerts (`page.tsx`)
HUD elements displaying reactive states of the system.

*   **System Status Pill (Bottom-right)**: `SYSTEM: ONLINE` (accompanied by pulsing indicator)
*   **Work View State Controls** (Only visible on Work tab):
    *   Toggle 1: `Overview` (Brings up capability pillars)
    *   Toggle 2: `Graph` (Brings up 2D force graph)
*   **View Resetter Button** (Only visible inside Work -> Graph mode):
    *   Label: `⟲ Reset View`
*   **Active Node Popup HUD** (Pops up at bottom center of viewport when clicking an interactive graph node):
    *   HUD Marker: `// NODE`
    *   Node Name Header: `[DYNAMIC_NODE_NAME]`
    *   Node Description Content: `[DYNAMIC_NODE_DESCRIPTION]`
    *   Action Button Labels:
        *   *If Github link*: `[ VIEW ON GITHUB → ]`
        *   *If external web app*: `[ OPEN PROTOTYPE → ]`

---

## 2. TAB 1: THESIS VIEW (`SplineAvatar.tsx`)

### 2.1 Overlay Overlay HUD
Layered precisely on top of the 3D hardware-accelerated robot avatar.

*   **Central Role Heading**: `PRODUCT MANAGER`
*   **Conversational CTA Link**: `talk to me` (Launches the AI Chat Panel)

---

## 3. TAB 2: WORK VIEW (Capability Pillars & Graph)

### 3.1 Executive Summary: `WorkOverview.tsx`
The static text displayed when the user selects the "Overview" view in the Work tab.

*   **Section Tag**: `// CAPABILITY_MAP`
*   **Section Title**: `What I Bring`
*   **Pillar 1: Product Ownership**
    *   *Subtitle Description*: `Internal Product Owner and Workflow Architect mapping complex enterprise structures.`
    *   *Proof Points*:
        *   `Lead B2B loan origination platform orchestration (Lentra AI)`
        *   `Mapped complex banking integration paths across 12+ institutional clients`
        *   `Managed B2B workflow designs, user-journey mapping, and functional PRDs`
        *   `Reduced credit-decisioning turnaround times by 30% via systematic pipeline designs`
*   **Pillar 2: Quantitative Systems**
    *   *Subtitle Description*: `Statistical modeling and data product architecture built on quantitative rigor.`
    *   *Proof Points*:
        *   `Engineered credit risk systems (PD/LGD/EAD models) at Jana Small Finance Bank`
        *   `Structured validation pipelines for regulatory compliance and risk grading`
        *   `Developed deep learning models, bank churn classifiers, and time-series forecasting`
        *   `Modeled efficient frontier asset allocation metrics on top-tier equity pools`
    *   *Call to Action Link*: `View analytics portfolio →` (Target: `https://github.com/tharungajula2/Portfolio`)
*   **Pillar 3: Functional AI Prototyping**
    *   *Subtitle Description*: `Concept prototypes demonstrating design-led UX, LLM orchestration, and spatial layouts.`
    *   *Proof Points*:
        *   `Geriatric Care: Parents Health OS (15-question clinical matrix, 175-point health index)`
        *   `Clinical Therapy: Trellis (58-point alliance matching and preference algorithm)`
        *   `Pedagogical Workspaces: Curiosity OS (147 atomic knowledge nodes & semantic workflows)`
        *   `Relational Systems: Mila Engine (MECE-backed psychological matching profiles)`
*   **Pillar 4: Spatial & Pre-Vis**
    *   *Subtitle Description*: `Bridging the gap between robust system engineering and visual product storytelling.`
    *   *Proof Points*:
        *   `Built dynamic 2D force-directed interactive project networks`
        *   `Engineered responsive 3D Spline workspace hubs and chest HUD modules`
        *   `Translated complex system architectures into navigable spatial dashboards`
        *   `Designed interactive technical PRD walkthroughs for early-stage stakeholder buy-in`
*   **Synthesis Bottom Caption*: `These work together. The analytics gives me rigor. The product work gives me judgment. The AI building gives me speed. The craft makes it all presentable.`

### 3.2 The Interactive Neural Map: `data/neuralData.ts`
All nodes, descriptions, groupings, and links driving the interactive 2D graph simulation.

#### 3.2.1 Core Hub & Agentic Engineering Anchor
*   **Core Node (`core`)** (Pure White `#FFFFFF`)
    *   *Name*: `Tharun Gajula`
    *   *Audited Copy*: `High-agency builder targeting Product Management, AI PM, or 0-to-1 PM roles. Experienced in B2B platform ownership & AI prototyping.`
*   **Prime / Decade Focus Node (`agentic`)** (Deep Orange `#F97316`)
    *   *Name*: `Agentic Engineering`
    *   *Audited Copy*: `Exploring Agentic AI systems in depth and practical Agentic AI engineering, balanced through an AI Product Manager lens.`
    *   *Link*: `https://github.com/tharungajula2/Portfolio`
    *   *Dynamic Text Tag on Zoom*: `// DECADE FOCUS`

#### 3.2.2 The "Green Nodes" - Product OS Prototypes (Sharp Emerald `#10B981`)
*   **Lab Hub Node (`lab90`)**
    *   *Name*: `90-Day Product Lab`
    *   *Audited Copy*: `6 concept prototypes built in a 90-day sprint to master the modern AI stack.`
*   **Prototype Node 1 (`trellis`)**
    *   *Name*: `Therapy Matching OS` *(Trellis)*
    *   *Audited Copy*: `Concept prototype: therapy matching engine. Implements 58-point clinical matching and PCOMS preference alignment on an aesthetic interface.`
    *   *Link*: `https://therapy-matching-os.vercel.app`
*   **Prototype Node 2 (`parentshealth`)**
    *   *Name*: `Parents Health OS`
    *   *Audited Copy*: `Concept prototype: geriatric care system. Integrates 15-question clinical matrix, 175-point health index, and AI document synthesis.`
    *   *Link*: `https://parents-health-os.vercel.app`
*   **Prototype Node 3 (`quantos`)**
    *   *Name*: `Quant OS`
    *   *Audited Copy*: `Concept product: spatial knowledge graph making the analytics portfolio navigable via a 2D physics-based network.`
    *   *Link*: `https://quant-os.vercel.app`
*   **Prototype Node 4 (`curiosity`)**
    *   *Name*: `Curiosity OS`
    *   *Audited Copy*: `Concept prototype: pedagogical mapping workspace for teachers connecting 147 atomic knowledge nodes & semantic workflows.`
    *   *Link*: `https://curiosity-os.vercel.app`
*   **Prototype Node 5 (`mila`)**
    *   *Name*: `Relational Matching OS` *(Mila)*
    *   *Audited Copy*: `Concept prototype: psychology-backed relationship matching engine implementing MECE profiling and explained logic.`
    *   *Link*: `https://relational-matching-os.vercel.app`
*   **Prototype Node 6 (`pause`)**
    *   *Name*: `FMCG Whitespace OS` *(Pause)*
    *   *Audited Copy*: `Concept prototype: FMCG growth framework. Unit economics, occasion fit, and P&L waterfalls with premium GSAP scrolls.`
    *   *Link*: `https://fmcg-whitespace-os.vercel.app`

#### 3.2.3 Analytics & Quant Projects (Electric Cyan `#00FFFF`)
*   **Analytics Hub Node (`analytics`)**
    *   *Name*: `Analytics & Quant`
    *   *Audited Copy*: `8 end-to-end analytics projects covering credit risk, neural networks, RL, NLP, time-series, and portfolio theory.`
*   **Quant Node 1 (`lending`)**
    *   *Name*: `Lending Club`
    *   *Audited Copy*: `End-to-end credit risk model. Feature engineering, logistic regression, gradient boosting — raw loans to default probability.`
    *   *Link*: `https://github.com/tharungajula2/Portfolio`
*   **Quant Node 2 (`churn`)**
    *   *Name*: `Bank Churn NN`
    *   *Audited Copy*: `Neural network predicting bank customer churn. Feature engineering on transaction patterns, production-ready accuracy.`
    *   *Link*: `https://github.com/tharungajula2/Portfolio`
*   **Quant Node 3 (`retention`)**
    *   *Name*: `Employee Retention`
    *   *Audited Copy*: `Predicting which employees leave using logistic regression, decision trees, and random forests. Human capital as a measurable signal.`
    *   *Link*: `https://github.com/tharungajula2/Portfolio`
*   **Quant Node 4 (`socioeconomic`)**
    *   *Name*: `Socio-Economic`
    *   *Audited Copy*: `Household classification from noisy survey data. Heavy preprocessing, PCA, SMOTE, and XGBoost.`
    *   *Link*: `https://github.com/tharungajula2/Portfolio`
*   **Quant Node 5 (`twitter`)**
    *   *Name*: `Twitter Sentiment`
    *   *Audited Copy*: `Classifying tweet sentiment using NLP preprocessing and ML classifiers. Full pipeline from raw text to prediction.`
    *   *Link*: `https://github.com/tharungajula2/Portfolio`
*   **Quant Node 6 (`cartpole`)**
    *   *Name*: `CartPole RL`
    *   *Audited Copy*: `Reinforcement learning on CartPole — 7 algorithms compared. Learned RL by actually implementing it.`
    *   *Link*: `https://github.com/tharungajula2/Portfolio`
*   **Quant Node 7 (`antidiabetic`)**
    *   *Name*: `Antidiabetic Forecast`
    *   *Audited Copy*: `Time-series forecasting for medicine demand. SARIMA on real pharmaceutical data with rolling validation.`
    *   *Link*: `https://github.com/tharungajula2/Portfolio`
*   **Quant Node 8 (`nifty`)**
    *   *Name*: `NIFTY 100 Portfolio`
    *   *Audited Copy*: `Modern Portfolio Theory on NIFTY 100 stocks. Efficient frontier, Sharpe ratios, risk-return analysis.`
    *   *Link*: `https://github.com/tharungajula2/Portfolio`

#### 3.2.4 Systems Foundation (Muted Slate `#64748B`)
*   **Foundation Hub Node (`foundation`)**
    *   *Name*: `Foundation`
    *   *Audited Copy*: `B2B platform ownership and credit analytics experience in institutional environments.`
*   **Foundation Node 1 (`jana`)**
    *   *Name*: `Jana Small Finance Bank`
    *   *Audited Copy*: `Credit risk analytics, scoring models, and validation pipelines for Retail/SME portfolios.`
*   **Foundation Node 2 (`lentra`)**
    *   *Name*: `Lentra AI`
    *   *Audited Copy*: `Lead platform orchestration for B2B loan origination systems and bank integrations.`
*   **Foundation Node 3 (`iisc`)**
    *   *Name*: `IISc Bangalore`
    *   *Audited Copy*: `Deep Learning programme — 92%. CNNs, RNNs, GANs, reinforcement learning, computer vision.`
*   **Foundation Node 4 (`nibm`)**
    *   *Name*: `NIBM Pune`
    *   *Audited Copy*: `PGDM Banking & Finance at an RBI institution. Credit risk, portfolio management, regulatory lending.`

#### 3.2.5 Adaptive Craft (Sharp Purple `#A855F7`)
*   **Craft Node (`adaptive`)**
    *   *Name*: `Adaptive Craft`
    *   *Audited Copy*: `Visual design, video, web — whatever the problem needs, learned on the spot. Fills the gap between backend code and the market.`

---

## 4. TAB 3: STORY VIEW (`EvolutionTimeline.tsx`)

### 4.1 Introductory Brief
Static text at the start of the Story section.

*   **Introductory Tag**: `// HOW IT CONNECTS`
*   **Introductory Paragraph**: `Most of my career does not follow a linear path, but every step is highly logical. I started by building quantitative finance and banking platforms, managing B2B integrations, and engineering credit scoring models. I then transitioned into full-stack automation and statistical machine learning, and finally into functional concept prototyping. The thread through all of it: I take complex domain workflows and build beautiful, high-ownership systems that work.`

### 4.2 Core Timeline Milestones
Audited chronological cards representing the user's experience history.

*   **Milestone ID: 05**
    *   *Era Tag*: `// Product Architecture & AI Prototyping`
    *   *Timeline Span*: `May 2026 — Present`
    *   *Milestone Title*: `Product Architecture & AI Prototyping`
    *   *Body Copy*: `Focused on designing and building robust, multi-agent frameworks, cognitive workflows, and interactive AI-concept products balanced through an AI Product Manager lens.`
    *   *Pill Tags*: `Agentic AI Systems` | `Agentic Engineering` | `AI Product Management`
*   **Milestone ID: 04**
    *   *Era Tag*: `// The 90-Day Product Lab`
    *   *Timeline Span*: `Feb 2026 — May 2026`
    *   *Milestone Title*: `Functional AI Prototyping`
    *   *Body Copy*: `Shipped 6 functional concept prototypes (Mila, Trellis, Pause, etc.) in a 90-day sprint. Designed psychology-backed matching loops, geriatric care systems, and highly responsive layouts.`
    *   *Pill Tags*: `6 Concept Prototypes` | `Next.js + React` | `LLM Orchestration`
*   **Milestone ID: 03**
    *   *Era Tag*: `// Analytics & Quantitative Rigor`
    *   *Timeline Span*: `2022 — Jan 2026`
    *   *Milestone Title*: `Analytics & Quantitative Rigor`
    *   *Body Copy*: `Four years of independent engineering—consulting on analytics, automation, and content. Shipped 8 end-to-end analytics pipelines spanning credit risk models, neural networks, reinforcement learning, NLP, and time-series forecasting.`
    *   *Pill Tags*: `8 Analytics Projects` | `Google Data Analytics` | `IISc Deep Learning`
*   **Milestone ID: 02**
    *   *Era Tag*: `// Product Ownership & Workflows`
    *   *Timeline Span*: `2021 — 2022`
    *   *Milestone Title*: `Product Ownership & Workflows`
    *   *Body Copy*: `One intensive year across two institutional roles. At Jana Small Finance Bank, I built credit risk analytics across Retail and SME portfolios—our models cut decisioning turnaround by 30%. At Lentra AI, I served as Internal Product Owner for B2B loan origination systems, translating bank requirements into engineering specifications across 12+ integrations.`
    *   *Pill Tags*: `Jana Small Finance Bank` | `Lentra AI` | `Basel/BCBS 239`
*   **Milestone ID: 01**
    *   *Era Tag*: `// Engineering → Finance`
    *   *Timeline Span*: `2017 — 2021`
    *   *Milestone Title*: `Engineering → Finance`
    *   *Body Copy*: `Mechanical Engineering foundation from GRIET Hyderabad followed by PGDM Banking & Finance at NIBM Pune (an RBI institution). Bridged structured mathematical logic with B2B banking domain workflows.`
    *   *Pill Tags*: `GRIET B.Tech` | `NIBM PGDM Finance` | `RBI Institution`

---

## 5. TAB 4: CONNECT VIEW (`ConnectPage.tsx`)

### 5.1 Signal & Opportunity Pitch
*   **Signal Identifier Tag**: `// SIGNAL_OPEN`
*   **Connect Heading**: `OPEN TO MEANINGFUL WORK`
*   **Main Copy**: `Seeking high-ownership Product Management, AI PM, or 0-to-1 PM roles at early-stage startups in Bengaluru. I thrive in ambiguous environments, translating complex business processes and high-friction quantitative logic into simple, pixel-perfect user experiences. If you need a high-agency builder to go from abstract systems design to shipped product architecture — let's talk.`

### 5.2 Direct Communication Cards
*   **Section Tag**: `// DIRECT_LINKS`
*   **Email Card**:
    *   *Section Label*: `EMAIL`
    *   *Audited Address*: `tharun.gajula.2@gmail.com`
    *   *Interactive Button*: `[ COPY ]` (Transforms to `✓ COPIED` on click)
*   **LinkedIn Card**:
    *   *Section Label*: `LINKEDIN`
    *   *Profile Text*: `linkedin.com/in/tharungajula`
    *   *Interactive Button*: `[ OPEN ↗ ]`
*   **GitHub Card**:
    *   *Section Label*: `GITHUB`
    *   *Repository Text*: `github.com/tharungajula2`
    *   *Interactive Button*: `[ OPEN ↗ ]`

### 5.3 Document Vault / Resume
*   **Section Tag**: `// RESUME`
*   **Interactive Download Button**: `[ DOWNLOAD RESUME ]` (Triggers download of `/Tharun_Gajula_Resume.pdf`)

### 5.4 Developer Build Logs (`data/buildlog.ts`)
Static progress updates rendering dynamically in the Connect section.

*   **Section Tag**: `// BUILD_LOG`
*   **Dynamic Heading Status**: `[X] days of building` (Currently 5 entries)
*   **Day 5 Entry**:
    *   *Date*: `2026-05-02`
    *   *Action Title*: `Refined global product positioning, streamlined layouts, and established type-safe daily logs to track workspace progression.`
    *   *Key Learning*: `Interface labels must pass a rapid visual test—reducing ambiguous terminology directly increases user interaction rates.`
    *   *Pills/Tags*: `UX` | `Product Design` | `Polish`
*   **Day 4 Entry**:
    *   *Date*: `2026-05-01`
    *   *Action Title*: `Integrated direct Gemini REST API stream on Edge Runtime to power conversational chat queries.`
    *   *Key Learning*: `Deploying SSE stream endpoints on Vercel Edge Runtime bypasses standard Vercel serverless function timeouts completely.`
    *   *Pills/Tags*: `Gemini API` | `Edge Runtime` | `Streaming`
*   **Day 3 Entry**:
    *   *Date*: `2026-04-28`
    *   *Action Title*: `Structured static data layer replacing dynamic markdown parsers to increase site speed and provide robust type-safe content management.`
    *   *Key Learning*: `Decoupling dynamic markdown processing from client renders dramatically reduces Largest Contentful Paint (LCP) scores.`
    *   *Pills/Tags*: `TypeScript` | `Performance` | `Clean Architecture`
*   **Day 2 Entry**:
    *   *Date*: `2026-04-18`
    *   *Action Title*: `Engineered responsive 2D physics-based capability graph representing data projects, operational experience, and core domains.`
    *   *Key Learning*: `Force graph physics engines require precise charge and link tuning to balance dense information layouts with readable user interaction.`
    *   *Pills/Tags*: `D3 Force` | `Data Viz` | `UI/UX`
*   **Day 1 Entry**:
    *   *Date*: `2026-04-15`
    *   *Action Title*: `Architected single-page OS interface containing a 3D Spline container, dynamic 2D neural graph, and interactive timeline components.`
    *   *Key Learning*: `Managing client-side state across high-fidelity views using a unified activeTab controller prevents standard client-server layout shifts.`
    *   *Pills/Tags*: `Next.js 16` | `Spline 3D` | `Architecture`

### 5.5 Dynamic Status Indicator
*   **Visual Ping**: Glowing emerald indicator.
*   **Status Text**: `Currently based in Bengaluru, India · Available immediately`

---

## 6. INTERACTIVE AI CHATBOT (`AIChatPanel.tsx` & `ai-context.ts`)

### 6.1 User Interface & Suggestion Chips
Audited UI texts within the sliding bottom AI dialog panel.

*   **Header Identifier**: `// ASK_AI`
*   **Introductory Tag**: `// PORTFOLIO_INTELLIGENCE`
*   **Dynamic Panel Title**: `Ask me anything about Tharun`
*   **Panel Secondary Text**: `I know about his projects, skills, experience, and what he's looking for.`
*   **Interactive Suggestion Query Chips**:
    1.  `"What functional prototypes has he built?"`
    2.  `"Tell me about his Product Owner background"`
    3.  `"What PM role is he targeting?"`
    4.  `"What's his systems tech stack?"`
*   **Text Input Field Placeholder**: `Ask about Tharun's work...`
*   **Action Button Label**: `SEND`
*   **Rates-Limiting Fallback Boundary** (Displays after the visitor submits 2 prompts to protect API limits):
    *   Copy: `Enjoyed the conversation? Let's continue over email →` (Links to `mailto:tharun.gajula.2@gmail.com`)

### 6.2 The Master Prompt Context (`THARUN_CONTEXT`)
This raw prompt text from `lib/ai-context.ts` represents the ultimate source of truth injected directly into Gemini for chatbot answers. It represents a condensed textual overview of your professional profile.

```text
You are the AI assistant on Tharun Gajula's portfolio website. You answer questions about his professional background, skills, projects, and experience. You speak in first person as if you ARE Tharun's portfolio — confident, precise, and professional.

RULES:
- Only answer based on the information provided below
- If asked something not covered below, say "That's not something covered in my portfolio, but feel free to email Tharun directly at tharun.gajula.2@gmail.com"
- Keep answers concise — 2-4 sentences for simple questions, up to a paragraph for complex ones
- Never make up information
- Be warm but professional
- If asked "who are you" or "what is this", explain you are an AI assistant built into Tharun's portfolio to help visitors learn about his work

═══════════════════════════════════════════════════
PROFESSIONAL SUMMARY
═══════════════════════════════════════════════════

Tharun Gajula is an AI Product Manager & Zero-to-One Builder specializing in transforming high-friction domains into production-grade systems. He is currently focused on Agentic Engineering, exploring Agentic AI systems and practical Agentic AI engineering in depth through an AI Product Manager lens. He combines a rigorous foundation in statistical data engineering (IISc Deep Learning at 92%, NIBM Finance) with the speed of an AI-native builder (Next.js, RAG workflows, Spatial Design).

His career follows a clear three-act arc:

Act 1 — Institutional Foundation (2021–2022): After completing a B.Tech in Mechanical Engineering and a PGDM in Banking & Finance, Tharun worked at Lentra AI and Jana Small Finance Bank. He engineered credit risk frameworks and automated reporting systems, proving his ability to operate inside institutional constraints and translate regulatory logic into production workflows.

Act 2 — The Wilderness Years (2022–2025): Tharun spent nearly four years as an independent consultant, a deliberate phase focused on independent craft. He managed end-to-end data projects, built Python automation, and completed an Executive Programme in Deep Learning at IISc Bangalore (92%). This period proved his fluency across neural networks, RL, NLP, and time-series forecasting.

Act 3 — The Deep Build (May 2026–Present): After a 90-day product lab where he built six concept prototypes (Therapy Matching OS, Relational Matching OS, FMCG Whitespace OS, etc.) to master the modern AI stack, Tharun is dedicating himself to Agentic Engineering. He is exploring Agentic AI systems in depth and mastering practical Agentic AI engineering through an AI Product Manager lens, building robust, multi-agent frameworks, cognitive workflows, and interactive AI-native products.

The connecting thread is the ability to see the system, formalize the math, and ship the product.

═══════════════════════════════════════════════════
WHAT THARUN IS EYEING (TARGET ROLE)
═══════════════════════════════════════════════════

Tharun is looking for an AI Product Manager, Founder's Office, or EIR role at an early-stage startup in Bengaluru. He works across product, analytics, systems design, and full-stack AI execution. He is a builder who goes from abstract problem to shipped architecture.

═══════════════════════════════════════════════════
FOCUS: AGENTIC ENGINEERING
═══════════════════════════════════════════════════

Tharun is exploring Agentic AI systems in depth and developing practical Agentic AI engineering frameworks, balanced carefully through an AI Product Manager lens rather than a purely technical one.
- Exploring multi-agent coordination, cognitive patterns, self-correction workflows, and RAG integration.
- Designing next-generation agentic architectures for solving complex real-world workflows.
- Keeping a strong focus on system safety, reliability, user experience, and practical product-market fit.
- Status: Active Exploration & Build (May 2026 – Present)

═══════════════════════════════════════════════════
THE 90-DAY PRODUCT LAB (COMPLETED SPRINT)
═══════════════════════════════════════════════════

Between February and May 2026, Tharun executed an intensive 90-day sprint, building 6 concept prototypes to master the modern AI-native stack:
1. PARENTS HEALTH OS: Geriatric care system with Gemini-powered document synthesis.
2. THERAPY MATCHING OS (formerly Trellis): Clinical matching engine for therapy (58-point matrix). (therapy-matching-os.vercel.app)
3. QUANT OS: Spatial knowledge graph of his analytics portfolio.
4. CURIOSITY OS: 147-node knowledge pedagogy for teachers.
5. RELATIONAL MATCHING OS (powered by Mila engine): Psychology-backed high-intent connection matching algorithm. (relational-matching-os.vercel.app)
6. FMCG WHITESPACE OS (formerly Pause): FMCG growth framework and economic modeling. (fmcg-whitespace-os.vercel.app)

═══════════════════════════════════════════════════
WORK EXPERIENCE
═══════════════════════════════════════════════════

1. Independent Consultant | Remote, India | April 2022 – December 2025
   - Managed end-to-end data projects, Python automation, and technical documentation.

2. Jana Small Finance Bank | Manager — Credit Risk Analytics | Bengaluru | Nov 2021 – March 2022
   - Engineered credit-risk frameworks and reduced reporting turnaround by 30% via SQL/KNIME.

3. Lentra AI | Business Analyst | Pune | April 2021 – October 2021
   - Coordinated SDLC for B2B Loan Origination Systems, bridging banking logic with engineering.

═══════════════════════════════════════════════════
EDUCATION
═══════════════════════════════════════════════════

1. IISc Bangalore | PG Executive Programme in Deep Learning | 2023–2025 | Grade: 92%
2. NIBM Pune | PGDM Banking and Finance | 2019–2021 | Grade: 74.13%
3. GRIET Hyderabad | B.Tech Mechanical Engineering | 2013–2017 | Grade: 85.62%

═══════════════════════════════════════════════════
TECHNICAL STACK
═══════════════════════════════════════════════════

AI & Data: Python, SQL, scikit-learn, XGBoost, TensorFlow, NLP, RAG, Gemini SDK, Vercel AI SDK.
Product & UI: Next.js 16, React 19, Tailwind CSS v4, Framer Motion, Spline, Three.js, Spatial Design.
Domain: Credit Risk (PD/LGD/EAD), Banking Workflows, Clinical Data Models, Behavioral Psychology.

═══════════════════════════════════════════════════
CONTACT
═══════════════════════════════════════════════════

Email: tharun.gajula.2@gmail.com
LinkedIn: linkedin.com/in/tharungajula
GitHub: github.com/tharungajula2
Location: Bengaluru, India
```

---

## 7. INACTIVE / STRATEGIC CODEBASE ASSETS
These represent files that exist fully coded in your repository but are not active/referenced in the main app layout or shell.

### 7.1 Project Arc Terminal Component (`ProjectArc.tsx`)
A futuristic simulated command line tracking a health operating system build progress.

*   **Left Column Header Tag**: `// STRATEGIC_INTENT`
*   **Mission Header**: `OPERATION: ARC REACTOR`
*   **Manifesto Description Text**: `A 270-day sprint to engineer a multi-agent Family Health Operating System. Built to ingest disparate clinical data, track daily biometrics, and deploy personalized, preventative LLM analysis for my family.`
*   **Operational status block**: `MISSION_STATUS: CRITICAL_ASSET`
*   **Roadmap Header**: `Deployment Pipeline`
*   **Roadmap Phases**:
    *   *PHASE 01*: `DATA PIPELINES` (Status: `[IN_PROGRESS]`)
    *   *PHASE 02*: `MULTI-AGENT SYNTHESIS`
    *   *PHASE 03*: `CLINICAL DEPLOYMENT`
*   **Right Column Terminal Title**: `system_pipeline_terminal.exe`
*   **Terminal Logs**:
    *   `[LOG_ENTRY_001]`: `Initialized Next.js 16 environment. Configured Prisma ORM for biometric ingestion. Optimized SQLite local storage for HIPAA compliance baseline.`
    *   `[LOG_ENTRY_002]`: `Integrated Apple HealthKit mock data streams. Mapping heart-rate variability and VO2 max indices to longitudinal graph state.`
    *   `[LOG_ENTRY_003]`: `Awaiting next sequence` (With pulsing visual terminal cursor symbol)

### 7.2 Custom Outreach Templates (`data/outreach/homepage.ts`)
This structured data supports custom marketing copy blocks for corporate cold outreach templates.

*   **Hero Section Segment**:
    *   *Category Tag*: `// THESIS` *(in homepageContent.ts)* / `// VISION` *(Default in HeroThesis.tsx)*
    *   *Headline Title*: `Building High-Ownership Products from Abstract Logic.`
    *   *Introductory Pitch Text*: `I am a zero-to-one product builder who transitioned from institutional finance and data analytics into functional AI prototyping. I thrive in ambiguous environments, taking high-friction domain logic and mapping it into simple, high-aesthetic interfaces. Seeking high-ownership Product Management (PM), AI PM, or 0-to-1 PM roles in Bengaluru.`
    *   *Primary CTA Button*: `Explore Work`
    *   *Secondary CTA Button*: `Connect Directly`
*   **Track Progression Segment**:
    *   *Header Tag*: `// CAPABILITY ARCHITECTURE`
    *   *Introductory Sentence*: `My work has evolved across four tracks that now converge in the systems I build today.`
    *   *Track 01 Details*:
        *   *Label & Title*: `01 Product Ownership & Workflows`
        *   *Description*: `My foundation lies in institutional banking and lending tech. As an Internal Product Owner and Workflow Architect, I specialize in mapping complex B2B workflows, managing PRDs, API testing, and aligning engineering with risk constraints.`
        *   *Tag pills*: `Internal Product Owner` | `Workflow Architect` | `B2B Lending`
    *   *Track 02 Details*:
        *   *Label & Title*: `02 Analytics & Quantitative Rigor`
        *   *Description*: `Statistical machine learning and data product development. I treat data as a raw material for robust product decisions, structuring validation frameworks, scoring models, and predictive pipelines.`
        *   *Tag pills*: `Scoring Models` | `Deep Learning` | `Validation Systems`
    *   *Track 03 Details*:
        *   *Label & Title*: `03 Functional AI Prototyping`
        *   *Description*: `I build functional concept prototypes to test complex LLM orchestration and spatial layouts. My focus is on taste, pixel-perfect aesthetics, and high-density logic, rather than scaling pre-mature systems.`
        *   *Tag pills*: `LLM Orchestration` | `Concept Products` | `UI/UX Design`
    *   *Track 04 Details*:
        *   *Label & Title*: `04 Systems Architecture & GTM`
        *   *Description*: `The high-agency capacity to bridge backend engineering and product storytelling. If a product needs interactive visual graphs, system diagrams, or brand architectures, I map and ship it.`
        *   *Tag pills*: `Systems Design` | `Technical PRDs` | `Product Walkthroughs`
*   **Soft Action Form Segment (`SoftCTA.tsx`)**:
    *   *Card Title*: `Open to meaningful collaboration on long horizon systems.`
    *   *Card Context Body*: `This site is the live headquarters for the way I think and build. If there is deep alignment around thoughtful, difficult work, I value the direct connection.`
    *   *Direct Labels*: `// CONNECT_DIRECTLY` | `Email` | `LinkedIn`
    *   *LinkedIn Target Link*: `https://linkedin.com/in/tharungajula`
    *   *Email Target Link*: `tharun.gajula.2@gmail.com` *(Resolved: Consolidated to a single active email address)*
