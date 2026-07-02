# Portfolio Content Audit Export V4
*Date: 2026-07-02*
*Definitive copy deck for the application. Every string here is final. Synced with MASTER_PROFILE_THARUN_GAJULA_2026-07-02.md.*

**What changed in V4:**
- All page copy shrunk. Short lines, quick scan, no crowding.
- Product Lab reduced to 3 prototypes. FMCG Whitespace OS removed from the app entirely (cards, pillar proofs, story mentions).
- New **Playground** section added under Product Lab for work-in-progress systems.
- All 3 prototype descriptions rewritten from the 2026-07-02 master reference docs (old descriptions were inaccurate).
- Each prototype now carries a one-line "Next" add-on note.
- Role-direction language removed everywhere. The portfolio just shows the work.

---

## 1. SEO & Global Metadata (`app/layout.tsx`)
- **Global Default Title:** Tharun Gajula | AI Product Systems & Workflow Architecture
- **Description:** AI product systems, quantitative analytics, and interface architecture by Tharun Gajula.
- **Keywords:** Tharun Gajula, AI Systems, AI Product, Workflow Architecture, Analytics, Quant, Bengaluru
- **OpenGraph Title:** Tharun Gajula | AI Product Systems
- **OpenGraph Description:** AI product systems, analytics workflows, and interface architecture.

---

## 2. Global Navigation (`app/page.tsx`)
- **Brand Title:** THARUN GAJULA
- **Navigation Tabs:** BLOG · // WORK · // STORY · // CONNECT
- **Work Sub-Tabs:** Overview · Product Lab (AI Systems) · Analytics & Quant
- **System Indicator:** SYSTEM: ONLINE

---

## 3. Avatar / Home (`components/SplineAvatar.tsx`)
- **Title:** AI EXPLORER
- **Call to Action:** talk to me

---

## 4. Blog (`components/BlogPage.tsx`)
- **System Status:** SYSTEM_UPDATING
- **Title:** Blog
- **Content:** Field notes and build logs are being moved here. Online soon.

---

## 5. What I Bring / Work Overview (`components/WorkOverview.tsx`)
- **Tag:** // CAPABILITY_MAP
- **Title:** What I Bring

**Pillars:**

1. **Product Ownership**
   - *Description:* Fintech product ownership — loan workflows, PRDs, and API integrations inside institutional banking.
   - *Proofs:*
     - B2B Loan Origination — Mapped workflows and managed PRDs across 12+ bank integrations at Lentra AI.
     - Credit Risk Products — Built scoring models and loan workflows at Jana Small Finance Bank. Cut reporting turnaround by 30%.
     - UAT & API Integration — Structured test suites and API specs across engineering, risk, and operations teams.

2. **Quantitative Systems**
   - *Description:* Scoring models, neural networks, and forecasting engines built on financial data.
   - *Proofs:*
     - Credit Risk Modeling — WoE scorecards and default classifiers on Lending Club data.
     - Prediction & Forecasting — Bank churn neural network, SARIMA demand forecasting.
     - Portfolio Optimization — NIFTY 100 efficient frontier and Sharpe analysis.
   - *Link:* View analytics portfolio →

3. **AI Prototyping**
   - *Description:* Functional AI product systems, built end to end — from data model to interface.
   - *Proofs:*
     - JARVIZ Live — AI portfolio cockpit with live chat, streaming responses, and guided UI state.
     - Parents Health OS — Remote elder-care console with WhatsApp check-ins and doctor-ready briefs.
     - Quant OS — Spatial knowledge graph for quant finance with a RAG-grounded AI terminal.
     - Curiosity OS — Cognition lab with runnable playbooks and a 3D causal knowledge map.

4. **Adaptive Craft**
   - *Description:* Interface development and product storytelling — clean experiences out of dense logic.
   - *Proofs:*
     - Product Development — Next.js, React, Tailwind.
     - Spatial & Interface Design — Layouts that keep complex information readable.
     - Visual & GTM Execution — Product walkthroughs and brand assets.

