---
title: "NOTE 006: THE AI ENGINEERING TEXTBOOK — VOLUME 6"
subtitle: "Governance, Product and the Enterprise Blueprint"
date: "2026-08-09"
order: 6
tags: ["AI Engineering", "Governance", "Enterprise", "Compliance", "Architecture"]
---

# THE AI ENGINEERING TEXTBOOK
## Volume 6 — Governance, Product and the Enterprise Blueprint

---

## BEFORE YOU START

This volume assumes Volumes 1–5. It is the one that turns a system that works into a system that ships inside a regulated institution.

Layer markers as before. One additional note: **the regulatory content in Part 4 is the most perishable material in this entire textbook.** The mechanisms in Volumes 1–5 will hold for years. Regulatory positions move in months. Section 9.6 gives the re-verification schedule.

---

# PART 1 — WHY GOVERNANCE IS AN ENGINEERING CONCERN

## 1.1 — The Three Questions **[CORE]**

**What this section gives you.** The framing that converts "compliance" from a blocker into a design specification.

In a bank, an AI system is not finished when it works. It is finished when three parties can each get a satisfactory answer.

```
THE CUSTOMER asks:      "Why was this decision made about me?"
THE SUPERVISOR asks:    "Who is accountable, and what controls exist?"
THE AUDITOR asks:       "Can you prove it, for a decision made
                         seven months ago?"
```

Each maps to something you build, not something you write in a policy document afterwards:

| Question | What it requires | Where it was built |
| :--- | :--- | :--- |
| Why this decision? | Explainability, reason codes, provenance | §2, and V3's citation architecture |
| Who is accountable? | Named ownership, human oversight design, delegated authority | §3, and V4 §7 |
| Can you prove it? | Traces, model inventory, change control, evidence pack | §4.4, and V5 §5 |

**Engineers who can hold this conversation are rare and disproportionately valuable**, because the gap between a working demo and an approved production system in a bank is almost entirely made of these three answers.

### The observation that reframes the whole discussion

You already know how to do this. A credit scorecard in a bank has: documented development, independent validation, a model inventory entry, monitoring for drift, an override log, a periodic review cycle, and a named owner.

**AI systems need the same apparatus.** What changes is that four of the assumptions underlying that apparatus no longer hold (§3.1), and your job is to explain how each one is restored.

---

## 1.2 — Risk Tiering **[CORE]**

Not every AI system needs the same controls. Proportionality is the organising principle of every serious AI framework, and it is what makes governance affordable.

```
TIER 3 — LOW RISK
   Internal productivity: drafting, summarising, search, meeting notes
   No customer impact · no decision influence · no personal data
   → Acceptable-use policy, basic logging, cost caps

TIER 2 — MEDIUM RISK
   Analyst support: policy assistants, document extraction,
   research, exception summarisation
   Influences human work · human decides · internal data
   → Evaluation suite, guardrails, full tracing, named owner,
     annual review

TIER 1 — HIGH RISK
   Influences a decision about a person: creditworthiness assessment,
   collections prioritisation, fraud disposition, pricing
   → Everything above, PLUS: independent validation, model inventory
     entry, fairness testing, explainability design, documented human
     oversight, incident procedure, board-level visibility

TIER 0 — PROHIBITED OR REQUIRING SPECIAL APPROVAL
   Fully autonomous decisions about people with no human in the loop
   → In most institutions, and under most emerging regulation,
     this is not a thing you build
```

**Classify at project inception, in writing, with the business owner's signature.** Most disputes about AI governance are actually disputes about tiering that were never resolved, and they surface at the worst moment — two weeks before launch.

---

# PART 2 — THE ARCHITECTURE THAT GETS APPROVED

## 2.1 — The Decision Layer and the Language Layer **[CORE]**

**What this section gives you.** The single most important architectural argument in this textbook. It is what makes AI deployable in lending at all.

### The problem, stated plainly

If a model contributes to declining someone's loan application, that person is entitled to reasons. In India this comes through the Fair Practices Code; in the EU it comes through the AI Act's transparency and high-risk provisions; in the US it comes through adverse action notice requirements. The specifics differ; the principle does not.

**"The language model said so" is not a reason.** You cannot decompose a transformer into coefficient contributions. There is no equivalent of "your application was declined primarily because of high credit utilisation, contributing 0.34 to your log-odds."

Every attempt to make a large language model directly explainable at the level a credit decision requires has failed, and the attempts are the wrong approach.

### The resolution

**Never let the language model make the decision.**

```
┌──────────────────────────────────────────────────────────────────┐
│  DECISION LAYER — deterministic, explainable, auditable           │
│                                                                   │
│    Scorecard / PD-LGD-EAD models · policy rules · limits ·        │
│    delegated authority · override register                        │
│                                                                   │
│    → produces THE DECISION and THE REASON CODES                   │
│      with per-feature contributions that decompose exactly        │
└─────────────────────────────┬────────────────────────────────────┘
                              │
                the decision + the reason codes
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│  LANGUAGE LAYER — the model                                       │
│                                                                   │
│    ▸ Explains the decision in plain language                      │
│    ▸ Drafts the memo, the letter, the committee note              │
│    ▸ Summarises the file · surfaces applicable policy             │
│    ▸ Retrieves precedent · flags missing documents                │
│    ▸ Answers the analyst's questions with citations               │
│                                                                   │
│    ★ NEVER CHANGES THE DECISION                                   │
└──────────────────────────────────────────────────────────────────┘
```

### Why this works

**Explainability is preserved because the decision never left the explainable model.** The scorecard produces reason codes with exact per-feature contributions. Those are the reasons. The language model's only job is to render them into a sentence a customer or an underwriter can understand.

**You get the productivity gain without the governance problem.** The forty minutes an underwriter spends assembling evidence and drafting a memo — that is where the value is, and none of it requires the model to decide anything.

**It maps onto controls that already exist.** Your model risk framework already knows how to validate a scorecard. Nothing about that changes. The language layer is validated as a *drafting and retrieval tool*, which is a much lighter and more tractable exercise.

### The sentence that gets the approval

> "The scorecard decides. The language model explains. Reason codes come from the deterministic model's feature contributions, and the language model's only role is turning them into plain English or Hindi. The decision path is unchanged and fully explainable."

**This is the argument that moves a model risk committee from "no" to "tell me more."** Have it ready before the first meeting, not after the first rejection.

---

## 2.2 — Where the Model May Legitimately Influence **[CORE]**

Do not over-apply §2.1 into paralysis. There are places where an LLM genuinely contributes to a decision, and they are permissible with controls.

| Use | Control that makes it acceptable |
| :--- | :--- |
| **Extracting income from bank statements** | Output is a structured figure that enters the scorecard as an ordinary input. Confidence score recorded. Below threshold → human verification. The extraction is auditable against the source document. |
| **Verifying document authenticity or completeness** | Produces a flag, not a decision. A flag routes to a human. |
| **Summarising an exception for a human decider** | The human decides. Summary quality measured by edit distance (V5 §3.2). |
| **Extracting adverse signals from unstructured sources** | Produces a candidate list with citations, verified by a human before it influences anything. |
| **Prioritising a collections queue** | Ordering, not outcome. No customer receives a different *decision* — only a different sequence. Still requires fairness testing (§2.4). |
| **Drafting the adverse action letter** | Renders reason codes the decision layer produced. Verified against those codes deterministically. |

**The common thread: in every case a human or a deterministic rule makes the final call, and the model's contribution is logged as an identified input with its confidence.**

```python
# The pattern. The model's output is an INPUT to the decision, recorded
# as such, never the decision itself.
decision_inputs = {
    "declared_income_inr":   480_000,        # from the application
    "bureau_score":          712,            # from the bureau
    "extracted_income_inr":  455_000,        # ← MODEL OUTPUT
    "extraction_confidence": 0.91,           # ← recorded
    "extraction_source":     "stmt_04412.pdf, pages 2-7",
    "extraction_model":      "<pinned-version>",
    "human_verified":        False,          # confidence above threshold
}

decision = scorecard.evaluate(decision_inputs)   # deterministic, explainable
```

