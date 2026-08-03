---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "04"
volumeSlug: "the-loop"
volumeTitle: "THE LOOP"
order: 4
title: "ReAct, by hand"
slug: "4-2-react-by-hand"
sectionNumber: "4.2"
part: "PART I — THE LOOP"
kind: "narrative"
sourceFile: "FDE_04_THE_LOOP.md"
tags: []
hasSayThis: false
wordCount: 487
status: "raw"
section: "§4.2"
summary: ""
enriched: false
---

## § 4.2 — ReAct, by hand

Before you automate a machine, you crank it by hand.

**ReAct** — Reasoning plus Acting — interleaves explicit thought with action in a rigid textual format. The rigidity is the point, because your code will *parse* this format.

```
Thought: I need the stated income before I can compare anything.
Action: search_file
Action Input: {"applicant_id": "A-4417", "query": "stated annual income"}
Observation: [doc: application.pdf, page: 3] Stated annual income: 120,000

Thought: Now I need third-party evidence of actual income.
Action: search_file
Action Input: {"applicant_id": "A-4417", "query": "adjusted gross income tax transcript", "doc_type": "tax_transcript"}
Observation: [doc: tax_2025.pdf, page: 1] Adjusted gross income 96,400

Thought: 120,000 vs 96,400 is a 19.7% gap, above the 10% threshold. I have what I need.
Final Answer: Income discrepancy of 19.7% between stated (120,000) and verified (96,400).
```

**MENTAL TRACE.** Three line types, and each signals something different to the orchestrator.

A **Thought** line means *append and continue* — it's the model's working memory made visible. Recall the mechanism from § 2.5: generated text enters the context and conditions everything after. A written thought is not decoration; it changes what gets generated next.

An **Action** plus **Action Input** pair means *stop generation, execute, return an observation.*

A **Final Answer** means *stop the loop.*

ReAct is a **protocol between model and orchestrator**, and protocols live or die on parseability. That's why the format is rigid, and it's why § 4.4 will spend real effort on a parser.

### What running it by hand teaches

Three sensations, each of which becomes a later section.

**The observation quality problem.** When a search returns junk, you feel the urge to re-search with better terms. That urge is query surgery from § 3.11, and it lives inside agents too.

**The termination temptation.** Around step four you'll feel the pull to just answer from vibes rather than verify. In a model, that pull is *premature termination*. Its opposite — endless verifying — is the *infinite loop*. Twin diseases, previewed in your own psychology.

**Context growth.** Watch the transcript fill. Every thought, action, and observation rides in the context forever. Agents are context-hungry, and § 4.11 prices it.

**THE DEPLOYMENT LENS.** Run the loop by hand *on a real Meridian file with Tom watching*, before you build anything.

Two things happen. You discover the tools you actually need rather than the ones you imagined — Tom will say "you'd want to check whether that tradeline was disputed" and you'll realise you have no tool for that. And Tom sees the machine's reasoning in a form he can criticise, which converts him from a subject of the project into a co-designer of it.

**Half of good tool design comes from watching a domain expert do the task and writing down every question they ask.** That's not a technique, it's an hour of your time, and it is the highest-return hour in the entire deployment.

---
