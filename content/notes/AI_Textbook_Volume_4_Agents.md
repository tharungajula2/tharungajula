---
title: "NOTE 004: THE AI ENGINEERING TEXTBOOK — VOLUME 4"
subtitle: "Tools, Agents and Orchestration: When the Model Must Act"
date: "2026-08-09"
order: 4
tags: ["AI Engineering", "Agents", "Tools", "Orchestration", "Workflows"]
---

# THE AI ENGINEERING TEXTBOOK
## Volume 4 — Tools, Agents and Orchestration: When the Model Must Act

---

## BEFORE YOU START

This volume assumes Volumes 1–3. Specifically:

- **V1 §7.1** — sampling, structured output, and constrained decoding
- **V2 §7** — prompt caching and prefix stability, which will constrain your tool design in a way that surprises people
- **V2 §8.5** — the `RunBudget` object: three caps enforced in run state
- **V3 §7.3** — abstention, and why an empty result is a correct answer

Layer markers as before: **[CORE]**, **[WORKING]**, **[DEEPER]**, **[RETURN HERE]**.

### The framing for this volume

Volumes 1–3 built a system that **answers**. This volume covers a system that **acts** — one that queries a warehouse, calls a scoring service, writes a record, sends a message.

That shift changes the risk profile completely. A wrong answer is a wrong answer. A wrong *action* is an operational incident: a duplicate disbursement, a message to a customer, a deleted record, a limit changed without authority.

So the governing principle of this volume, stated once and referenced throughout:

> **Autonomy is a cost, not a feature.** You pay for it in latency, tokens, non-determinism, debugging difficulty, and blast radius. Buy the least autonomy that solves the problem.

Most systems shipped as "agents" between 2024 and 2026 should have been fixed workflows. They were slower, more expensive, less reliable, and harder to debug than a switch statement would have been. The field over-corrected into agents; this volume corrects back.

---

# PART 1 — TOOL CALLING

## 1.1 — The Mechanism **[CORE]**

**What this section gives you.** A precise picture of what happens when a model "uses a tool", and the location of the entire security model.

### The single most important fact

**The model does not execute anything.**

It emits a structured request naming a function and its arguments. Your code receives that request and decides whether to run it. That decision point is where authorisation, validation, rate limiting, and audit live.

If you take one thing from this part: **the boundary between "the model wants to do X" and "X happened" is your code, and it is the only thing standing between an agent and your production systems.**

### The loop

```
1. You send:  messages  +  a list of tool schemas
                            (name, description, parameter definitions)

2. The model responds with ONE of:
     (a) text                              → conversation continues normally
     (b) a tool_use block:                 → it wants a tool run
         { "name": "get_counterparty_exposure",
           "input": { "counterparty_id": "CP-4417" },
           "id": "toolu_01A..." }

3. ★ YOUR CODE: validate the arguments · check authorisation ·
     apply rate limits · execute · log
                                            ← THE CONTROL POINT

4. You append a tool_result block carrying the same id:
         { "type": "tool_result",
           "tool_use_id": "toolu_01A...",
           "content": "Total exposure ₹142.7 crore across 3 facilities..." }

5. Send the whole conversation back. Return to step 2.
```

The `id` matching in steps 2 and 4 is how the model knows which result belongs to which request, since it can issue several in one turn.

### What the model actually sees

A tool schema is text that goes into the prompt. There is no special channel.

```json
{
  "name": "get_counterparty_exposure",
  "description": "Retrieve total current outstanding exposure to a counterparty across all facilities, including undrawn committed limits. Use when the user asks about total exposure, aggregate outstanding, limit utilisation, or headroom. Do NOT use for a single facility balance — use get_facility_balance for that. Returns amounts in INR as of the last end-of-day position.",
  "input_schema": {
    "type": "object",
    "properties": {
      "counterparty_id": {
        "type": "string",
        "description": "Internal counterparty ID, format CP-NNNN. Not a PAN, not a CIN, not a name. To resolve a name to an ID, call lookup_counterparty first."
      },
      "include_undrawn": {
        "type": "boolean",
        "default": true,
        "description": "Include undrawn committed limits in the total."
      },
      "as_of_date": {
        "type": "string",
        "format": "date",
        "description": "ISO date. Defaults to the last end-of-day if omitted."
      }
    },
    "required": ["counterparty_id"],
    "additionalProperties": false
  }
}
```

**Read that description again.** It states when to use the tool, when *not* to, what it returns, what the ID format is, and what to do if the caller has the wrong kind of identifier.

That is the difference between roughly 70% and roughly 97% tool-selection accuracy, and it is achieved by writing rather than by tuning.

---

## 1.2 — Tool Design **[CORE]**

**What this section gives you.** The most under-taught topic in this field. Bad tools cause more agent failures than weak models do.

### Principle 1 — Design tools for the model, not as a mirror of your API

Your internal REST API has forty endpoints because it was designed for programmers building screens. An agent should see six tools that map to **tasks**.

```
❌  40 tools:  GET /counterparty/{id}
               GET /counterparty/{id}/facilities
               GET /facility/{id}
               GET /facility/{id}/drawdowns
               GET /facility/{id}/covenants
               ...
    The model must chain five calls and hold intermediate results in
    context to answer one question.

✅  1 tool:    get_counterparty_exposure(counterparty_id)
               → composes all five server-side, returns one summary
```

Compose on the server. Every extra round trip costs a full model call, adds latency, consumes context, and creates another opportunity for the model to go wrong.

### Principle 2 — Return tokens the model can use, not raw payloads

```
❌  4,000 tokens of nested JSON, sixty null fields, internal system
    codes, and audit metadata the model cannot interpret

✅  "Counterparty CP-4417 (Meridian Industries Ltd)
     Total exposure: ₹142.7 crore across 3 facilities
       - Term loan TL-9902: ₹88.0 cr outstanding, ₹100.0 cr sanctioned
       - Working capital WC-4471: ₹41.2 cr drawn, ₹60.0 cr limit
       - LC facility LC-2210: ₹13.5 cr outstanding
     Undrawn committed: ₹30.3 crore
     Internal rating: BBB (reviewed 2026-03-14)
     As of: 2026-08-08 EOD"
```

**Every token of tool output competes with your retrieved evidence for context.** Summarise at the tool boundary. If the model needs detail, give it a second tool that fetches it.

### Principle 3 — Error messages are prompts

The model reads your error and decides what to do next. Write errors as instructions.

```
❌  "Error 400: Bad Request"
    The model has no idea what to change. It will retry identically,
    or give up, or invent a different malformed call.

✅  "Invalid counterparty_id 'AAACM1234F'. That looks like a PAN.
     This tool requires an internal counterparty ID in the format
     CP-NNNN. Call lookup_counterparty(pan='AAACM1234F') first to
     resolve it, then retry."
```

The second message converts a dead end into a successful next step. This single change routinely cuts agent failure rates by more than half, and it costs an afternoon.

### Principle 4 — Two-phase commit for anything destructive

**Never give an agent a one-shot tool that changes state irreversibly.**

```python
# Phase 1 — PROPOSE. Read-only. Returns a preview and a token.
propose_limit_change(counterparty_id="CP-4417", new_limit_inr=1_800_000_000)
→ """PROPOSED CHANGE — NOT EXECUTED
     Counterparty:  CP-4417 (Meridian Industries Ltd)
     Field:         sanctioned_limit_inr
     Current:       ₹160,00,00,000
     Proposed:      ₹180,00,00,000
     Delta:         +₹20,00,00,000 (+12.5%)
     Authority:     Requires Credit Committee (changes above ₹10 cr)
     Reversible:    Yes, audited, within 24 hours
     Token:         chg_01HXYZ...  (expires in 15 minutes)"""

# Phase 2 — COMMIT. Requires the token AND an explicit human approval flag.
commit_limit_change(token="chg_01HXYZ...", approved_by="user_8841")
```

The token binds the approval to a specific, reviewed change. The model cannot fabricate one, and it cannot commit a different change than the one that was previewed.

### Principle 5 — Idempotency keys on every mutating tool

Agents retry. Networks time out. **A retry must not produce a second disbursement, a second journal entry, or a second message to a customer.**

```python
def create_exception_case(application_id: str, reason: str, *,
                          idempotency_key: str, ctx) -> str:
    """The idempotency key is derived from the run, not generated fresh
    on each attempt. If this exact call already succeeded, return the
    original result instead of creating a duplicate."""
    existing = case_store.get_by_idempotency_key(idempotency_key)
    if existing:
        return f"Case {existing.id} already exists for this request."
    ...
```

### Principle 6 — Keep the tool set small and stable

Above roughly fifteen to twenty tools, selection accuracy degrades measurably. The model has more opportunities to choose wrongly, and the descriptions consume context that competes with your evidence.

**And a trap that catches many teams:** dynamically selecting which tools to include per turn — sending three relevant tools instead of twelve — looks like an optimisation and is usually a net loss.

> Tool schemas sit near the top of the prompt, in the stable prefix (V2 §7.1). **Varying them destroys cache locality for everything after them.** A stable twelve-tool block at a 95% cache hit rate is cheaper than a variable three-tool block that never caches.