**Every field in that dictionary is in the audit trail.** If the extraction was wrong, you can show exactly which document, which model version, what confidence, and whether a human checked it.

---

## 2.3 — Explainability and Adverse Action **[WORKING]**

The output that reaches a customer:

```
Application reference:  APP-2026-114827
Decision:               Declined

Principal reasons:
  1. Total existing obligations relative to assessed income exceed
     our policy threshold
  2. Length of credit history is below the minimum for this product
  3. A recent enquiry pattern indicates concurrent applications

  [ derived from reason codes HIGH_FOIR, THIN_FILE, RECENT_ENQUIRY,
    produced by the scorecard's feature contributions ]

You may request a review, and you may obtain a copy of your credit
report from the bureau.
```

The language model turned three codes into three sentences and translated them into the customer's language. **It did not decide, and it did not choose which reasons to give** — the codes came from the scorecard, ranked by contribution magnitude.

### The verification that must exist

```python
def verify_adverse_action_letter(letter: str, reason_codes: list[str]) -> bool:
    """The letter must reflect EXACTLY the reason codes the decision
    layer produced. No additions, no omissions, no reordering by
    the model."""
    rendered = extract_reasons(letter)
    return (
        len(rendered) == len(reason_codes)
        and all(matches_code(r, c) for r, c in zip(rendered, reason_codes))
        and no_additional_reasons(letter, reason_codes)
        and no_decision_language_beyond_the_decision(letter)
    )
```

A model that helpfully adds a fourth reason it inferred from the file has created a representation the bank did not make. Check deterministically.

---

## 2.4 — Fairness Testing **[CORE]**

**What this section gives you.** The test that must exist even when the model does not decide.

### Why it applies to the language layer too

The decision layer is tested for bias by your existing model risk process. But the language layer touches customers, and it can be unfair without deciding anything:

```
▸ Does the drafted explanation differ in tone, length, or helpfulness
  across names, genders, or locations?
▸ Does the Hindi version convey the same information as the English?
▸ Does the assistant give analysts more thorough policy answers for
  some customer segments than others?
▸ Does the collections prioritisation, which is only ordering,
  systematically move one group earlier?
```

### The test

```python
def paired_fairness_test(case: Case, model) -> dict:
    """Run the SAME case with only a protected characteristic varied.
    Everything substantive must be identical."""
    variants = generate_variants(case, vary=[
        "applicant_name",        # across communities and genders
        "applicant_gender",
        "location",              # metro / tier-2 / rural
        "language",              # English / Hindi
    ])

    outputs = {v.id: model.generate(v) for v in variants}

    return {
        "reasons_identical":     all_same(extract_reasons(o) for o in outputs.values()),
        "length_variance":       variance(len(o) for o in outputs.values()),
        "sentiment_variance":    variance(sentiment(o) for o in outputs.values()),
        "helpfulness_variance":  variance(judge_helpfulness(o) for o in outputs.values()),
        "info_parity_across_lang": semantic_equivalence(outputs["en"], outputs["hi"]),
    }
```

**`reasons_identical` must be true.** The others should show variance indistinguishable from noise, and you establish what noise looks like by running the same variant repeatedly.

### The legal basis point

A practical obstacle has historically been that testing for bias across protected characteristics requires processing data about those characteristics — which data protection rules restrict.

**The EU's 2026 Digital Omnibus amendment addressed this**, extending the lawful basis for processing special-category personal data **specifically for bias detection and correction** from high-risk providers to all AI systems and general-purpose models, subject to a strict necessity standard.

If sensitive-data constraints have been blocking your fairness testing, that is the provision to raise with your data protection officer.

---

# PART 3 — MODEL RISK MANAGEMENT

## 3.1 — The Four Broken Assumptions **[CORE]**

**What this section gives you.** The exact conversation you will have with model validation, and the answer to each objection.

Your bank's model risk framework was built for statistical models. Four of its assumptions do not hold for language models. Naming them and offering the restoration is what gets you through validation.

| Traditional assumption | Why it breaks | How you restore it |
| :--- | :--- | :--- |
| **The model is deterministic** — same input, same output | Sampling is stochastic, and even at temperature 0, GPU floating-point non-determinism can flip near-ties (V1 §7.1) | Temperature 0 for anything decisioning-adjacent. **The evidence is the stored trace, not reproducibility.** Log the exact prompt and exact response; that is the artefact. |
| **Inputs are structured and enumerable** — you can characterise the input distribution | Inputs are free text; the space is unbounded | An input taxonomy, guardrails that constrain the accepted space, and an evaluation set that covers the actual observed distribution by slice (V5 §3.4) |
| **The model can be decomposed** — coefficients, contributions, sensitivity | Billions of parameters, no coefficient table | **Explain the system, not the weights.** Retrieval provenance, prompt version, decision rules, human override points. And §2.1: the decisioning model *is* decomposable, because it is not the language model. |
| **The model is stable until you retrain it** | The vendor updates and deprecates on their own schedule | **Pin the version** (V2 §9.2). Treat any version change as a model change: full revalidation, documented, approved. Where the contract permits, negotiate version stability. |

**The third row is where the argument is won.** A validator hearing "we cannot decompose the model" reasonably objects. A validator hearing "the decisioning model is a logistic scorecard whose contributions decompose exactly, and the language model is a drafting tool validated as such" has a framework they already understand.

---

## 3.2 — The Model Inventory Entry **[WORKING]**

```
IDENTIFICATION
  Model ID · business owner · technical owner · risk tier
  Approval date · next review date · approving committee

WHAT IT IS
  Model + VERSION, PINNED · provider · hosting region
  Data processing agreement reference · sub-processors
  Prompt version (git SHA) · retrieval corpus version
  Embedding model version · guardrail ruleset version
  Adapter version, if fine-tuned

WHAT IT IS FOR
  Intended use, stated precisely
  ★ DOCUMENTED OUT-OF-SCOPE USES — what it must not be used for
  Position in the decision process (§2.1): decision layer or
  language layer

PERFORMANCE
  Evaluation suite results, BY SLICE, with dates
  Comparison against the human baseline
  Known limitations: failure modes, languages, edge cases
  Fairness test results

HUMAN OVERSIGHT
  Where the gates are · who staffs them · what training they received
  ★ OVERRIDE RATE — how often humans disagree with the system
    (a rate near zero suggests the gate is theatre; a very high rate
     suggests the system is not useful)

MONITORING
  Live metrics and thresholds · alert routing
  Drift detection method · kill switch location, and when it was
  last tested

VALIDATION
  Independent challenge report · red team report · security review
  Sign-offs: business, model validation, risk, legal, data protection

CONTINUITY
  What happens when the provider is unavailable
  Degraded mode definition (V2 §9.3)
  Exit plan and data portability
```

### The override rate deserves emphasis

It is the most informative single number about a human-in-the-loop system, and almost nobody tracks it.

```
Override rate near 0%     → the human is rubber-stamping.
                            The gate is not a control. (V5 §9.2, ASI09)

Override rate 5–20%       → healthy. Humans are engaging and the
                            system is usually right.

Override rate above 40%   → the system is generating work, not saving
                            it. Reconsider the use case.
```

---

## 3.3 — Independent Validation **[WORKING]**

In a bank, the team that builds a model does not sign it off. Make the validator's job easy and you will get through faster.

```
GIVE THEM, UNPROMPTED:

[ ] The evaluation set and full results, by slice
[ ] The methodology: how cases were selected, who graded them,
    what the rubrics were
[ ] Judge calibration results, with Cohen's kappa (V5 §4.2)
[ ] The adversarial and red team results, including failures
[ ] A WRITTEN STATEMENT OF LIMITATIONS
[ ] The comparison against the human baseline
[ ] Sample traces, including failures
[ ] The degraded-mode design
[ ] The monitoring plan and thresholds
```

