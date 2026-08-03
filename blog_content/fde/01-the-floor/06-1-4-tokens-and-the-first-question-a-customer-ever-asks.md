---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "01"
volumeSlug: "the-floor"
volumeTitle: "THE FLOOR"
order: 6
title: "Tokens, and the first question a customer ever asks"
slug: "1-4-tokens-and-the-first-question-a-customer-ever-asks"
sectionNumber: "1.4"
part: "PART I — THE MACHINE"
kind: "narrative"
sourceFile: "FDE_01_THE_FLOOR.md"
tags: []
hasSayThis: false
wordCount: 2190
status: "raw"
section: "§1.4"
summary: ""
enriched: false
---

## § 1.4 — Tokens, and the first question a customer ever asks

Nine days later, mid-demo, Priya stops you: *"This is good. What does it cost us at forty thousand applications a month?"*

You have thirty seconds. If you say "I'll get back to you," the pilot survives but you don't lead it. If you say a number and it's wrong by 10×, the pilot dies at the finance review three weeks later and nobody tells you why.

The number she wants is made of **tokens**.

### What a token is

Models don't read letters and don't read words. They read **tokens** — Lego bricks of text, somewhere between a letter and a word. `"unbelievable"` might be three bricks: `un` + `believ` + `able`.

Why not letters? Because letters make sequences brutally long, and every extra position costs compute. Why not whole words? Because a dictionary of every word explodes into millions of entries and dies on the first typo or new product name.

So: **subword tokenization**. The common algorithm family is **BPE** — byte-pair encoding. Build a vocabulary of roughly 50,000–200,000 frequent *chunks*. Common words stay whole (`the`, ` house`). Rare words split into pieces (`electro` + `magnet` + `ism`). Because the pieces go down to single bytes, *anything* is representable — any typo, any emoji, any Telugu character.

One detail that trips everyone: **the leading space is part of the token.** ` house` and `house` are two different tokens with different IDs.

**The rules of thumb you will use weekly.** In English: 1 token ≈ 4 characters ≈ ¾ of a word. 1,000 tokens ≈ 750 words. Code tokenizes *worse* than prose — symbols, whitespace, `_` and `->` everywhere. Non-English languages can cost **2–4× more tokens for the same meaning**.

Hold that last one. Thirty percent of Meridian's applicant correspondence is in Spanish. That is not a translation problem. It is a line item.

### Why tokens explain the famous failures

*"How many r's in strawberry?"* The model may see `straw` + `berry` — two **opaque** bricks. It never sees the letters inside them. Asking it to count letters is like asking you how many atoms are in a chair. You know the chair. You have never had access to its atoms.

Same root cause for weak rhyming, weak string reversal, and arithmetic on long numbers — digits chunk inconsistently. `1234` might be one token; `12345` might arrive as `123` + `45`.

**THE DEPLOYMENT LENS.** Tom Beaudry, the 22-year underwriter, will test the system by asking it to count things. *"How many late payments in this file?"* It will sometimes be wrong in a way that looks stupid, in front of people, and the trust cost is out of all proportion to the error.

Your defence is not a better prompt. It's a **tool**: give the model a counting function and make it call that instead of counting in its head. Say it like this: *"It reasons in chunks, not characters. Anything that must be counted, we count in code and hand it the answer. That's a design rule, not a workaround."*

### Building her number

Small amounts of Python from here, one idea at a time. Nothing is assumed.

**A variable, and printing.** A **variable** is a name stuck onto a value. `=` means *store this*. `print(...)` means *show this*.

```python
text = "Applicant has 4 open credit lines."
print(text)
```

**OUTPUT**
```
Applicant has 4 open credit lines.
```

**MENTAL TRACE.** Line 1: Python takes the characters between the quotes and stores them under the name `text`. The quotes are how Python knows this is text and not code. Line 2: `print` looks up what's in `text` and writes it out.

**Measuring length.** `len(...)` is built in and answers *how many items?* For text: how many characters, spaces and punctuation included.

```python
text = "Applicant has 4 open credit lines."
print(len(text))
```

**OUTPUT**
```
34
```

**MENTAL TRACE.** `len` walks the string counting every character — `A`, `p`, `p`, through to the final `.`, including the five spaces. It returns 34, and `print` displays it. Note what did *not* happen: it did not count words. There are 6 words and 34 characters.

