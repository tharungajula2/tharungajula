# Portfolio Content Audit Export

## 1. Purpose

This document serves as a complete content audit export and snapshot of all public-facing text, copy, metadata, and chatbot contexts in the portfolio application. This file is for review purposes only and does not alter the code, layout, styling, or functionality of the application in any way.

---

## 2. Source Files Inspected

The following source files in the repository contain public-facing text, SEO metadata, or AI chatbot configuration content, and have been audited:

*   **`app/layout.tsx`** (SEO Metadata and Global HTML Elements)
*   **`app/page.tsx`** (Header navigation, footer tags, tab states, layout structure)
*   **`components/WorkOverview.tsx`** (Overview / "What I Bring" section and capabilities)
*   **`components/WorkGallery.tsx`** (Product Lab & Analytics & Quant card content)
*   **`components/EvolutionTimeline.tsx`** (Story / "How It Connects" milestone timeline)
*   **`components/ConnectPage.tsx`** (Connect / collaboration pitches and links)
*   **`lib/ai-context.ts`** (JARVIZ Live chatbot knowledge boundaries and context)
*   **`data/systems.ts`** (System index data used by outreach subcomponents)

---

## 3. Route / Section Map

Below is a mapping of the major visible routes, sections, and tabs of the portfolio to the exact files that define and control their content:

| App Section / Tab | UI Element / Trigger | Primary Source File | Content Visibility Status |
| :--- | :--- | :--- | :--- |
| **Site Header** | Header Bar | `app/page.tsx` | Permanent |
| **Site Footer** | Floating Pills & Docker | `app/page.tsx` | Permanent |
| **Overview Tab** | `Overview` Button | `components/WorkOverview.tsx` | Toggleable (Under Work) |
| **Product Lab Tab** | `Product Lab (AI Systems)` Button | `components/WorkGallery.tsx` | Toggleable (Under Work) |
| **Analytics & Quant Tab** | `Analytics & Quant` Button | `components/WorkGallery.tsx` | Toggleable (Under Work) |
| **Story / Evolution** | `// STORY` Footer Link | `components/EvolutionTimeline.tsx` | Full view |
| **Connect / Contact** | `// CONNECT` Footer Link | `components/ConnectPage.tsx` | Full view |
| **JARVIZ Assistant** | Talk Button / overlay cockpit | `lib/ai-context.ts` | On-demand overlay |
| **Global Meta / SEO** | Search engines / browsers | `app/layout.tsx` | Browser background |

---

## 4. Public-Facing Content By Section

### Section: Header & Global Nav
**Source file:** `app/page.tsx`  
**Visibility:** Visible  
**Extracted content:**
*   “THARUN GAJULA” (Header logo/home button)
*   “GITHUB” (External link to `https://github.com/tharungajula2`)
*   “LINKEDIN” (External link to `https://linkedin.com/in/tharungajula`)
*   “SYSTEM: ONLINE” (Status light label)
*   “// WORK” (Footer pill navigation anchor)
*   “// STORY” (Footer pill navigation anchor)
*   “// CONNECT” (Footer pill navigation anchor)

---

### Section: Overview (What I Bring)
**Source file:** `components/WorkOverview.tsx`  
**Visibility:** Visible  
**Extracted content:**
*   **Section Eyebrow:** `// CAPABILITY_MAP`
*   **Section Title:** `What I Bring`
*   **Pillar 1 Label:** `Product Ownership`
*   **Pillar 1 Description:** `Internal Product Owner & Workflow Architect bridging complex logic with engineering to deliver high-performance loan products and optimized workflows.`
*   **Pillar 1 Bullet Points:**
    *   `B2B Loan Origination Systems — Managed PRDs and mapped complex banking workflows for Lentra AI across 12+ bank integrations.`
    *   `Credit Risk Loan Products — Engineered risk frameworks and loan product workflows at Jana Small Finance Bank.`
    *   `Cross-Functional Stakeholder Alignment — Coordinated engineering, risk, and operations teams.`
    *   `UAT & API Integration — Structured test suites, API specifications, and reduced operational decisioning turnaround by 30%.`
