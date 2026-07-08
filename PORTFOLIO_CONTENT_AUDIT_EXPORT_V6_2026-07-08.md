# Portfolio Content Audit Export V6
*Date: 2026-07-08*
*Definitive copy deck for the application. Every string here is final. Synced with MASTER_PROFILE_THARUN_GAJULA_2026-07-08.md.*

**What changed in V6:**
- Shifted all copy from an "AI engineer/builder" emphasis to a "product builder who ships systems for real users" emphasis.
- Purged all occurrences of "Product Manager", "PM", "AI PM" from any user-facing code or texts.
- Updated the main tagline on the home tab page and browser title.
- Updated all pillars, stack names, details, and project details in "What I Bring" (WorkOverview).
- Shifted Product Lab project tags and intro lines.
- Updated Story milestones (EvolutionTimeline) to align with product/workflow/systems themes.
- Updated the AI chat panel suggestion chips and model system prompt rules.
- Updated the Blog placeholder to "Build logs and product notes are moving here."

---

## 1. SEO & Global Metadata (`app/layout.tsx`)
- **Global Default Title:** Tharun Gajula | Product Systems & Workflow Architecture
- **Description:** Product systems, quantitative analytics, and workflow architecture by Tharun Gajula.
- **Keywords:** Tharun Gajula, Product Systems, Workflow Architecture, Analytics, Quant, Bengaluru
- **OpenGraph Title:** Tharun Gajula | Product Systems & Workflow Architecture
- **OpenGraph Description:** Product systems, analytics workflows, and interface architecture.

---

## 2. Global Navigation & Layout (`app/page.tsx`)
- **Brand Logo Button (Left Header):** THARUN GAJULA (Sets active tab to the home/thesis Spline scene)
- **Top Right Header Link:** BLOG (Loads `components/BlogPage.tsx`)
- **Bottom Dock Links:**
  - `WORK` (Sets active view to `components/WorkOverview.tsx` or `components/WorkGallery.tsx` based on sub-tab selection)
  - `STORY` (Loads `components/EvolutionTimeline.tsx`)
  - `CONNECT` (Loads `components/ConnectPage.tsx`)
- **Sub-Tabs under WORK (Visible only when WORK is active):** Overview · Product Lab · Analytics & Quant
- **System Indicator:** SYSTEM: ONLINE (Located in the floating pill at bottom right for desktop screens)
- **Subtle Scanline Effect:** Scanlines overlaid on the entire app viewport.

---

## 3. Avatar / Home (`components/SplineAvatar.tsx`)
- **3D Scene URL:** https://prod.spline.design/jcvFsh5CNoyqI8Hn/scene.splinecode
- **HUD Role Title:** AI EXPLORER
- **HUD Call to Action:** talk to me (Triggers the AI Chat Panel)

---

## 4. Blog / Placeholder Screen (`components/BlogPage.tsx`)
- **System Status Tag:** SYSTEM_UPDATING
- **Title:** Blog
- **Content:** Build logs and product notes are moving here.

---

## 5. What I Bring / Work Overview (`components/WorkOverview.tsx`)
- **Tag:** // CAPABILITY_MAP
- **Title:** What I Bring

**Pillars:**

1. **Product Systems & Workflows**
   - *Description:* Mapped core workflows, PRDs, and integration schemas within institutional banking and risk platforms.
   - *Proofs:*
     - B2B Loan Origination — Mapped workflows and managed requirements across 12+ bank integrations at Lentra AI.
     - Credit Risk Platforms — Built scoring scorecards and loan workflows at Jana Small Finance Bank. Cut reporting turnaround by 30%.
     - Integration Testing & UAT — Coordinated technical requirements and REST API test suites across risk and engineering teams.