**Characters into tokens.** Python has two division symbols and the difference matters. `/` gives an exact decimal (`34 / 4` → `8.5`). `//` gives a whole number, discarding the remainder (`34 // 4` → `8`). Token counts are whole things.

```python
text = "Applicant has 4 open credit lines."
print(len(text) // 4)
```

**OUTPUT**
```
8
```

**MENTAL TRACE.** Innermost first: `len(text)` becomes 34. Then `34 // 4` — 4 goes into 34 eight times with 2 left over, and `//` throws the 2 away. So 8 reaches `print`. A real BPE tokenizer would say 9 here. The heuristic is *close, and free*. That trade is the entire point of it.

**Wrapping it in a function.** A **function** is a reusable named recipe. `def` starts it, the name follows, then brackets holding **parameters** — placeholder names for whatever gets passed in. Indented lines are the body. `return` hands a value back to whoever called it.

The `: str` and `-> int` parts are **type hints**. They don't change behaviour; they're a note to humans and tools saying "takes text, gives back a whole number." Professionals write them because six months later they are the only documentation that hasn't rotted.

```python
def estimate_tokens(text: str) -> int:
    return len(text) // 4

print(estimate_tokens("Applicant has 4 open credit lines."))
```

**OUTPUT**
```
8
```

**MENTAL TRACE.** The `def` block runs first but *does nothing yet* — it teaches Python the recipe and files it under the name `estimate_tokens`. Line 4 then calls it. The sentence travels into the parameter `text`. Inside: `len(text)` is 34, `34 // 4` is 8, `return` sends 8 back out to the waiting `print`.

**Numbers inside sentences.** An **f-string** is text with `f` before the opening quote. Anything in curly braces gets evaluated and dropped in.

```python
count = 8
print(f"This message is about {count} tokens.")
```

**OUTPUT**
```
This message is about 8 tokens.
```

**MENTAL TRACE.** Python sees the `f`, scans for braces, finds `{count}`, looks it up (8), converts it to the character `8`, splices it in. Without the `f` you would literally see `{count}` printed — the single most common beginner surprise here.

### The thing that makes conversations expensive

**The API is stateless.** The model retains nothing between calls. When an underwriter asks a fourth follow-up about a file, your code doesn't send just that question — it re-sends **the entire conversation so far**, every previous message and answer, so the model can see the context again.

Turn 4 pays for turns 1, 2 and 3 all over again.

Real numbers: say each underwriter message is 200 tokens and each reply 300.

One more piece of syntax first: a **loop**. `for turn in range(1, 5):` means *do the indented block four times, with `turn` being 1, then 2, then 3, then 4*. `range(1, 5)` starts at 1 and stops **before** 5 — Python is consistently exclusive at the top end, and forgetting that is the most common off-by-one bug in the language.

```python
USER_TOKENS = 200
REPLY_TOKENS = 300

transcript = 0
total_input = 0
total_output = 0

for turn in range(1, 5):
    input_tokens = transcript + USER_TOKENS
    total_input = total_input + input_tokens
    total_output = total_output + REPLY_TOKENS
    transcript = input_tokens + REPLY_TOKENS
    print(f"Turn {turn}: billed input = {input_tokens}, output = {REPLY_TOKENS}")

print(f"TOTAL input tokens: {total_input}")
print(f"TOTAL output tokens: {total_output}")
```

**OUTPUT**
```
Turn 1: billed input = 200, output = 300
Turn 2: billed input = 700, output = 300
Turn 3: billed input = 1200, output = 300
Turn 4: billed input = 1700, output = 300
TOTAL input tokens: 3800
TOTAL output tokens: 1200
```

**MENTAL TRACE.** Three counters start at zero. `transcript` means "how much text already exists in this conversation."

*Turn 1:* nothing exists, so billed input is 0 + 200 = 200. Added to the running total. The model replies with 300, so the transcript now holds 200 + 300 = 500.

*Turn 2:* we must re-send those 500 plus the new 200 → 700 billed. Running total 900. Transcript grows to 1000.

*Turn 3:* re-send 1000 plus 200 → 1200 billed. Running total 2100. Transcript 1500.

*Turn 4:* re-send 1500 plus 200 → **1700 billed for a 200-token question.** Running total 3800.

Look at the input column: 200, 700, 1200, 1700. **Turn 4 costs 8.5× turn 1 for the same amount of typing.** Each turn adds a fixed step of 500, making the running total an arithmetic series — and the sum of an arithmetic series grows with the *square* of the number of turns. That is why conversation cost is **roughly quadratic in turns**, and why a 40-turn chat isn't 10× a 4-turn chat. It's closer to 100×.

