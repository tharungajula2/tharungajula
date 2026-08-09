---
title: "NOTE 001: THE AI ENGINEERING TEXTBOOK — VOLUME 1"
subtitle: "Foundations: What a Model Is, How It Works, What It Costs"
date: "2026-08-09"
order: 1
tags: ["AI Engineering", "Foundations", "LLMs", "Beginner Guide"]
---

# THE AI ENGINEERING TEXTBOOK
## Volume 1 — Foundations: What a Model Is, How It Works, What It Costs

---

## HOW TO READ THIS

This volume assumes **nothing**. Not Python, not linear algebra, not machine learning. Every idea is built from the one before it. If something is unclear, the fault is in the writing, and the fix is to slow down at that paragraph rather than push on.

### The layer markers

Not everything needs to land on the first pass. Each section carries a marker:

| Marker | Meaning |
| :--- | :--- |
| **[CORE]** | Everything later in this textbook depends on this. Do not move on until it is solid. |
| **[WORKING]** | You need this to actually build or evaluate something. Learn it, but it can follow a second reading. |
| **[DEEPER]** | Safe to skip on a first pass. Marked so you know it exists and can return in a focused session. |
| **[RETURN HERE]** | A specific idea you will need again later. Noted so you can find it fast. |

A first pass reads only **[CORE]** and **[WORKING]**. That is roughly 60% of the volume and it is a complete, coherent picture. **[DEEPER]** sections fill in the parts that matter once you are building rather than learning.

### The shape of each section

```
What this section gives you      — the capability you walk away with
The problem                      — why anyone invented this
Building the idea                — from zero, in order
Worked example                   — small numbers, verifiable by hand
In practice                      — what it looks like at real scale
What breaks                      — the failure you will actually hit
Check yourself                   — 2–3 questions, answers given
```

### Notation used throughout

| Symbol | Meaning |
| :--- | :--- |
| `×` | multiply |
| `·` | dot product (defined in §3.2) |
| `Σ` | "sum of" — add up a list of things |
| `≈` | approximately equal |
| `d` | a dimension count, e.g. `d_model` = width of the model's internal vectors |
| `n` | a count of items, usually tokens |
| ₹ | Indian rupee. 1 lakh = ₹1,00,000. 1 crore = ₹1,00,00,000 |
| $ | US dollar. API and cloud pricing is billed in USD; ₹ conversions use ~₹88/$ and will drift |

---

# PART 1 — WHAT YOU ARE ACTUALLY BUILDING

\

**What this section gives you.** A correct mental picture of what a language model physically is, so that nothing later sounds like magic.

### The problem

People say "the AI" as if it were a single entity that thinks. That picture makes every subsequent concept harder, because it invites you to explain behaviour by intention ("it decided to lie") rather than by mechanism ("the next-token distribution had high probability mass on a false continuation because retrieval returned nothing relevant").

### Building the idea

A language model is **a file on disk containing a very large list of numbers**, plus a small program that knows how to use them.

That is not a simplification. It is literally true. If you download an open-weights model, you get files like:

```
model-00001-of-00004.safetensors     4.98 GB
model-00002-of-00004.safetensors     4.99 GB
model-00003-of-00004.safetensors     4.92 GB
model-00004-of-00004.safetensors     1.17 GB
config.json                          1.4 KB
tokenizer.json                        7.0 MB
```

The `.safetensors` files are the numbers. Roughly 16 GB of them here — which, at 2 bytes per number, is about **8 billion numbers**. Each of those numbers is called a **parameter** or a **weight**. "An 8B model" means 8 billion of these numbers.

`config.json` says how the numbers are arranged — how many layers, how wide each one is. `tokenizer.json` says how to turn text into numbers in the first place (§4).

**Nothing else is in there.** No database of facts. No index of the internet. No stored copies of the documents it was trained on. Just the numbers, and an arrangement.

### Where the "knowledge" lives

This is the part that feels impossible, so it is worth stating carefully.

During training, the model was shown enormous quantities of text and repeatedly adjusted its numbers to get better at one single task: **predict the next chunk of text**. Nothing else. Not "understand", not "reason" — predict the next chunk.

To get good at that task, the numbers had to end up encoding an enormous amount of structure about the world, because predicting text well *requires* that structure. To correctly predict the word after "The RBI's repo rate was raised to", the numbers must have absorbed something about Indian monetary policy. Not as a stored sentence — as a pattern in how the numbers relate to each other.

So the knowledge is real, but it is **diffuse and lossy**. It is smeared across billions of numbers rather than stored in retrievable records. This has three consequences you will meet constantly:

1. **It cannot cite.** There is no record of where a fact came from, because there are no records.
2. **It cannot be edited surgically.** You cannot open the file and correct one fact.
3. **It confuses similar things.** Two facts that were statistically similar in training can blend. This is the mechanism behind hallucination — not lying, but interpolation between patterns.

**[RETURN HERE]** — Points 1–3 are the entire justification for retrieval systems, which are Volume 3. When someone asks "why not just fine-tune the facts in?", these three points are the answer.

### Running the file

The numbers do nothing by themselves. To get an answer you:

1. Load all 16 GB into memory that a processor can reach quickly.
2. Convert your text into numbers (§4).
3. Push those numbers through a fixed sequence of arithmetic operations defined by the arrangement in `config.json` — mostly multiplication and addition, done billions of times.
4. Get out a score for every possible next chunk of text.
5. Pick one. Append it. Go back to step 2.

That loop is called **inference**. Everything in Volume 2 is about making that loop fast and cheap, because you pay for it every single time anyone uses your system.

**Training** — creating the numbers in the first place — costs tens of millions of dollars and is done by roughly ten organisations worldwide. You will almost certainly never do it. **You will do inference, constantly.** Budget your learning accordingly, and note that this textbook does the same: training gets one part, inference gets several.

### What breaks

The most common early mistake is treating the model as a source of truth. It is a source of **plausible continuations**. Plausible and true overlap heavily on well-represented topics and diverge sharply on specifics — dates, numbers, names, recent events, internal policies, anything rare.

A credit assistant asked "what is the current provisioning requirement for a sub-standard secured advance?" will produce a fluent, confident, correctly-formatted answer whether or not it knows. That is the default failure, and the entire architecture in later volumes exists to prevent it.

### Check yourself

> **Q. If a model's weights are 16 GB, roughly how many parameters does it have, and why can't you answer exactly?**
> About 8 billion, if each parameter is stored in 2 bytes. You can't answer exactly without knowing the storage precision — the same 8B model is 32 GB at 4 bytes per parameter, 16 GB at 2 bytes, 8 GB at 1 byte. That choice is called *precision* and it is covered in §8.4.

> **Q. Why can a model not tell you which document a fact came from?**
> Because it does not store documents. Training adjusted numbers so as to predict text well; the source of any particular pattern is not recoverable from the resulting numbers.

---

\

**What this section gives you.** The map of everything else, so that each later part has a place to sit.

### The problem

Almost all public attention goes to models. Almost all engineering effort goes elsewhere. If your mental map is model-shaped, you will be surprised by where the work actually is, and you will build systems that demo well and fail in production.

### Building the idea

A deployed AI system has six **layers** you build through and four **pillars** that cut across all of them.

```
┌─────────────────────────────────────────────────────────────────────┐
│  LAYER 6   APPLICATION      what the user sees and does             │
├─────────────────────────────────────────────────────────────────────┤
│  LAYER 5   ORCHESTRATION    multi-step logic, state, human approval │
├─────────────────────────────────────────────────────────────────────┤
│  LAYER 4   CONTEXT          what information reaches the model      │
├─────────────────────────────────────────────────────────────────────┤
│  LAYER 3   SERVING          how the model runs, fast and cheap      │
├─────────────────────────────────────────────────────────────────────┤
│  LAYER 2   MODEL            the file from §1.1                      │
├─────────────────────────────────────────────────────────────────────┤
│  LAYER 1   COMPUTE          the hardware underneath                 │
└─────────────────────────────────────────────────────────────────────┘
       ║            ║             ║              ║
   PILLAR A     PILLAR B      PILLAR C       PILLAR D
   EVALUATION   SECURITY      GOVERNANCE     COST CONTROL
   how you      what stops    what satisfies  what stops the
   know it      an attacker   an auditor      bill exploding
   works
```

**Layer 2 — the model — is a purchased or downloaded component.** You did not build it, you can swap it in an afternoon, and its price falls sharply every year. Every other box is yours, and represents months of work.

### Where the effort actually goes

Across enterprise AI programmes, the rough distribution:

| Concern | Share of engineering effort | Share of production failures |
| :--- | ---: | ---: |
| Choosing the model, writing prompts | 10% | 5% |
| Getting the right information into the prompt | 30% | 35% |
| Knowing whether it works | 20% | 25% |
| Security, guardrails, compliance | 20% | 20% |
| Running it fast and affordably | 20% | 15% |

The second row is worth pausing on. **The largest single cause of production failure is not the model being weak — it is the model not having been given the information it needed.** When a credit assistant gives a wrong provisioning answer, the usual cause is that the relevant circular was never retrieved, not that the model was incapable of reading it.

### A banking parallel that is not an analogy

You have almost certainly seen this shape before in a different form. A credit scorecard is a statistical model — a set of coefficients. But a *lending business* is not a scorecard. It is:

- the data pipeline that assembles bureau pulls and bank statements,
- the policy layer that turns a score into a decision,
- the monitoring that detects when the score stops working on new applicants,
- the audit trail that proves why each decision was made,
- the collections and provisioning machinery downstream.

The scorecard is one box in that picture. The AI stack has exactly the same proportions: the model is one box, and the box is the cheapest and most replaceable one.

### What breaks

Teams spend months tuning prompts because prompt-tuning gives immediate visible feedback, while fixing the retrieval pipeline gives no feedback until you have built a way to measure retrieval quality. So they optimise the thing they can see. Six months later the system is 40% accurate and nobody can say why, because there is no measurement anywhere.

The sequence that avoids this is: **measure first, retrieve second, prompt third.**

### Check yourself

> **Q. A system gives a fluent but factually wrong answer about internal policy. Name the two most likely layers at fault, in order.**
> Layer 4 (Context) first — the policy document was probably not retrieved, or was retrieved but ranked below irrelevant material. Layer 2 (Model) last — the model answering from its diffuse training memory rather than from provided evidence is a *symptom* of Layer 4 having supplied nothing.

---

\

**What this section gives you.** A single concrete trace through the whole system, so that every later part has a known place in a known sequence.

Follow one real question through a production system. Everything named here is explained in full later; the goal now is only the sequence.

**The question.** A credit analyst types:

> *"Can we sanction ₹2 lakh to an existing JLG member who has one account in 31–60 DPD?"*

**Domain note.** JLG means Joint Liability Group — the standard microfinance lending structure in India, where four to ten women guarantee each other's loans without physical collateral. DPD means Days Past Due; "31–60 DPD" means one payment cycle missed but not yet two. In microfinance this matters more than in retail lending, because the group's joint liability means one member's delinquency is a signal about the group's collective repayment capacity, not just that individual's.

**Step 1 — Rewrite the question.** Real questions reference earlier conversation ("what about for MFIs?"). A cheap model rewrites the question into a standalone, self-contained form before anything else happens. *(Volume 3)*

**Step 2 — Check the input.** Deterministic code scans for anything that must not proceed: personal identifiers, attempts to manipulate the system, out-of-scope requests. *(Volume 5)*

**Step 3 — Search.** Two searches run in parallel over the document corpus:
- one by **meaning** — finds text about group delinquency even if it never uses the words "JLG member"
- one by **exact keyword** — finds the specific circular number or the exact phrase "31-60"

Both are filtered so the analyst only sees documents they are entitled to see. *(Volume 3)*

**Step 4 — Rank.** The two searches return perhaps 100 candidate passages. A second, more careful model reads each passage *together with* the question and scores relevance properly, keeping the best six. *(Volume 3)*

**Step 5 — Decide whether to answer at all.** If nothing scores above a threshold, the system says it could not find the answer. This is a feature, not a failure. *(Volume 3)*

**Step 6 — Assemble the prompt.** The six passages, the internal credit policy section, the question, and the rules ("answer only from the evidence, cite every claim, never state a decision") are arranged into one text block in a specific order. *(Volume 4)*

**Step 7 — Generate.** The model produces an answer, one token at a time. *(§7)*

**Step 8 — Call tools if needed.** If the analyst had asked "and what's the group's current exposure?", the model would emit a structured request; your code — not the model — decides whether to execute it and returns the result. *(Volume 4)*

**Step 9 — Check the output.** Every cited passage ID must actually exist. Every factual claim must be supported by the retrieved text. No prohibited phrasing ("guaranteed approval"). *(Volume 5)*

**Step 10 — Record everything.** The question, the retrieved passages and their scores, the exact prompt, the exact response, the cost, the latency — all stored. *(Volume 5)*

**Notice what the model did.** It did steps 1 and 7, and proposed step 8. Ten steps; the model performed two. That ratio is the honest picture of AI engineering.

**Notice what the model did not do.** It did not decide anything. The answer explains policy; a human sanctions the loan. In regulated lending this separation is not a design preference — it is what makes the system approvable, and it is developed fully in Volume 6.

---

# PART 2 — READING THE CODE IN THIS TEXTBOOK

\

Code appears throughout this textbook. If you cannot read it, those pages are wasted, and worse, they create the impression that something important is being hidden from you.

This part teaches you to **read** Python — not to write it. Reading is a much smaller skill and it is sufficient for everything here. About twenty constructs cover every code block in all six volumes. They are below, each shown in a form you will actually meet.

If you already know Python, skip to §3.

---

\

### 1. Assignment — giving a name to a value

```python
model_name = "Qwen3-8B"
max_tokens = 2048
temperature = 0.0
```

`=` does not mean "equals" in the mathematical sense. It means "**store this value under this name**". Read it as "let `max_tokens` be 2048". From then on, writing `max_tokens` means 2048.

### 2. The basic value types

```python
count      = 42                    # int      — a whole number
rate       = 0.0725                # float    — a decimal number
name       = "Sunita Devi"         # str      — text, always in quotes
is_active  = True                  # bool     — True or False, capitalised
missing    = None                  # None     — "no value at all", not zero
```

`None` is worth noting: it means *absent*, which is different from zero. A loan with `emi = 0` has an EMI of zero rupees. A loan with `emi = None` has an unknown EMI. In credit data that distinction matters enormously.

### 3. Comments

```python
# Everything after a hash on a line is ignored by the computer.
rate = 0.0725        # It is a note for humans.
```

In this textbook, comments carry a lot of the explanation. Read them.

### 4. Lists — an ordered collection

```python
reason_codes = ["HIGH_FOIR", "THIN_FILE", "RECENT_ENQUIRY"]

reason_codes[0]      # → "HIGH_FOIR"      counting starts at ZERO
reason_codes[1]      # → "THIN_FILE"
reason_codes[-1]     # → "RECENT_ENQUIRY"  negative counts from the end
len(reason_codes)    # → 3                 how many items
```

**Counting from zero is the single most common source of confusion for new readers.** The first item is item 0. There is a historical reason and it does not matter; just remember it.

### 5. Dictionaries — labelled collections

```python
application = {
    "borrower_id":   "CIF-00218841",
    "amount_inr":    200000,
    "tenor_months":  24,
    "product":       "jlg",
}

application["amount_inr"]        # → 200000
application["product"]           # → "jlg"
```

A dictionary is a set of **key: value** pairs. This is the single most important structure in this textbook, because it is exactly the shape of every message sent to a model:

```python
message = {"role": "user", "content": "What is the FOIR cap?"}
```