**Volunteering the limitations is what earns credibility.** A validator who discovers a weakness you did not disclose will question everything else. A validator handed a document that says "this system performs 11 points worse on mixed-script documents, which are 8% of volume; those are routed to human review" has been given a reason to trust the rest of your numbers.

---

# PART 4 — THE REGULATORY LANDSCAPE

> **[RETURN HERE]** — this is the most perishable part of the textbook. Verify before relying on any of it. Section 9.6 lists sources and cadence.

## 4.1 — The EU AI Act **[WORKING]**

**Position as of August 2026.** This changed materially in mid-2026, and a large amount of published commentary predates the change.

### The timeline that actually applies

| Date | What applies |
| :--- | :--- |
| 1 Aug 2024 | Entered into force |
| 2 Feb 2025 | Prohibited practices; AI literacy obligations |
| 2 Aug 2025 | Governance rules; obligations for general-purpose AI models |
| **2 Aug 2026** | **General application. Article 50 transparency duties apply** — disclosure that a user is interacting with AI, machine-readable marking of AI-generated content, deepfake labelling. Commission enforcement powers over general-purpose models activate. |
| **2 Dec 2026** | Article 50(2) transparency extends to systems already on the market; additional prohibitions take effect |
| **2 Aug 2027** | Member states must operate at least one AI regulatory sandbox |
| **2 Dec 2027** | **High-risk obligations for standalone Annex III systems — which include creditworthiness assessment.** Deferred sixteen months from the original date. |
| **2 Aug 2028** | High-risk obligations for AI embedded in regulated products |

### What happened

The Commission proposed a **Digital Omnibus on AI** in November 2025. Political agreement followed in May 2026; the European Parliament approved it in June 2026 by **423 votes to 57 with 174 abstentions**; the Council gave final approval later that month; **it entered into force on 27 July 2026.**

### The dangerous misreading

> "The EU delayed the AI Act."

Half true and operationally dangerous. **High-risk obligations moved. Transparency obligations did not.** Article 50 landed on 2 August 2026 exactly as scheduled. If you operate a customer-facing assistant with EU exposure, disclosure obligations are live now.

### What high-risk obligations require

Build toward these now rather than waiting for December 2027 — they take longer than sixteen months to retrofit.

```
Art. 9   Risk management system across the lifecycle
Art. 10  Data governance: representativeness, bias examination,
         documented gaps
Art. 11  Technical documentation, before placing on the market
Art. 12  Automatic logging and record-keeping
Art. 13  Transparency and instructions for use to deployers
Art. 14  HUMAN OVERSIGHT designed in — a person who can understand
         the output, intervene, and override
Art. 15  Accuracy, robustness and cybersecurity, with declared
         performance metrics
```

**Map these against Volumes 1–5 and the overlap is near-total.** Article 12 is your trace store. Article 14 is V4 §7. Article 15 is V5 Parts 1–6. If you built well, the compliance work is largely documentation of things that already exist.

### Grandfathering

Systems placed on the market before the applicable deadline can avoid full high-risk obligations **until substantially modified.** Map what counts as a substantial modification in your context — because a model version change, a retrieval architecture change, or a scope expansion may reset the clock.

---

## 4.2 — India **[WORKING]**

### FREE-AI

The Reserve Bank's **Framework for Responsible and Ethical Enablement of Artificial Intelligence**. Committee constituted December 2024, chaired by **Dr Pushpak Bhattacharyya (IIT Bombay)**, eight members, over 100 stakeholders consulted. **Report published 13 August 2025.**

**Seven principles ("sutras"):**

```
1. Trust is the foundation        build and protect public trust
2. People first                   final decision-making vests with
                                  humans, not models
3. Innovation over restraint      responsible innovation is prioritised
                                  over cautionary restraint
4. Fairness and equity            unbiased, non-discriminatory operation
5. Accountability                 clear ownership of AI outcomes
6. Understandable by design       explainability proportionate to use
7. Safety, resilience, sustainability
```

**Six pillars — three enabling, three risk-managing:**

| Enabling | Risk-managing |
| :--- | :--- |
| **Infrastructure** — shared sectoral data infrastructure, AI sandboxes, accessible compute | **Governance** — board-level policy, ownership, lifecycle controls |
| **Policy** — an enabling regulatory posture, proportionate to risk | **Protection** — consumer protection, grievance redress, disclosure |
| **Capacity** — skills, indigenous model development | **Assurance** — audit, incident reporting, supervisory visibility |

**Twenty-six recommendations**, with practical annexes that are the most immediately useful part: suggested enhancements to Master Directions, an **illustrative board AI policy outline**, and an **indicative AI incident reporting form and protocol**.

### Why the framing matters for your business case

**Principle 3 is unusual and it is worth quoting to a board.** A financial-sector regulator explicitly stating that responsible innovation is prioritised over cautionary restraint changes the shape of the internal conversation.

The question stops being *"may we use AI?"* and becomes *"can we evidence governance proportionate to the risk tier?"* — which is a question with an engineering answer.

**Supporting data point:** the RBI's survey of banks, NBFCs, fintechs and technology companies found around **21% of surveyed entities using or developing AI systems**, mostly with simpler rule-based models. The field is early. The gap between "we use AI" and "we govern AI" is where the value sits.

### The wider Indian stack

| Instrument | Relevance |
| :--- | :--- |
| **DPDP Act 2023** | Consent, purpose limitation, data-principal rights, breach notification. **Governs every prompt containing customer data.** |
| **RBI Digital Lending Directions** | Disclosure, Key Fact Statement, no automatic limit enhancement without consent, lending service provider conduct — directly constrains AI-driven lending journeys |
| **Storage of payment system data** | Localisation requirements for payment data |
| **Outsourcing and IT governance directions** | **A hosted LLM API used in a lending process is a material outsourcing arrangement**: due diligence, audit rights, exit plan, concentration risk |
| **Fair Practices Code** | Reasons for rejection must be communicated — §2.3 |
| **IndiaAI Mission (MeitY)** | Datasets, models and compute; the shared infrastructure FREE-AI points toward |

### Global frameworks worth naming

**NIST AI Risk Management Framework** — Govern, Map, Measure, Manage. Voluntary, widely referenced, and a useful structure for organising an internal programme. **ISO/IEC 42001** — an AI management system standard, certifiable, and increasingly appearing in enterprise procurement questionnaires. **ISO/IEC 23894** for AI risk, **ISO/IEC 27001** for information security.

---

## 4.3 — The Audit Evidence Pack **[CORE]**

Assemble this before you need it. It is the artefact that ends the conversation.

```
1   SYSTEM DESCRIPTION       purpose · scope · users · decision authority
                             · risk tier · position in the decision
                               process (§2.1)
2   ARCHITECTURE             data flow diagram · trust boundaries ·
                             processing regions · egress map
3   AIBOM                    models · versions · frameworks · MCP servers
                             · corpora · prompts · guardrails (V5 §11.2)
4   DATA GOVERNANCE          sources · lawful basis · retention ·
                             residency · data protection assessment
5   EVALUATION               suite · results BY SLICE · dates ·
                             methodology · judge calibration
6   FAIRNESS                 paired testing · protected-attribute
                             analysis · mitigation
7   SECURITY                 threat model · lethal trifecta assessment ·
                             red team report · penetration test ·
                             CVE posture
8   HUMAN OVERSIGHT          gate design · staffing · training ·
                             ★ OVERRIDE STATISTICS
9   MONITORING               live metrics · thresholds · alerting ·
                             incident history
10  CHANGE CONTROL           version history of model, prompt, corpus,
                             guardrails, with approvals
11  INCIDENT PROCEDURE       detection · triage · kill switch ·
                             notification (including the regulator's
                             reporting format)
12  THIRD PARTY              processing agreements · sub-processors ·
                             audit rights · exit plan · concentration
13  SIGN-OFF                 business owner · model validation · risk ·
                             legal · data protection officer
```

**Item 8's override statistics and item 5's slice results are the two that distinguish a real pack from a template.** Everything else can be written. Those two can only be measured, which is why they are persuasive.

---

# PART 5 — THE PRODUCT LAYER

