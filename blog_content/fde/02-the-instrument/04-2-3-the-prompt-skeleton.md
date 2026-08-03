---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "02"
volumeSlug: "the-instrument"
volumeTitle: "THE INSTRUMENT"
order: 4
title: "The prompt skeleton"
slug: "2-3-the-prompt-skeleton"
sectionNumber: "2.3"
part: null
kind: "narrative"
sourceFile: "FDE_02_THE_INSTRUMENT.md"
tags: []
hasSayThis: false
wordCount: 642
status: "raw"
section: "§2.3"
summary: ""
enriched: false
---

## § 2.3 — The prompt skeleton

Bad briefs get bad work, from humans and models alike. "Write something about our product" fails everywhere. A good brief names *who you are, what you're given, what exactly to do, and what the deliverable looks like*.

Stop writing prompts. Start filling skeletons: **Role + Context + Task + Format.**

**ROLE** — who the model should be. This sets vocabulary, depth, and priorities in one line, by biasing which regions of the training distribution the model writes from.

**CONTEXT** — what the model needs to know: the input data, background, constraints. This is the whiteboard being loaded deliberately. **Delimit it clearly** — XML-ish tags like `<document>...</document>` — so instructions and data can't smear together. That habit is a quality practice and a security practice at the same time.

**TASK** — the verb, precisely. Several small clauses beat one foggy sentence.

**FORMAT** — the shape of the deliverable. Uncontrolled format is the number one source of "the model rambled," and the fix was always one missing sentence.

Here is the skeleton filled for Meridian. This prompt, refined, is the actual product.

```
[ROLE]    You are a credit analyst assistant. You extract and summarise facts from
          loan documentation. You never render a credit decision and never recommend
          approval or denial.

[CONTEXT] Below are excerpts from a loan file, each tagged with its source document
          and page number. Today's date is 2026-07-29.
          <excerpts>
          [doc: bank_stmt_apr.pdf, page: 2] Ending balance 14,220.18 ...
          [doc: tax_2025.pdf, page: 1] Adjusted gross income 96,400 ...
          [doc: application.pdf, page: 3] Stated annual income: 120,000 ...
          </excerpts>

[TASK]    Extract verified income, total monthly debt obligations, and FICO score.
          Compute debt-to-income ratio from verified figures only.
          Flag any discrepancy greater than 10% between stated and verified income.
          For every extracted number, record the source document and page it came from.
          If a value is not present in the excerpts, return null. Do not estimate,
          infer, or use general knowledge to fill a gap.

[FORMAT]  Respond with only a JSON object matching the provided schema.
          No prose before or after.
```

**MENTAL TRACE of what each bone is doing here.** ROLE constrains the model away from the one behaviour that would end the project — rendering a decision. CONTEXT wraps the untrusted document text in tags so the model can tell data from instruction, and stamps today's date so it doesn't reason from a stale internal sense of "now." TASK carries the anti-hallucination clause — *return null, do not estimate* — which is where Document 01's hallucination section becomes daily practice. FORMAT kills the preamble.

Notice the discrepancy clause. Stated income 120,000 versus verified AGI 96,400 is a 20% gap. That's not a bug in the file — **it is the single most useful thing an underwriter wants surfaced**, and you only get it because you wrote it into TASK.

**Where the bones live in a real app.** ROLE and standing FORMAT rules go in the *system prompt*. Per-request CONTEXT and TASK arrive in the *user message*, usually through a **prompt template** — a skeleton with `{placeholders}` filled by code.

The moment prompts become templates, they become **versioned artifacts**. Commit them, diff them, review them in pull requests. Every framework's `PromptTemplate` class is just this idea with packaging.

**THE DEPLOYMENT LENS.** At Meridian the prompt is a governed document, not a code detail. Marcus in Model Risk will eventually ask to see it, and he will ask *when it last changed and who approved the change*. If your prompts live in a versioned file with a review history, that's a five-minute conversation. If they live as string literals scattered through the code and edited on a whim, it's a finding.

Put the prompts in one directory. Version them. Diff them in reviews. This costs you nothing on day one and saves the project in month five.

---
