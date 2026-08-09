---
title: "NOTE 002: THE AI ENGINEERING TEXTBOOK — VOLUME 2"
subtitle: "Serving and Cost: Making the Loop Fast Enough and Cheap Enough"
date: "2026-08-09"
order: 2
tags: ["AI Engineering", "Inference", "Serving", "KV Cache", "Quantisation"]
---

# THE AI ENGINEERING TEXTBOOK
## Volume 2 — Serving and Cost: Making the Loop Fast Enough and Cheap Enough

---

## BEFORE YOU START

This volume assumes Volume 1. Specifically it assumes you can state, without looking:

- What a forward pass is, and that it produces exactly **one token** (V1 §6.9)
- Why decode is **memory-bandwidth-bound** rather than compute-bound (V1 §8.3)
- What the **KV cache** is and the formula for its size (V1 §7.2)
- That **quantisation** buys concurrency as well as speed (V1 §8.4)

If any of those four are shaky, go back. Everything here is built on them, and this volume will not re-derive them.

The layer markers are unchanged: **[CORE]** must land, **[WORKING]** is needed to build, **[DEEPER]** is safe to skip on a first pass, **[RETURN HERE]** flags something you will need again.

### What this volume is for

Training is a capital expense someone else already paid. **Inference is your operating expense, forever.** A system that costs ₹4 per query at 200,000 queries a month costs ₹96 lakh a year. The same system engineered properly costs ₹1.30 per query and ₹31 lakh a year, with better latency.

That gap is not exotic. It comes from six or seven decisions, all covered here, none of which require touching the model.

---

# PART 1 — THE TWO PHASES

## 1.1 — Prefill and Decode, Precisely **[CORE]**

**What this section gives you.** The division that explains every serving problem you will encounter. Once you can classify a symptom as a prefill problem or a decode problem, the fix is nearly always obvious.

### The division

Generating a response has two phases with opposite hardware profiles.

**Prefill** processes your entire prompt in one pass. All 6,000 tokens of retrieved evidence, policy text and question go through the forward pass together (V1 §6.9). Attention scores every token against every token — the `n²` grid from V1 §6.2 — and all of it computes in parallel because every token is already known.

**Decode** produces the answer one token at a time. Token 1 is generated, appended, and the model runs again to produce token 2. Nothing about this can be parallelised, because token 2 depends on token 1 having been chosen.

| | **PREFILL** | **DECODE** |
| :--- | :--- | :--- |
| Input | Your whole prompt | One token, plus the cache |
| Parallelism | Full sequence at once | Strictly sequential |
| Bottleneck | **Compute (FLOPs)** | **Memory bandwidth** |
| GPU utilisation | 70–95% | Often **below 20%** |
| Cost scaling | Grows with the square of prompt length | Linear in output length |
| The number it drives | **Time to first token** | **Time per output token** |
| What the user perceives | "Is this thing broken?" | "Is this thing fast?" |
| Fixed by | Prompt caching, chunking, more FLOPS | Quantisation, batching, speculation, GQA |

### The arithmetic behind the asymmetry

Take a 6,000-token prompt to a 70B model at 1 byte per parameter.

**Prefill:**
```
FLOPs ≈ 2 × parameters × tokens
      = 2 × 70×10⁹ × 6,000
      = 8.4 × 10¹⁴  =  840 teraFLOPs

Weights read from memory: 70 GB, once, for all 6,000 tokens.
Arithmetic intensity = 840×10¹² FLOPs ÷ 70×10⁹ bytes = 12,000 FLOPs per byte
                       → very high → COMPUTE-BOUND
```

**Decode, one token:**
```
FLOPs ≈ 2 × 70×10⁹ × 1  =  140 gigaFLOPs

Weights read from memory: 70 GB, for ONE token.
Arithmetic intensity = 140×10⁹ ÷ 70×10⁹ = 2 FLOPs per byte
                       → catastrophically low → MEMORY-BOUND
```

**A factor of six thousand in arithmetic intensity between the two phases, on the same hardware, in the same request.** That is why they need different optimisations, and why any team reporting a single average latency number is concealing both problems.

### The four metrics you must instrument

```
TTFT    Time To First Token
        = queueing + prefill
        Target: under 500 ms interactive, under 200 ms is excellent

TPOT    Time Per Output Token  (also called ITL, Inter-Token Latency)
        = one decode step
        Target: 20–50 ms, i.e. 20–50 tokens per second perceived

E2E     End-to-end latency
        = TTFT + (TPOT × number of output tokens)

THROUGHPUT
        Total tokens per second across all concurrent requests.
        This is what your cost per token depends on.
```

**Latency and throughput are in tension.** Larger batches raise throughput and slightly worsen per-user latency. Every serving configuration is a point on that trade-off, and where you sit should be a deliberate choice driven by the use case:

| Use case | Optimise for | Why |
| :--- | :--- | :--- |
| Analyst asking a question in a chat window | TTFT and TPOT | A human is watching |
| Overnight batch scoring of 40,000 documents | Throughput only | Nobody is waiting |
| Fraud alert triage in a transaction flow | Total E2E, hard ceiling | A downstream system has a timeout |
| Regulatory change monitoring, daily digest | Throughput and cost | Runs unattended |

### Worked: where the time actually goes

A credit memo summarisation request — 6,000 tokens in, 800 tokens out:

```
TTFT  = 350 ms   (prefill of 6,000 tokens)
TPOT  =  30 ms
E2E   = 350 + (30 × 800) = 24,350 ms = 24.4 seconds
```

**Decode accounts for 98.6% of the elapsed time**, despite being the phase where the GPU is nearly idle. Halving prefill saves 175 milliseconds; shaving 5 ms off TPOT saves 4 seconds.

Now the opposite shape — a fraud alert classification, 12,000 tokens in, 15 tokens out:

```
TTFT  = 700 ms
TPOT  =  30 ms
E2E   = 700 + (30 × 15) = 1,150 ms
```

**Prefill is now 61% of the time.** Prompt caching (§7) would take that 700 ms down to roughly 175 ms and cut total latency by 46%.

**The lesson: measure your own input/output ratio before choosing what to optimise.** Two systems built on the same model can need opposite work.

### Check yourself

> **Q. Users complain the assistant "takes forever to start". Which phase, and name two fixes.**
> Prefill. Fixes: prompt caching so the stable portion is not recomputed (§7), and chunked prefill so a long prompt does not sit behind other work (§3.3). Retrieving fewer, better passages also helps directly by shortening the prompt.

> **Q. Which phase benefits from a GPU with more FLOPS but identical memory bandwidth?**
> Prefill only. Decode is bandwidth-bound and will not move.

---

## 1.2 — Head-of-Line Blocking **[CORE]**

**What this section gives you.** The explanation for the most common production complaint: "the demo was fast, but under real load it stutters."

### The problem

A GPU processes one batch at a time. Suppose forty analysts are streaming answers at a comfortable 30 tokens per second. Then one analyst pastes a 90,000-token loan agreement and asks for a summary.

That prefill is a single enormous computation. Until it completes, **no decode step can run for anyone else**. All forty streams freeze.

```
Time →

analyst 1   ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓
analyst 2   ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓
   ...                    ↑
analyst 40  ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓
                          │
analyst 41              ████████████████████
                        one 90,000-token prefill

▓ = tokens streaming    ░ = frozen    █ = the blocking prefill
```

This is **head-of-line blocking** — one long job at the front of the queue delaying everything behind it. It is a classic problem in operating systems and networks, and it appears here in an unusually severe form because the blocking job can be hundreds of times larger than the typical one.

### Why it is worse in banking workloads than in general chat

General consumer chat has a fairly narrow distribution of prompt lengths. Financial document work does not:

```
Typical prompt length distribution in a credit assistant:

  "What's the FOIR cap?"                             40 tokens
  A question with 6 retrieved policy passages      6,000 tokens
  Summarise this credit appraisal note            30,000 tokens
  Review this facility agreement                  90,000 tokens
  Compare these three annual reports             400,000 tokens

  Ratio of longest to shortest: 10,000×
```

A workload with a 10,000× spread in job size will have severe queueing pathologies unless explicitly managed. The fix is §3.3.

### Check yourself

> **Q. Your p50 latency is excellent and your p99 is 40 seconds. What is the most likely cause?**
> A small number of very long prefills blocking everything behind them. Look at the prompt-length distribution, not the model. Chunked prefill (§3.3) is the direct fix; a separate queue or endpoint for long-document work is the architectural one.

---

# PART 2 — MEMORY MANAGEMENT

## 2.1 — The Fragmentation Problem **[CORE]**

**What this section gives you.** The reason a serving system runs out of memory while most of its memory is empty.

### The situation

From V1 §7.2, the KV cache grows one token at a time, per request, and it is the binding constraint on concurrency. The question this section answers is: **how do you allocate memory for something whose final size you do not know?**

When a request arrives, you know the prompt length. You do not know how long the answer will be — it might be 15 tokens or 4,000.

### What early systems did

They allocated a single contiguous block sized to the **maximum possible** sequence length the model supports.

```
Model supports 32,768 tokens. Reserve that much per request.

Request A:  prompt 500 tokens, answer 120 tokens → 620 used
            ┌──────────────────────────────────────────────────┐
            │███░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
            └──────────────────────────────────────────────────┘
             620 used                    32,148 reserved and wasted
```

**Two forms of waste:**

- **Internal fragmentation** — the reserved-but-unused space inside each allocation. Above, 98% of the block.
- **External fragmentation** — gaps between allocated blocks that are too small to hold a new request. Memory that is free but unusable.

Published measurement from the vLLM research found that in these systems **only about 20% to 38% of KV cache memory actually held token data.** The other 62–80% was fragmentation.

### Why this is expensive in exactly your terms

Return to the V1 §7.2 capacity calculation. An 80 GB card running a 70B model at 1 byte per parameter had roughly 7 GB left for KV cache, which supported about five concurrent conversations.

If 70% of that 7 GB is lost to fragmentation, you are serving **one and a half conversations** on an accelerator that costs several dollars per hour. The hardware is not the problem. The allocator is.

---

## 2.2 — PagedAttention **[CORE]**

**What this section gives you.** The technique that made high-throughput LLM serving possible, and the vocabulary to read any serving engine's documentation.

### The idea

Borrow from how operating systems manage memory. Instead of one contiguous block per request:

1. Divide the KV cache into fixed-size **blocks**, each holding a small number of tokens — typically 16.
2. Give each request a **block table**: a list saying which physical blocks hold its tokens, in order.
3. Allocate a new block only when the current one fills.
4. **Blocks need not be adjacent in memory.**

