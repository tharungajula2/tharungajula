# THE NOTE SYSTEM v2.0 — MASTER AUTHORING TEMPLATE & AI PROMPT GUIDE

This document is the **master authoring template and AI prompt guide** for creating permanent, evergreen "Zero to Mastery" technical notes, built directly on **The Note System v2.0**.

---

## 1. THE GOVERNING PRINCIPLES

### Principle 1 — Prose Carries the Argument, Structure Carries the Artefacts
- **Prose**: Claims, reasons, intuitions, and connections.
- **Devices**: Facts to memorise, steps to reproduce, errors to avoid, and checks to run.
- **The Delete-the-Callouts Test**: If deleting all callout boxes breaks comprehension of the argument, the prose has failed. Rewrite the prose.

### Principle 2 — The Separation Principle (The Note Outlives the Reason)
- **The note is about its subject and nothing else.** The reason you wrote the note (interviews, hiring, recruiters, compensation, prep, urgency, or presenting advice) **never enters the note**.
- **What is Banned**:
  - Interviews, candidates, hiring, recruiters, offers, salary, compensation.
  - Urgency terms: *tonight*, *tomorrow*, *before the call*, *this week*.
  - Second-person situational framing: *you'll be asked this*, *when you're in the room*, *this is where you win*.
- **The Stranger Test**: Would this sentence make sense to a stranger reading the note in 3 years with zero idea why it was written?
- **The Subject Test**: Is this sentence about the *subject*, or about a person's *relationship* to the subject? Only the first belongs.

---

## 2. THE EIGHT RULES

1. **Rule 1 (The Teacher)**: Every term is defined in the sentence it first appears.
2. **Rule 2 (The Editor)**: Callouts have a budget (~1 per 400 words, max 3 types per section).
3. **Rule 3 (The Cognitive Scientist)**: Numbers first, self-test last, every formula reproduced by hand.
4. **Rule 4 (The Consultant)**: Every section opens with a 1-sentence bold thesis and closes with "**You can now:**".
5. **Rule 5 (The Mobile Designer)**: No table wider than 3 columns. No paragraph longer than 4 sentences. No prose run longer than ~250 words without a device or heading.
6. **Rule 6 (The Practitioner)**: Every formula gets a worked calculation with real numbers and a sanity check.
7. **Rule 7 (The Examiner)**: Every section generates at least one self-test entry.
8. **Rule 8 (The Archivist)**: Subject-only, permanent, evergreen. Prep details live in disposable prep packs that link *to* the note; the note never knows the prep pack exists.

---

## 3. SYSTEM PROMPT FOR AI GENERATION (Copy/Paste to any LLM)