### 6. Nesting — collections inside collections

```python
messages = [
    {"role": "system", "content": "You are a credit policy assistant."},
    {"role": "user",   "content": "What is the FOIR cap for JLG loans?"},
]
```

Read this as: *a list containing two dictionaries*. `messages[0]["role"]` is `"system"` — take item 0 of the list, then look up the key `"role"` in it. Nesting looks intimidating and is only ever this: containers inside containers.

### 7. Functions — a named, reusable block

```python
def calculate_foir(monthly_emi, monthly_income):
    """Fixed Obligation to Income Ratio — what fraction of income
    is already committed to loan repayments."""
    return monthly_emi / monthly_income
```

- `def` — "define a function"
- `calculate_foir` — the name
- `(monthly_emi, monthly_income)` — the inputs, called **parameters**
- The `"""triple-quoted"""` text is a **docstring** — documentation, ignored by the computer
- `return` — the answer the function hands back

Calling it:

```python
foir = calculate_foir(12000, 40000)      # → 0.3, i.e. 30%
```

**Domain note.** FOIR is the standard Indian affordability check: existing EMIs plus the proposed EMI, divided by net monthly income. Lenders typically cap it around 50–60% for salaried borrowers, lower for thin-file or low-income segments, because beyond that a single income shock causes default.

### 8. Indentation is structure

```python
def check_eligibility(foir, cibil):
    if foir > 0.55:                  # indented → inside the function
        return "decline"             # indented twice → inside the if
    if cibil < 650:
        return "refer"
    return "approve"                 # back to function level
```

Most languages use braces `{}` to show what is inside what. Python uses **indentation**. Four spaces in means one level deeper. This is why Python code has a visible staircase shape — the shape *is* the logic.

### 9. Conditionals

```python
if foir > 0.55:
    decision = "decline"
elif cibil < 650:                    # "else if" — only checked if the first was False
    decision = "refer"
else:                                # if none of the above matched
    decision = "approve"
```

Comparison operators: `==` equal (two signs — one sign is assignment), `!=` not equal, `<` `>` `<=` `>=`.

### 10. Loops

```python
for code in reason_codes:            # take each item in turn, call it "code"
    print(code)

for i in range(3):                   # i takes the values 0, 1, 2
    print(i)
```

```python
while steps < max_steps:             # keep going as long as this stays True
    steps = steps + 1
```

The `while` loop is how an agent works (Volume 4): keep taking actions until finished or until a cap is hit. **A `while` loop with no cap is the mechanism behind every runaway AI cost incident.**

### 11. List comprehensions — a compact loop that builds a list

```python
amounts       = [200000, 50000, 1200000]
amounts_lakh  = [a / 100000 for a in amounts]      # → [2.0, 0.5, 12.0]
```

Read right to left: *for each `a` in `amounts`, compute `a / 100000`, collect the results into a new list.* Equivalent to:

```python
amounts_lakh = []
for a in amounts:
    amounts_lakh.append(a / 100000)
```

With a filter:

```python
large = [a for a in amounts if a > 100000]         # → [200000, 1200000]
```

### 12. Imports — using code someone else wrote

```python
import torch                                    # bring in the whole library
from transformers import AutoTokenizer          # bring in one specific piece
import numpy as np                              # bring it in under a shorter name
```

After `import numpy as np`, you write `np.something` to use it. The `as np` is purely a shorthand convention.

### 13. Objects and methods — values that carry their own functions

```python
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen3-8B")
token_ids = tokenizer.encode("loan defaulted")
```

`tokenizer` is an **object** — a value that bundles data and functions together. `.encode(...)` is a **method** — a function that belongs to that object. The dot means "reach inside this thing and use the part named after the dot."

`AutoTokenizer.from_pretrained(...)` is a method that *constructs* an object: "build me a tokenizer configured the way the Qwen3-8B model expects."

### 14. Keyword arguments

```python
response = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=1024,
    temperature=0.0,
    messages=messages,
)
```

Instead of relying on the order of inputs, each is **named**. This is the dominant style in AI code because these functions take fifteen optional inputs and nobody could remember the order. Read each `name=value` as a setting.

### 15. Default values

```python
def retrieve(query, top_k=5, rerank=True):
    ...
```

`top_k=5` means: if the caller does not specify `top_k`, use 5. So `retrieve("FOIR cap")` and `retrieve("FOIR cap", top_k=5, rerank=True)` are identical calls.

### 16. Type hints — documentation the computer can check

```python
def calculate_foir(monthly_emi: float, monthly_income: float) -> float:
    return monthly_emi / monthly_income
```

`: float` says "this should be a decimal number". `-> float` says "this returns a decimal number". These are **notes**, not enforcement — Python will not stop you passing text. They exist because they make code readable and let editors catch mistakes.

Common ones you will see:

```python
name: str                    # text
count: int                   # whole number
score: float                 # decimal
active: bool                 # True/False
codes: list[str]             # a list of text items
record: dict                 # a dictionary
amount: float | None         # a decimal OR nothing
```

### 17. Classes — a template for objects

```python
class CreditDecision:
    def __init__(self, decision, pd, reason_codes):
        self.decision     = decision          # store on the object itself
        self.pd           = pd
        self.reason_codes = reason_codes

    def is_approved(self):
        return self.decision == "approve"
```

- `class` defines a **template**
- `__init__` is the setup function, run automatically when you create one
- `self` means "this particular object" — it is how the object refers to itself
- Creating one: `d = CreditDecision("approve", 0.021, ["CLEAN_FILE"])`
- Using it: `d.pd` → `0.021`, `d.is_approved()` → `True`

You will rarely write classes in this textbook. You will constantly *use* them.

### 18. Decorators — a label that modifies a function

```python
@mcp.tool()
def compute_pd_score(cibil_score: int, monthly_income_inr: float) -> str:
    ...
```

The `@something` line above a function means "**register this function with `something`, or wrap it in extra behaviour**". Here it tells a tool server: *this function is available for a model to call*. You will see decorators constantly in Volume 4 and you can read them as labels.

### 19. Error handling

```python
try:
    result = call_model(prompt)          # attempt this
except TimeoutError as e:                # if it fails with a timeout
    result = fallback_answer()           # do this instead
    log.warning(f"Model timed out: {e}")
```

`try`/`except` means "attempt this; if it breaks in this specific way, do that instead". Every model call in production is wrapped this way, because network calls to external services fail routinely.

### 20. f-strings — inserting values into text

```python
amount = 200000
msg = f"Sanctioned amount: ₹{amount:,}"     # → "Sanctioned amount: ₹200,000"
```

The `f` before the quote enables `{...}` substitution. `{amount:,}` means "insert `amount`, formatted with thousands separators". You will see these constantly in prompt construction:

```python
prompt = f"Answer using only this evidence:\n\n{retrieved_text}\n\nQuestion: {question}"
```

`\n` means "start a new line".

---

\

A repeatable procedure. Apply it to every block in this textbook.

```
1. Read the comments first. Skip the code entirely on pass one.
2. Find the function definitions (def) — these are the nouns of the block.
3. Find what goes IN and what comes OUT of each.
4. Read the body line by line. When you hit an unfamiliar name,
   it is almost always either a variable defined earlier or an
   imported library function. Neither requires you to stop.
5. Ignore configuration detail on the first pass. Lines like
   warmup_ratio=0.03 are tuning knobs, not logic.
6. Ask one question: "what is the shape of the data here?"
   A list of dictionaries? A single number? A tensor of some size?
   Shape is where the actual understanding lives.
```

**The most important habit:** when reading AI code, track **shapes**. Almost every bug and almost every insight in this field is about the shape of the data — how many rows, how many columns, how many dimensions. §3 makes shape precise.

---

# PART 3 — THE MATHEMATICS THAT IS ACTUALLY LOAD-BEARING

> Only four ideas from mathematics are genuinely required: representing things as lists of numbers, multiplying grids of numbers, turning scores into probabilities, and counting operations. Everything else can be looked up. This part does those four properly and stops.

\

**What this section gives you.** The ability to read any statement of the form "a 4096-dimensional vector" and know exactly what is being described.

### The problem

A computer cannot multiply "Sunita Devi, 34, tailor, Bihar, ₹18,000 monthly income". It can only do arithmetic. So the first step of every machine learning system is turning things into numbers.

### Building the idea

Take a loan applicant and choose some measurable properties:

```
monthly income (₹)      18,000
existing EMI (₹)         2,500
CIBIL score                640
months at address           48
number of open loans         2
```

Write those five numbers as an ordered list:

```
[18000, 2500, 640, 48, 2]
```

That list is called a **vector**. The number of entries — five — is its **dimension**. This vector is 5-dimensional.

Three things are essential and easy to miss:

1. **Order is fixed and meaningful.** Position 0 is always monthly income. If you swap two positions, you have described a different applicant. Every model has a fixed convention for what each position means.
2. **The meanings are learned, not chosen, inside a model.** In the example above a human chose the five properties. Inside a language model, the model *learned* what each of its 4,096 positions should represent, and no human can say what most of them mean. This is important and returned to in §5.
3. **Scale matters.** 18,000 and 2 are wildly different magnitudes. Left as-is, the income position would dominate any arithmetic simply by being large. Real systems rescale everything into a comparable range, typically roughly −1 to 1. This operation is called **normalisation** and you will see it referenced constantly.

Normalised, the same applicant might be:

```
[0.42, -0.31, 0.18, 0.77, -0.05]
```

The information is preserved; the magnitudes are now comparable.

### Stacking: a matrix

Now take three applicants. Stack their vectors as rows:

```
          income   emi   cibil   tenure  loans
app 1  [   0.42, -0.31,  0.18,   0.77,  -0.05 ]
app 2  [  -0.11,  0.05, -0.62,  -0.20,   0.90 ]
app 3  [   0.88, -0.55,  0.71,   0.33,  -0.40 ]
```

This grid is a **matrix**. Its **shape** is written `(3, 5)` — three rows, five columns. Row count first, always.

Shape is the single most useful thing to track when reading AI code. When you see:

```python
embeddings.shape        # → (1024, 4096)
```

you now know exactly what that is: 1,024 items, each described by 4,096 numbers.

### Stacking again: a tensor

Now suppose you process ten batches of applicants at once, each batch being a `(3, 5)` matrix. Stack those ten matrices and you get a shape `(10, 3, 5)` — a three-dimensional grid.

**A tensor is simply the general word for these grids at any number of dimensions.**

| Dimensions | Common name | Example | Shape |
| ---: | :--- | :--- | :--- |
| 0 | Scalar | Interest rate: 0.0725 | `()` |
| 1 | Vector | One applicant's features | `(5,)` |
| 2 | Matrix | A batch of applicants | `(3, 5)` |
| 3 | Tensor | Several batches | `(10, 3, 5)` |
| 4 | Tensor | Attention scores inside a model | `(batch, heads, tokens, tokens)` |

That is the whole of it. **"Tensor" is not a difficult concept with a scary name — it is a plain concept with a scary name.** It means "grid of numbers, any number of dimensions."

The library `PyTorch` is named for this: it is a toolkit for doing arithmetic on tensors, fast, on a GPU.

### In practice

Inside a language model, the working width is called `d_model` and is typically 2,048 to 8,192. Every token in your prompt becomes a vector of that width. So a 1,000-token prompt going into a model with `d_model = 4096` is a matrix of shape `(1000, 4096)` — four million numbers, just to represent the input, before any computation begins.

### Check yourself

> **Q. What is the shape of a batch of 8 documents, each 512 tokens long, each token represented by 4096 numbers?**
> `(8, 512, 4096)` — batch first, then sequence position, then feature width. That is 16.7 million numbers.

> **Q. Why must numeric features be normalised before use?**
> Because raw magnitudes differ by orders of magnitude (₹18,000 versus 2 open loans), and arithmetic would be dominated by whichever feature happens to be measured in large units, regardless of its actual predictive importance.

---

\

**What this section gives you.** The single operation that accounts for the overwhelming majority of all computation in every AI model. Understand this and the hardware chapters become obvious rather than mysterious.

### The building block: the dot product

Take two vectors of the same length. Multiply them position by position, then add up the results.

```
A = [2, 3, 4]
B = [5, 1, 2]

A · B  =  (2×5) + (3×1) + (4×2)
       =    10  +    3  +    8
       =   21
```

That single number, 21, is the **dot product**. Written `A · B`.

**What it means.** The dot product is a similarity score. It is large and positive when the two vectors have large values in the same positions, near zero when they have no overlap, and negative when they point in opposite directions. Every "how relevant is this to that?" computation in AI reduces to a dot product.

### Matrix multiplication is many dot products

Now take a matrix of applicants and a matrix of weights.

**Matrix X — two loan applications, three features each.** Shape `(2, 3)`.

```
              income_lakh   emi_thousand   cibil_scaled
  app 1  [        8.0           2.0            0.75    ]
  app 2  [        3.0           1.0            0.60    ]
```

*Domain note: `cibil_scaled` is a CIBIL score mapped onto 0–1, so 0.75 corresponds to roughly 675 on the 300–900 scale.*

**Matrix W — how each feature contributes to two outputs.** Shape `(3, 2)`.

```
                    risk_score   limit_score
  income        [      0.5           0.9      ]
  emi           [     -1.2          -0.4      ]
  cibil         [      4.0           2.0      ]
```

*Reading this: income contributes positively to both outputs; existing EMI contributes negatively to both, more so to risk; CIBIL contributes strongly and positively to both. These numbers are what "the model learned" would mean in a simple linear model.*

**The multiplication.** Each output entry is the dot product of one row of X with one column of W.

```
Result[app1, risk] = row(app1) · column(risk)
                   = (8.0 × 0.5) + (2.0 × −1.2) + (0.75 × 4.0)
                   =     4.0     +    −2.4      +      3.0
                   = 4.6

Result[app1, limit] = (8.0 × 0.9) + (2.0 × −0.4) + (0.75 × 2.0)
                    =     7.2     +    −0.8      +      1.5
                    = 7.9

Result[app2, risk]  = (3.0 × 0.5) + (1.0 × −1.2) + (0.60 × 4.0)
                    =     1.5     +    −1.2      +      2.4
                    = 2.7

Result[app2, limit] = (3.0 × 0.9) + (1.0 × −0.4) + (0.60 × 2.0)
                    =     2.7     +    −0.4      +      1.2
                    = 3.5
```

**Result** — shape `(2, 2)`:

```
              risk_score   limit_score
  app 1  [       4.6           7.9      ]
  app 2  [       2.7           3.5      ]
```

Do this arithmetic once by hand. It takes ninety seconds and it is the last time this operation will be mysterious.

### The shape rule

```
(A, B) × (B, C)  →  (A, C)
    ↑      ↑
    these must match
```

The inner dimensions must be equal, and they vanish. `(2,3) × (3,2) → (2,2)`. This rule is why so much AI debugging consists of shape errors, and why tracking shapes while reading code is the habit that pays most.

### Why this operation and not another

Every layer of a neural network is, at its core:

```
output = input × weights        (a matrix multiplication)
```

followed by a simple non-linear function applied to each number individually (§6.6). The weights are the learned numbers from §1.1. **So "running a model" means: multiply by a weight matrix, apply a simple function, repeat sixty times.**

That is genuinely all a forward pass is. The intelligence is entirely in the values of the weights, not in the operations.

### In practice

Inside a real model, one such multiplication has shape roughly `(1024, 4096) × (4096, 4096)`. That is:

- 1,024 rows × 4,096 columns of output = **4.2 million output numbers**
- each requiring a dot product over 4,096 pairs = **4,096 multiplications and 4,095 additions**

Which is where §3.3 begins.