*   **Pillar 2 Label:** `Quantitative Systems`
*   **Pillar 2 Description:** `Statistical scoring models, predictive neural networks, and forecasting engines built on financial datasets.`
*   **Pillar 2 Bullet Points:**
    *   `Credit Risk Decisioning (PD/LGD/EAD) — Mapped mathematical risk models to active credit pipelines.`
    *   `Bank Customer Churn Engine — Engineered predictive neural networks to model customer attrition metrics.`
    *   `Antidiabetic Demand Forecasting — Structured SARIMA time-series models for pharmaceutical supply chains.`
    *   `NIFTY 100 Portfolio Optimization — Built efficient frontiers and Sharpe ratio risk-return profiles.`
    *   `Lending Club Risk Classifier — Designed features and trained default probability classifiers.`
*   **Pillar 2 Link:** `View analytics portfolio →` (Links to `https://github.com/tharungajula2/Portfolio`)
*   **Pillar 3 Label:** `AI Prototyping`
*   **Pillar 3 Description:** `Built a focused set of functional systems to sharpen AI product engineering, full-stack execution, and interface design.`
*   **Pillar 3 Bullet Points:**
    *   `JARVIZ Live Portfolio Cockpit — Multi-modal AI system console mapping portfolio capabilities and live user workflows.`
    *   `Parents Health OS — Geriatric care system mapping clinical matrices, health indices, and structured doctor summaries.`
    *   `Quant OS — Spatial research map translating models and projects into a navigable physics-based knowledge graph.`
    *   `Curiosity OS — Pedagogical learning workspace mapping classroom ideas, activities, and learning flows.`
    *   `FMCG Whitespace OS — Product strategy case study mapping unit economics, margins, and visual storytelling.`
    *   `IISc Deep Learning Programme — Academic grounding in deep learning architectures (Grade: 92%).`
*   **Pillar 4 Label:** `Adaptive Craft`
*   **Pillar 4 Description:** `Interface development and product storytelling — translating abstract problems into premium user experiences.`
*   **Pillar 4 Bullet Points:**
    *   `Product Development — Next.js, React, and Tailwind CSS development.`
    *   `Spatial & Interface Design — Designing layouts that balance high-density logic with crisp usability.`
    *   `Visual & GTM Execution — Developing high-quality product walkthrough videos and brand architectures.`
    *   `High-Agency Systems Thinking — Rapidly mastering unfamiliar clinical, psychological, and FMCG domains.`
*   **Production Stack Button:** `View Production Stack` / `Hide Production Stack`
*   **Production Stack Content:**
    *   `// Current Architecture & Exploration Stack`
    *   `Models: Claude 4.6 Sonnet, Gemini Flash 3.0`
    *   `Orchestration: Agentic Workflows, Model Context Protocol (MCP)`
    *   `Backend/Data: FastAPI, Postgres + pgvector for RAG`
    *   `Frontend: Next.js, Tailwind, GSAP`
    *   `Focus: Transitioning from standard wrappers to secure, distributed AI systems.`
*   **Synthesis Statement:** `These work together. The quantitative background provides system rigor. The institutional experience provides product judgment. The prototyping lab provides speed. The design craft makes it intuitive.`

---

### Section: Story / Timeline (How It Connects)
**Source file:** `components/EvolutionTimeline.tsx`  
**Visibility:** Visible  
**Extracted content:**
*   **Section Eyebrow:** `// HOW IT CONNECTS`
*   **Narrative Intro Plinth:** `Most of my career is connected by a singular drive: understanding complex systems and building logical, high-aesthetic interfaces that make them navigable. I started in engineering and finance, spent an intensive year as an Internal Product Owner and Workflow Architect inside institutional banking and lending tech building scoring models, and then moved into independent analytics consulting and deep learning exploration. Most recently, I completed a dedicated prototyping sprint to master the modern AI stack and explore agentic architectures. The thread through all of it: taking dense, ambiguous logic and shipping functional product architectures.`
*   **Milestone 05 Title:** `Agentic Engineering & Product Architecture` (Era: `// The Deep Build`, Timeline: `[May 2026 — Present]`)
    *   **Description:** `Exploring agentic AI systems and practical cognitive engineering, balanced carefully through a high-ownership Product Manager lens rather than a purely academic one. Designing robust multi-agent frameworks, task loops, and self-correction workflows that map abstract product requirements to reliable backend systems.`
    *   **Badges/Metrics:** `AGENTIC AI SYSTEMS`, `COGNITIVE ARCHITECTURE`, `AI PRODUCT MANAGEMENT`
