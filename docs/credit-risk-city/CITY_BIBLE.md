# CITY BIBLE — Credit Risk City

Version 1.1 · 27 September 2026 · Owner: Claude (architect) · Builder: Astra · Player: Tharun
Repo: `tharungajula2/tharungajula` · Route: `/builds/credit-risk-city` · Lives at `docs/credit-risk-city/CITY_BIBLE.md`

This file is the single source of truth. Nobody changes the design silently. The builder proposes changes in its report, and the architect merges them into a new version of this file.

---

## 0. Purpose and the definition of "done"

**Purpose.** Make one person master the entire credit-risk ecosystem the way a business analyst (BA) must know it: every function, number, rule, system and hand-off, from foundations up. The JD is a seed, not the boundary.

**The one rule.** The engine is the product. Graphics serve memory and motivation, but they never carry the learning. A feature earns its place only if it makes the player **retrieve, decide, predict, or explain**. Reading alone never counts as progress.

**Measurable success (30 days after slice 1 goes live):**

1. Every Foundation (F) concept in the city is at `mastered` state (defined in §5.3).
2. The player explains all 15 load-bearing concepts aloud, cold, with no notes.
3. The player completes the full lifecycle case on a **new, randomly generated** borrower with no hints.
4. A Palace Walk (blank map, name what lives where and why) scores 100% on the F layer.

---

## 1. Learning science: the principles the engine enforces

| Principle | What the engine does |
|---|---|
| Retrieval practice | Every session is mostly answering from memory, not reading. |
| Spacing | Every item returns on a schedule (§5.2). Forgotten items come back sooner. |
| Interleaving | The Daily Round mixes districts and never shows two consecutive items from the same one. |
| Prediction (generation effect) | Before any consequence is revealed, the player commits a prediction. |
| Concrete → abstract | Each concept is met first inside a case, then named, then generalised. |
| Worked → faded → solo | Calculations appear first fully worked, then with blanks, then blank. |
| Elaboration / self-explanation | "Explain why" items; mastery needs explaining, not just picking. |
| Consequences | Decisions play forward in time through the simulation. Wrong decisions hurt the bank visibly. |
| Method of loci | Every concept has a permanent address in the city, and the case route walks the city in lifecycle order. |
| Confidence calibration | Each answer carries a 1–3 confidence. High-confidence errors are flagged and resurfaced sooner. |
| Desirable difficulty | New borrowers are generated fresh, so answers can't be memorised by position or wording. |

---

## 2. Scope model

Scope comes from the Task 1 inventory (22 domains), plus the architect's additions below. Every concept carries one depth layer:

- **F — Foundation:** explain and apply cold. **Slice 1 covers every F concept in every district.**
- **W — Working:** apply, specify, investigate or test on the job. This layer unlocks district by district after the F layer is mastered.
- **D — Deep:** know where it fits now; detail comes later.

**Architect's additions to the inventory:**