```text
You are writing a self-contained "zero to mastery" note on a single subject.
It will be published to a public notes library and re-read many times over years.

THE STANDARD
A reader who knows nothing about this subject must be able to read the document
top to bottom and reach working fluency without opening a search engine, another
AI tool, or any other source. Every term, symbol and acronym is explained inside
the document, in the sentence where it first appears.

PRINCIPLE 1 — PROSE CARRIES THE ARGUMENT, STRUCTURE CARRIES THE ARTEFACTS
Claims, reasons, intuitions and connections go in flowing prose.
Facts to memorise, steps to reproduce, errors to avoid and checks to run go in
callout devices or tables.
Test: if every callout were deleted, the prose alone must still teach the
subject. If it wouldn't, rewrite the prose.

PRINCIPLE 2 — THE NOTE IS ABOUT THE SUBJECT AND NOTHING ELSE
The reason the note is being written NEVER appears inside it. Write as if it
will be read by any stranger, at any time, for any purpose.

  NEVER mention or allude to: interviews, interviewers, candidates, hiring,
  recruiters, offers, salaries or compensation; any named person, employer or
  role; the writer's career, projects, gaps or circumstances; time-bound urgency
  ("tonight", "before the call", "this week"); situational second person
  ("you'll be asked this", "when you're in the room", "this is where you win");
  or advice on how to PRESENT knowledge rather than what the knowledge IS.

  If context is supplied to you explaining why the note is needed, use it ONLY to
  choose the subject and set the depth. Never let it surface in the text.

  Most situationally-framed sentences contain a real insight wearing the wrong
  clothes. Do not delete the insight — restate it as a property of the subject.
    Instead of: "this is commonly fumbled in interviews"
    Write:      "this test is inverted relative to most statistics: a HIGH
                 p-value is the pass"
  Two tests for marginal cases:
    The stranger test — would this make sense to someone reading in three years
      with no idea why it was written?
    The subject test — is this sentence about the subject, or about a person's
      relationship to the subject? Only the first belongs.

THE THREE PASSES
The document is read three times and must support all three:
  Pass 1 — understand: prose only, devices skipped.
  Pass 2 — verify: reproduce every worked calculation by hand.
  Pass 3 — recall: numbers, traps, formulas, self-test only.
Open with a reading protocol table stating these passes and a time budget each.

REQUIRED SPINE (in this order)
  YAML frontmatter (fields below)
  Title, subtitle
  The spine sentence — ONE blockquote stating the single idea that organises
    everything below. Write it first. If you cannot, you do not yet understand
    the subject well enough to write the note.
  "How to read this" — the three-pass table
  §1 · THE NUMBERS — 15-25 rows, 3 columns, FRONT-LOADED.
  §2 · THE MAP (system) / THE MODEL (business) / THE MOVE (skill) — one ASCII
    diagram of the whole subject before any detail, plus the two or three most
    important structural facts.
  §3..§N · THE BUILD — the teaching, in DEPENDENCY order, never textbook order.
    Nothing may depend on anything not yet explained.
  §N+1 · THE TRAPS — two columns: what people believe | what is true.
  §N+2 · THE QUESTIONS — self-test, answers right column, tiered as
    "must be instant" / "should be solid" / "judgement".
  §N+3 · FORMULA SHEET — every formula, no explanation.
  §N+4 · GLOSSARY — every term used.
  §N+5 · THE COMPRESSION — the shortest true statement of the subject.

SECTION FORMAT
  Headings: `# §N · TITLE` (section symbol, middle dot, caps).
  Every section opens with a one-sentence bold thesis.
  Every section closes with "**You can now:**" and two or three capabilities.
  Every section must generate at least one self-test entry. If it generates
  none, it is background reading — cut it.

THE SEVEN DEVICES
  📘 DEFINE — a term needing a full paragraph. Simple terms go inline in prose.
  🧮 WORKED — step table, real numbers, reproducible by hand, answer bolded.
  🔍 WHY THIS IS TRUE — the counterintuitive thing explained. Use wherever the
     subject surprises; these are the highest-value paragraphs in the note.
  🔴 TRAP — the wrong belief first, then the correction.
  ✅ CHECK — a concrete test with a pass condition, not advice.
  ⚖️ TRADE-OFF — the explicit cost of a choice.
  ► IN ONE LINE — the compressed statement. This is the compression of an IDEA,
     not a line to say to a person. Write it as a true sentence about the
     subject, never as dialogue or as advice on what to tell someone.

CALLOUT BUDGET — enforce strictly
  ~One per 400 words. At most three types per section. A section with none is
  fine. A section with seven means the prose stopped working. Never insert a
  device to satisfy a checklist.

FORMAT (this is read on a phone)
  No table wider than three columns.
  No paragraph longer than four sentences.
  No unbroken prose longer than ~250 words without a heading, table, device or
  diagram.
  Display math in $$...$$, every variable defined immediately below.
  ASCII diagrams in fenced code blocks.

VOICE
  Second person, direct, warm but unsentimental — but second person about the
  SUBJECT ("you compute R first"), never about a situation ("you'll be asked").
  Short declarative sentences. No hedging, no filler, no "it is important to
  note", no "in today's landscape".
  Explain counterintuitive things at length and obvious things briefly — the
  reverse of what most technical writing does.
  Where something is a rule of thumb rather than a fact, say so and give the range.
  Where the honest answer is "the record is thin", write that sentence.

FRONTMATTER
---
title: ""
subtitle: ""
spine: ""
date: YYYY-MM-DD
slug: ""
archetype: system | business | skill
tags: []
readingTime: 
passes: [n, n, n]
prerequisites: []
series: ""
seriesOrder: 
status: draft | published
---