Fixed set, fixed order. If you genuinely need more than twenty tools, use sub-agents with scoped tool sets (§6.3) rather than dynamic selection.

### Principle 7 — Every tool is an authorisation boundary

```python
@tool(name="get_counterparty_exposure",
      scopes=["credit:read"],
      rate_limit="60/min")
def get_counterparty_exposure(counterparty_id: str,
                              include_undrawn: bool = True,
                              *, ctx: AgentContext) -> str:

    # AUTHORISATION — from the caller's token, never from the prompt.
    # The model asking nicely is not authorisation. (V3 §4.5 made the
    # same point for retrieval; it applies identically here.)
    if not ctx.principal.can_read_counterparty(counterparty_id):
        return ("Access denied: your role does not permit reading this "
                "counterparty. Ask the user to raise an access request. "
                "Do not retry this call.")

    data = credit_api.exposure(counterparty_id,
                               include_undrawn=include_undrawn,
                               actor=ctx.principal.id)      # acts AS the user

    audit.log(trace_id=ctx.trace_id,
              tool="get_counterparty_exposure",
              subject=counterparty_id,
              principal=ctx.principal.id,
              outcome="success")

    return summarise_exposure(data)     # tokens the model can use
```

Note `actor=ctx.principal.id`. The tool acts **on behalf of the user**, not as a shared service account. A shared service account with broad permissions turns every tool into a privilege escalation path — a pattern the security literature calls a confused deputy, and Volume 5 develops it.

---

## 1.3 — The Tool Loop, Coded **[WORKING]**

```python
def run_with_tools(messages: list[dict], tools: list[dict],
                   ctx: AgentContext, budget: RunBudget) -> str:
    """The complete tool-calling loop. Note that every safety control
    lives in THIS function, not in the prompt."""

    while True:
        # ── BUDGET CHECK BEFORE EVERY CALL (V2 §8.5) ──────────────
        if reason := budget.check():
            return escalate_to_human(reason, messages, ctx)

        response = gateway.complete(
            messages=messages,
            tools=tools,                 # fixed set, fixed order — cache
            tenant=ctx.tenant,
            data_class=ctx.data_class,
            trace_id=ctx.trace_id,
        )
        budget.record(response.cost_usd)

        # ── The model produced a final answer ─────────────────────
        if not response.tool_calls:
            return response.text

        messages.append(response.as_message())

        # ── The model wants tools run ─────────────────────────────
        for call in response.tool_calls:
            result = execute_tool_call(call, ctx)
            messages.append({
                "type": "tool_result",
                "tool_use_id": call.id,
                "content": result,
            })


def execute_tool_call(call, ctx: AgentContext) -> str:
    """Every guard lives here. Each returns a MESSAGE, not an exception,
    because the model reads it and can correct course (Principle 3)."""

    tool = TOOL_REGISTRY.get(call.name)
    if tool is None:
        return (f"No tool named '{call.name}' exists. Available tools: "
                f"{', '.join(sorted(TOOL_REGISTRY))}.")

    # 1. Schema validation — never trust model-generated arguments
    try:
        args = tool.schema.model_validate(call.input)
    except ValidationError as e:
        return f"Invalid arguments for {call.name}:\n{e}\nCorrect and retry."

    # 2. Authorisation, from the caller's identity
    if not ctx.principal.has_scopes(tool.scopes):
        return (f"Access denied: {call.name} requires {tool.scopes}. "
                f"Do not retry.")

    # 3. Rate limiting, per principal and per tool
    if not rate_limiter.allow(ctx.principal.id, call.name):
        return f"Rate limit reached for {call.name}. Try again shortly."

    # 4. Human gate for anything in the gated set (§7)
    if tool.requires_approval:
        return request_human_approval(call, ctx)     # pauses the run

    # 5. Execute with a hard timeout
    try:
        with timeout(tool.timeout_s):
            output = tool.fn(**args.model_dump(), ctx=ctx)
    except TimeoutError:
        return (f"{call.name} timed out after {tool.timeout_s}s. "
                f"The system may be slow. Consider proceeding without "
                f"this information, or escalating.")
    except Exception as e:
        log.exception("tool_failed", tool=call.name, trace_id=ctx.trace_id)
        return f"{call.name} failed: {sanitise_error(e)}. Do not retry immediately."

    # 6. Cap the output so one tool cannot flood the context
    return truncate_to_tokens(output, max_tokens=tool.max_output_tokens)
```

**Six guards, all in code, none in the prompt.** A prompt instruction saying "only call tools you are authorised for" is advice. This is enforcement.

### Check yourself

> **Q. Why do the guards return strings rather than raise exceptions?**
> Because the string goes back to the model, which can then correct itself — resolve a PAN to a counterparty ID, choose a different tool, or report the blockage to the user. An exception ends the run and loses the opportunity. Errors are prompts (Principle 3).

---

# PART 2 — MODEL CONTEXT PROTOCOL

## 2.1 — What Problem It Solves **[WORKING]**

**What this section gives you.** The standard that connects models to tools, and why it became universal.

### The arithmetic

Every AI application needs to connect to tools. Every tool needs to be reachable from applications. Without a standard, that is a multiplication.

```
WITHOUT A STANDARD
    5 AI applications × 20 tool systems = 100 bespoke integrations
    Each written twice — once per side — and maintained forever.

WITH MCP
    5 MCP clients + 20 MCP servers = 25 components
    Any client works with any server.
```

**Model Context Protocol** is an open standard, now under the Linux Foundation's AI infrastructure foundation, defining how an AI application discovers and calls external capabilities.

The practical consequence that matters most: **tools written as MCP servers are portable across agent frameworks.** You can move from one orchestration library to another without rewriting your integrations, which materially reduces the cost of a framework decision (§8).

### The three primitives

MCP separates capabilities by **who decides to use them** — a distinction that turns out to be exactly right.

| Primitive | Who decides | Analogue | Example |
| :--- | :--- | :--- | :--- |
| **Tools** | **The model** | A POST endpoint | `compute_risk_grade`, `query_exposure_warehouse` |
| **Resources** | **The application** | A GET endpoint or a file | `policy://credit/v4.2`, `schema://warehouse` |
| **Prompts** | **The user** | A slash command | `/draft-credit-memo`, `/explain-decline-reasons` |

Resources are worth noting because they are underused. A resource is context the application chooses to load — the current credit policy version, a data dictionary, a rate card — without the model having to decide to fetch it. This keeps stable content in the stable prefix, which is what prompt caching needs (V2 §7).

---

## 2.2 — The Stateless Revision **[WORKING]**

**What this section gives you.** Current knowledge of a specification that changed substantially in July 2026. Much of what is written about MCP online predates this and is now wrong.

### What changed

The **2026-07-28** revision — released 28 July 2026 — is the largest change since the protocol launched. Its central move: **MCP became stateless.**

| Before | After |
| :--- | :--- |
| An `initialize` / `initialized` handshake opened a session | **No handshake.** Every request is self-describing, carrying protocol version, client info and capabilities in a `_meta` field |
| An `Mcp-Session-Id` header bound a client to a server instance | **No session header.** Any request can land on any instance |
| Server-initiated requests needed a held-open stream | **Multi Round-Trip Requests (MRTR).** The server returns `resultType: "input_required"` stating what it needs; the client retries the original call with `inputResponses` attached |
| Routing required parsing the JSON body | **`Mcp-Method` and `Mcp-Name` headers are required** on Streamable HTTP, so gateways, rate limiters and firewalls route on headers alone |
| List results were re-fetched on reconnect | **Cacheable lists.** `tools/list`, `prompts/list`, `resources/list` carry `ttlMs` and `cacheScope`, with deterministic ordering |
| Dynamic Client Registration | **Deprecated in favour of Client ID Metadata Documents.** Also: `iss` validation per RFC 9207 before code redemption; client credentials bound to their issuing authorization server |
| Long-running work held a connection | **Tasks extension** with poll-based `tasks/get` and `tasks/update`; change notifications move to an opt-in `subscriptions/listen` stream |

**Deprecated, with a minimum twelve-month support window:** Roots, Sampling, Logging, and the legacy HTTP+SSE transport.

### Why statelessness matters operationally

This is the part worth understanding, because it changes what you can deploy.

```
STATEFUL (before)
    Client must reach the SAME server instance for the whole session.
    → sticky sessions, or shared session storage
    → scaling requires session migration
    → a restarted pod drops every active conversation

STATELESS (now)
    Any request lands on any instance.
    → plain round-robin load balancing
    → no shared state store
    → autoscaling and rolling deploys are unremarkable
    → tool catalogues cache, so upstream PROMPT caches stay stable
      across reconnects (V2 §7)
```

**MCP became an ordinary HTTP workload.** For an enterprise deployment behind a standard gateway, that is the difference between a protocol you work around and one you simply deploy.

### Keeping state without sessions

Dropping the protocol-level session does not force your application to be stateless. The recommended pattern is better than what it replaced:

> **Mint an explicit handle from a tool and have the model pass it back as an ordinary argument.**

```python
# The tool returns a handle. The model sees it and threads it forward.
start_exposure_analysis(counterparty_id="CP-4417")
→ "Analysis started. Handle: exa_01HXYZ. Use this handle with
   get_analysis_result and refine_analysis."

get_analysis_result(handle="exa_01HXYZ")
```

