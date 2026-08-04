---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "06"
volumeSlug: "the-hostile-world"
volumeTitle: "THE HOSTILE WORLD"
order: 14
title: "PII redaction"
slug: "6-11-pii-redaction"
sectionNumber: "6.11"
part: "PART II — THE DEFENCES"
kind: "narrative"
sourceFile: "FDE_06_THE_HOSTILE_WORLD.md"
tags: []
hasSayThis: false
wordCount: 402
status: "raw"
section: "§6.11"
summary: ""
enriched: false
---

## § 6.11 — PII redaction

PII that never enters the context **can't be leaked by the model, can't be stored in traces, can't be exfiltrated by an injection, and can't be inappropriately remembered.**

Redacting at the *input boundary* is strictly safer than trusting the model not to misuse PII it received. It's the least-data principle as an active control.

**Detection** — patterns for structured PII (emails, phones, government ids, card numbers have recognisable formats, high precision), NER classifiers for unstructured PII (names, locations, organisations), and context.

**Handling** — redaction, masking, **tokenisation/pseudonymisation**, or hashing.

**Pseudonymisation is usually best for this shape of system:** replace with a consistent placeholder so the model can still *reason* coherently without knowing who it's reasoning about, then **re-hydrate** on the way out.

```
INPUT (raw)
  "Adaeze Okonkwo, of 4417 Ridgeway Ave, Bronx NY 10456, employed at
   Beltline Freight since 2019. SSN xxx-xx-4417."

INPUT (to model)
  "[PERSON_1], of [ADDRESS_1], employed at [ORG_1] since 2019.
   SSN [GOVID_1]."

MODEL OUTPUT
  "[PERSON_1] has verifiable employment at [ORG_1] for 6 years. Stability
   supports the stated income; no employment gap identified."

RE-HYDRATED (to human, outside the model)
  "Adaeze Okonkwo has verifiable employment at Beltline Freight for 6 years..."
```

**MENTAL TRACE.** The model reasons about `[PERSON_1]` and `[ORG_1]` perfectly well — employment duration, stability, consistency with stated income. **None of that reasoning required knowing the name.**

The mapping lives *outside* the model. It's applied on the way out, in code.

And now trace what this bought you against the § 6.6 trifecta: the "private data" ingredient shrank. An injection that successfully exfiltrated the model's entire context would obtain pseudonyms, not identities.

Note the address, though. Hold that thought for four sections, because **`[ADDRESS_1]` was removed for privacy reasons and it turns out to matter enormously for a different reason.**

### The honest limits

*Detection recall* — you can't redact what you don't detect. Unusual names, novel formats, PII in unexpected places slip through.

*False positives* — over-redaction destroys utility.

*Context loss* — aggressive redaction can strip information the task needed.

*Re-identification* — pseudonymised data can sometimes be re-identified by combining quasi-identifiers. "PERSON_1, a 34-year-old cardiologist in a town of 9,000" may be uniquely identifying with no name at all.

**Redaction reduces risk; it doesn't eliminate it.** Measure detection recall per PII type on a labelled test set and report it, because a redactor you haven't measured is a promise you can't keep.

---
