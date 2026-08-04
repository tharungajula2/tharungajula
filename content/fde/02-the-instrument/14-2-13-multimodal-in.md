---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "02"
volumeSlug: "the-instrument"
volumeTitle: "THE INSTRUMENT"
order: 14
title: "Multimodal in"
slug: "2-13-multimodal-in"
sectionNumber: "2.13"
part: null
kind: "narrative"
sourceFile: "FDE_02_THE_INSTRUMENT.md"
tags: []
hasSayThis: false
wordCount: 659
status: "raw"
section: "§2.13"
summary: ""
enriched: false
---

## § 2.13 — Multimodal in

Until now your model was a brilliant pen-pal: words in, words out. Modern frontier models also *see*. And the profound part for an engineer: **an image is just another content block in the message.** Everything you've built — skeletons, schemas, validation, the gateway — applies unchanged.

Vision isn't a new API. It's a new input type for the API you already command.

**Mechanics.** Message content becomes a mixed list: text blocks and image blocks. Images travel as base64 bytes in the request, or by reference to a previously uploaded file. Multiple images per message are fine. And one sequencing tip that measurably helps: **image first, then the question about it.**

```python
import base64

with open("bank_stmt_apr.jpg", "rb") as f:
    b64 = base64.standard_b64encode(f.read()).decode()

resp = client.messages.create(
    model="claude-sonnet-4-5", max_tokens=800,
    messages=[{"role": "user", "content": [
        {"type": "image", "source": {"type": "base64", "media_type": "image/jpeg", "data": b64}},
        {"type": "text", "text": "Extract ending balance, statement period, and total deposits. "
                                 "JSON only. Use null for anything not clearly legible. Do not estimate."},
    ]}],
)
print(resp.content[0].text)
```

**OUTPUT**
```
{"ending_balance": 14220.18, "period_start": "2026-04-01", "period_end": "2026-04-30", "total_deposits": 7900.00}
```

**MENTAL TRACE.** `open(..., "rb")` reads the file in **binary** mode — images aren't text, so `"r"` would fail. `base64.standard_b64encode` converts raw bytes into a form that survives being embedded in JSON; `.decode()` turns those bytes into a string the JSON body can carry.

The content is now a **list of two blocks**: an image block, then a text block. Image first, question second. The model sees the pixels, then the instruction about them.

And look at the text block — it's a CONTEXT-TASK-FORMAT skeleton with the anti-guessing clause, aimed at pixels. Your whole toolkit, unchanged.

**What vision models are good and bad at.** Strong: describing scenes, reading clear printed text (receipts, statements, screenshots — the OCR-ish workhorse of enterprise use), reading charts and tables into data, UI understanding.

Weak — and each weakness should sound familiar: **counting** many similar objects (perception isn't enumeration), precise spatial or measurement claims, tiny or blurry text, and above all **visual hallucination** — asked about something absent, the model may confidently describe it anyway. Document 01's law crossed into pixels intact, and so did the medicine: *answer only from what is clearly visible; say null otherwise.*

**Tokens didn't go away.** Images are billed as tokens, and cost scales with resolution — a detailed photo can cost hundreds to a couple of thousand tokens. Downscale before sending when detail permits. Use file references over re-uploading base64 every turn.

**And the security instinct from the last section fires here too.** Text inside an image is a known indirect-injection channel. A scanned document is untrusted input in exactly the same way a text document is — arguably more so, because the payload is invisible to anyone scanning the file list.

**THE DEPLOYMENT LENS.** Half of Meridian's loan file is scans. Bank statements faxed by a branch. Photographed tax documents. A business plan someone printed, signed, and re-scanned at an angle.

Three things follow, and they will consume more of your schedule than you expect:

**Quality varies enormously and you must measure it, not assume it.** Build a small set of *deliberately bad* scans — skewed, low-contrast, partially cut off — and know your accuracy on them before you promise anything. The clean sample they emailed you is not the distribution.

**The counting weakness is live.** "How many deposits over $5,000?" against a statement image is exactly the failure mode. Extract the rows into structured data first, count in code. Same rule as § 2.7, different sense.

**Injection via scanned document is the same attack with a better hiding place.** An applicant who prints a line of instruction text in six-point grey at the bottom of a page has smuggled it past every human who glanced at the file. It goes through your hardened prompt and your closed enum like everything else — which is the argument for those defences, restated in pixels.

---