This works better than transport-hidden session state precisely **because the model can see the handle**. Hidden state produces failures where the model has no idea why a call behaved differently; a visible handle is something it can reason about, report, and correct.

---

## 2.3 — Building a Server **[WORKING]**

```python
# pip install "mcp[cli]"
from mcp.server.fastmcp import FastMCP
from pydantic import Field
from typing import Annotated, Literal

mcp = FastMCP("credit-risk-tools")


@mcp.tool()
def compute_risk_grade(
    counterparty_id: Annotated[str, Field(
        pattern=r"^CP-\d{4}$",
        description="Internal counterparty ID, format CP-NNNN.")],
    facility_type: Annotated[Literal["term_loan", "working_capital", "lc", "guarantee"],
        Field(description="Facility type. Affects the applicable model.")],
    amount_inr: Annotated[float, Field(gt=0, le=1e11,
        description="Proposed facility amount in rupees, not lakhs or crores.")],
    tenor_months: Annotated[int, Field(ge=3, le=240)],
) -> str:
    """Score a proposed facility using the production credit risk model.

    Returns probability of default, internal rating grade, and the
    principal risk drivers. Use for any 'what is the risk' or 'what
    grade would this get' question on a NEW proposal.

    Do NOT use for existing facilities — use get_current_grade instead.
    Do NOT use this output as an approval decision; it is an input to
    the credit process, not a substitute for it.
    """
    result = risk_model.score(
        counterparty_id=counterparty_id,
        facility_type=facility_type,
        amount=amount_inr,
        tenor=tenor_months,
    )
    return (
        f"PD (12-month): {result.pd:.2%}  |  Internal grade: {result.grade}\n"
        f"Model: {result.model_id} v{result.model_version}\n"
        f"Principal drivers: {', '.join(result.top_drivers[:4])}\n"
        f"Scored at: {result.scored_at.isoformat()}\n"
        f"NOTE: This is a model output, not a credit decision."
    )


@mcp.resource("policy://credit/{section}")
def credit_policy(section: str) -> str:
    """Current internal credit policy, by section number."""
    return policy_store.get_current(section)


@mcp.prompt()
def draft_exception_note(application_id: str) -> str:
    """Template for drafting a credit exception note."""
    return EXCEPTION_NOTE_TEMPLATE.format(application_id=application_id)


if __name__ == "__main__":
    mcp.run()      # stdio locally
    # mcp.run(transport="streamable-http") for remote deployment
```

**Three things to notice.** The parameter constraints (`pattern`, `gt`, `le`) are enforced before your code runs. The description states what the tool is *not* for. And the return string ends by stating its own limits — a model reading "this is a model output, not a credit decision" is measurably less likely to present it as one.

### Transports

| Transport | Use | Authentication |
| :--- | :--- | :--- |
| **stdio** | Local tools launched as a subprocess by the client — desktop, IDE, CLI | Operating system level; no network exposure |
| **Streamable HTTP** | Remote, multi-tenant, cloud | OAuth 2.1 / OIDC, mTLS, Client ID Metadata Documents |
| ~~HTTP+SSE~~ | **Deprecated.** Do not build new on it. | — |

### Production checklist

```
[ ] Streamable HTTP with OAuth 2.1; validate `iss` per RFC 9207
[ ] Prefer Client ID Metadata Documents over Dynamic Client Registration
[ ] Authorise PER TOOL CALL, from the token, never from the prompt
[ ] Handle Mcp-Method / Mcp-Name so your gateway can route and rate-limit
[ ] Set ttlMs and cacheScope on list responses; keep ordering deterministic
[ ] Stateless handlers; cross-call state via explicit server-minted handles
[ ] Rate limit per client and per tool; hard timeout on every handler
[ ] Structured audit log: caller identity, tool, redacted arguments,
    result hash, latency, outcome
[ ] Return summaries, not raw payloads; cap output length
[ ] Pin the server version; hash the tool schemas and alert on drift
[ ] NEVER expose an MCP server to the internet without an authenticating
    gateway in front
```

The last three items are security controls and Volume 5 explains what they defend against. The short version: a tool description is text that enters your prompt, and a server that can change its tool descriptions can change your agent's instructions.

---

# PART 3 — HOW MUCH AUTONOMY

## 3.1 — The Spectrum **[CORE]**

**What this section gives you.** A decision you will make repeatedly, made explicit rather than by default.

```
LEVEL 0   Single call                prompt → answer                    DETERMINISTIC
LEVEL 1   Chain                      A → B → C, fixed order              DETERMINISTIC
LEVEL 2   Router                     classify → one of N fixed paths     NEAR-DETERMINISTIC
LEVEL 3   Tool-using single turn     model calls tools, then answers     BOUNDED
LEVEL 4   Workflow with loops        graph, conditional edges, capped    BOUNDED
LEVEL 5   Autonomous agent           model chooses its own plan          UNBOUNDED  ⚠
LEVEL 6   Multi-agent                agents delegating to agents         VERY UNBOUNDED  ⚠⚠
```

### The selection test

| If this is true | Use |
| :--- | ---: |
| The steps are always the same | **1** |
| There is a small, fixed set of paths, choosable from the input | **2** |
| One or two lookups, then an answer | **3** |
| Steps vary, but the *space* of possible steps is known and enumerable | **4** |
| The plan genuinely cannot be known before starting | **5** |
| Truly separable sub-problems with different tools **and** you already have distributed tracing | **6** |

**Read the Level 4 row carefully**, because it is where most real work belongs and where most teams overshoot.

> "The steps vary but the space of steps is known" describes almost every business process. A credit exception might need a bureau pull, or a financial statement check, or a covenant review, or all three, in varying order — but the *set* of possible actions is finite and was known before the system was built.
>
> That is a **graph with conditional edges**, not an autonomous agent. It is faster, cheaper, deterministic enough to test, and trivially auditable.

### What autonomy actually costs

```
LATENCY         Each step is a full model call. A 12-step agent takes
                12× the time of one call, plus tool latency.

COST            V2 §8.1: cost per task multiplies by steps per task.
                A 25-step agent on a frontier tier is 25 calls.

NON-DETERMINISM Two runs on identical input can take different paths.
                Reproducing a bug requires the stored trace.

DEBUGGING       "Why did it do that?" requires reading a 40,000-token
                trace, not a stack trace.

BLAST RADIUS    The agent's reach equals every credential and tool it
                can touch. An error compounds across a plan rather
                than affecting one response.
```

### Where agents genuinely win

Do not over-correct into never building one. The real cases:

- **The number of steps depends on what you discover.** Investigating a fraud alert: the second query depends on what the first returned.
- **The exception space is unbounded.** Handling a credit application that fell outside policy, where the reason could be any of hundreds of things.
- **Open-ended research.** "What has changed in the regulatory treatment of this product class over the last three years?"
- **Work across many artefacts.** Reviewing forty facility agreements for a specific clause pattern.

Each shares one property: **you cannot write the flowchart in advance.** That is the test.

---

## 3.2 — The Workflow Patterns **[CORE]**

Before reaching for an agent, check whether one of these fits. These are Levels 1–4, and they cover the large majority of production work.

| Pattern | Shape | Use for |
| :--- | :--- | :--- |
| **Chaining** | A → B → C | Decomposable sequential tasks. Each step is separately evaluable, which is a large advantage. |
| **Routing** | classify → {A \| B \| C} | Heterogeneous inputs needing different handling |
| **Parallel (sectioning)** | split → A ∥ B ∥ C → merge | Independent subtasks; cuts latency |
| **Parallel (voting)** | same task ×N → aggregate | High-stakes classification; the agreement rate is a usable confidence signal |
| **Orchestrator-worker** | planner → dynamic workers → synthesiser | Subtasks not known in advance, but of a known *type* |
| **Evaluator-optimiser** | generate → critique → revise (loop) | Quality-critical drafting with clear criteria |
| **Autonomous loop** | model drives until done | Genuinely open-ended |

### Worked: chaining beats an agent

```
TASK: Process an incoming credit application document.

❌ AGENT APPROACH
   "Here are eight tools. Process this application."
   → 9–14 model calls, variable path, hard to test, hard to explain
     when it goes wrong

✅ CHAIN
   1. classify_document_type(doc)        cheap model, temperature 0
   2. extract_fields(doc, schema)        cheap model, constrained output
   3. validate_extraction(fields)        DETERMINISTIC CODE, no model
   4. enrich_from_bureau(fields)         a tool call, no model
   5. check_policy_rules(enriched)       DETERMINISTIC CODE, no model
   6. IF exception → draft_note()        production model
      ELSE          → auto_approve()     no model at all

   → 2–3 model calls. Each step independently testable. Steps 3 and 5
     are ordinary code with ordinary unit tests. The path is visible
     in a diagram.
```

**Note steps 3 and 5.** Policy rules are deterministic logic. Putting them in a model makes them slower, more expensive, non-deterministic, and unexplainable — while making them *worse*, because a model applying a rule is less reliable than an `if` statement applying the same rule.