### Check yourself

> **Q. `(32, 512, 4096) × (4096, 11008)` — what is the output shape?**
> `(32, 512, 11008)`. When the left side has extra leading dimensions, they are carried through unchanged; only the last two dimensions participate in the rule. The inner 4096s match and vanish.

> **Q. Compute `[1, 2, 3] · [4, 0, −1]`.**
> `(1×4) + (2×0) + (3×−1) = 4 + 0 − 3 = 1`.

---

\

**What this section gives you.** The ability to estimate, before running anything, how much computation a model requires — which is the basis of every cost and hardware decision in Volume 2.

### The unit

**FLOP** = **FL**oating-point **OP**eration = one multiplication or one addition on decimal numbers.

- **FLOPs** (lowercase s) = a *count* of operations. "This took 34 gigaFLOPs."
- **FLOPS** (capital S) = operations *per second*, a rate. "This chip does 989 teraFLOPS."

The two are constantly confused, including in vendor marketing. Count versus rate.

| Prefix | Meaning | Written |
| :--- | ---: | :--- |
| kilo | thousand | 10³ |
| mega | million | 10⁶ |
| giga | billion | 10⁹ |
| tera | trillion | 10¹² |
| peta | quadrillion | 10¹⁵ |

### Counting a matrix multiplication

For `(M, K) × (K, N)`:

- Output has `M × N` entries
- Each entry is a dot product over `K` pairs: `K` multiplications + `K−1` additions ≈ `2K` operations

```
FLOPs = 2 × M × K × N
```

Check it against the worked example in §3.2, where `M=2, K=3, N=2`:

```
FLOPs = 2 × 2 × 3 × 2 = 24
```

And by hand: four output entries, each needing 3 multiplications and 2 additions = 4 × 5 = 20, plus rounding on the `2K` approximation. Close enough — the approximation ignores that you need `K−1` additions rather than `K`, which is negligible at real scale.

Now the real one from §3.2:

```
(1024, 4096) × (4096, 4096)
FLOPs = 2 × 1024 × 4096 × 4096
      = 34,359,738,368
      ≈ 34.4 billion operations  (34.4 GFLOPs)
```

**For one matrix multiplication.** A model does hundreds of these per forward pass.

### The two formulas to remember

```
Forward pass (running the model):     FLOPs ≈ 2 × N × T
Training step:                        FLOPs ≈ 6 × N × T

  N = number of parameters
  T = number of tokens processed
```

**Where the 2 comes from.** Each parameter participates in one multiplication and one addition per token. Two operations per parameter per token.

**Where the 6 comes from.** Training does the forward pass (2), then works backwards through the model to compute how each weight should change (this is called **backpropagation** and costs roughly twice the forward pass, so 4). Total 6.

### Worked example — the cost of one prompt

You send a 1,000-token prompt to an 8-billion-parameter model.

```
FLOPs = 2 × 8,000,000,000 × 1,000
      = 16,000,000,000,000
      = 16 teraFLOPs
```

Sixteen trillion arithmetic operations to read one page of text. A modern datacentre GPU is rated at roughly 1,000 teraFLOPS, so in theory this takes about 16 milliseconds. In practice it takes longer, and §8.3 explains exactly why — the reason is not compute, and understanding it is the key to everything in Volume 2.

### Worked example — the cost of training

Training a 70-billion-parameter model on 15 trillion tokens:

```
FLOPs = 6 × 70,000,000,000 × 15,000,000,000,000
      = 6.3 × 10²⁴
```

At a realistic sustained 400 teraFLOPS per GPU:

```
GPU-seconds = 6.3 × 10²⁴ ÷ 4 × 10¹⁴  =  1.6 × 10¹⁰ seconds
GPU-hours   ≈ 4.4 million
```

On 4,000 GPUs running continuously: about 46 days. At roughly $2–4 per GPU-hour, that is **$9–18 million in compute alone**, before staff, data, and failed runs.

This is the arithmetic behind "you will never train a foundation model." It is also the arithmetic behind why the same organisations keep producing them.

### Check yourself

> **Q. Estimate the FLOPs to run a 70B model over a 4,000-token document.**
> `2 × 70×10⁹ × 4,000 = 5.6 × 10¹⁴` = 560 teraFLOPs.

> **Q. A vendor says their chip does "2 petaFLOPS". Count or rate?**
> Rate — capital S, and "per second" is implied. It is a speed, not a workload.

---

\

**What this section gives you.** The one function that appears at two critical points — inside attention (§6) and at the moment a token is chosen (§7). It is worth ten minutes now to avoid confusion twice later.

### The problem

A model produces raw scores. For the next word after *"The loan application was"*, it might produce:

```
"approved"        3.2
"declined"        3.0
"restructured"    1.5
"banana"         −2.0
```

These are called **logits**. They are unbounded — they can be any size, positive or negative. You cannot use them directly as probabilities, because probabilities must be between 0 and 1 and must sum to 1.

### The function

Softmax does exactly that conversion, in two steps.

**Step 1 — exponentiate each score.** `e^x`, where `e ≈ 2.71828`. This makes everything positive and amplifies differences.

```
e^3.2   = 24.53
e^3.0   = 20.09
e^1.5   =  4.48
e^−2.0  =  0.135
```

**Step 2 — divide each by the total.**

```
total = 24.53 + 20.09 + 4.48 + 0.135 = 49.24

"approved"      24.53 / 49.24 = 0.498   → 49.8%
"declined"      20.09 / 49.24 = 0.408   → 40.8%
"restructured"   4.48 / 49.24 = 0.091   →  9.1%
"banana"        0.135 / 49.24 = 0.0027  →  0.27%
```

Sum: 100%. Written formally:

```
softmax(xᵢ) = e^(xᵢ) / Σⱼ e^(xⱼ)
```

Read that as: *the exponential of this score, divided by the sum of the exponentials of all scores.*

### Two properties worth internalising

**It preserves order.** The highest logit always becomes the highest probability. Softmax never changes the ranking, only the spacing.

**It exaggerates.** A logit gap of 0.2 (3.2 versus 3.0) became a probability gap of 9 percentage points. Exponentiation makes leaders lead more. This is why models can sound confident on close calls — a narrow internal margin becomes a lopsided-looking probability.

\ — Where softmax appears

1. **Inside attention** (§6.2) — converting relevance scores into weights that sum to 1, so a token's new representation is a proper weighted average of the other tokens.
2. **At token selection** (§7.1) — converting vocabulary logits into a probability distribution to sample from.

Both are the identical function doing the identical job: *turn arbitrary scores into a set of weights that sum to one.*

### Check yourself

> **Q. Softmax of `[1, 1, 1]`?**
> `e¹ = 2.718` for each; total 8.155; each = 0.333. Equal scores give equal probabilities — which is what you want.

> **Q. If the top two logits are 5.0 and 4.9 and everything else is far below, is the model confident?**
> No. The internal margin is 0.1. Softmax will render this as roughly 52% versus 48%, which is nearly a coin flip. The fluency of the output will not reflect that. This gap between internal uncertainty and outward confidence is a recurring theme.

---

# PART 4 — TOKENS: THE UNIT OF EVERYTHING

\

**What this section gives you.** The unit in which you will be billed, in which you will hit limits, and in which latency is measured. Every cost conversation in this field is a token conversation.

### The problem

§3 established that models only do arithmetic on numbers. Text must therefore become numbers. The question is *how*, and the answer turns out to matter commercially.

**Option 1 — one number per character.** Vocabulary of about 100 symbols. Very small, but then "restructured" is 12 separate items and the model must learn spelling from scratch before it can learn meaning. Sequences become very long, and §6 will show that cost grows with the square of sequence length. Rejected.

**Option 2 — one number per word.** Vocabulary of hundreds of thousands, and it still fails on: typos, names, numbers, code, new words, other languages, and Indian words absent from English corpora. Rejected.

**Option 3 — one number per sub-word chunk.** Common words get one chunk. Rare words get split into pieces. Any string is representable. This is what everyone uses, and the chunks are called **tokens**.

### How the vocabulary is built

The dominant algorithm is **Byte-Pair Encoding (BPE)**. It is mechanical:

```
1. Start with a vocabulary of individual bytes (256 entries — every possible byte).
2. Scan a huge corpus of text. Find the most frequent adjacent pair.
3. Merge that pair into a single new token. Add it to the vocabulary.
4. Repeat until the vocabulary reaches a target size (typically 100,000–200,000).
```

Run on English text, the early merges produce things like `th`, `the`, `ing`, `tion`. Run for 100,000 rounds, common whole words become single tokens while rare ones remain assembled from pieces.

**The consequence:** how many tokens a piece of text costs depends entirely on **how often that text pattern appeared in the corpus BPE was trained on.** Frequency in the training corpus is directly convertible into your invoice.

### What this looks like

```
"loan"                    →  ["loan"]                          1 token
"restructured"            →  ["rest", "ructured"]              2 tokens
"NBFC-MFI"                →  ["NB", "FC", "-", "MF", "I"]      5 tokens
"₹1,24,500"               →  ["₹","1",",","24",",","500"]      6 tokens
"नमस्ते"                    →  4–8 tokens for 3 visible characters
```

Note that `"loan"` and `" loan"` (with a leading space) are usually **different tokens**. Spaces are attached to the following word. This is why prompt formatting can subtly change token counts.

### The numbers to know

| Rule of thumb | Value |
| :--- | :--- |
| English characters per token | ~4 |
| English words per token | ~0.75 |
| Tokens per English word | ~1.33 |
| One A4 page of prose | ~500–650 tokens |
| A 40-page credit appraisal memo | ~25,000–35,000 tokens |
| An NBFC annual report | ~150,000–400,000 tokens |
| Python code, per line | ~10–15 tokens |
| **Devanagari / Tamil / Bengali** | **2–4× the tokens of equivalent English** |

### The Indic penalty, and why it is a business problem

This is not a curiosity. It is a direct multiplier on cost and latency, and it applies to exactly the customer base an Indian lender serves.

BPE vocabularies are built predominantly on English-heavy web corpora. Devanagari appears far less, so its merges are shorter and less efficient. The same *meaning* therefore costs two to four times more tokens in Hindi than in English.

**Worked consequence.** A collections assistant handling 50,000 conversations a month, averaging 2,000 tokens per conversation in English:

```
English:   50,000 × 2,000 tokens          = 100 million tokens/month
Hindi:     50,000 × 2,000 × 3             = 300 million tokens/month

At $1.50 per million input tokens:
English:   $150/month     ≈ ₹13,200
Hindi:     $450/month     ≈ ₹39,600
```

Same product, same value delivered, three times the cost — and the Hindi-speaking segment is typically the lower-ticket, thinner-margin book. The economics invert exactly where you can least afford it.

**Three mitigations, with honest trade-offs:**

1. **Route by language.** Some models tokenise Indic scripts substantially better than others. Measure this yourself on your actual text before choosing.
2. **Translate → process → translate.** Often cheaper. But it destroys nuance, and in collections or complaint handling nuance is the signal. Evaluate before adopting; do not assume.
3. **Budget in measured tokens, never in characters or pages.** Which brings us to the next section.

### What breaks

Estimating token counts from word counts, then discovering the actual bill is 3× the forecast because the corpus was bilingual. Or planning a system around "we'll send it ten documents" and finding those ten regulatory circulars are 300,000 tokens.

---

\

Never estimate. Always measure with the tokeniser the model actually uses.

```python
# ─────────────────────────────────────────────────────────────
# Measuring token counts for any open-weights model.
# We use the `transformers` library, which is the standard
# Python toolkit for working with published models.
# ─────────────────────────────────────────────────────────────

from transformers import AutoTokenizer
# ↑ AutoTokenizer is a helper that fetches the CORRECT tokeniser
#   for whichever model you name. Different models were trained
#   with different vocabularies, so the tokeniser must match the
#   model exactly — mismatching them produces garbage.

tok = AutoTokenizer.from_pretrained("Qwen/Qwen3-8B")
# ↑ Downloads (once) and builds the tokeniser object.
#   "Qwen/Qwen3-8B" is an identifier on the Hugging Face Hub,
#   the public repository where open-weights models are published.
#   Format is "organisation/model-name".

english = "Loan against property, ticket size twelve lakh rupees"
hindi   = "संपत्ति के विरुद्ध ऋण, टिकट आकार बारह लाख रुपये"

en_ids = tok.encode(english)
# ↑ .encode() converts text → a list of integers (token IDs).
#   Each integer is a position in the model's vocabulary.

hi_ids = tok.encode(hindi)

print(f"English: {len(en_ids)} tokens")
print(f"Hindi:   {len(hi_ids)} tokens")
print(f"Ratio:   {len(hi_ids) / len(en_ids):.2f}x")
# ↑ len() gives the number of items in a list.
#   The f"..." is an f-string (§2.2 #20) — it inserts the values.
#   :.2f means "format as a decimal with 2 places".

# To SEE the actual chunks rather than just count them:
print(tok.convert_ids_to_tokens(en_ids))
# ↑ Converts the integer IDs back into their text pieces, so you
#   can inspect exactly where the splits fell. Do this whenever a
#   token count surprises you — the answer is always visible here.
```

**For hosted APIs**, providers expose a token-counting endpoint, and every response includes exact usage counts. Read those counts on every call and log them — they are the raw material of every cost dashboard you will build in Volume 5.

### Check yourself

> **Q. A borrower's 3-page bank statement summary is roughly how many tokens?**
> Around 1,500–2,000 for prose. But statements are tabular, and numbers tokenise badly — `₹1,24,500` was six tokens. Tabular financial data commonly runs 2–3× the prose estimate. Measure it.

> **Q. Why must the tokeniser match the model?**
> Token ID 4,821 means one chunk of text in one model's vocabulary and a completely different chunk in another's. Feeding IDs from the wrong vocabulary is like reading a message with the wrong codebook.

---

# PART 5 — EMBEDDINGS: NUMBERS THAT CARRY MEANING

\

**What this section gives you.** The mechanism behind semantic search, and the reason a system can find a document about "group delinquency" when you searched for "JLG member default".

### The problem

§4 turned text into token IDs — integers like `[8171, 2361, 20143]`. But those integers are **arbitrary labels**. Token 8171 is not "more" than token 2361 in any meaningful sense; the numbering came from the order BPE happened to merge things.

Arithmetic on arbitrary labels is meaningless. So the model's very first operation is to replace each arbitrary ID with something that *does* carry meaning.

### Building the idea

The model contains a large lookup table called the **embedding matrix**. Shape `(vocabulary_size, d_model)` — one row per token in the vocabulary, each row being a vector of the model's working width.

```
                    dim 0    dim 1    dim 2   ...  dim 4095
token 0    ["!"]  [  0.02,  -0.31,    0.88,  ...,   0.14  ]
token 1    ["#"]  [ -0.55,   0.09,   -0.20,  ...,  -0.71  ]
   ...
token 8171 ["loan"] [ 0.41,   0.77,   -0.03,  ...,   0.29  ]
   ...
token 151935      [  ...                                   ]
```

Looking up a token is just reading its row. `[8171, 2361, 20143]` becomes a `(3, 4096)` matrix — three tokens, each now a 4,096-number vector.

**These vectors are learned during training.** Nobody assigned them. The training process adjusted them, alongside every other weight, to make next-token prediction work better. The result is that tokens used in similar contexts ended up with similar vectors — because that is what made prediction easier.

### What "similar vectors" means geometrically

Picture a space. Not three-dimensional — 4,096-dimensional, which you cannot picture, so picture three and accept the extension.