2. **Quantitative Rigor**
   - *Description:* Developed risk models, neural networks, and optimization pipelines grounded in structured financial data.
   - *Proofs:*
     - Credit Risk scorecards — Built WoE-based logistic regression risk models.
     - Predict & Forecast — Implemented customer churn models and SARIMA demand forecasting.
     - Portfolio Optimization — Developed NIFTY 100 efficient frontier and Sharpe validation scripts.
   - *Link:* View analytics portfolio →

3. **Functional Prototyping**
   - *Description:* Built working conceptual prototypes to stress-test complex workflows, RAG, and interface layouts.
   - *Proofs:*
     - JARVIZ Live — Built an interactive prompt-guided cockpit with live chat and dynamic UI state manipulation.
     - Parents Health OS — Designed a remote geriatric care dashboard driven by WhatsApp text inputs and local data vaults.
     - Quant OS — Engineered a spatial knowledge graph using force-directed graphs and local-first vector searches.
     - Curiosity OS — Shipped a digital lab for thinking skills with interactive session playbooks.

4. **Systems Architecture**
   - *Description:* Designed functional data layers, API specs, and front-end architectures that translate complex operations into clean software.
   - *Proofs:*
     - Frontend Engineering — Developed interactive interfaces using React, Next.js, and modern styling.
     - Data & API Schemas — Structured SQLite / Postgres database tables and type-safe data pipelines.
     - Technical Walkthroughs — Created system architecture maps and system documentation.

**Systems Stack Block:**
- **Tag:** // Current Architecture & Systems Stack
- **Models:** Gemini 2.5 Flash (API Chat)
- **Orchestration:** Structured prompts, tool-use logic
- **Backend/Data:** Next.js API Routes (Edge Runtime), local-first JSON data structures
- **Frontend:** Next.js 16 (App Router), React, TailwindCSS, Framer Motion
- **Focus:** Clean, functional interfaces that map complex logic into working software.

**Synthesis Line:**
The quant background brings analytical rigor. The fintech years bring operational workflow experience. The lab brings prototyping speed. The craft makes it usable.

---

## 6. Work Gallery (`components/WorkGallery.tsx` & `data/systems.ts`)

### Product Lab
- **Tag:** // PRODUCT_LAB_SYSTEMS
- **Title:** Product Lab
- **Intro Line:** Functional systems and prototypes, each built around a real user or design problem.

1. **Parents Health OS**
   - *Tag:* // GERIATRIC SYSTEMS
   - *Description:* Remote elder-care console for Indian families. Parents check in over WhatsApp — no app to learn — while the family dashboard tracks medications, vitals, and triage, and generates doctor-ready briefs. Local-first by design.
   - *Next:* Live WhatsApp API integration and vitals trend alerts.
   - *Link Label:* [ Open Prototype → ]

2. **Quant OS**
   - *Tag:* // KNOWLEDGE SYSTEMS
   - *Description:* Spatial knowledge base for quantitative finance. Markdown notes become an interactive graph with wikilinks, backlinks, KaTeX math, and mastery tracking — plus Vian AI, a terminal chatbot grounded strictly in the knowledge base.
   - *Next:* Hybrid vector search for Vian AI and spaced-repetition review.
   - *Link Label:* [ Open Prototype → ]

3. **Curiosity OS**
   - *Tag:* // COGNITIVE SYSTEMS
   - *Description:* A digital lab for training thinking skills. Runnable activity playbooks, evidence logging and reflection tools, curated learning paths, and a 3D causal knowledge map explored through Student, Mentor, and Builder lenses.
   - *Next:* Session history across paths and shared classroom sessions.
   - *Link Label:* [ Open Prototype → ]

4. **better4u**
   - *Tag:* // CONSUMER BRAND DESIGN
   - *Description:* A better-for-you food & beverage brand, designed end to end as a shippable PWA. A full house of sub-brands — sparkling ferments, smoothies, hot brews, whole-food bars, and a protein RTD line — each with its own identity, product renders, and packaging language. The focus is product and brand design: making 'healthy' look and feel premium enough that people actually reach for it.
   - *Next:* full SKU pages, motion-led product films, and a direct-order flow.
   - *Link Label:* [ Open Prototype → ]