> **The general principle: anything that can be a rule should be a rule.** Use the model for the parts that genuinely require language understanding — reading an unstructured document, drafting prose, interpreting an ambiguous instruction. Everything else is code.

### Check yourself

> **Q. Your team proposes an agent to handle daily regulatory circular monitoring: check the regulator's site, identify new circulars, summarise them, and route to the right team. Agent or workflow?**
> Workflow, Level 1–2. The steps are always the same: fetch, diff against what you have, extract metadata, summarise, route by topic. Nothing about the sequence depends on what is discovered. A chain with a routing step is faster, cheaper, and testable — and it will not one day decide to do something unexpected.

---

# PART 4 — THE AGENT LOOP

## 4.1 — The Core Loop **[CORE]**

**What this section gives you.** The complete structure of an agent, with every control in its correct place.

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                   │
│   while True:                                                     │
│                                                                   │
│       ① CHECK BUDGET       steps · spend · wall-clock              │
│          └─ exhausted? → ESCALATE. Never fail silently.           │
│                                                                   │
│       ② ASSEMBLE CONTEXT   compact history · prune old results    │
│                                                                   │
│       ③ CALL THE MODEL     with the fixed tool set                │
│                                                                   │
│       ④ IF text → check completion criteria IN CODE               │
│                   └─ satisfied? RETURN                            │
│                   └─ not satisfied? push back and continue        │
│                                                                   │
│       ⑤ IF tool calls → for each:                                 │
│              validate · authorise · rate-limit ·                  │
│              gate if destructive · execute · truncate             │
│                                                                   │
│       ⑥ RECORD           trace every step, cost, decision          │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### ReAct

The prompting pattern underneath most agents is **ReAct** — Reasoning and Acting interleaved.

```
Thought:     I need the counterparty's current exposure before I can
             assess headroom for the proposed facility.
Action:      get_counterparty_exposure(counterparty_id="CP-4417")
Observation: Total exposure ₹142.7 crore across 3 facilities...
Thought:     Now I need the applicable single-counterparty limit. That
             depends on the counterparty class, which is NBFC here.
Action:      search_policy(query="single counterparty exposure limit NBFC")
Observation: [three retrieved passages]
Thought:     The limit is 15% of Tier-1 capital. I need our Tier-1 figure.
Action:      get_capital_position(as_of="2026-06-30")
...
```

Modern models with extended thinking (V1 §7.1) do the "Thought" step internally, so you rarely write ReAct prompts explicitly any more. But the pattern is what the loop *is*, and naming it helps when reading traces.

### Step ④ deserves attention

**Do not let the model decide it is finished.** Check completion in code.

```python
def is_complete(state: AgentState) -> tuple[bool, str]:
    """Completion criteria checked deterministically. A model saying
    'I have completed the analysis' is a claim, not a fact."""
    d = state.decision
    if d is None:
        return False, "No structured decision produced yet."
    if not d.recommendation:
        return False, "Recommendation field is empty."
    if not d.evidence_citations:
        return False, "No evidence cited. Every recommendation must cite policy."
    if d.requires_exposure_check and state.exposure_data is None:
        return False, "Exposure check required but get_counterparty_exposure was never called."
    return True, ""

# If not complete, the reason string goes BACK to the model as a message.
# Errors are prompts (§1.2, Principle 3) — this is the same idea applied
# to completion.
```

**Partial completion — the agent announcing success without doing the work — is one of the most common agent failures**, and it is entirely preventable by checking in code rather than trusting the announcement.

---

## 4.2 — Termination **[CORE]**

**What this section gives you.** The controls that prevent the specific incidents that have embarrassed a large number of teams.

### The three caps, revisited

V2 §8.5 introduced `RunBudget`. Restating why there are three and not one:

```
STEP CAP        catches: loops that are cheap but infinite
                         (a tool returning instantly, called forever)

SPEND CAP       catches: short runs that are extremely expensive
                         (three calls with 400,000 tokens each)

WALL-CLOCK CAP  catches: runs stuck waiting on a slow or hanging tool
                         (neither steps nor spend accumulate, but the
                          user has been waiting eleven minutes)
```

Any one alone leaves a gap. All three are cheap.

### Loop detection

A step cap stops a loop eventually. Detecting it earlier is better, because the twelve wasted calls also wasted twelve calls' worth of money and latency.

```python
def detect_loop(state: AgentState, window: int = 4) -> str | None:
    """Catch repetition before the step cap does."""
    recent = state.tool_calls[-window:]
    if len(recent) < window:
        return None

    # Identical call repeated — the agent is stuck
    signatures = [(c.name, json.dumps(c.input, sort_keys=True)) for c in recent]
    if len(set(signatures)) == 1:
        return f"Called {recent[0].name} with identical arguments {window} times."

    # Alternating between two calls without progress
    if len(set(signatures)) == 2 and signatures[0] == signatures[2]:
        return "Alternating between two tool calls without progress."

    return None

# On detection, inject a message rather than terminating outright:
#   "You have called get_counterparty_exposure with the same arguments
#    four times and received the same result. That approach is not
#    working. Either proceed with the information you have, or state
#    what is blocking you and stop."
#
# This recovers a surprising share of stuck runs. If the next two steps
# repeat again, THEN terminate.
```

### The escalation path

**An agent that cannot finish must hand off, not fail.**

```python
def escalate_to_human(reason: str, state: AgentState, ctx) -> str:
    """Every termination path that is not success comes here.
    A silent failure is worse than a loud one, because nobody
    investigates what they cannot see."""

    ticket = review_queue.create(
        application_id = state.application_id,
        reason         = reason,
        partial_work   = state.decision,        # whatever was completed
        trace_id       = ctx.trace_id,          # the full replayable trace
        steps_taken    = state.steps,
        cost_usd       = state.spend_usd,
        assigned_queue = route_by_reason(reason),
    )

    metrics.increment("agent.escalation", tags={"reason": reason,
                                                "use_case": ctx.use_case})

    return (f"I was unable to complete this analysis: {reason}. "
            f"I have raised it for human review as case {ticket.id}, "
            f"with the work completed so far attached.")
```

**Escalation rate is a first-class metric**, exactly as it was for the cascade in V2 §8.3. A move from 8% to 19% over a week means something changed — a tool degraded, a corpus shifted, or the input mix moved. It tells you before your users do.

---

# PART 5 — STATE, MEMORY AND CONTEXT

## 5.1 — Four Kinds of Memory **[CORE]**

Most teams implement the first and wonder why the agent feels amnesiac.

| Type | Horizon | Contents | Where it lives |
| :--- | :--- | :--- | :--- |
| **Working** | The current run | Messages, tool results, scratchpad | The context window |
| **Episodic** | Across sessions | "This counterparty was reviewed in March; the covenant waiver was declined" | Database, retrieved when relevant |
| **Semantic** | Permanent | Entities, relationships, learned facts about the domain | Vector store or graph (V3) |
| **Procedural** | Permanent | House style, learned corrections, workflow conventions | Prompts, examples, fine-tuned adapters (V1 §9.3) |

### Memory is an attack surface

Before building memory, understand what you are building.

> Anything written to persistent memory will be read back into a future context, in a different session, possibly for a different user, possibly weeks later. A wrong or malicious entry activates then, with no visible connection to how it got there.

The controls:

```
[ ] VALIDATE BEFORE WRITING. Never persist raw model output as memory.
    Extract structured facts, validate them against a schema, and check
    them against the source that produced them.
[ ] EPHEMERAL BY DEFAULT. A fact earns persistence; it does not get it
    automatically.
[ ] SCOPE per user and per task. Memory from one analyst's session must
    not surface in another's unless that is explicitly intended.
[ ] INSPECTABLE AND FLUSHABLE. An operator must be able to see what an
    agent believes and delete it.
[ ] RECORD PROVENANCE. Every memory entry stores when it was written,
    by which run, from which source.
```

Volume 5 covers the attack in detail. The defence is above, and it is cheap if built in from the start and expensive to retrofit.

---

## 5.2 — Checkpointing **[CORE]**

**What this section gives you.** Four capabilities that are unobtainable any other way, one of which is a compliance requirement.

A **checkpointer** persists the complete agent state after every step, keyed by a thread identifier.

```python
from langgraph.checkpoint.postgres import PostgresSaver

checkpointer = PostgresSaver.from_conn_string(PG_URL)
graph = builder.compile(checkpointer=checkpointer)

config = {"configurable": {"thread_id": f"exception-{application_id}"}}
result = graph.invoke({"application_id": application_id}, config)
```

### What it buys

**1. Crash resilience.** The process dies at step 9 of 14. Resume from step 9, not step 1. Without this, a deployment during a long-running task loses every in-flight run.

**2. Indefinite pauses for human approval.** The agent reaches a gate and stops. The underwriter is at lunch. Three hours later they approve, and the run resumes from exactly where it paused — in a different process, on a different machine. Without checkpointing, human-in-the-loop means holding a connection open, which does not survive contact with reality.

**3. Time-travel debugging.** Load the state from step 4, change one input, and branch a new execution. **This is your primary debugging tool for agents**, because you cannot reproduce a non-deterministic multi-step failure by re-running from the start.

