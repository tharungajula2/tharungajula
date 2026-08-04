---
title: "Retail Credit Risk and Modelling"
subtitle: "How a lender decides, prices, provisions and capitalises millions of loans it will never individually judge"
spine: "Retail credit risk replaces judgement about one borrower with measurement of many, so every decision downstream is a bet on a rate rather than on a person."
date: 2026-08-04
slug: "retail-credit-risk-and-modelling"
archetype: system
tags: [credit-risk, retail-banking, scorecards, ifrs9, cecl, basel, pd-lgd-ead, model-risk]
readingTime: 55
passes: [55, 75, 25]
prerequisites: ["basic probability", "natural logarithms", "reading a table of percentages"]
series: "Risk Systems"
seriesOrder: 1
status: draft
---

# Retail Credit Risk and Modelling

### How a lender decides, prices, provisions and capitalises millions of loans it will never individually judge

> Retail credit risk is the discipline of replacing a judgement about one borrower with a measurement of many: nobody can know whether *this* account will default, but anyone with enough history can know what fraction of accounts like it will — and every decision the lender makes, from approve to price to provision to collect, is built on that fraction.

---

# HOW TO READ THIS

| Pass | What you do | Budget |
|---|---|---|
| 1 · Understand | Read the prose only. Skip every callout, table and worked example. You are after the shape of the system: where the numbers come from and who consumes them. | 55 min |
| 2 · Verify | Reproduce every 🧮 WORKED calculation by hand, on paper, with a calculator. If a number does not come out, the misunderstanding is yours or the note's — find out which. | 75 min |
| 3 · Recall | §1, §17, §18, §19 only. Numbers, traps, self-test, formulas. Repeat until §18 tier 1 is instant. | 25 min |

---

# §1 · THE NUMBERS

**These are the constants and conventional ranges that the rest of the subject is built on; where a figure is a rule of thumb rather than a rule, the row says so.**

| Quantity | Value | Why it matters |
|---|---|---|
| Default definition | 90 days past due (DPD), or "unlikeliness to pay" | Every probability of default (PD) model is a model of *this event*; change the definition and every number in the bank moves |
| Basel capital confidence level | 99.9% over one year | Regulatory capital is sized to survive a loss year that recurs about once in a thousand years |
| Asset correlation, residential mortgage | R = 0.15, fixed | Mortgages are assumed to default together; correlation drives capital more than PD does |
| Asset correlation, qualifying revolving (cards) | R = 0.04, fixed | Card defaults are assumed near-idiosyncratic, so capital per unit of expected loss is low |
| Asset correlation, other retail | R = 0.03 to 0.16, falling as PD rises | The only retail class where correlation is PD-dependent |
| Regulatory PD floor, retail | 0.05% (0.03% under the earlier Basel II text) | No retail exposure may be modelled as riskless |
| Regulatory loss-given-default (LGD) floors | ≈5% residential mortgage, ≈30% unsecured retail | Stops capital being minimised by optimistic recovery assumptions |
| RWA multiplier | 12.5 | Converts a capital requirement K into risk-weighted assets; it is 1 ÷ 0.08 |
| Minimum total capital ratio | 8% of risk-weighted assets | The constant that 12.5 inverts; buffers sit on top of it |
| Application scorecard Gini | 0.35–0.55 (rule of thumb) | At origination you have thin data; this is the realistic ceiling |
| Behavioural scorecard Gini | 0.60–0.80 (rule of thumb) | Watching an account pay for six months beats anything on the application form |
| Gini ↔ AUC | Gini = 2 × AUC − 1 | Two names for one measurement; papers use AUC, lenders use Gini |
| Population Stability Index (PSI) bands | <0.10 stable · 0.10–0.25 investigate · >0.25 shifted | The first alarm that fires when a model is going wrong |
| Information Value (IV) bands | <0.02 useless · 0.02–0.1 weak · 0.1–0.3 medium · 0.3–0.5 strong · >0.5 suspect leakage | A variable that looks too good is usually a consequence of default, not a cause |
| Minimum bin size in binning | 5% of the development sample per bin (convention) | Below this, the bin's estimated odds are noise |
| Points to double the odds (PDO) | 20 points (convention) | Arbitrary, universal, and the reason 620 means what it means |
| Outcome window | 12–18 months unsecured, 24+ months mortgage | Too short and you miss defaults; too long and the model is stale on release |
| LGD, credit card | 70–90% (rule of thumb) | Unsecured recoveries are pennies; the loss is nearly the balance |
| LGD, residential mortgage | 10–25% benign, materially higher in downturn | Collateral works until house prices fall, which is exactly when defaults rise |
| Credit conversion factor (CCF), card undrawn limit | 50–75% (rule of thumb) | Borrowers draw down hard before they default; exposure at default exceeds today's balance |
| IFRS 9 significant-increase-in-credit-risk backstop | 30 DPD, rebuttable | The trigger that moves an account from 12-month to lifetime loss allowance |
| IFRS 9 / CECL default backstop | 90 DPD, rebuttable | Aligns accounting default with regulatory default in most books |
| Lifetime ÷ 12-month expected credit loss | 2–10× for a multi-year term loan | The size of the provision jump when an account migrates stage |
| Card vintage delinquency peak | 9–18 months on book | Loss emerges on a clock that starts at origination, not in January |
| Mortgage default peak | Years 3–5 after origination | Long fuse; a mortgage book's problems arrive after the strategy that caused them has been forgotten |
| Adverse action reasons (US Regulation B) | Up to 4 principal reasons must be given | A legal constraint that shapes which model forms are usable |

**You can now:**
- Quote the default definition, the Basel confidence level and the three retail correlations without looking them up.
- Recognise when a claimed Gini or LGD is outside the plausible range for its product.

---

# §2 · THE MAP

**Retail credit risk is one data layer feeding three decision points, which produce three risk parameters, which are consumed by three different businesses — pricing, provisioning and capital — each of which wants the same parameters calibrated differently.**

```
                          DATA
   application form | credit bureau | own-account
        behaviour   | macroeconomy  | collateral
                           |
      +--------------------+--------------------+
      v                    v                    v
  [ ACQUIRE ]          [ MANAGE ]           [ COLLECT ]
  apply / score /      limit / renew /      contact /
  approve / price ---> re-price / block --> arrange / sell
      |                    |                    |
  application          behavioural          collections
  scorecard            scorecard            score
      +--------------------+--------------------+
                           v
              PD   x   LGD   x   EAD   =   EL
             (odds)   (severity) (exposure)
                           |
        same three parameters, three calibrations
      +--------------------+--------------------+
      v                    v                    v
   PRICING            PROVISIONS             CAPITAL
   expected profit,   IFRS 9 / CECL          Basel IRB
   RAROC, limits      (P&L this quarter)     (unexpected
                                              loss @ 99.9%)
      +--------------------+--------------------+
                           v
        MONITOR: Gini | PSI | vintage | backtest
                           |
                           +---> redevelop ---> DATA
```

Three structural facts hold the diagram together. First, the three parameters are estimated once conceptually but calibrated three times numerically, because pricing wants today's odds, accounting wants today's odds plus a macroeconomic forecast, and capital wants a long-run average stressed to a downturn. Second, the loop is *censored*: outcomes are observed only on accounts that were approved, so the data that trains tomorrow's model was selected by today's. Third, retail differs from corporate lending not in kind but in number — a single retail exposure is too small to justify individual analysis, so the unit of management is the segment, and the skill is in the cut-off rather than in the case.

📘 **DEFINE — Retail exposure**
An exposure to an individual or a very small business, small enough relative to the lender that it is managed as one of a large pool of similar exposures rather than assessed individually. Regulators formalise this: to qualify as retail, an exposure must be to a natural person or small business, must be one of a large number of similarly managed exposures, and typically must fall below a size threshold (commonly €1m for small-business exposures under Basel). The consequence is statistical: because exposures are homogeneous and numerous, the law of large numbers applies to the *rate* of default even though each individual outcome is unknowable. Everything in this note follows from that one property.

**You can now:**
- Draw the whole system from memory: data → three decisions → three parameters → three consumers → monitoring → back to data.
- Explain why the same PD number is not the same number in a pricing model, a provision model and a capital model.

---

# §3 · THE LOSS EQUATION

**Every number in retail credit risk is either an input to expected loss, an output of it, or a check on it.**

Expected loss is the product of three independent questions asked about the same account. Will it default? If it does, what fraction of the amount owed will never be recovered? And how much will be owed at that moment, which is not the same as how much is owed now. Multiply the three and you have the average loss you should expect from an account of this type, per year or per lifetime depending on the horizon of the PD.

$$EL = PD \times LGD \times EAD$$

- $EL$ — expected loss, in currency: the mean loss over many accounts like this one.
- $PD$ — probability of default, a number between 0 and 1, for a stated horizon (usually 12 months).
- $LGD$ — loss given default, the fraction of exposure not recovered after costs and discounting.
- $EAD$ — exposure at default, the currency amount outstanding at the moment default occurs.

The word *expected* is doing heavy lifting. Expected loss is a mean, and no individual account ever experiences it: an account either defaults or it does not. A £10,000 loan with a 4% PD and a 75% LGD has an expected loss of £300, but the actual loss is either £0 (96% of the time) or roughly £7,500 (4% of the time). The £300 is a price, not a prediction.

🧮 **WORKED — Expected loss on one loan and on a portfolio of a thousand**

| Step | Calculation | Result |
|---|---|---|
| 1. Exposure at default | Balance 9,000 + 25% of the 4,000 undrawn | 10,000 |
| 2. Probability of default (12m) | From the scorecard | 0.04 |
| 3. Loss given default | 1 − 25% recovery | 0.75 |
| 4. Expected loss, one account | 0.04 × 0.75 × 10,000 | **300** |
| 5. Portfolio of 1,000 such accounts | 1,000 × 300 | **300,000** |
| 6. Expected number of defaults | 1,000 × 0.04 | 40 |
| 7. Loss per defaulting account | 0.75 × 10,000 | 7,500 |
| 8. Check: 40 × 7,500 | Must equal step 5 | **300,000 ✓** |

Two things follow immediately. Expected loss is a cost of doing business, so it belongs in the price, not in the capital: a lender that charges enough margin to cover £300 per loan is not taking risk on the average, it is taking risk on the *variation around* the average. That variation is unexpected loss, and it is the thing capital exists for.

