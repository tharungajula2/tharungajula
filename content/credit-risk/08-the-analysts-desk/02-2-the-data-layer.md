---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "08"
volumeSlug: "the-analysts-desk"
volumeTitle: "THE ANALYST'S DESK"
order: 2
title: "THE DATA LAYER"
slug: "2-the-data-layer"
sectionNumber: "2"
part: null
kind: "narrative"
sourceFile: "CR_08_THE_ANALYSTS_DESK.md"
tags: []
hasSayThis: true
wordCount: 953
status: "raw"
section: "§2"
summary: ""
enriched: false
---

# §2 · THE DATA LAYER

Where most of the work actually is, and where nearly all the errors originate.

## 2.1 The canonical retail credit data model

Eight tables, in dependency order. If you can sketch this on a whiteboard you are ahead of most candidates.

| Table | Grain | Key contents |
|:--|:--|:--|
| **Application** | One row per application | Applicant attributes, declared income, bureau pull at decision, score, decision, **deviation flag**, approver, channel/partner |
| **Account** | One row per live loan | Product, sanction, disbursal date, tenor, rate, limit, security, current status |
| **Payment / transaction** | One row per instalment or transaction | Due date, due amount, paid amount, paid date, mandate outcome |
| **Delinquency snapshot** | One row per account **per month** | DPD, bucket, SMA/IRAC stage, outstanding, overdue |
| **Bureau** | One row per pull | Score, trades, enquiries, DPD strings — **at the date of pull** |
| **Collections** | One row per contact or action | Treatment, agent, outcome, promise-to-pay, kept/broken |
| **Collateral** | One row per security item | Type, valuation, valuation date, registration, LTV |
| **Recovery / write-off** | One row per event | Amount, date, cost, route, settlement flag |

🔴 **The single most important structural point in this document: the delinquency table must be a monthly *snapshot*, not a current-state table.**

📘 **Why.** A table that holds only the account's *current* DPD can tell you what the book looks like today. It cannot tell you what it looked like in March, and therefore it cannot produce a vintage curve, a transition matrix, a roll rate, a backtest, or a stability index. **Every technique in Documents 03 to 05 requires history, and history exists only if somebody wrote it down every month.**

⚠️ This is the commonest and most expensive data failure in Indian lending institutions, and it is unrecoverable — you cannot reconstruct a snapshot you never took. It is also the same failure Document 06 §2.3 flagged in a different guise: **origination-date PD must be retained forever, or quantitative SICR is impossible.** Same disease, two symptoms.

✅ **The architecture that solves it** is point-in-time or "as-of" storage: every attribute that changes carries a valid-from and valid-to date, so any table can be reconstructed as at any past date. In warehousing terms this is slowly-changing-dimension design. **If you join a team and find no monthly snapshots, that is the first thing to fix, before any modelling.**

## 2.2 The six recurring data problems

**1. As-of versus current.** A borrower's income field is updated when they refinance. Query it today and you get today's value — but the underwriting decision used the old one. **Modelling with current attributes against historical outcomes is a silent, severe form of leakage**, and it produces suspiciously good models. Document 04 §4.4's warning about IV above 0.50 is usually this.

**2. Restatement.** Last month's number changes when you re-run it — because of late payment postings, backdated adjustments, reclassifications. **Freeze and archive every published pack.** When someone asks in November why the June number moved, you need the June file, not a re-run.

**3. DPD calculation differences.** Different systems compute days past due differently — inclusive or exclusive of the due date, calendar or business days, FIFO appropriation or otherwise. Document 02 §9.2 established the regulatory convention: **day-end process, borrower level, FIFO.** Your analytical DPD must match the regulatory one or your numbers will never reconcile.

**4. Borrower key versus account key.** Regulatory classification is at **borrower** level (Document 02 §9.2); operational reporting is usually at account level; exposure aggregation needs the borrower. If your customer master does not reliably deduplicate, your borrower-level numbers are wrong, your concentration limits are meaningless, and — from Document 06 §7.4 — you cannot compute the housing loan count that now determines a risk weight.

**5. Closed, matured and written-off accounts.** Document 03 §2.2's denominator discipline. A denominator that drops paid-off loans while retaining bad ones inflates every ratio; one that retains everything deflates them.

**6. Product tagging.** Sounds trivial. Is not, from 1 April 2027: **prudential floors apply at product level** and risk weights depend on product classification, so a mis-tagged loan is a mis-stated provision and a mis-stated capital charge. Document 06 §5.1.

## 2.3 Reconciliation — the discipline that earns trust

🔴 **Your total portfolio outstanding must equal finance's.** Not approximately. Exactly, or with a fully explained bridge.

This sounds bureaucratic and it is the single fastest way to establish or destroy credibility. The first time a risk number is presented that does not tie to the published balance sheet, every subsequent risk number is questioned — and the questioning is correct, because if the total is wrong the composition is probably wrong too.

✅ **Build a standing reconciliation** between the risk data mart and the general ledger, run it every month before anything is published, and keep the bridge. Typical reconciling items: interest accrued but not due, unamortised fees under EIR (which grows in importance from 2027 — Document 06 §4.3), inter-branch and inter-system timing, securitised or assigned pools, and written-off accounts retained in one system and not the other.

**► SAY THIS**
> "The first thing I'd want to know about a new portfolio is whether monthly snapshots exist, because almost everything in retail credit analytics — vintage curves, transition matrices, backtesting, stability monitoring — requires history, and history only exists if someone wrote it down every month. It's also unrecoverable; you can't reconstruct a snapshot you never took. The second thing is whether the risk data mart reconciles to the general ledger, because if the total doesn't tie, nobody has any reason to believe the composition."

---