## 5.1 — Vertical Beats Horizontal **[CORE]**

**What this section gives you.** The design decision that determines whether a system is adoptable, evaluable, and defensible.

### The comparison

| | **Horizontal** (a chat box) | **Vertical** (a task surface) |
| :--- | :--- | :--- |
| Interface | "Ask me anything" | Named tasks, forms, buttons |
| The user must know | How to prompt well | Their own job |
| Evaluation | Impossible — the task space is unbounded | Tractable — a fixed, enumerable task set |
| Guardrails | Generic | Domain-precise |
| Data | Whatever is pasted in | Integrated with systems of record |
| Risk tiering | Undefinable | Definable per task |
| Defensibility | Low — the model vendor can absorb it | High — workflow, data, compliance |

**A blank chat box transfers all the difficulty to the user.** A vertical application absorbs it, and absorbing difficulty is the product.

### The translation

```
❌  "Ask me anything about credit policy"

✅  [ Summarise this appraisal file ]
    [ Extract sanction conditions ]
    [ Check this proposal against Credit Policy §7 ]
    [ Draft the adverse action letter ]
    [ Find comparable declined cases ]
    [ Prepare the credit committee note ]
    [ What changed in this circular? ]
```

Each button is a bounded task with a fixed prompt, a fixed retrieval scope, a fixed output schema, its own evaluation set, and its own risk tier.

**That is why vertical products are evaluable and horizontal ones are not**, and it is also why they pass governance: you can write down what each one does and does not do.

### The adoption argument

The chat box also fails for a human reason. An analyst opening a blank text field has to invent a task and phrase it well. An analyst who sees "Extract sanction conditions" has been told what the system is good at.

**Discoverability is the difference between a system with 12% weekly active usage and one with 70%.**

---

## 5.2 — Designing for a Fallible Model **[CORE]**

Your model will be wrong. The product's job is to make being wrong **cheap, visible, and correctable.**

| Pattern | What it does |
| :--- | :--- |
| **Stream everything** | Time-to-first-token is perceived latency. Show tokens as they arrive, and show *what the system is doing* during retrieval and tool calls. |
| **Cite inline, click to source** | Not a footnote — a clickable span opening the exact passage, highlighted. **This is what converts scepticism into trust**, and it is the single highest-impact interface decision. |
| **Show the working** | Retrieved passages, tools called, filters applied. Collapsible, but present. |
| **Draft, do not decide** | Position output as a draft the human edits. Edit distance then becomes your best quality metric (V5 §3.2). |
| **Undo everything** | Every action reversible or two-phase (V4 §1.2). |
| **Abstention as a feature** | "I could not find this in the current policy corpus" displayed prominently, with an escalation button. Reward it in evaluation. |
| **Progressive disclosure** | Summary → detail → raw evidence. Three levels, one click each. |
| **One-click feedback** | Thumbs plus optional reason, routed straight into the evaluation corpus (V5 §2.1). |
| **Graceful degradation** | Model down → cheaper model → cached → retrieval-only → honest error. **Never a spinner.** |

### The latency budget

```
  0–100 ms    Acknowledge. A UI state change. Non-negotiable.
100–400 ms    Retrieval complete — show "found 6 sources" with titles
400–800 ms    First token streaming
  1–4 s       Complete answer for a simple query
  4–15 s      Complex or agentic — MUST show intermediate progress
    >15 s     Move to asynchronous: job ID, notification, results page
```

**The rule: never let a user watch a spinner for more than about two seconds without new information appearing.** Showing the retrieved source titles at 400 ms — before any generation — is one of the cheapest perceived-performance improvements available, because it demonstrates the system is working on the right thing.

---

## 5.3 — Unit Economics **[WORKING]**

Traditional software has near-zero marginal cost. AI products have real marginal cost per use. **Price the variable cost or the margin disappears.**

```
Gross margin = (Price − Cost of goods sold) ÷ Price

COGS per user per month =
      (model tokens + embedding + reranking + serving + trace storage)
    × requests per user per month
    × (1 + retry rate + escalation rate)          ← V2 §8.1
```

| Model | Mechanics | Risk |
| :--- | :--- | :--- |
| **Per seat** | Flat monthly per user | Power users destroy the margin |
| **Usage / credits** | Per query, document, or token | Discourages the usage you want |
| **Hybrid** — seat + included quota + overage | Most common in enterprise | Complexity |
| **Outcome-based** | Per file processed, per case resolved | Attribution disputes |
| **Internal chargeback** | Cost allocated to the consuming business unit | **The relevant model for an in-house bank deployment** |

**For an internal deployment, the equivalent of pricing is chargeback**, and it does the same job: it makes a business unit's consumption visible to that business unit, which is the only thing that reliably curbs it. Per-tenant tagging (V2 §8.5) is what makes chargeback possible.

**Protect the margin with:** cascade routing, prompt caching, batch APIs for non-interactive work, and per-tenant dashboards reviewed monthly. A single team running an agent in a loop can turn a profitable deployment negative in a week.

---

## 5.4 — Moats **[CORE]**

| Asset | Durability | How you build it |
| :--- | :--- | :--- |
| **Workflow integration** | Very high | Be inside the system where the work already happens — the origination system, the core banking screen, Excel, the ticketing tool |
| **The evaluation set** | **High** | Compounds with every incident. Cannot be copied. |
| **Data flywheel** | High | Usage → corrections → better retrieval and adapters → more usage |
| **Compliance posture** | **High in financial services** | Audit-ready artefacts, regional deployment, validation history. An eighteen-month barrier for a new entrant. |
| **Domain depth** | Medium-high | Ontology, taxonomies, expert-authored rubrics |
| **Distribution** | High | Incumbency, channel, existing relationships |
| **The model** | **Zero** | You do not own it. Neither does anyone else. |
| **Prompts** | **Zero** | Copyable in a screenshot |

**The uncomfortable point:** every capability that comes purely from the model is a capability your competitor receives for free next quarter. **Build only on what the model vendor cannot ship.**

---

# PART 6 — THE ENTERPRISE BLUEPRINT

## 6.1 — Reference Architecture **[CORE]**

```
┌───────────────────────────────────────────────────────────────────────┐
│  CHANNELS   Web · mobile · Teams/Slack · embedded in the origination   │
│             system · API · scheduled batch                             │
└────────────────────────────────┬──────────────────────────────────────┘
                                 │  SSO · authorisation · rate limiting
┌────────────────────────────────▼──────────────────────────────────────┐
│  APPLICATION SERVICES                                                  │
│  Task handlers · sessions · streaming · feedback capture               │
└────────────────────────────────┬──────────────────────────────────────┘
                                 │
┌────────────────────────────────▼──────────────────────────────────────┐
│  ORCHESTRATION                                        Volume 4         │
│  Workflows and agent graphs · checkpointer (Postgres) · HITL queue     │
│  Budget enforcement: steps · spend · wall-clock · escalation router    │
└──────┬──────────────────┬───────────────────┬─────────────────────────┘
       │                  │                   │
┌──────▼───────┐  ┌───────▼────────┐  ┌──────▼──────────────────────────┐
│ CONTEXT      │  │ TOOL PLANE     │  │ MODEL GATEWAY        Volume 2    │
│   Volume 3   │  │   Volume 4     │  │ Routing by tier AND data class   │
│ Retrieval    │  │ MCP GATEWAY    │  │ Fallback chain · retries         │
│ Reranking    │  │ - allowlist    │  │ Prompt cache optimisation        │
│ Memory       │  │ - authZ        │  │ Token accounting + tagging       │
│ Compaction   │  │ - schema hash  │  │ Budget enforcement               │
│ Prompt reg.  │  │ - rate limit   │  │                                  │
└──────┬───────┘  └───────┬────────┘  └──────┬──────────────────────────┘
       │                  │                   │
┌──────▼───────┐  ┌───────▼────────┐  ┌──────▼──────────────────────────┐
│ pgvector     │  │ MCP SERVERS    │  │ MODEL PROVIDERS                  │
│ + BM25       │  │ credit-tools   │  │ Hosted APIs, in-region           │
│ Object store │  │ warehouse-sql  │  │ Self-hosted vLLM / SGLang        │
│              │  │ documents      │  │ Small models: guardrails,        │
│              │  │ bureau         │  │   classification, rewriting      │
└──────────────┘  └────────────────┘  └──────────────────────────────────┘

╔═══════════════════════ CROSS-CUTTING ════════════════════════════════╗
║ GUARDRAIL SERVICE    input/output · PII · injection · claims  Vol 5  ║
║ OBSERVABILITY        traces · full prompts · cost · latency   Vol 5  ║
║ EVALUATION HARNESS   CI gates · nightly regression · red team Vol 5  ║
║ GOVERNANCE           AIBOM · model registry · approvals ·     Vol 6  ║
║                      kill switches · override logging                 ║
║ FINOPS               per-tenant budgets · hard stops          Vol 2  ║
╚═══════════════════════════════════════════════════════════════════════╝

★ AND, SITTING OUTSIDE THIS ENTIRELY:
┌───────────────────────────────────────────────────────────────────────┐
│  DECISION LAYER — scorecards, policy rules, delegated authority        │
│  Deterministic. Explainable. Validated under existing model risk.      │
│  The language stack above ADVISES it. It never replaces it.   §2.1     │
└───────────────────────────────────────────────────────────────────────┘
```