```
PHYSICAL MEMORY (blocks of 16 tokens each)

 ┌────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┐
 │ B0 │ B1 │ B2 │ B3 │ B4 │ B5 │ B6 │ B7 │ B8 │ B9 │B10 │B11 │
 └────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┘
    ▲    ▲         ▲    ▲              ▲
    │    │         │    │              │
 Request A: block table = [B0, B1, B4]        48 tokens
 Request B: block table = [B3, B8]            32 tokens
```

The request sees a continuous sequence. The memory is scattered. The block table does the translation — exactly as a page table does in an operating system, which is where the name comes from.

### The direct result

Waste falls to **at most one partially-filled block per request** — under 16 tokens, instead of tens of thousands.

```
Same 80 GB card, 70B model at 1 byte per parameter, 7 GB for cache:

Contiguous allocation, ~30% efficiency:   ~2 GB usable  →  ~1–2 conversations
Paged allocation, ~96% efficiency:        ~6.7 GB usable →  ~5 conversations

On a card with more headroom the effect is larger still, because the
absolute waste scales with the number of concurrent requests.
```

### The three second-order benefits, which matter more

The memory saving is the headline. These three are why PagedAttention changed serving architecture.

**1. Prefix sharing.** If two requests begin with identical text, they can point their block tables at **the same physical blocks**. The memory is stored once and read by both.

This is enormous in production, because production prompts are mostly identical. A credit assistant sends the same system instructions, the same policy extract, and the same tool definitions on every single request. Only the analyst's question differs.

```
Request A block table: [S0, S1, S2, S3, S4, A9,  A12]
Request B block table: [S0, S1, S2, S3, S4, B7,  B11]
                        └──── shared ────┘  └─ private ─┘
                        3,000-token system prompt stored ONCE
```

When one request writes to a shared block, it is first copied — **copy-on-write**, again borrowed from operating systems.

**2. Preemption and swapping.** Under memory pressure, a request's blocks can be evicted and restored later. Without paging, the only option is to reject the request.

**3. Efficient parallel sampling.** Generating several candidate answers from one prompt (used in self-consistency voting and in speculative decoding, §4) shares the prompt's blocks instead of duplicating them.

### Reading the setting

```bash
--block-size 16          # tokens per block. 16 is the near-universal default.
                         # Smaller = less waste, more block-table overhead.
                         # You will almost never change this.
```

### Check yourself

> **Q. A request uses 100 tokens with a block size of 16. How many blocks, and how much is wasted?**
> Seven blocks (6 full = 96 tokens, plus one holding 4). Waste is 12 token slots — under 40 KB on a 320 KB-per-token model, against tens of gigabytes under contiguous allocation.

> **Q. Why does prefix sharing matter more in an enterprise assistant than in a consumer chatbot?**
> Enterprise prompts carry a large fixed payload — system instructions, policy text, tool schemas, few-shot examples — that is byte-identical on every request. Consumer chat prompts are mostly user-specific text with a much smaller shared prefix.

---

## 2.3 — RadixAttention **[WORKING]**

**What this section gives you.** The distinction between two things that sound identical in marketing material, and the reason it can matter by 20–30% on your workload.

### What prefix caching does and does not do

vLLM's prefix caching handles the case in §2.2: requests that share the *same starting text* can share those blocks.

But consider what actually happens in a multi-turn conversation with an analyst:

```
Turn 1 prompt:  [SYSTEM] + [POLICY] + "What is the exposure limit for NBFC counterparties?"
Turn 2 prompt:  [SYSTEM] + [POLICY] + Q1 + A1 + "And for banks?"
Turn 3 prompt:  [SYSTEM] + [POLICY] + Q1 + A1 + Q2 + A2 + "Show me the aggregate."
```

Every turn re-sends everything before it. Turn 3's prompt contains turn 2's prompt as a prefix, which contains turn 1's. There are **nested, overlapping prefixes at many levels**, not one shared header.

Now add a second analyst asking different questions against the same policy. And a third. The set of cached prefixes across all active requests forms a tree.

### The mechanism

**RadixAttention** — the distinguishing feature of the SGLang engine — maintains a **radix tree** (a trie) over all cached KV blocks across all requests. When a new request arrives, it walks the tree to find the **longest matching path from any previously cached sequence**, not merely from a designated system prefix.

```
                    [SYSTEM + POLICY]              ← shared by everyone
                     ├── Q1 + A1                   ← analyst 1's thread
                     │    ├── Q2 + A2
                     │    │    └── Q3 ...
                     │    └── Q2' + A2'            ← a branch, if they backtracked
                     ├── Q1' + A1'                 ← analyst 2's thread
                     └── Q1'' + A1''               ← analyst 3's thread
```

Least-recently-used branches are evicted when memory is needed.

### Where the gain shows up

The gain is proportional to how much of your input is shared. Four workloads where it is large — and all four are standard in financial services:

| Workload | What is shared |
| :--- | :--- |
| **Retrieval-based Q&A** | System prompt, policy text, and frequently the same retrieved passages across many analysts asking about the same circular |
| **Multi-turn conversation** | The entire growing history, re-sent every turn |
| **Agents** | Tool definitions plus the full action history, re-sent at every step |
| **Few-shot classification** | The same examples on every one of 40,000 documents |

Reported gains on retrieval-heavy workloads run to roughly 20–30% cost reduction over standard prefix caching, and more on some model families.

### The engineering rule

```
Measure the fraction of your input tokens that are shared across requests.
  Below 30%  → prefix caching is sufficient; use vLLM
  Above 60%  → benchmark SGLang on your own traffic; the gap is likely material
```

This is measurable directly. Log the token count and a hash of the stable prefix on every request for a day.

---

# PART 3 — BATCHING

## 3.1 — Why Batching Is the Largest Single Lever **[CORE]**

**What this section gives you.** The reason a hosted API can charge less per token than your own dedicated GPU costs you, and the arithmetic to know when that stops being true.

### The observation

From V1 §8.3: decode reads every weight in the model to produce one token. The GPU sits idle for the great majority of that time, waiting for memory.

**Those idle cycles are free capacity.** If you process 32 requests simultaneously, you read the weights **once** and produce **32 tokens** from that single read.

### The arithmetic, done honestly

The naive version says throughput multiplies by the batch size. That is not quite right, because the KV cache also has to be read, and cache reads scale with batch size while weight reads do not.

```
70B model, 1 byte per parameter, GQA (320 KB of cache per token),
80 GB accelerator at 3.35 TB/s, 4,000-token conversations.

── BATCH OF 1 ──────────────────────────────────────────────
  Weights read per decode step         70 GB
  KV cache read (1 × 4,000 × 320 KB)    1.28 GB
  Total memory traffic                 71.28 GB
  Time per step   = 71.28 ÷ 3,350      = 21.3 ms
  Tokens produced per step             = 1
  → 47 tokens/sec total, 47 per user

── BATCH OF 32 ─────────────────────────────────────────────
  Weights read per decode step         70 GB      ← UNCHANGED
  KV cache read (32 × 4,000 × 320 KB)  41 GB
  Total memory traffic                111 GB
  Time per step   = 111 ÷ 3,350        = 33.1 ms
  Tokens produced per step             = 32
  → 967 tokens/sec total, 30 per user
```

**Throughput rose 20-fold. Per-user speed fell from 47 to 30 tokens per second** — still comfortably above the 20–50 target for a reading human.

That is the trade, and it is overwhelmingly favourable. Twenty times the capacity for a 36% reduction in individual speed that most users will not notice.

### Where it stops improving

Notice that at batch 32, cache traffic (41 GB) is already 37% of total traffic. Push further:

```
── BATCH OF 128 ────────────────────────────────────────────
  Weights                              70 GB
  KV cache (128 × 4,000 × 320 KB)     164 GB      ← now dominates
  Total                               234 GB
  Time per step = 234 ÷ 3,350         = 69.9 ms
  → 1,831 tokens/sec total, 14 per user
```

Throughput still rises, but per-user speed has fallen to 14 tokens per second — noticeably slow to read. And 164 GB of cache does not fit on an 80 GB card in the first place, so this batch is not achievable without more memory.

**Two ceilings, and you hit whichever comes first:**

1. **Memory** — total KV cache must fit in whatever the weights left over.
2. **Acceptable per-user latency** — beyond a point, throughput gains cost more in user experience than they are worth.

### The commercial consequence

This is the honest answer to "why is a hosted API cheaper than my own GPU?"

A hosted provider batches across thousands of customers and runs at high, steady batch size around the clock. Your dedicated endpoint serves your traffic alone — which means a batch of 2 at 3 a.m. and a batch of 40 at 11 a.m., averaging far below what the hardware could sustain.

You pay for the GPU by the hour regardless. **Utilisation is the entire economic argument**, and §9.1 turns it into a break-even calculation.

### Check yourself

> **Q. Your dedicated endpoint averages a batch size of 3. What does that tell you?**
> That you are paying for roughly ten to twenty times the capacity you use. Either consolidate more workloads onto the endpoint, move to a smaller model, or move to a hosted API until volume justifies dedicated hardware.

---

## 3.2 — Continuous Batching **[CORE]**

**What this section gives you.** The scheduling technique that roughly doubles to quadruples throughput over the obvious approach, at no quality cost.

### The obvious approach and its flaw

**Static batching:** collect N requests, run them together, return all results when the *longest* has finished.

```
Time →

Req A  ████████░░░░░░░░░░░░░░░░░░░░░░░░   finishes at step 8, GPU slot idle
Req B  ████████████████░░░░░░░░░░░░░░░░   finishes at step 16
Req C  ████████████████████████████████   finishes at step 32
Req D  ██████░░░░░░░░░░░░░░░░░░░░░░░░░░   finishes at step 6

░ = a slot in the batch doing nothing but still occupying memory and a scheduler seat
```

Request D finished at step 6 and its slot is dead until step 32. Meanwhile requests E, F, G are queued and cannot start.

Output lengths in real workloads vary enormously — a fraud classification returns 15 tokens, a memo summary returns 900 — so the waste is severe. Typical utilisation under static batching is 30–50%.

### The fix

**Continuous batching**, also called in-flight batching: **rebuild the batch at every single decode step.**

```
At each step:
  1. Remove any sequence that finished (hit a stop token or max_tokens).
  2. Admit waiting requests into the freed slots.
  3. Run one decode step for whatever is now in the batch.
```

The batch composition changes token by token. No slot is ever idle while work is queued.

```
Time →

Req A  ████████
Req B  ████████████████
Req C  ████████████████████████████████
Req D  ██████
Req E        ██████████████                ← admitted the moment D finished
Req F              ████████                ← admitted when A finished
Req G                    ████████████      ← admitted when B finished
```

**Result: 2–4× throughput at the same latency.** This is not a trade-off; it is strictly better. It is on by default in every modern engine, and it is one of the main reasons a 2026 serving stack outperforms a 2023 one by roughly an order of magnitude.

### The setting

