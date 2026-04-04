# FOXO Simulation Master Reference

**Version:** 1.0  
**Purpose:** Mission-specific source of truth for building a product simulation inspired by FOXO’s operating world.  
**Owner:** Tharun Gajula  
**Status:** Active  
**Build Mode:** Fast, realistic, founder-convincing simulation  

---

## 1. What this file is

This file is the **mission memory** for the current build sprint.

It exists so that:
- the IDE agent has a stable reference,
- the project does not drift when prompts get long,
- implementation stays aligned to one product story,
- and future sessions can recover the exact build intent quickly.

This file does **not** replace the broader `PROJECT_CONTEXT.md`.

Instead:
- `PROJECT_CONTEXT.md` = broader repo/design memory
- `FOXO_SIMULATION_MASTER_REFERENCE.md` = this mission’s product/build memory

Use both together, but when there is any ambiguity during this sprint, **this file takes priority for the FOXO-world simulation work**.

---

## 2. The mission

Build a **product simulation** that shows how I think through FOXO’s world.

This is **not** a cloned FOXO product.
This is **not** a fake startup website.
This is **not** a generic wellness dashboard.

This is a carefully designed **simulation of a high-touch preventive health / longevity operating system**.

The real objective is to make a founder or product leader feel:

> “This person understands the operating logic, bottlenecks, care workflows, trust constraints, and AI opportunities in our world.”

### Core strategic outcome
The simulation should function as **proof of work** for:
- product judgment,
- systems thinking,
- analytics/AI thinking,
- workflow realism,
- and strong taste in execution.

---

## 3. Strategic framing

### The public framing
This should always be described as:

> **“A product simulation I built to think through FOXO’s world.”**

This framing is correct because it is:
- honest,
- ambitious,
- respectful,
- and strategically sharp.

It shows deep engagement without pretending inside access.

### What we are not doing
We are **not**:
- using FOXO branding,
- claiming clinical expertise,
- claiming clinical validity,
- claiming regulatory readiness,
- or pretending this is production-grade medical software.

### What we are doing
We **are**:
- showing realistic product architecture,
- simulating believable workflows,
- demonstrating careful AI placement,
- and translating research into buildable product surfaces.

---

## 4. Product philosophy for this simulation

The simulation should be designed around one strong principle:

> **Interpretation over information overload.**

A premium preventive-health product is not valuable because it shows more tests.
It is valuable because it helps convert fragmented health data into:
- coherent understanding,
- clear priorities,
- actionable plans,
- longitudinal follow-through,
- and trust.

### Product principles
1. **Clinical-ops realism first**  
   The product must feel operationally believable.

2. **AI second, but clearly present**  
   AI should create leverage inside the system, not cheap spectacle.

3. **Interpretation beats raw dashboards**  
   The product should show what matters, not everything equally.

4. **Longitudinal care beats one-time testing**  
   The app should feel like a loop, not a report.

5. **Trust is a product feature**  
   Evidence, caution, context, and auditability should be visible.

6. **Founder-grade restraint**  
   No gimmicks, no noise, no wellness-app fluff.

---

## 5. Scope decisions already made

These decisions are locked for this sprint.

### 5.1 Branding decision
Use the simulation framing only.
Do **not** directly brand it as FOXO.

### 5.2 Realism vs AI wow
Priority is:
1. realism first
2. AI second

But AI must still be present in a meaningful way.

### 5.3 Persona strategy
Focus on **one flagship/core member persona**.
Do **not** spend time on Primer.

Reason:
- the flagship experience is the highest-signal product loop,
- it best demonstrates the operating system,
- and it maps more closely to the deeper care model.

### 5.4 Backend choice
**Do not use Supabase right now.**

Reason:
- timebox is too short,
- auth and persistence add complexity quickly,
- we need product proof-of-work more than database plumbing,
- and local typed mock data is enough for a convincing V1.

### 5.5 Authentication choice
**Do not build login/auth in V1.**

Reason:
- it is not the strongest signal for the current mission,
- and it risks wasting momentum.

---

## 6. Why we are not using Supabase now

This choice is deliberate, not a compromise.

### If we add Supabase too early, we introduce:
- auth setup,
- schema design,
- RLS / policies,
- environment variables,
- debugging overhead,
- UI edge cases,
- and accidental context bloat.

That complexity is not the highest-leverage use of the next 2–3 days.

### The better sequence is:

#### Stage 1
Build the entire simulation with:
- local TypeScript types,
- local structured mock data,
- reusable components,
- believable product flow,
- and polished founder-facing UI.

#### Stage 2
If needed later, add:
- persistence,
- login,
- and backend storage.

This is the right build order for a beginner under time pressure.

---

## 7. The product we are building