Each token sits at a point in that space. Training pulled together the points for words that appear in similar contexts. So `"default"`, `"delinquent"`, `"NPA"`, and `"overdue"` end up clustered, while `"sanction"`, `"disburse"`, and `"approve"` form a different cluster elsewhere.

**Nobody told the model these are related.** It discovered it, because in credit documents they occur in similar positions.

### The famous property, stated carefully

Directions in the space turn out to be meaningful. The classic demonstration:

```
vector("king") − vector("man") + vector("woman")  ≈  vector("queen")
```

The direction from "man" to "woman" is roughly the same direction as from "king" to "queen" — the space encoded a gender direction without being asked to. Similar relationships exist in domain-specific spaces: the direction from "loan" to "default" resembles the direction from "deposit" to "withdrawal".

**A necessary caution.** This property is real but often overstated. It works cleanly for a handful of curated examples and messily in general. Treat it as evidence that the space has structure, not as a reliable operation you can build on.

### Two different things both called "embeddings"

This confuses nearly everyone, so it is worth separating explicitly.

| | **Token embeddings** | **Sentence / document embeddings** |
| :--- | :--- | :--- |
| Produced by | The lookup table inside a language model | A separate, smaller model built for the purpose |
| Represents | One token | A whole passage of text |
| Used for | Feeding the model's first layer | Semantic search, retrieval, clustering |
| You interact with it | Never directly | Constantly, in Volume 3 |
| Typical width | 2,048–8,192 | 384–3,072 |

When someone says "we're using OpenAI embeddings" or "we switched to BGE-M3", they mean the second kind — a dedicated model that reads a passage and outputs one vector representing the whole thing.

---

\

**What this section gives you.** The arithmetic behind every retrieval system you will build.

### Cosine similarity

Given two vectors, how similar are they? The standard answer measures the **angle** between them, ignoring their lengths.

```
cos(A, B) = (A · B) / (‖A‖ × ‖B‖)
```

- `A · B` is the dot product from §3.2
- `‖A‖` is the **length** (or *magnitude*, or *norm*) of A: `√(a₁² + a₂² + ... )`
- Result ranges from −1 to 1

| Value | Meaning |
| ---: | :--- |
| 1.0 | Identical direction — as similar as possible |
| 0.7–0.9 | Strongly related |
| 0.3–0.6 | Loosely related |
| 0.0 | Unrelated (perpendicular) |
| −1.0 | Opposite direction |

### Worked example, by hand

Use 2-dimensional vectors so it is verifiable.

```
A = [3, 4]        a passage about loan defaults
B = [6, 8]        another passage about loan defaults
C = [−4, 3]       a passage about branch opening hours
```

**A versus B:**

```
A · B  = (3×6) + (4×8) = 18 + 32 = 50
‖A‖    = √(3² + 4²) = √25 = 5
‖B‖    = √(6² + 8²) = √100 = 10

cos    = 50 / (5 × 10) = 50 / 50 = 1.0        → identical direction
```

Notice B is exactly twice A. **Cosine ignores magnitude entirely** — it cares only about direction. This is deliberate: a two-sentence passage and a two-page passage about the same topic should score as similar, and without this property the longer one would dominate purely by being longer.

**A versus C:**

```
A · C  = (3×−4) + (4×3) = −12 + 12 = 0
cos    = 0 / (5 × 5) = 0                      → completely unrelated
```

### The shortcut everyone uses

Most embedding models output vectors that are already **normalised** — scaled so that `‖v‖ = 1`. When both vectors have length 1:

```
cos(A, B) = (A · B) / (1 × 1) = A · B
```

**Cosine similarity collapses to a plain dot product.** This is why vector databases are fast: comparing a query against a million documents becomes a million dot products, which is exactly the operation hardware is built for (§8).

### What breaks

**Similarity is not relevance.** This distinction causes more retrieval failures than any other single issue.

Consider the query *"What is the FOIR cap for JLG loans?"* against two passages:

```
Passage 1: "FOIR caps for JLG loans are set at 50% of assessed
            household income under the current credit policy."
                                              → cosine 0.82

Passage 2: "The FOIR cap for personal loans to salaried borrowers
            is 55%, revised from 60% in the previous policy."
                                              → cosine 0.79
```

Nearly identical scores. Passage 1 answers the question; passage 2 is about a different product entirely. The embedding captured *topic* — FOIR, caps, loans, policy — but not the *specific fit* between question and passage.

**This 0.03 gap is the entire reason reranking exists** (Volume 3). An embedding compares the query and the document *separately*, then measures distance. A reranker reads them *together* and judges actual fit. The two-stage design — cheap similarity to narrow a million down to a hundred, expensive relevance to narrow a hundred down to six — is the standard architecture, and it exists precisely because of this gap.

**[RETURN HERE]** — this paragraph is the justification for half of Volume 3.

### Check yourself

> **Q. Two normalised vectors have a dot product of 0.91. Similar or not?**
> Very similar. Normalised means cosine equals dot product, and 0.91 is a strong match.

> **Q. Why does cosine ignore vector length?**
> Because length would otherwise track document length rather than meaning, and a long passage would out-score a short one on every query regardless of content.

---

\

Things that will bite you in Volume 3 if you do not know them now.

**Dimension count is a storage and speed decision, not purely a quality one.** Common widths are 384, 768, 1024, 1536, 3072. Quality improves with width but flattens; 1024–1536 is the usual sweet spot. A 3072-dimension model costs twice the storage and RAM of a 1536 one for a modest gain.

```
Storage for 10 million passages at 1024 dimensions, 4 bytes per number:
  10,000,000 × 1024 × 4 bytes = 41 GB
Plus index overhead (typically 1.5–2×) → plan for 60–80 GB in RAM.
```

**Matryoshka embeddings.** Some models are trained so that the *first* 256 or 512 numbers of the vector are themselves a valid, usable embedding. This lets you store the full 3072 but search with the first 256 for a fast first pass, then rescore the survivors with the full vector. It is one of the highest-leverage tricks in production retrieval and it costs nothing to adopt if your model supports it.

**Domain matters more than size.** A general-purpose embedding model has no idea that "NPA" means non-performing asset rather than nurse practitioner, or that "DPD" is days past due rather than a French political party. On a specialist corpus, a smaller domain-adapted model routinely beats a larger general one.

**Changing the embedding model means re-indexing everything.** Vectors from different models live in different, incompatible spaces — comparing them is meaningless. Every switch is a full corpus rebuild. Treat your embedding model as a schema decision: pin the version, record it alongside the index, and evaluate candidates properly before committing.

---

# PART 6 — THE TRANSFORMER

> This is the hardest part of the volume and the one everything else rests on. It is built here in small pieces, each with numbers you can check by hand. Read it slowly. If you only fully absorb one part of this textbook, make it §6.2.

\

**What this section gives you.** A precise statement of what "understanding context" requires, so that the machinery in §6.2 reads as an obvious solution rather than an arbitrary construction.

### Start with the actual difficulty

Consider two sentences:

```
(a) "The account defaulted because the borrower lost her job."
(b) "The account defaulted because the collections team failed to follow up."
```

The word `"it"` — or in a longer document, any pronoun, any reference, any "the above" — must resolve differently in each. More sharply:

```
"The bank denied the group's request because they had insufficient collateral."
```

Who is `"they"`? The bank or the group? A human resolves this instantly using knowledge about what banks and groups do. Any system that processes `"they"` in isolation cannot.

**So the core requirement is: the representation of each token must depend on the other tokens around it.** The vector for `"they"` coming out of the model must be different depending on what came before.

The §5 embedding table cannot do this. It gives `"they"` the same vector every time, because it is a fixed lookup.

### Why the previous approach failed

Before 2017, the standard answer was a **recurrent** model: read tokens one at a time, maintaining a running summary vector, updating it with each new token.

Two fatal problems:

1. **No parallelism.** Token 500 cannot be processed until token 499 is done. Training on trillions of tokens becomes impossible on this design, no matter how many GPUs you own.
2. **Fading memory.** Information from token 5 has to survive being repeatedly overwritten across 495 updates to reach token 500. In practice it does not.

### The requirement, stated exactly

```
Each token needs DIRECT access to every other token,
with a LEARNED, CONTENT-DEPENDENT weighting of how much
each one matters — and the whole thing must compute in
parallel across the sequence.
```

The mechanism that satisfies this is called **attention**, and it is the subject of §6.2. Everything else in a Transformer is supporting structure around it.

---

\

**What this section gives you.** The single most important mechanism in modern AI, worked end to end on numbers small enough to verify with a calculator.

### The three roles

For each token, the model computes three different vectors from that token's current representation. Each is produced by multiplying by a learned weight matrix (§3.2) — so these are learned transformations, not fixed properties.

| Vector | Name | The question it encodes |
| :--- | :--- | :--- |
| **Q** | Query | "What kind of information am I looking for?" |
| **K** | Key | "What kind of information do I offer?" |
| **V** | Value | "If you attend to me, this is what you get." |

The reason there are three and not one: the thing a token *advertises* (K) should be allowed to differ from the thing it *contributes* (V), and from what it is *seeking* (Q). Forcing them to be identical would be a severe constraint. Three separate learned projections give the model freedom to use each role differently.

```python
# Conceptually, per token:
Q = token_vector @ W_query      # @ is matrix multiplication in Python
K = token_vector @ W_key
V = token_vector @ W_value
# W_query, W_key, W_value are learned weight matrices — part of the
# billions of numbers from §1.1. They are the same for every token;
# what differs is the token_vector going in.
```

### The worked example

Sentence: **`"the loan defaulted"`** — three tokens. We use `d = 4` dimensions so the arithmetic is small. Real models use 64–128 per attention head, but the operations are identical.

Assume Q, K and V have already been computed by the projections above. (Skipping the projection step keeps the numbers clean; it is a plain matrix multiply you already know.)

```
              Q                    K                    V
the        [0,0,0,1]           [0,1,0,0]           [1,0,0,0]
loan       [0,1,0,0]           [1,0,0,1]           [0,1,0,0]
defaulted  [1,0,1,0]           [0,0,1,0]           [0,0,1,0]
```

For interpretability, treat the four V dimensions as loosely meaning:
`[determiner-ness, credit-product-ness, negative-event-ness, person-ness]`.
So `"loan"` contributes pure credit-product-ness, `"defaulted"` pure negative-event-ness.

**We compute the new representation of `"defaulted"`.**

---

**Step 1 — Score `"defaulted"` against every token.**

Take the Q of `"defaulted"` and dot it with the K of each token, including itself.

```
Q(defaulted) = [1, 0, 1, 0]

vs K(the)       = [0,1,0,0]:  (1×0)+(0×1)+(1×0)+(0×0) = 0
vs K(loan)      = [1,0,0,1]:  (1×1)+(0×0)+(1×0)+(0×1) = 1
vs K(defaulted) = [0,0,1,0]:  (1×0)+(0×0)+(1×1)+(0×0) = 1
```

Raw scores: `[0, 1, 1]`.

*Interpretation: `"defaulted"` finds no relevance in `"the"`, and equal relevance in `"loan"` and in itself. That is a sensible outcome — a default event is defined in relation to a credit product.*

---

**Step 2 — Scale by `√d`.**

Here `d = 4`, so `√4 = 2`.

```
[0, 1, 1] ÷ 2  =  [0, 0.5, 0.5]
```

*Why divide?* Dot products grow with dimension. At `d = 128`, raw scores routinely reach tens or hundreds. Feeding those into softmax produces an output like `[0.9999, 0.0001, ...]` — attention collapses onto one token and stops being a weighted blend. Dividing by `√d` keeps the scores in a range where softmax stays smooth. It is a numerical-stability correction, not a conceptual step.

---

**Step 3 — Softmax** (from §3.4).

```
e^0    = 1.000
e^0.5  = 1.649
e^0.5  = 1.649
total  = 4.298

the        1.000 / 4.298 = 0.233    → 23.3%
loan       1.649 / 4.298 = 0.384    → 38.4%
defaulted  1.649 / 4.298 = 0.384    → 38.4%
```

**These are the attention weights.** They sum to 1. They say: *when building the new representation of `"defaulted"`, take 23.3% from `"the"`, 38.4% from `"loan"`, and 38.4% from itself.*

---

**Step 4 — Weighted sum of the V vectors.**

```
output = 0.233 × [1,0,0,0]      (the)
       + 0.384 × [0,1,0,0]      (loan)
       + 0.384 × [0,0,1,0]      (defaulted)

       = [0.233, 0,     0,     0]
       + [0,     0.384, 0,     0]
       + [0,     0,     0.384, 0]
       ─────────────────────────────
       = [0.233, 0.384, 0.384, 0]
```

---

### What just happened

`"defaulted"` entered as `[0,0,1,0]` — pure negative-event-ness, with no information about *what* defaulted.

It leaves as `[0.233, 0.384, 0.384, 0]` — a blend that now carries substantial credit-product-ness.

**The token's representation now encodes its context.** After this operation, the vector for `"defaulted"` in *"the loan defaulted"* is genuinely different from the vector for `"defaulted"` in *"the negotiation defaulted to arbitration"*, because the surrounding K and V vectors were different.

That is the entire mechanism. Everything else in a Transformer is scaffolding around this.

### The formula, now readable

```
Attention(Q, K, V) = softmax( (Q·Kᵀ) / √d + M ) · V
```

- `Q·Kᵀ` — Step 1. Every token's query against every token's key. The `ᵀ` (transpose) flips the K matrix so the shapes line up for multiplication. The result is an `(n × n)` grid of scores — **every token scored against every token.**
- `/ √d` — Step 2, the scaling.
- `+ M` — the causal mask, §6.3.
- `softmax` — Step 3.
- `· V` — Step 4.

**And here is the cost.** That `(n × n)` grid means: 100 tokens → 10,000 scores. 1,000 tokens → 1,000,000 scores. 100,000 tokens → 10 billion scores.

**Cost grows with the square of sequence length.** Written `O(n²)`. This single fact drives almost every engineering decision in Volume 2 — why long context is expensive, why prompt caching matters so much, and why an entire research field exists to attack that exponent.

### Check yourself

> **Q. In Step 1, why does `"defaulted"` score 0 against `"the"`?**
> Their Q and K vectors have no overlapping non-zero positions, so the dot product is zero. In a trained model this reflects that determiners carry little information relevant to a default event.

> **Q. If Step 2 were removed at `d = 128`, what would go wrong?**
> Scores would be large, softmax would saturate to near-one-hot, and attention would become a hard selection of a single token instead of a weighted blend. Gradients during training would also become tiny, making learning fail.

> **Q. A 50,000-token prompt produces an attention grid of what size?**
> 50,000 × 50,000 = 2.5 billion scores — per attention head, per layer. This is why long prompts are expensive to *process*, separately from being expensive to *store*.

---

\

**What this section gives you.** The reason text generation goes left to right, and the reason the KV cache in §7.3 is possible at all.

### The problem

During training, the model sees whole documents at once and must predict each token from the ones before it. If token 5 could see token 6, predicting token 6 would be trivial — just copy it. The model would learn nothing.

### The mechanism

Before softmax, add a mask matrix `M` that contains `0` where attention is permitted and `−∞` where it is forbidden.

For a 4-token sequence:

```
            the    loan   defaulted  badly
the      [   0     −∞       −∞       −∞  ]
loan     [   0      0       −∞       −∞  ]
defaulted[   0      0        0       −∞  ]
badly    [   0      0        0        0  ]
```

Read row by row: `"the"` may attend only to itself; `"badly"` may attend to everything before it and itself.

**Why `−∞` specifically.** Softmax exponentiates, and `e^(−∞) = 0`. So masked positions receive exactly zero attention weight — not a small weight, zero. The blocking is absolute.

### The consequence