### Playground
- **Tag:** // PLAYGROUND
- **Title:** Playground
- **Intro Line:** Work in progress. New systems land here first — rough, live, and evolving — and graduate to the Product Lab when they earn it.
- **Empty State:** Next system loading...

### Analytics & Quant
- **Tag:** // ANALYTICS_QUANT_SYSTEMS
- **Title:** Analytics & Quant

1. **Lending Club Classifier** — // CREDIT RISK MODEL — Default prediction on Lending Club loans: feature engineering, WoE, model validation. — [ View on GitHub → ]
2. **Bank Churn Neural Network** — // CUSTOMER CHURN — Neural network estimating customer attrition risk from account-level signals. — [ View on GitHub → ]
3. **Twitter Sentiment Pipeline** — // NLP PIPELINE — End-to-end text classification: preprocessing, vectorization, training, evaluation. — [ View on GitHub → ]
4. **CartPole RL Comparison** — // REINFORCEMENT LEARNING — Policy learning comparison study on CartPole. — [ View on GitHub → ]
5. **Antidiabetic Forecast** — // TIME-SERIES FORECASTING — SARIMA demand forecasting on pharmaceutical sales with rolling validation. — [ View on GitHub → ]
6. **NIFTY 100 Portfolio Optimizer** — // PORTFOLIO OPTIMIZATION — Efficient frontier, Sharpe ratio, and risk-return tradeoffs on NIFTY 100. — [ View on GitHub → ]

---

## 7. Story / Evolution Timeline (`components/EvolutionTimeline.tsx`)
- **Tag:** // HOW IT CONNECTS
- **Intro Brief:** One pattern runs through my career: take dense, ambiguous logic and turn it into software systems that work. Engineering and finance first, then institutional fintech, then independent analytics, and now full-stack product systems.

**Milestones:**

- **05 // The Deep Build**
  - *Timeline:* [May 2026 — Present]
  - *Title:* Product Systems & AI Foundations
  - *Description:* Going deeper on AI foundations, RAG, and evals while improving the Product Lab prototypes. Studying how systems fail and how to make them reliable.
  - *Metrics:* System Stability, Evaluation Evals, Build Logs

- **04 // The Prototyping Sprint**
  - *Timeline:* [Feb 2026 — May 2026]
  - *Title:* Functional Prototyping & AI Integration
  - *Description:* An intensive sprint building and launching functional prototypes: Parents Health OS, Quant OS, Curiosity OS, and JARVIZ Live.
  - *Metrics:* Three Live Systems, Dynamic Interfaces, Prompt Orchestration

- **03 // Analytics & Quant Rigor**
  - *Timeline:* [2022 — Jan 2026]
  - *Title:* Applied Analytics & Quantitative Rigor
  - *Description:* Independent analytics work — data pipelines, Python automation, and portfolio models — alongside the Executive Deep Learning programme at IISc Bangalore (92%) and 8 quantitative projects.
  - *Metrics:* 8 Data Projects, IISc Deep Learning, Model Validation

- **02 // Institutional Product & Workflows**
  - *Timeline:* [2021 — 2022]
  - *Title:* Product Owner & Workflow Architect
  - *Description:* At Lentra AI, mapped B2B loan origination workflows and PRDs across 12+ bank integrations. At Jana Small Finance Bank, built credit scoring models and automated reporting that cut turnaround by 30%.
  - *Metrics:* 12 Bank Integrations, UAT/API Specs, Credit Scorecards

- **01 // The Foundation**
  - *Timeline:* [2017 — 2021]
  - *Title:* Mechanical Engineering & Finance Foundations
  - *Description:* B.Tech in Mechanical Engineering (GRIET Hyderabad), followed by PGDM in Banking & Finance at NIBM Pune (an RBI institution). Bridging mechanical systems thinking with institutional finance.
  - *Metrics:* Systems Thinking, Banking Operations, Financial Risk