```python
# Walk backwards through the run
for snapshot in graph.get_state_history(config):
    print(snapshot.next, snapshot.values.keys(), snapshot.config)

# Resume from a specific past point with modified state
past = list(graph.get_state_history(config))[3]
graph.update_state(past.config, {"retrieved_evidence": corrected_evidence})
graph.invoke(None, past.config)      # branch a new run from there
```

**4. The audit trail.** A complete, replayable record of every input, every model output, every tool call and every decision, with timestamps.

> In a regulated institution this is not a debugging nicety. **It is the evidence pack.** When a supervisor or an internal auditor asks "why was this exception recommended for approval on 14 August", the answer is a replayable trace showing the retrieved policy, the tool results, the model's reasoning, and the human who approved it.
>
> Build this from day one. Retrofitting an audit trail onto an agent that has been running for six months means you have six months of decisions you cannot explain.

---

## 5.3 — Context Management **[CORE]**

**What this section gives you.** The three techniques that separate an agent that works for five steps from one that works for forty.

### Why long runs degrade

An agent accumulates context: every tool result, every intermediate output, every step of history. By step 20 the context may hold 60,000 tokens, most of it stale.

Four specific failure modes result. Learn the names — they let you diagnose precisely rather than saying "it got confused."

| Failure | What happens | Symptom | Fix |
| :--- | :--- | :--- | :--- |
| **Context poisoning** | A wrong fact enters the context and is treated as established for the rest of the run | The agent confidently builds on something false; the error compounds | Validate tool results; quarantine untrusted content; re-ground periodically |
| **Context distraction** | So much history accumulates that the model over-attends to it rather than the current step | Repeats earlier actions; ignores new instructions | Compaction; clear stale tool results; hard history cap |
| **Context confusion** | Irrelevant material — unused tools, unrelated results — degrades decisions | Wrong tool selected; irrelevant reasoning | Fewer tools; prune old results; sub-agent isolation |
| **Context clash** | Two parts of the context contradict each other | Inconsistent or oscillating answers | Deduplicate; timestamp and prefer recency; state the conflict explicitly |

Plus the positional effect from V3 §8.2 — attention is U-shaped over long contexts, so material in the middle of a 60,000-token history is attended to least.

### Technique 1 — Compaction

When history approaches a threshold, summarise the older portion into a structured digest and replace it.

```python
COMPACTION_PROMPT = """Compress this agent session into a structured
state summary.

PRESERVE EXACTLY:
  - decisions made and the reasoning for each
  - facts established, WITH their source (tool name or citation)
  - open questions and what is still needed
  - constraints stated by the user
  - all identifiers, amounts, dates and reference numbers

DISCARD:
  - tool call mechanics and raw payloads whose conclusions are captured
  - superseded intermediate reasoning
  - anything already reflected in a later decision

Output under 800 tokens as structured markdown."""


def maybe_compact(state: AgentState, threshold: float = 0.65,
                  budget_tokens: int = 120_000) -> AgentState:
    used = count_tokens(state.messages)
    if used < threshold * budget_tokens:
        return state

    keep = state.messages[-6:]                 # never compact the live turn
    digest = call_model(COMPACTION_PROMPT, state.messages[:-6], temperature=0)

    state.messages = [
        {"role": "user",
         "content": f"<prior_session_state>\n{digest}\n</prior_session_state>"},
        *keep,
    ]
    state.compaction_count += 1
    trace.compaction(state.trace_id, tokens_before=used,
                     tokens_after=count_tokens(state.messages))
    return state
```

**Compaction is lossy.** Log every event with the trace ID. When an agent behaves oddly late in a long run, the compaction boundary is the first place to look — something was summarised away that mattered.

### Technique 2 — Sub-agent isolation

The most under-used pattern, and the most effective.

A sub-agent gets a **fresh context window**, does focused work that burns 30,000 tokens, and returns a 1,500-token summary. The orchestrator's context never sees the 30,000.

```
ORCHESTRATOR context:
    goal + plan + sub-agent summaries only               ~8,000 tokens
    Stays small for the whole run.

    ├── SUB-AGENT A: "assess covenant compliance"
    │       own context: 12 facility documents, 34,000 tokens
    │       returns: "3 covenants breached: DSCR 1.08 vs 1.25 required
    │                 [FA-2210 cl.14.2], ..."         1,400 tokens
    │       ← the 34,000 tokens are DISCARDED
    │
    └── SUB-AGENT B: "check exposure headroom"
            own context: warehouse schema + query results
            returns: "Headroom ₹17.3 cr against the applicable limit."
```

**This is how you exceed the context window without exceeding the context window.** It also isolates failure: a sub-agent that goes wrong pollutes only its own disposable context.

### Technique 3 — Just-in-time retrieval

Instead of pre-loading everything "in case", give the agent a **cheap index** and let it choose what to load.

```
Agent sees:
  [1] Facility agreement FA-2210 · 2024-03-11 · 14,200 tokens
  [2] Credit policy §7 — Covenants · 2026-01-15 ·  3,100 tokens
  [3] Last review note · 2026-03-14 ·                 900 tokens
  [4] Bureau report · 2026-07-02 ·                  2,400 tokens

Agent calls: load_documents([2, 3])
  → only 4,000 tokens enter the window
```

The index carries **estimated token cost**, so the agent can reason about the budget. This mirrors how an analyst actually works — scan the file list, pull the two documents that matter — and it is the practical antidote to context stuffing.

### Check yourself

> **Q. Your agent is coherent for 15 steps and incoherent by step 30. Which failure, and which fix?**
> Most likely context distraction, possibly with clash. Check the token count at step 30 and whether stale tool results are still present. Fix in order: prune old tool results, then compact, then move the heaviest work into a sub-agent.

---

# PART 6 — MULTI-AGENT SYSTEMS

## 6.1 — Topologies and Their Costs **[WORKING]**

| Topology | Structure | Trade-off |
| :--- | :--- | :--- |
| **Supervisor** | One coordinator delegates to specialists | Clean separation; the supervisor becomes a bottleneck and a single point of failure |
| **Hierarchical** | Supervisors of supervisors | Scales to large problems; latency and cost compound at every level |
| **Swarm / handoff** | Peers pass control directly to each other | Flexible; very hard to trace and to bound |
| **Blackboard** | Shared state that agents read and write | Loose coupling; race conditions and write conflicts |

### The honest warning

Multi-agent systems fail in specific, well-documented ways:

```
▸ CONTEXT LOSS AT HANDOFF. Agent A knows something it does not think
  to include in the summary passed to agent B. B proceeds without it.

▸ DUPLICATED WORK. Two agents independently query the same warehouse
  and each pays for it.

▸ UNRESOLVED DISAGREEMENT. Two agents reach different conclusions and
  there is no mechanism to adjudicate. The supervisor picks one,
  usually the most recent.

▸ COST MULTIPLICATION. N agents, each running its own loop, each
  carrying its own context.

▸ DEBUGGING REQUIRES DISTRIBUTED TRACING that most teams do not have.
  "Which agent decided that, and on what basis?" becomes a research
  project.
```

### The rule

```
START SINGLE-AGENT.

Split into multiple agents only when BOTH are true:
  1. You have a MEASURED reason — a specific failure that a single
     agent cannot address, not an architectural preference
  2. You already have tracing that spans the split

The most common legitimate reason is CONTEXT ISOLATION (§5.3),
and that is achieved with sub-agents inside one orchestration —
which is a much simpler thing than a multi-agent system.
```

### Sub-agents versus multi-agent

Worth distinguishing clearly, because the terms are used interchangeably and should not be.

| | **Sub-agent** | **Multi-agent** |
| :--- | :--- | :--- |
| Control | One orchestrator owns the whole run | Control passes between peers |
| State | One shared state object | Separate states, synchronised somehow |
| Purpose | Context isolation | Genuine parallelism or specialisation |
| Tracing | One trace, nested spans | Distributed tracing required |
| Failure | Sub-agent fails → orchestrator handles it | Failure can propagate unpredictably |
| Complexity | Modest | High |

**Sub-agents give you most of the benefit at a fraction of the cost.** Reach for them first. Reach for true multi-agent only when the sub-problems need genuinely different tool sets, different models, or different security contexts.

---

# PART 7 — HUMAN IN THE LOOP

## 7.1 — The Patterns **[CORE]**

**What this section gives you.** The design that makes an agent deployable in a regulated environment.

| Pattern | Mechanism | Use for |
| :--- | :--- | :--- |
| **Approve / reject** | Agent pauses before a gated action | Money movement, external communication, data deletion, credit decisions |
| **Edit then approve** | Human modifies the proposed action before it commits | Drafting, recommendations with judgement overlay |
| **Escalate on uncertainty** | Confidence below a threshold routes to a human | Ambiguous cases, low retrieval scores |
| **Sample review** | A percentage of autonomous actions reviewed after the fact | High-volume operations where per-item review is impractical |
| **Bounded autonomy** | Autonomous within an envelope; escalate outside it | "Recommend approval up to ₹50 lakh and grade BBB or better; everything else goes to a human" |

**Bounded autonomy is the pattern that gets agents deployed in banks.** It maps directly onto delegated authority structures that already exist — a credit officer has a sanctioning limit; so does the agent, and it is lower.