Because every token can only see backwards, generation must proceed left to right, one token at a time. You cannot generate the middle of a sentence and fill in around it.

**And crucially:** because token 5's computed K and V never change when token 6 arrives — token 5 cannot see token 6 — those K and V vectors can be **computed once and stored**. That storage is the KV cache (§7.3), and it is the single largest consumer of memory in a production serving system.

The mask and the cache are the same fact viewed from two directions.

---

\

**What this section gives you.** Why models run attention many times in parallel, and what "32 heads" on a spec sheet means.

### The problem

The §6.2 computation produces **one** weighted blend per token. But `"defaulted"` needs to track several relationships simultaneously: what defaulted, when, by how much, with what consequence. One set of attention weights must compromise across all of them.

### The mechanism

Run the whole §6.2 computation `h` times in parallel — `h` is typically 32 to 128 — each with its own separate learned `W_query`, `W_key`, `W_value` matrices. Each parallel run is a **head**.

Each head works in a narrower space: `d_head = d_model / h`.

```
d_model = 4096, h = 32   →   d_head = 128

Each head:  Q, K, V are 128-dimensional
            Produces a 128-dimensional output per token
Concatenate all 32 outputs:  32 × 128 = 4096
Multiply by one more learned matrix (W_output) to mix them
Result: 4096-dimensional, same width as the input
```

Total computation is roughly the same as one wide head, but split into 32 independent specialists.

### What the heads learn

Nobody assigns roles. Analysis of trained models shows heads specialising anyway:

- some track syntactic dependency (which noun does this verb attach to)
- some track coreference (which entity does this pronoun refer to)
- some track the immediately previous token
- some track "the number mentioned earlier in this sentence"
- many appear to do nothing identifiable and can often be pruned

**This is a genuine and useful thing to know:** heads are redundant enough that a meaningful fraction can be removed from a trained model with little quality loss. That fact underlies several compression techniques.

### Reading a spec sheet

```json
{
  "hidden_size": 4096,              // d_model — the working width
  "num_attention_heads": 32,        // h — query heads
  "num_key_value_heads": 8,         // fewer K/V heads — this is GQA, §6.7
  "num_hidden_layers": 32,          // how many Transformer blocks stacked
  "intermediate_size": 11008,       // width of the feed-forward network, §6.5
  "vocab_size": 151936,             // number of distinct tokens
  "max_position_embeddings": 32768  // longest sequence it was trained to handle
}
```

You can now read every line of that. `num_key_value_heads` being lower than `num_attention_heads` is the one item not yet explained; it is §6.7 and it is the most commercially significant number in the file.

---

\

Attention is one half of a Transformer block. Here is the other half and the connective tissue.

### The full block

```
     x  (input: one vector per token)
     │
     ├──────────────────────┐
     │                      │
  RMSNorm                   │
     │                      │
  MULTI-HEAD ATTENTION      │      ← tokens exchange information
     │                      │
     +──────────────────────┘      ← residual: add the original back
     │
     ├──────────────────────┐
     │                      │
  RMSNorm                   │
     │                      │
  FEED-FORWARD NETWORK      │      ← each token processed alone
     │                      │
     +──────────────────────┘      ← residual again
     │
     ▼  (output: same shape as input)
```

**The block's output has exactly the same shape as its input.** This is what makes stacking possible — you can chain 32 or 80 or 120 of these and the shapes always fit.

### The feed-forward network

After attention has mixed information *between* tokens, the feed-forward network processes each token *independently*.

```
FFN(x) = expand to 11008 dimensions
       → apply a non-linear function
       → contract back to 4096 dimensions
```

Two observations that matter:

1. **It is where most of the parameters live.** With `d_model = 4096` and `intermediate = 11008`, the FFN holds roughly two-thirds of each block's weights. Attention gets the attention; the FFN holds the mass.
2. **The non-linear function is essential.** Without it, stacking layers would be pointless — a chain of matrix multiplications collapses mathematically into a single matrix multiplication, and the whole model would be equivalent to one linear layer. The non-linearity is what makes depth meaningful. Modern models use a variant called **SwiGLU**; the specific choice is a tuning detail.

**Where knowledge appears to live.** Research suggests the FFN behaves somewhat like a key-value memory: attention decides *which* tokens are relevant, and the FFN retrieves learned associations about them. Treat this as a useful intuition rather than an established fact.

### Residual connections

The `+` in the diagram adds the block's input back to its output.

```
output = x + Attention(RMSNorm(x))
```

Without this, information would have to survive being transformed 32 to 120 times in succession, and training deep networks would fail — gradients vanish across that many transformations. The residual gives every layer a direct path back to the input.

**The practical consequence for how you think about a model:** each block does not replace the representation. It *adds a refinement* to a running total. The model builds understanding incrementally, layer by layer, rather than transforming it wholesale.

### Normalisation

`RMSNorm` rescales each token's vector so its values sit in a consistent range. Purely a numerical-stability measure — it keeps values from growing or shrinking uncontrollably across dozens of layers. There is nothing conceptual to understand here beyond that.

Note the position: normalisation happens **before** the sublayer, not after. This is called **pre-norm**, and it is one of the changes that made very deep Transformers trainable.

---

\

### The problem

Look carefully at §6.2 and you will notice something missing. Attention computes dot products between all pairs of tokens. Dot products do not depend on order. So `"the loan defaulted"` and `"defaulted loan the"` would produce **identical** output.

Attention, by itself, is completely blind to word order.

### The solution

Position information must be injected explicitly. The dominant method is **RoPE — Rotary Position Embedding**.

The idea: instead of adding a position signal to the token vector, **rotate** the Q and K vectors by an angle proportional to their position. Position 1 rotates a little, position 500 rotates a lot.

Because a dot product between two rotated vectors depends on the *difference* between their rotation angles, the relative distance between two tokens falls out of the arithmetic automatically. Token 10 attending to token 5 sees the same relative offset as token 110 attending to token 105.

**Why this matters practically:** because RoPE encodes *relative* rather than *absolute* position, you can extend a model's context window after training by adjusting the rotation frequencies. This technique is how models trained at 8,000 tokens were extended to 128,000 and beyond. It is not free — quality degrades if pushed too far — but it is the mechanism behind most context-length increases you read about.

---

\

Five changes separate a 2017 Transformer from a 2026 one. All five attack either the `O(n²)` cost of attention or the memory the cache consumes.

| Innovation | Problem attacked | What it does | Why you care |
| :--- | :--- | :--- | :--- |
| **GQA** — Grouped Query Attention | KV cache memory | Instead of 32 separate K/V head pairs, use 8, each shared by 4 query heads | **Cuts KV cache memory by 4×** with negligible quality loss. Determines how many users one GPU serves. |
| **MLA** — Multi-head Latent Attention | Same, harder | Compresses K and V into a small shared latent, decompressed on the fly | 4–10× cache reduction; used in DeepSeek-family models |
| **FlashAttention** | The `(n×n)` grid does not fit in fast memory | Computes attention in tiles, never storing the full grid | 2–4× faster, far less memory. **Mathematically identical output** — not an approximation |
| **Sparse / linear attention** | The `O(n²)` itself | Restricts or approximates which token pairs are computed | Makes million-token contexts affordable |
| **State-space hybrids** (Mamba-style) | Same | Interleaves layers with fixed-size recurrent state — `O(n)` instead of `O(n²)` — with a minority of full-attention layers | Substantially faster on long sequences |

**GQA is the one to remember.** It is the difference between serving five concurrent users and twenty on the same hardware. When §8.6 computes KV cache memory, the `num_key_value_heads` figure from the config file is the number that dominates the answer.

---

\

**What this section gives you.** The ability to read "1 trillion total parameters, 32 billion active" and know exactly what hardware that implies.

### The idea

In a standard Transformer, every token passes through the same feed-forward network. In a **Mixture of Experts** model, each block contains many separate FFNs — the *experts* — and a small **router** that sends each token to only a few of them.

```
Token → Router (a small learned layer) → picks top 2 of 128 experts
      → those 2 experts process the token
      → outputs combined, weighted by the router's confidence
```

### The two parameter counts

This is the key distinction and it is constantly misread.

| | Meaning | Determines |
| :--- | :--- | :--- |
| **Total parameters** | Every expert must be loaded in memory, because any token might route anywhere | **How much GPU memory you need** |
| **Active parameters** | Only the selected experts do arithmetic per token | **How fast it runs, and compute cost** |

A model described as **"428B total, 23B active"** needs memory for 428 billion parameters but computes like a 23 billion parameter model.

**Memory-expensive, compute-cheap.** This is why the leading open-weight models require 8 to 64 accelerators to run, and why "open weights" in 2026 does not mean "runs on your laptop."

### The failure mode built into the design

If the router is left unconstrained, it learns to send almost everything to a few favourite experts. The rest never receive tokens, never receive training signal, and remain useless. This is **expert collapse**, and it is prevented by adding an **auxiliary load-balancing loss** during training that penalises uneven routing.

You will not train an MoE model. You will read about this in papers and model cards constantly.

---

\

Assembling everything from §4, §5 and §6 into one sequence.

```
INPUT:  "The loan defaulted"

[1] TOKENISE                                                        §4
    → [791, 11941, 4382]
    Three integers, each an index into the vocabulary.

[2] EMBED                                                           §5
    → Look up each ID in the embedding table.
    → Shape (3, 4096). Three tokens, 4096 numbers each.

[3] ADD POSITION (RoPE)                                             §6.6
    → Rotate so the model can tell order.

╔══ TRANSFORMER BLOCK, repeated 32–120 times ══════════════════╗
║                                                               ║
║  [4] RMSNorm                                                  ║
║  [5] MULTI-HEAD ATTENTION                            §6.2,6.4 ║
║        Q, K, V projections                                    ║
║        Score every token against every token     ← the O(n²)  ║
║        Scale by √d, apply causal mask                   §6.3  ║
║        Softmax → attention weights                      §3.4  ║
║        Weighted sum of V                                      ║
║        Concatenate heads, mix with W_output                   ║
║  [6] ADD residual                                       §6.5  ║
║                                                               ║
║  [7] RMSNorm                                                  ║
║  [8] FEED-FORWARD (or route to experts if MoE)     §6.5, 6.8  ║
║  [9] ADD residual                                             ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

[10] FINAL RMSNorm

[11] UNEMBED
     → Multiply by a matrix of shape (4096, vocab_size)
     → Shape (3, 151936). For EVERY position, a score for
       every possible next token.
     → We only use the LAST position's scores. The others
       were needed during training; at inference they are
       discarded.

[12] SAMPLE                                                    §7
     → Turn the last row of scores into probabilities,
       pick one token.

[13] APPEND and return to [1].
```

**One full pass through all of that produces exactly one token.** A 500-token answer runs this loop 500 times.

That sentence is the foundation of every cost and latency discussion in Volume 2. Read it again.

### Check yourself

> **Q. Why is only the last position's output used at inference?**
> Because of the causal mask (§6.3), position *i*'s output is the model's prediction for what follows position *i*. To continue the text you need the prediction after the final token. The earlier positions' predictions are what training used as its learning signal.

> **Q. A model has 80 layers. How many attention computations occur when generating one token?**
> 80 — one per block. Each of those internally runs `h` heads in parallel, so with 64 heads that is 5,120 separate attention computations. Per token.

---

# PART 7 — GENERATION: HOW A TOKEN IS ACTUALLY CHOSEN

\

**What this section gives you.** Control over a set of parameters that are set wrongly in a large fraction of production systems, and which are frequently blamed on the model.

### Where we are

§6 ended with step [11]: a score for every token in the vocabulary. For a vocabulary of 151,936, that is 151,936 numbers. These are the **logits**.

The model's job is now done. **What happens next is a choice made by your code, not by the model.**

### The pipeline

```
logits (151,936 raw scores)
   │
   ├── divide by temperature
   ├── restrict to a subset (top_p / top_k / min_p)
   ├── apply penalties (repetition, presence)
   │
   ▼
softmax → probabilities
   │
   ▼
draw one at random, according to those probabilities
```

### Temperature, worked numerically

Temperature divides every logit **before** softmax. Using the four candidates from §3.4:

```
Logits: approved 3.2 · declined 3.0 · restructured 1.5 · banana −2.0
```

**Temperature = 1.0** (unchanged):

```
approved 49.8% · declined 40.8% · restructured 9.1% · banana 0.27%
```

**Temperature = 0.5** (divide by 0.5, i.e. double every logit → 6.4, 6.0, 3.0, −4.0):

```
e^6.4 = 601.8 · e^6.0 = 403.4 · e^3.0 = 20.09 · e^−4.0 = 0.018
total = 1025.3

approved 58.7% · declined 39.3% · restructured 2.0% · banana 0.002%
```

**Temperature = 2.0** (halve every logit → 1.6, 1.5, 0.75, −1.0):

```
e^1.6 = 4.953 · e^1.5 = 4.482 · e^0.75 = 2.117 · e^−1.0 = 0.368
total = 11.92

approved 41.6% · declined 37.6% · restructured 17.8% · banana 3.1%
```

**Read across the three.** As temperature rises, the distribution flattens. `"banana"` goes from a 0.002% chance to a 3.1% chance — better than one in thirty-three. Across a 500-token answer, a 3% per-token chance of nonsense is not a small risk; it is near-certainty that something absurd appears.

**As temperature approaches 0**, the top logit's probability approaches 100% and the choice becomes effectively deterministic.

### The parameters, with production guidance

| Parameter | What it does | What to set |
| :--- | :--- | :--- |
| **temperature** | Scales logits before softmax | **0–0.2** for extraction, classification, code, JSON, anything scored or fed downstream. **0.7–1.0** for drafting and ideation. Above 1.2, never in production. |
| **top_p** (nucleus) | Keep the smallest set of tokens whose probabilities sum to `p`, discard the rest, renormalise | 0.9–0.95. Adaptive — keeps few tokens when the model is confident, more when it is not. **Prefer tuning this over temperature.** |
| **top_k** | Keep only the `k` highest-probability tokens | Blunt: keeps 40 tokens whether the model is certain or not. Use `top_p` unless the provider requires `k`. |
| **min_p** | Keep tokens with probability ≥ `min_p × (highest probability)` | Better behaved than `top_p` at high temperature. |
| **frequency / presence penalty** | Reduce the logits of tokens already produced | 0 to 0.3. Higher values cause the model to avoid necessary domain terms — a penalised model will start avoiding the word "borrower". |
| **stop sequences** | Halt generation when a string appears | **Always set these for structured output.** |
| **max_tokens** | Hard cap on output length | **Always set this.** It is a cost control, not a formatting preference. |
| **seed** | Attempts to make sampling reproducible | Best-effort only — see below. |
| **logprobs** | Returns the probability of each chosen token | Underused. A cheap confidence signal for routing and abstention. |

### Why temperature 0 is not truly deterministic

This surprises people and matters for audit conversations.

At temperature 0 you always take the highest logit. But GPUs compute sums by splitting work across thousands of parallel units and combining partial results. Floating-point addition is **not associative** — `(a + b) + c` can differ from `a + (b + c)` in the last decimal places. The order in which partial results combine depends on how the work was divided, which depends on how many other requests happened to be batched alongside yours.

When two logits are very close — 3.2001 versus 3.2000 — that tiny difference can flip which is highest.

**Practical rule: temperature 0 gives you high consistency, not a guarantee.** Never build a compliance claim on "identical input produces identical output." The auditable artefact is the **stored trace** — the exact prompt sent and the exact response received — not a promise of reproducibility.

### Structured output: making malformed impossible

If you need JSON, do not ask for JSON. Constrain the sampler so that non-JSON cannot be produced.