```bash
--max-num-seqs 256       # ceiling on concurrent sequences in the batch.
                         # The engine will run below this when memory is tight.
                         # Too high wastes scheduler overhead; too low caps
                         # throughput artificially. 128–256 is a sane range.
```

---

## 3.3 — Chunked Prefill **[CORE]**

**What this section gives you.** The direct fix for the head-of-line blocking in §1.2.

### The mechanism

Do not run a 90,000-token prefill as one indivisible operation. Split it into chunks of about 2,000 tokens and **interleave decode steps for other requests between the chunks.**

```
Without chunked prefill:

  [────────── 90,000-token prefill, 4.5 seconds ──────────][decode][decode]...
   ↑
   40 other users frozen for 4.5 seconds


With chunked prefill:

  [chunk][d][d][d][chunk][d][d][d][chunk][d][d][d]...[chunk][d][d]
   2,000  ↑ ↑ ↑
   tokens other users' decode steps, interleaved

   Long request takes slightly longer overall.
   Everyone else keeps streaming smoothly.
```

### What it costs and what it buys

| | Effect |
| :--- | :--- |
| p99 latency for short requests | **Large improvement** — no more multi-second freezes |
| Latency for the long request itself | Slightly worse — it now shares the GPU |
| Total throughput | Usually slightly better, because the GPU is never in a pure-prefill state with idle decode slots |
| Fairness | Substantially better |

**This is the single most important setting for a mixed workload**, and a banking document workload is always mixed (§1.2).

```bash
--enable-chunked-prefill
--max-num-batched-tokens 2048     # size of each prefill chunk
                                  # Smaller = smoother interleaving, more overhead
                                  # 2048–4096 is the usual range
```

### Check yourself

> **Q. Your workload is exclusively overnight batch scoring — 40,000 documents, nobody waiting. Do you enable chunked prefill?**
> It matters far less. With no interactive traffic there is no head of line to block. Optimise purely for throughput: large batches, long prefills, and use a batch API if one is available (§8.4).

---

## 3.4 — Prefill/Decode Disaggregation **[DEEPER]**

*Skip on a first pass. This is a large-fleet technique; it is here so the term is not unfamiliar.*

The two phases want different hardware. Prefill wants FLOPS. Decode wants memory bandwidth and capacity. Running both on the same card means one is always mismatched.

**Disaggregation** runs two separate pools:

```
  Request
     │
     ▼
 ┌─────────────────┐    KV cache transferred     ┌─────────────────┐
 │  PREFILL POOL   │ ─────────────────────────►  │  DECODE POOL    │
 │  compute-heavy  │    over NVLink or RDMA      │  memory-heavy   │
 │  cards          │                             │  cards          │
 └─────────────────┘                             └─────────────────┘
```

Each pool scales independently: if your traffic is long-prompt, short-answer (document classification), you add prefill capacity; if it is short-prompt, long-answer (report generation), you add decode capacity.

The cost is the KV cache transfer between pools, which is why this only makes sense on high-bandwidth interconnects. Reported gains on large NVLink-connected clusters run to roughly 2.7× higher decode throughput.

**Relevant when:** you run dozens of GPUs and your prefill-to-decode ratio is strongly skewed. **Not relevant when:** you run one to four cards. Do not attempt this before §3.2 and §3.3 are in place.

---

# PART 4 — SPECULATIVE DECODING

## 4.1 — Getting Tokens for Free **[WORKING]**

**What this section gives you.** A technique that reduces per-token latency by 1.5× to 3× while producing **mathematically identical output** to not using it. There is no quality trade-off to weigh, which is unusual enough to be worth understanding properly.

### The observation it exploits

Return to §1.1. During decode, the GPU is memory-bound and idle most of the time. During prefill, it processes many tokens in parallel at high utilisation.

So: **verifying several tokens at once costs almost the same as generating one token.** Both require reading all the weights; the parallel verification just does more arithmetic with them, and arithmetic is the thing there is spare capacity for.

If you could *guess* the next few tokens cheaply, you could check all your guesses in a single pass at nearly no extra cost.

### The mechanism

```
1. A small, fast DRAFT model proposes the next k tokens (k typically 3–8).
   This is cheap — a 1B draft model runs perhaps 20× faster than a 70B target.

2. The large TARGET model runs ONE forward pass over the prompt plus all k
   drafted tokens, producing its own probability distribution at each of those
   k positions.

3. Walk the drafted tokens left to right. Accept each one according to a
   rejection-sampling rule that compares the draft's probability to the
   target's probability at that position.

4. At the first rejection, sample a corrected token from an adjusted
   distribution, discard the remaining drafts, and restart from there.

5. Repeat.
```

### Worked example

Target model is generating a continuation of *"The facility was sanctioned subject to"*.

```
Draft model proposes 5 tokens:  " the", " borrower", " providing", " audited", " accounts"

Target model verifies all 5 in ONE forward pass:
    position 1: target also favours " the"         → ACCEPT
    position 2: target also favours " borrower"    → ACCEPT
    position 3: target also favours " providing"   → ACCEPT
    position 4: target favours " submission"       → REJECT, emit " submission"
    position 5: discarded

Net: 4 tokens produced from the cost of roughly 1 target forward pass.
```

### Why the output is provably unchanged

This is the part worth understanding, because it is what makes the technique safe to enable without re-running your evaluations.

The acceptance rule is not "accept if the draft matches the target's top choice." It is a **rejection-sampling** procedure:

```
For a drafted token x at some position:
    p(x) = target model's probability for x
    q(x) = draft model's probability for x

    If p(x) ≥ q(x):  accept x
    If p(x) <  q(x):  accept x with probability p(x)/q(x);
                      otherwise reject and resample from a
                      corrected distribution proportional to
                      max(0, p(x) − q(x)), renormalised
```

The mathematics of this construction guarantees that the distribution of accepted tokens is **exactly** the distribution the target model would have produced on its own. Not approximately — exactly.

**Practical consequence: speculative decoding is not a quality/speed trade-off.** It is a pure latency win. You do not need to re-evaluate output quality after enabling it. Very few optimisations in this field have that property.

### The speedup

```
Speedup ≈ acceptance rate × k

Real systems see 1.5× to 3× on time-per-output-token.
```

The acceptance rate is everything, and it depends on how closely the draft model's distribution resembles the target's. A draft distilled from the same model family performs far better than an arbitrary small model.

### The variants

| Variant | Where the draft comes from | Notes |
| :--- | :--- | :--- |
| **Standard** | A separate small model | Needs a well-matched draft; you host two models |
| **Self-speculative** (Medusa, EAGLE) | Extra prediction heads bolted onto the target model itself | No second model to host. **The common production choice now.** |
| **n-gram / prompt lookup** | Copies candidate continuations directly from the prompt | Free, no model at all. **Excellent for summarisation, extraction, editing, and retrieval-based answering** — precisely because the output heavily echoes the input. Very relevant to document work. |
| **Multi-token prediction** | Trained into the model architecture | Some recent models predict several tokens natively |

**The n-gram variant deserves attention in a financial document context.** When an assistant extracts sanction conditions from an appraisal note, most of its output is text that appeared in the input. A lookup-based draft achieves very high acceptance rates on exactly this shape of task, at zero infrastructure cost.

### When it does not help

Under **sustained high batch load**, the GPU is already saturated. There is no idle capacity to exploit, and the extra verification arithmetic competes with real work. Speculative decoding can actually reduce throughput in that regime.

```
Low to medium concurrency  → enable. Substantial latency gain.
High sustained batch load  → measure. May be neutral or negative.
```

This maps cleanly onto use cases: enable it for the interactive analyst assistant; leave it off for the overnight batch job.

### Check yourself

> **Q. Do you need to re-run your evaluation suite after enabling speculative decoding?**
> No. The rejection-sampling rule preserves the target model's output distribution exactly. This is the rare optimisation that is provably lossless.

> **Q. Which of your workloads is the best candidate for n-gram speculation?**
> Anything where output echoes input: extraction from documents, summarisation, redlining, and retrieval-grounded answering that quotes retrieved passages.

---

# PART 5 — QUANTISATION IN PRACTICE

## 5.1 — The Methods **[WORKING]**

**What this section gives you.** V1 §8.4 established *why* quantisation works and what it buys. This section covers *which method to use* and how to avoid the failure it causes.

### The distinction that organises everything

**Weight-only quantisation** compresses the stored weights but converts them back to higher precision for the actual arithmetic. Saves memory and memory bandwidth — which, per V1 §8.3, is the binding constraint during decode. This is what you want most of the time.

**Weight-and-activation quantisation** also compresses the intermediate values flowing through the network, allowing the arithmetic itself to run in low precision. Faster still, but harder to do without quality loss, because activations contain **outliers** — occasional very large values that a coarse grid represents badly.

### The methods

| Method | Type | The idea | When to use |
| :--- | :--- | :--- | :--- |
| **FP8** | Both | A native 8-bit floating-point format supported directly by recent hardware | **The default in 2026.** Close to free. Do this first, always. |
| **AWQ** | Weight-only, 4-bit | Observes that a small fraction of weight channels are disproportionately important, identifies them by looking at activation magnitudes, and protects those channels from aggressive rounding | Best general 4-bit choice; often beats GPTQ on instruction-following |
| **GPTQ** | Weight-only, 4-bit | Quantises layer by layer, using second-order information to compensate for the error introduced in each step | Mature, very widely supported |
| **SmoothQuant** | Weight and activation, 8-bit | Mathematically shifts the activation outliers into the weights, so both sides become well-behaved enough for 8-bit | When you need INT8 arithmetic, not just INT8 storage |
| **GGUF** | Weight-only, many levels | A file format with a menu of levels (Q4_K_M, Q5_K_M, Q8_0), designed for CPU and consumer GPU execution | Laptops, edge devices, local development |
| **QAT** | Trained in | Simulates quantisation during training so the model learns to be robust to it | Best quality at very low bit-widths; requires training, so rarely your choice |

### Choosing

```
Datacentre GPU, recent generation      → FP8. First move, every time.
Need more concurrency, or a smaller card → AWQ 4-bit, then re-evaluate fully
CPU, laptop, or on-device               → GGUF Q4_K_M (the quality/size sweet spot)
Quality-critical, latency-tolerant       → BF16, no quantisation
```

**The GGUF naming decoded**, since it looks arbitrary:

```
Q4_K_M
│ │ │ └── M = medium. Variants S (small), M (medium), L (large) differ in
│ │ │      which layers get extra precision
│ │ └──── K = "K-quant", a scheme that varies precision by layer importance
│ └────── 4 = bits per weight
└──────── Q = quantised
```

`Q4_K_M` is the widely used default. `Q8_0` is near-lossless at half the size of BF16. `Q2_K` exists and is usually too degraded to be useful.

---

## 5.2 — Validating a Quantisation **[CORE]**

