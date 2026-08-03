---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "03"
volumeSlug: "the-customers-data"
volumeTitle: "THE CUSTOMER'S DATA"
order: 14
title: "Fixing the question"
slug: "3-11-fixing-the-question"
sectionNumber: "3.11"
part: "PART II — MAKING IT ACTUALLY WORK"
kind: "narrative"
sourceFile: "FDE_03_THE_CUSTOMERS_DATA.md"
tags: []
hasSayThis: false
wordCount: 636
status: "raw"
section: "§3.11"
summary: ""
enriched: false
---

## § 3.11 — Fixing the question

Every section so far improved the *library*. This one improves the *question*.

Underwriters ask vague, jargon-mismatched, pronoun-riddled questions, and retrieval is only as good as the query vector it starts from. Garbage question, garbage neighbours.

**Four medicines.**

**1 — Query expansion.** One cheap LLM call turns the phrasing into two or three *alternate phrasings*: layman to jargon, jargon to layman, synonyms swapped. Run retrieval for all variants, fuse with — of course — **RRF**, the same pure function, reused verbatim on multi-query lists. This exact combination ships in frameworks as "multi-query retrieval," and you already own both halves.

**2 — Conversational rewriting.** In chat, the killer isn't vocabulary — it's *context-dependence*. "What about his other debts?" is unsearchable; *his* lives three turns back. Before retrieval, an LLM call sees recent history plus the new message and emits a **standalone query**.

Mechanical, unglamorous, and **the single highest-value query fix in any conversational RAG.**

**3 — Query decomposition.** "Compare the stated income to what the bank statements support" is *two* retrievals wearing one question's clothes. No single query vector lands on both partitions well. Decompose into sub-queries, retrieve per sub-query, pool the chunks, answer over the union.

This handles questions whose parts are *independent*. § 3.12 handles parts that *depend on each other*. Draw that line now.

**4 — HyDE, the counterintuitive star.**

The problem is § 3.4's asymmetry: questions and answers are different kinds of text. HyDE's move: ask an LLM to **write a fake answer** to the query — a plausible, freely-hallucinated paragraph in the *style of the corpus* — then **embed the fake answer instead of the question** and retrieve with that.

```
QUERY:  is the applicant overextended

HYDE FAKE ANSWER (generated, discarded after embedding):
  "Aggregate revolving utilisation is 87% across four open accounts.
   Total monthly obligations of $2,840 against verified monthly income
   of $8,033 yields a debt-to-income ratio of 35.4%. Two 30-day
   delinquencies appear within the last 24 months."

RETRIEVAL WITH FAKE ANSWER:
  0.891  [c14]  credit_report.pdf p3  "Total monthly obligations (excluding..."
  0.874  [c41]  credit_report.pdf p2  "Revolving utilisation: 87% ..."

RETRIEVAL WITH RAW QUESTION (for comparison):
  0.702  [c19]  employment.pdf p1     "Employed since 2019 ..."
  0.688  [c14]  credit_report.pdf p3  "Total monthly obligations (excluding..."
```

**MENTAL TRACE — and this is the beautiful part.**

Every number in the fake answer is invented. 87%, $2,840, 35.4%, two delinquencies — the model made them up, and it doesn't matter at all.

What matters is the *form*: the vocabulary (utilisation, obligations, debt-to-income, delinquencies), the register, the sentence shapes. That text looks like a real credit-report passage, so its embedding lands in the neighbourhood where real credit-report passages live.

**You threw a decoy shaped like the target.** The retrieved chunks are real. The fake answer is discarded. Generation proceeds grounded as always.

Compare the score columns: with the raw question, the top hit is an irrelevant employment letter at 0.702 and the real answer sits second at 0.688. With HyDE, both genuinely relevant chunks score above 0.87 and the employment letter falls away entirely.

**Hallucination, weaponised for good — used only where being wrong is safe (locating a neighbourhood) and never where truth matters (the final answer).** That sentence is the whole trick, and it is a genuinely great thing to be able to explain.

**Costs:** an extra LLM call of latency. And HyDE can *underperform* plain retrieval when queries are already in corpus dialect, because the decoy adds noise. Adopt by evidence, not fashion.

### The economics

Every medicine spends an LLM call to improve retrieval. Spend it on vocabulary-mismatched or exploratory queries. Spend conversational rewriting *always* in chat. Spend decomposition when compound structure is detected.

Don't spend it on identifier lookups — an account number needs no poetry.

**Route by query type, and spend surgery only where measurement proves it pays.**

---