**Production Stack Block:**
- **Tag:** // Current Architecture & Exploration Stack
- **Models:** Claude 4.6 Sonnet, Gemini Flash 3.0
- **Orchestration:** Agentic Workflows, Model Context Protocol (MCP)
- **Backend/Data:** FastAPI, Postgres + pgvector for RAG
- **Frontend:** Next.js, Tailwind, GSAP
- **Focus:** Reliable, evaluated AI systems.

**Synthesis Line:**
The quant background brings rigor. The fintech years bring product judgment. The lab brings speed. The craft makes it usable.

---

## 6. Work Gallery (`components/WorkGallery.tsx` & `data/systems.ts`)

### Product Lab
- **Tag:** // PRODUCT_LAB_SYSTEMS
- **Title:** Product Lab
- **Intro Line:** Three systems, kept sharp and improved over time.

1. **Parents Health OS**
   - *Tag:* // GERIATRIC CARE
   - *Description:* Remote elder-care console for Indian families. Parents check in over WhatsApp — no app to learn — while the family dashboard tracks medications, vitals, and triage, and generates doctor-ready briefs. Local-first by design.
   - *Next:* Live WhatsApp API integration and vitals trend alerts.
   - *Link Label:* [ Open Prototype → ]

2. **Quant OS**
   - *Tag:* // ANALYTICS SYSTEMS
   - *Description:* Spatial knowledge base for quantitative finance. Markdown notes become an interactive graph with wikilinks, backlinks, KaTeX math, and mastery tracking — plus Vian AI, a terminal chatbot grounded strictly in the knowledge base.
   - *Next:* Hybrid vector search for Vian AI and spaced-repetition review.
   - *Link Label:* [ Open Prototype → ]

3. **Curiosity OS**
   - *Tag:* // LEARNING SYSTEMS
   - *Description:* A digital lab for training thinking skills. Runnable activity playbooks, evidence logging and reflection tools, curated learning paths, and a 3D causal knowledge map explored through Student, Mentor, and Builder lenses.
   - *Next:* Session history across paths and shared classroom sessions.
   - *Link Label:* [ Open Prototype → ]

### Playground (new section, below the 3 cards)
- **Tag:** // PLAYGROUND
- **Title:** Playground
- **Intro Line:** Work in progress. New systems land here first — rough, live, and evolving — and graduate to the Product Lab when they earn it.
- **Empty State (until first WIP project is added):** Next system loading...
- **Card format (for future entries):** Name · one line on what it is · `WIP` badge. No prototype link until it is stable.

### Archived (hidden, not rendered — kept for reference only)
- **Therapy Matching OS** — // CLINICAL MATCHING — 58-point clinical matching with PCOMS preference alignment. Role-specific proof, shown on request.
- **Relational Matching OS (Mila)** — // RELATION SYSTEMS — Psychology-backed matching engine with MECE profiling. Hidden archive.
- **FMCG Whitespace OS** — Removed from the portfolio in V4. Repo and case study preserved privately.

### Analytics & Quant
- **Tag:** // ANALYTICS_QUANT_SYSTEMS
- **Title:** Analytics & Quant

1. **Lending Club Classifier** — // CREDIT RISK MODEL — Default prediction on Lending Club loans: feature engineering, WoE, model validation. — [ View on GitHub → ]
2. **Bank Churn Neural Network** — // CUSTOMER CHURN — Neural network estimating customer attrition risk from account-level signals.
3. **Twitter Sentiment Pipeline** — // NLP PIPELINE — End-to-end text classification: preprocessing, vectorization, training, evaluation.
4. **CartPole RL Comparison** — // REINFORCEMENT LEARNING — Policy learning comparison study on CartPole.
5. **Antidiabetic Forecast** — // TIME-SERIES FORECASTING — SARIMA demand forecasting on pharmaceutical sales with rolling validation.
6. **NIFTY 100 Portfolio Optimizer** — // PORTFOLIO OPTIMIZATION — Efficient frontier, Sharpe ratio, and risk-return tradeoffs on NIFTY 100.

*(Hidden, not rendered: Employee Retention Risk Classifier, Socio-Economic Engine.)*

---

## 7. Story / Evolution Timeline (`components/EvolutionTimeline.tsx`)
- **Tag:** // HOW IT CONNECTS
- **Intro Brief:** One pattern runs through my career: take dense, ambiguous logic and turn it into systems people can actually use. Engineering and finance first, then institutional fintech, then independent analytics and deep learning, and now full-stack AI product systems.