BEFORE YOU FINISH — two sweeps
  1. Read as a total beginner. Find the first sentence assuming something not
     yet explained. Fix it. Repeat until none remain.
  2. Search the draft for: interview, candidate, hiring, recruiter, salary,
     tonight, in the room, you'll be asked, this is where you win. Every hit is
     either cut or translated into a statement about the subject.
```

---

## 4. STANDARD NOTE SKELETON TEMPLATE

```markdown
---
title: "Retail Credit Risk & Modelling"
subtitle: "Four parameters, two destinations — provisions and capital"
spine: "Every number in credit risk answers one of two questions: what do we expect to lose, or what if it's far worse than we expect?"
date: 2026-08-04
slug: retail-credit-risk-and-modelling
archetype: system
tags: [credit-risk, basel, ifrs-9, modelling]
readingTime: 55
passes: [50, 60, 30]
prerequisites: []
series: "Credit Lifecycle"
seriesOrder: 1
status: published
---

# RETAIL CREDIT RISK & MODELLING
### Four parameters, two destinations — provisions and capital

> **Every number in credit risk answers one of two questions: what do we expect to lose, or what if it's far worse than we expect?**

## HOW TO READ THIS

| Pass | Time | What you do |
|:--|:--|:--|
| **1 — Understand** | 50 min | Straight through. Skip the boxes. Build the map. |
| **2 — Verify** | 60 min | Again, with a pen. Do every 🧮 by hand. |
| **3 — Recall** | 30 min | §1, the traps, the formulas, the questions. Cover the answers. |

---

# §1 · THE NUMBERS

**A credit portfolio is defined by twenty fundamental numbers that establish baseline risk before any model is fit.**

| # | Fact | Value |
|:--|:--|:--|
| 1 | 30+ DPD PAR Benchmark | 2.5% - 4.0% |
| 2 | GNPA Benchmark | 1.2% - 2.0% |
| 3 | Provision Coverage Ratio (PCR) | 70% - 85% |

**You can now:**
- State the 30+ PAR and GNPA benchmark ranges for unsecured retail portfolios.
- Evaluate whether a bank's PCR is conservative or aggressive relative to defaults.

---

# §2 · THE MAP

**Four risk parameters feed two distinct destinations: provisions for expected loss, and capital for unexpected loss.**

```text
               THE FOUR PARAMETERS
      -------------------------------------
      PD   ·   LGD   ·   EAD   ·   CCF
                      |
        +-------------+-------------+
        |                           |
  EXPECTED LOSS              UNEXPECTED LOSS
  EL = PD · LGD · EAD        Volatility around EL
        |                           |
    [PROVISION]                 [CAPITAL]
        |                           |
  IFRS 9 / Ind AS 109         Basel III IRB Formula
```

**The single most important structural fact:** Provisions hit the monthly P&L under IFRS 9 as expected loss, whereas Capital is calculated under Basel III at a 99.9% confidence interval to protect equity against catastrophic downturns.

**You can now:**
- Trace how PD, LGD, EAD, and CCF combine to calculate Expected Loss.
- Distinguish between IFRS 9 ECL provisions and Basel III IRB capital requirements.

---

# §3 · THE EXPECTED LOSS MECHANICS

**Expected Loss is the product of Probability of Default, Loss Given Default, and Exposure at Default.**

Provisions absorb the losses a bank expects to incur in the ordinary course of business.

$$\text{Expected Loss (EL)} = \text{PD} \times \text{LGD} \times \text{EAD}$$

Where:
- $\text{PD}$ = Probability of Default over a 12-month horizon (Stage 1) or lifetime (Stage 2).
- $\text{LGD}$ = Loss Given Default ($1 - \text{Recovery Rate}$).
- $\text{EAD}$ = Exposure at Default ($\text{Outstandings} + \text{CCF} \times \text{Undrawn Line}$).

📘 **Credit Conversion Factor (CCF)** — The proportion of an undrawn credit limit expected to be drawn down by a borrower prior to default.

🔍 **Why this is true.** Revolving borrowers in distress draw down maximum available credit lines right before defaulting, which makes EAD significantly higher than current drawn balance.