---

## 7.2 — Where to Gate **[CORE]**

Gating everything is worse than gating nothing, because it trains people to click Approve without reading. That is a real and documented failure: an approval step that is reflexively clicked is not a control, and its presence creates false assurance.

```
ALWAYS GATE
  ▸ Movement of money
  ▸ Any external communication — to a customer, a regulator,
    a counterparty
  ▸ Deletion or irreversible modification of records
  ▸ Credit decisions, limit changes, covenant waivers
  ▸ Anything legally binding
  ▸ Granting or changing access rights

NEVER GATE
  ▸ Read-only lookups
  ▸ Internal search and retrieval
  ▸ Draft generation that is not sent anywhere
  ▸ Analysis and calculation

  Gating these produces approval fatigue, which degrades the gates
  that actually matter.
```

---

## 7.3 — Show the Raw Action **[CORE]**

**What this section gives you.** The design rule that prevents an approval step from becoming theatre.

### The problem

> **An approval is only as good as the information it is based on — and the agent controls that information.**

If the human approves the agent's *summary* of what it intends to do, the agent's framing determines what gets approved. A confident, reasonable-sounding summary can obscure an action the reviewer would have rejected.

```
❌  "I'll update the counterparty's limit as we discussed. Approve?"

    What is being approved? Which counterparty? From what to what?
    Under whose authority? Is it reversible? The reviewer is approving
    a sentence, not an action.
```

### The fix

```
✅  ┌────────────────────────────────────────────────────────────┐
    │  ACTION REQUIRING APPROVAL                                  │
    ├────────────────────────────────────────────────────────────┤
    │  Operation:    credit_limit.update                          │
    │  Counterparty: CP-4417 — Meridian Industries Ltd            │
    │  Field:        sanctioned_limit_inr                         │
    │  Current:      ₹160,00,00,000                               │
    │  Proposed:     ₹180,00,00,000        (+₹20 cr, +12.5%)      │
    │                                                             │
    │  Authority:    Credit Committee required (>₹10 cr change)   │
    │  Your role:    Senior Credit Manager — NOT SUFFICIENT       │
    │                                                             │
    │  Basis cited:  Policy §7.3 [policy-v4.2::s7::c3]            │
    │                Risk grade BBB, PD 1.4% [model v3.1]          │
    │                Exposure headroom ₹17.3 cr                    │
    │                                                             │
    │  Reversible:   Yes — audited, reversible within 24 hours     │
    │  Trace:        trace_01HXYZ  (full reasoning available)      │
    │                                                             │
    │              [ Approve ]  [ Reject ]  [ View full trace ]    │
    └────────────────────────────────────────────────────────────┘
```

**Four properties that matter:**

1. **The raw operation and parameters**, not a narrative about them.
2. **The authority required and whether the reviewer has it.** The system tells the human they cannot approve this — the human should not have to remember.
3. **The basis, with citations** that can be opened.
4. **Reversibility, stated plainly.**

### Log what was displayed

```python
approval_record = {
    "trace_id":        ctx.trace_id,
    "action":          proposed.model_dump(),        # what was PROPOSED
    "rendered_to_user": rendered_html_hash,          # what was DISPLAYED
    "approver":        principal.id,
    "approver_role":   principal.role,
    "authority_check": "insufficient",               # and it was still shown
    "decision":        "rejected",
    "timestamp":       now(),
    "executed_action": None,                         # what actually RAN
}
```

**Recording what was displayed alongside what was executed** is what lets you later prove that the approver saw the real action. Without it, "the human approved it" is an assertion with nothing behind it.

**Also: ban persuasive framing in approval flows.** An agent that writes "this is a routine adjustment, standard practice" alongside a request for approval is applying pressure. Approval surfaces should render facts, not arguments.

---

# PART 8 — FRAMEWORKS

## 8.1 — The Landscape **[WORKING]**

| Framework | Model | Best for | Consider |
| :--- | :--- | :--- | :--- |
| **LangGraph** | Explicit graph state machine; durable execution; first-class interrupts for human approval | **The default for stateful, auditable workflows in regulated industries.** Checkpointing and time-travel are built in, not bolted on. | Steeper learning curve; you define the state schema yourself |
| **Claude Agent SDK** | A "deep agent" harness — planner, sub-agents, file-backed memory, MCP-native, lifecycle hooks | Long-horizon agents, coding agents, work spanning many files | Coupled to one model family |
| **OpenAI Agents SDK** | Small primitive set: agents, handoffs, guardrails, sessions; sandboxed execution | Fastest path for straightforward agents; works with many non-OpenAI models | Less routing control at scale |
| **Google ADK** | Supervisor pattern; native agent-to-agent interop with auto-generated capability cards | Google Cloud deployments; cross-vendor agent interoperability | Newer ecosystem |
| **Microsoft Agent Framework** | AutoGen and Semantic Kernel merged; .NET and Python | Microsoft-stack enterprises | Recently consolidated |
| **CrewAI** | Role-based crews; native MCP support | **Fastest prototype** — hours rather than days | Many teams prototype here and reimplement elsewhere for production |
| **Pydantic AI** | Type-safe, minimal, no magic | Teams that want types and explicit control | Less orchestration machinery |
| **LlamaIndex** | Retrieval-first, agents layered on top | Retrieval-heavy applications | Thinner agent layer |

### The choice, for a bank

**LangGraph, in most cases.** Not because it is the most elegant, but because of one property:

> **Durable execution with checkpointing and interrupts is a compliance capability, not a developer convenience.** Pausing indefinitely at an approval gate, resuming in a different process, replaying a past run step by step, and producing a complete evidence trail — these are what an internal auditor asks for, and building them yourself on top of a lighter framework is months of work.

If your work is Claude-centric and long-horizon, the Claude Agent SDK gives you sub-agents and memory management already assembled. If your agents are simple — two or three tools, a few steps — the OpenAI Agents SDK gets you there faster.

### The measurement that should change your evaluation habits

Published benchmark work has found the **same model** scoring materially differently on the same agentic benchmark under different orchestration scaffolds — gaps larger than the improvement between model generations.

**Consequence: benchmark the (model × scaffold) pair, never the model alone.** A leaderboard score obtained under someone else's harness tells you very little about what you will get under yours.

---

## 8.2 — When to Use No Framework **[CORE]**

This section exists because the answer is "more often than you would think."

```
USE NO FRAMEWORK WHEN:
  ▸ Your agent has fewer than five tools
  ▸ Fewer than six steps in a typical run
  ▸ No human approval gates
  ▸ No requirement to resume after a crash
  ▸ Single-turn or short conversations

  The loop in §1.3 is forty lines. It is fully readable, fully
  debuggable, has no version churn, and no dependency to upgrade.
```

Every framework is a dependency with a release cadence, breaking changes, and an abstraction that will eventually not fit what you need. For a simple agent, the loop you write yourself is often better — and always more comprehensible six months later.

**Adopt a framework when you need what it provides:** durable state, checkpointing, interrupts, sub-agent orchestration, or streaming through a complex graph. Not before.

---

# PART 9 — A PRODUCTION AGENT

## 9.1 — The Specification **[WORKING]**

A concrete build, with every control from this volume in place.

```
PURPOSE
  Credit applications that fall outside automated policy are routed to
  an exception queue. An underwriter must gather evidence from several
  systems, check applicable policy, and produce a recommendation.
  This takes 35–50 minutes and the evidence-gathering is mechanical.

  The agent gathers the evidence and drafts a structured recommendation.
  An underwriter reviews and decides.

WHY AN AGENT AND NOT A WORKFLOW
  The exception reason determines which evidence is needed, and the
  reasons are open-ended — covenant breach, income documentation gap,
  adverse bureau item, exposure concentration, industry restriction,
  or a combination. The sequence cannot be fixed in advance.
  → Level 4/5 on the §3.1 spectrum.

NON-GOALS — stated explicitly, because they are what make it approvable
  ▸ The agent NEVER makes or records a credit decision
  ▸ The agent NEVER communicates with the applicant
  ▸ The agent NEVER modifies any system of record
  ▸ Every output is a DRAFT for human review

TOOLS  (six — deliberately small, §1.2 Principle 6)
  get_application_detail(application_id)          read-only
  get_counterparty_exposure(counterparty_id)      read-only
  search_credit_policy(query, as_of)              read-only, V3 pipeline
  get_bureau_summary(counterparty_id)             read-only
  compute_risk_grade(...)                         read-only, deterministic model
  create_exception_note(...)                      WRITE — gated, two-phase

BUDGETS
  max_steps 14 · max_spend $2.00 · max_wallclock 240s

SUCCESS CRITERIA
  Draft cites applicable policy · all required evidence gathered ·
  underwriter edits under 30% of the draft · escalation rate under 20%
```

---

## 9.2 — The Implementation **[WORKING]**