```
LEVEL 1 (weak)    "Respond in JSON."           → 1–10% parse failures
LEVEL 2 (better)  Tool/function calling         → provider enforces a schema
LEVEL 3 (best)    Constrained decoding          → invalid tokens get probability zero
```

Level 3 works by masking the logits at each step: given what has been generated so far and a grammar describing valid output, set the logit of every token that would break the grammar to `−∞`. Softmax turns those into exact zeros. **Malformed output becomes structurally unreachable**, not merely discouraged.

Hosted providers expose this through a schema parameter. Self-hosted engines (vLLM, SGLang) implement it directly.

### Reasoning models

Frontier models increasingly generate an internal reasoning trace before the visible answer. Three consequences:

1. **You are billed for thinking tokens as output tokens.** A 200-word answer may have cost 4,000 tokens.
2. **Latency becomes highly variable.** Time to the visible answer can be many seconds. Never put a reasoning model on a synchronous path without streaming feedback and a timeout.
3. **Sampling parameters often behave differently** or are constrained. Many providers advise leaving temperature at the default when reasoning is enabled.

### What breaks

Running an extraction task at the SDK's default temperature — often 1.0 — then observing that the model "keeps changing its answer", and attempting to fix it by adding "be consistent" to the prompt. The fix is a parameter, not a sentence.

### Check yourself

> **Q. Extracting sanctioned amounts from loan documents. What temperature?**
> 0. There is exactly one correct answer per document. Any randomness is pure downside. Add a schema constraint so the output cannot be malformed.

> **Q. `top_p = 0.9` and the top token has probability 0.95. How many tokens are kept?**
> One. The first token alone already exceeds the 0.9 threshold. This adaptivity is why `top_p` is preferred over `top_k` — when the model is confident, it does not admit alternatives.

---

\

**What this section gives you.** The reason a serving system runs out of capacity, and the arithmetic behind every GPU sizing decision in Volume 2.

### The problem

§6.9 established that generating each token requires a full forward pass. Naively, generating token 501 would mean recomputing everything for all 500 previous tokens.

That would make generation cost grow quadratically with output length, and it would be unusable.

### The insight

Recall §6.3: the causal mask means a token can only see backwards. So when token 501 arrives, **the K and V vectors for tokens 1 to 500 are exactly what they were before.** Token 501's arrival cannot change them.

So compute each token's K and V once, store them, and reuse them for every subsequent token.

That store is the **KV cache**.

### What it costs

The cache holds, for every token, in every layer, for every KV head, a K vector and a V vector.

```
Bytes per token = 2 × n_layers × n_kv_heads × head_dim × bytes_per_number
                  ↑
                  K and V
```

**Worked example 1 — an older architecture without GQA:**

```
32 layers, 32 KV heads, head_dim 128, 2 bytes per number

2 × 32 × 32 × 128 × 2 = 524,288 bytes = 512 KB per token

A 4,000-token conversation:  4,000 × 512 KB = 2.05 GB   PER USER
```

**Worked example 2 — a 70B model with GQA (8 KV heads instead of 32):**

```
80 layers, 8 KV heads, head_dim 128, 2 bytes per number

2 × 80 × 8 × 128 × 2 = 327,680 bytes = 320 KB per token

An 8,000-token conversation:   8,000 × 320 KB =  2.6 GB   per user
A 128,000-token context:     128,000 × 320 KB = 41.0 GB   PER USER
```

**Forty-one gigabytes for one user's context.** Half of an 80 GB accelerator, serving a single conversation.

This is the number that reconciles two claims you will see side by side in marketing material: "one million token context window" and "high-throughput serving." On the same hardware, those are close to mutually exclusive.

### Why GQA matters commercially

Compare the two examples. The GQA model has **more than twice the layers** (80 versus 32) and still uses **less memory per token** (320 KB versus 512 KB), purely because it has 8 KV heads instead of 32.

That is the entire commercial argument for GQA, and it is why `num_key_value_heads` is the most consequential line in a model's config file.

### Capacity planning, worked

An 80 GB accelerator running a 70B model:

```
Weights at 2 bytes per parameter            140 GB   → does not fit at all
Weights at 1 byte per parameter (§8.4)       70 GB
Framework and CUDA overhead                   3 GB
─────────────────────────────────────────────────
Remaining for KV cache                        7 GB

7 GB ÷ 320 KB per token       ≈  22,000 cached tokens total
At 4,000 tokens per conversation  ≈  5 concurrent conversations
```

**Five.** Now the same model at half a byte per parameter:

```
Weights                                      35 GB
Overhead                                      3 GB
─────────────────────────────────────────────────
Remaining for KV cache                       42 GB

42 GB ÷ 320 KB    ≈ 137,000 tokens  ≈ 33 concurrent conversations
```

**Compression of the weights buys concurrency, not just speed.** This is the point most people miss about quantisation, and §8.4 develops it properly.

\

The formula `2 × layers × kv_heads × head_dim × bytes` is worth memorising. It appears in every capacity discussion you will have.

### Check yourself

> **Q. A model has 48 layers, 8 KV heads, head_dim 128, served at 1 byte per number. Cache per token?**
> `2 × 48 × 8 × 128 × 1 = 98,304 bytes ≈ 96 KB per token`. A 16,000-token conversation costs about 1.5 GB.

> **Q. Why can the cache be reused at all?**
> Because the causal mask prevents earlier tokens from seeing later ones, so their K and V vectors are unaffected by anything that arrives afterwards.

---

# PART 8 — HARDWARE AND MEMORY

\

**What this section gives you.** A precise answer to "why GPUs?" that is about the structure of the computation, not about brand names.

### The shape of the work

From §3.2: running a model is millions of dot products. Every dot product is independent of every other — computing `Result[app1, risk]` does not require knowing `Result[app2, limit]`.

**Millions of identical, independent arithmetic operations.** That is the shape. Now compare two processor designs against it.

### CPU

A CPU has a small number of very sophisticated cores — typically 8 to 128. Each core is designed to execute a *different* instruction, quickly, with deep caches, branch prediction, and out-of-order execution to handle unpredictable code.

That sophistication is the wrong investment here. There is no unpredictable branching in a matrix multiply. There is one instruction repeated a million times. A CPU brings 64 highly capable workers to a job that needs ten thousand identical simple ones.

### GPU

A GPU has thousands of simple cores, plus dedicated matrix-multiplication units (NVIDIA calls them **Tensor Cores**). All cores execute the **same instruction** on **different data** simultaneously. This model is called **SIMT** — Single Instruction, Multiple Threads.

It is a poor general-purpose computer and an extraordinary matrix-multiply machine. Which is exactly the requirement.

### TPU

A **systolic array** — a grid of arithmetic cells wired so that data flows directly from cell to neighbouring cell.

The significance: in a conventional design, every intermediate result travels back to memory and is fetched again for the next operation. Memory traffic dominates. In a systolic array, a value enters the grid once and flows through, with each cell doing its multiply-accumulate and passing the result along. **Far less memory traffic per unit of arithmetic.**

That constraint — memory traffic, not arithmetic capability — is the actual bottleneck, and §8.3 makes it precise.

### NPU

A small, low-power matrix engine built into phones and laptops. Typically 2–10 watts against a datacentre GPU's 300–1,200 watts. Suitable for models up to roughly 10 billion parameters, quantised. The relevant use cases are privacy (data never leaves the device), offline operation, and zero network latency — a field collections officer in an area with poor connectivity, for instance.

### Summary

| | CPU | GPU | TPU | NPU |
| :--- | :--- | :--- | :--- | :--- |
| Cores | 8–128 complex | 1,000s simple + matrix units | Systolic array | Small matrix engine |
| Power | 65–350 W | 300–1,200 W | Rack-scale | 2–10 W |
| Good at | Orchestration, data prep, APIs, databases | Training and high-throughput inference | Very large training, Google Cloud inference | On-device inference |
| Weak at | Anything matrix-heavy | Cost, power, availability | Portability outside its ecosystem | Models above ~10B |

**Note the first row of "good at".** Your application server, your retrieval pipeline, your database, your guardrails, and your business logic all run on CPUs. Only the model inference needs an accelerator. In a typical system, the great majority of the code runs on ordinary hardware.

---

\

**What this section gives you.** The physical reason your model runs slower than its FLOPS rating suggests.

Memory forms a hierarchy: the faster it is, the less of it exists.

```
 LOCATION          SPEED           CAPACITY       WHAT LIVES HERE
 ─────────────────────────────────────────────────────────────────────
 Registers         ~20 TB/s        kilobytes      values being used right now
 SRAM / L2 cache   ~10 TB/s        tens of MB     FlashAttention tiles
 HBM (GPU VRAM)    1–8 TB/s        80–192 GB      MODEL WEIGHTS + KV CACHE
 NVLink            0.9–1.8 TB/s    GPU-to-GPU     model split across cards
 PCIe Gen5         ~64 GB/s        to the host    100× slower — avoid on hot path
 System RAM        ~200 GB/s       hundreds of GB
 NVMe SSD          ~7 GB/s         terabytes      model files at rest
 Network           10–400 Gb/s     the cluster
 ─────────────────────────────────────────────────────────────────────
```

**HBM** stands for High Bandwidth Memory. It is the memory physically stacked next to the GPU chip, and it is what "80 GB GPU" refers to.

Approximate figures for accelerators you will encounter — verify against current vendor specifications before sizing anything:

| Accelerator | Memory | Bandwidth |
| :--- | ---: | ---: |
| NVIDIA A100 80GB | 80 GB | ~2.0 TB/s |
| NVIDIA H100 SXM | 80 GB | ~3.35 TB/s |
| NVIDIA H200 | 141 GB | ~4.8 TB/s |
| NVIDIA B200 | ~192 GB | ~8 TB/s |
| AMD MI300X | 192 GB | ~5.3 TB/s |

Two numbers per card: **capacity** decides whether your model runs at all; **bandwidth** decides how fast it generates.

---

\

**What this section gives you.** The single most important idea in AI infrastructure. Everything in Volume 2 follows from it.

### The measure

```
Arithmetic intensity = FLOPs performed ÷ bytes moved from memory
```

- **High intensity** → the processor does lots of work per byte fetched → **compute-bound**. Faster arithmetic helps.
- **Low intensity** → the processor sits idle waiting for data → **memory-bound**. Faster arithmetic does *nothing*. Only faster memory helps.

### The two phases have opposite profiles

**Prefill** — processing your prompt. All 1,000 prompt tokens are processed in one parallel pass (§6.9 runs once over the whole sequence). The weights are read from memory once and used for 1,000 tokens' worth of arithmetic.

**High intensity. Compute-bound.** GPU utilisation 70–95%.

**Decode** — generating output, one token at a time. To produce a single token, every weight in the model must be read from memory. All 140 GB of it. For one token.

**Catastrophically low intensity. Memory-bound.** GPU utilisation frequently **below 20%**.

### The consequence, computed

Because decode is bandwidth-limited, you can estimate generation speed with one division:

```
Tokens per second ≈ memory bandwidth ÷ bytes of weights read per token
```

**Worked:**

```
70B model at 2 bytes per parameter = 140 GB
H100 bandwidth ≈ 3.35 TB/s = 3,350 GB/s

3,350 ÷ 140 ≈ 24 tokens per second     (single request, no batching)
```

The same GPU is rated at roughly 1,000 teraFLOPS. From §3.3, generating one token from a 70B model needs about `2 × 70×10⁹ = 140` gigaFLOPs. At 1,000 TFLOPS that is 0.14 milliseconds — which would be **7,000 tokens per second**.

**The measured answer is 24. The compute-limited answer is 7,000.**

The GPU is idle roughly 99.7% of the time during decode, waiting for weights to arrive from memory.

### The two escapes

**1. Make the weights smaller.** Halve the bytes, double the speed:

```
70B at 1 byte per parameter (70 GB)     → 3,350 ÷ 70  ≈  48 tok/s
70B at 0.5 bytes per parameter (35 GB)  → 3,350 ÷ 35  ≈  96 tok/s
```

This is **quantisation**, and §8.4 covers it.

**2. Serve many requests at once.** Read the weights once, use them for 32 requests simultaneously:

```
Batch of 1:   read 140 GB → produce 1 token
Batch of 32:  read 140 GB → produce 32 tokens
```

Total throughput multiplies by roughly 30×; per-request latency barely changes. This is **batching**, and it is why hosted APIs are cheaper than running one model for yourself — they batch across all their customers.

**Both escapes attack the same quantity: bytes moved per useful token produced.** Every serving optimisation in Volume 2 — quantisation, batching, speculative decoding, MoE, GQA, paged memory — is a variation on that one idea.

### Check yourself

> **Q. You buy a GPU with twice the FLOPS and identical bandwidth. What happens to single-user generation speed?**
> Essentially nothing. Decode is bandwidth-bound; the extra arithmetic capability goes unused. Prefill — and therefore time-to-first-token on long prompts — will improve.

> **Q. Why can a hosted API charge less per token than your own dedicated GPU costs you?**
> They batch across many customers, so the weights are read once and serve dozens of concurrent requests. A dedicated GPU serving your traffic alone runs at low batch size and low utilisation.

---

\

**What this section gives you.** The highest-leverage lever in serving, and the arithmetic to size any deployment.

### What "precision" means

A parameter is a decimal number. How many bytes you spend storing each one is its **precision**. Fewer bytes means a coarser approximation.

| Format | Bytes each | Where it is used | Quality effect |
| :--- | ---: | :--- | :--- |
| **FP32** | 4 | Legacy; optimiser state during training | Baseline |
| **BF16** | 2 | **The training standard** | Negligible |
| **FP16** | 2 | Older training, some inference | Negligible for inference; overflow risk in training |
| **FP8** | 1 | **The 2026 inference standard** | ~0–1% on most tasks |
| **INT8** | 1 | Inference with calibration | ~1% |
| **INT4 / NF4** | 0.5 | Memory-constrained inference; QLoRA | 1–4%, highly task-dependent |
| **FP4** | 0.5 | Newest hardware | Improving rapidly |

**Quantisation** is the process of converting a model from higher to lower precision.

### Why it works at all

Neural network weights are not exact quantities. They are learned approximations, and the network as a whole is robust to small perturbations in any individual weight — that robustness is a byproduct of how training works. Rounding each weight to a coarser grid introduces error, but the error is small relative to what the network already tolerates.

### The double benefit

Return to §8.3 and §7.2:

1. **Speed.** Halving the bytes halves the memory traffic per token, roughly doubling decode speed.
2. **Concurrency.** Freed memory becomes KV cache, which is what limits how many users you can serve.

The second is usually the larger commercial effect, and it is the one people forget.

### The memory arithmetic

```
Weight memory (GB) ≈ parameters (billions) × bytes per parameter

  70B at BF16 (2 bytes)   = 140 GB   → needs 2 × 80 GB cards
  70B at FP8  (1 byte)    =  70 GB   → fits 1 × 80 GB card, tightly
  70B at INT4 (0.5 bytes) =  35 GB   → fits comfortably on a 48 GB card

  8B at BF16              =  16 GB   → one consumer 24 GB card
  8B at INT4              =   4 GB   → a laptop

Then add: KV cache (§7.2) + activations + framework overhead (~2–4 GB).
Plan for weights + KV cache ≤ 85% of capacity. The remainder is
fragmentation and headroom you will need.
```

### Why full fine-tuning needs so much more memory

Training must store, for every parameter, several additional quantities:

```
Full fine-tuning with the AdamW optimiser ≈ 16 bytes per parameter

    2 bytes   the weight itself (BF16)
  + 2 bytes   its gradient — how much it should change
  + 4 bytes   AdamW's first moment (a running average of gradients)
  + 4 bytes   AdamW's second moment (a running average of squared gradients)
  + 4 bytes   an FP32 master copy, for numerical stability
  ─────────
   16 bytes per parameter

  7B model   →  ~112 GB     — before activations. Needs multiple GPUs.
  70B model  →  ~1.1 TB     — needs a cluster.
```

**This is the arithmetic that makes LoRA (§9.5) necessary rather than merely convenient.** A 7-billion-parameter model — small by current standards — cannot be fully fine-tuned on a single GPU.

### The production rule

**Quantisation is a change to the model, not a deployment setting.**

Degradation is not uniform. It concentrates in: multi-step arithmetic, precise retrieval from long context, non-English text (especially Indic scripts), instruction-following under tight constraints, and rare-token generation.

Your smoke test will pass. Your hardest 15% of traffic will regress, and that 15% is disproportionately the traffic that matters.

```
Treat every quantisation change like a model release:
  → run the full evaluation suite, including non-English and reasoning slices
  → canary at a small percentage of traffic
  → have a rollback path ready
```

### Check yourself

> **Q. A 32B model at FP8 on an 80 GB card. How much is left for KV cache?**
> `32 GB weights + ~3 GB overhead = 35 GB used`. About 45 GB remains, minus the 15% headroom rule → plan for roughly 33 GB of usable cache.

> **Q. Why does quantisation increase the number of users you can serve, not just speed?**
> Memory freed from weights becomes available for KV cache, and KV cache is what caps concurrency (§7.2).

---

# PART 9 — TRAINING AND ADAPTATION

\

**What this section gives you.** The mechanism by which the numbers in §1.1 came to hold knowledge — enough to understand fine-tuning, which you *will* do.

### The setup

You have a model whose parameters are currently random. You have text. You want the parameters to become good at predicting the next token.

### The loop

```
1. Take a chunk of text:  "The loan was sanctioned at 24% per"
2. Run the forward pass (§6.9). Get probabilities for the next token.
3. The correct answer is "annum". Look up what probability the model gave it.
   Say it gave 0.02 — two percent. That is poor.
4. Compute the LOSS — a single number measuring how wrong this was.
5. Compute, for EVERY parameter, whether nudging it up or down
   would have reduced the loss. This is the GRADIENT.
6. Nudge every parameter a small step in the improving direction.
7. Repeat, trillions of times.
```

### The three terms

**Loss** — one number saying how wrong the prediction was. The standard choice is **cross-entropy loss**, which is simply the negative logarithm of the probability assigned to the correct token:

```
loss = −log(probability of the correct token)

  gave it 0.90  →  loss = −log(0.90) = 0.105    good
  gave it 0.02  →  loss = −log(0.02) = 3.912    bad
  gave it 0.001 →  loss = −log(0.001) = 6.908   very bad
```

The logarithm's role: it punishes confident wrongness far more than mild uncertainty. A model that assigns 0.1% to the right answer is penalised 66 times more than one that assigns 90%.

**Gradient** — for each parameter, the direction and magnitude of change that would reduce the loss. Computed by **backpropagation**: run the loss backwards through the network, layer by layer, using the chain rule from calculus. From §3.3, this costs roughly twice the forward pass, which is where the `6 × N × T` figure came from.

**Optimiser** — the rule that turns gradients into actual updates. **AdamW** is the standard. It maintains, per parameter, running averages of recent gradients and recent squared gradients, and uses both to scale each parameter's step individually. That is why it needs the 8 extra bytes per parameter in §8.4.

**Learning rate** — the size of each step. Too large and training becomes unstable; too small and it never converges. It is the single most important hyperparameter, and it is typically varied on a schedule: warm up from near zero, then decay.

### The scale

Pretraining a frontier model: 10–30 trillion tokens, thousands of GPUs, weeks to months, tens to hundreds of millions of dollars. Roughly ten organisations worldwide can do it.

**You will not do this.** But every fine-tuning technique in §9.3 onwards is the *same loop* run on a smaller scale, so understanding it once is sufficient.

---

\

A raw pretrained model is a text-continuation engine, not an assistant. Ask it a question and it may continue with more questions, because that is what documents containing questions tend to do. Three further stages produce something usable.

| Stage | What it trains on | Cost | What it produces | Is this your lever? |
| :--- | :--- | :--- | :--- | :--- |
| **1. Pretraining** | 10–30T tokens of web, books, code | $10M–$500M+ | World knowledge, grammar, latent reasoning | No. You buy this. |
| **2. Continued pretraining** | 10B–500B domain tokens | $50k–$5M | Domain fluency (legal, Indic, medical) | Rarely — needs a very large proprietary corpus |
| **3. Supervised fine-tuning (SFT)** | 1k–1M instruction/response pairs | $100–$50k | Instruction-following, format, tone, task skill | **Yes. This is your main lever.** |
| **4. Alignment** | Preference pairs or verifiable rewards | $1k–$1M | Helpfulness, refusal behaviour, reasoning depth | Occasionally |

### Stage 3 in detail

SFT is the same loop as §9.1, but the training data is pairs:

```python
{
  "messages": [
    {"role": "user",      "content": "Summarise the sanction conditions in this memo: ..."},
    {"role": "assistant", "content": "1. Post-disbursement documentation within 30 days\n2. ..."}
  ]
}
```

The model is trained to produce the assistant turn given the user turn. Loss is computed **only on the assistant's tokens** — you are teaching it to respond, not to generate user messages.

A few hundred to a few thousand high-quality examples is often sufficient to change formatting, tone, and task structure substantially. **Quality dominates quantity** by a wide margin: 500 carefully written examples routinely beat 50,000 scraped ones.

\

*Skip this subsection on a first pass. It is here so the terms are not mysterious when you meet them, and so you can return in a focused session.*

Alignment addresses a problem SFT cannot: for open-ended tasks, there is no single correct answer, only better and worse ones. You cannot write a target response; you can only compare two candidates.

**RLHF (Reinforcement Learning from Human Feedback)** was the original method:
1. Humans rank pairs of model outputs.
2. Train a separate **reward model** to predict those rankings.
3. Use reinforcement learning to adjust the main model to score highly under the reward model, with a penalty term keeping it from drifting too far from where it started.

Three models in memory at once. Expensive and unstable.

**DPO (Direct Preference Optimization)** is the current default. The insight is mathematical: the model you would obtain from RLHF has a closed-form relationship to the reward function, which means the reward can be re-expressed *in terms of the model itself*. The separate reward model becomes unnecessary, and the whole procedure collapses into an ordinary classification loss over triples of `(prompt, better response, worse response)`.

Two models in memory, no reinforcement learning loop, stable training, comparable results. That is why it won.

The formula, for reference only — you do not need to be able to derive or use it:

```
L_DPO = −log σ( β·[ log π_θ(y_w|x) − log π_ref(y_w|x) ]
              − β·[ log π_θ(y_l|x) − log π_ref(y_l|x) ] )

  y_w   the preferred response,  y_l  the rejected one
  π_θ   the model being trained
  π_ref a frozen copy of where it started
  β     how strongly to stay near the starting point (typically 0.1–0.5)
  σ     the sigmoid function, which squashes any number into 0–1
```

Read in plain language: *increase the model's relative preference for the better response over the worse one, without letting it drift too far from its starting behaviour.*

**Variants worth recognising by name:** KTO works with simple thumbs-up/thumbs-down labels rather than pairs, which makes data collection far easier. ORPO merges SFT and alignment into one stage. GRPO and its relatives are used where correctness is *programmatically checkable* — mathematics, code that must pass tests, output that must validate against a schema — by sampling several attempts, scoring them with a checker, and using the group's average as the comparison baseline. That family is what produced the current generation of reasoning models.

### The practical decision table

| What you have | What to use |
| :--- | :--- |
| Examples of correct input → output | SFT (with LoRA, §9.5) |
| Pairs where one response is better | DPO |
| Thumbs up/down at scale | KTO |
| An automated checker (tests pass, schema valid, number correct) | GRPO-family |
| **None of the above** | **Prompting and retrieval. Do not fine-tune.** |

---

\

**What this section gives you.** The technique that makes model customisation practical on ordinary hardware, explained from the arithmetic up.

### The problem, restated

From §8.4: full fine-tuning needs about 16 bytes per parameter. A 7B model needs roughly 112 GB before activations. That is multiple datacentre GPUs to adjust a *small* model.

Worse, you get a complete new 14 GB model file per customisation. Ten clients, ten variants, ten copies in memory.

### The observation LoRA is built on

When you fine-tune a model for a specific task, the *change* to the weights turns out to be highly structured — much simpler than the weights themselves. It has, in technical terms, **low intrinsic rank**.

**What "low rank" means, concretely.** Consider a `1000 × 1000` grid of numbers — one million values. If that grid happens to be constructible by multiplying a `1000 × 4` grid by a `4 × 1000` grid, then it can be exactly described by only `4,000 + 4,000 = 8,000` numbers instead of a million. The grid has a lot of redundant structure; rank is the measure of how much.

The claim behind LoRA is that fine-tuning updates have exactly this property.

### The mechanism

For a weight matrix `W₀` of shape `(d, k)`:

- **Freeze `W₀` completely.** It never changes. No gradients, no optimiser state, no memory cost beyond storing it.
- **Add two small matrices:** `A` of shape `(r, k)` and `B` of shape `(d, r)`, where `r` is small — 8, 16, 32, 64.
- **The layer now computes:**

```
output = W₀ · x  +  (α / r) · B · A · x
         ↑            ↑
      frozen       trainable — this is the only part that learns
```

- `B` is initialised to all zeros, so `B·A` starts as zero and the model begins training exactly as it was.
- `α` (alpha) scales how strongly the adapter contributes. The effective scale is `α / r`.

### The size reduction, computed

```
Original matrix:  d = 4096, k = 4096
                  4096 × 4096 = 16,777,216 trainable parameters

With LoRA at r = 16:
        A:  16 × 4096 =  65,536
        B:  4096 × 16 =  65,536
        Total         = 131,072 trainable parameters

Reduction: 16,777,216 ÷ 131,072 = 128×
```

Applied across a whole model, trainable parameters typically fall to **0.1% to 1%** of the total. And because optimiser state is only kept for trainable parameters, the 16-bytes-per-parameter figure now applies to 1% of the model rather than all of it.

### Why the result is small and portable

You save only `A` and `B`, not the base model. A LoRA adapter file is typically **50–300 MB** against a 16 GB base model.

This has an architectural consequence that matters commercially: one base model loaded in GPU memory can serve **many adapters simultaneously**, swapped per request. Serving engines support this directly.

```
              ┌─────────────────────────┐
              │  BASE MODEL — 16 GB     │   loaded once
              │  frozen, shared         │
              └───────────┬─────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
  adapter: memos    adapter: hindi    adapter: collections
     180 MB            210 MB              150 MB
```

Per-client or per-task customisation without per-client GPUs.

### The hyperparameters that matter

| Parameter | Guidance |
| :--- | :--- |
| `r` (rank) | 8–16 for style, tone, formatting. 32–64 for a genuinely new task. 128+ for new domain knowledge — and at that point, reconsider whether retrieval is the better answer. |
| `alpha` | Set `alpha = 2 × r` as a reliable default. |
| `target_modules` | **Target all linear layers**, not just the query and value projections. This matters more than the rank does. |
| `learning_rate` | 1e-4 to 2e-4 — roughly ten times higher than full fine-tuning, because far fewer parameters are moving. |
| `epochs` | 1–3. LoRA overfits quickly on small datasets. |
| `dropout` | 0.05–0.1 when you have fewer than about 5,000 examples. |

### QLoRA

QLoRA combines LoRA with quantisation of the frozen base:

1. **Load the base model at 4 bits** using a format called NF4, designed for the roughly bell-shaped distribution that neural network weights actually follow.
2. **Double quantisation** — compress the compression constants themselves, saving a further small amount.
3. **Paged optimiser state** — spill to system RAM when a memory spike would otherwise crash the run.

Net effect: **fine-tune a 70B model on a single 48 GB GPU.** The adapters themselves remain at 16-bit precision, so training quality is largely preserved despite the 4-bit base.

### The limit you must respect

**LoRA teaches behaviour. It does not reliably teach facts.**

| Works well | Works poorly |
| :--- | :--- |
| House writing style for credit memos | Current provisioning percentages |
| Conforming to a specific output schema | Your product catalogue |
| Domain vocabulary and register | Anything with an effective date |
| Task structure (how to summarise an appraisal file) | Anything requiring a citation |
| Consistent tone in customer communications | Anything access-controlled per user |

The right-hand column belongs in retrieval, for four reasons: facts change, facts must be cited, facts must be permission-filtered per user, and facts must be correctable without retraining.

**The rule: fine-tune for form, retrieve for fact.**

---

\

This is the code from a real fine-tuning run. Every line is annotated. If §2 was read, nothing here should be unfamiliar syntax — only unfamiliar library names, which are explained as they appear.

### What this script does

Takes an open 8-billion-parameter model, loads it in 4-bit precision, attaches LoRA adapters, and trains them on your own examples of credit memo drafting. Output is a small adapter file, not a new model.