**What this section gives you.** The discipline that prevents the most common silent quality regression in production AI.

### Why the naive check fails

Quantisation degradation is **not uniform across tasks**. It concentrates in a specific and predictable set:

```
WHERE QUANTISATION DEGRADATION SHOWS UP FIRST
  ▸ Multi-step arithmetic and numerical reasoning
  ▸ Precise retrieval of a specific fact from a long context
  ▸ Non-English text, and Indic scripts in particular
  ▸ Instruction-following under tight constraints (schema conformance,
    "answer in exactly three sentences", "cite every claim")
  ▸ Rare-token generation — unusual proper nouns, circular numbers,
    account identifiers, technical terms
  ▸ Refusal behaviour and edge-case handling
```

Look at that list against a financial services workload. It is almost a description of what the system is for: reading numbers out of documents, finding one clause in a long agreement, working in more than one language, conforming to an output schema, and reproducing reference numbers exactly.

**A smoke test of ten friendly English questions will pass at INT4.** The 15% of traffic that consists of numerical extraction from a long Hindi-English document will regress, and nobody will notice until a customer does.

### The procedure

```
QUANTISATION IS A MODEL CHANGE. Treat it exactly as you would treat
swapping to a different model.

1. Run the FULL evaluation suite at both precisions — not a subset.
2. Report results BY SLICE, not in aggregate:
       overall · numerical extraction · long-context retrieval
       · non-English · schema conformance · refusal correctness
   An aggregate score of 91% versus 92% conceals a numerical-extraction
   slice that fell from 94% to 76%.
3. Measure the gain as well as the loss: tokens/sec, concurrency achieved,
   memory freed. You are deciding whether a specific gain justifies a
   specific loss, which requires both numbers.
4. Canary at a small percentage of live traffic with automatic rollback
   on quality, latency, or error-rate thresholds.
5. Record the precision in your model registry alongside the version.
   "Which precision was in production on 14 August?" is a question you
   will eventually be asked.
```

### The decision, stated as a rule

```
FP8:  adopt without ceremony. The loss is within measurement noise
      on nearly every task.

INT4: adopt only when you have a specific need — a smaller card, more
      concurrency, or an edge deployment — AND the slice-level evaluation
      shows the loss is acceptable for your traffic mix.

      Never adopt INT4 because it was available.
```

### Check yourself

> **Q. Aggregate accuracy drops from 92% to 91% after INT4 quantisation. Ship it?**
> Not on that number alone. Break it down by slice. A one-point aggregate drop is frequently a two-point rise on easy traffic masking a fifteen-point collapse on numerical extraction. Aggregates are the wrong unit for this decision.

---

# PART 6 — SERVING ENGINES

## 6.1 — The Landscape **[WORKING]**

**What this section gives you.** Enough to choose one and defend the choice, without pretending the differences are larger than they are.

An **inference engine** is the software that loads a model's weights, manages GPU memory, schedules requests, and exposes an API. It implements everything in Parts 2 through 5.

| Engine | Distinguishing feature | Hardware | Choose when |
| :--- | :--- | :--- | :--- |
| **vLLM** | PagedAttention (§2.2); the broadest ecosystem and hardware support | NVIDIA, AMD, Intel, Google TPU, CPU fallback | **The default.** Fastest route to production. Necessary if your fleet is not uniformly NVIDIA. |
| **SGLang** | RadixAttention (§2.3); strong structured-output support | NVIDIA, AMD | Workloads where a large fraction of input tokens are shared — retrieval, multi-turn, agents, high-volume structured extraction |
| **TensorRT-LLM** | Compiles a model ahead of time into a GPU-specific optimised engine | NVIDIA only | Peak throughput, NVIDIA-committed, and a platform team that can absorb a per-model compilation step in the release process |
| **llama.cpp / Ollama** | CPU and consumer GPU execution, GGUF formats, trivial setup | Everything | Local development, edge devices, on-device deployment |
| **Ray Serve, Triton, NVIDIA Dynamo** | Orchestration *above* the engine — routing, autoscaling, multi-model fleets | — | Once you run several models and need canaries and autoscaling |
| **Hugging Face TGI** | The historical Hugging Face option | NVIDIA | Entered maintenance mode in late 2025. **Not for new builds.** |

### The decision

```
1. Is your hardware anything other than NVIDIA-only?           → vLLM
2. Is more than ~60% of your input tokens shared across
   requests (retrieval, multi-turn, agents)?                    → benchmark SGLang
3. Is structured/constrained output on the hot path?            → SGLang tends to lead here
4. NVIDIA-only, throughput-critical, and you have a platform
   team that can own a compilation step?                        → TensorRT-LLM
5. Otherwise                                                    → vLLM
```

**All of them expose an OpenAI-compatible API.** This matters more than the feature comparison: switching engines is a container swap and a configuration change, not an application rewrite. So benchmark on a day of your own traffic and let the numbers decide, rather than arguing from documentation.

---

## 6.2 — A Production Launch, Annotated **[WORKING]**

```bash
vllm serve Qwen/Qwen3-32B-Instruct \
```
> The model to load, by Hugging Face identifier. A 32B model at FP8 fits comfortably on one 80 GB card with substantial room for KV cache — a common sweet spot for enterprise deployment.

```bash
  --tensor-parallel-size 2 \
```
> Split the model's weight matrices **across 2 GPUs**, with both cards working on every token. Use this when the model does not fit on one card, or when you want lower single-request latency. It requires fast interconnect between the cards (NVLink); over PCIe the communication overhead can exceed the benefit. Note this is different from running two independent copies — that would be data parallelism, and it doubles throughput rather than reducing latency.

```bash
  --quantization fp8 \
```
> Load weights at 1 byte per parameter (V1 §8.4). Halves weight memory and halves the memory traffic per decode step, which roughly doubles decode speed. Adopt by default on recent hardware.

```bash
  --kv-cache-dtype fp8 \
```
> Quantise the **KV cache** as well, not just the weights. This halves the per-token cache cost from V1 §7.2 — so a model costing 320 KB per token now costs 160 KB, doubling how many concurrent conversations fit. A separate decision from weight quantisation, and frequently forgotten. Small quality impact; validate it with the §5.2 procedure.

```bash
  --max-model-len 32768 \
```
> **The most consequential flag in this command.** It caps the maximum sequence length the server will accept. The engine reserves KV cache capacity based on this figure. Leaving it at the model's maximum — say 128k — reserves capacity for a length almost no request uses and destroys your concurrency. **Set it from your measured 99th-percentile prompt length, plus headroom for output.** If a rare request needs more, route it to a separate long-context endpoint rather than degrading the main one.

```bash
  --gpu-memory-utilization 0.90 \
```
> Use 90% of the card, leaving 10% for fragmentation, CUDA workspace, and safety. Pushing to 0.95 is possible but leaves no room for error and produces out-of-memory failures under load spikes.

```bash
  --enable-prefix-caching \
```
> Turn on the block sharing from §2.2. Given that enterprise prompts carry a large fixed prefix, this is free throughput. There is essentially no reason to leave it off.

```bash
  --enable-chunked-prefill \
  --max-num-batched-tokens 2048 \
```
> Break long prefills into 2,048-token chunks and interleave decode steps between them (§3.3). This is what prevents one long document from freezing every other user.

```bash
  --max-num-seqs 256 \
```
> Ceiling on concurrent sequences (§3.2). The engine runs below this when memory is tight.

```bash
  --served-model-name production-32b \
```
> The name clients use in their requests. Decoupling this from the actual model identifier means you can swap the underlying model without changing a single line of application code — the routing pattern from V1 §10.1, implemented at the engine level.

```bash
  --api-key "$VLLM_API_KEY" \
  --host 127.0.0.1 --port 8000
```
> Require an API key, and **bind to localhost only**. The engine sits behind a gateway that handles authentication, rate limiting, logging and routing. See §6.3.

---

## 6.3 — Inference Engines Are Network Services **[CORE]**

**What this section gives you.** A security posture that is frequently missing and occasionally catastrophic.

An inference engine is a service that accepts untrusted input over the network, parses it, and processes it in complex native code paths. It is, structurally, an attack surface.

During 2025 and 2026 the major open-source engines have carried **critical vulnerabilities** — including remote code execution reachable through multimodal input handling, and unsafe deserialisation in distributed-serving components, with severity scores in the 9s.

This is not an argument against using them. It is an argument for treating them as you would treat any other exposed service.

```
NON-NEGOTIABLE POSTURE

[ ] Never expose the engine directly to the internet, or to a broad
    internal network. Bind to localhost or a private subnet.
[ ] Put an authenticating gateway in front — API keys or mTLS, rate
    limiting, request size caps, logging.
[ ] PIN THE VERSION. Do not run a floating "latest" tag.
[ ] Subscribe to the project's security advisories. Have a named owner.
[ ] Disable features you do not use — multimodal input handling and
    distributed-serving modules in particular, which have carried the
    highest-severity issues.
[ ] Run in a container as a non-root user, with a read-only filesystem
    where possible and no unnecessary egress.
[ ] Treat the model weights themselves as a supply-chain artefact:
    verify checksums, prefer safetensors over pickle-based formats,
    and record provenance.
```

**The last point is worth expanding.** Older model formats use Python's `pickle` serialisation, which can execute arbitrary code on load. The `safetensors` format exists specifically to eliminate this. Loading a `.bin` or `.pt` model file from an untrusted source is equivalent to running an untrusted executable.

---

# PART 7 — PROMPT CACHING

## 7.1 — The Highest-Return Change You Can Make **[CORE]**

**What this section gives you.** Roughly 90% off your input token bill and roughly 75% off prefill latency, obtained by **reordering your prompt**. No model change, no infrastructure, no quality trade-off.

### The mechanism

§2.2 established that requests sharing a prefix can share KV cache blocks. Hosted providers expose this as a billing feature: the computed state of a prompt prefix is retained, and subsequent requests that begin with the identical bytes reuse it instead of recomputing.

**Caching is strictly prefix-based.** It matches from byte zero and stops at the first difference. Everything after that point is recomputed.

This single property dictates how you must structure a prompt.

### The ordering that follows

```
┌────────────────────────────────────────────────────┐
│  1. System instructions            NEVER CHANGES   │ ◄─┐
│  2. Tool / function schemas        NEVER CHANGES   │   │ cached
│  3. Few-shot examples              NEVER CHANGES   │   │
│  4. Standing policy extract        NEVER CHANGES   │ ◄─┘
├────────────────────────────────────────────────────┤
│  5. Retrieved evidence             SOMETIMES REUSED│ ◄─ cached when reused
├────────────────────────────────────────────────────┤
│  6. Conversation history           GROWS           │ ◄─ incrementally cached
├────────────────────────────────────────────────────┤
│  7. The current question           ALWAYS DIFFERENT│ ◄─ never cached
└────────────────────────────────────────────────────┘
```