```python
"""Credit exception triage agent.

Demonstrates: typed state · budget enforcement · loop detection ·
conditional routing · human approval gate · checkpointing ·
mandatory escalation · full tracing.
"""

from typing import TypedDict, Annotated, Literal
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.checkpoint.postgres import PostgresSaver
from langgraph.prebuilt import ToolNode
import operator, time

MAX_STEPS, MAX_SPEND_USD, MAX_WALLCLOCK_S = 14, 2.00, 240.0


# ═══════════════════════════════════════════════════════════════════
# STATE — the typed object that flows through every node.
# ═══════════════════════════════════════════════════════════════════

class ExceptionState(TypedDict):
    # `Annotated[..., add_messages]` tells LangGraph how to COMBINE
    # updates to this field: append rather than replace.
    messages:       Annotated[list, add_messages]

    application_id: str
    principal:      dict                # who the agent acts for (§1.2 P7)

    # `operator.add` means updates ACCUMULATE across nodes rather than
    # overwriting. This is how budgets tally correctly when several
    # nodes contribute.
    steps:          Annotated[int, operator.add]
    spend_usd:      Annotated[float, operator.add]

    started_at:     float
    evidence:       dict                # what has been gathered
    draft:          dict | None         # the structured recommendation
    needs_approval: bool
    escalation:     str | None


# ═══════════════════════════════════════════════════════════════════
# NODES
# ═══════════════════════════════════════════════════════════════════

def plan(state: ExceptionState) -> dict:
    """The reasoning step. Decides what evidence is still needed and
    which tool to call next — or that it is ready to draft."""

    # ── BUDGETS FIRST, before spending anything (§4.2) ─────────────
    if state["steps"] >= MAX_STEPS:
        return {"escalation": "step_budget_exhausted"}
    if state["spend_usd"] >= MAX_SPEND_USD:
        return {"escalation": "spend_budget_exhausted"}
    if time.time() - state["started_at"] > MAX_WALLCLOCK_S:
        return {"escalation": "wallclock_exceeded"}

    # ── LOOP DETECTION (§4.2) ──────────────────────────────────────
    if loop := detect_loop(state):
        return {"messages": [{"role": "user", "content":
                f"{loop} That approach is not working. Either proceed "
                f"with the evidence you have, or state what is blocking "
                f"you and stop."}]}

    # ── CONTEXT MANAGEMENT before the call (§5.3) ──────────────────
    state = maybe_compact(state)
    messages = prune_stale_tool_results(state["messages"])

    response = gateway.complete(
        messages=messages,
        tools=EXCEPTION_TOOLS,          # fixed set, fixed order (V2 §7)
        tenant=state["principal"]["tenant"],
        data_class="internal",
        trace_id=trace_id_of(state),
    )

    return {"messages": [response],
            "steps": 1,
            "spend_usd": response.cost_usd}


def draft_recommendation(state: ExceptionState) -> dict:
    """Produce the structured recommendation. Constrained output
    (V1 §7.1) so the shape is guaranteed."""

    draft = gateway.complete_structured(
        messages=state["messages"],
        schema=ExceptionRecommendation,     # a Pydantic model
        temperature=0,
    )

    # ── COMPLETION CHECKED IN CODE, not claimed by the model (§4.1) ──
    ok, reason = is_complete_draft(draft, state["evidence"])
    if not ok:
        return {"messages": [{"role": "user", "content":
                f"That draft is incomplete: {reason} Gather what is "
                f"missing and try again."}]}

    return {
        "draft": draft.model_dump(),
        # Authority determined by POLICY CODE, never by the model.
        "needs_approval": requires_committee(draft, state["evidence"]),
    }


def escalate(state: ExceptionState) -> dict:
    """Every non-success termination comes here (§4.2)."""
    ticket = review_queue.create(
        application_id=state["application_id"],
        reason=state["escalation"],
        partial_work=state.get("draft"),
        trace_id=trace_id_of(state),
        steps=state["steps"],
        cost_usd=state["spend_usd"],
    )
    return {"messages": [{"role": "assistant", "content":
            f"Unable to complete: {state['escalation']}. "
            f"Raised for human review as {ticket.id}."}]}


# ═══════════════════════════════════════════════════════════════════
# ROUTING — a plain function returning the name of the next node.
# ═══════════════════════════════════════════════════════════════════

def route(state: ExceptionState) -> Literal["tools", "draft", "escalate"]:
    if state.get("escalation"):
        return "escalate"
    last = state["messages"][-1]
    if getattr(last, "tool_calls", None):
        return "tools"
    return "draft"


# ═══════════════════════════════════════════════════════════════════
# GRAPH ASSEMBLY
# ═══════════════════════════════════════════════════════════════════

b = StateGraph(ExceptionState)
b.add_node("plan",     plan)
b.add_node("tools",    ToolNode(EXCEPTION_TOOLS))   # runs the calls
b.add_node("draft",    draft_recommendation)
b.add_node("escalate", escalate)

b.add_edge(START, "plan")
b.add_conditional_edges("plan", route, {
    "tools":    "tools",
    "draft":    "draft",
    "escalate": "escalate",
})
b.add_edge("tools", "plan")        # ← the loop: act, then think again
b.add_edge("draft", END)
b.add_edge("escalate", END)

graph = b.compile(
    checkpointer=PostgresSaver.from_conn_string(PG_URL),   # §5.2
    interrupt_before=["draft"],     # ← HUMAN GATE before anything is
                                    #   recorded. The run PAUSES here
                                    #   and survives process restart.
)


# ═══════════════════════════════════════════════════════════════════
# INVOCATION
# ═══════════════════════════════════════════════════════════════════

config = {
    "configurable": {"thread_id": f"exception-{application_id}"},
    "recursion_limit": 40,          # a hard ceiling BELOW the graph level,
                                    # independent of our own step cap
}

state = graph.invoke({
    "application_id": application_id,
    "principal":      principal.to_dict(),
    "started_at":     time.time(),
    "steps":          0,
    "spend_usd":      0.0,
    "evidence":       {},
    "messages":       [{"role": "user", "content": task_description}],
}, config)


# The run paused at the interrupt. Present the RAW proposal (§7.3).
snapshot = graph.get_state(config)
if snapshot.next:
    proposal = snapshot.values["draft"]
    if underwriter_approves(render_raw_action(proposal, principal)):
        state = graph.invoke(None, config)      # resume from the pause
    else:
        graph.update_state(config, {"escalation": "rejected_by_underwriter"})
```

### The controls, counted

```
1.  Step cap                              §4.2
2.  Spend cap                             §4.2
3.  Wall-clock cap                        §4.2
4.  Loop detection with recovery message  §4.2
5.  Compaction and pruning                §5.3
6.  Completion checked in code            §4.1
7.  Authority determined by policy code   §7.2
8.  Human gate before any record          §7.1
9.  Raw action shown, not a summary       §7.3
10. Checkpointing for pause and replay    §5.2
11. Mandatory escalation path             §4.2
12. Tool-level authorisation and audit    §1.2
```

**An agent missing any of these is a prototype**, regardless of how well it demonstrates.

---

## 9.3 — Failure Modes **[CORE]**

| Failure | Symptom | Control |
| :--- | :--- | :--- |
| **Infinite loop** | Same tool, same arguments, repeatedly | Step cap + loop detection with an injected recovery message |
| **Cost explosion** | An overnight five-figure bill | Hard spend cap **in the run state**, not a dashboard alert |
| **Tool thrash** | Cycles through tools without progress | Fewer tools; better descriptions; a progress check |
| **Context rot** | Coherent early, incoherent by step 25 | Compaction; sub-agent isolation; prune stale results |
| **Silent wrong answer** | Confident, plausible, wrong | Citation verification (V3 §8.4); faithfulness check; completion check in code |
| **Partial completion** | Says it is done; it is not | Deterministic completion criteria (§4.1) |
| **Cascading error** | One bad tool result poisons everything after | Validate tool results; quarantine; circuit breakers |
| **Approval theatre** | Human clicks Approve without reading | Gate only what matters (§7.2); show the raw action (§7.3) |
| **Non-determinism in production** | Same input, different behaviour | Temperature 0 where possible; pin model versions; store full traces |
| **Unbounded blast radius** | An error reaches a system of record | Read-only by default; two-phase commit; per-tool scopes |

---

# PART 10 — EVALUATING AGENTS

## 10.1 — Trajectory, Not Just Outcome **[CORE]**

**What this section gives you.** The reason final-answer evaluation is insufficient for agents.

An agent can reach the right answer the wrong way: by calling a tool it should not have, by taking eleven steps where three would do, by getting lucky after a failed approach. Outcome-only evaluation cannot see any of that, and all three will cause problems at scale.

| Level | Measures | How |
| :--- | :--- | :--- |
| **Outcome** | Did it achieve the goal? | Compare the final state against the expected end state |
| **Trajectory** | Was the path sensible? | Compare the tool-call sequence against a reference, allowing valid alternatives |
| **Tool accuracy** | Right tool, right arguments? | Per-call precision and recall on tool name and parameters |
| **Efficiency** | Steps, tokens, wall-clock, cost | Look at the **distribution**, especially p95 — the mean hides the runaway runs |
| **Recovery** | Does it handle a failing tool? | Inject failures deliberately (§10.2) |
| **Boundaries** | Does it stay inside its envelope? | Attempt out-of-scope actions; assert refusal |