*   **Milestone 04 Title:** `Functional Prototyping & AI Orchestration` (Era: `// The Prototyping Sprint`, Timeline: `[Feb 2026 — May 2026]`)
    *   **Description:** `Built a focused set of functional systems to sharpen AI product engineering, full-stack execution, and interface design. The sprint centered on health tracking, quantitative research, learning systems, commercial product strategy, and the JARVIZ Live portfolio cockpit.`
    *   **Badges/Metrics:** `FOCUSED SYSTEMS SPRINT`, `AI PRODUCT ENGINEERING`, `INTERFACE + WORKFLOW DESIGN`
*   **Milestone 03 Title:** `Analytics Consulting & Deep Learning` (Era: `// Consulting & Skill Acquisition`, Timeline: `[2022 — Jan 2026]`)
    *   **Description:** `Operated as an independent analytics consultant managing end-to-end data pipelines, custom Python automation, and technical documentation. Completed an Executive Deep Learning programme at IISc Bangalore (Grade: 92%) and engineered 8 quantitative projects spanning credit risk, forecasting, and NLP.`
    *   **Badges/Metrics:** `8 ANALYTICS PROJECTS`, `IISC DEEP LEARNING`, `QUANTITATIVE MODELING`
*   **Milestone 02 Title:** `Internal Product Owner & Workflow Architect` (Era: `// Institutional Product & Workflows`, Timeline: `[2021 — 2022]`)
    *   **Description:** `Executed fintech product ownership across two institutional roles. At Lentra AI, managed PRDs and mapped B2B loan origination workflows across 12+ bank integrations. At Jana Small Finance Bank, engineered credit risk frameworks, structured UAT, and built scoring models that reduced decisioning turnaround by 30%.`
    *   **Badges/Metrics:** `WORKFLOW ARCHITECTURE`, `UAT & API TESTING`, `LOAN PRODUCT WORKFLOWS`
*   **Milestone 01 Title:** `Engineering + PGDM Banking & Finance` (Era: `// The Foundation`, Timeline: `[2017 — 2021]`)
    *   **Description:** `Graduated with a B.Tech in Mechanical Engineering (GRIET Hyderabad) and completed a PGDM in Banking & Finance at NIBM Pune (an RBI institution). Combining engineering systems-thinking with institutional finance gave me the vocabulary and structured logic to model complex banking workflows.`
    *   **Badges/Metrics:** `MECHANICAL SYSTEMS`, `BANKING & FINANCE`, `RBI INSTITUTION`

---

### Section: Connect (Collaboration)
**Source file:** `components/ConnectPage.tsx`  
**Visibility:** Visible  
**Extracted content:**
*   **Section Eyebrow:** `// COLLABORATION`
*   **Section Title:** `COLLABORATION`
*   **Pitch Copy:** `Open to meaningful collaboration on long-horizon systems. Seeking high-ownership Product Management, AI PM, 0→1 PM, or Founder's Office roles at early-stage startups in Bengaluru. I thrive in ambiguous environments, translating complex business processes and high-friction quantitative logic into simple, pixel-perfect user experiences. Let's build something that matters.`
*   **Direct Links Section Eyebrow:** `// DIRECT_LINKS`
*   **Card 1 Link & Button:** `tharun.gajula.2@gmail.com` (CTA: `[ COPY ]` or `✓ COPIED`)
*   **Card 2 Link & Button:** `linkedin.com/in/tharungajula` (CTA: `[ OPEN ↗ ]`)
*   **Card 3 Link & Button:** `github.com/tharungajula2` (CTA: `[ OPEN ↗ ]`)
*   **Footer Pulsar Wording:** `Based in Bengaluru · Available immediately`

---

### Section: SEO Metadata
**Source file:** `app/layout.tsx`  
**Visibility:** Metadata only  
**Extracted content:**
*   **Title:** `Tharun Gajula | Systems Thinking & AI-Native Workflows`
*   **Description:** `A public archive of experiments in learning systems, AI-native workflows, and systems-thinking by Tharun Gajula.`
*   **Keywords:** `Tharun Gajula`, `AI Workflows`, `Learning Systems`, `Cognitive Architecture`, `Systems Thinking`, `Bangalore`
*   **Author:** `Tharun Kumar Gajula`
*   **OpenGraph Title:** `Tharun Gajula`
*   **OpenGraph Description:** `Systems Thinking, AI-Native Workflows, and Experimental Builds.`

---

## 5. Product / Project Card Inventory

Below is an inventory of all Product Lab projects defined in the application across data files and components, representing both live-rendered and preserved backup states:

| Project Name | Category / Eyebrow | Description Copy | Link Target | Visibility Status | Source File |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Parents Health OS** | `GERIATRIC CARE` | Family-first health tracking system for elderly care. Organizes routines, vitals, reports, and doctor-ready summaries in one local-first dashboard. | `https://parents-health-os.vercel.app` | **Visible** | `components/WorkGallery.tsx` |
| **Quant OS** | `ANALYTICS SYSTEMS` | Spatial research map for analytics and quantitative finance. Turns models, notes, and projects into a navigable knowledge graph. | `https://quant-os.vercel.app` | **Visible** | `components/WorkGallery.tsx` |
| **Curiosity OS** | `LEARNING SYSTEMS` | Learning design workspace for teachers and students. Maps classroom ideas, activities, and learning flows into a structured exploration interface. | `https://curiosity-os.vercel.app` | **Visible** | `components/WorkGallery.tsx` |
| **FMCG Whitespace OS** | `COMMERCIAL PRODUCT CASE STUDY` | Product strategy case study for a functional food concept. Covers positioning, unit economics, margins, and visual storytelling from scratch. | `https://fmcg-whitespace-os.vercel.app` | **Visible** | `components/WorkGallery.tsx` |
| **Therapy Matching OS** | `CLINICAL MATCHING` | Concept prototype: therapy matching engine. Implements 58-point clinical matching and PCOMS preference alignment on an aesthetic interface. | `https://therapy-matching-os.vercel.app` | **Hidden / Inactive** (backup) | `components/WorkGallery.tsx` |
| **Relational Matching OS (Mila)** | `RELATION SYSTEMS` | Concept prototype: psychology-backed relationship matching engine implementing MECE profiling and explained logic. | `https://relational-matching-os.vercel.app` | **Hidden / Inactive** (backup) | `components/WorkGallery.tsx` |

---

## 6. Analytics & Quant Inventory

Below is the inventory of all analytics and quantitative finance projects shown under the "Analytics & Quant" tab:

| Project Name | Description Copy | Category Tag | Visibility Status | Source File |
| :--- | :--- | :--- | :--- | :--- |
| **Lending Club Classifier** | End-to-end credit risk model. Feature engineering, logistic regression, gradient boosting — raw loans to default probability. | `// RISK ARCHITECTURE` | **Visible** | `components/WorkGallery.tsx` |
| **Bank Churn Neural Network** | Neural network predicting bank customer churn. Feature engineering on transaction patterns, production-ready accuracy. | `// ATTRITION NEURAL NET` | **Visible** | `components/WorkGallery.tsx` |
| **Employee Retention Risk Classifier** | Predicting which employees leave using logistic regression, decision trees, and random forests. Human capital as a measurable signal. | `// RETENTION CLASSIFIER` | **Visible** | `components/WorkGallery.tsx` |
| **Socio-Economic Engine** | Household classification from noisy survey data. Heavy preprocessing, PCA, SMOTE, and XGBoost. | `// CENSUS ENSEMBLE` | **Visible** | `components/WorkGallery.tsx` |
| **Twitter Sentiment Pipeline** | Classifying tweet sentiment using NLP preprocessing and ML classifiers. Full pipeline from raw text to prediction. | `// SENTIMENT NLP` | **Visible** | `components/WorkGallery.tsx` |
| **CartPole RL Comparison** | Reinforcement learning on CartPole — 7 algorithms compared. Learned RL by actually implementing it. | `// DISCRETE POLICY RL` | **Visible** | `components/WorkGallery.tsx` |
| **Antidiabetic Forecast** | Time-series forecasting for medicine demand. SARIMA on real pharmaceutical data with rolling validation. | `// DEMAND FORECASTING` | **Visible** | `components/WorkGallery.tsx` |
| **NIFTY 100 Portfolio Optimizer** | Modern Portfolio Theory on NIFTY 100 stocks. Efficient frontier, Sharpe ratios, risk-return analysis. | `// PORTFOLIO THEORY MPT` | **Visible** | `components/WorkGallery.tsx` |

---

## 7. AI Assistant Context Export

The following structured knowledge block is extracted from `lib/ai-context.ts`. It acts as the context prompt for Gemini / JARVIZ, outlining Tharun's background, work history, and product classifications:

### A. Professional Summary
Tharun Gajula is an AI-focused Product Manager & Zero-to-One Builder specializing in translating dense quantitative logic and ambiguous data environments into simple, pixel-perfect user experiences. He combines a rigorous technical foundation in deep learning and statistical data engineering (IISc Deep Learning at 92%, NIBM Finance) with the speed of an AI-native builder (Next.js, LLM orchestration, spatial design). He is seeking high-ownership Product Management (PM), AI PM, 0-to-1 PM, or Founder's Office roles at early-stage startups in Bengaluru.