🔍 **WHY THIS IS TRUE — Capital covers only the surprise**
The natural assumption is that capital is held against losses. It is not; it is held against losses *beyond those already paid for*. Expected loss is charged to customers in the interest rate and recognised in the accounts as a provision, so by the time a loss arrives at its expected size, it has already been funded twice over. What can destroy a bank is a year in which realised losses are three or five times the expected level, because nothing has been set aside for the excess. This is why the Basel formula, which you will meet in §12, subtracts PD before multiplying by LGD: the capital number is the 99.9th-percentile loss *minus* the mean, and a bank that confused the two would hold roughly double the capital it needs on a mortgage book and be unable to explain why.

⚖️ **TRADE-OFF — Where you put conservatism**
Conservatism has to live in one of the three parameters, and the choice is not neutral. Padding PD raises expected loss *and* capital, and it changes who gets approved, because PD drives the cut-off. Padding LGD raises expected loss and capital roughly proportionally but leaves the approve/decline ranking untouched, since LGD rarely varies much within a product. Padding EAD raises everything and also distorts limit-setting. The usual resolution is to keep PD as unbiased as the data allows and place regulatory conservatism in LGD and EAD, so that the ranking used for decisions stays clean.

► **IN ONE LINE** — Expected loss is a price; unexpected loss is a risk; confusing the two is the single most expensive error in the subject.

**You can now:**
- Compute expected loss for an account and a portfolio and check the two against each other.
- Say precisely why expected loss belongs in pricing and provisions while unexpected loss belongs in capital.

---

# §4 · WHAT "DEFAULT" MEANS

**PD is not a probability of loss, it is a probability of a defined event, and the definition is a policy choice with consequences everywhere.**

The industry standard event is 90 days past due: the account has missed the equivalent of three contractual monthly payments. Regulators add a second, judgemental limb — *unlikeliness to pay* — which captures accounts that are not yet 90 days down but where the lender has already conceded loss: bankruptcy filing, a distressed restructuring that reduces the amount owed, sale of the debt at a material discount, or the account being placed on non-accrual. An account is in default if either limb is met. Both limbs matter, because a bank that only counted days past due would show a suspiciously clean book while restructuring its way out of trouble.

Days past due sound simple and are not. The count restarts, pauses or continues depending on how partial payments are treated, and a borrower who pays half the instalment every month can either roll steadily to 90 days or sit forever at 30 days, depending on the rule. Most books define the arrears balance in units of contractual instalments and count a bucket as passed only when the shortfall exceeds one full instalment, sometimes with a materiality threshold — a common regulatory version is that arrears must exceed both a small absolute amount and 1% of the exposure before the clock runs.

📘 **DEFINE — Delinquency buckets**
The standard partition of an arrears book by how far behind the borrower has fallen, in 30-day steps: *current* (nothing overdue), *1–29 DPD*, *30–59*, *60–89*, *90+*. Accounts move between buckets monthly, and the whole of portfolio management can be read as an attempt to control those movements. The buckets are conventional rather than natural — nothing changes about a borrower on the 30th day — but they are near-universal, so roll rates, provisions and reporting are all expressed in them. The 90+ bucket is special because it is the default bucket in most definitions, which means the boundary between 60–89 and 90+ is not a step on a ladder but the edge of a cliff.

Default is not the same as loss, because accounts *cure*. A borrower who reaches 90 days past due and then repays the arrears and returns to a performing schedule has defaulted and produced no loss at all. Cure rates are high enough to change everything: on secured lending they commonly run at a third to a half of defaults, and on unsecured they are lower but far from zero. This is why LGD is measured on defaulted accounts rather than assumed to be one, and why regulators impose a probation period — typically 12 months of performance, longer for restructured exposures — before an account can be reclassified out of default.

🔴 **TRAP — "We tightened the default definition, so risk fell"**
The wrong belief is that a stricter definition of default reduces risk. It does not; it relocates it. Move the default point from 90 days to 180 days and PD falls, but LGD rises, because the accounts you have excluded were the ones most likely to cure, and the remaining defaulters are a worse population. Expected loss, which is the product, is roughly unchanged. The correction is that PD is only interpretable alongside the definition that generated it, and comparing a PD built on a 90-day definition with one built on 180 days is meaningless arithmetic.

✅ **CHECK — Definition consistency**
Take the default flag used to build the model, the flag used to select accounts into Stage 3 for accounting, and the flag used in regulatory reporting, and run all three over the same month of data. Pass condition: the three populations agree to within a few percent, and every disagreement is explained by a documented rule rather than discovered on the day. If they do not agree, the bank's PD, its provisions and its capital are describing three different events, and no reconciliation of the three numbers will ever close.

**You can now:**
- State both limbs of the default definition and explain why the second exists.
- Predict what happens to PD, LGD and EL when the default point is moved.
- Explain a cure and why cure rates force LGD to be modelled rather than assumed.

---

# §5 · WINDOWS, VINTAGES AND THE SHAPE OF THE DATA

**A credit model is trained on a photograph of the past taken at one moment and a verdict delivered some months later, and almost every serious modelling error is an error in choosing those two moments.**

The photograph is the *observation point*: a date at which you freeze everything known about an account — application data, bureau data, balances, payment history. The verdict is the *outcome window*: a fixed period after the observation point during which you watch for the default event. An account that hits 90 DPD at any time inside the window is a *bad*; one that never does is a *good*. The model learns the relationship between the photograph and the verdict, and it can only ever predict over the window length it was trained on.

Window length is a genuine trade-off rather than a technical detail. Twelve months is the standard for unsecured lending because it captures most of the emergence and keeps the development sample recent. Mortgages need 24 months or more, because their defaults arrive slowly. But a long window means the most recent observation point available is that far in the past, so a model trained on a 24-month window is built on applicants from at least two years ago, and it inherits their economy and their competitive environment.

🔍 **WHY THIS IS TRUE — Loss runs on vintage time, not calendar time**
Read a portfolio by calendar month and you will see the delinquency rate rise and fall and blame the economy. Read it by *vintage* — grouping accounts by the month they were opened and measuring their performance by months-on-book — and something else appears: nearly every retail portfolio has a characteristic hump. Bad rates start near zero (nobody defaults in month one), climb steeply to a peak somewhere between 9 and 18 months for unsecured products, then flatten as the surviving population self-selects toward good payers. A calendar-time chart mixes vintages at different points on that hump, so a book that is growing fast looks better than it is, simply because it is full of young accounts that have not had time to fail. The economy is real, but seasoning explains more month-to-month movement than the economy does, and separating the two is the first job of portfolio analysis.

📘 **DEFINE — Indeterminates**
Accounts whose outcome is neither clearly good nor clearly bad within the window: typically those that reached 30 or 60 DPD but never 90, or that closed early for reasons unrelated to credit. They are usually excluded from scorecard development, on the reasoning that including them as goods teaches the model that near-misses are fine, and including them as bads teaches it that a single late payment is fatal. Exclusion is not free — a large indeterminate population means the model is trained on a sharpened version of reality and its predicted odds need recalibrating back onto the full population. The rule of thumb is that indeterminates above roughly 5–10% of the sample deserve a written justification rather than a default exclusion.

Three sampling decisions follow. First, the sample must be drawn at a *point in time* or over a band of adjacent months, not pooled across years, or the model will fit the economy rather than the borrower. Second, bads are rare — a 4% bad rate means 96 rows of noise for every 4 rows of signal — so they are often kept in full while goods are randomly sampled down, which speeds estimation but shifts the intercept and requires a correction. Third, the sample must be a *snapshot of accounts*, not of applications, unless the model's job is to score applications.

$$\beta_0^{corrected} = \hat{\beta}_0 - \ln\left(\frac{\rho_1}{\rho_0}\right)$$

- $\hat{\beta}_0$ — the intercept estimated on the oversampled data.
- $\rho_1$ — the sampling fraction applied to bads (usually 1, meaning all were kept).
- $\rho_0$ — the sampling fraction applied to goods (for example 0.1 if one in ten was kept).
- Only the intercept moves; the slope coefficients are unaffected by this kind of sampling, which is why the trick is safe.

✅ **CHECK — Is the outcome window long enough?**
Plot the cumulative bad rate for a mature vintage against months-on-book. Pass condition: at the chosen window length, the curve has flattened enough that extending it by six more months would add less than about 10% to the cumulative bad rate. If the curve is still climbing steeply at the cut-off, the window is short, the model is being trained on early defaulters only, and it will rank fraud and severe distress well while ranking ordinary credit deterioration poorly.

**You can now:**
- Design an observation point and outcome window for a given product and defend the length.
- Explain a vintage curve and why calendar-time delinquency flatters a growing book.
- Correct the intercept of a model fitted on an oversampled sample.

---

# §6 · BUILDING A SCORECARD

**A scorecard is a logistic regression on transformed variables, converted into integer points, and almost all of the craft is in the transformation rather than the regression.**

Start with the target. You have a table of accounts, one row each, with a binary flag from §5 — bad or good — and a few hundred candidate variables: age, income, time at address, time with bank, bureau attributes such as the number of active credit lines, the utilisation of revolving limits, the number of recent credit searches, and any prior defaults or public records. The model must estimate the log-odds of being bad as a linear function of these, which is what logistic regression does.

$$\ln\left(\frac{p}{1-p}\right) = \beta_0 + \beta_1 x_1 + \dots + \beta_k x_k$$

- $p$ — probability that the account is bad within the outcome window.
- $\frac{p}{1-p}$ — the odds of being bad; note carefully that lenders conventionally quote *good:bad* odds, which is the reciprocal.
- $\beta_0$ — intercept, setting the overall level of risk.
- $\beta_i$ — coefficient on the $i$-th variable, the change in log-odds per unit of $x_i$.

Raw variables go in badly. Income is skewed, age is non-monotonic in risk (the young are risky through inexperience, the very old through fixed income), missing values are informative rather than absent, and outliers drag coefficients. The industry answer is to *bin* every variable into a handful of ranges and replace each range by a single number that encodes its riskiness: the weight of evidence.

## Weight of evidence and information value

Binning happens in two stages. *Fine classing* cuts the variable into twenty or so narrow bins and plots the bad rate of each. *Coarse classing* merges adjacent bins until the pattern is monotonic or at least defensible, every bin holds at least about 5% of the sample, and each bin's bad rate is meaningfully different from its neighbours'. Missing values usually become their own bin, because "declined to state income" is a fact about the applicant.

$$WOE_i = \ln\left(\frac{g_i / G}{b_i / B}\right)$$

- $g_i, b_i$ — count of goods and bads in bin $i$.
- $G, B$ — total goods and total bads in the sample.
- A positive weight of evidence means the bin holds proportionally more goods than the book average, so it is *safer* than average. Some houses define it with bads on top, flipping every sign; either is fine as long as one convention is used throughout.