---

## 8. Connect (`components/ConnectPage.tsx`)
- **Tag:** // COLLABORATION
- **Title:** COLLABORATION
- **Content:* I build systems that bridge complex logic and human-centered design — taking dense workflows, data pipelines, and quantitative logic and turning them into clean, functional products. If this approach matches what you are building, let's connect.

- **Tag:** // DIRECT_LINKS
  - **Email:** tharun.gajula.2@gmail.com
  - **LinkedIn:** linkedin.com/in/tharungajula
  - **GitHub:** github.com/tharungajula2
  - **Copy Button:** [ COPY ]

- **Status Indicator:** Based in Bengaluru · Available immediately

---

## 9. AI Chat Panel (`components/ui/AIChatPanel.tsx`)
- **Top Bar Status Tag:** // ASK_AI
- **Welcome / Empty State Block:**
  - **Context Tag:** // PORTFOLIO_INTELLIGENCE
  - **Title:** Ask me anything about Tharun
  - **Description:** I know about his projects, skills, experience, and what he's looking for.
  - **Suggestion Chips:**
    1. *What functional prototypes has he built?*
    2. *Tell me about his Product Owner background*
    3. *What domains does he specialize in?*
    4. *What's his systems tech stack?*
- **Message Limit Banner:**
  - *Trigger:* Shows after 2 user messages.
  - *Copy:* Enjoyed the conversation? Let's continue over email → (email link is mailto:tharun.gajula.2@gmail.com)
- **Input Field Placeholder:** Ask about Tharun's work...
- **Send CTA Label:** SEND

---

## 10. Build Log (`data/buildlog.ts`)
1. **Day 1 (2026-04-15)** — Architected single-page OS interface: 3D Spline container, dynamic 2D neural graph, interactive timeline. *Learned:* A unified activeTab controller prevents layout shifts across high-fidelity views. *Tags:* Next.js 16, Spline 3D, Architecture
2. **Day 2 (2026-04-18)** — Engineered responsive 2D physics-based capability graph. *Learned:* Force graphs need precise charge and link tuning to stay readable. *Tags:* D3 Force, Data Viz, UI/UX
3. **Day 3 (2026-04-28)** — Replaced dynamic markdown parsing with a static, type-safe data layer. *Learned:* Decoupling markdown from client renders dramatically improves LCP. *Tags:* TypeScript, Performance, Clean Architecture
4. **Day 4 (2026-05-01)** — Integrated Gemini REST API stream on Edge Runtime for chat. *Learned:* SSE on Vercel Edge bypasses serverless timeouts. *Tags:* Gemini API, Edge Runtime, Streaming
5. **Day 5 (2026-05-02)** — Refined positioning, streamlined layouts, established type-safe daily logs. *Learned:* Labels must pass a rapid visual test — less ambiguity, more interaction. *Tags:* UX, Product Design, Polish

---

## 11. AI System Context (`lib/ai-context.ts`)
The server endpoint `/api/chat` utilizes the system context string `THARUN_CONTEXT` to govern the persona and grounding rules for the Gemini model:
- **Persona:** AI Explorer assistant on Tharun Gajula's portfolio website. Answers questions in first person as if it is Tharun's portfolio — confident, precise, and professional.
- **Core Grounding Rules:**
  1. Only answer based on the provided professional facts.
  2. For out-of-bounds questions, fallback response: *"That's not something covered in my portfolio, but feel free to email Tharun directly at tharun.gajula.2@gmail.com"*
  3. Keep answers concise: 2-4 sentences for simple questions, up to a paragraph for complex ones.
  4. Never hallucinate or invent information.
  5. If asked what role Tharun is targeting or what job he is looking for, do NOT mention any job title explicitly (do NOT use terms like "Product Manager", "PM", or "AI PM"). Talk instead about his capacity to own and ship systems that bridge complex business logic and intuitive interfaces.