**Milestones:**

- **05 // The Deep Build**
  - *Timeline:* [May 2026 — Present]
  - *Title:* AI Systems, In the Open
  - *Description:* Going deeper on how AI systems actually work — foundations, RAG, evals, agents — and improving the three Product Lab systems as I learn. Documented publicly in Field Notes.
  - *Metrics:* AI Systems, Evals & RAG, Public Field Notes

- **04 // The Prototyping Sprint**
  - *Timeline:* [Feb 2026 — May 2026]
  - *Title:* Functional Prototyping & AI Orchestration
  - *Description:* An intensive sprint building functional AI systems end to end — elder care, quant research, learning design, and the JARVIZ Live portfolio cockpit.
  - *Metrics:* Focused systems sprint, AI product engineering, Interface + workflow design

- **03 // Consulting & Skill Acquisition**
  - *Timeline:* [2022 — Jan 2026]
  - *Title:* Analytics Consulting & Deep Learning
  - *Description:* Independent analytics consulting — data pipelines, Python automation, client dashboards — alongside an Executive Deep Learning programme at IISc Bangalore (Grade: 92%) and 8 quantitative projects, 6 shown here.
  - *Metrics:* 8 Analytics Projects, IISc Deep Learning, Quantitative Modeling

- **02 // Institutional Product & Workflows**
  - *Timeline:* [2021 — 2022]
  - *Title:* Internal Product Owner & Workflow Architect
  - *Description:* At Lentra AI, mapped B2B loan origination workflows and PRDs across 12+ bank integrations. At Jana Small Finance Bank, built credit scoring models and automation that cut reporting turnaround by 30%.
  - *Metrics:* Workflow Architecture, UAT & API Testing, Loan Product Workflows

- **01 // The Foundation**
  - *Timeline:* [2017 — 2021]
  - *Title:* Engineering + PGDM Banking & Finance
  - *Description:* B.Tech in Mechanical Engineering (GRIET Hyderabad), then a PGDM in Banking & Finance at NIBM Pune (an RBI institution). Systems thinking plus the language of institutional finance.
  - *Metrics:* Mechanical Systems, Banking & Finance, RBI Institution

---

## 8. Connect (`components/ConnectPage.tsx`)
- **Tag:** // COLLABORATION
- **Title:** COLLABORATION
- **Content:** I like ambiguous problems — taking dense business logic and quantitative workflows and turning them into simple, usable products. If the work here resonates, reach out. Let's build something that matters.

- **Tag:** // DIRECT_LINKS
  - **Email:** tharun.gajula.2@gmail.com
  - **LinkedIn:** linkedin.com/in/tharungajula
  - **GitHub:** github.com/tharungajula2
  - **Copy Button:** [ COPY ]

- **Status Indicator:** Based in Bengaluru · Available immediately

---

## 9. Field Notes / Agentic AI Notebook (`components/FieldNotesPage.tsx`)
- **Tag:** // FIELD_NOTES
- **Title:** Learning to build AI systems, in the open.
- **Subtitle:** What I am learning, what I am building, and what I get wrong.

**Notebook Role:**
- *Tag:* // NOTEBOOK_ROLE
- *Description:* I am going deeper on how AI systems actually work — the ML/DL core, RAG, evals, agents, memory. This is where I write it down as I go. Some notes are finished. Most are still growing. That is the point.

**Current Focus:**
- *Tag:* CURRENT FOCUS
- *Metrics:* ML/DL Foundations & Evals
- *Description:* Building a neural network from scratch in Python, calculating backpropagation by hand, and writing basic tests to check if AI outputs are actually correct.

**Featured Notes:**
- *Why I am studying AI systems from the foundations again* (concept, draft, ml-dl-core) — Foundational ML mechanics over API wrapper demos.
- *Why evals matter more than demos* (evals, draft, evals) — A demo shows something can work once. Evals show how often.
- *What I learned building JARVIZ Live* (build-log, active, agents) — On-device vision, browser voice, streaming output, Spline.