$$IV = \sum_i \left(\frac{g_i}{G} - \frac{b_i}{B}\right) \times WOE_i$$

- $IV$ — information value, a single number summarising how much a variable separates goods from bads, before any other variable is considered.
- Each term is non-negative, because the difference in proportions and the log-ratio always share a sign.

🧮 **WORKED — Weight of evidence and information value for one characteristic**

Sample: 9,000 goods, 1,000 bads (10% bad rate). Characteristic: months at current address.

| Bin | Goods / Bads | %G, %B, WOE, contribution |
|---|---|---|
| 0–11 months | 1,800 / 400 | %G 0.200, %B 0.400, WOE = ln(0.5) = −0.6931, contrib = (0.200−0.400)(−0.6931) = 0.1386 |
| 12–35 months | 2,700 / 300 | %G 0.300, %B 0.300, WOE = ln(1.000) = 0.0000, contrib = 0.0000 |
| 36–71 months | 2,250 / 180 | %G 0.250, %B 0.180, WOE = ln(1.3889) = 0.3285, contrib = (0.070)(0.3285) = 0.0230 |
| 72+ months | 2,250 / 120 | %G 0.250, %B 0.120, WOE = ln(2.0833) = 0.7340, contrib = (0.130)(0.7340) = 0.0954 |
| **Total** | 9,000 / 1,000 | **IV = 0.1386 + 0 + 0.0230 + 0.0954 = 0.2570** |

An information value of 0.257 sits in the medium band: a genuinely useful variable, not a dominant one. Note the second bin, whose weight of evidence is exactly zero — its bad rate is identical to the book's, so it carries no information at all and could be merged with a neighbour without loss.

Once every variable is replaced by its weight of evidence, the regression is fitted on those transformed columns. This buys four things at once: the relationship is linear by construction, outliers are capped inside their bins, missing values have a coefficient, and every fitted coefficient should come out positive if the weight-of-evidence convention above is used, which turns sign checks into a free diagnostic. Variables are then selected by a mixture of information value, stepwise procedures, correlation screening (rules of thumb put the pairwise limit around 0.5–0.7) and business judgement, aiming for a final model of roughly 8–15 characteristics.

## From probability to points

Nobody operates a lending business on log-odds. The fitted model is rescaled to an integer score with two conventions: a reference score at a reference odds, and the number of points that doubles the odds.

$$Score = Offset + Factor \times \ln(odds), \qquad Factor = \frac{PDO}{\ln 2}$$

- $odds$ — good:bad odds at the account's fitted probability.
- $PDO$ — points to double the odds, conventionally 20.
- $Offset$ — chosen so that a reference score corresponds to reference odds: $Offset = S_0 - Factor \times \ln(odds_0)$.

🧮 **WORKED — Scaling a model to points**

| Step | Calculation | Result |
|---|---|---|
| 1. Choose conventions | 600 points = 50:1 good:bad, PDO = 20 | — |
| 2. Factor | 20 ÷ ln 2 = 20 ÷ 0.693147 | 28.854 |
| 3. Offset | 600 − 28.854 × ln 50 = 600 − 28.854 × 3.91202 | 487.12 |
| 4. Score an account at 15:1 odds | 487.12 + 28.854 × ln 15 = 487.12 + 28.854 × 2.70805 | **565** |
| 5. Its bad rate | 1 ÷ (1 + 15) | 6.25% |
| 6. Verify the doubling | Score 620 → odds = exp((620 − 487.12) ÷ 28.854) = exp(4.6053) | **100:1 ✓** |

Points are then distributed across characteristics so that each attribute contributes a whole number, which is what makes a scorecard readable: an applicant scores 34 points for time at address, 51 for bureau utilisation, and so on, summing to 565. The distribution formula spreads the intercept evenly across the $n$ characteristics.

$$Points_i = -\left(\beta_i \times WOE_i + \frac{\beta_0}{n}\right) \times Factor + \frac{Offset}{n}$$

## Reject inference

The training sample contains only accounts that were approved, but the model will be applied to everyone who applies. If yesterday's cut-off declined the worst 40% of applicants, then the relationship between characteristics and default has been observed only on the surviving 60%, and it is being extrapolated into a region where it was never measured. This is *reject inference*: the family of techniques for assigning presumed outcomes to declined applications so they can be included in development.

The common methods are parcelling (score the rejects with a known-good/known-bad model, then assign bad flags randomly in proportion to the expected bad rate at each score, usually inflated by a factor of two to four), augmentation (reweight accepts so that each stands in for the rejects that resemble it), and simple extrapolation of the bad-rate curve beyond the cut-off. All three share a defect.

🔴 **TRAP — "Reject inference fixes selection bias"**
The wrong belief is that reject inference recovers the missing information. It cannot: the outcomes of declined applicants were never observed, and no algorithm creates data. What reject inference does is make an *assumption* about the rejected region explicit, consistent and auditable, so that the model's behaviour below the cut-off follows a stated rule rather than an accident of extrapolation. The genuine cure is different and expensive: deliberately approve a small random sample of applicants who would otherwise be declined, and observe what happens. Those *swap-in test* accounts are the only unbiased evidence about the declined population, and portfolios that fund them are the ones whose cut-offs can be moved with confidence.

⚖️ **TRADE-OFF — Logistic regression versus gradient boosting**
A gradient-boosted tree ensemble will usually beat a well-built scorecard on the development sample, commonly by 2–5 Gini points, and often by less than that out of time. The costs are concrete: the model cannot be read as points, monotonicity must be imposed as an explicit constraint or the model will happily learn that risk falls then rises with income for no reason, adverse action reasons must be reconstructed post hoc from attribution methods, and validation and regulatory approval take longer. The defensible position is that the machine-learning model is worth it where the uplift is large and stable out of time — typically on rich behavioural or transaction data — and not worth it on thin application data where the uplift is small and the explanation burden is highest.

**You can now:**
- Bin a variable, compute its weight of evidence and information value, and judge whether it earns a place.
- Convert fitted log-odds into a points-based scorecard and verify the doubling property.
- State what reject inference can and cannot do, and name the only unbiased remedy.

---

# §7 · DISCRIMINATION VERSUS CALIBRATION

**A model does two separable jobs — putting accounts in the right order, and attaching the right number to each — and a model can do either one perfectly while failing the other completely.**

*Discrimination* is rank ordering: given two accounts, does the model put the one that defaults below the one that does not? *Calibration* is level: of all the accounts the model assigns a 4% PD, do about 4% actually default? Discrimination is a property of the ranking and is invariant to any monotonic transformation of the score. Calibration is a property of the mapping from score to probability and can be destroyed or repaired without touching the ranking at all.

The distinction matters because different consumers need different things. An approve/decline cut-off needs discrimination: it only has to know who is worse than whom. Pricing, provisions and capital need calibration: they multiply the PD by real money. A model with a Gini of 0.5 and PDs that are uniformly half of reality will make good approval decisions and catastrophically under-provision.

🔍 **WHY THIS IS TRUE — Recalibration is nearly free, redevelopment is not**
Because calibration only concerns the level, it can usually be fixed by shifting the intercept — a single additive constant in log-odds space, or equivalently a parallel shift in points. A book whose central tendency has drifted from a 3% to a 4.5% bad rate needs its intercept moved by ln(0.045/0.955) − ln(0.03/0.97) ≈ −3.052 − (−3.476) = 0.424 in log-odds, and the ranking is untouched. Discrimination cannot be repaired this way: if the model has stopped separating goods from bads, no transformation of its output will restore the separation, because the information is simply not in the score. This asymmetry is why monitoring reports rank-order statistics and calibration statistics separately, and why a fall in Gini is a redevelopment trigger while a drift in observed default rate is usually a recalibration one.

📘 **DEFINE — Point-in-time versus through-the-cycle**
A *point-in-time* (PIT) PD estimates the probability of default over the next twelve months given everything known today, including where the economy currently stands; it rises in recessions and falls in booms. A *through-the-cycle* (TTC) PD estimates a long-run average for a grade of borrower, deliberately insensitive to the current state of the cycle; it moves only when the borrower's own quality changes. Neither is more correct — they answer different questions. Accounting provisions under IFRS 9 and CECL require PIT estimates, because the standard asks what losses are actually expected now. Regulatory capital prefers TTC, because capital requirements that spike in a recession would force banks to lend less exactly when lending is scarcest. In practice no real model is purely one or the other, and the honest description of most bank models is "somewhere in between, and closer to PIT than the documentation claims".

⚖️ **TRADE-OFF — Procyclicality**
Choosing PIT gives provisions that are accurate and volatile; choosing TTC gives capital that is stable and, in the moment of a downturn, arguably too low. Every regulatory regime picks a point on this line and then adds machinery to compensate: countercyclical capital buffers on the capital side, multiple probability-weighted macroeconomic scenarios on the accounting side. There is no setting that is simultaneously accurate, stable and simple.

**You can now:**
- Say which decisions require rank ordering only and which require correct levels.
- Compute an intercept shift that recalibrates a model to a new central tendency.
- Distinguish PIT from TTC and name which regime demands which.

---

# §8 · MEASURING A MODEL

**Four numbers cover almost all model monitoring: Gini for ranking, KS for separation at a point, PSI for population drift, and the observed-versus-expected default rate for calibration.**

The *receiver operating characteristic* (ROC) curve plots, for every possible score cut-off, the cumulative fraction of bads captured against the cumulative fraction of goods rejected. A useless model produces the diagonal; a perfect model produces the top-left corner. The area under that curve (AUC) is the probability that a randomly chosen bad scores worse than a randomly chosen good. Gini rescales it so that useless is 0 and perfect is 1.

$$Gini = 2 \times AUC - 1$$

🧮 **WORKED — Gini from a five-band score distribution**

Bands are equal fifths of the population, worst-scoring first. Distribution of bads: 40%, 25%, 15%, 12%, 8%. Distribution of goods: 18%, 19%, 20%, 21%, 22%.

| Step | Cumulative goods (x) → cumulative bads (y) | Trapezoid area |
|---|---|---|
| 1 | 0.00 → 0.18, y 0.00 → 0.40 | 0.5 × (0.00+0.40) × 0.18 = 0.03600 |
| 2 | 0.18 → 0.37, y 0.40 → 0.65 | 0.5 × (0.40+0.65) × 0.19 = 0.09975 |
| 3 | 0.37 → 0.57, y 0.65 → 0.80 | 0.5 × (0.65+0.80) × 0.20 = 0.14500 |
| 4 | 0.57 → 0.78, y 0.80 → 0.92 | 0.5 × (0.80+0.92) × 0.21 = 0.18060 |
| 5 | 0.78 → 1.00, y 0.92 → 1.00 | 0.5 × (0.92+1.00) × 0.22 = 0.21120 |
| Sum | AUC | 0.67255 |
| Final | Gini = 2 × 0.67255 − 1 | **0.345** |