Most variable content at the bottom. Most stable content at the top.

### The four rules

**1. Never put a timestamp, session ID, request ID, or user name at the top of the system prompt.**

This is common, it feels harmless, and it **invalidates 100% of your cache on every request**. One dynamic value in the first line means every subsequent byte is a cache miss.

```
❌  "Current date and time: 2026-08-09 14:32:07. You are a credit
     policy assistant..."

✅  "You are a credit policy assistant... [3,000 tokens of stable
     instruction] ... Today's date is 2026-08-09."
```

Same information, placed after the stable block instead of before it. If the date genuinely must be available, put it at the boundary between stable and variable content.

**2. Keep tool definitions in a fixed order, and keep the set stable.**

Dynamically selecting which tools to include per turn is a popular optimisation — send only the three relevant tools instead of all twelve, save a few hundred tokens. It is almost always a net loss, because varying the tool block **destroys cache locality for everything after it**. A stable twelve-tool block that is 95% cached is cheaper than a variable three-tool block that is never cached.

**3. Cache minimums and lifetimes vary by provider and model.** Minimum cacheable prefix lengths are typically in the hundreds to low thousands of tokens; lifetimes are typically minutes, sometimes extendable. Check current provider documentation rather than assuming.

**4. Writing to the cache can cost slightly more than an uncached call; reading is dramatically cheaper.** The break-even is at the second request. For any prompt used more than twice, caching wins immediately.

### Measure it

Every provider returns cached-token counts in the response usage block. **Cache hit rate belongs on your dashboard as a first-class metric**, alongside latency and error rate.

```python
# Every provider reports this. Extract it, log it, alert on it.
usage = response.usage
cached   = usage.cached_input_tokens      # exact field name varies by provider
total_in = usage.input_tokens

hit_rate = cached / total_in if total_in else 0.0

log.info("llm_call",
    trace_id=trace_id,
    use_case="credit_memo_qa",
    cache_hit_rate=round(hit_rate, 3),
    input_tokens=total_in,
    output_tokens=usage.output_tokens,
)

# A sudden drop in hit rate almost always means somebody introduced a
# dynamic value near the top of a prompt. It is the fastest-moving
# cost signal you have.
```

**Target: above 90% on any workload with a substantial stable prefix.** Below 70%, something is wrong with your prompt construction and it is worth an hour to find.

---

## 7.2 — The Economics, Worked **[CORE]**

A credit policy assistant. Realistic shape.

```
Prompt structure per request:
    System instructions + response rules        1,200 tokens
    Tool schemas                                  900 tokens
    Few-shot examples                             800 tokens
    Standing credit policy extract              2,100 tokens
    ────────────────────────────────────────────────────────
    Stable prefix                               5,000 tokens
    Retrieved evidence (6 passages)             4,200 tokens   } variable
    Analyst's question                            120 tokens   }
    ────────────────────────────────────────────────────────
    Total input                                 9,320 tokens
    Output                                        650 tokens

Volume: 800 analysts × 11 queries/day × 22 working days
      = 193,600 requests/month
```

**Without caching**, at an indicative production-tier price of $1.50 per million input tokens and $12.00 per million output:

```
Input:   193,600 × 9,320  = 1,804,352,000 tokens
         1,804.35M × $1.50 / 1M            = $2,706.53
Output:  193,600 ×   650  =   125,840,000 tokens
           125.84M × $12.00 / 1M           = $1,510.08
                                             ─────────
                                  Monthly    $4,216.61      ≈ ₹3.71 lakh
```

**With caching**, assuming the 5,000-token stable prefix hits at 95% and cached tokens are billed at roughly 10% of the normal input rate:

```
Cached input:    193,600 × 5,000 × 0.95 = 919,600,000 tokens
                 919.6M × $1.50 × 0.10 / 1M          = $137.94
Uncached input:  193,600 × (9,320 − 4,750) = 884,752,000 tokens
                 884.75M × $1.50 / 1M                = $1,327.13
Output:          unchanged                            = $1,510.08
                                                       ─────────
                                            Monthly    $2,975.15   ≈ ₹2.62 lakh

Saving: $1,241/month ≈ ₹1.09 lakh/month ≈ ₹13.1 lakh/year
Input cost fell 49%; total cost fell 29%.
```

**And the latency effect**, which is often the more visible benefit:

```
Prefill of 9,320 tokens uncached      ≈ 520 ms
Prefill with 4,750 tokens cached      ≈ 255 ms
Time to first token improves by ~51%.
```

### The compounding case

The numbers above are for a single-turn assistant. **In a multi-step agent the effect compounds**, because the stable prefix is re-sent on every step.

```
An agent that makes 25 model calls per task, same 5,000-token stable prefix:

Without caching:  25 × 5,000 = 125,000 tokens of prefix per task, all billed
With caching:     5,000 billed once, 120,000 at ~10%
                → prefix cost falls by roughly 86%
```

For agentic workloads, prompt caching moves from "worthwhile optimisation" to "the difference between viable and not."

### Check yourself

> **Q. Your cache hit rate drops from 94% to 11% overnight with no deployment. What happened?**
> Almost certainly a dynamic value entered the top of the prompt. Common causes: a date or timestamp added to the system prompt, a retrieved passage set that changed ordering non-deterministically, or a tool list that became dynamically selected. Diff the first 500 tokens of a request against yesterday's.

---

# PART 8 — COST ENGINEERING

## 8.1 — The Cost Model **[CORE]**

**What this section gives you.** The complete formula, including the terms that people forget and that turn a projection into an underestimate by a factor of three.

### The naive version and why it fails

```
Cost = tokens × price per token
```

This is what appears in early business cases and it is wrong in four ways, each of which is a multiplier.

### The complete version

```
COST PER REQUEST =
      uncached input tokens  × price_in
    + cached input tokens    × price_in × cache_discount        (~0.1)
    + output tokens          × price_out
    + THINKING tokens        × price_out                        ← forgotten
    + embedding cost         (retrieval)
    + reranking cost         (retrieval)
    + guardrail model calls  (input and output checks)          ← forgotten

COST PER RESOLVED TASK =
      cost per request
    × requests per task                                         ← forgotten
    × (1 + retry rate + escalation rate)                        ← forgotten
```

### The four forgotten terms

**1. Thinking tokens.** Reasoning models generate an internal trace before the visible answer, billed as output. A 200-word answer may have cost 4,000 output tokens. On a $12-per-million output tier, that is $0.048 for a response that "looks like" 250 tokens.

**2. Requests per task.** An agent making 25 model calls to answer one question costs 25 times a single call. The user experienced *one* interaction.

**3. Retries and escalations.** Schema validation fails, so you retry. The cheap model's answer fails a confidence check, so you escalate to the expensive one — and pay for both.

**4. The supporting calls.** Query rewriting, input guardrail classification, reranking, output faithfulness checking. Each is small; together they routinely add 20–40%.

### Worked: naive versus real

A document extraction pipeline, per document:

```
NAIVE ESTIMATE
    Input  8,000 tokens × $1.50/M   = $0.0120
    Output   400 tokens × $12.00/M  = $0.0048
                                      ───────
                                      $0.0168   ≈ ₹1.48 per document

REAL
    Input guardrail (cheap model)
        8,000 in × $0.20/M                       = $0.0016
    Extraction call, thinking enabled
        8,000 in (60% cached) × $1.50/M
            cached  4,800 × 0.1 × $1.50/M        = $0.0007
            uncached 3,200 × $1.50/M             = $0.0048
        2,100 thinking + 400 visible out × $12/M = $0.0300
    Schema retry on 8% of documents
        0.08 × $0.0355                           = $0.0028
    Output faithfulness check (cheap model)
        2,500 in + 200 out × $0.20/$1.20 per M   = $0.0007
                                                   ───────
                                                   $0.0406  ≈ ₹3.57 per document

Real cost is 2.4× the naive estimate.
At 40,000 documents/month: ₹59,200 estimated, ₹1,42,800 actual.
```

**The 2.4× ratio is typical.** If your business case was built on the naive figure, you have a problem before you start.

### The metric that matters

**Cost per resolved task**, not cost per token. Token price is a component, not an answer. A model at half the price that needs three attempts is more expensive.

---

## 8.2 — The Seven Levers, Ranked **[CORE]**

| # | Lever | Typical reduction | Effort | Where covered |
| ---: | :--- | ---: | :--- | :--- |
| 1 | **Model cascade** — cheap tier first, escalate on failure | **50–80%** | Medium | §8.3 |
| 2 | **Prompt caching** — stable prefix ordering | **50–90% of input** | **Low** | §7 |
| 3 | **Output length control** — `max_tokens`, terse formats, no restating the question | 20–50% | Low | Below |
| 4 | **Batch API** for non-interactive work | ~50% on that traffic | Low | §8.4 |
| 5 | **Retrieval precision** — 6 excellent passages, not 40 mediocre ones | 30–60% of input | Medium | Volume 3 |
| 6 | **Response caching** for repeated questions | 10–40% | Medium | Below |
| 7 | **Self-hosting** at sustained high volume | Variable | **High** | §9.1 |

### Lever 3, expanded, because it is underrated

Output tokens typically cost five to eight times input tokens. Reducing output length is therefore disproportionately valuable, and there are three easy sources of waste:

```
❌  "Thank you for your question about the exposure limit for NBFC
     counterparties. Let me review the relevant policy sections. Based
     on my analysis of the retrieved documents, I can tell you that..."
     → 45 tokens before any information appears

✅  "Exposure limit for NBFC counterparties: 15% of Tier-1 capital
     [policy-v4.2-s3.1]."
     → 18 tokens, complete answer
```

Three instructions that reliably cut output length by 30–50%:

```
- Do not restate or summarise the question.
- Do not describe your process. Give the answer.
- If the answer is a number or a short fact, give it in one sentence
  with its citation. Expand only if asked.
```

And always set `max_tokens` — as a cost control, not a formatting preference.

### Lever 6, with a warning

Semantic response caching returns a stored answer when a new question is sufficiently similar to a previous one. In a policy assistant, where hundreds of analysts ask overlapping questions, hit rates of 20–40% are achievable.

**The warning:** two questions that embed similarly can require different answers (V1 §5.2 — similarity is not relevance). Returning a cached answer to a subtly different question is a correctness failure that is very hard to detect, because the answer is fluent and was correct for a different question.

```
SAFE RESPONSE CACHING
  ▸ Very high similarity threshold (0.97+, not 0.85)
  ▸ Cache key includes the user's entitlements — never serve a cached
    answer across permission boundaries
  ▸ Cache key includes the corpus version — invalidate on any document
    update
  ▸ Short time-to-live, especially for anything policy-related
  ▸ Never cache anything with an account number, customer name, or
    borrower-specific detail in it
```

