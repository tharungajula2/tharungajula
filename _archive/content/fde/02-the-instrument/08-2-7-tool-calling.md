---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "02"
volumeSlug: "the-instrument"
volumeTitle: "THE INSTRUMENT"
order: 8
title: "Tool calling"
slug: "2-7-tool-calling"
sectionNumber: "2.7"
part: null
kind: "narrative"
sourceFile: "FDE_02_THE_INSTRUMENT.md"
tags: []
hasSayThis: false
wordCount: 963
status: "raw"
section: "§2.7"
summary: ""
enriched: false
---

## § 2.7 — Tool calling

A brilliant advisor sits in a sealed room: no internet, no calculator, no calendar, only what they memorised. Now slide a phone under the door and a menu: *"You may ask me to run these functions; I'll return results."* The advisor can now say, in a formal note: **CALL get_balance(account="4417")** — you run it, pass back the result, and they answer with live truth.

The advisor never gained abilities. They gained a *protocol for requesting yours*.

### The mechanic, precisely — burn this in

**The model never executes anything. Ever.**

1. You send messages plus a list of **tool definitions** — each a name, a description, and a JSON Schema of parameters. (Pydantic again. Your structured-output skills *are* your tool-calling skills.)
2. The model decides an answer needs a tool and, instead of prose, returns a **structured tool-call request**. This is structured output with a purpose — and it's why response content was always a list of blocks.
3. **Your code** looks up the real function, validates the arguments, executes it, and appends the **result** to the conversation as a tool-result message.
4. The model reads the result and either answers in prose, or requests another tool. Repeat.

That request → execute → feed-back cycle, looped, is **the agent loop**. Model + tools + loop + goal = agent. Document 04 is this section, industrialised.

```python
tools = [{
    "name": "count_late_payments",
    "description": (
        "Counts late payments in a credit report by severity bucket. "
        "Use this whenever a count of late payments is needed — never count them yourself. "
        "Requires the applicant_id exactly as it appears in the file header."
    ),
    "input_schema": {
        "type": "object",
        "properties": {
            "applicant_id": {"type": "string", "description": "e.g. 'A-4417'"},
        },
        "required": ["applicant_id"],
    },
}]

resp = client.messages.create(
    model="claude-sonnet-4-5", max_tokens=500, tools=tools,
    messages=[{"role": "user", "content": "How many 60-day lates does applicant A-4417 have?"}],
)

for block in resp.content:
    print(block.type, "->", block.input if block.type == "tool_use" else block.text[:60])
print("stop_reason:", resp.stop_reason)
```

**OUTPUT**
```
tool_use -> {'applicant_id': 'A-4417'}
stop_reason: tool_use
```

**MENTAL TRACE.** You sent one tool definition and a question. The model read the description, judged it relevant, and instead of answering returned a content block of type `tool_use` carrying the arguments it wants you to run with.

`stop_reason` is `tool_use` rather than `end_turn` — that's your code's signal to stop, execute, and come back. **This is the field your loop branches on.**

Nothing has been executed. The model made a request. Now you honour it:

```python
def count_late_payments(applicant_id: str) -> dict:
    return {"30_day": 2, "60_day": 1, "90_day": 0}     # real version queries the bureau file

tool_block = [b for b in resp.content if b.type == "tool_use"][0]
result = count_late_payments(**tool_block.input)

followup = client.messages.create(
    model="claude-sonnet-4-5", max_tokens=500, tools=tools,
    messages=[
        {"role": "user", "content": "How many 60-day lates does applicant A-4417 have?"},
        {"role": "assistant", "content": resp.content},
        {"role": "user", "content": [{
            "type": "tool_result",
            "tool_use_id": tool_block.id,
            "content": str(result),
        }]},
    ],
)
print(followup.content[0].text)
```

**OUTPUT**
```
Applicant A-4417 has 1 sixty-day late payment. The file also shows 2 thirty-day lates and no ninety-day lates.
```

**MENTAL TRACE.** The comprehension finds the `tool_use` block. `**tool_block.input` unpacks the dict `{'applicant_id': 'A-4417'}` into the function's named parameters — so it calls `count_late_payments(applicant_id='A-4417')`.

Then you rebuild the whole conversation: the original question, the assistant's turn (*including its tool request*), and a new message carrying the `tool_result`, linked back by `tool_use_id` so the model knows which request this answers.

Second call. Now the model has the numbers in context, so it answers in prose. **[VERIFY]** the exact shape of tool-result messages per provider — this is one of the most dialect-divergent parts of any API.

Notice what just happened, and connect it to § 1.4: the model did not count anything. It asked for a count. **This is the architectural answer to the tokenizer's blindness to characters** — anything that must be counted, counted in code.

### Descriptions are the real programming language

The model chooses tools *by reading their descriptions*. Nothing else. "Gets data" invites misuse. The description above says what it does, when to use it, when *not* to (never count yourself), and what the argument must look like.

Bad descriptions are the number one cause of tool misuse: the wrong tool chosen, tools called when none was needed, needed tools ignored. Parameter descriptions matter equally — the model reads them to fill arguments.

### Decisions the engineer owns around the loop

**Tool choice modes** — auto (model decides, the default), forced ("you must call X", which turns a model into a reliable extraction engine), none (prose only).

**Parallel calls** — models can request several tools at once, and `asyncio.gather` is exactly how you execute them concurrently. Document 01's async section, earning its keep.

**Error feeding** — when a tool fails, don't crash. Feed the error message back as the result and let the model adapt. It's the repair loop of § 2.6 again.

**Safety** — the model requests, *you* decide. Dangerous tools get a human gate between request and execution.

**THE DEPLOYMENT LENS.** At Meridian, tools are where security gets real, and the principle is not "be careful." It's **capability design**.

Every tool you give the system is a permission you've granted. A tool that can read the bureau file is fine. A tool that can *write* to the loan origination system is a different object entirely, and it should not exist in the pilot — not because you'd misuse it, but because § 2.12 is about to explain that the model can be talked into using it by a document an applicant submitted.

The rule you carry into every deployment: **an agent that cannot do a thing cannot be tricked into doing it.** Read-only tools first. Write access is a separate conversation with Rina, later, with a gate in front of it.

---