A Gini of 0.345 is a weak but usable application scorecard. The same table gives the Kolmogorov–Smirnov statistic almost free: KS is the largest vertical gap between the cumulative bad and cumulative good distributions, here at band 3 where bads are at 0.80 and goods at 0.57, giving KS = 0.23, usually quoted as 23. KS answers a narrower question than Gini — how good is the single best cut-off — which is why it survives in operational reporting despite Gini being the better summary.

$$KS = \max_s \left| F_{bad}(s) - F_{good}(s) \right|$$

- $F_{bad}(s)$ — fraction of bads scoring at or below $s$.
- $F_{good}(s)$ — fraction of goods scoring at or below $s$.

The Population Stability Index answers a different question entirely: not "is the model still right" but "is the model still being asked about the same people". It compares the score distribution of a recent cohort with the distribution at development.

$$PSI = \sum_i (A_i - E_i) \times \ln\left(\frac{A_i}{E_i}\right)$$

- $A_i$ — actual proportion of the recent population in band $i$.
- $E_i$ — expected proportion, from the development sample.
- Both must be proportions summing to 1, and no band may be empty, which is why bands are usually deciles of the development distribution.

🧮 **WORKED — Population Stability Index**

| Band | Expected → Actual | Contribution |
|---|---|---|
| 1 | 0.20 → 0.12 | (−0.08) × ln(0.60) = (−0.08)(−0.51083) = 0.040866 |
| 2 | 0.20 → 0.18 | (−0.02) × ln(0.90) = (−0.02)(−0.10536) = 0.002107 |
| 3 | 0.20 → 0.22 | (0.02) × ln(1.10) = (0.02)(0.09531) = 0.001906 |
| 4 | 0.20 → 0.24 | (0.04) × ln(1.20) = (0.04)(0.18232) = 0.007293 |
| 5 | 0.20 → 0.24 | (0.04) × ln(1.20) = 0.007293 |
| **Total** | | **PSI = 0.0595** |

Below 0.10, so the population has shifted but not alarmingly — and note the shift is *favourable*, with fewer applicants in the worst band. PSI is unsigned, so it flags movement without saying whether the movement is good news; the decomposition by band, not the headline, is what you read. The same arithmetic applied to a single input variable rather than the score is the Characteristic Stability Index, and it is how you find out *which* variable moved.

✅ **CHECK — The monitoring pack that actually catches failure**
Monthly: PSI on the score, CSI on every characteristic, approval rate, and score distribution by channel. Quarterly: Gini on the most recent mature vintage, observed versus expected default rate by score band, and override rate. Pass condition for the calibration test: observed default rate falls inside a binomial confidence interval around expected in at least 80% of score bands, with no systematic pattern of misses in one direction. A model that fails in one direction across every band is miscalibrated and needs an intercept shift; a model that fails randomly across bands is under-powered rather than biased.

🔴 **TRAP — "Gini fell, the model is broken"**
The wrong belief is that a falling Gini always means model degradation. Gini is a property of the model *and* the population it is measured on: tighten the cut-off and Gini on the booked book falls mechanically, because you have removed the worst accounts, which were the easiest to rank. This is *range restriction*, and it means a booked-book Gini is not comparable across periods with different approval rates. The correction is to measure discrimination on the through-the-door population wherever the data exists, and to interpret booked-book Gini only alongside the approval rate that produced it.

**You can now:**
- Compute Gini, KS and PSI by hand from a banded table.
- Say which statistic answers which question, and which failure each one detects.
- Explain why a booked-book Gini falls when the cut-off is tightened.

---

# §9 · LOSS GIVEN DEFAULT AND EXPOSURE AT DEFAULT

**PD gets the attention and LGD gets the money: a mortgage book's expected loss is driven almost entirely by how far house prices fall, not by how many borrowers stop paying.**

Loss given default is one minus the recovery rate, where recovery is measured properly: all cash received after default, net of the costs of collecting it, discounted back to the default date. Each of those three qualifications removes several percentage points of illusion. Cash arrives over years, so discounting matters; repossession, legal fees and collection agency commissions are real; and post-default interest that is charged but never paid is not recovery.

$$LGD = 1 - \frac{\sum_t \frac{R_t - C_t}{(1+d)^t}}{EAD}$$

- $R_t$ — cash recovered in period $t$ after default.
- $C_t$ — direct and allocated indirect costs of recovery in period $t$.
- $d$ — discount rate; the standard choice is the contractual effective interest rate on the exposure, though some regimes require a risk-adjusted rate.
- $EAD$ — exposure at the moment of default, the denominator.

Two structural features make retail LGD awkward. First, its distribution is *bimodal*: most defaults resolve either near-fully (a cure, or a secured sale that clears the debt) or near-totally (an unsecured write-off with a token recovery). The average LGD of 30% may describe almost no individual account. Second, LGD depends on the same macroeconomic conditions as PD, and in the same direction: house prices fall, so defaults rise *and* recoveries shrink together.

📘 **DEFINE — Downturn LGD**
The loss-given-default that would be observed if defaults occurred during an economic downturn, rather than the long-run average across good and bad years. Regulators require it for capital because the capital formula already assumes a bad year for PD, and pairing a stressed default rate with an average recovery rate would understate the loss. It is estimated either by fitting LGD against a macroeconomic driver such as a house-price index and reading off the value at a stressed level, or, where data is thin, by applying a supervisory add-on to the long-run average. For a mortgage book the gap is large: benign-period LGD of 15% can become 35–45% in a severe housing downturn, because the loss is levered on the equity cushion. This is the single most important reason mortgage capital is not as small as its default rate suggests.

Exposure at default asks how much will be owed when default happens, which differs from today's balance for two reasons. On amortising loans the balance falls, so EAD is below the current balance and is read off the amortisation schedule. On revolving products — credit cards, overdrafts, lines of credit — the balance *rises*, because a borrower heading into distress draws on remaining headroom. This is captured by the credit conversion factor.

$$EAD = B + CCF \times (L - B)$$

- $B$ — current drawn balance.
- $L$ — the committed limit.
- $L - B$ — undrawn headroom.
- $CCF$ — credit conversion factor, the fraction of headroom expected to be drawn before default; typically 50–75% on cards, and estimated by observing accounts that later defaulted and comparing their balance twelve months before default with their balance at default.

⚖️ **TRADE-OFF — Cutting limits to cut exposure**
Reducing unused limits reduces EAD immediately and mechanically, which reduces expected loss and capital. It also reduces revenue on customers who would have borrowed profitably, damages the relationship with good customers who experience the cut as an insult, and, in aggregate, removes liquidity from households at the moment when limit-cutting programmes tend to run — which is during stress, when the cuts are most procyclical. The usual compromise is targeted: cut headroom only where behavioural score has deteriorated and utilisation is already high, which captures most of the exposure benefit at a fraction of the relationship cost.

✅ **CHECK — Is the LGD estimate honest?**
Take a cohort of defaults old enough to be fully resolved, and compare the LGD the model predicted at default with the LGD ultimately realised, discounted at the same rate. Pass condition: the mean realised LGD sits within the model's stated confidence range, and — separately — the *distribution* is reproduced, not just the mean. A model that gets the average right by predicting 30% for everything when reality is 60% of accounts at 5% and 40% at 67% will price and provision individual segments wrongly in both directions.

**You can now:**
- Compute LGD with costs and discounting and explain why each adjustment lowers the recovery.
- Explain downturn LGD and why the capital regime insists on it.
- Compute EAD from a drawn balance, a limit and a credit conversion factor.

---

# §10 · PORTFOLIO MECHANICS

**A retail book is a flow system, and the fastest reliable read on its health is not the stock of arrears but the rate at which accounts move between buckets.**

Every month, each account sits in a delinquency bucket and moves to another. The matrix of those movements is the *transition matrix*, and its diagonal-plus-one entries — the probability of falling one bucket further behind — are the *roll rates*. Roll rates are the earliest honest signal in the system: they respond within a month or two of a change in underwriting or the economy, while the stock of 90+ arrears takes at least three months to reflect the same change, and charge-offs take six or more.

🧮 **WORKED — Forecasting charge-off from roll rates**

Roll rates: current→1-29 = 8%, 1-29→30 = 50%, 30→60 = 60%, 60→90 = 75%, 90+→charge-off = 95%.

| Starting bucket | Balance × chained roll rates | Expected charge-off |
|---|---|---|
| Current | 1,000,000 × 0.08 × 0.50 × 0.60 × 0.75 × 0.95 = 1,000,000 × 0.01710 | 17,100 |
| 1–29 DPD | 80,000 × 0.50 × 0.60 × 0.75 × 0.95 = 80,000 × 0.21375 | 17,100 |
| 30–59 DPD | 40,000 × 0.60 × 0.75 × 0.95 = 40,000 × 0.42750 | 17,100 |
| 60–89 DPD | 20,000 × 0.75 × 0.95 = 20,000 × 0.71250 | 14,250 |
| 90+ DPD | 12,000 × 0.95 | 11,400 |
| **Total** | | **76,950** |

Read the middle column rather than the total. The 12,000 sitting in 90+ contributes almost as much loss as the entire million of current balances, because it is 95% certain to be lost while the current book is 1.7% likely to get there. This is the arithmetic behind the whole design of collections: effort spent stopping an account rolling from 1–29 to 30 is worth roughly four times the same effort spent at 60–89, because it removes the account from the chain earlier and because far more accounts are available to save.

🔍 **WHY THIS IS TRUE — Why arrears ratios lie in a growing book**
The standard delinquency ratio divides today's arrears balance by today's total balance. In a book growing at 3% a month, the denominator is fresh and the numerator is not: the accounts capable of being 90 days down were originated at least three months ago, when the book was smaller. The ratio therefore falls purely because of growth, and it will keep falling until growth stops — at which point it jumps, and the jump gets blamed on the economy. The corrections are two. *Lagged* delinquency divides today's arrears by the balance as it stood some months ago, aligning numerator and denominator. *Vintage* analysis avoids the problem entirely by never mixing cohorts. A book whose coincident ratio is flat while its vintage curves are deteriorating is a book heading for trouble on a delay.

