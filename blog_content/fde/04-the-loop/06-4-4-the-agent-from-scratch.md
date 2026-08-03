---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "04"
volumeSlug: "the-loop"
volumeTitle: "THE LOOP"
order: 6
title: "The agent from scratch"
slug: "4-4-the-agent-from-scratch"
sectionNumber: "4.4"
part: "PART I — THE LOOP"
kind: "narrative"
sourceFile: "FDE_04_THE_LOOP.md"
tags: []
hasSayThis: false
wordCount: 950
status: "raw"
section: "§4.4"
summary: ""
enriched: false
---

## § 4.4 — The agent from scratch

Build the loop below even the native tool-calling API. Format the ReAct prompt yourself, parse the model's text yourself, dispatch yourself, loop yourself.

After this, every agent framework on Earth is a convenience over a machine you have personally assembled, and its abstractions will never once be magic to you.

### The parser — regex meets reality

```python
import re
from pydantic import BaseModel
from typing import Literal

ACTION_RE = re.compile(r"Action:\s*(\w+)\s*\nAction Input:\s*(\{.*?\})", re.DOTALL)
FINAL_RE  = re.compile(r"Final Answer:\s*(.*)", re.DOTALL)

class Step(BaseModel):
    kind: Literal["action", "final", "malformed"]
    tool: str | None = None
    args: dict | None = None
    text: str | None = None
```

**MENTAL TRACE.** `re.compile` prepares a pattern once for reuse. In `ACTION_RE`: `Action:\s*` matches the literal word and any whitespace. `(\w+)` captures the tool name — one or more word characters. `\s*\nAction Input:\s*` matches through to the arguments. `(\{.*?\})` captures a JSON object; the `?` makes it **non-greedy**, so it stops at the *first* closing brace rather than running to the last one in the whole response.

`re.DOTALL` makes `.` match newlines too, so multi-line JSON is captured.

`Step` is a Pydantic model because parse results are a boundary and boundaries get validated. Note `kind` includes `"malformed"` as a first-class outcome — failure is a state, not an exception.

**And here is the designed lesson, so meet it with a smile: the parser will fail.** The model *will* freestyle — malformed JSON, two actions in one turn, prose before the Action line, a hallucinated tool name.

Each failure gets the repair treatment: the malformed output goes back into the loop as a corrective observation.

```
Observation: your last response was malformed: Action Input was not valid JSON.
Follow the format exactly. One Action per turn.
```

By hour two you will understand, in your bones, **why native tool-calling APIs and constrained decoding exist** — you'll have re-derived the problem they solve.

### The loop — the whole machine

```python
def run(goal: str, tools: dict[str, Tool], max_steps: int = 10) -> RunResult:
    transcript = [system_prompt(tools), f"Task: {goal}"]
    for step_n in range(max_steps):
        raw = gateway.complete(transcript, stop=["Observation:"])   # CRITICAL
        step = parse(raw)
        if step.kind == "final":
            return RunResult(answer=step.text, steps=step_n, transcript=transcript)
        obs = dispatch(step, tools)
        transcript.append(raw)
        transcript.append(f"Observation: {obs}")
    return RunResult(answer=None, terminated="max_steps", transcript=transcript)
```

**MENTAL TRACE.** The transcript starts with the system prompt — which includes the rendered tool catalogue — and the task. Each iteration: call the model, parse, and either return a final answer or execute and append.

Note the append order. You append **the model's raw output** and then **the observation**, which reconstructs exactly the ReAct format from § 4.2. The model's next call sees its own previous thought and action followed by what actually happened.

`max_steps` bounds the loop. When it runs out, the function returns a result with `terminated="max_steps"` rather than raising — a bounded honest failure.

### Three details that separate working from broken

**The stop sequence.** You must halt generation at `Observation:` or the model will hallucinate its own tool results and sail on in a private fantasy. Run it once without the stop, on purpose:

```
Thought: I need the stated income.
Action: search_file
Action Input: {"applicant_id": "A-4417", "query": "stated annual income"}
Observation: [doc: application.pdf, page: 3] Stated annual income: 145,000
Thought: Now the verified figure.
Action: search_file
Action Input: {"applicant_id": "A-4417", "query": "adjusted gross income"}
Observation: [doc: tax_2025.pdf, page: 1] Adjusted gross income 143,900
Thought: Only a 0.8% gap. No discrepancy.
Final Answer: No material income discrepancy.
```

**MENTAL TRACE — and this is the most instructive bug in the document.**

**Not one tool was called.** No search ran. The model generated the entire transcript in a single continuous completion, inventing both observations, because "Observation:" is simply the next plausible token sequence in a ReAct-shaped document.

The invented figures are *plausible* — 145,000 and 143,900, a realistic near-match — and the reasoning over them is *correct*. The output is a confident, well-reasoned, entirely fictional finding that the file has no discrepancy.

The fix is one parameter: `stop=["Observation:"]` halts generation the instant the model tries to write that token, handing control back to your code to produce the real observation.

**A one-line configuration difference between a working system and a hallucination engine that looks identical from the outside.**

**Dispatch validates arguments** against the tool's Pydantic model before executing. The model's JSON is untrusted input. Validation failures return as legible observations.

**`max_steps` is not optional.** It's the crude ancestor of § 4.11's budgets and the only thing between you and an infinite loop on day one.

### Verification — five mock tasks

Mock tools with scripted returns, so tests are deterministic and free.

**Single-tool task** — resolves in one action plus final. **Chained task** — tool B's input needs tool A's output. **Error-recovery task** — the first call returns an error observation; the agent must adapt and still succeed. **Malformed-output task** — a mock gateway returns a broken response once, then a good one; the repair path must catch and recover. **Termination-honesty task** — a goal the tools cannot satisfy; the agent must conclude honestly rather than fabricate.

**OUTPUT**
```
tests/test_agent.py .....                                 [100%]
5 passed in 0.44s
```

**MENTAL TRACE.** All five run against scripted tools in under half a second, deterministically, on every commit. None of them touches a real API. That last test — termination honesty — is the one that matters most at Meridian, and it is impossible to test reliably against a live model without mocks.

`[RECEIPT]` **The hand-built ReAct agent with the five mock tasks green.** Small, complete, and it demonstrates you understand what frameworks abstract. When an interviewer asks how tool calling works, you can answer from having built the parser.

---