## 6.2 — The Five Platform Components **[CORE]**

Build these once, before the second use case. Then every subsequent use case takes weeks rather than months.

```
1. MODEL GATEWAY
   One place where routing, fallback, retries, cost tagging, budget
   enforcement, and data-class overrides live.
   ★ Application code NEVER calls a provider SDK directly.

2. GUARDRAIL SERVICE
   One place where input and output policy is enforced and measured.

3. EVALUATION HARNESS
   One place where quality is defined, gated in CI, and reported by slice.

4. TRACE STORE
   One place where everything that happened is recorded.
   Debugger, evaluation corpus, and audit evidence in one artefact.

5. MODEL AND PROMPT REGISTRY (the AIBOM)
   One place that knows what is running where, at what version,
   who owns it, and when it was last reviewed.
```

**The first is the one that matters most**, because it is what makes model choice reversible. With a gateway, a model swap is a configuration change validated by an eval run. Without one, it is a change to every service that calls a model.

```python
class ModelGateway:
    """The single choke point. Everything else in the platform depends
    on application code never bypassing this."""

    def complete(self, *, task: str, messages: list, tenant: str,
                 data_class: str, principal, trace_id: str,
                 schema=None, max_tokens: int = 2048):

        # 1. DATA CLASS OVERRIDE — evaluated first, beats everything.
        #    This is the artefact an auditor asks for (§4.2).
        if data_class in ("customer_identifying", "restricted"):
            candidates = self.policy.in_region_only(task)
        else:
            candidates = self.policy.cascade_for(task)   # cheap → prod → frontier

        # 2. Budget enforcement BEFORE any spend (V2 §8.5)
        self.budgets.assert_within(tenant, task)

        # 3. Input guardrails (V5 §10)
        gi = guardrails.check_input(messages, principal)
        if gi.verdict is Verdict.BLOCK:
            raise GuardrailBlocked(gi.reason, gi.rule_id)
        messages = gi.modified or messages

        # 4. Cascade with an escalation check (V2 §8.3)
        for model_id in candidates:
            try:
                resp = self._call(model_id, messages, schema, max_tokens)
                if self.quality_ok(resp, task):
                    break
                self.metrics.escalation(task, model_id)   # ← key telemetry
            except (RateLimited, ProviderError, Timeout) as e:
                self.metrics.fallback(task, model_id, type(e).__name__)
                continue
        else:
            raise AllModelsFailed()

        # 5. Output guardrails
        go = guardrails.check_output(resp.text, context=messages,
                                     principal=principal)
        if go.verdict is Verdict.BLOCK:
            raise GuardrailBlocked(go.reason, go.rule_id)
        resp.text = go.modified or resp.text

        # 6. Account and trace — ALWAYS, including on failure paths
        self.ledger.record(tenant=tenant, task=task, model=resp.model_id,
                           tokens=resp.usage, cost=resp.cost,
                           cache_hit=resp.usage.cached_input_tokens,
                           trace_id=trace_id)
        return resp
```

**Buy the plumbing, own the policy.** Open-source and commercial gateways exist and handle routing, retries and provider abstraction well. The routing *policy* — especially the data-class table — is yours and should live in your repository, reviewed like code.

---

# PART 7 — THE ENGAGEMENT PLAYBOOK

## 7.1 — Weeks 0–2: Discovery **[CORE]**

**Do not write code.**

```
▸ Shadow three to five practitioners doing the actual work.
  WATCH, do not interview. People describe the process they think
  they follow; observation reveals the one they actually follow.

▸ Map the workflow: every step, every system, every handoff,
  every wait, every workaround.

▸ Quantify: volume · cycle time · error rate · rework rate ·
  cost per unit · headcount.

▸ Find the task that is BORING, HIGH-VOLUME, WELL-DOCUMENTED, and
  ALREADY HUMAN-REVIEWED. That is your first use case.
  ★ Not the impressive one.

▸ Identify the data: where it lives, its quality, the access path,
  who owns it, its classification.

▸ Identify the decision authority: who signs off, under what policy,
  with what delegated limit.

▸ Draft success metrics WITH the business owner. Get them written down
  and agreed before anything is built.
```

### The selection matrix

| | **Low risk** | **High risk** |
| :--- | :--- | :--- |
| **High volume** | ✅ **START HERE** — extraction, summarisation, drafting, triage, search | ⚠️ Phase two, with human gates — decisioning support, prioritisation |
| **Low volume** | ⚠️ Poor return regardless of how impressive | ❌ Never start here |

---

## 7.2 — Weeks 3–12 **[CORE]**

```
WEEKS 3–4   EVALUATION FIRST
  ▸ Build the golden set with subject-matter experts (V5 §2).
    THIS IS THE DELIVERABLE for these two weeks.
  ▸ Establish the HUMAN BASELINE. How good are people, actually?
    How consistent are they with each other?
    ★ You will often find human agreement is 70–80%. That reframes
      the target enormously, and it is the most useful number you
      will produce in the whole engagement.
  ▸ Agree the quality bar with the business owner, in writing.
  ▸ Shortlist three models. Run the eval. Report quality × cost ×
    latency together, never quality alone.

WEEKS 5–8   ONE THIN VERTICAL SLICE
  ▸ ONE workflow, end to end, real data, three to five real users.
  ▸ Full stack: retrieval → guardrails → generation → citations →
    feedback → traces.
  ▸ Ship to production behind a feature flag.
    Not a notebook. Not a demo.

WEEKS 9–12  HARDEN AND PROVE
  ▸ Shadow mode against live volume (V2 §9.4). Build the comparison
    dataset — it becomes your business case, your validation evidence,
    and training data all at once.
  ▸ Security review, red team, data protection assessment,
    model risk documentation.
  ▸ Runbook, on-call, kill switch, monitoring dashboards.
  ▸ Measure the business metric. Write the ROI note with real numbers.
  ▸ THEN scope use case two — with a platform that already exists.
```

---

## 7.3 — The Traps **[CORE]**

Name these out loud in week one. Naming them early is what prevents them.

```
❌ Starting with the most impressive use case rather than the most
   tractable one
❌ Building a chat box when the workflow needs a button (§5.1)
❌ Postponing evaluation — "we'll add it later". You will not.
❌ Skipping retrieval quality measurement and blaming the model (V3)
❌ No named business owner → no adoption, regardless of quality
❌ Ignoring compliance until pre-launch → a three-month delay
❌ Optimising cost before quality → you optimise the wrong thing
❌ Demoing to executives with no path to production → credibility burn
❌ Letting the model make a decision (§2.1) → the project does not
   get approved and nobody tells you why
❌ Building the second use case before the platform (§6.2)
```

---

## 7.4 — The ROI Note **[WORKING]**