📘 **DEFINE — Flow rate and cure rate**
The *flow rate* is the proportion of a bucket that moves to the next-worse bucket in the following month; it is the same object as a roll rate, read from the perspective of accounts leaving rather than accounts arriving. The *cure rate* is the proportion that moves the other way, back toward current, either by paying the arrears in full or by qualifying under a partial-cure rule. The two are not complements, because accounts can also stay put, close, or be written off. Cure rates are the most volatile number in the pack, since they respond to collections staffing, to seasonal payment patterns such as tax refunds, and to any change in forbearance policy — which means an unexplained rise in cure rate is more often an operational change than an improvement in customer health.

Three portfolio effects distort almost every headline number, and naming them is most of the work of explaining a variance. *Seasoning* is the vintage curve of §5: a young book looks good. *Mix* is composition drift: if the share of high-risk product or channel rises, the portfolio bad rate rises even though no segment's rate changed. *Attrition* is selective exit: good borrowers refinance away when rates fall, leaving a worse residual population, so a book can deteriorate without a single account deteriorating.

**You can now:**
- Chain roll rates into a charge-off forecast and identify which bucket carries the loss.
- Explain why coincident delinquency ratios flatter growing books and name two corrections.
- Decompose a rise in portfolio bad rate into seasoning, mix and attrition before blaming credit quality.

---

# §11 · PROVISIONS: EXPECTED CREDIT LOSS

**Accounting provisions recognise tomorrow's losses in today's profit and loss, which makes the timing rule — when a loss becomes foreseeable — the most consequential judgement in retail banking.**

The old rule was *incurred loss*: recognise a provision only once a loss event had occurred. It failed in the 2008 crisis for an obvious reason — losses were recognised too late and too suddenly, because the trigger was backward-looking. The replacement is *expected credit loss*, implemented as IFRS 9 in most of the world and as CECL under US GAAP, and both require a forward-looking estimate that incorporates a macroeconomic forecast.

IFRS 9 uses a three-stage model. *Stage 1* is everything performing as expected at origination, and carries an allowance equal to the expected loss from defaults occurring in the next twelve months. *Stage 2* is exposures that have suffered a significant increase in credit risk (SICR) since origination, and carries an allowance equal to expected losses over the *remaining lifetime* of the exposure. *Stage 3* is credit-impaired — in practice, defaulted — carrying lifetime losses with interest revenue calculated on the net carrying amount rather than the gross.

📘 **DEFINE — Significant increase in credit risk**
The trigger that moves an exposure from Stage 1 to Stage 2. The standard is deliberately principle-based: the test is a significant increase in the *lifetime* probability of default relative to what was expected for that exposure at origination, not an absolute level of risk. Banks implement it with a quantitative rule (commonly a relative test, such as a doubling of lifetime PD, sometimes combined with an absolute floor so that tiny moves on very safe accounts do not trigger), plus qualitative triggers such as forbearance being granted or the account entering a watch list, plus a mandatory 30-days-past-due backstop that may be rebutted only with evidence. The relative construction has a counterintuitive consequence: a high-risk account that has not deteriorated stays in Stage 1, while a very safe account that has doubled from a tiny PD moves to Stage 2 — the standard measures change, not level.

$$ECL = \sum_{t=1}^{T} PD_t^{marg} \times LGD_t \times EAD_t \times \frac{1}{(1+EIR)^t}$$

- $PD_t^{marg}$ — marginal probability of defaulting in period $t$, having survived to the start of it.
- $LGD_t, EAD_t$ — loss severity and exposure applicable to a default in period $t$.
- $EIR$ — the effective interest rate at origination, the discount rate the standard prescribes.
- $T$ — 1 for Stage 1 (twelve-month ECL), the remaining life for Stages 2 and 3.

Marginal PDs come from a survival construction. If $h_t$ is the conditional probability of defaulting in period $t$ given survival to its start, then survival is the running product $S_t = \prod_{k \le t}(1 - h_k)$ and the marginal default probability is $PD_t^{marg} = S_{t-1} \times h_t$.

🧮 **WORKED — Twelve-month versus lifetime ECL on a three-year loan**

Conditional default rates 2%, 3%, 4%. LGD 60%. Expected exposure 10,000 / 7,000 / 3,500. EIR 8%.

| Year | Marginal PD and loss | Discounted ECL |
|---|---|---|
| 1 | 0.0200; 0.0200 × 0.60 × 10,000 = 120.00; DF = 1/1.08 = 0.925926 | **111.11** |
| 2 | S₁ = 0.98; marginal = 0.98 × 0.03 = 0.0294; 0.0294 × 0.60 × 7,000 = 123.48; DF = 0.857339 | 105.85 |
| 3 | S₂ = 0.98 × 0.97 = 0.9506; marginal = 0.9506 × 0.04 = 0.038024; × 0.60 × 3,500 = 79.85; DF = 0.793832 | 63.39 |
| Stage 1 allowance | Year 1 only | **111.11** |
| Stage 2 allowance | Sum of all three | **280.35** |
| Check | Marginals sum to 0.0200+0.0294+0.038024 = 0.087424; and 1 − 0.98×0.97×0.96 = 0.087424 | **✓** |

🔴 **TRAP — "Stage 2 is a warning, Stage 1 is fine"**
The wrong belief is that stage allocation is a soft classification. It is a switch worth 2.5× the allowance on this loan, and 5–10× on a longer one, for an account whose underlying risk may have moved only slightly. The consequence is that a small deterioration in a macroeconomic forecast can push a large block of accounts across the SICR boundary simultaneously and produce a provision charge far larger than the change in expected defaults justifies. This *cliff effect* is a known and intended feature of the standard rather than an implementation error, and it means that reported provision movements must always be decomposed into stage transfers, model updates, scenario updates and volume changes before any of them is interpreted.

The forward-looking requirement is met with macroeconomic scenarios. Because the loss function is convex in the economy — a two-point rise in unemployment costs more than twice what a one-point rise costs — using a single central forecast systematically understates expected loss. Banks therefore run several scenarios, commonly three to five (a base case, an upside and one or two downsides), and take a probability-weighted average of the resulting ECLs, never of the inputs.

CECL differs in one structural respect worth holding onto: it has no staging. Every exposure carries a lifetime expected loss from the day it is originated, which removes the cliff effect entirely and replaces it with a large day-one loss on new lending. The two standards therefore behave in opposite ways during a growth phase — CECL front-loads the cost of growth, IFRS 9 defers it — while converging in a downturn.

**You can now:**
- Compute twelve-month and lifetime ECL with survival-based marginal PDs and discounting.
- Explain SICR as a relative test and predict which accounts it catches and misses.
- Say why probability-weighted scenarios are averaged over outputs and never over inputs.

---

# §12 · REGULATORY CAPITAL

**Capital is the answer to a single question — how bad can one year get — and the retail formula answers it by asking how much of each borrower's fate is shared with everyone else's.**

The internal ratings based (IRB) approach lets a bank use its own PD, LGD and EAD estimates inside a supervisory formula. The formula is a one-factor asymptotic model: each borrower's creditworthiness is driven partly by a single systematic factor common to all borrowers — the economy — and partly by an idiosyncratic factor unique to them. The asset correlation R is the weight on the common factor. Capital is then the loss that occurs when the common factor takes its 99.9th-percentile bad value, minus the expected loss that has already been provided for.

$$K = LGD \times \left[ N\!\left( \frac{G(PD)}{\sqrt{1-R}} + \sqrt{\frac{R}{1-R}}\, G(0.999) \right) - PD \right]$$

- $K$ — capital requirement as a fraction of EAD.
- $N(\cdot)$ — the standard normal cumulative distribution function.
- $G(\cdot)$ — its inverse, so $G(0.999) = 3.0902$ always.
- $R$ — asset correlation: 0.15 for residential mortgages, 0.04 for qualifying revolving retail, and $R = 0.03 + 0.13\,e^{-35 \times PD}$ for other retail.
- The subtraction of $PD$ removes expected loss, leaving unexpected loss only. Retail has no maturity adjustment, unlike corporate exposures.

$$RWA = K \times 12.5 \times EAD$$

🧮 **WORKED — Capital on a mortgage**

PD = 1%, LGD = 20%, EAD = 200,000, R = 0.15. Supplied constants: G(0.01) = −2.3263, G(0.999) = 3.0902, N(−1.2252) = 0.1103.

| Step | Calculation | Result |
|---|---|---|
| 1 | 1 ÷ √(1 − 0.15) = 1 ÷ 0.921954 | 1.084652 |
| 2 | √(0.15 ÷ 0.85) = √0.176471 | 0.420084 |
| 3 | 1.084652 × (−2.3263) | −2.523263 |
| 4 | 0.420084 × 3.0902 | 1.298043 |
| 5 | Sum of steps 3 and 4 | −1.225220 |
| 6 | N(−1.22522) — the stressed default rate | 0.1103 |
| 7 | K = 0.20 × (0.1103 − 0.01) | 0.020060 |
| 8 | RWA = 0.020060 × 12.5 × 200,000 | **50,150** |
| 9 | Risk weight = 50,150 ÷ 200,000 | **25.1%** |
| 10 | Capital = K × EAD = 0.020060 × 200,000 | **4,012** |
| 11 | Check: EL = 0.01 × 0.20 × 200,000 = 400; EL + K·EAD = 4,412; and 0.20 × 0.1103 × 200,000 = 4,412 | **✓** |

Step 6 is the interpretation to hold onto: a mortgage book with a 1% average default rate is required to hold capital as though 11.03% of it defaulted. That is what the 99.9th percentile buys, and the multiple from 1% to 11% comes entirely from the correlation of 0.15.

| Item | Mortgage (PD 1%, LGD 20%) | Card (PD 4%, LGD 80%, R 0.04) |
|---|---|---|
| Stressed default rate | 11.03% | 12.38% |
| Capital requirement K | 2.01% of EAD | 6.71% of EAD |
| Risk weight | 25.1% | 83.8% |
| Expected loss | 0.20% of EAD | 3.20% of EAD |
| Capital ÷ expected loss | **10.0×** | **2.1×** |

🔍 **WHY THIS IS TRUE — Correlation, not default rate, drives capital efficiency**
The card has four times the mortgage's PD and four times its LGD, so its expected loss is sixteen times larger — yet its capital is only three and a half times larger. The reason is the last row. Mortgages are assigned a correlation of 0.15 because housing distress is systemic: when house prices fall and unemployment rises, mortgage borrowers fail together, so the tail of the loss distribution is far away from the mean. Credit cards are assigned 0.04 because card defaults are dominated by individual circumstance — job loss, illness, divorce — which diversifies away in a large portfolio, so realised losses stay close to expected losses even in bad years. The practical consequence is that a mortgage book must hold ten times its expected loss in capital while a card book holds twice, and any comparison of the two products on return on capital that ignores this will reach the wrong answer.