That last rule eliminates most of the risk, and also most of the hit rate. Response caching is worth doing for general policy questions and is usually not worth doing for anything account-specific.

---

## 8.3 — Cascade Routing **[CORE]**

**What this section gives you.** The single largest cost lever, and the pattern that also improves quality — which is unusual.

### The idea

Do not assign one model per use case. **Try a cheap model, check whether the answer is good enough, and escalate only when it is not.**

```
Request
   │
   ▼
┌──────────────────┐
│  CHEAP TIER      │  ~$0.20 / $1.20 per million
└────────┬─────────┘
         │
         ▼
   ┌──────────────┐      pass
   │ QUALITY GATE │───────────────► return
   └──────┬───────┘
          │ fail
          ▼
┌──────────────────┐
│ PRODUCTION TIER  │  ~$1.50 / $12.00 per million
└────────┬─────────┘
         │
         ▼
   ┌──────────────┐      pass
   │ QUALITY GATE │───────────────► return
   └──────┬───────┘
          │ fail
          ▼
┌──────────────────┐
│  FRONTIER TIER   │  ~$5.00 / $25.00 per million
└──────────────────┘
```

### What the quality gate can be

The gate must be cheap and must not require a human. Five options, roughly in order of cost:

| Gate | How it works | Cost |
| :--- | :--- | :--- |
| **Schema validation** | Did the output parse against the required structure? | Free |
| **Deterministic checks** | Are all cited passage IDs present in the retrieved set? Are required fields non-null? | Free |
| **Logprob threshold** | Was the model's confidence in its own tokens above a floor? (V1 §7.1) | Free — already returned |
| **Self-consistency** | Sample 3 times at low temperature; do they agree? | 3× the cheap call |
| **Judge model** | A second model grades the first against a rubric | One extra cheap call |

**Start with the free ones.** Schema validation plus citation verification catches a surprising share of cheap-tier failures at zero marginal cost, because a weaker model's failure mode is very often structural — it drops a field, invents an ID, or produces prose where JSON was required.

### Worked economics

Same credit assistant from §7.2 — 193,600 requests per month, 9,320 input tokens, 650 output.

```
ALWAYS PRODUCTION TIER (with caching, from §7.2)     $2,975/month

CASCADE, with a measured 74% resolution on the cheap tier:

  Cheap tier, all 193,600 requests attempted:
      cached input   919.6M × $0.20 × 0.10 / 1M     =  $18.39
      uncached input 884.8M × $0.20 / 1M            = $176.95
      output         125.8M × $1.20 / 1M            = $150.96
                                                      ────────
                                                       $346.30

  Production tier, the 26% that escalated (50,336 requests):
      cached input   239.1M × $1.50 × 0.10 / 1M     =  $35.87
      uncached input 230.0M × $1.50 / 1M            = $345.00
      output          32.7M × $12.00 / 1M           = $392.40
                                                      ────────
                                                       $773.27

  TOTAL                                                $1,119.57  ≈ ₹98,500

Saving against always-production: $1,856/month ≈ ₹1.63 lakh/month
                                              ≈ ₹19.6 lakh/year
Reduction: 62%
```

Note that the cheap tier is paid for on **every** request, including the ones that escalate. Cascade is still strongly net-positive because the cheap tier costs roughly 8% of the production tier.

### Why quality often improves

This is the counter-intuitive part and it is the reason to adopt cascade even if cost were not a concern.

A fixed-model system has **no quality gate at all**. A weak answer ships. A cascade forces you to define, in code, what "good enough" means — and that definition then catches failures that would previously have gone to the user silently.

**The escalation rate becomes your best early-warning signal.** If it moves from 26% to 41% over a week with no deployment, something changed: a corpus update degraded retrieval, a provider updated the cheap model, or the question mix shifted. You now have a number that tells you before your users do.

```
Put escalation rate on the dashboard. Alert on a 20% relative move.
```

### What not to do

**Do not route by guessing question difficulty up front.** "Simple questions to the cheap model, complex ones to the frontier" requires a classifier that is itself unreliable, and misclassification sends hard questions to weak models with no safety net. Attempt-and-check beats predict-and-assign, because the check is grounded in the actual output rather than in a guess about the input.

**The one exception is a hard override for data classification**, which must be decided before any call is made:

```python
ROUTING_POLICY = {
    # Hard override, evaluated FIRST. Not part of the cascade.
    "data_class:restricted":  "in_region_endpoint_only",

    # Cascade chains by use case
    "guardrail_check":     ["cheap"],
    "intent_classify":     ["cheap"],
    "doc_extract":         ["cheap", "production"],
    "policy_qa":           ["cheap", "production", "frontier"],
    "credit_memo_draft":   ["production", "frontier"],
    "agent_planner":       ["frontier"],
}
```

Customer-identifying data goes to a compliant endpoint regardless of cost. That is a policy decision, not an optimisation.

---

## 8.4 — Batch APIs **[WORKING]**

Most providers offer a batch mode: submit a large set of requests, receive results within a stated window (commonly up to 24 hours), pay roughly **half** the standard rate.

The provider gets to schedule your work into idle capacity, which is exactly the batching economics of §3.1 viewed from their side.

### What qualifies

```
GOOD CANDIDATES — nobody is waiting
  ▸ Overnight classification of the day's incoming documents
  ▸ Back-scoring a historical portfolio
  ▸ Regenerating summaries after a policy update
  ▸ Building or refreshing an evaluation dataset
  ▸ Bulk translation of a document set
  ▸ Periodic regulatory change monitoring

BAD CANDIDATES
  ▸ Anything a human is waiting for
  ▸ Anything inside a transaction flow with a timeout
  ▸ Anything where the input might be stale by the time it runs
```

### The pattern that gets you both

Many workloads look interactive but are not. A useful design move: **split the work into an asynchronous bulk pass and a thin interactive layer.**

```
Overnight, batch API (50% cheaper):
    - classify every document received that day
    - extract structured fields
    - generate a draft summary
    - flag exceptions

Next morning, interactive:
    - the analyst opens a document whose summary already exists
    - asks follow-up questions against the pre-extracted structure
    - only the follow-ups pay interactive pricing
```

This converts the expensive, high-volume portion of the work to half price and leaves only the genuinely interactive portion at full rate. It also makes the interactive experience faster, because the heavy lifting already happened.

---

## 8.5 — Budget Guardrails **[CORE]**

**What this section gives you.** The controls that prevent the specific incident that has embarrassed a large number of teams.

### The incident shape

An agent enters a loop. It calls a frontier model repeatedly, each call carrying a large context. Nobody is watching because it is 2 a.m. By morning the bill is five or six figures.

This is not hypothetical and it is not rare. It has one root cause — **an unbounded loop with an unbounded budget** — and one fix.

### The fix: budgets live in the run state

An alert on a dashboard is not a control. It requires a human to read it and act. The budget must be **an object carried in the execution state, checked before every model call, that halts execution itself.**

```python
from dataclasses import dataclass, field
import time

@dataclass
class RunBudget:
    """Carried in the agent's state. Checked before EVERY model call.
    This is a control, not telemetry."""
    max_steps:        int   = 12
    max_spend_usd:    float = 2.00
    max_wallclock_s:  float = 180.0

    steps:     int   = 0
    spend_usd: float = 0.0
    started:   float = field(default_factory=time.time)

    def check(self) -> str | None:
        """Returns a reason string if the run must stop, else None."""
        if self.steps >= self.max_steps:
            return "step_budget_exhausted"
        if self.spend_usd >= self.max_spend_usd:
            return "spend_budget_exhausted"
        if time.time() - self.started > self.max_wallclock_s:
            return "wallclock_exceeded"
        return None

    def record(self, cost_usd: float) -> None:
        self.steps     += 1
        self.spend_usd += cost_usd


# Used at the top of every loop iteration:
#
#   reason = budget.check()
#   if reason:
#       return escalate_to_human(reason)      # NEVER fail silently
#   response = model.call(...)
#   budget.record(response.cost_usd)
```

Three caps, not one. A run can be cheap but infinite (step cap catches it), expensive but short (spend cap catches it), or stuck waiting on a slow tool (wall-clock cap catches it).

### The full control set

```
BEFORE GO-LIVE — every item, no exceptions

[ ] max_tokens set on every single model call
[ ] Per-run caps on steps, spend and wall-clock, enforced in state
[ ] Per-tenant and per-use-case DAILY token budget with a HARD STOP,
    not merely an alert
[ ] Anomaly alert when cost per task moves more than 30% day over day
[ ] A kill switch per use case, tested — and it should DEGRADE to a
    cheaper tier or a cached response rather than returning an error
[ ] Every call tagged: tenant, use case, tier, environment, trace ID
[ ] A named owner for the monthly bill who actually reads it
```

### Tagging, because untagged spend is unmanageable spend

```python
# Attach to every model call. Without this you have one number at the
# end of the month and no ability to act on it.
metadata = {
    "tenant_id":     tenant,               # which business unit
    "use_case":      "credit_memo_qa",     # which product surface
    "tier":          "production",         # which model tier
    "env":           "prod",
    "trace_id":      trace_id,             # links to the full trace
    "user_id_hash":  hashed_user,          # hashed, never raw
}
```

With these five fields you can answer: which team, which feature, which tier, and whether it is growing. Without them, cost optimisation is guesswork.

### Check yourself

> **Q. Why is a dashboard alert on spend insufficient?**
> It requires a human to see and act on it. The failure mode is an unattended overnight loop. The control must be able to stop execution without a human, which means it lives in the code path, not in the monitoring system.

---

# PART 9 — DEPLOYMENT

## 9.1 — Hosted or Self-Hosted **[CORE]**

**What this section gives you.** A decision made on arithmetic rather than preference.

### The comparison

| | **Hosted API** | **Self-hosted open weights** |
| :--- | :--- | :--- |
| Time to first working result | Hours | Weeks |
| Peak capability available | Highest | Now within a few points at the frontier |
| Marginal cost | Linear in tokens, forever | Fixed hardware cost; near-zero marginal |
| Data residency | Depends on region availability | Total control |
| Latency floor | Network round trip plus provider queue | Yours to control; can co-locate |
| Customisation | Prompting; sometimes hosted fine-tuning | Full: LoRA, quantisation, custom decoding, logprobs |
| Version stability | Provider deprecates on their schedule | Freeze indefinitely |
| Operational burden | Near zero | Real: GPU ops, upgrades, CVEs, on-call |
| Compliance evidence | Vendor attestations and contracts | You own the whole chain |

### The break-even arithmetic