The app extension should feel like a real internal product used for managing a premium preventive-health member.

### It should feel like:
- a care operating system,
- a longitudinal intelligence interface,
- a clinician-aware product,
- and a workflow layer sitting between diagnostics, interpretation, planning, and follow-through.

### It should not feel like:
- a hospital EMR,
- a generic admin dashboard,
- a wearable metrics toy,
- a supplement marketplace,
- or a consumer chatbot.

---

## 8. The one member persona

Use one realistic flagship member.

### The persona should be something like:
A high-performing urban professional with:
- inconsistent sleep,
- moderate stress load,
- early cardiometabolic drift,
- some digestive/recovery complaints,
- fragmented prior records,
- wearable signals,
- and enough complexity to justify premium preventive care.

### Important restraint
The member should **not** feel dramatically ill.

The value of the system should come from:
- pattern detection,
- interpretation,
- prioritization,
- and operational follow-through.

Not from obvious acute disease.

---

## 9. Primary product surfaces

These are the surfaces the simulation should include.

### 9.1 Command Center
Purpose: give the operating overview.

Should include:
- member snapshot,
- current top issues,
- recent consult summary,
- next clinical actions,
- next member actions,
- adherence pulse,
- retest countdown,
- and a premium overview of why this case matters.

### 9.2 Timeline Intake
Purpose: show how fragmented history becomes a coherent health story.

Should include:
- uploaded source cards,
- historical events,
- extracted milestones,
- unresolved gaps,
- intake synthesis,
- and a clean longitudinal timeline.

### 9.3 Biomarker Intelligence
Purpose: show interpretation over raw test overload.

Should include:
- prioritized biomarkers,
- problem clusters,
- severity,
- trend direction,
- confidence/caution,
- and actionability.

This should not be a boring lab table.

### 9.4 Intervention Plan
Purpose: convert interpretation into action.

Should include:
- problem-to-plan mapping,
- weekly behavior priorities,
- clinical recommendations,
- task design,
- retest plans,
- and subtle rationale/evidence language.

### 9.5 Care Execution
Purpose: show longitudinal operational care.

Should include:
- daily and weekly tasks,
- adherence logs,
- blockers,
- recent check-ins,
- upcoming follow-ups,
- and a sense of accountable care workflow.

### 9.6 AI Copilot
Purpose: show safe, internal AI leverage.

Should include:
- history synthesizer,
- consult brief generator,
- action-item extractor,
- recommendation rationale helper,
- adherence-risk flagger,
- uncertainty/caution panel.

This is an **internal assistant layer**, not a direct-to-patient diagnosis bot.

---

## 10. The AI strategy

AI is important to this mission, but it must be positioned correctly.

### Correct AI posture
AI should feel like:
- internal leverage,
- structure from messy inputs,
- interpretation support,
- workflow acceleration,
- and clinician-supporting intelligence.

### Wrong AI posture
Avoid:
- magical diagnosis chat,
- random chat widgets,
- vague “digital twin” theater,
- speculative autonomy,
- or consumer-facing certainty.

### Good AI roles for V1
1. **History Synthesizer**  
   Turns fragmented records into a coherent summary.

2. **Timeline Compiler**  
   Extracts major events and organizes them longitudinally.

3. **Consult Brief Generator**  
   Produces pre-visit and post-visit briefs.

4. **Action Item Extractor**  
   Converts consult notes into trackable tasks.

5. **Recommendation Rationale Helper**  
   Explains why a plan exists in product-grade language.

6. **Adherence Risk Flagger**  
   Detects likely drop-off patterns or friction.

7. **Uncertainty Layer**  
   Shows what is ambiguous, missing, or requires caution.

### Key AI rule
AI should be shown as **an internal copilot embedded in workflow**, not as an autonomous authority.

---

## 11. Design rules

We do **not** redesign the whole visual system.

We extend the existing site language.

### Existing visual DNA to preserve
- dark premium background,
- subtle grid energy,
- glassmorphic surfaces,
- cyan-highlight accents,
- strong spacing,
- calm hierarchy,
- premium restraint.

### Visual goals
The UI should feel:
- serious,
- premium,
- clean,
- legible,
- and founder-convincing.

### Avoid
- over-decoration,
- noisy cards everywhere,
- cheap dashboard patterns,
- playful healthcare illustrations,
- bright health-app colors,
- or cluttered metric walls.

### UX bar
The product should feel like it could plausibly be the early UI of a real premium care platform.

---

## 12. Agentic workflow lessons we are actively using

This section matters.

We are drawing inspiration from the **durable lessons** around modern agentic coding workflows, especially the official Claude Code guidance, without getting distracted by rumor-heavy interpretations of the 2026 source-map incident.

