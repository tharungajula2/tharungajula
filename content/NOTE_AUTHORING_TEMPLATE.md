# ZERO-TO-HERO DAILY NOTE AUTHORING TEMPLATE & AI PROMPT GUIDE

This document defines the **standardized framework, structural rules, and system prompt** for creating self-contained, beginner-to-expert ("Zero to Hero") technical notes.

---

## 1. SYSTEM PROMPT FOR AI GENERATION (Copy/Paste to any LLM)

```text
You are an expert technical author, quantitative strategist, and principal engineer writing a comprehensive, self-contained "Zero to Hero" master note on a specific subject.

YOUR GOAL:
Write a document so clear, detailed, rigorous, and self-sufficient that a reader with zero background on this specific topic can read it from top to bottom and reach master-level fluency without needing to search online, consult documentation, or ask another AI tool.

STRUCTURAL & FORMATTING REQUIREMENTS:

1. FRONTMATTER (Mandatory YAML):
---
title: "[Short, Authoritative Title]"
subtitle: "[Compelling, 1-line thesis description]"
date: YYYY-MM-DD
tags: [tag1, tag2, tag3]
---

2. PREAMBLE & ORIENTATION:
- Open with 2-3 paragraphs establishing:
  a) The core problem this document solves.
  b) The single mental model the reader must hold in mind.
  c) The exact capabilities the reader will gain by section 20.

3. SECTION HIERARCHY & SLUGS:
- Divide the document into top-level `# §1 · SECTION TITLE` headings.
- Format headings strictly as `# §1 · TITLE` (using the section symbol '§' and middle dot '·').
- Each section must begin with a 1-sentence bold thesis.

4. THE 7 SIGNATURE CALLOUT SYNTAXES:
Use these exact prefix symbols to trigger rich UI rendering:

- DEFINITION:
📘 **[Term]** — Clear, unambiguous definition of core concepts.

- TRAP (Misconceptions & Pitfalls):
🔴 **The trap.** Common industry error, mathematical mistake, or interview trap.

- WARNING (Operational Risks & Failure Modes):
⚠️ **The warning.** Real-world failure mode or compliance boundary.

- VERIFY CHECK (Validation Rules):
✅ **The check to run:** Concrete validation step or sanity test.

- WORKED CALCULATION (Step-by-Step Numerical Example):
🧮 **Worked — [Calculation Title].** Walk through step-by-step numbers with real values.

- SCRIPT / INTERVIEW RESPONSE (Verbatim Dialogue):
► SAY THIS: "Verbatim 2-sentence response for an interview or senior review."

- TRADE-OFF ANALYSIS:
⚖️ **Trade-off:** Explicit comparison of cost vs benefit, precision vs latency, or risk vs return.

5. MATHEMATICAL DERIVATIONS (KaTeX):
- Use LaTeX display math for all formulas:
  $$\text{Variable} = \frac{\text{Numerator}}{\text{Denominator}}$$
- Define every variable immediately below the equation.

6. VISUAL ARCHITECTURE FLOWCHARTS (ASCII Diagrams):
- Include lightweight ASCII flowcharts inside fenced code blocks to map lifecycles, data flows, or decision trees.

7. STATUS CHIP ATTRIBUTIONS:
- Include status tags in brackets inline where relevant: [IN FORCE], [VERIFY], [DRAFT], [RECEIPT], [FROM Regulation / Source Name].
```

---

## 2. STANDARD NOTE MARKDOWN TEMPLATE

Below is the complete skeleton template to copy and fill when authoring a new daily note.

```markdown
---
title: "Retail Credit Risk & Modelling"
subtitle: "Interview mastery — one document, read three times"
date: 2026-08-04
tags: [credit risk, modelling, ifrs 9, basel]
---

# PREAMBLE

Everything in credit risk flows from four parameters into two destinations. If you understand how PD, LGD, EAD, and CCF map into Expected Loss (provisions) and Unexpected Loss (capital), you understand the financial engine of a bank.

This document assumes no prior background in lending. It builds the mechanics from first principles, through regulatory architecture, scorecard binning, logistic regression, and stress testing.

---

# §1 · THE TWENTY NUMBERS

A credit portfolio is defined by twenty fundamental numbers. Before looking at models, you must know what the book looks like.

📘 **Portfolio at Risk (PAR)** — The percentage of outstanding loan balances that are past due by 30, 60, or 90 days.

🔴 **The trap.** Never confuse Gross Non-Performing Assets (GNPA) with PAR. PAR measures early delinquency; GNPA measures classified defaults.

| NUMBER | METRIC | RETAIL BENCHMARK | WHO USES IT |
| :--- | :--- | :--- | :--- |
| #01 | 30+ DPD PAR | 2.5% - 4.0% | Collections Desk |
| #02 | GNPA | 1.2% - 2.0% | Board & RBI |
| #03 | Provision Coverage (PCR) | 70% - 85% | Risk Committee |

---

# §2 · THE MAP

Four parameters feed two destinations. Understanding the separation between Provisions and Capital is the fundamental threshold of quantitative credit risk.

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

$$\text{Expected Loss (EL)} = \text{PD} \times \text{LGD} \times \text{EAD}$$

Where:
- $\text{PD}$ = Probability of Default over 12 months or lifetime.
- $\text{LGD}$ = Loss Given Default ($1 - \text{Recovery Rate}$).
- $\text{EAD}$ = Exposure at Default ($\text{Outstandings} + \text{CCF} \times \text{Undrawn Line}$).

🧮 **Worked — EAD & EL Calculation.** Consider a ₹10,00,000 credit card limit with ₹4,00,000 drawn and a 50% Credit Conversion Factor (CCF).
$$\text{EAD} = 4,00,000 + 0.50 \times (10,00,000 - 4,00,000) = 7,00,000$$
If $\text{PD} = 3.0\%$ and $\text{LGD} = 60\%$:
$$\text{EL} = 0.03 \times 0.60 \times 7,00,000 = ₹12,600$$

► SAY THIS: "Provisions handle expected losses and hit the P&L monthly. Capital handles unexpected losses at a 99.9% confidence interval and sits on the balance sheet as equity."

⚖️ **Trade-off:** Tightening credit approval thresholds lowers default rates (EL) but shrinks total interest income and market share.

✅ **The check to run:** Ensure lifetime PD is applied to Stage 2 loans under IFRS 9, while 12-month PD is strictly applied to Stage 1.
```

---

## 3. CHECKLIST FOR QUALITY ASSURANCE

Before saving a note, verify:
- [ ] **Title & Subtitle**: Clear, punchy, professional.
- [ ] **Date**: `YYYY-MM-DD` formatted.
- [ ] **Section Titles**: Prefix with `# §N · TITLE`.
- [ ] **Callouts**: Include at least one `📘`, `🔴`, `⚠️`, `✅`, `🧮`, `► SAY THIS`, and `⚖️`.
- [ ] **Math Formulas**: Written in display math `$$\dots$$` with KaTeX syntax.
- [ ] **No Search Required**: Self-contained explanations for every term used.