```
SELF-HOSTED, one 8-GPU node
    Capital cost                        ₹2.1–2.9 crore
    Useful life                         3 years
    Annualised capital                  ≈ ₹80 lakh/year
    Power, cooling, datacentre, staff   ≈ ₹35 lakh/year
    ─────────────────────────────────────────────────────
    Fully loaded                        ≈ ₹1.15 crore/year

CLOUD GPU, equivalent node
    On-demand ≈ $20–30/hour
    At 100% utilisation, 8,760 hours    ≈ $175k–$260k/year
                                        ≈ ₹1.54–2.29 crore/year

    → Break-even lands around 55–75% SUSTAINED utilisation.

BUT: 1–3 year committed cloud instances typically cut 40–60% off
     on-demand, pushing break-even above 85% sustained utilisation —
     which is why most enterprises never actually buy GPUs.
```

**And the comparison that usually decides it:** compare self-hosting against **hosted API pricing**, not against renting raw GPUs.

```
From §8.3, the cascade-routed credit assistant costs ≈ ₹98,500/month
                                                    ≈ ₹11.8 lakh/year

A single self-hosted node, fully loaded              ≈ ₹1.15 crore/year

Self-hosting is roughly TEN TIMES more expensive at this volume.
```

The break-even for that workload sits somewhere around ten times its current traffic — and even then, only if utilisation stays high, which it will not, because analyst traffic follows office hours.

### The decision rule

```
Start with a hosted API. Always.

Move to self-hosted open weights only when at least ONE is true:

  1. Data genuinely cannot leave your perimeter — a regulatory
     requirement, not a preference
  2. Sustained volume makes hosted cost exceed roughly 2× the fully
     loaded self-host cost, INCLUDING staff and on-call
  3. You need capabilities the API does not expose: logprobs, custom
     decoding, heavy LoRA adapter multiplexing
  4. Your latency requirement is below what a network round trip allows
  5. You need indefinite version pinning for model risk management, and
     the provider will not commit to it contractually

If none of these hold, self-hosting is a hobby being billed to the
project.
```

### The residency point, which is often decisive

For a regulated financial institution, condition 1 does real work — but it is more nuanced than "data cannot leave the country."

Major providers offer Indian regions. The genuine constraint is that **not every model is available in every region**, so the best model may not be available where your data must stay.

The pattern that resolves this is **routing by data classification**, not by model preference:

```
Class 1 — customer identifying data, account-level detail, KYC
          → in-region endpoint, or self-hosted, no exceptions

Class 2 — internal policy, procedures, non-customer documents
          → in-region preferred; global acceptable under contract

Class 3 — de-identified analytical queries, public regulatory text
          → best available model, any region
```

That routing table is a small artefact, and it is frequently the specific thing an internal audit or a supervisor asks to see.

---

## 9.2 — Reproducibility **[CORE]**

**What this section gives you.** Protection against the most common and most bewildering production incident: behaviour changing with no deployment.

### Why this is harder than in ordinary software

A conventional application has one dependency tree. An AI system has a dozen independently versioned things, several of which can change without your involvement:

```
Python version                          you control
Library versions                        you control
CUDA and driver version                 you control
Inference engine version                you control
MODEL VERSION                           ← THE PROVIDER CONTROLS THIS
Prompt version                          you control
Retrieval corpus contents               ← changes when documents update
Embedding model version                 you control (re-index on change)
Reranker version                        you control
Tool schema definitions                 you control
Guardrail model and ruleset             you control
Sampling parameters                     you control
```

**Any one of these drifting silently changes system behaviour.**

### The single most common failure

```
❌  model = "some-model-latest"
```

The provider improves the model. Your evaluations were run against the previous version. Behaviour changes overnight, quality moves in some slice you were not watching, and nobody can explain it because nothing was deployed.

```
✅  model = "some-model-2026-07-24"      # explicit, pinned, recorded
```

Pin the explicit version string. Record it in your model registry. Treat a version change as a model change: full evaluation suite, canary, rollback path.

### The pinning checklist

```
[ ] Base container image by DIGEST (sha256), not by tag
[ ] Python dependencies fully locked with hashes (uv.lock / poetry.lock)
[ ] Inference engine version pinned, with its CVE status tracked (§6.3)
[ ] MODEL VERSION STRING explicit — never a floating alias
[ ] Embedding model and reranker versions pinned
    (a change here means a FULL corpus re-index — V1 §5.3)
[ ] Prompt version as a git SHA, injected as an environment variable
    AND recorded in every trace
[ ] Retrieval corpus snapshot ID recorded in every trace
[ ] Sampling parameters in configuration, not scattered in code
[ ] Guardrail model and ruleset versions pinned
```

### A container that pins everything

```dockerfile
# Pin the base image by DIGEST. A tag like "3.12-slim" moves; a digest
# does not.
FROM python:3.12-slim@sha256:<digest>

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1
WORKDIR /app

# uv is a fast Python package installer. --frozen means "install exactly
# what the lock file specifies, fail if it cannot".
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev

COPY src/ ./src/
COPY prompts/ ./prompts/

# Every version-bearing value becomes an environment variable, set at
# build time and logged with every request. When someone asks "what was
# running on 14 August", the trace answers it.
ARG GIT_SHA
ENV PROMPT_VERSION=${GIT_SHA} \
    MODEL_PIN="<explicit-version-string>" \
    EMBEDDING_MODEL_PIN="<explicit-version-string>" \
    RERANKER_PIN="<explicit-version-string>" \
    CORPUS_SNAPSHOT="2026-08-01"

# Run as a non-root user. Standard practice, and specifically relevant
# given §6.3.
RUN adduser --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

HEALTHCHECK --interval=30s --timeout=3s CMD python -m src.health || exit 1
CMD ["uv", "run", "uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8080"]
```

---

## 9.3 — Reliability Patterns **[CORE]**

**What this section gives you.** The standard defences, and why the AI-specific twist on each matters.

External model providers have outages, rate limits, and latency spikes. Your system must degrade rather than fail.

| Pattern | Implementation | The AI-specific twist |
| :--- | :--- | :--- |
| **Timeout** | On every model and tool call | Must accommodate reasoning models, whose latency is genuinely variable. Set from measured p99, not from a guess. Too tight causes false failures. |
| **Retry** | Exponential backoff with jitter, capped at 2–3 attempts | **Only on idempotent operations.** A retried generation costs money each time and may return a different answer. Retry on transport errors; do not blindly retry on a bad answer. |
| **Circuit breaker** | Open after N consecutive failures; probe periodically; close when healthy | Track per provider *and* per model tier. One tier being rate-limited should not take down the others. |
| **Fallback chain** | Primary → secondary provider → cheaper model → cached answer → deterministic response → honest error | **Never a spinner and never a stack trace.** "I'm unable to answer right now, here are the three most relevant policy documents" is a valid degraded response. |
| **Bulkhead** | Separate connection pools and quotas per tenant | Prevents one business unit's batch job from starving the interactive assistant. |
| **Load shedding** | Under pressure, degrade deliberately: skip reranking, reduce retrieved passages, drop to a cheaper tier | Degrade *quality* to preserve *availability*, and record that you did so in the trace. |

### The degraded-mode design

Decide, in advance and in writing, what the system does when the model is unavailable. For a credit policy assistant:

```
LEVEL 0  Normal — full retrieval, reranking, production-tier generation

LEVEL 1  Model tier degraded — cheap tier only. Answers are shorter and
         plainer. Banner: "Operating in reduced mode."

LEVEL 2  Generation unavailable — return retrieved passages directly,
         ranked, with citations, and no generated summary. The analyst
         reads the source. STILL USEFUL.

LEVEL 3  Retrieval unavailable — keyword search over document titles only.

LEVEL 4  Honest failure with a link to the document repository and an
         estimated restoration time.
```

**Level 2 is the important one.** A retrieval system without generation is still a good search engine, and for a policy assistant that is a large fraction of the value. Many teams have no Level 2 and jump from working to broken.

---

## 9.4 — Rollout **[WORKING]**

Any change to the model, the prompt, the retrieval configuration, or the quantisation is a change to system behaviour and goes through the same sequence.

```
1. SHADOW      Run the new version on real production traffic.
               Serve the OLD version's output to users.
               Compare offline. Zero user impact.
               Run 3–7 days.

2. CANARY      5% of traffic on the new version.
               AUTOMATIC rollback on: quality delta, error rate,
               p95 latency, cost per task, guardrail trigger rate.

3. RAMP        25% → 50% → 100%, with a soak period at each step.

4. GA          Keep the previous version deployable for 30 days.
```

### Why shadow mode is worth more here than in ordinary software

In conventional software, shadow mode mainly validates that a service does not crash. For an AI system it produces something more valuable: **a labelled comparison dataset.**

Run a credit memo assistant in shadow against live applications for a month, and you have several thousand paired examples of what the system produced and what the human analyst actually wrote. That dataset is simultaneously:

- your quality evidence for the business case,
- your validation evidence for model risk review,
- training data if you later fine-tune (V1 §9.5),
- and the seed of your evaluation set (Volume 5).

All of it obtained with zero customer exposure. **Shadow mode is the highest-value four weeks in an AI deployment**, and it is routinely skipped because it produces nothing user-visible.

---

## 9.5 — Service Level Objectives **[WORKING]**

Commit to numbers. Unmeasured systems drift.

```
AVAILABILITY        99.5%   — with degraded modes counting as available
TTFT p95            < 1.5 s
E2E p95, simple     < 5 s
E2E p95, complex    < 20 s, with visible progress throughout
Cache hit rate      > 90%   on workloads with a stable prefix
Cost per task       < target, alert on +30% day over day
Escalation rate     within a band, alert on ±20% relative movement
Error rate          < 0.5% after fallbacks
```

**Two of these are unusual and worth keeping.** Cache hit rate and escalation rate are not conventional SLOs, but they are the two metrics that move first when something has gone wrong — cache hit rate catches prompt-construction regressions, escalation rate catches quality regressions. Both move days before user complaints do.

---

# PART 10 — CAPACITY PLANNING, WORKED END TO END

## 10.1 — The Exercise **[CORE]**

**What this section gives you.** Everything in Volumes 1 and 2 applied to one realistic sizing problem, from a blank page to a defensible answer.

### The requirement

A bank is deploying a credit policy assistant for its lending operations.

```
Users                       800 credit analysts and underwriters
Usage                       11 queries per analyst per working day
Working days                22 per month
Peak concentration          40% of daily volume between 10:00 and 13:00
Prompt shape                ~9,300 input tokens, ~650 output tokens
                            (5,000 stable prefix + 4,200 retrieved
                             evidence + question)
Latency requirement         TTFT under 1 second, 30+ tokens/sec streaming
Data classification         Internal policy documents and de-identified
                            queries. No customer-identifying data reaches
                            the model.
```

### Step 1 — Volume

```
Monthly requests  = 800 × 11 × 22          = 193,600
Daily requests    = 800 × 11               =   8,800
Peak-hour rate    = 8,800 × 0.40 ÷ 3 hours =   1,173 per hour
                                            =   0.33 requests/second

Peak token rates:
    Prefill:  0.33 × 9,300 =  3,069 tokens/second
    Decode:   0.33 ×   650 =    214 tokens/second   (aggregate)
```