The alternative is the *standardised approach*, which assigns risk weights from a supervisory table rather than from a model: broadly 35% for well-secured residential mortgages and 75% for other retail under the older text, refined in later revisions to vary with loan-to-value ratio and with whether a card is a transactor or a revolver. The Basel III finalisation package added an *output floor*, requiring modelled RWA to be at least 72.5% of what the standardised approach would produce, which caps how much capital a bank can save by modelling well.

⚖️ **TRADE-OFF — IRB versus standardised**
IRB gives lower capital on high-quality books, sharper internal pricing and a risk infrastructure the bank needs anyway. The costs are permanent: multi-year approval, long data-history requirements (commonly five years for retail PD and LGD, and for downturn LGD a period covering a genuine downturn), independent validation, and a use test obliging the bank to actually run its business on the same numbers it reports. A bank with a small or homogeneous book often finds the standardised approach cheaper in total, and the output floor has narrowed the prize.

**You can now:**
- Evaluate the IRB retail capital formula by hand given the normal-distribution values.
- Explain in one sentence why mortgage capital is large relative to mortgage expected loss.
- Distinguish expected loss, unexpected loss, capital requirement and risk-weighted assets without confusing any pair.

---

# §13 · MACROECONOMICS AND STRESS TESTING

**Retail credit models are conditional on an economy, and stress testing is the practice of making that conditionality explicit by running the same models under a stated alternative world.**

Four macroeconomic variables carry most of the explanatory power in retail. Unemployment drives ability to pay across every product. House prices drive mortgage LGD directly, through the equity cushion, and mortgage PD indirectly, since borrowers in negative equity cannot sell their way out. Interest rates drive affordability on variable-rate and refinancing debt. Real income growth drives everything slowly. Adding more variables rarely helps and usually produces a model that fits history beautifully and forecasts nothing.

The linkage is built with *satellite models*: regressions of an observed portfolio quantity — the default rate, the roll rate, the recovery rate — on lagged macroeconomic variables. Lags matter and are long. Unemployment typically leads unsecured defaults by two to four quarters, and house prices lead mortgage losses by longer still, because repossession takes time.

📘 **DEFINE — Stress test**
A projection of a portfolio's losses, revenues and capital under a prescribed adverse macroeconomic path, run to answer whether the institution stays above its capital minimum throughout. Supervisory versions prescribe the scenario centrally so results are comparable across banks: the US programme projects over nine quarters, the UK and EU exercises over three to five years, and internal capital adequacy assessments run whatever scenario the bank's own risk appetite requires. The output is not a forecast — the scenario is chosen to be severe and improbable — but a conditional statement of the form "if this happened, capital would fall to here". The scenario is also usually *not* the same as the downturn used for LGD or the 99.9th percentile used for capital, which is why a bank can pass a stress test and still be told its downturn LGD is too optimistic.

⚖️ **TRADE-OFF — Model sensitivity versus model stability**
A model tightly fitted to macroeconomic history will respond strongly to the scenario, which regulators like, and will also respond strongly to noise in the forecast, which produces provision volatility that management dislikes and that has no informational content. A model loosely fitted responds smoothly and can be accused of ignoring the stress. There is no resolution inside the model; the honest treatment is to report the sensitivity explicitly — how many currency units of provision per point of unemployment — so that the choice is visible rather than buried.

✅ **CHECK — Does the macro link survive out of sample?**
Fit the satellite model on data ending before a known downturn, then project through it and compare with what actually happened. Pass condition: the projection captures the *direction and rough magnitude* of the peak, within a factor of about two. Retail satellite models routinely fail this test in one specific way — they under-predict the peak because the estimation sample contains no severe recession — and a model that has only ever seen benign data is extrapolating, not forecasting. Where a portfolio or a product has no downturn in its history, the correct statement is that the record is thin and the estimate rests on judgement or on a proxy portfolio, and that sentence belongs in the model documentation rather than in a footnote.

**You can now:**
- Name the four macroeconomic drivers that matter in retail and which parameter each moves.
- Explain what a stress test does and does not claim.
- Identify the characteristic failure mode of a satellite model fitted on benign data only.

---

# §14 · PRICING, LIMITS AND PROFIT

**A lending decision is not a risk decision, it is a profit decision in which risk is one of four terms, and cut-offs set on risk alone destroy value at both ends.**

The account-level economics are simple to write down. Revenue is the margin earned on the balance plus fees. Costs are the cost of funds, the operating cost of acquiring and servicing, and the expected loss. What remains is profit, and it must be earned on the capital the account consumes.

$$RAROC = \frac{(Revenue - Opex - EL) \times (1 - \tau)}{Capital}$$

- $RAROC$ — risk-adjusted return on capital, the return the account earns on the capital it forces the bank to hold.
- $\tau$ — the tax rate.
- $Capital$ — the regulatory or economic capital allocated, from §12.
- The comparison point is the bank's hurdle rate, which is its cost of equity plus a margin; accounts below it consume shareholder value even when they are profitable in accounting terms.

🧮 **WORKED — RAROC on a personal loan**

Loan 10,000 for one year. APR 14%. Cost of funds 4%. Acquisition and servicing 3% of balance. PD 4%, LGD 70%. Tax 25%. R for other retail at PD 4% = 0.03 + 0.13 × e^(−1.4) = 0.03 + 0.13 × 0.246597 = 0.062058.

| Step | Calculation | Result |
|---|---|---|
| 1. Net interest income | (0.14 − 0.04) × 10,000 | 1,000 |
| 2. Operating cost | 0.03 × 10,000 | 300 |
| 3. Expected loss | 0.04 × 0.70 × 10,000 | 280 |
| 4. Pre-tax profit | 1,000 − 300 − 280 | 420 |
| 5. Post-tax profit | 420 × 0.75 | 315 |
| 6. Capital: stressed default rate = N(1.032549 × (−1.7507) + 0.257224 × 3.0902) = N(−1.0128) | | 0.15558 |
| 7. K = 0.70 × (0.15558 − 0.04) | | 0.080906 |
| 8. Capital allocated = 0.080906 × 10,000 | | 809 |
| 9. RAROC = 315 ÷ 809 | | **38.9%** |

Now vary one input. Raise PD to 8% and expected loss doubles to 560, pre-tax profit falls to 140, and capital rises, so RAROC collapses to roughly 9% — below almost any hurdle rate. Raise the APR to compensate and a second effect appears.

🔍 **WHY THIS IS TRUE — Price rises change who accepts, not just what you earn**
Raising the rate on a risk segment does two things simultaneously, and the second usually dominates. It increases the margin on everyone who still takes the loan, and it changes *which* applicants still take it. Borrowers with good alternatives — who are disproportionately the better credits — go elsewhere, while borrowers with no alternatives accept. So the observed default rate of the segment rises after a price increase even though no individual borrower changed, and the profit gain is smaller than the arithmetic predicted, sometimes negative. This is *adverse selection*, and its portfolio-level cousin is the winner's curse: across a competitive market, a lender systematically wins the business its model under-prices relative to everyone else's, so a bank with a weaker model does not simply earn less — it acquires a book selected against it.

The same logic governs cut-offs. Moving a cut-off down accepts a *swap set* — accounts previously declined, now approved — whose expected profit must be evaluated as a group. The right question is never "what is the bad rate of the marginal segment" but "does the marginal segment clear the hurdle rate after loss, cost of capital and price elasticity". Some very high-risk segments clear it at high prices; some low-risk segments fail it because they are cheap to serve, cheap to price and shop aggressively for the best rate.

⚖️ **TRADE-OFF — Risk-based pricing**
Pricing each applicant to their own risk maximises portfolio profit and expands access, since borrowers who would be declined under a single price can be served at a higher one. It also concentrates the highest prices on the least resilient households, raises regulatory and fairness scrutiny, and creates a reinforcing loop when the higher price itself raises the default rate. Most regimes therefore permit risk-based pricing while constraining it: caps on the maximum rate, affordability assessment separate from creditworthiness assessment, and disclosure of the reasons for the price offered.

**You can now:**
- Compute RAROC from a rate, a cost base, expected loss and an allocated capital number.
- Explain adverse selection and the winner's curse as consequences of pricing in a competitive market.
- State the correct test for moving a cut-off, and why it is not the bad rate of the swap set.

---

# §15 · COLLECTIONS, FORBEARANCE AND RECOVERY

**Once an account is delinquent, the modelling problem changes from "will this go wrong" to "which intervention on which account recovers the most cash per hour of effort".**

Collections is a resource allocation problem with a hard constraint: there are more delinquent accounts than there are agent-hours. Ranking is done by a *collections score* — a model predicting, typically, the probability of self-cure without contact, or the expected recovery under each treatment. The counterintuitive use is that the highest-risk accounts are not always the ones to call. An account almost certain to self-cure wastes the call; an account almost certain to be lost wastes it too. The value is concentrated where the intervention changes the outcome, which is the middle of the distribution.

📘 **DEFINE — Forbearance**
A concession granted to a borrower in financial difficulty that the lender would not otherwise offer: a payment holiday, a term extension, a switch to interest-only, a rate reduction, or a capitalisation of arrears. Forbearance is not generosity — it is a bet that a temporarily distressed borrower recovers more cash for the lender than an enforced default would. It carries a reporting consequence, because supervisors treat the granting of forbearance as evidence of significant deterioration, so forborne accounts are typically flagged, moved to Stage 2 at least, and held under probation before returning to performing status. The risk it creates is *extend and pretend*: a book where arrears look low because delinquency has been repeatedly restructured away, which is why forborne balances are reported separately from performing balances and why re-default rates on forborne accounts are one of the most watched numbers in a stressed book.

Recovery on unsecured debt after write-off follows a long, thin tail: in-house collections, then a third-party agency on commission, then litigation where economics allow, then sale of the residual portfolio. Debt sale prices vary enormously with age and documentation quality, and single-digit to mid-teens pence in the pound is the usual range for aged unsecured paper — a rule of thumb rather than a rate, and one that moves sharply with the funding conditions of debt purchasers.

Secured recovery is a different process governed by law and time. Possession requires a legal process measured in months to years depending on jurisdiction, during which the property may deteriorate and costs accrue. The realised loss is the shortfall between the sale proceeds net of costs and the outstanding debt plus accrued interest, which is why the loan-to-value ratio at origination is the single best predictor of mortgage LGD, and why forced-sale discounts of 10–25% against market value are built into most models.

