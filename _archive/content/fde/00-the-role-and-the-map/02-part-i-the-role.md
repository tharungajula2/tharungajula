---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "00"
volumeSlug: "the-role-and-the-map"
volumeTitle: "THE ROLE AND THE MAP"
order: 2
title: "PART I — THE ROLE"
slug: "part-i-the-role"
sectionNumber: null
part: "PART I — THE ROLE"
kind: "scene"
sourceFile: "FDE_00_THE_ROLE_AND_THE_MAP.md"
tags: []
hasSayThis: false
wordCount: 837
status: "raw"
section: ""
summary: ""
enriched: false
---

## PART I — THE ROLE

### What a Forward Deployed Engineer actually is

An FDE is an engineer who embeds inside a customer's organisation and makes a product work in that customer's real, hostile, undocumented environment. <cite index="1-1">The role combines software development with domain understanding and direct collaboration with end users, and typically spans the whole lifecycle of a system — requirements analysis, design, implementation, integration, and deployment.</cite>

The compressed version: **a normal engineer ships features to an anonymous user base. An FDE ships an outcome to a named customer, and owns whatever stands between the product and that outcome.**

Whatever stands in the way becomes your job. Not "that's the platform team's problem." Not "file a ticket." Yours.

### The 20/80 Law — the most important sentence in this document

<cite index="6-1">Getting a demo working in a sandbox is maybe 20% of the job. The other 80% is navigating enterprise SSO, legacy ETL pipelines, regulatory constraints like SOC 2, HIPAA and FedRAMP, data residency, and the politics of getting production credentials out of a customer's security team.</cite>

Sit with that, because it should reorganise how you value your own study time.

Almost everyone teaching themselves AI engineering right now is optimising the 20%. They are getting very good at prompts, RAG chunking strategies, and agent frameworks — the part that produces a working demo. That skill has become abundant. It is not what gets you hired and it is definitely not what gets a deployment past a lender's security review.

The 80% is where the scarcity lives, and it is the least glamorous material you own: Volume 09. FastAPI, Docker, Postgres, OAuth, secrets management, multi-tenancy, rollback drills, SLOs. That volume is the largest in your set (38 chapters) and it is the one you were most likely to skip. In this curriculum it is load-bearing.

### The other non-negotiable: evaluation

<cite index="4-1">Frontier labs treat evaluation-driven thinking — building eval suites that catch hallucinations, regressions, and grounding gaps before they reach production — as a non-negotiable skill, not a nice-to-have.</cite>

There is a reason this is the hard gate rather than a preference. In a customer's building you will be asked, out loud, in front of people who can cancel the contract: *"How do you know it's right?"* If your answer is "I tried a bunch of examples and it looked good," you are not an FDE. You are a demo. Volume 07 material becomes Document 05 of this set and it is treated as seriously as the code.

### Where the role lives

<cite index="6-1">FDEs are hired by AI labs (OpenAI, Anthropic — where the role is often called Applied AI Engineer — Cohere, Scale AI), data and AI platforms (Palantir, which originated it, plus Databricks and Snowflake), vertical AI startups (Sierra, Harvey, Decagon, Cognition), established giants like Adobe and Stripe, and cloud and consulting firms. New York has overtaken San Francisco as the largest US hub, largely because regulated industries hire more of them.</cite>

Read that last clause again, because it is a strategy, not a trivia fact. **Regulated industries hire the most FDEs.** Banking, lending, insurance, healthcare. Regulated means hard, and hard means they must hire someone to come sit with them. It is also where the fewest self-taught engineers are willing to go, because the compliance surface is intimidating.

That is precisely why the case study in this set is a lender.

### The honest part

I am not going to tell you this is easy or fast, because you are making a real bet with real stakes.

<cite index="4-1">Most FDE postings ask for 5+ years of engineering or technical deployment experience, often customer-facing, with the ability to write and review production-grade code across frontend and backend.</cite>

That is the front door, and for most people it is closed. So the plan does not aim at the front door. Three routes actually open:

**Route 1 — Evidence over credentials.** The bar is "can you demonstrate a link between your deployments and a customer outcome." That is provable without a title, but only with artifacts: a deployed, monitored, evaluated system somebody other than you uses. This is why `[RECEIPT]` markers exist in these documents. Reading builds understanding; understanding without artifacts does not clear a screen designed to filter for shipping.

**Route 2 — The adjacent door.** Solutions Engineer, Implementation Engineer, AI Engineer, Integration Engineer at a smaller AI company. Same work, less competition, no 5-year gate. The FDE title is downstream of doing the work for eighteen months somewhere less famous.

**Route 3 — Domain leverage.** An engineer who already speaks credit risk — who knows what an adverse action notice is, why a ZIP-code feature is dangerous, what a validation team will demand — is worth more to a lending deployment than a stronger generalist engineer who doesn't. Domain knowledge is the cheapest edge available to you, because it is learned by reading and almost nobody bothers.

This set is built to serve all three at once. That is the design.

---
