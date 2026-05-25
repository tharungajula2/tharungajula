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
    *   *Subtitle Description*: `Statistical modeling and loan product workflows built on quantitative rigor.`
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
    *   *Body Copy*: `Executed fintech product ownership across two institutional roles. At Lentra AI, managed PRDs and mapped B2B loan origination workflows across 12+ bank integrations. At Jana Small Finance Bank, engineered credit risk frameworks, structured UAT, and built scoring models that reduced decisioning turnaround by 30%.`
    *   *Pill Tags*: `Workflow Architecture` | `UAT & API Testing` | `Loan Product Workflows`
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

Tharun Gajula is an AI-focused Product Manager & Zero-to-One Builder specializing in translating dense quantitative logic and ambiguous data environments into simple, pixel-perfect user experiences. He combines a rigorous technical foundation in deep learning and statistical data engineering (IISc Deep Learning at 92%, NIBM Finance) with the speed of an AI-native builder (Next.js, LLM orchestration, spatial design). He is seeking high-ownership Product Management (PM), AI PM, or 0-to-1 PM roles at early-stage startups in Bengaluru.

His career follows a clear three-act arc:

Act 1 — Product Ownership & Workflows (2021–2022): Worked as an Internal Product Owner and Workflow Architect across Lentra AI and Jana Small Finance Bank. He managed B2B lending product roadmaps, wrote PRDs, mapped dense financial workflows across 12+ bank integrations, structured UAT criteria, and engineered credit risk frameworks that cut operational decisioning turnaround times by 30%.

Act 2 — Consulting & Quantitative Systems (2022–2025): Operated as an independent analytics consultant managing end-to-end data pipelines, custom Python automation pipelines, and technical specifications. He completed an Executive Deep Learning programme at IISc Bangalore (Grade: 92%) and built 8 end-to-end quantitative systems (PD/LGD credit risk modeling, bank churn predictive neural networks, SARIMA demand forecasting, portfolio risk efficient frontiers).

Act 3 — Zero-to-One Prototyping (Feb 2026–Present): Shipped six functional concept prototypes (Trellis, Parents Health OS, Mila, Curiosity OS, etc.) to master LLM orchestration, Next.js, and spatial design. He completed this intensive lab sprint to demonstrate how dense logical workflows can be translated into simple, pixel-perfect user experiences with extreme attention to taste, layout ergonomics, and dense backend rulesets. He is currently focusing on practical multi-agent task flows and cognitive workflows through a PM lens.

The connecting thread is the ability to analyze complex systems, write exact product specifications, and ship logical functional architectures.

═══════════════════════════════════════════════════
WHAT THARUN IS EYEING (TARGET ROLE)
═══════════════════════════════════════════════════

Tharun is seeking a Product Manager, AI Product Manager, Founder's Office, or EIR role at an early-stage startup in Bengaluru. He works at the intersection of product design, analytics, systems architecture, and full-stack AI prototyping. He is a high-agency builder who takes abstract, ambiguous logic and maps it into shipped functional product architectures.

═══════════════════════════════════════════════════
FOCUS: AGENTIC ENGINEERING & COGNITIVE WORKFLOWS
═══════════════════════════════════════════════════

Tharun is exploring agentic AI systems and practical cognitive engineering, balanced carefully through a high-ownership Product Manager lens rather than a purely academic one.
- Designing next-generation agentic architectures (multi-agent coordination, task loops, self-correction patterns).
- Translating abstract user workflows into structured system rules and prompt orchestration patterns.
- Keeping a strong focus on data validation, cost boundaries, user experience, and practical product-market fit.
- Status: Active Exploration & Prototyping (May 2026 – Present)

═══════════════════════════════════════════════════
THE FUNCTIONAL PROTOTYPES (90-DAY LAB)
═══════════════════════════════════════════════════

To master the modern AI-native stack, Tharun executed an intensive sprint, building 6 functional concept prototypes designed with pixel-perfect layouts and dense backend logic:
1. THERAPY MATCHING OS (Trellis): Clinical matching engine matching users to therapists via clinical alliance logic (58 data points). (therapy-matching-os.vercel.app)
2. PARENTS HEALTH OS: Geriatric care prototype utilizing 15-question clinical matrices, 175-point health indices, and structured document synthesis. (parents-health-os.vercel.app)
3. QUANT OS: Spatial knowledge graph of his analytics portfolio mapping 14 distinct pillars onto a 2D physics engine. (quant-os.vercel.app)
4. CURIOSITY OS: Pedagogy design workspace mapping 147 curriculum nodes and 381 semantic connections in a highly visual loops. (curiosity-os.vercel.app)
5. RELATIONAL MATCHING OS (Mila): Psychology-backed connection prototype utilizing a 3-layer matching algorithm and custom 80 MECE profiles. (relational-matching-os.vercel.app)
6. FMCG WHITESPACE OS (Pause): FMCG growth analytics mapping unit-level P&L waterfalls, protein scoring, and cinematic GSAP scrolling. (fmcg-whitespace-os.vercel.app)

═══════════════════════════════════════════════════
WORK EXPERIENCE
═══════════════════════════════════════════════════

1. Independent Consultant | Remote, India | April 2022 – December 2025
   - Managed end-to-end data engineering pipelines, Python automation frameworks, and technical specifications.

2. Jana Small Finance Bank | Internal Product Owner — Credit Risk Analytics | Bengaluru | Nov 2021 – March 2022
   - Engineered credit risk loan products and loan product workflows that reduced decisioning turnaround times by 30%.

3. Lentra AI | Workflow Architect & BA | Pune | April 2021 – October 2021
   - Managed PRDs and mapped B2B loan origination workflows across 12+ bank integrations, coordinating UAT and API testing between client banks and engineering.

═══════════════════════════════════════════════════
EDUCATION
═══════════════════════════════════════════════════

1. IISc Bangalore | PG Executive Programme in Deep Learning | 2023–2025 | Grade: 92%
2. NIBM Pune | PGDM Banking and Finance | 2019–2021 | Grade: 74.13%
3. GRIET Hyderabad | B.Tech Mechanical Engineering | 2013–2017 | Grade: 85.62%

═══════════════════════════════════════════════════
TECHNICAL & DOMAIN STACK
═══════════════════════════════════════════════════

AI & Data: Python, SQL, scikit-learn, TensorFlow, LLM Orchestration, RAG workflows, Vercel AI SDK.
Product & UI: Next.js 16, React 19, Tailwind CSS v4, Framer Motion, Three.js, Spatial Design, PRD Mapping.
Domain: B2B Lending Workflows, API Testing, Credit Risk Decisioning (PD/LGD/EAD), Behavioral Psychology.

═══════════════════════════════════════════════════
CONTACT & DIRECT LINKS
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
        *   *Description*: `Statistical machine learning and loan product development. I treat data as a raw material for robust product decisions, structuring validation frameworks, scoring models, and predictive pipelines.`
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