► **IN ONE LINE** — Collections is worth modelling because the marginal account saved, not the average account contacted, is where the money is.

**You can now:**
- Explain why collections effort is targeted at the middle of the risk distribution rather than the top.
- Define forbearance, state its accounting consequence, and name the failure mode it enables.
- Identify the drivers of secured versus unsecured recovery and their very different time scales.

---

# §16 · GOVERNANCE, FAIRNESS AND MODEL RISK

**A model that nobody can explain, challenge or retire is a liability regardless of its Gini, and the controls around a model are part of the model.**

*Model risk* is the risk of loss from decisions based on incorrect or misused models, and it has two sources: the model may be wrong, or it may be right and used for something it was not built for. The standard control architecture is three lines of defence — the model owners who build and use, an independent validation function that challenges, and internal audit that checks the first two — sitting on top of a model inventory that records every model in production, its owner, its last validation and its known limitations.

Independent validation asks three questions in order. Is the model *conceptually sound* — do the variables make sense, is the target well defined, is the estimation appropriate? Does *ongoing monitoring* show it still works — the statistics of §8? And does *outcomes analysis* show its predictions matching reality on data it has never seen? A model can pass the third and fail the first, and that combination is the dangerous one, because it works until the regime it silently depends on changes.

Fairness constraints are legal, not optional, and they shape model design. *Disparate treatment* is the use of a protected characteristic — race, sex, religion, national origin, age in some jurisdictions, and others — as an input; it is prohibited outright. *Disparate impact* is a neutral-looking rule that produces materially different outcomes across protected groups without sufficient business justification, and it is the harder problem because retail data is full of proxies: postcode correlates with ethnicity, employment tenure with age, and shopping-basket data with almost everything.

🔴 **TRAP — "We excluded protected characteristics, so the model is fair"**
The wrong belief is that omitting a variable removes its influence. A model with enough correlated inputs reconstructs the omitted variable implicitly, and a sufficiently flexible model reconstructs it well; omission prevents disparate treatment and does nothing about disparate impact. The correction has three parts. Test outcomes by group rather than inspecting inputs. Where an adverse disparity exists, document the business necessity of the variables causing it. And search for a less discriminatory alternative — a model of comparable predictive power with a smaller disparity — because the existence of such an alternative is what turns a justified disparity into an unjustified one.

✅ **CHECK — Adverse action reasons**
For every declined applicant, the system must be able to state the principal reasons for the decision — up to four under US Regulation B, with analogous requirements elsewhere, and with a general right to an explanation of automated decisions under European data protection law. Pass condition: for a random sample of declines, the reasons generated are specific ("balances on revolving accounts are too high"), tied to actual model inputs, and reproducible from the stored score record months later. A model whose reasons must be reconstructed by re-running a current version against an old application has failed this test even if the reasons sound plausible, because the record does not support the decision that was actually made.

The last governance question is when to retire a model. The honest triggers are a sustained fall in discrimination that recalibration cannot address, a population shift large enough that the development sample no longer resembles the applicant flow, a change in the product or the default definition that breaks the target, and simple age — most retail scorecards are redeveloped on a two-to-four-year cycle, not because they expire on a date, but because the accumulated drift of population, product and economy reliably exceeds tolerance in that window.

**You can now:**
- Name the three validation questions and say which failure combination is most dangerous.
- Distinguish disparate treatment from disparate impact and explain why exclusion does not cure the second.
- List the four honest triggers for redeveloping a scorecard.

---

# §17 · THE TRAPS

**Every row below is a belief that is coherent, widely held, and wrong in a way that costs money.**

| What people believe | What is true |
|---|---|
| Capital is held against expected losses | Capital is held against *unexpected* losses only; expected loss is covered by pricing and provisions, which is why PD is subtracted inside the IRB formula |
| A stricter default definition means less risk | It moves risk between parameters: PD falls, LGD rises, expected loss is roughly unchanged |
| Default means loss | Defaults cure, often at a third to a half on secured books; that is why LGD exists as a separate parameter |
| PD is a property of the borrower | PD is a property of the borrower *and* the definition, the horizon and the calibration philosophy; three PDs on one account can all be correct |
| A falling delinquency ratio means improving credit | In a growing book the denominator grows faster than the numerator can; use lagged ratios or vintage curves |
| A falling Gini means the model has degraded | Tightening the cut-off lowers booked-book Gini mechanically through range restriction; compare only at equal approval rates |
| A high Gini model is a good model | Gini says nothing about level; a perfectly ranked model with PDs half of reality will under-provision by half |
| Recalibration and redevelopment are the same kind of fix | Calibration is one number and nearly free; discrimination cannot be restored by any transformation of the score |
| Reject inference recovers the missing outcomes | It makes an assumption explicit; only funding a random sample of would-be declines produces real evidence |
| A variable with a very high information value is a great find | Above roughly 0.5, suspect leakage — the variable is probably a consequence of the default rather than a predictor of it |
| PSI rising is bad news | PSI is unsigned; the population may have improved. Read the band decomposition, never the headline |
| Stage 1 to Stage 2 is a small step | It multiplies the allowance by 2–10× on a term loan; provision movements must be decomposed before interpretation |
| Averaging the macroeconomic scenarios then computing ECL saves time | Losses are convex in the economy, so averaging inputs understates ECL; average the outputs |
| Cards need more capital than mortgages because they default more | They need more capital in total but far less per unit of expected loss; correlation, not default rate, drives the multiple |
| Excluding protected characteristics makes a model fair | It prevents disparate treatment only; proxies reconstruct the excluded variable, and impact must be tested on outcomes |
| Machine learning models are strictly better | The development-sample uplift over a good scorecard is commonly 2–5 Gini points and often smaller out of time, against a real cost in explainability, monotonicity control and approval time |
| Raising the price on a risk segment raises its profit proportionally | It changes who accepts; the better credits leave, the observed default rate rises, and the gain shrinks or reverses |
| Collections should target the worst accounts | It should target accounts where contact changes the outcome, which is the middle, not the tail |
| Forbearance reduces losses because arrears fall | It can also hide them; re-default rates on forborne accounts are the number that reveals which is happening |
| The cut-off should be set where the bad rate becomes unacceptable | It should be set where risk-adjusted return on capital crosses the hurdle rate; some high-loss segments clear it and some low-loss segments do not |

---

# §18 · THE QUESTIONS

**If a section of this note generated no question below, it should not have been in the note.**

## Tier 1 — must be instant

| Question | Answer |
|---|---|
| The loss equation | EL = PD × LGD × EAD |
| Standard default definition | 90 days past due, or unlikeliness to pay — either limb suffices |
| Basel confidence level and horizon | 99.9%, one year |
| The three retail asset correlations | Mortgage 0.15 fixed; qualifying revolving 0.04 fixed; other retail 0.03 to 0.16 falling with PD |
| Gini in terms of AUC | Gini = 2 × AUC − 1 |
| RWA from K | RWA = K × 12.5 × EAD, where 12.5 = 1 ÷ 0.08 |
| PSI action thresholds | <0.10 stable; 0.10–0.25 investigate; >0.25 shifted |
| EAD on a revolving line | Drawn balance + CCF × undrawn headroom |
| Points-to-double-the-odds scaling factor | Factor = PDO ÷ ln 2; with PDO 20, Factor = 28.854 |
| IFRS 9 stage allowances | Stage 1: 12-month ECL. Stages 2 and 3: lifetime ECL |
| The SICR days-past-due backstop | 30 DPD, rebuttable |
| Weight of evidence | ln( (goods in bin ÷ total goods) ÷ (bads in bin ÷ total bads) ) |
| Why PD is subtracted in the IRB formula | To leave unexpected loss only; expected loss is already priced and provisioned |
| Typical Gini, application versus behavioural scorecard | Roughly 0.35–0.55 versus 0.60–0.80 |

## Tier 2 — should be solid

| Question | Answer |
|---|---|
| Compute IV for a two-bin variable: bin A has 30% of goods and 50% of bads | WOE_A = ln(0.6) = −0.5108; WOE_B = ln(0.7/0.5) = 0.3365; IV = (−0.2)(−0.5108) + (0.2)(0.3365) = 0.1022 + 0.0673 = 0.1695 |
| A book's central tendency moves from 3% to 4.5% bad rate; what changes in the model | Intercept only: shift log-odds by ln(0.045/0.955) − ln(0.03/0.97) = 0.424. Ranking untouched |
| Why lifetime ECL exceeds 12-month ECL by more than the ratio of horizons | Marginal PDs compound over survival, exposure is still outstanding in later years, and later-year conditional default rates are usually higher than the first year's |
| Why average LGD can describe no individual account | The distribution is bimodal — near-full cure or near-total loss — so the mean sits in the empty middle |
| Chain roll rates of 8%, 50%, 60%, 75%, 95% on 1,000,000 of current balance | 1,000,000 × 0.0171 = 17,100 expected charge-off |
| Why the same effort saves more value in the 1–29 bucket than the 60–89 bucket | More accounts are available to save and each removal cancels a longer chain of roll rates |
| Downturn LGD, and why capital demands it | LGD conditional on an adverse economy; pairing a stressed default rate with an average recovery rate would understate tail loss, because both worsen together |
| Why scenarios are probability-weighted on outputs | Loss is convex in the macroeconomy, so ECL of the mean scenario is below the mean of the ECLs |
| Two ways to correct a coincident delinquency ratio in a growing book | Lag the denominator by the emergence period, or move to vintage analysis |
| Why a mortgage carries ten times its expected loss in capital and a card carries twice | Asset correlation: 0.15 versus 0.04, so the mortgage tail is much further from its mean |
| The one unbiased remedy for reject-inference bias | Deliberately fund a random sample of applicants below the cut-off and observe them |
| What CECL removes relative to IFRS 9, and what that changes | Staging; every exposure carries lifetime ECL from origination, so growth is front-loaded with provision cost and the cliff effect disappears |

## Tier 3 — judgement

| Question | Answer |
|---|---|
| Provisions rise 30% quarter on quarter. Where do you look, in order? | Decompose: stage transfers, then scenario weight and forecast changes, then model or assumption updates, then volume and mix. Only the residual is genuine credit deterioration |
| The cut-off can move down 20 points. What decides it? | Expected RAROC of the swap set against the hurdle rate, after price elasticity and acceptance effects — not the swap set's bad rate |
| Booked-book Gini fell from 0.42 to 0.36 over two years. Broken? | Not established. Check approval rate first (range restriction), then population stability, then discrimination on through-the-door data. Only then consider redevelopment |
| A gradient-boosted model beats the scorecard by 6 Gini points in development and 1 out of time. Ship it? | The out-of-time gap is the real uplift, and 1 point rarely repays the cost in explainability, monotonicity control and adverse-action reconstruction. Investigate the development gap as evidence of overfitting or leakage |
| A portfolio has never experienced a downturn. How do you set downturn LGD? | Say so explicitly, then use a proxy portfolio, a structural link to a collateral price index, or a supervisory add-on — and record the choice as judgement, because the record is thin |
| Where should conservatism live? | In LGD and EAD, keeping PD as unbiased as possible, so that the ranking used for approve/decline stays undistorted while capital and provisions remain prudent |

