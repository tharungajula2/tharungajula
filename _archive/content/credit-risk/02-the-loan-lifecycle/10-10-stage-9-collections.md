---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "02"
volumeSlug: "the-loan-lifecycle"
volumeTitle: "THE LOAN LIFECYCLE"
order: 10
title: "STAGE 9 — COLLECTIONS"
slug: "10-stage-9-collections"
sectionNumber: "10"
part: null
kind: "narrative"
sourceFile: "CR_02_THE_LOAN_LIFECYCLE.md"
tags: []
hasSayThis: true
wordCount: 950
status: "raw"
section: "§10"
summary: ""
enriched: false
---

# §10 · STAGE 9 — COLLECTIONS

## 10.1 The decision

How do we cure this account before it hardens — and at what cost, given that collections spend must be justified by incremental recovery?

## 10.2 The bucket structure

Collections is organised by delinquency bucket, and the treatment changes completely as the account moves through them.

| Bucket | Typically | Treatment | Objective |
|:--|:--|:--|:--|
| **X / current** | Bounced but within the month | Automated reminder, re-presentation | Cure without contact |
| **Bucket 1** | 1–30 DPD | Tele-calling | Cure |
| **Bucket 2** | 31–60 DPD | Tele plus field visit | Cure |
| **Bucket 3** | 61–90 DPD | Field, escalation, settlement discussion | Prevent NPA |
| **Post-NPA / hard** | 90+ DPD | Legal, repossession, settlement, sale | Recover |

📘 **The economics that shape everything here.** The probability of curing an account falls sharply with each bucket, while the cost of pursuing it rises. Roughly: a Bucket 1 account is mostly a *forgetting* or *timing* problem and cures cheaply; a Bucket 3 account is mostly an *ability* problem and cures rarely. **This is why collections capacity is disproportionately allocated to early buckets and why "roll rate from Bucket 1 to Bucket 2" is the single most watched operational metric in a retail collections shop.**

And it is why Document 01's small-ticket products have structurally high PAR: chasing a ₹3,000 EMI costs nearly what chasing a ₹30,000 EMI costs, so the economically rational collections effort per account is lower and more accounts roll.

## 10.3 The collection scorecard

Ranks delinquent accounts by likelihood of cure, and by likely response to different treatments. Its purpose is **allocation** — which accounts get a call, which get a visit, which go straight to settlement discussion, which are not worth pursuing at all. It is the least glamorous and among the highest-ROI models in a retail lender, because collections capacity is a hard constraint and misallocating it is pure waste.

## 10.4 Conduct rules , with a live draft 

Recovery agent conduct was governed by the outsourcing instruction of 12 August 2022 and the Fair Practices Code. Both have now been **consolidated into the Responsible Business Conduct Directions, 2025**, which cover DSA, DMA and recovery agent responsibilities alongside everything else in §2.3.

What is required:

- **The lender is accountable for the agent's conduct.** This is not delegable, and RBI enforcement has been real — penalties have been imposed on large NBFCs specifically for recovery agent conduct.
- **Certification and training.** Agents are expected to hold certification from the Indian Institute of Banking and Finance.
- **An undertaking** from every agent to abide by the code of conduct, plus confidentiality obligations.
- **Restricted contact hours**, commonly stated as 8 a.m. to 7 p.m.
- **Prohibition on intimidation, harassment, public shaming and contacting third parties** to apply social pressure.
- **Due process before taking possession** of secured assets.
- **Grievance redressal**, with escalation to the RBI's Integrated Ombudsman via the CMS portal where a complaint is unresolved after 30 days.

And from the Digital Lending Directions, specific to app-based lenders: **no access to the borrower's contact list, photographs or location data for recovery purposes.** This provision exists because the practice was widespread and caused documented harm.

`[DRAFT]` The RBI issued draft **Second Amendment Directions** on recovery conduct — on 12 February 2026 for RRBs, UCBs, LABs and HFCs, and on 20 May 2026 for NBFCs — proposing a substantially expanded framework: formal board-approved recovery policies, due-diligence and eligibility criteria for agents, mandatory disclosure of engaged agents to borrowers, **documentation and recording of recovery calls**, restrictions on how much borrower information may be shared with an agent, discouragement of contacting relatives or third parties, and prescribed monitoring and penal action for non-compliant agents. Proposed effective date: **1 July 2026.**

⚠️ `[VERIFY]` That date has passed and I have not confirmed finalisation. The correct thing to say in a room is that the framework is being tightened, that the draft proposed a 1 July 2026 effective date, and that you would confirm the current status — **not** to state it as live.

## 10.5 Settlement, and the cost nobody prices

A settlement closes the account for less than the full outstanding. It is often the economically correct decision for the lender. Two consequences to hold:

**For the borrower**, the account is reported as **settled** rather than closed, and that flag persists for years — Document 02 §5.2. Borrowers frequently do not understand this at the point of agreeing.

**For the lender**, settlement recovery rates are a direct input to LGD. A book where a large share of resolution comes through settlement rather than full recovery has a structurally higher LGD than its collateral position implies, and if your LGD estimate is built on collateral values rather than observed resolution outcomes, it is wrong.

**► SAY THIS**
> "Collections is an allocation problem under a hard capacity constraint. Cure probability falls sharply by bucket while cost per account rises, so the return on effort is concentrated in Buckets 1 and 2 — which is why the Bucket 1 to Bucket 2 roll rate is the metric a collections floor actually runs on. It's also the structural reason small-ticket products carry higher PAR: chasing a ₹3,000 EMI costs about what chasing a ₹30,000 one costs, so the rational effort per account is lower and more accounts roll. On conduct, the rules have been consolidated into the Responsible Business Conduct Directions of 2025, and there's a draft second amendment on recovery agents that proposed 1 July 2026 — I'd check whether that's been finalised before relying on it."

---