- **Capital covers unexpected loss.** The IRB calibration intuition: capital is set at a high confidence level (99.9%, one year) above expected loss, which provisions address. It is not a full description of every capital requirement. This is load-bearing. Add as F.
- **Rating master scale.** Internal grades map to PD bands, and external agency scales map to grades. Add as F/W.
- **Portfolio KPIs:** NPL ratio, provision coverage, cost of risk, slippage (with India's GNPA/NNPA as Embassy notes). Add as F. These are the numbers every credit committee reads. The sim uses honestly named teaching proxies (§6.7).
- **Funds transfer pricing in loan pricing.** Pricing = funding cost (FTP) + expected loss + capital charge + operating cost + margin. Add as W, linked to Treasury.
- **Credit spreads.** How a market prices default risk; the link to CVA. Add as W.
- **Employer-specific platforms** (INSIGHT, STARR) are removed from the city. The generic system functions stay.

**Rulebook stance.** The city's home code is **Basel + IFRS 9**. Amounts are in **₹ crore** so they feel concrete. Jurisdiction differences (India/RBI, UK/PRA, EU/CRR3, US/CECL) live in **Embassy Row** and appear as "Embassy notes" on relevant concepts. Every regulatory figure in content carries `source`, `asOf` and `verified` fields. Simulation parameters are labelled **illustrative** in the UI.

---

## 3. City Map v1 (the memory palace)

The walking order is the credit lifecycle first, then the bank-level view, then the machine underneath. Each district has one **landmark** (its 3D anchor), and each F concept has an **anchor object** placed at or around that landmark.

| # | District | Landmark | Holds (inventory domains) | Example anchors |
|---|---|---|---|---|
| 1 | The Mint | Coin press | 01 Banking & finance foundations | Balance-sheet scales, discount clock |
| 2 | Market Quarter | Street of homes, bazaar, towers | 02 Borrowers, products, exposure structure | Obligor → facility → account nesting boxes |
| 3 | The Branch | Bank branch with an analyst's desk | 03 Borrower analysis, 04 Origination & decisions | Cash-flow pipe, DSCR gauge, approval stamp |
| 4 | The Registry | Records hall | 07 Collateral, guarantees, legal | Haircut scissors, guarantee seal |
| 5 | The Watchtower | Tower with telescope on the streets | 05 Servicing, monitoring, early warning | DPD clock, watchlist board |
| 6 | Recovery Docks | Cranes and warehouses | 06 Distress, collections, recovery | Cure bridge, recovery cranes, write-off shredder |
| 7 | The Observatory | Domed observatory | 08 Measurement (PD, LGD, EAD, EL, UL, horizons) | PD telescope, LGD scale, EAD meter |
| 8 | Model Lab | Glass lab | 09 Models, statistics, validation | Scorecard machine, ROC curve wall |
| 9 | Trading Floor | Trading pit | 11 Counterparty credit risk | Swap see-saw, margin conveyor |
| 10 | Provision Vault | Vault with three doors (Stage 1, 2, 3) | 12 IFRS 9, 13 CECL, local provisioning | Stage doors, allowance tank |
| 11 | Capital Fortress | Walled fort | 14 Basel capital & prudential | Capital stack walls, RWA weights |
| 12 | Storm Centre | Weather station | 10 Portfolio & stress testing | Concentration pie, storm dial |
| 13 | The Port | Harbour with ships | 15 Risk transfer & securitisation | Tranche containers, waterfall locks |
| 14 | Reporting Tower | Clock tower | 16 Regulatory, financial & management reporting | Return templates, validation lamp |
| 15 | Engine Room | Underground, beneath the whole city | 17 Data & analytics, 18 Systems & controls | Lineage pipes, reconciliation gauges |
| 16 | Town Hall | Civic hall | 19 Governance, conduct, accountability | Three lines of defence, committee table |
| 17 | Embassy Row | Four embassies | 21 India/RBI, 22 Cross-jurisdiction | India, UK, EU, US embassies |
| 18 | BA Studio | The player's office (home base) | 20 BA craft | Requirement board, traceability thread, UAT bench |

**BA craft is everywhere.** Every district ends with a **BA Job** on what was just learned: write the requirement, map the data, write the acceptance test. The BA Studio is where those artefacts are collected and reviewed.

---

## 4. The core loops

### 4.1 Daily Round (the retention engine), about 10 minutes

- About 10 items: due items first, then up to 20% new items from the player's frontier, plus one Palace Walk item.
- Interleaved: never two consecutive items from the same district.
- The round ends with a one-line summary: what's due tomorrow, and which misses to watch.

### 4.2 The Case (the lifecycle simulation)

One borrower is followed through the whole credit lifecycle. The route physically walks the city in district order. Each step runs **Predict → Act → Consequence → Explain**.

Slice 1 case: **an SME auto-components maker** with a working-capital line and a term loan, secured on plant and receivables. Steps and their districts:

1. **Apply** (Market Quarter → Branch). Read the application and identify the obligor, facilities and exposure structure.
2. **Analyse** (Branch). Compute DSCR and working-capital cycle from the given statements, with worked → faded → solo progression.
3. **Decide & structure** (Branch → Registry). Approve or decline, set the limit, and choose collateral and covenants. Price the loan: FTP + EL + capital charge + opex + margin.
4. **Book — Day 1** (Observatory → Provision Vault → Capital Fortress). Predict first, then see Stage 1 ECL, RWA and capital consumed from the moment of booking.
5. **Monitor** (Watchtower). Months pass and early-warning signals appear. The player chooses actions.
6. **Slip** (Watchtower → Provision Vault). A SICR trigger fires. Predict the Stage 2 ECL jump before the reveal.
7. **Default** (Recovery Docks → Provision Vault). 90 DPD moves the loan to Stage 3, and borrower-level default hits the other facility.
8. **Recover** (Recovery Docks → Registry). Collateral sale proceeds, costs and time give the realised LGD.
9. **Write-off & feedback** (Recovery Docks → Model Lab). Write the balance off, post-write-off recovery arrives, and the outcome feeds back to policy and model.
10. **Report** (Reporting Tower → Engine Room). Watch the case's numbers appear in the allowance walk, Stage 3 ratio, capital ratio and a return, then trace one number back through lineage.
11. **BA Job** (BA Studio). Write the requirement, data mapping and UAT test for one rule the case exercised, such as the Stage 2 trigger.

**Replay.** The same case can be replayed with a freshly generated borrower (new numbers, different early warnings), so answers can't be memorised.

### 4.3 Missions

- **Build.** Assemble a piece of the bank: a credit policy, a staging rule, a data pipeline, a dashboard.
- **Break the Bank.** Reverse missions such as "push this loan into Stage 2", "make the capital ratio breach its minimum" or "create a concentration the limit framework flags". Achieved only by correct causal manipulation.
- **BA Job.** Described in §3.

Slice 1 ships 3 Break the Bank missions and the BA Job inside the case. Build missions come in slice 2.

### 4.4 Palace Walk

A blank city map. The player taps a district or anchor and must name the concept that lives there and say, in one line, why it matters. Also available as a reverse item: "Where does LGD live?"

---

## 5. Learning engine (pure TypeScript)

### 5.1 Item types (slice 1)

| Type | Player action | Correct when |
|---|---|---|
| `recall` | Type an answer from memory, then self-grade against key points | Ticked ≥ ceil(0.8 × key points) **and** every `essential` key point ticked |
| `choice` | Pick one of 3–5 options | Exact match |
| `predict` | Commit a prediction before a reveal | Matches the sim result (option or numeric tolerance) |
| `calculate` | Enter a number | Within tolerance (`abs` or `rel`, set per item) |
| `classify` | Sort items into buckets (e.g. Stage 1/2/3) | Score ≥ 0.8 (score = share placed correctly); below 0.8 counts as wrong, but the score is shown |
| `sequence` | Put steps in order | Score ≥ 0.8 (score = longest correctly ordered subsequence ÷ length) |
| `spot` | Find the error in a statement, table or requirement | Exact match |
| `explain` | Explain in own words | Same rule as `recall`. Grading goes through a `Grader` interface; slice 1 uses the self-grader, and an AI grader plugs in later with no engine change. |
| `anchor` | Palace Walk: name what lives here, or where X lives | Exact match |

Every answer also records a **confidence** of 1 (guess), 2 (unsure) or 3 (sure).

### 5.2 Scheduling (Leitner, deterministic)

- Boxes 0–5 with intervals of 0, 1, 3, 7, 16 and 35 days. `today` is always injected.
- **Correct on a first attempt:** the item moves up one box, and due = today + interval[new box].
- **Wrong:** the item drops to box 1 and is due tomorrow. It is also queued for an in-session retry after at least 2 other items.
- **In-session retries** never change the box and never count as recall evidence. They exist only to close the loop.
- **Hypercorrection** (confidence 3 and wrong) adds persistent obligations `extraDue = [today+1, today+3]`.
  - The item's effective due date = min(box due, earliest pending extraDue).
  - An obligation clears when the item is answered on or after its date, whatever the result.

### 5.3 Daily Round composition

- Up to 10 items: all due items (oldest first), then new items from the frontier until new items reach 20% of the round, then 1 `anchor` item.
- **Interleaving is best-effort.** The next item is chosen from a different district than the previous one whenever any eligible item from another district exists; otherwise the same district is allowed.
- A round with zero eligible items shows "Nothing due, play the case or a mission."

### 5.4 Contexts and evidence

Every answer is logged with a `context`:

- `round`
- `case:<caseId>:<seed>`
- `mission:<missionId>:<seed>`

Only case and mission contexts count as **application**. Two contexts are **distinct** if their full context ids differ, so the same case replayed with a new seed counts as a new context.

An answer is **cold** only when all three hold:

1. It is the first attempt at that item in the session.
2. No item linked to the same concept had its explanation revealed today.
3. The concept's previous review was at least 7 days earlier.

### 5.5 Concept mastery states

| State | Condition |
|---|---|
| `locked` | Some prerequisite is below `recalled` |
| `new` | Unlocked, never seen |
| `learning` | Seen at least once |
| `recalled` | At least one correct first-attempt answer of type `recall`, `explain`, `calculate` or `anchor` |
| `applied` | `recalled` **plus** a correct answer in a case or mission context |
| `mastered` | `applied` in ≥ 2 distinct application contexts **plus** a correct **cold** recall-type answer |

**Decay.** A wrong first-attempt answer on a `mastered` concept drops it to `recalled`, keeping its application history. A district's 3D state is the lowest state across its F concepts.

### 5.6 Progress export

"Export my progress" produces JSON containing:

- schema version and export date
- mastery per concept
- the 20 weakest items (lowest box, then most misses)
- hypercorrection items
- case outcomes

The player pastes this to the architect.

---

## 6. Simulation engine (pure TypeScript)

**Parameters.** Every parameter lives in `content/rules/*.ts` as a `RuleValue`:

```ts
{ value, label, illustrative: boolean, verified: boolean, source?, asOf? }
```

The UI shows an "Illustrative" tag next to any number derived from an illustrative rule.

**Randomness.** Only a seeded PRNG (mulberry32) is used. A run is fully reproducible from `(setup, seed, events)`.

### 6.1 Entities

- **Bank:** CET1, month index `m`, macro scenario, and cumulative P&L.
- **Borrower (obligor):**
  - segment (retail/SME/corporate)
  - grade, origination grade, `PD0` (12-month PD at origination)
  - `pd` (current 12-month PD)
  - arrears count `k` (0–4+), `defaulted` flag
  - watchlist flag, probation counters
- **Facility:**
  - `kind` ('term' | 'revolving'), `limit`, `drawn` (= gross carrying amount, GCA), `undrawn`
  - `rate` (contractual = EIR in slice 1), `ftp`, `remainingMonths`
  - `stage`, `allowance`, and `recoveryDueMonth` (set at default)
- **Collateral:** `value`, `haircut`, and `allocation` (facilityId → share). Shares per collateral must sum to ≤ 1. If none are given, the collateral is split pro-rata to facility EAD within the obligor.
- **Scenario:** a monthly PD multiplier path `macro[m]`, and a collateral value index `cvi[m]`.

### 6.2 Months, arrears and default (no overlapping buckets)

- Instalments fall due on day 1. DPD is measured at month-end.
- `k` = number of unpaid instalments, and DPD = 30k − 1 for k ≥ 1.
- The bucket follows from `k`:

| k | Bucket | DPD |
|---|---|---|
| 0 | Current | 0 |
| 1 | 1–30 | 29 |
| 2 | 31–60 | 59 |
| 3 | 61–90 | 89 |
| ≥ 4 | Default | > 90 |

**Default** = DPD > 90 (k ≥ 4), or a scripted unlikeliness-to-pay (UTP) event. Default is **borrower-level**: every facility of that obligor goes to Stage 3.

**Undrawn at default.** At default, undrawn commitments are cancelled (`undrawn = 0`).

**Current PD:**

$$pd = clamp(PD_{grade} \times macro[m],\ 0.0003,\ 0.999)$$

- The floor also applies to `PD0`, so `PD0` is never zero.
- Macro enters **only** through `pd`. The roll-rate matrix reads `pd`, never `macro` directly, so the macro effect is never counted twice.

**Roll-rate matrix (calibrated so realised behaviour matches `pd`).** Buckets b = 0…3 are transient; Default is absorbing. Each month, from bucket b:

- **miss** (b → b+1) with probability `q_b = min(0.95, s × w_b)`
- else **pay all arrears** (b → 0) with share `α_b` of the remaining probability
- else **pay this instalment only** (b stays)
- For b = 0, "not missing" simply stays at 0.

Illustrative shape parameters, which live in rules: `w = [1, 4, 8, 12]`, `α = [–, 0.5, 0.3, 0.2]`.

**Calibration.** The scalar `s` is found by bisection (60 iterations, tolerance 1e-9) so that the probability of absorbing into Default within 12 months, starting from Current, equals `pd`. This probability rises with `s`. If `pd` can't be reached at the 0.95 cap, use the cap and set `pdCapped = true`, which is logged.

**Rating migration** (generated borrowers only; case borrowers migrate only through scripted events):

- Downgrade one notch on first entry to k = 2.
- Restore to origination grade after 6 consecutive current months.

### 6.3 Monthly step: exact order

1. Set `macro[m]` and `cvi[m]`, then recompute `pd` for every borrower.
2. **Scheduled cash flows** for each non-defaulted facility:
   - Interest due = `drawn × rate / 12`.
   - Term loans: principal due = equal-principal instalment = `drawn / remainingMonths`.
   - Revolving: drawings and repayments only via events. Generated revolvers hold utilisation constant.
3. **Payment behaviour** comes from a scripted event if present, otherwise from a roll-rate draw.
   - **Pay-all:** clears all arrears.
   - **Pay-current:** pays this instalment only.
   - **Miss:** adds the instalment to arrears.
   - Unpaid interest accrues into `drawn` (GCA). Principal reduces only when paid.
   - `remainingMonths` decreases by 1 each month. If it reaches 0 with a balance outstanding, the balance is past due and handled through `k`.
4. Update `k`, the buckets and the borrower-level default status.
5. **Staging** (§6.4).
6. **Recovery and write-off**, for defaulted facilities where `m == recoveryDueMonth`:
   - Recovery cash = net collateral realisation (§6.5) is applied to `drawn`.
   - The remaining `drawn` is written off (`writeOff = drawn`, then `drawn = 0`).
7. **ECL** for every facility (§6.5). The closing allowance is set.
8. **Allowance walk** per facility: `Charge = Closing − Opening + WriteOffs`. Post-write-off recoveries (scripted) are separate P&L income.
9. **P&L:**
   - **Interest income:** EIR × GCA / 12 for Stages 1–2, and EIR × (GCA − allowance) / 12 for Stage 3. Stage 3 interest is recognised on the net amount.
   - **Funding cost** = `ftp × drawn / 12`.
   - **Opex** comes from rules, and may be 0.
   - **Net** = interest − funding − opex − charge + post-write-off recoveries.
   - CET1 += net. No tax or dividends in slice 1.
10. **RWA and CET1 ratio**, computed **after** the P&L update (§6.6).
11. KPIs (§6.7) and one event-log entry per change.

### 6.4 Staging (IFRS 9 teaching rules; thresholds illustrative and configurable)

**Stage 3:**

- **Enter:** in default.
- **Exit:** arrears fully cleared, **and** k = 0 for 3 consecutive months, **and** no active UTP event. The facility then moves to **Stage 2** (never directly to Stage 1), and the default flag clears.

**Stage 2:**

- **Enter:** not Stage 3, and any SICR trigger is true. The triggers are:
  - k ≥ 2 (DPD > 30)
  - `pd / PD0 ≥ 2.0`
  - watchlist flag (scripted)
- **Exit to Stage 1:** all SICR triggers false for 3 consecutive months.

**New facilities** start in Stage 1.

**Teaching note shown in the UI:** the sim compares 12-month PDs as a proxy for lifetime PD change. Real SICR assessment uses lifetime default risk, and a 12-month proxy is acceptable only where it approximates that.

### 6.5 ECL: exact formulas

Remaining life in years is `L = remainingMonths / 12` and may be fractional. If the balance is > 0 and `remainingMonths ≤ 0`, use `L = 1/12`. If the balance is 0 and there's no undrawn amount, ECL = 0.

**Periods.** Boundaries are `t_0 = 0`, `t_j = min(j, L)` for `j = 1…⌈L⌉`. The last period may be fractional.

**Default probabilities.** `h = pd` is the **annual conditional PD**: the probability of default within a year, given survival to its start.

$$S(t) = (1 - h)^{t} \qquad PD_j = S(t_{j-1}) - S(t_j) \qquad DF_j = (1 + EIR)^{-t_j}$$

This assumes default at the end of each period, a stated simplification.

**Exposure in period j**, taken at its start (a stated simplification):

- **Term loan:** the scheduled balance at `t_{j−1}` under equal-principal amortisation from the current `drawn`.
- **Revolving:** `EAD_j = drawn + CCF_acct × undrawn`, constant. `CCF_acct` is the **behavioural** CCF for accounting, kept separate from the regulatory `CCF_reg` in §6.6.

**Recoverable value at default** (per facility):

- Collateral value: `RV = value × cvi[m] × (1 − haircut) × share`.
- Unsecured recovery rate: `r_u`.
- Recovery costs: `C`, as a rate of EAD.
- Time to recovery: `τ` years.

$$NetRec_j = \max\big(0,\ \min(EAD_j, RV) + r_u \times \max(0, EAD_j - RV) - C \times EAD_j\big)$$

$$LGD_j = clamp\left(1 - \frac{NetRec_j \times (1+EIR)^{-\tau}}{EAD_j},\ 0,\ 1\right)$$

**Stage 1** covers defaults in the first min(1, L) years only:

$$ECL_{12m} = PD_1 \times LGD_1 \times EAD_1 \times DF_1$$

**Stage 2** covers the whole remaining life:

$$ECL_{life} = \sum_{j} PD_j \times LGD_j \times EAD_j \times DF_j$$

**Stage 3.** The loss is the **shortfall between the carrying amount and the present value of expected recoveries**. The loss is never discounted directly.

$$NetRec = \max\big(0,\ \min(GCA, RV) + r_u \times \max(0, GCA - RV) - C \times GCA\big)$$

$$ECL_{S3} = clamp\big(GCA - NetRec \times (1+EIR)^{-\tau_{rem}},\ 0,\ GCA\big)$$

Here `τ_rem = (recoveryDueMonth − m) / 12`, floored at 0.

**Test anchor:** GCA 100, NetRec 100, EIR 10%, τ_rem 1 gives ECL = 100 − 90.9091 = **9.0909**.

**Presentation.** The allowance on undrawn commitments is included in the facility's total allowance; the separate presentation of undrawn allowances is out of scope for slice 1.

### 6.6 Capital (standardised, illustrative)

- Regulatory exposure: `EAD_reg = max(0, drawn − allowance_if_Stage3) + CCF_reg × undrawn`.
- Risk weights come from the rules table by segment.
- **Defaulted exposures** use 150% if the Stage 3 allowance is < 20% of GCA, and 100% otherwise (Basel SA defaulted-exposure treatment, illustrative).
- No credit risk mitigation (CRM) recognition in slice 1; the UI states this.

$$RWA = \sum EAD_{reg} \times RW \qquad CET1\ ratio = \frac{CET1_{after\ P\&L}}{RWA}$$

If RWA = 0, the ratio is `null` and displays as "—".

Teaching statement (Capital Fortress): under the IRB approach, capital is calibrated to cover **unexpected** loss at a high confidence level while provisions address **expected** loss. This is the calibration intuition, not a complete description of every capital requirement (buffers, Pillar 2, the leverage ratio and others sit on top).

### 6.7 Portfolio KPIs (teaching proxies; named honestly)

- **Stage 3 ratio** = Stage 3 GCA ÷ total GCA. This is **not** "GNPA"; India's GNPA is defined under RBI IRAC norms and appears as an Embassy note.
- **Stage 3 coverage** = Stage 3 allowance ÷ Stage 3 GCA.
- **Cost of risk** = (Σ charge over elapsed months) × 12 ÷ elapsed months ÷ average total GCA over those months.
- Any zero denominator gives `null`, shown as "—".

### 6.8 Loan pricing build-up (Branch)

$$Rate = FTP + PD_{12m} \times LGD + \frac{RWA \times CET1_{target} \times Hurdle}{EAD} + Opex + Margin$$

Every term is shown separately to the player, all as annual rates.

### 6.9 What the sim must never do

- Present illustrative parameters as regulation.
- Merge accounting ECL and Basel regulatory EL into one number.
- Show any PD without its horizon.
- Discount a loss amount instead of recovery cash flows.

---

## 7. Content model (`content/types.ts`)

```ts
type Layer = 'F' | 'W' | 'D';
type DistrictId = 'mint' | 'market' | 'branch' | 'registry' | 'watchtower' | 'recovery'
  | 'observatory' | 'modellab' | 'trading' | 'vault' | 'fortress' | 'storm' | 'port'
  | 'reporting' | 'engineroom' | 'townhall' | 'embassy' | 'studio';

interface RuleValue<T = number> { value: T; label: string; illustrative: boolean; verified: boolean; source?: string; asOf?: string; }

interface District { id: DistrictId; order: number; name: string; landmark: string; purpose: string; colour: string; }

interface Concept {
  id: string; district: DistrictId; layer: Layer; name: string;
  oneLiner: string;            // ≤ 20 words
  explanation: string;         // short markdown, beginner-first
  whyItMatters: string;        // one line, BA-facing
  misconception?: string;
  anchor: string;              // 3D anchor id
  prerequisites: string[]; links: string[];
  embassy?: Partial<Record<'IN'|'UK'|'EU'|'US', string>>;
  sources?: { label: string; asOf: string }[];
  verified: boolean;
}

type KeyPoint = { text: string; essential: boolean };
type ItemPayload =
  | { type: 'recall' | 'explain'; keyPoints: KeyPoint[]; modelAnswer: string }
  | { type: 'choice' | 'spot'; options: string[]; answerIndex: number }
  | { type: 'predict'; options?: string[]; answerIndex?: number; numeric?: { tolerance: Tol }; bindTo: string } // bindTo = sim output key
  | { type: 'calculate'; answer: number; tolerance: Tol; unit: string; worked?: string[]; blanks?: number[] }
  | { type: 'classify'; buckets: string[]; entries: { text: string; bucket: number }[] }
  | { type: 'sequence'; steps: string[] }            // stored in correct order; UI shuffles with seed
  | { type: 'anchor'; mode: 'whatLivesHere' | 'whereDoesItLive'; anchor: string; options: string[]; answerIndex: number };
type Tol = { kind: 'abs' | 'rel'; value: number };

interface Item { id: string; conceptIds: string[]; prompt: string; payload: ItemPayload; explanation: string; difficulty: 1|2|3; placeholder?: boolean; }

type SimEvent =
  | { month: number; kind: 'payment'; facilityId: string; outcome: 'payAll' | 'payCurrent' | 'miss' }
  | { month: number; kind: 'draw' | 'repay'; facilityId: string; amount: number }
  | { month: number; kind: 'grade'; borrowerId: string; grade: string }
  | { month: number; kind: 'watchlist'; borrowerId: string; on: boolean }
  | { month: number; kind: 'utp'; borrowerId: string; on: boolean }
  | { month: number; kind: 'collateralIndex'; value: number }
  | { month: number; kind: 'recoveryDue'; facilityId: string; atMonth: number }
  | { month: number; kind: 'postWriteOffRecovery'; facilityId: string; amount: number };

interface SimSetup { bank: { cet1: number }; borrowers: BorrowerDef[]; facilities: FacilityDef[]; collateral: CollateralDef[]; scenarioId: string; }
interface CaseStep { id: string; district: DistrictId; kind: 'predict'|'act'|'reveal'|'explain'|'baJob'; itemIds: string[]; advanceMonths?: number; }
interface CaseDef { id: string; title: string; defaultSeed: number; setup: SimSetup; events: SimEvent[]; steps: CaseStep[]; generator?: string; }
interface MissionDef { id: string; kind: 'build'|'break'|'baJob'; title: string; setup: SimSetup; goal: MissionGoal; itemIds: string[]; }

interface ContentPack { version: string; districts: District[]; concepts: Concept[]; items: Item[]; cases: CaseDef[]; missions: MissionDef[]; rules: Record<string, RuleValue<unknown>>; }
```

**Entry point.** `content/index.ts` exports one `contentPack: ContentPack`.

**Validation.** `engine/validatePack.ts` checks referential integrity: every id referenced exists, prerequisites have no cycles, every district has ≥ 1 concept, every item has ≥ 1 concept, and allocation shares are ≤ 1. A Vitest test runs it on the shipped pack. The architect's content pack replaces files under `content/` and must pass the same validator, with no code changes.

**Ownership.** The architect writes all real content. The builder ships **placeholder content**, with `placeholder: true` on every item and `verified: false` on every concept: at most 2 concepts and 4 items per district, plus a placeholder SME case that exercises all 11 steps and every sim event type.

---

## 8. World (3D)

- **Stack:** React Three Fiber v9 + drei (React 19 compatible). Low-poly, procedural geometry only, with no model files. Instanced meshes wherever repeated.
- **Layout:** districts on a walkable ring in walking order, BA Studio at the centre, and the Engine Room shown as a translucent underground layer toggled from the HUD.
- **District visual states:**
  - `locked`: grey and flat.
  - `learning`: its district colour.
  - `mastered`: colour plus a soft glow and a small beacon.
- **Camera:** gentle limited orbit. Tapping a district flies the camera there (eased, about 800 ms). There is no free-roam walking.
- **Performance:** `dpr` capped at [1, 2] with adaptive DPR, no real-time shadows (baked-look shading), and the canvas pauses rendering when idle (`frameloop="demand"`). Target is 60 fps on a mid-range phone.
- **Fallback:** a **2D list view** of the same city, used when WebGL is unavailable and always reachable from the HUD. The whole game must be playable in 2D, which keeps the engine honest.
- **Look:** reuse the site's tokens (`--color-surface`, `--color-ink`, `--color-accent`, hairlines). District colours form a soft pastel set of 18 (defined in content), readable in light theme.

---

## 9. UI (2D panels over the world)

- **HUD (top):** today's date, streak, items due, and a mini bank dashboard showing CET1 ratio, total ECL and Stage 3 ratio.
- **Bottom sheet (mobile-first):** concept card, item player, case step and mission. On desktop it becomes a side panel.
- **Item player:**
  - One item at a time.
  - Confidence chips (1–3) before submitting.
  - Explanation shown after answering.
  - A reveal animation hook for `predict` items.
- **Case view:** a step ribbon (11 steps), the current district highlighted in 3D, and before/after numbers for every consequence.
- **Accessibility:** all actions work by keyboard, tap targets are at least 44 px, and animations respect `prefers-reduced-motion`.

---

## 10. Persistence

- A `StorageAdapter` interface (`load`, `save`, `export`, `import`) with a `localStorage` implementation and a schema `version` field plus migrations.
- All reads and writes are wrapped in try/catch, and the game still starts when storage is empty or corrupt.
- Cloud sync is a later slice via a second adapter (Supabase). No engine changes are allowed for that.

---

## 11. Architecture and file paths

```
app/builds/page.tsx                         Builds index (flagship builds, cards)
app/builds/credit-risk-city/page.tsx        Server shell + metadata; renders client loader
features/credit-risk-city/
  CityApp.tsx                               Client root ('use client'), loaded via next/dynamic ssr:false
  engine/
    sim/  (prng.ts, rollrates.ts, ecl.ts, staging.ts, capital.ts, pnl.ts, step.ts, kpis.ts, pricing.ts)
    learning/ (scheduler.ts, mastery.ts, round.ts, grading.ts, export.ts)
    index.ts
    __tests__/                              Vitest, hand-calculated expected values
  content/
    types.ts, districts.ts
    concepts/<district>.ts, items/<district>.ts, cases/sme-auto-parts.ts, missions/*.ts
    rules/ (staging.ts, riskweights.ts, rollrates.ts, pricing.ts, scenarios.ts)
  state/store.ts                            zustand; engine state + UI state
  storage/ (adapter.ts, local.ts)
  world/  (CityCanvas.tsx, District.tsx, Anchors.tsx, CameraRig.tsx, layout.ts)
  ui/     (Hud.tsx, Sheet.tsx, ItemPlayer.tsx, CaseView.tsx, ConceptCard.tsx, ListCity.tsx, PalaceWalk.tsx)
docs/credit-risk-city/CITY_BIBLE.md         This file
```

**Hard rules:**

- `engine/` imports nothing from React, Three, Next or the DOM. A Vitest test scans `engine/**` imports and fails on any violation.
- `engine/` never reads the clock or `Math.random`. Time and seed are always injected.
- Content is data only: no logic in `content/` beyond typed constants.

**Dependencies to add:** `three`, `@react-three/fiber@^9`, `@react-three/drei`, `zustand`; dev: `vitest`, `@types/three`. Add the script `"test": "vitest run"`.

### Site changes (ship in Pass 1)

- **Vault removed.**
  - Delete `app/vault/`, `components/vault/` and `components/hive/VaultEntry.tsx` (the last is unused elsewhere).
  - Add a permanent redirect `/vault` → `/builds` in `next.config.ts`.
- **Navigation.**
  - The nav reads **Agent · Builds · Connect**.
  - In `app/ClientLayout.tsx`, "Builds" is active for any path starting with `/builds`.
  - The Agent fallback logic must not treat `/builds/*` as Agent.
- **Builds index.** `app/builds/page.tsx` follows the site's design language: a heading, a one-line intro, and a card for Credit Risk City (title, one-line description, status "In development", link).
- **Sitemap.** `/vault` is replaced by `/builds`.
- **City page.** It needs a full-bleed stage under the fixed header: the page uses a fixed container from below the header to the bottom of the viewport, escaping the layout padding. No changes to other pages.

---

## 12. Build passes

**Pass 1 — Engine + site + 2D playable** (no 3D yet):

- Site changes (§11).
- The full engine (§5, §6) with tests.
- Content types, placeholder content, and the case definition skeleton.
- Store, storage and the 2D UI (`ListCity`, `ItemPlayer`, `CaseView`, `Hud`).

**Done when:** the Daily Round and the full 11-step case are playable in 2D on the live site.

**Pass 2 — The 3D city:** world, camera, district states, anchors and Palace Walk, wired to the same store.

**Done when:** everything in Pass 1 is playable from the 3D city, and the 2D view still works.

**Scope note:** "Slice 1" = Passes 1–3 together. Pass 1 proves every mechanic with placeholder content. F-layer coverage arrives with the Pass 3 content pack.

**Pass 3 — The architect's content pack drops in:**

- All F concepts and items across 18 districts.
- The real SME case.
- 3 Break the Bank missions.
- An `explain` grader interface, with an AI grader through a server route.

### Validation (every pass, in the builder's own environment)

- `npm run lint`, `npx tsc --noEmit`, `npm run test` and `npm run build` must all be clean.
- The report lists actual results. Nothing may be claimed that wasn't run.

---

## 13. Rules for the builder

1. Build exactly this spec. Put any disagreement under **Proposed changes** in the report, and don't implement it.
2. Never invent regulatory figures or learning content. Use placeholders marked `PLACEHOLDER`.
3. Deliver a ZIP with exact repo paths, plus a manifest of files (added, changed, deleted) and the validation results.
4. Keep files small and single-purpose.
5. Engine purity and determinism are non-negotiable (§11).
6. Anything that will be run by the player's IDE agent must never start a dev server or open a browser.

---

## 14. Change log

- **v1.0 (27 Sep 2026):** first version. City Map v1 built from the Task 1 inventory plus the architect's additions.
- **v1.1 (27 Sep 2026):** resolves all seven builder red-team items.
  1. Stage 3 = GCA − PV of recoveries (no discounting of loss).
  2. Fractional life, annual conditional PD, defined EAD paths, maturity edge cases.
  3. Non-overlapping DPD buckets, SICR-resolved Stage 2 cure, Stage 3 cure via Stage 2, PD floor.
  4. Full monthly order, roll-rate calibration by bisection so macro counts once, shared collateral, CET1 ratio after P&L, Stage 3 interest on net.
  5. Honest KPI names (Stage 3 ratio, not GNPA), UL statement qualified, cost-of-risk annualisation and null denominators.
  6. Interleaving best-effort, pass thresholds, persistent hypercorrection, contexts, cold-recall definition, mastery needing recall and application.
  7. `verified` on rules, item payload and sim event unions, `ContentPack` entry point and validator, slice-scope note.
- **v1.2 (27 Sep 2026):** records what Pass 1 and Pass 2 actually built. The orchestration changes: Claude builds and checks; the IDE agent (Antigravity) does install, validation and push only; the player is the visual checker.
  1. **Arrears per facility, default per borrower.** `k` is tracked per facility (payments are per facility); default and cure are judged at borrower level (any facility `k ≥ 4` or UTP defaults every facility of the borrower).
  2. **Effective monthly rate.** Accrual, income and funding use `(1 + r)^(1/12) − 1`, so monthly accrual is consistent with annual discounting in §6.5.
  3. **Stage 3 interest.** Gross interest keeps accruing on the balance; income is recognised on the net amount; the difference goes straight to the allowance as an interest adjustment. Allowance walk: `Charge = Closing − Opening − InterestAdj + WriteOffs`. A quiet Stage 3 month has zero impairment charge when recoveries don't depend on the balance (tested).
  4. **Defaulted facilities** get no new instalments; only a scripted `payAll` clears arrears (and starts the Stage 3 probation).
  5. **Probation counting.** The month arrears are cleared (or triggers clear) counts as the first clean month.
  6. **Worked examples.** Opening a calculate item's worked example means that answer earns no recall credit.
  7. **Daily Round** excludes case-bound `predict` items; the anchor item goes last.
  8. **Pass 2 world.** 17 districts on a ring (radius 46) in walking order starting nearest the camera, BA Studio at the centre, ring road with spurs, harbours behind Recovery Docks and The Port, 140 instanced trees, Engine Room pipes beneath the city (toggle), a borrower van that drives to the current case step. Mastery shows per concept (anchor orbs: white new, colour learning, accent recalled/applied, gold mastered) and per district (grey and flat when locked; gold beacon when mastered). A diamond marks districts with items due.
  9. **Pass 2 panels.** Home, district (concept cards; "Practise here" = due + new items of that district only, never early reviews, never counts toward the streak), Daily Round (camera follows each item's district), Case, Palace Walk (labels hidden; alternating tap-the-map and name-what-lives-here; practice only, no schedule change), Progress. Bottom sheet on phones (collapsible), side panel on desktop. The 2D list is one tap away and is the automatic fallback without WebGL.
- **v1.3 (27 Sep 2026):** content batch 1 and three learning-engine changes.
  1. **Content batch 1 (districts 1–6, the lifecycle route):** 26 real concepts and 66 real items (anchor 6, recall 16, calculate 13, choice 14, classify 7, spot 7, sequence 3), one file per district under `content/concepts/` and `content/items/`. Districts 7–18 and the SME case stay placeholders (`placeholder: true`). Concepts are `verified: false` until checked line by line against primary sources; the UI says so honestly.
  2. **Content quality gates (tests):** every real district has ≥ 4 concepts and exactly one anchor item; every real concept has ≥ 2 items including at least one recall-type item (otherwise it could never reach `recalled`); prompts and option sets are unique; anchor answers match the concept or district that lives there.
  3. **New items per round:** at least 20% of the round, and new items fill empty slots up to 5 when little is due (was a flat 2, which left a new player with a near-empty round).
  4. **New-item order:** one question per concept first (walking order), then second questions — so a round introduces several ideas across districts instead of drilling one.
  5. **Interleave:** each step takes from the district with the most items left other than the previous one, keeping each district's due order; no back-to-back district when avoidable.
  6. **District state:** a district is grey (locked) only when every concept in it is locked; otherwise it shows the lowest state among its open concepts.
  7. **World framing:** the overview camera distance is computed from the canvas aspect so the whole ring fits on any screen; the canvas never sits under the side panel (desktop) and shrinks above the open bottom sheet (phone).
- **v1.4 (27 Sep 2026):** content batch 2, the risk-numbers route.
  1. **Districts 7, 8, 10, 11 real:** Observatory (PD, LGD, EAD/CCF, EL, UL, PIT vs TTC, lifetime PD), Model Lab (scorecards, discrimination vs calibration, AUC/Gini, validation and model risk, PSI), Provision Vault (stages, SICR, ECL measurement, scenarios and overlays, allowance walk, IFRS 9 vs CECL), Capital Fortress (provisions vs capital, RWA and ratio, capital stack, SA vs IRB, leverage ratio, three pillars). 24 concepts, 55 items. Running total: 50 real concepts, 121 real items across 10 districts.
  2. **Prerequisites chain across the route** (e.g. LGD ← realised loss; EL ← PD + LGD; SICR ← stages + DPD; capital stack ← RWA), so the city unlocks in lifecycle order.
  3. **Coverage line** on the home panel and 2D header is derived from the content (`content/coverage.ts`), never hard-coded.
  4. Figures stated as teaching facts: Basel III minimums 4.5/6/8% + 2.5% conservation buffer; leverage 3%; output floor 72.5%; IRB 99.9% one-year calibration intuition; IFRS 9 30-DPD SICR backstop (rebuttable); RBI CET1 5.5%, Tier 1 7%, CRAR 9%, leverage 4% (D-SIBs) / 3.5%; RBI ECL for banks scheduled from 1 April 2027; SR 26-2 replacing SR 11-7. All concepts remain `verified: false` until checked line by line against primary sources.