```python
def evaluate_run(case: EvalCase, run: AgentRun) -> dict:
    return {
        # Outcome
        "outcome_success":   matches(run.final_state, case.expected_end_state),

        # Trajectory
        "used_required":     set(case.required_tools) <= set(run.tool_names),
        "used_forbidden":    sorted(set(case.forbidden_tools) & set(run.tool_names)),
        "tool_arg_accuracy": arg_accuracy(run.tool_calls, case.expected_calls),

        # Efficiency
        "steps":             run.step_count,
        "cost_usd":          run.cost_usd,
        "wallclock_s":       run.wallclock,

        # Robustness
        "recovered":         run.had_tool_error and run.outcome_success,
        "escalated":         run.escalated,
        "escalation_correct": run.escalated == case.should_escalate,

        # Safety
        "stayed_in_envelope": not run.attempted_out_of_scope,
        "approval_gates_hit": run.approval_requests == case.expected_gates,
    }
```

**`used_forbidden` and `stayed_in_envelope` are the two that matter most in a bank**, and they are the two most often absent from evaluation suites. An agent that produces good recommendations while occasionally attempting to write to a system of record is not a good agent.

---

## 10.2 — Failure Injection **[CORE]**

**What this section gives you.** The test that determines whether your agent survives its first week.

Tools fail. In production this happens on day one. An agent that has never encountered a failing tool has never had its recovery path exercised.

```python
FAILURE_MODES = [
    ("timeout",        lambda: raise_(TimeoutError())),
    ("error_500",      lambda: raise_(ServiceError("Internal server error"))),
    ("empty_result",   lambda: ""),
    ("malformed",      lambda: "{{{not json at all"),
    ("access_denied",  lambda: "Access denied: insufficient scope."),
    ("stale_data",     lambda: stale_response(days_old=45)),
    ("wrong_entity",   lambda: response_for_different_counterparty()),
]

def test_recovery(agent, case):
    """For each tool, for each failure mode, assert the agent does
    something sensible — recovers, or escalates cleanly. It must NEVER
    proceed as though the call succeeded."""
    for tool_name in case.expected_tools:
        for mode_name, injector in FAILURE_MODES:
            run = agent.run(case.input, inject={tool_name: injector})
            assert run.terminated_cleanly, \
                f"{tool_name} + {mode_name}: run did not terminate cleanly"
            assert run.outcome_success or run.escalated, \
                f"{tool_name} + {mode_name}: failed silently"
            assert not run.fabricated_data, \
                f"{tool_name} + {mode_name}: INVENTED data after failure"
```

**The third assertion is the important one.** The dangerous response to a failed exposure lookup is not an error — it is the agent proceeding with a plausible-looking figure it invented. `stale_data` and `wrong_entity` are included for the same reason: a tool that returns *something* wrong is more dangerous than one that returns nothing, because nothing is obviously a failure.

---

## 10.3 — Metrics Worth Tracking **[WORKING]**

```
QUALITY
  Task success rate (on the golden set)
  Escalation rate — and whether escalations were CORRECT
  Human edit distance on drafts — the best proxy for real usefulness
  Trajectory validity

EFFICIENCY
  Steps per task: p50 and p95
  Cost per task: p50 and p95      ← p95 is where the incidents live
  Wall-clock: p50 and p95
  Tool calls per task

RELIABILITY
  Tool error rate, by tool
  Recovery rate after a tool failure
  Loop detections triggered
  Budget exhaustions, by cap type

SAFETY
  Out-of-scope action attempts             ← should be zero
  Approval gates hit versus expected
  Approval rejection rate                  ← if near zero, the gate may
                                             be theatre (§7.2)
```

**Human edit distance is the most honest quality metric available for a drafting agent.** If underwriters rewrite 60% of every draft, the agent is generating work rather than saving it, whatever the task-success number says.

---

# PART 11 — REFERENCE

## 11.1 — Volume 4 Reference Card

```
TOOL CALLING
  The model EMITS a request. YOUR CODE decides whether to run it.
  That boundary is the entire security model.
  The tool schema is a PROMPT — it enters the context as text.

TOOL DESIGN — seven principles
  1. Design for tasks, not for your API. Compose server-side.
  2. Return summaries the model can use, not raw payloads.
  3. ERROR MESSAGES ARE PROMPTS. Tell the model what to do next.
  4. Two-phase commit for anything destructive: propose → token → commit.
  5. Idempotency keys on every mutating tool. Agents retry.
  6. Small, STABLE, fixed-order tool set. Dynamic tool lists destroy
     prompt caching and cost more than they save.
  7. Every tool is an authorisation boundary. Act AS the user.

MCP
  M×N integrations → M+N. Tools portable across frameworks.
  Primitives by WHO DECIDES: tools (model) · resources (app) · prompts (user)
  ★ 2026-07-28 made it STATELESS: no handshake, no session header,
    self-describing _meta, Mcp-Method/Mcp-Name headers, cacheable lists,
    MRTR replacing held-open streams, DCR → CIMD, Tasks as an extension.
    Roots/Sampling/Logging and HTTP+SSE deprecated, 12-month window.
  → Any request to any instance. Plain round-robin. Ordinary HTTP.
  Keep state via EXPLICIT HANDLES the model can see, not hidden sessions.

AUTONOMY — buy the least that solves the problem
  L0 single call · L1 chain · L2 router · L3 tools · L4 graph with loops
  L5 autonomous ⚠ · L6 multi-agent ⚠⚠
  Test: can you write the flowchart in advance? Then it is L1–L4.
  ★ ANYTHING THAT CAN BE A RULE SHOULD BE A RULE. Policy checks belong
    in code, not in a model.

THE LOOP
  budget → assemble context → call → check completion IN CODE →
  execute tools with guards → record
  Completion is CHECKED, never announced.

TERMINATION — three caps, all needed
  steps (cheap infinite loops) · spend (short expensive runs) ·
  wall-clock (stuck on a slow tool)
  Loop detection: inject a recovery message before terminating.
  ★ NEVER FAIL SILENTLY. Every non-success path escalates with the
    partial work and the trace attached.

CONTEXT
  Four failure modes: POISONING · DISTRACTION · CONFUSION · CLASH
  Compaction at ~65% of budget — and it is LOSSY, so log every event
  Sub-agent isolation: fresh window, returns a summary. This is how you
    exceed the context window without exceeding it.
  Just-in-time retrieval: give an INDEX with token costs, let the agent
    choose what to load

MEMORY
  Working · episodic · semantic · procedural
  Memory is an ATTACK SURFACE: validate before writing, ephemeral by
  default, scoped per user, inspectable and flushable, with provenance

CHECKPOINTING — four things nothing else gives you
  crash resilience · indefinite HITL pauses · time-travel debugging ·
  ★ THE AUDIT TRAIL. In a regulated firm this is the evidence pack.
    Build it day one; it cannot be retrofitted.

MULTI-AGENT
  Start single. Split only with a MEASURED reason AND tracing that
  spans the split.
  Sub-agents ≠ multi-agent. Sub-agents give most of the benefit
  (context isolation) at a fraction of the complexity.

HUMAN IN THE LOOP
  Gate: money · external communication · deletion · decisions ·
        binding commitments · access grants
  Never gate: reads · search · unsent drafts · analysis
        (gating these produces approval fatigue, which breaks the
         gates that matter)
  ★ SHOW THE RAW ACTION, NOT THE AGENT'S SUMMARY. The agent controls
    the summary. Log what was DISPLAYED alongside what EXECUTED.
  Bounded autonomy maps onto delegated authority. Use it.

FRAMEWORKS
  LangGraph for stateful, auditable, regulated work — durable execution
    and interrupts are compliance capabilities
  No framework at all when: <5 tools, <6 steps, no gates, no resume
  ★ Benchmark the MODEL × SCAFFOLD pair. Scaffold moves agentic scores
    by more than a model generation does.

EVALUATION
  Outcome is not enough. Measure TRAJECTORY, tool accuracy, efficiency
  distribution (p95, not mean), recovery, and boundary adherence.
  used_forbidden and stayed_in_envelope must be zero.
  ★ INJECT TOOL FAILURES: timeout, 500, empty, malformed, denied,
    STALE, WRONG ENTITY. Assert it never fabricates data after a failure.
  Human edit distance is the most honest quality metric for drafting.
```

---

## 11.2 — What You Can Now Do

- Decide, with a defensible test, whether a problem needs an agent or a workflow — and correctly conclude "workflow" most of the time.
- Design tools that a model selects correctly, with error messages that let it recover.
- Explain what changed in MCP in July 2026 and why statelessness matters for deployment.
- Build an agent with all twelve production controls, not a demo with none.
- Diagnose an incoherent long run to a specific context failure mode.
- Design a human approval step that is a control rather than theatre.
- Evaluate an agent on its trajectory and its behaviour under tool failure, not just its answers.

**What remains.** This volume gave the agent tools, memory and the ability to act. Volume 5 covers what happens when someone tries to turn those capabilities against you — prompt injection, tool poisoning, memory poisoning, and the specific incident classes that emerged in 2025–26 — together with evaluation and observability, which is how you know any of it is working.

---

*Volume 4 ends here. Volume 5: Evaluation, Observability and Security.*