The document that funds phase two. Real numbers, measured, not projected.

```
BASELINE  (measured over 4 weeks, before deployment)
  1,240 credit appraisal files per month
  42 minutes average handling time per file
  → 868 analyst-hours per month
  Error rate 6.2% (rework), consuming a further 94 hours

WITH THE ASSISTANT  (measured over 4 weeks of live usage, n = 380)
  42 min → 16 min average handling time
  → 331 analyst-hours per month
  Error rate 3.5%, measured by expert grading of 100 sampled files
  Human override rate 11% (healthy — §3.2)

COST
  Model and infrastructure: ₹2.6 lakh/month
  One-time build: ₹XX lakh

NET
  ▸ 537 analyst-hours released per month
  ▸ Rework reduced by roughly 40 hours per month
  ▸ Payback in N months

NON-FINANCIAL, AND OFTEN MORE PERSUASIVE
  ▸ 100% of memos now cite the applicable policy clause
  ▸ Complete audit trail on every file
  ▸ New analyst onboarding: 6 weeks → 3 weeks
  ▸ Policy queries answered in seconds rather than routed to the
    policy team (which absorbed 60 hours per month)
```

**The non-financial section frequently carries more weight in a bank than the hours saved**, because the audit trail and the citation coverage address risks the institution already worries about.

---

# PART 8 — WHERE THINGS STAND

> Placed at the end deliberately. Every claim below is a conclusion drawn from mechanisms in Volumes 1–7, and reading it first would mean reading conclusions without their reasons.

## 8.1 — The Structural Position, Mid-2026 **[WORKING]**

**1. Reasoning is on by default at the frontier.** Flagship models allocate variable inference-time compute before answering. Cost per task now varies by more than an order of magnitude for identical inputs, which is why cost-per-resolved-task replaced cost-per-token as the only honest metric.

**2. One-million-token context is standard at the flagship tier — and retrieval did not go away.** Cost, prefill latency, non-uniform attention, and — decisively in regulated lending — the impossibility of permission-filtering or citing "the whole corpus."

**3. Open-weight models reached the frontier, and "open" now means datacentre-scale.** Trillion-parameter mixture-of-experts systems needing 8 to 64 accelerators at one end; genuinely small single-GPU and on-device models at the other; a thinned middle. Chinese laboratories are the effective owners of the open frontier.

**4. Price per unit of capability is falling roughly an order of magnitude per year, unevenly.** The spread between the cheapest frontier-class tokens and the most expensive proprietary tier is what makes three-tier cascade routing obligatory rather than optional.

**5. The tool-connection layer consolidated on one protocol**, which went stateless in July 2026 and thereby became ordinary HTTP infrastructure.

**6. Agents produced a genuinely new class of security incident**, and a dedicated threat taxonomy followed.

**7. Regulation is live, and creditworthiness assessment is named.** Transparency obligations applied from August 2026; high-risk obligations for credit deferred to December 2027. India's financial-sector framework is deliberately enabling.

### The stable conclusion beneath all seven

```
Never write a specific model name into an architecture document.

Write a TIER and a ROUTING POLICY. Put every model call behind one
gateway. Keep a frozen evaluation suite as the arbiter of change.

Then a model swap is a configuration change validated in an afternoon —
which is roughly the cadence at which this landscape actually moves.
```

---

## 8.2 — What to Watch **[WORKING]**

Rather than predictions, the specific things whose movement would change your architecture:

| Watch | Why it would matter |
| :--- | :--- |
| **Cost of the cheap tier** | If it falls another order of magnitude, cascade routing collapses to "always use the good model" |
| **Small-model capability** | If a 30B model matches today's production tier on your evaluation set, self-hosting and on-device deployment become viable for far more use cases |
| **Long-context accuracy at position** | If the U-shaped curve flattens, the retrieval-versus-context balance shifts |
| **Structured output reliability** | Already high; if it becomes perfect, a class of validation code disappears |
| **Prompt injection defences** | Any credible structural defence — as opposed to mitigation — would be the most consequential change in this list |
| **Regulatory enforcement patterns** | The first enforcement actions will tell you far more than the text of the regulation does |
| **In-region model availability** | The main constraint on architecture in Indian financial services. Watch it directly. |

---

# PART 9 — THE COMPLETE REFERENCE

## 9.1 — Every Number Worth Memorising

```
═══ TOKENS ══════════════════════════════════════════════════════════
  ~4 English characters per token · ~0.75 English words per token
  A4 page ≈ 550 tokens · code ≈ 10–15 tokens per line
  40-page appraisal memo ≈ 25,000–35,000 tokens
  Annual report ≈ 150,000–400,000 tokens
  ★ Devanagari and other Indic scripts: 2–4× the tokens of
    equivalent English. A direct cost and latency multiplier.
  ALWAYS measure with the production tokeniser. Never estimate.

═══ MEMORY ══════════════════════════════════════════════════════════
  Weights (GB) ≈ parameters (billions) × bytes per parameter
      70B @ 2 bytes = 140 GB · @ 1 byte = 70 GB · @ 0.5 = 35 GB
      8B  @ 2 bytes =  16 GB · @ 0.5 bytes = 4 GB (laptop)

  Full fine-tune ≈ 16 bytes/parameter (AdamW)  →  7B ≈ 112 GB
  LoRA trains 0.1–1% of parameters. QLoRA: 70B on one 48 GB card.
  LoRA adapter file: 50–300 MB against a 16 GB base.

  ★ KV cache per token = 2 × layers × kv_heads × head_dim × bytes
      70B with GQA ≈ 320 KB/token
      →   8k context ≈  2.6 GB PER USER
      → 128k context ≈ 41.0 GB PER USER

  Plan: weights + KV cache ≤ 85% of card capacity.

═══ COMPUTE ═════════════════════════════════════════════════════════
  Forward pass FLOPs ≈ 2 × parameters × tokens
  Training step      ≈ 6 × parameters × tokens
  Matrix multiply (M,K)×(K,N) → 2·M·K·N FLOPs, output shape (M,N)
  Attention cost grows with the SQUARE of sequence length

═══ SPEED ═══════════════════════════════════════════════════════════
  ★ Single-stream decode tok/s ≈ memory bandwidth ÷ weight bytes
      70B @ 2 bytes on 3.35 TB/s ≈ 24 tok/s
  Prefill: COMPUTE-bound, ~12,000 FLOPs/byte, GPU 70–95% utilised
  Decode:  MEMORY-bound, ~2 FLOPs/byte, GPU often under 20%
  Batch 1 → 47 tok/s per user · Batch 32 → 30 per user, 967 total
  Continuous batching: 2–4× over static
  Speculative decoding: 1.5–3× on TPOT, PROVABLY LOSSLESS

═══ LATENCY TARGETS ═════════════════════════════════════════════════
  TTFT < 500 ms interactive (< 200 ms excellent)
  TPOT 20–50 ms (= 20–50 tokens/sec perceived)
  E2E = TTFT + (TPOT × output tokens)
  Never a spinner for more than ~2 seconds without new information

═══ RETRIEVAL ═══════════════════════════════════════════════════════
  ★ RECALL@20 > 0.90 BEFORE RERANKING — the gate. Nothing downstream
    can compensate for a passage that was never a candidate.
  NDCG@5 > 0.75 · Precision@6 > 0.60 · MRR > 0.80 after reranking
  Reranking adds +10 to +25 NDCG@5
  Contextual retrieval: ~49% fewer failures alone, ~67% with reranking
  RRF: score = Σ 1/(k + rank), k = 60
  HNSW: M 16–48 · ef_construction 100–400 · ef_search 50–200 (runtime)
  k = 5–8 retrieved passages is usually optimal. k = 30 is worse AND
    four times the cost.

═══ QUALITY GATES ═══════════════════════════════════════════════════
  Faithfulness > 0.92 · citation validity = 1.00 · schema valid > 0.99
  False refusal rate < 3% · judge–human agreement κ > 0.80
  Injection success = 0 (zero tolerance)
  Human override rate 5–20% (near 0 = theatre; > 40% = not useful)
  Slice regression alert at −5 points on any slice

═══ COST ════════════════════════════════════════════════════════════
  ★ Real cost ≈ 2–2.5× the naive token estimate
    Forgotten: thinking tokens · requests per task · retries and
    escalations · guardrail and rerank calls
  Cascade routing: 50–80% reduction
  Prompt caching: ~90% off cached input, ~75% off prefill latency
  Output length control: 20–50% · Batch API: ~50%
  Target cache hit rate: > 90% on stable-prefix workloads
  Self-hosting break-even: ~55–75% sustained utilisation on raw GPUs;
    far higher against hosted API pricing — typically ~4× a large
    enterprise workload's volume

═══ AGENTS ══════════════════════════════════════════════════════════
  Tool set: keep under 15–20. Fixed. Stable order.
  Budgets: max steps · max spend · max wall-clock — in RUN STATE
  Compaction threshold: ~65% of the working budget
  One compromised MCP server in a five-server setup: 78.3% attack
    success, cascading to others 72.4% of the time
```