**Learning Tracks:** All Tracks, ML/DL Core, Transformers, RAG, Evals, Agents & Memory, AI Product, Systems Design.

**Public Notes Index:**
1. *Why I am studying AI systems from the foundations again* (Concept, Draft, Fairly-Sure) — Foundational ML mechanics over API wrapper demos.
2. *Prompt engineering vs context engineering* (Prompt-workflow, Seed, Exploring) — Prompting is wording. Context engineering decides what the model sees at all.
3. *What RAG actually solves — and what it does not* (RAG, Draft, Fairly-Sure) — What retrieval solves and where it hits structural limits.
4. *Why evals matter more than demos* (Evals, Draft, Fairly-Sure) — A demo shows something can work once. Evals show how often.
5. *Notes on agents, memory, and tool calling* (Agent-memory, Seed, Exploring) — Memory partitions, tool selection bottlenecks, planning loops.
6. *What I learned building JARVIZ Live* (Build-log, Active, Confident) — On-device vision, browser voice, streaming output, Spline.
7. *What I need to understand about transformers* (Concept, Draft, Exploring) — Walking through attention math instead of using high-level libraries.
8. *AI PM notes: designing for uncertainty* (AI-product, Draft, Fairly-Sure) — Interfaces and system boundaries around probabilistic models.
9. *My current learning stack* (Resource, Active, Confident) — The small set of deep resources I actually use.
10. *Daily knowledge commit system* (Prompt-workflow, Active, Confident) — Small daily commits keep this notebook alive.

**Resources I Trust:**
1. *Neural Networks: Zero to Hero* — Andrej Karpathy (ml-dl-core // reading) — From-scratch journey through MLPs, backprop, and language models.
2. *Attention Is All You Need* — Vaswani et al. (transformers // reading) — The paper that introduced the Transformer.
3. *Creating Evals for Generative AI* — Hamel Husain (evals // reading) — Systematic testing instead of vibe checks.
4. *Seven Failure Points in RAG Systems* — Barnett et al. (rag // reading) — Where RAG loops actually break.
5. *Lost in the Middle* — Liu et al. (rag // reading) — How models lose information in the middle of long contexts.

**Glossary:**
- *Attention:* How a model computes which tokens in a sequence matter most to each other, regardless of distance.
- *Embedding:* Text converted into high-dimensional vectors, so similar meanings sit close together in space.
- *Context Window:* The total tokens a model can process in a single run.
- *Retrieval-Augmented Generation (RAG):* Search relevant documents first, inject them into the prompt, ground the answer in them.
- *Evaluations (Evals):* Repeatable tests measuring quality, accuracy, cost, and latency of model output.
- *Agent Memory:* The state structures that let an agent persist and retrieve information across steps and sessions.

**Closing Principle:**
- *Tag:* // NOTEBOOK_CLOSING
- "Notes change as I learn. If something here is wrong, it gets fixed. That is how a notebook should work."

---

## 10. Build Log (`data/buildlog.ts`)
1. **Day 1 (2026-04-15)** — Architected single-page OS interface: 3D Spline container, dynamic 2D neural graph, interactive timeline. *Learned:* A unified activeTab controller prevents layout shifts across high-fidelity views. *Tags:* Next.js 16, Spline 3D, Architecture
2. **Day 2 (2026-04-18)** — Engineered responsive 2D physics-based capability graph. *Learned:* Force graphs need precise charge and link tuning to stay readable. *Tags:* D3 Force, Data Viz, UI/UX
3. **Day 3 (2026-04-28)** — Replaced dynamic markdown parsing with a static, type-safe data layer. *Learned:* Decoupling markdown from client renders dramatically improves LCP. *Tags:* TypeScript, Performance, Clean Architecture
4. **Day 4 (2026-05-01)** — Integrated Gemini REST API stream on Edge Runtime for chat. *Learned:* SSE on Vercel Edge bypasses serverless timeouts. *Tags:* Gemini API, Edge Runtime, Streaming
5. **Day 5 (2026-05-02)** — Refined positioning, streamlined layouts, established type-safe daily logs. *Learned:* Labels must pass a rapid visual test — less ambiguity, more interaction. *Tags:* UX, Product Design, Polish