---

# §19 · FORMULA SHEET

| Name | Formula |
|---|---|
| Expected loss | $EL = PD \times LGD \times EAD$ |
| Logistic model | $\ln\!\big(p/(1-p)\big) = \beta_0 + \sum_i \beta_i x_i$ |
| Weight of evidence | $WOE_i = \ln\!\big((g_i/G) \div (b_i/B)\big)$ |
| Information value | $IV = \sum_i (g_i/G - b_i/B) \times WOE_i$ |
| Oversampling intercept correction | $\beta_0^{corr} = \hat{\beta}_0 - \ln(\rho_1/\rho_0)$ |
| Score scaling | $Score = Offset + Factor \times \ln(odds)$ |
| Scaling factor | $Factor = PDO \div \ln 2$ |
| Scaling offset | $Offset = S_0 - Factor \times \ln(odds_0)$ |
| Points per attribute | $Points_i = -\big(\beta_i WOE_i + \beta_0/n\big) Factor + Offset/n$ |
| Gini | $Gini = 2 \times AUC - 1$ |
| Kolmogorov–Smirnov | $KS = \max_s |F_{bad}(s) - F_{good}(s)|$ |
| Population Stability Index | $PSI = \sum_i (A_i - E_i)\ln(A_i/E_i)$ |
| Loss given default | $LGD = 1 - \sum_t \frac{R_t - C_t}{(1+d)^t} \div EAD$ |
| Exposure at default | $EAD = B + CCF \times (L - B)$ |
| Survival | $S_t = \prod_{k \le t}(1 - h_k)$ |
| Marginal default probability | $PD_t^{marg} = S_{t-1} \times h_t$ |
| Expected credit loss | $ECL = \sum_{t=1}^{T} PD_t^{marg} LGD_t EAD_t (1+EIR)^{-t}$ |
| IRB capital requirement | $K = LGD\left[N\!\left(\frac{G(PD)}{\sqrt{1-R}} + \sqrt{\frac{R}{1-R}}G(0.999)\right) - PD\right]$ |
| Other-retail correlation | $R = 0.03 + 0.13\,e^{-35 \times PD}$ |
| Risk-weighted assets | $RWA = K \times 12.5 \times EAD$ |
| Risk weight | $RW = RWA \div EAD$ |
| RAROC | $RAROC = \big[(Rev - Opex - EL)(1-\tau)\big] \div Capital$ |
| Roll-rate chain to loss | $Loss = Balance \times \prod_j r_j$ |
| Recalibration shift | $\Delta = \ln\!\frac{p_1}{1-p_1} - \ln\!\frac{p_0}{1-p_0}$ |
| Constants | $G(0.999) = 3.0902$; $G(0.01) = -2.3263$; $G(0.04) = -1.7507$; $\ln 2 = 0.693147$ |

---

# §20 · GLOSSARY

| Term | Meaning |
|---|---|
| Adverse action | A decline, or an offer on worse terms than requested, which in several jurisdictions must be accompanied by the principal reasons |
| Adverse selection | The tendency for a price rise to be accepted disproportionately by worse risks, because better risks have alternatives |
| Approval rate | Share of applications accepted; changes it mechanically alter booked-book statistics |
| Asset correlation (R) | Weight on the common systematic factor in the Basel model; how much borrowers fail together |
| Attrition | Loss of accounts to competitors or repayment, usually selective toward better credits |
| AUC | Area under the ROC curve; probability a random bad scores worse than a random good |
| Augmentation | A reject-inference method that reweights accepted accounts to stand in for similar rejects |
| Backstop | A mandatory trigger that overrides model judgement, such as 30 DPD for SICR |
| Bad | An account meeting the default definition inside the outcome window |
| Behavioural scorecard | A model scoring existing accounts using their own payment and usage history |
| Bureau (credit bureau) | An agency aggregating credit obligations and performance across lenders |
| CCF | Credit conversion factor; fraction of undrawn limit expected to be drawn before default |
| CECL | Current Expected Credit Loss; the US accounting standard requiring lifetime expected loss from origination |
| Central tendency | The long-run average default rate of a portfolio, used as the calibration target |
| Charge-off | Removal of a defaulted balance from the balance sheet as uncollectable |
| Coarse classing | Merging fine bins into a final small set with stable, defensible weights of evidence |
| Coincident delinquency | Arrears divided by current total balance; distorted by growth |
| Collections score | A model ranking delinquent accounts by expected benefit from intervention |
| Cure | Return of a defaulted or delinquent account to performing status |
| Cut-off | The score threshold at which an application is approved or declined |
| Delinquency bucket | Arrears band in 30-day steps: current, 1–29, 30–59, 60–89, 90+ DPD |
| Discrimination | A model's ability to rank order goods and bads; distinct from calibration |
| Disparate impact | A neutral rule producing materially unequal outcomes across protected groups |
| Disparate treatment | Direct use of a protected characteristic in a decision |
| Downturn LGD | Loss given default estimated for adverse economic conditions, required for capital |
| DPD | Days past due |
| EAD | Exposure at default; amount outstanding when default occurs |
| ECL | Expected credit loss; the accounting allowance under IFRS 9 or CECL |
| EIR | Effective interest rate at origination; the prescribed ECL discount rate |
| EL | Expected loss; the mean loss, equal to PD × LGD × EAD |
| Fine classing | Initial cutting of a variable into many narrow bins before merging |
| Flow rate | Proportion of a delinquency bucket moving to the next-worse bucket |
| Forbearance | A concession to a borrower in difficulty, such as a payment holiday or term extension |
| Gini | Rescaled AUC; 0 is random, 1 is perfect ranking |
| Hurdle rate | The minimum acceptable return on capital, based on cost of equity |
| Indeterminate | An account neither clearly good nor clearly bad in the outcome window |
| Information value | Single-variable measure of separation between goods and bads |
| IRB | Internal Ratings Based; regime letting a bank use own PD, LGD and EAD in a supervisory formula |
| KS | Kolmogorov–Smirnov statistic; largest gap between cumulative good and bad distributions |
| Lagged delinquency | Arrears divided by a historic balance, correcting for growth |
| LGD | Loss given default; unrecovered fraction of exposure after costs and discounting |
| Loan-to-value | Debt divided by collateral value; the primary driver of secured LGD |
| Model risk | Risk of loss from a model being wrong or misused |
| Monotonicity constraint | A restriction forcing a model's response to a variable to move in one direction only |
| Months on book | Time since origination; the horizontal axis of a vintage curve |
| Observation point | The date at which predictive data is frozen for model development |
| Outcome window | The period after the observation point over which default is observed |
| Output floor | Requirement that modelled RWA be at least a set percentage of standardised RWA |
| Override | A manual decision contradicting the model's recommendation |
| Parcelling | A reject-inference method assigning bad flags to rejects in proportion to inferred odds |
| PD | Probability of default over a stated horizon |
| PDO | Points to double the odds; the scaling convention for a scorecard |
| PIT | Point-in-time; a risk estimate conditional on current economic conditions |
| Procyclicality | The tendency of risk measures to tighten credit in downturns and loosen it in booms |
| PSI | Population Stability Index; measure of drift in a score distribution |
| Qualifying revolving retail | Basel class for unsecured revolving retail exposures, mainly credit cards; R = 0.04 |
| RAROC | Risk-adjusted return on capital |
| Range restriction | Loss of measured discrimination caused by removing the worst accounts from the sample |
| Reject inference | Techniques for including declined applications in scorecard development |
| Roll rate | Probability of moving from one delinquency bucket to the next-worse in a month |
| RWA | Risk-weighted assets; capital requirement scaled by 12.5 |
| Satellite model | A regression linking a portfolio risk measure to macroeconomic variables |
| Scorecard | A model expressed as integer points per attribute, summing to a score |
| Seasoning | The tendency of default risk to follow a hump-shaped curve in months on book |
| SICR | Significant increase in credit risk; the IFRS 9 Stage 1 to Stage 2 trigger |
| Stage 1 / 2 / 3 | IFRS 9 classifications carrying 12-month ECL, lifetime ECL, and lifetime ECL on credit-impaired assets |
| Standardised approach | Capital calculated from supervisory risk weights rather than internal models |
| Stress test | Projection of losses and capital under a prescribed adverse scenario |
| Survival function | Probability of not having defaulted by a given period |
| Swap set | Accounts that change decision when a cut-off moves |
| Through-the-door | The full population of applicants, approved and declined |
| TTC | Through-the-cycle; a risk estimate deliberately insensitive to current conditions |
| Unexpected loss | The excess of a tail-percentile loss over expected loss; what capital covers |
| Unlikeliness to pay | The judgemental limb of the default definition |
| Use test | The requirement that a bank actually manages its business with the models it reports |
| Vintage | The cohort of accounts originated in a given period |
| Weight of evidence | Log-odds transformation of a bin, encoding its riskiness relative to the book |
| Write-off | Accounting removal of an uncollectable balance; often used interchangeably with charge-off |

---

# §21 · THE COMPRESSION

**Retail credit risk is the conversion of an unknowable individual outcome into a measurable population rate, and the whole subject is the discipline of keeping that rate honest.**

Everything above is one loop. You define an event, freeze a photograph of the borrower, wait a stated period for the verdict, fit a model that ranks and a calibration that levels, multiply the resulting probability by a severity and an exposure to get expected loss, then hand that number to three consumers who each want it conditioned differently — pricing wants today's odds, accounting wants today's odds under a forecast, capital wants a long-run average pushed into a downturn. You then watch the population drift away from the one you measured, and start again.

The errors that matter are always the same four. Measuring the wrong event, by letting the default definition move. Measuring on the wrong population, by forgetting that you only observe the accounts you approved. Confusing the mean with the tail, by funding expected loss with capital or unexpected loss with price. And reading a ratio whose numerator and denominator come from different moments in time.

► **IN ONE LINE** — A retail lender cannot know which borrower will default, so it prices, provisions and capitalises against the fraction that will, and every technique in the field exists to keep that fraction accurate, current and honestly conditioned.