**That 0.33 requests per second is the number that decides everything**, and it surprises people. Eight hundred analysts generate a peak load of one request every three seconds. Human-driven enterprise workloads are far smaller than they feel.

### Step 2 — Concurrency

```
Average request duration ≈ TTFT + (650 tokens ÷ 30 tokens/sec)
                         ≈ 0.6 s + 21.7 s
                         ≈ 22.3 seconds

Concurrent requests = arrival rate × duration        (Little's Law)
                    = 0.33 × 22.3
                    ≈ 7.4 concurrent requests at peak

Design for 3× headroom → 22 concurrent requests.
```

**Little's Law** — the average number of items in a system equals the arrival rate multiplied by the average time each spends there — is the one queueing result worth knowing. It converts a request rate into a concurrency requirement, which is what actually sizes hardware.

### Step 3 — Hosted option

From §8.3, cascade-routed with prompt caching:

```
                                      ≈ $1,120/month  ≈ ₹98,500/month
                                                      ≈ ₹11.8 lakh/year
```

Add retrieval infrastructure — embedding, vector store, reranking — at roughly ₹1.5 lakh per year at this corpus size, and application hosting on ordinary CPU instances at roughly ₹3 lakh per year.

```
HOSTED TOTAL ≈ ₹16.3 lakh/year
```

Engineering effort: no GPU operations, no capacity management, no upgrade cycle.

### Step 4 — Self-hosted option

Size the hardware for 22 concurrent requests on a 32B model at FP8.

```
MEMORY
    Weights, 32B at 1 byte per parameter              32 GB
    Framework and CUDA overhead                        3 GB
    ─────────────────────────────────────────────────────────
    Available for KV cache on an 80 GB card           45 GB
    Apply the 85% planning rule                       38 GB usable

    Per-token cache cost (32B, GQA, FP8 cache)
        ≈ 2 × 64 layers × 8 kv_heads × 128 × 1 byte  = 131 KB/token

    Cache needed for 22 concurrent × 10,000 tokens
        = 22 × 10,000 × 131 KB                        = 28.8 GB
                                                        ✓ fits in 38 GB

THROUGHPUT CHECK
    Card bandwidth ≈ 3.35 TB/s
    Per decode step at batch 22:
        weights                                        32 GB
        KV cache (22 × 10,000 × 131 KB)                28.8 GB
        ────────────────────────────────────────────────────
        total traffic                                  60.8 GB
        time per step = 60.8 ÷ 3,350                 = 18.1 ms
        → 55 tokens/sec per user, 1,215 aggregate
                                                        ✓ exceeds the
                                                          30 tok/s target

VERDICT: one 80 GB accelerator is sufficient, with real headroom.
         Two for redundancy, because a single card is a single point
         of failure for 800 users.
```

```
COST
    2 × cloud GPU instances, committed 1-year rate
        ≈ $2.20/hour each × 2 × 8,760 hours          ≈ $38,500/year
                                                     ≈ ₹33.9 lakh/year
    Retrieval infrastructure                          ≈ ₹1.5 lakh/year
    Application hosting                               ≈ ₹3 lakh/year
    ─────────────────────────────────────────────────────────────────
    Infrastructure subtotal                           ≈ ₹38.4 lakh/year

    Plus: 0.5 FTE of engineering time for GPU operations, upgrades,
          CVE patching, and on-call — realistically ₹15–25 lakh/year.

SELF-HOSTED TOTAL ≈ ₹53–63 lakh/year
```

### Step 5 — The comparison

```
                        HOSTED              SELF-HOSTED
Annual cost             ₹16.3 lakh          ₹53–63 lakh
Ratio                   1×                  3.3–3.9×
Time to production      2–4 weeks           8–14 weeks
Ongoing engineering     ~0                  0.5 FTE
Model capability        Best available      Whatever you deployed
Version control         Provider's schedule Yours indefinitely
Data residency          Region-dependent    Complete
```

**Hosted wins decisively on cost at this volume**, and the gap is not close.

### Step 6 — Where the answer flips

```
Self-hosting becomes competitive when hosted cost approaches roughly
₹50 lakh/year, which at this prompt shape and cascade configuration
means approximately 4× the traffic — around 800,000 requests/month,
or roughly 3,200 analysts.

It becomes MANDATORY regardless of cost if:
    ▸ customer-identifying data must reach the model, and no compliant
      in-region endpoint offers an acceptable model
    ▸ model risk management requires indefinite version pinning that
      the provider will not contract to
    ▸ you need logprobs, custom decoding, or heavy LoRA multiplexing
```

### Step 7 — The recommendation

```
DEPLOY HOSTED, behind a gateway, with:

  ▸ cascade routing across three tiers, escalation rate monitored
  ▸ prompt caching with a stable 5,000-token prefix, hit rate on the
    dashboard, target above 90%
  ▸ a data-classification routing table as a hard override
  ▸ model version explicitly pinned and recorded in every trace
  ▸ a full trace store for evaluation, debugging and audit
  ▸ per-tenant daily budget caps with hard stops
  ▸ a documented degraded mode down to retrieval-only (§9.3)

REVISIT the self-hosting question when EITHER:
  ▸ monthly hosted spend passes ₹4 lakh, OR
  ▸ the data classification requirement changes
```

**Note that the gateway makes this reversible.** If either trigger fires, moving to self-hosted open weights is a change of endpoint configuration and a re-run of the evaluation suite — not a re-architecture. That is the entire reason for the gateway pattern.

### Check yourself

> **Q. The bank now wants the same assistant available to 4,000 relationship managers, mostly for simpler product questions. What changes?**
> Volume rises roughly 5×, so hosted cost approaches the flip point. But the *shape* changes too: simpler questions mean a higher proportion resolve at the cheap tier, and shorter prompts mean lower cost per request. Re-measure the escalation rate on the new traffic mix before assuming linear cost growth — the cascade may absorb most of the increase.

---

## 10.2 — Volume 2 Reference Card

```
THE TWO PHASES
  Prefill  = whole prompt at once · COMPUTE-bound · drives TTFT
             cost grows with the SQUARE of prompt length
  Decode   = one token at a time · MEMORY-BANDWIDTH-bound · drives TPOT
             GPU often under 20% utilised
  Arithmetic intensity gap between them: ~6,000×

METRICS
  TTFT  target < 500 ms interactive
  TPOT  target 20–50 ms (= 20–50 tokens/sec)
  E2E   = TTFT + (TPOT × output tokens)
  Measure your INPUT:OUTPUT ratio before choosing what to optimise

MEMORY
  Contiguous KV allocation wastes 62–80% to fragmentation
  PagedAttention: 16-token blocks + block table → ~96% efficiency
    plus prefix sharing, preemption, cheap parallel sampling
  RadixAttention: a TRIE over all cached prefixes across all requests
    → 20–30% further gain when >60% of input tokens are shared

BATCHING
  Batch 1 → 47 tok/s per user, 47 total
  Batch 32 → 30 tok/s per user, 967 total    (20× throughput)
  Two ceilings: KV cache memory, and acceptable per-user latency
  Continuous batching (rebuild the batch every step) = 2–4× over static
  Chunked prefill = the fix for head-of-line blocking

SPECULATIVE DECODING
  Draft k tokens cheaply, verify all k in one target pass
  Speedup ≈ acceptance rate × k → 1.5–3× on TPOT
  PROVABLY LOSSLESS — no re-evaluation needed
  Helps at low/medium concurrency; may not help under saturation
  n-gram variant is free and excellent for extraction/summarisation

QUANTISATION
  FP8 → adopt by default. INT4 → only with slice-level evaluation.
  Also quantise the KV CACHE, not just the weights
  Degradation concentrates in: arithmetic · long-context retrieval
    · non-English · schema conformance · rare tokens
  Aggregate scores conceal slice collapse. Always report by slice.

ENGINES
  vLLM     the default; broadest hardware and ecosystem
  SGLang   when >60% of input tokens are shared
  TRT-LLM  NVIDIA-only, peak throughput, needs a platform team
  All expose an OpenAI-compatible API — switching is a container swap
  NEVER expose an inference engine directly. Pin versions. Watch CVEs.

PROMPT CACHING
  Prefix-based: matches from byte zero, stops at first difference
  Order: system → tools → examples → policy → evidence → history → question
  NEVER put a timestamp or session ID at the top
  Do NOT dynamically vary the tool list — it destroys cache locality
  Target > 90% hit rate. Put it on the dashboard.
  ~90% off cached input cost, ~75% off prefill latency

COST
  Cost per RESOLVED TASK, never cost per token
  Real cost ≈ 2–2.5× the naive token estimate
  Forgotten terms: thinking tokens · requests per task · retries and
    escalations · guardrail and reranking calls
  Levers ranked: cascade (50–80%) · caching (50–90% of input)
    · output length (20–50%) · batch API (50%) · retrieval precision
  Cascade also IMPROVES quality, because it forces a quality gate
  Escalation rate is your best early-warning signal

BUDGETS
  Three caps in the RUN STATE, not on a dashboard:
    max steps · max spend · max wall-clock
  Tag every call: tenant · use case · tier · env · trace_id
  Kill switch degrades to a cheaper tier, never to an error

DEPLOYMENT
  Start hosted. Self-host only for residency, 2× cost advantage,
    capability access, latency floor, or mandated version pinning
  Break-even is typically ~4× a large enterprise workload's volume
  Pin EVERYTHING — especially the model version. Never use "-latest".
  Shadow → canary 5% → ramp → GA, previous version deployable 30 days
  Shadow mode produces your evaluation set, your business case, and
    your model risk evidence, at zero customer exposure
  Design a degraded mode down to retrieval-only. Never a spinner.
```

---

## 10.3 — What You Can Now Do

- Read a latency complaint and classify it as a prefill or decode problem, then name the fix.
- Size a deployment from a user count: volume → concurrency → memory → throughput → cost.
- Explain why hosted APIs undercut dedicated GPUs, and calculate where that reverses.
- Configure an inference engine with every flag justified rather than copied.
- Restructure a prompt to raise cache hit rate above 90%, and quantify the saving.
- Build a cascade with a quality gate, and use the escalation rate as a quality signal.
- Prevent the runaway-agent cost incident before it happens.
- Take a quantisation decision on slice-level evidence rather than an aggregate score.

**What remains.** Volume 2 made the loop fast and cheap. It said nothing about whether the answer is *correct*. Volume 3 covers retrieval — how the right information reaches the model in the first place, which V1 §1.2 identified as both the largest share of engineering effort and the largest single cause of production failure.

---

*Volume 2 ends here. Volume 3: Retrieval and Knowledge.*