---

## 9.2 — The Anti-Patterns Catalogue

| # | Anti-pattern | Do this instead |
| ---: | :--- | :--- |
| 1 | Naming a specific model in an architecture document | Name a tier and a routing policy |
| 2 | Using a `-latest` model alias in production | Pin the explicit version string, recorded in every trace |
| 3 | Building evaluation "later" | Build it first. It is the deliverable of weeks 3–4. |
| 4 | Fine-tuning to inject facts | Fine-tune for form, retrieve for fact |
| 5 | Access control in the system prompt | Filter entitlements in the retrieval query |
| 6 | Security logic in the system prompt | Enforce in code. Assume the prompt leaks. |
| 7 | Temperature 1.0 on extraction | Temperature 0 plus a schema constraint |
| 8 | A timestamp at the top of the system prompt | Stable prefix first; variable content last |
| 9 | Dynamically varying the tool list per turn | Fixed set, fixed order — it destroys prompt caching |
| 10 | Returning raw JSON payloads from tools | Return summaries the model can use |
| 11 | An agent with no step, spend or wall-clock cap | All three, enforced in run state |
| 12 | One-shot destructive tools | Two-phase: propose → token → commit |
| 13 | Approving the agent's summary | Show the raw action |
| 14 | Gating every action | Gate only what matters — approval fatigue breaks the real gates |
| 15 | Retrieving 40 passages "to be safe" | Retrieve 100 candidates, rerank to 6 |
| 16 | No abstention path | Rerank floor + exact refusal string + faithfulness check |
| 17 | Never measuring ANN recall against a flat index | Measure it. Silent 70% recall is invisible otherwise. |
| 18 | Flattening tables at parse time | Vision-model extraction, kept as structured objects |
| 19 | Ignoring `superseded_by` on a regulatory corpus | Temporal metadata with as-of-date filters |
| 20 | No multi-turn query rewriting | Rewrite every turn after the first |
| 21 | Answering aggregate questions from retrieved passages | Route quantitative questions to SQL |
| 22 | Building an agent when a switch statement works | Buy the least autonomy that solves the problem |
| 23 | Multi-agent before single-agent works | Sub-agents first; multi-agent only with tracing |
| 24 | Anything that could be a rule, implemented in a model | Rules in code. Models for language. |
| 25 | Quantising without re-running evaluations by slice | Treat quantisation as a model change |
| 26 | `--max-model-len` set to the model maximum | Cap it to your real p99. It is your concurrency. |
| 27 | Sampling or truncating traces | Store full traces; redact at write time |
| 28 | A cheap model as the LLM judge | Judging is harder than answering |
| 29 | Reporting aggregate accuracy | Report by slice, always |
| 30 | An uncalibrated judge | Cohen's kappa against 100 human labels |
| 31 | No unanswerable cases in the eval set | 10% of the set, or abstention is unmeasurable |
| 32 | Optimising safety without measuring false refusals | Measure refusal in both directions |
| 33 | Exposing an inference engine or MCP server directly | Authenticating gateway in front, always |
| 34 | Fetching a model-generated URL | Never. Allowlist only. |
| 35 | Letting the language model make the decision | Decision layer decides; language layer explains |
| 36 | Optimising cost before quality | Quality gate first |
| 37 | Compliance engagement at pre-launch | Compliance in week one |
| 38 | A chat box where the workflow needs a button | Vertical, named tasks |
| 39 | Building the second use case before the platform | Five platform components first |
| 40 | Demoing without a path to production | Ship the thin slice behind a flag instead |

---

## 9.3 — Practical Notes That Are Rarely Written Down

**On measurement**

- **The human baseline is the most useful number you will produce.** Have three experts grade the same fifty cases independently. Agreement is usually 70–85%. That reframes what "good enough" means, and it converts an unwinnable argument about perfection into a comparison.
- **Log the token count and a hash of the stable prefix on every request.** One line of code. It gives you cache-hit diagnosis, prompt-drift detection, and cost attribution for free.
- **Escalation rate, cache hit rate, abstention rate and guardrail triggers all move before task success does.** Alert on 20% relative movement, not absolute thresholds.

**On retrieval**

- **When the right document is not retrieved, check whether the chunk contains the words the query uses.** That is the first check, before the model, the prompt, or the embedding model.
- **Build a flat index over a 100k sample and keep it.** It is your permanent ground truth for recall, and it costs almost nothing to maintain.
- **Grade a superseded document as relevance 0 in your eval set.** It makes the temporal filter testable.

**On cost**

- **The most expensive incident is an unbounded agent loop against a frontier model overnight.** Three caps in the run state prevent it. A dashboard alert does not.
- **Output tokens usually cost five to eight times input tokens.** "Do not restate the question. Do not describe your process." cuts output by 30–50%.
- **Look at cost per task at p95, not the mean.** The mean hides the runaway runs, which are where the incidents are.

**On prompts**

- **Give the model an explicit out.** "If the evidence does not contain the answer, say exactly: 'I could not find this...'" — an exact string makes abstention machine-detectable in your logs.
- **Put the most critical instruction in both the system prompt and immediately before the question.** Attention is U-shaped; both extremes are cheap.
- **Feed validation errors back to the model verbatim.** Self-repair works, and it works better than any rephrasing you will write.

**On agents**

- **Rewrite the tool descriptions before tuning anything else.** Stating when *not* to use a tool is worth more than any prompt change.
- **Inject tool failures deliberately, including `stale_data` and `wrong_entity`.** A tool returning something *wrong* is more dangerous than one returning nothing, and the failure to test for is fabrication after a failure.
- **When a long run goes incoherent, look at the compaction boundary first.**

**On governance**

- **Volunteer your limitations to the validator.** It is the fastest route through validation, and it costs nothing you were going to keep.
- **Classify the risk tier in writing at project inception, signed by the business owner.** Most governance disputes are unresolved tiering surfacing two weeks before launch.
- **Track the human override rate.** Near zero means your gate is theatre.
- **Route by data classification, not model preference.** That routing table is the specific artefact a supervisor asks to see.

**On working with the business**

- **Week one is a stopwatch and a notebook, not a repository.**
- **Watch people work; do not interview them.** People describe the process they think they follow.
- **Shadow mode for four weeks produces your business case, your validation evidence, and your training data simultaneously, at zero customer exposure.** It is the highest-value month in a deployment and it is routinely skipped because it produces nothing visible.
- **The non-financial benefits often carry more weight in a bank than the hours saved** — audit trail, citation coverage, onboarding time.

---

## 9.4 — The 90-Day Path