### B. Core Career Act Arc
*   **Act 1 — Product Ownership & Workflows (2021–2022):** Worked as an Internal Product Owner and Workflow Architect across Lentra AI and Jana Small Finance Bank. He managed B2B lending product roadmaps, wrote PRDs, mapped dense financial workflows across 12+ bank integrations, structured UAT criteria, and engineered credit risk frameworks that cut operational decisioning turnaround times by 30%.
*   **Act 2 — Consulting & Quantitative Systems (2022–2025):** Operated as an independent analytics consultant managing end-to-end data pipelines, custom Python automation pipelines, and technical specifications. He completed an Executive Deep Learning programme at IISc Bangalore (Grade: 92%) and built 8 end-to-end quantitative systems (PD/LGD credit risk modeling, bank churn predictive neural networks, SARIMA demand forecasting, portfolio risk efficient frontiers).
*   **Act 3 — Zero-to-One Prototyping (Feb 2026–Present):** Built a focused set of functional systems to sharpen AI product engineering, full-stack execution, and interface design. The sprint centered on health tracking (Parents Health OS), quantitative research (Quant OS), learning systems (Curiosity OS), commercial product strategy (FMCG Whitespace OS), and the JARVIZ Live portfolio cockpit. He completed this intensive lab sprint to demonstrate how dense logical workflows can be translated into simple, pixel-perfect user experiences with extreme attention to taste, layout ergonomics, and dense backend rulesets. He is currently focusing on practical multi-agent task flows and cognitive workflows through a PM lens.

### C. System Classifications for the AI Chatbot

*   **Flagship Systems:**
    1.  *PARENTS HEALTH OS:* Geriatric care system mapping clinical matrices, health indices, and structured doctor summaries. (parents-health-os.vercel.app)
    2.  *QUANT OS:* Spatial research map translating models and projects into a navigable physics-based knowledge graph. (quant-os.vercel.app)
    3.  *CURIOSITY OS:* Pedagogical learning workspace mapping classroom ideas, activities, and learning flows. (curiosity-os.vercel.app)
*   **Commercial Product Case Study:**
    4.  *FMCG WHITESPACE OS (Pause):* FMCG growth analytics mapping unit-level P&L waterfalls, margins, and cinematic GSAP scrolling. (fmcg-whitespace-os.vercel.app)
*   **Role-Specific / Archived Systems:**
    5.  *THERAPY MATCHING OS:* Clinical matching engine matching users to therapists via clinical alliance logic (58 data points). (therapy-matching-os.vercel.app)
    6.  *RELATIONAL MATCHING OS (Mila):* Psychology-backed connection prototype utilizing a 3-layer matching algorithm and custom 80 MECE profiles. (relational-matching-os.webp.png)

---

## 8. Potential Review Flags

The following areas are identified as potential points for review or further harmonization, presented strictly for evaluation without making subjective final decisions:

1.  **FINTECH/LENDING PROOFS VS. PM ROLES**: The capability maps and timeline detail substantial low-level engineering experience (such as writing Python scripts for UAT, bank integrations, neural networks, or risk formulas). It may be worth evaluating if this heavily skews the perception of the candidate toward a developer/technical analyst rather than a Product Manager/Workflow Designer.
2.  **OUTDATED BADGES AND REFLATION AREAS**: In the hidden systems (Therapy Matching OS and Relational Matching OS), the files still exist inside Vercel subdomains (`https://therapy-matching-os.vercel.app`, etc.). If a recruiter manages to visit them via Google Search or direct URLs, they will see old titles or descriptions that were not updated inside those specific projects.
3.  **ANALYTICS PORTFOLIO DENSITY**: There are 8 separate quantitative models listed in the "Analytics & Quant" gallery tab. This represents a wide breadth of academic and consulting works (churn models, credit scoring, RL, demand forecasting, stock portfolio frontiers). It should be monitored whether having 8 separate tiles creates "choice fatigue" for a reviewer compared to focusing on the top 3-4 most rigorous examples.
4.  **INACTIVE DATA FILE REMNANT**: The data file `data/systems.ts` still contains the original copies for Mila and Therapy Matching OS and lists 6 prototypes in active index lists. Although this file is not imported by `app/page.tsx`, if the outreach system components are reactivated in the future, the mismatch in positioning will recur unless `data/systems.ts` is explicitly aligned or deleted.
