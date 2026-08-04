---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "03"
volumeSlug: "the-measurement-layer"
volumeTitle: "THE MEASUREMENT LAYER"
order: 5
title: "FLOW ANALYSIS AND THE BUCKET IDENTITY"
slug: "5-flow-analysis-and-the-bucket-identity"
sectionNumber: "5"
part: null
kind: "narrative"
sourceFile: "CR_03_THE_MEASUREMENT_LAYER.md"
tags: []
hasSayThis: false
wordCount: 457
status: "raw"
section: "§5"
summary: ""
enriched: false
---

# §5 · FLOW ANALYSIS AND THE BUCKET IDENTITY

Roll rates describe movement between states. Flow analysis accounts for it — and accounting for it catches what ratios hide.

## 5.1 The identity

For any delinquency bucket over a period:

> **Closing balance = Opening balance + inflow − cure − forward roll − write-off − recovery/closure**

Every rupee is accounted for. Nothing appears or disappears.

📘 **Why the identity is worth more than any single ratio.** A bucket balance can be flat for two opposite reasons: nothing is happening, or large inflow is being exactly offset by large cure and write-off. Those are different portfolios with different economics and different futures, and **a snapshot cannot distinguish them.** The identity forces the distinction into the open.

## 5.2 Net flow, and the number to report

**Gross inflow** — new rupees entering the bucket — is the demand on collections. **Net flow** — inflow minus cure — is what the portfolio is actually accumulating.

✅ Report both. Rising gross inflow with a rising cure rate is a collections operation working harder and succeeding. Flat gross inflow with a falling cure rate is a collections operation quietly failing. **Both can produce an unchanged bucket balance, and only one of them is a problem.**

## 5.3 Reading Document 01's stuck deep buckets through this lens

Now the loop closes on the observation that ran through Documents 01 and 02.

Personal loan PAR 180+ flat at **5.3%**. Credit card PAR 180+ at **6.9%**. Both stable while every early bucket improved.

Put that through the identity. For a deep bucket to be flat while inflow from upstream is *falling*, the outflow terms must also be near zero:

- **Cure ≈ 0** — because Document 02 §11.2's upgrade rule requires the entire arrears, and a borrower 180 days down rarely clears everything at once.
- **Write-off ≈ 0** — the lender has not yet taken the charge.
- **Recovery ≈ 0** — unsecured, so there is nothing to repossess; only settlement, which is slow.

**A flat deep bucket in unsecured retail is therefore not a statement about borrowers. It is a statement about the lender's write-off policy.** That pool is sitting there because it has not been recognised, and it will leave the book in a lump when it is — which is precisely the microfinance pattern from Document 01 §3.3, where about 14.1% of the opening FY25 book was written off in a single year.

🔴 The interview version: *"Why has PAR 180+ not moved while everything else improved?"* The wrong answer is "borrowers in that bucket aren't recovering." The right answer names the identity, points at write-off policy, and then asks for the write-off and settlement numbers to confirm it.

---