### The dollar figure

Prices live in a **dictionary** — a lookup table of `key: value` pairs inside `{ }`, fetched by key. Nesting one dictionary inside another stores both input and output prices per model. Prices are quoted **per million tokens**, and input is always cheaper than output because generating costs the provider far more than reading.

```python
PRICING = {
    "frontier": {"input": 3.00, "output": 15.00},
    "budget":   {"input": 0.25, "output": 1.25},
}

def conversation_cost(model: str, input_tokens: int, output_tokens: int) -> float:
    rates = PRICING[model]
    return (input_tokens / 1_000_000) * rates["input"] + (output_tokens / 1_000_000) * rates["output"]

for name in PRICING:
    cost = conversation_cost(name, 3800, 1200)
    print(f"{name}: ${cost:.4f} per 4-turn review")
```

**OUTPUT**
```
frontier: $0.0294 per 4-turn review
budget: $0.0025 per 4-turn review
```

**MENTAL TRACE.** `PRICING["frontier"]` pulls out the inner dictionary and stores it as `rates`. Then `rates["input"]` is 3.00. Input cost: 3800 ÷ 1,000,000 × 3.00 = 0.0114. Output: 1200 ÷ 1,000,000 × 15.00 = 0.018. Sum 0.0294. The `:.4f` inside the f-string means *format as a decimal with exactly 4 places* — without it you'd print `0.029400000000000003`, which is not a thing you show a VP. The underscores in `1_000_000` are ignored by Python; they exist so a human can see it's a million at a glance.

**Those two price rows are illustrative structure, not today's rates. [VERIFY]** Look up live per-million prices on the day you quote a customer. Prices rot; the arithmetic never does.

### Her answer

40,000 applications per month, one 4-turn review each:

- Frontier model: 40,000 × $0.0294 = **~$1,176/month**
- Budget model: 40,000 × $0.0025 = **~$98/month**

Twelve times cheaper. And now the judgement she's actually testing: **you do not automatically pick the cheap one.** You route. Clean straightforward files go budget. Anything flagged — thin file, disputed items, anywhere near adverse-action territory — goes frontier, because a wrong explanation on a denial is a regulatory event and $1,000/month is not the relevant number when the alternative is a consent order.

**What you say out loud:** *"About twelve hundred a month if everything runs on the strong model, about a hundred if everything runs on the cheap one. My recommendation is neither — we route by file complexity and land near three hundred, and I'll show you the routing rule before we sign anything."*

That sentence is worth more than the code.

### What will bite you

**Dividing text instead of its length.**
```python
text = "Applicant has 4 open credit lines."
print(text / 4)
```
```
TypeError: unsupported operand type(s) for /: 'str' and 'int'
```
Python has no idea what it means to divide text by a number. Neither do you. You meant `len(text) / 4` — measure first, then divide.

**A key that isn't there.**
```python
print(PRICING["gpt-frontier"]["input"])
```
```
KeyError: 'gpt-frontier'
```
`KeyError` always means one thing: you asked a dictionary for a key it doesn't have. Ours is `"frontier"`. Keys are case-sensitive and exact. Production code guards this with `PRICING.get(model)` and a clear error, so a typo in a config file dies at the border with a readable message instead of crashing three layers deep during a demo.

**Floating-point money.**
```python
print(0.1 + 0.2)
```
```
0.30000000000000004
```
Nothing is broken. Computers store decimals in binary and some fractions don't land exactly. Harmless for an *estimate*. Not harmless for anything you bill on — for real invoicing you work in integer cents, or use Python's `Decimal`. Know which situation you're in.

**The silent one, and the expensive one.** No error message at all. You estimate on English sample documents, quote the number, and the pilot goes live across a book that's 30% Spanish. Same meaning, 2–4× the tokens. Your quote is wrong by roughly 40% and nobody finds out until finance does. **Always estimate on a sample drawn from the customer's real distribution, not from the clean documents they emailed you.** That habit alone has saved more deployments than any prompting technique.

`[RECEIPT]` **Build the token-and-cost calculator, and run it against a genuinely multilingual corpus.** A tool that tells a customer their non-English book costs 40% more than their vendor quoted is a thing you put in front of a hiring manager. Cost-consciousness is the fastest signal separating hobbyists from engineers, and almost nobody self-taught has it.

---