### Important distinction
The Claude Code incident widely discussed in March–April 2026 was reported as an accidental source-map exposure in a package release, not a model-weight breach or customer-data breach.

That matters only as context.

For this project, the actual value comes from the **stable workflow lessons**, not the sensational details.

### Lesson 1: Persistent memory
Agent sessions are temporary.
Project truth must live in files.

So for this mission we use:
- `PROJECT_CONTEXT.md` for broad repo memory,
- `FOXO_SIMULATION_MASTER_REFERENCE.md` for this mission,
- and later optional build logs/checkpoints.

### Lesson 2: Scoped roles
Instead of giant vague prompts, work in role-bounded modes.

Example roles:
- product architect,
- frontend implementer,
- QA verifier,
- narrative/copy finisher,
- research translator.

### Lesson 3: Verification-first execution
Every significant build step must be verifiable.

That means:
- prompts need clear deliverables,
- screenshots should confirm results,
- file trees should be reviewed,
- and visual/interaction acceptance criteria must be explicit.

### Lesson 4: Aggressive context management
Long agent sessions degrade.

So we avoid:
- shapeless mega-prompts,
- too many moving parts at once,
- premature backend complexity,
- and unclear ownership of truth.

Instead we use:
- small focused prompts,
- route-by-route build,
- explicit checkpointing,
- and stable reference files.

### What this means in practice
Our workflow is:
1. define memory files,
2. define one clear mission,
3. scaffold cleanly,
4. verify visually,
5. refine section by section,
6. only then add optional complexity.

This is not just convenient.
It is a deliberate high-performance way to work with coding agents.

---

## 13. How the IDE agent should be used

The IDE agent should not be treated like a magic wand.
It should be treated like a fast implementation partner that works best when structure is strong.

### Prompting rules
1. Give one sharp task at a time.
2. State constraints clearly.
3. Reuse mission language consistently.
4. Ask for file summaries after implementation.
5. Check screenshots after every major prompt.
6. Avoid mixing architecture, copy, QA, and polish in one huge pass unless the task is small.

### Good pattern
- mission file loaded
- scoped prompt
- implementation
- screenshot
- review
- next prompt

### Bad pattern
- giant vague dream prompt
- ten features at once
- no verification
- no checkpoint file
- confusion about current truth

---

## 14. Initial technical architecture

For V1, use only local app code and local data.

### Preferred structure
- `app/simulation/page.tsx`
- `components/simulation/...`
- `data/simulation/...`
- `types/simulation.ts`

### Data should be modeled for:
- member profile,
- timeline events,
- uploaded records,
- biomarker results,
- prioritized problems,
- interventions,
- tasks,
- adherence logs,
- clinician notes,
- AI insight cards,
- follow-up milestones.

### Architectural goal
Even though the data is mocked, it should be structured as if it could later be backed by a real database.

That means:
- clean types,
- reusable sections,
- modular components,
- and believable information architecture.

---

## 15. Phase plan

### Phase 0 — memory and foundation
- lock mission file,
- align repo truth,
- confirm route strategy.

### Phase 1 — `/simulation` scaffold
- create route,
- app shell,
- navigation,
- mock data,
- section components.

### Phase 2 — realism pass
- improve information hierarchy,
- tighten copy,
- make workflows more believable,
- improve biomarker interpretation surface,
- improve care execution surface.

### Phase 3 — AI layer pass
- refine AI copilot panels,
- make outputs feel data-grounded,
- add uncertainty/caution framing,
- ensure AI is operational, not theatrical.

### Phase 4 — founder polish
- sharpen narrative,
- reduce noise,
- check end-to-end flow,
- prep for outreach/demo sharing.

---

## 16. Definition of done for V1

V1 is done when:
- `/simulation` exists and is navigable,
- the experience feels like a believable product simulation,
- all six main product surfaces exist,
- the flagship member story feels coherent,
- AI is present in a mature way,
- the visual experience matches the existing site language,
- the app feels premium,
- and screenshots are strong enough to show externally.

V1 is **not** blocked by:
- auth,
- backend,
- persistence,
- real APIs,
- or live LLM integrations.

---

## 17. Final build reminder

This mission is not about building the largest app.
It is about building the **highest-signal simulation** in the time available.

The goal is not:
> “Look how many features I built.”

The goal is:
> “Look how clearly I understand the operating logic, product priorities, workflow bottlenecks, AI opportunities, and user experience required in this domain.”

That is what makes this proof of work valuable.

---

## 18. One-line summary

> Build a founder-convincing simulation of a flagship preventive-health operating system, using one realistic member, local structured mock data, premium restrained UI, and workflow-grounded AI — all framed as a product simulation built to think through FOXO’s world.