```
DAYS 1–14   FOUNDATIONS  (Volume 1)
  Tokenise the same sentence in English and Hindi; compare counts.
  Hand-compute the attention example in V1 §6.2 on paper.
  Compute KV cache for a model from its config.json, then verify
  against actual memory usage.

DAYS 15–28  SERVING  (Volume 2)
  Run a small model locally with vLLM. Measure TTFT and TPOT.
  Change --max-model-len and watch concurrency change.
  Restructure a prompt for cache stability and measure the hit rate.
  Build the cascade with a quality gate; measure the escalation rate.

DAYS 29–49  RETRIEVAL  (Volume 3)   ← the longest block, deliberately
  Ingest 200 real documents.
  Measure Recall@20 with naive fixed chunking. Write the number down.
  Add contextual retrieval. Re-measure.
  Build HNSW; measure its recall against a flat index across ef_search.
  Add BM25 and RRF. Add reranking. Add the abstention floor.
  ★ Record the recall number after every single step. This week
    teaches more than any other.

DAYS 50–63  AGENTS  (Volume 4)
  Build an MCP server with three tools.
  Build an agent with checkpointing, three budget caps, and a
  human gate.
  Inject tool failures until it breaks. Fix it. Repeat.

DAYS 64–77  EVALUATION AND SECURITY  (Volume 5)
  Build a 100-case golden set including 10% unanswerable.
  Write a judge; calibrate it; compute Cohen's kappa.
  Wire the quality gate into CI with a slice-regression check.
  Run the OWASP lists against your own build.
  Write an injection suite. Try to exfiltrate from your own system.

DAYS 78–90  GOVERNANCE AND PACKAGING  (Volume 6)
  Write the model card, the AIBOM, and the audit evidence pack for
  what you built.
  Containerise with every version pinned.
  Write the ROI note as though presenting it.
  Present the whole thing in ten slides to someone non-technical.
```

**The last item is the real test.** If you cannot explain the system, its limits, its costs and its controls to a business audience in ten slides, you do not yet understand it well enough.

---

## 9.5 — Glossary

**A2A** agent-to-agent protocol · **ACL** access control list · **Adapter** LoRA weight file · **AIBOM** AI bill of materials · **Alignment** SFT/DPO/RLHF stage shaping behaviour · **ANN** approximate nearest neighbour · **Arithmetic intensity** FLOPs per byte moved · **ASI01–10** OWASP agentic risk identifiers · **Attention** mechanism letting each token weight every other · **AWQ** activation-aware weight quantisation · **Backpropagation** computing gradients backwards through a network · **BF16** brain float 16, the training standard · **BM25** keyword ranking with saturation and length normalisation · **BPE** byte-pair encoding · **Bi-encoder** encodes query and document separately · **Causal mask** prevents a token seeing later tokens · **Checkpointer** persists agent state after every step · **Chunking** splitting documents into retrievable units · **Cohen's kappa** chance-corrected agreement · **Compaction** summarising history to reclaim context · **Constrained decoding** grammar-masked sampling · **Context engineering** allocating the window budget · **Context window** maximum tokens per call · **Continuous batching** rebuilding the batch every decode step · **Contextual retrieval** prepending situating context before embedding · **Cosine similarity** normalised dot product · **Cross-encoder** scores query and document together · **DCG/NDCG** rank-weighted relevance metrics · **Decode** generating one token at a time; memory-bound · **DPDP Act** India's data protection law, 2023 · **DPO** direct preference optimization · **Dot product** element-wise multiply and sum · **Embedding** text represented as a vector · **FLOP** one floating-point operation · **FlashAttention** tiled attention that never materialises the full grid · **FP8** 8-bit float, the 2026 inference default · **FREE-AI** RBI's AI framework, August 2025 · **GGUF** quantised file format for CPU and edge · **GQA** grouped-query attention · **Gradient** direction a parameter should move · **GraphRAG** graph-structured retrieval · **GRPO** group relative policy optimization · **Guardrail** deterministic input/output check · **HBM** high-bandwidth memory on the accelerator · **HITL** human in the loop · **HNSW** hierarchical navigable small world index · **HyDE** searching with a hypothetical answer's embedding · **Hybrid search** dense plus sparse, fused · **Idempotency key** token making a retry safe · **Inference** running a trained model · **KV cache** stored attention state per token · **Least agency** minimum-permission principle for agents · **Lethal trifecta** private data + untrusted content + external communication · **Logits** raw scores before softmax · **LoRA** low-rank adaptation · **Lost in the middle** U-shaped long-context accuracy · **Macro-F1** class-balanced classification metric · **Matryoshka** embeddings whose leading dimensions are independently valid · **MCP** Model Context Protocol · **MLA** multi-head latent attention · **MoE** mixture of experts · **MRR** mean reciprocal rank · **MRTR** multi round-trip requests · **NF4** 4-bit format matched to weight distribution · **NPU** neural processing unit · **OTel** OpenTelemetry · **PagedAttention** block-based KV memory management · **Parameter** one learned number in a model · **PEFT** parameter-efficient fine-tuning · **pgvector** Postgres vector extension · **Prefill** processing the whole prompt in parallel; compute-bound · **Prompt caching** reusing computed prefix state · **Quantisation** storing weights in fewer bits · **RadixAttention** trie-based cross-request prefix reuse · **RAG** retrieval-augmented generation · **Reasoning model** one with an inference-time thinking budget · **Recall@k** fraction of relevant items in the top k · **Reranking** precise second-stage relevance scoring · **Residual connection** adding a layer's input back to its output · **RLHF** reinforcement learning from human feedback · **RMSNorm** root-mean-square normalisation · **RoPE** rotary position embedding · **RRF** reciprocal rank fusion · **Sampling** choosing the next token from a distribution · **Self-consistency** majority vote over k samples · **SFT** supervised fine-tuning · **SGLang** inference engine with RadixAttention · **Softmax** turning scores into probabilities summing to one · **Speculative decoding** draft-then-verify, provably lossless · **Streamable HTTP** MCP's remote transport · **Systolic array** dataflow matrix hardware · **Temperature** sampling randomness dial · **Tensor** grid of numbers of any dimensionality · **TF-IDF** term frequency × inverse document frequency · **Token** the model's unit of text · **Tool calling** structured function request from a model · **TPOT** time per output token · **Trace** full nested record of one request · **TTFT** time to first token · **vLLM** inference engine with PagedAttention · **Vector** ordered list of numbers

---

## 9.6 — Sources and Re-Verification

| Subject | Where to check | Cadence |
| :--- | :--- | :--- |
| Model landscape, prices, context windows | Provider pricing pages; public leaderboards | **Monthly** |
| Tool-protocol specification | The protocol's official specification and changelog | Quarterly |
| OWASP LLM and Agentic Top 10 | The OWASP GenAI Security Project | Annually |
| EU AI Act timeline and guidance | European Commission digital strategy pages | **Quarterly** |
| RBI frameworks and Master Directions | rbi.org.in | **Quarterly** |
| Serving engine features and vulnerabilities | Project release notes and security advisories | **Monthly** |
| Agent framework landscape | Framework changelogs | Quarterly |

**A standing instruction.** Where this textbook states a number, treat it as a starting point for your own measurement, not as a citation. The structural material — attention arithmetic, KV cache sizing, the retrieval architecture, the lethal trifecta, the separation of decision and language layers — will hold. The landscape will not.

---

## CLOSING

The stack begins with electrons moving through a matrix-multiply unit and ends with a credit analyst who trusts a citation enough to sign a file.

Between those two points sit tokenisers, attention kernels, paged memory, hybrid retrieval, cross-encoders, stateless protocols, checkpointed graphs, guardrails, evaluation harnesses, and a board policy. Six volumes, and not one line of it is magic. All of it is engineering, and engineering is learnable.

The particular thing you now have that most people do not is the **whole chain**. Plenty of people can prompt well. Fewer can explain why decode is memory-bound. Fewer still can size a KV cache, measure retrieval recall against a flat index, calibrate a judge, name which leg of the lethal trifecta to break, and then explain to a model risk committee why the scorecard decides and the language model only explains.

That combination — the arithmetic at the bottom and the governance at the top, held in one head — is rare, and it is what makes someone trusted to deploy these systems where the consequences are real.

A model is a file. The stack is what makes the file accountable.

That is the whole job.

---

*The AI Engineering Textbook · Volumes 1–6 · Structural content durable; landscape content perishable — see §9.6.*