🧮 **Worked — EAD & EL Calculation.**

| Step | Computation | Result |
|:--|:--|--:|
| 1 | $\text{Drawn Balance} + \text{CCF} \times \text{Undrawn}$ ($4,00,000 + 0.50 \times 6,00,000$) | ₹7,00,000 |
| 2 | $\text{EL} = 0.03 \times 0.60 \times 7,00,000$ | **₹12,600** |

✅ **The check:** Ensure lifetime PD is applied to Stage 2 loans experiencing Significant Increase in Credit Risk (SICR), while 12-month PD is applied to Stage 1.

⚖️ **Trade-off:** Tightening approval cutoffs reduces expected default loss but sacrifices interest revenue and market share.

► **In one line:** Provisions cover expected monthly losses via P&L, while capital protects equity against extreme 99.9% tail-risk events.

**You can now:**
- Calculate EAD for revolving limits given drawn balance and CCF.
- Compute 12-month Expected Loss provisions from PD, LGD, and EAD.

---

# §N+1 · THE TRAPS

| What people believe | What is true |
|:--|:--|
| GNPA and PAR measure the same delinquency stage. | PAR measures early delinquency (30/60 DPD); GNPA measures classified defaults (90+ DPD). |
| High p-value in Hosmer-Lemeshow indicates poor calibration. | This test is inverted relative to most statistics: a **high** p-value indicates good calibration. |

---

# §N+2 · THE QUESTIONS

*Cover the right column. Answer out loud. Then check.*

**Must be instant**

| Q | A |
|:--|:--|
| What is the formula for Expected Loss? | $\text{EL} = \text{PD} \times \text{LGD} \times \text{EAD}$ |
| Which accounting standard governs ECL provisions in India? | Ind AS 109 (aligned with IFRS 9). |

**Should be solid**

| Q | A |
|:--|:--|
| Why does EAD for revolving cards exceed current balance? | Distressed borrowers draw down remaining limits before default; CCF accounts for this draw down. |

**Judgement**

| Q | A |
|:--|:--|
| Why does Retail IRB have no maturity adjustment whereas Corporate IRB does? | Retail exposures are granular and pool-managed; corporate long-dated exposures can suffer credit rating migration prior to default. |

---

# §N+3 · FORMULA SHEET

$$\text{EL} = \text{PD} \times \text{LGD} \times \text{EAD}$$
$$\text{EAD} = \text{Drawn} + \text{CCF} \times \text{Undrawn}$$
$$\text{WoE}_i = \ln\left(\frac{\% \text{Goods}_i}{\% \text{Bads}_i}\right)$$

---

# §N+4 · GLOSSARY

📘 **PD (Probability of Default)** — Likelihood that a borrower defaults over a specified horizon.
📘 **LGD (Loss Given Default)** — Percentage of exposure lost after all recoveries are netted out.
📘 **EAD (Exposure at Default)** — Total gross dollar exposure expected at the time of default.

---

# §N+5 · THE COMPRESSION

Credit risk management is the discipline of accurately pricing and provisioning for expected losses while maintaining sufficient capital to survive 99.9th percentile economic downturns.
```

---

## 5. THE 10-POINT QA GATE

Before publishing any note, run this 10-point checklist:

1. **Spine Sentence**: Exists in blockquote, organizing the entire document.
2. **Delete-the-Callouts Test**: Prose alone teaches the subject.
3. **Forward-Only Test**: Every term defined in the sentence it first appears.
4. **Reproduce Test**: Every worked calculation is reproducible by hand from the document alone.
5. **Callout Budget**: ~1 per 400 words, max 3 types per section.
6. **Section Format**: Every section has a bold thesis and "**You can now:**".
7. **Self-Test Contribution**: Every section generates at least 1 entry in §N+2.
8. **Phone Test**: No table > 3 columns, no paragraph > 4 sentences, no prose run > 250 words.
9. **Honesty Pass**: Uncertainty stated, rules of thumb explicitly labeled.
10. **Stranger Test**: Zero hits for banned situational terms (`interview`, `candidate`, `hiring`, `tonight`, `in the room`, `where you win`). Written permanently for the subject alone.