```python
# ═══════════════════════════════════════════════════════════════════
# SECTION 1 — IMPORTS
# Bringing in the four libraries this script needs.
# ═══════════════════════════════════════════════════════════════════

from transformers import (
    AutoModelForCausalLM,   # loads a text-generation model by name
    AutoTokenizer,          # loads the matching tokeniser (§4.2)
    BitsAndBytesConfig,     # settings for loading a model in 4-bit
)
# `transformers` is Hugging Face's library — the standard toolkit for
# working with published models. "AutoX" classes read the model's
# config.json and construct the right object automatically, so you
# don't need to know the architecture in advance.

from peft import (
    LoraConfig,                   # settings for the LoRA adapters
    get_peft_model,               # attaches adapters to a loaded model
    prepare_model_for_kbit_training,  # small fixes needed for 4-bit training
)
# `peft` = Parameter-Efficient Fine-Tuning. This is the library that
# implements LoRA and its relatives.

from trl import SFTTrainer, SFTConfig
# `trl` = Transformer Reinforcement Learning. Despite the name, its
# SFTTrainer is the standard tool for ordinary supervised fine-tuning
# (§9.2 stage 3). It handles the training loop, batching, evaluation,
# and checkpointing so you don't write that yourself.

import torch
# PyTorch — the underlying tensor library (§3.1). We need it here only
# to name a numeric type.


# ═══════════════════════════════════════════════════════════════════
# SECTION 2 — WHICH MODEL
# ═══════════════════════════════════════════════════════════════════

MODEL = "Qwen/Qwen3-8B"
# Identifier on the Hugging Face Hub, in "organisation/model" form.
# Written in capitals by convention to signal "this is a constant —
# set once, never reassigned". Python does not enforce that; it is
# a readability convention.
#
# An 8B model is a deliberate choice: large enough to be genuinely
# useful, small enough to fine-tune on one accessible GPU.


# ═══════════════════════════════════════════════════════════════════
# SECTION 3 — 4-BIT LOADING CONFIGURATION  (the "Q" in QLoRA)
# ═══════════════════════════════════════════════════════════════════

bnb = BitsAndBytesConfig(
    load_in_4bit=True,
    # Store each frozen base weight in 4 bits instead of 16 (§8.4).
    # 8B parameters: 16 GB at BF16 → about 4 GB at 4-bit.

    bnb_4bit_quant_type="nf4",
    # NF4 = "4-bit NormalFloat". A 4-bit format whose 16 representable
    # values are spaced to match the roughly bell-shaped distribution
    # that trained weights actually follow — so more of the 16 slots
    # land where the weights actually are. Better accuracy than
    # evenly-spaced 4-bit at identical size.

    bnb_4bit_compute_dtype=torch.bfloat16,
    # Weights are STORED at 4 bits but temporarily converted to
    # 16-bit for the actual arithmetic. Storage precision and compute
    # precision are separate decisions. Storage saves memory;
    # compute precision preserves accuracy.

    bnb_4bit_use_double_quant=True,
    # Quantisation itself needs small "scale" constants stored per
    # block of weights. This compresses those constants too.
    # Saves roughly a further 0.4 bits per parameter — small, free.
)


# ═══════════════════════════════════════════════════════════════════
# SECTION 4 — LOAD THE MODEL
# ═══════════════════════════════════════════════════════════════════

model = AutoModelForCausalLM.from_pretrained(
    MODEL,
    quantization_config=bnb,   # apply the 4-bit settings above
    device_map="auto",         # place layers across available GPUs
                               # automatically; spill to CPU if needed
)
# "CausalLM" = causal language model — one that predicts the next
# token using only preceding tokens. That is the causal mask from
# §6.3, appearing in a class name.

model = prepare_model_for_kbit_training(model)
# Housekeeping required when training on top of a quantised base:
# casts certain small layers (normalisation, the output head) back to
# higher precision, and enables gradient checkpointing hooks.
# Skipping this causes training instability. Always include it.

model.config.use_cache = False
# Disable the KV cache (§7.2). The cache exists to speed up
# generation; during training we process whole sequences at once and
# the cache only wastes memory. Re-enable it before generating.


# ═══════════════════════════════════════════════════════════════════
# SECTION 5 — LORA CONFIGURATION  (the "LoRA" in QLoRA)
# ═══════════════════════════════════════════════════════════════════

lora = LoraConfig(
    r=32,
    # The rank from §9.3. Each targeted matrix gets an A of shape
    # (32, k) and a B of shape (d, 32). 32 suits learning a genuine
    # new task, such as a specific memo-drafting structure.
    # Style-only changes would use 8–16.

    lora_alpha=64,
    # The scaling factor. Effective scale is alpha/r = 64/32 = 2.
    # Following the alpha = 2r default.

    lora_dropout=0.05,
    # During training, randomly ignore 5% of adapter connections on
    # each step. This prevents memorising the training examples
    # instead of learning the pattern. Standard for small datasets.

    bias="none",
    # Do not train bias terms. They are a negligible fraction of
    # parameters and training them rarely helps.

    task_type="CAUSAL_LM",
    # Tells peft what kind of model this is, so it wires the
    # adapters into the right places.

    target_modules=[
        "q_proj", "k_proj", "v_proj", "o_proj",
        # The four attention projections from §6.2 and §6.4:
        #   q_proj, k_proj, v_proj → produce Q, K, V
        #   o_proj                 → mixes the concatenated heads
        "gate_proj", "up_proj", "down_proj",
        # The three feed-forward projections from §6.5:
        #   up_proj + gate_proj → expand to the wider dimension
        #   down_proj           → contract back
    ],
    # TARGETING ALL SEVEN MATTERS MORE THAN THE RANK DOES.
    # Much older guidance targeted only q_proj and v_proj. Later work
    # showed that targeting every linear layer gives consistently
    # better results at the same or lower rank.
)

model = get_peft_model(model, lora)
# Attaches the adapters: walks the model, finds every matrix named in
# target_modules, and wraps each with its A and B. Everything else is
# frozen.

model.print_trainable_parameters()
# Prints something like:
#   trainable params: 83,886,080 || all params: 8,113,000,000 || trainable%: 1.03
#
# ALWAYS CHECK THIS LINE. Expect 0.3%–1.0%.
#   Near 100%  → LoRA was not applied. You are full fine-tuning and
#                will run out of memory.
#   Near 0.01% → target_modules is probably too narrow.


# ═══════════════════════════════════════════════════════════════════
# SECTION 6 — TRAINING SETTINGS
# ═══════════════════════════════════════════════════════════════════

trainer = SFTTrainer(
    model=model,
    train_dataset=train_ds,
    # Expected shape: a list of records, each
    #   {"messages": [{"role": "user", "content": "..."},
    #                 {"role": "assistant", "content": "..."}]}
    # This is the SFT format from §9.2.

    eval_dataset=eval_ds,
    # A HELD-OUT set never used for training. Without it you cannot
    # tell learning from memorisation. Never skip this.

    args=SFTConfig(
        output_dir="out/credit-memo-adapter",
        # Where checkpoints and the final adapter are written.

        num_train_epochs=2,
        # An epoch is one full pass through the training data.
        # LoRA overfits fast; 1–3 is the usual range.

        per_device_train_batch_size=4,
        # How many examples are processed simultaneously on each GPU.
        # Limited by memory, not by preference.

        gradient_accumulation_steps=4,
        # Process 4 batches of 4, accumulating gradients, then update
        # once. Effective batch size = 4 × 4 = 16.
        # This is how you get large-batch stability on small memory:
        # the mathematics is nearly identical, the memory is a
        # quarter. One of the most useful tricks in the file.

        learning_rate=2e-4,
        # 0.0002. About 10× a full fine-tune's rate, because far
        # fewer parameters are moving and each must move further.

        lr_scheduler_type="cosine",
        warmup_ratio=0.03,
        # Start near zero, rise over the first 3% of steps, then
        # decay along a cosine curve. Warmup prevents early
        # instability; decay lets training settle rather than
        # bouncing around a minimum.

        bf16=True,
        # Do arithmetic in BFloat16 (§8.4). Half the memory of FP32
        # with the same numeric range. Standard for training.

        gradient_checkpointing=True,
        # Instead of storing every intermediate activation for the
        # backward pass, store some and recompute the rest.
        # Roughly 30% slower, roughly 60% less memory.
        # Almost always the right trade.

        logging_steps=10,
        eval_strategy="steps",
        eval_steps=100,
        # Print training loss every 10 steps; evaluate on the held-out
        # set every 100. WATCH BOTH. If training loss falls while
        # evaluation loss rises, the model is memorising rather than
        # learning — stop and reduce epochs or add data.

        save_strategy="steps",
        save_steps=100,
        load_best_model_at_end=True,
        # Save periodically and, at the end, keep the checkpoint with
        # the best evaluation loss rather than simply the last one.

        max_length=4096,
        # Truncate any example longer than this. Set it to fit your
        # actual documents; longer costs memory quadratically
        # in the attention computation (§6.2).
    ),
)

trainer.train()
# Runs the loop from §9.1: forward pass, loss, gradients, update.
# Only the adapter parameters receive updates.

trainer.model.save_pretrained("out/credit-memo-adapter")
# Writes ONLY the adapters — roughly 100–300 MB, not 16 GB.
# To use this later you load the base model and apply the adapter
# on top.
```

### Serving the result

```bash
# vLLM can hold one base model in memory and serve several adapters,
# selecting per request. This is the multi-tenant pattern from §9.3.

vllm serve Qwen/Qwen3-8B \
  --enable-lora \
  --lora-modules memo=./out/credit-memo-adapter \
                 collections=./out/collections-adapter \
  --max-lora-rank 32

# Requests then specify model="memo" or model="collections" against
# the same endpoint, on the same GPU, sharing the same base weights.
```

### What breaks

| Symptom | Cause | Fix |
| :--- | :--- | :--- |
| Out of memory immediately | LoRA not applied; check `print_trainable_parameters` | Verify `get_peft_model` ran and `target_modules` matched real layer names |
| Training loss falls, eval loss rises | Overfitting | Fewer epochs, more data, higher dropout, lower rank |
| Model forgets general ability | Rank too high, or learning rate too high, or too many epochs | Lower rank, lower learning rate, fewer epochs |
| Output format still wrong | Too few examples of that format | More examples of the exact format; this is a data problem, not a hyperparameter one |
| It learned style but still gets facts wrong | Expected — see §9.3 | Facts belong in retrieval, not weights |

---

\

Most teams that fine-tune should not have. The order below is deliberate — work down it and stop at the first thing that works.

```
1. Improve the PROMPT
   Clear output specification, 3–5 examples including an edge case,
   explicit instruction on what to do when information is missing.
   → Fixes a surprising majority of "the model isn't good enough".

2. Improve the CONTEXT
   Is the information the model needs actually reaching it? Measure
   this rather than assuming. Most failures live here.

3. Improve the SAMPLING
   Temperature 0 for anything deterministic. Schema constraints for
   anything structured.

4. Try a STRONGER MODEL
   A day of work. Often decisive. Try before spending weeks training.

5. Decompose the TASK
   Two focused calls frequently beat one overloaded call.

6. THEN consider fine-tuning.
```

**Fine-tuning is genuinely the right answer when:**

- You need a **specific output format** that prompting achieves only 90% of the time and you need 99.5%.
- You need a **house style** that would take 2,000 tokens of instruction to describe and can be shown in 500 examples instead.
- You need a **small model to do one narrow task well**, for cost or latency reasons — this is often the strongest case, since a fine-tuned 8B model can match a much larger general model on a narrow task at a fraction of the cost.
- You have **thousands of high-quality examples** from existing operations, which for an established lender you very often do: years of human-written credit memos, adverse action letters, and collections notes are exactly the right training data.

**Fine-tuning is the wrong answer when:**

- You want the model to know current facts. → Retrieval.
- You have fewer than a few hundred examples. → Few-shot prompting.
- Your requirements change monthly. → Prompting; retraining cannot keep pace.
- You need citations or per-user access control. → Retrieval, necessarily.

---

# PART 10 — WHERE THINGS STAND

> Placed at the end deliberately. Everything below is a conclusion drawn from the mechanisms in Parts 1–9, and reading it first would mean reading conclusions without their reasons. It is also the most perishable material in the volume — the mechanisms will hold for years, the landscape will not.

\

**1. Reasoning is on by default at the frontier.** Flagship models allocate variable inference-time compute to an internal thinking phase before answering (§7.1). Cost consequence: output token counts are no longer bounded by visible answer length, and cost per task can vary by more than an order of magnitude for identical inputs.

**2. One-million-token context is standard at the flagship tier.** This has not removed the need for retrieval. Cost scales with tokens; prefill latency scales with prompt length (§8.3); attention quality is not uniform across a very long context; and — decisively in regulated lending — you cannot permission-filter or cite "the entire corpus." Long context and retrieval are complements.

**3. Open-weight models reached the frontier, and "open" now means datacentre-scale.** The leading open models are trillion-parameter Mixture-of-Experts systems (§6.8) requiring 8 to 64 accelerators. Simultaneously there is a genuinely small tier — under 30 billion parameters, quantised — that runs on one GPU or a phone. The middle has thinned. Chinese laboratories are the effective owners of the open frontier.

**4. Price per unit of capability is falling roughly an order of magnitude per year, unevenly.** Frontier proprietary tiers sit around $5–$10 per million input tokens; the cheapest frontier-class open tokens are roughly ten times below that; small fast models are cheaper again by another order. This spread is what makes tiered routing — cheap model first, escalate on failure — a standard practice rather than an optimisation.

**5. A tool-connection standard consolidated.** Model Context Protocol is now the common interface between models and external tools and data, across every major framework. Its July 2026 revision made the protocol stateless, which turned it into ordinary load-balanceable HTTP infrastructure. Covered fully in Volume 4.

**6. Agents became the default abstraction — and produced the first genuinely new class of security incident.** 2025–26 saw zero-click data exfiltration from an enterprise copilot, a compromised coding assistant distributed to hundreds of thousands of installations, and an autonomous agent deleting a production database during a change freeze. Volume 5 covers the resulting threat taxonomy.

**7. Regulation is live, and creditworthiness assessment is explicitly named.** The EU AI Act's transparency obligations applied from August 2026; obligations for high-risk systems — a category that explicitly includes credit scoring — were deferred to December 2027. In India, the Reserve Bank published a framework for AI in the financial sector in August 2025, setting principles, pillars and recommendations, with a deliberately enabling posture. Volume 6 covers this in full.

**The stable conclusion beneath all seven:** never write a specific model name into an architecture document. Write a *tier* and a *routing policy*, put every model call behind a single gateway, and keep a frozen evaluation suite as the arbiter of change. Then a model swap is a configuration change validated in an afternoon, which is roughly the cadence at which this landscape actually moves.

---

## 10.2 — What You Can Now Do

If Parts 1–9 have landed, you can:

- Read a model's `config.json` and state what hardware it needs and roughly how fast it will generate.
- Compute the memory required to serve a model at a given precision and concurrency, from first principles.
- Explain why a long prompt is expensive in two distinct ways — prefill compute and cache memory — and which fix applies to which.
- Read a research paper's architecture section and recognise what is genuinely new versus what is standard.
- Diagnose a "the model is bad" complaint into its real cause: sampling parameters, missing context, wrong model tier, or a genuine capability gap.
- Read and modify a fine-tuning script, and judge whether fine-tuning is the right tool at all.
- Follow AI news and separate a real architectural advance from a repackaging.

**What you cannot yet do**, and which the remaining volumes cover: build a retrieval system that reliably finds the right document; connect a model to tools and data safely; construct an agent that does not loop, overspend, or take unauthorised action; measure whether any of it works; defend it against attack; and produce the evidence a supervisor will ask for.

---

## 10.3 — Volume 1 Reference Card

```
MEMORY
  Weights (GB)  ≈  parameters (billions) × bytes per parameter
      70B @ 2 bytes = 140 GB · @ 1 byte = 70 GB · @ 0.5 bytes = 35 GB

  Full fine-tune ≈ 16 bytes per parameter  →  7B ≈ 112 GB
  LoRA trains 0.1–1% of parameters. QLoRA: 70B on one 48 GB card.

  KV cache per token = 2 × layers × kv_heads × head_dim × bytes
      70B with GQA ≈ 320 KB/token
      → 8k context ≈ 2.6 GB per user · 128k context ≈ 41 GB per user

COMPUTE
  Forward pass FLOPs ≈ 2 × parameters × tokens
  Training step      ≈ 6 × parameters × tokens
  Matrix multiply (M,K)×(K,N) → 2 × M × K × N FLOPs, output shape (M,N)

SPEED
  Single-stream decode tok/s ≈ memory bandwidth ÷ weight bytes
      70B @ 2 bytes on 3.35 TB/s ≈ 24 tok/s
  Prefill is compute-bound · decode is memory-bound
  Batching multiplies throughput; quantisation multiplies both
  speed and concurrency

TOKENS
  ~4 English characters per token · ~0.75 English words per token
  A4 page ≈ 550 tokens · Devanagari costs 2–4× English
  Always measure with the production tokeniser. Never estimate.

ATTENTION
  Attention(Q,K,V) = softmax( Q·Kᵀ / √d + mask ) · V
  Cost grows with the SQUARE of sequence length
  GQA cuts KV cache 4× by sharing key/value heads across query heads
  MoE: total parameters set your memory; active parameters set your speed

SAMPLING
  temperature 0–0.2 for extraction, classification, code, JSON
  temperature 0.7–1.0 for drafting
  top_p 0.9–0.95 preferred over top_k
  Always set max_tokens and stop sequences
  Temperature 0 is highly consistent, NOT guaranteed reproducible

DECISIONS
  Fine-tune for FORM. Retrieve for FACT.
  Try in order: prompt → context → sampling → stronger model
                → decompose → only then fine-tune
  Never name a specific model in an architecture document.
  Name a tier and a routing policy.
```

---

*Volume 1 ends here. Volume 2 covers serving and cost: how the loop in §6.9 is made fast enough and cheap enough to run at production volume.*
