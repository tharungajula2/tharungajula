---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "07"
volumeSlug: "stress-testing-and-capital-planning"
volumeTitle: "STRESS TESTING AND CAPITAL PLANNING"
order: 4
title: "A BANK'S OWN STRESS TEST"
slug: "4-a-banks-own-stress-test"
sectionNumber: "4"
part: null
kind: "narrative"
sourceFile: "CR_07_STRESS_TESTING_AND_CAPITAL_PLANNING.md"
tags: []
hasSayThis: false
wordCount: 761
status: "raw"
section: "§4"
summary: ""
enriched: false
---

# §4 · A BANK'S OWN STRESS TEST

## 4.1 The transmission chain

Everything in a credit stress test is one chain, executed in order. Being able to recite it — and to name which link is weakest — is a good demonstration of understanding.

> **Macro scenario → risk parameters → asset quality → provisions → P&L → capital → ratios**

Link by link:

**1. Macro scenario.** A coherent, internally consistent path for GDP growth, inflation, policy rate, unemployment or a proxy, exchange rate, and asset prices — for retail, particularly **property and gold prices**, per Document 01 §2.2.

**2. Macro to parameters.** The satellite models. PD rises; LGD rises as collateral values fall; EAD rises as distressed borrowers draw down. Document 05 §6.2's point lands hard here: **all three move adversely together.**

**3. Parameters to asset quality.** Higher PDs produce more SMA and NPA formation, projected through Document 03 §4's transition matrices under stressed roll rates.

**4. Asset quality to provisions.** Post-April-2027, through the ECL machinery — which means **Stage 2 migration**, and Document 06 §2.4's 2.7× cliff.

**5. Provisions to P&L.** Provision charge, plus lost interest income on Stage 3 exposures accruing on net carrying amount, plus any margin compression in the scenario.

**6. P&L to capital.** Reduced or negative profit reduces retained earnings and therefore CET1.

**7. Capital to ratios.** CET1 over RWA — and note that under India's standardised approach **RWA does not itself inflate as credit quality deteriorates**, except through exposure migration. Document 06 §8.2's point: India removed one of the two procyclical channels.

🔴 **The weakest link, and volunteer this before being asked: step 2.** Document 06 §3.3 established that the macro-to-default relationship is thinly evidenced in Indian retail, because the only recent downturn was overlaid with moratoria and restructuring. **Everything downstream inherits that weakness.** A stress test is only as credible as its satellite models, and in Indian retail those models are estimated on a contaminated series.

## 4.2 Scenario severity — how bad is bad enough

Three approaches, and mature shops use all three:

**Historical.** Replay an observed episode — the 2015–19 corporate NPA cycle, the 2018–19 NBFC liquidity event, the microfinance cycle of Document 01 §3.3. Concrete and defensible, but limited to what has happened.

**Statistical.** Calibrate to a probability — a 1-in-25-year event, say — from the fitted distribution of the macro variables. Rigorous in form; fragile where the history is short, which in Indian retail it is.

**Hypothetical / expert.** Construct a plausible narrative that is not in the history. Sectoral collapse, a sustained gold price correction, a funding freeze. **The only method capable of covering risks that have not yet materialised**, which is precisely the risks that matter.

⚠️ **The trap that afflicts every stress testing programme:** scenarios calibrated on history are scenarios calibrated on things that already happened, and severe stresses are, by definition, things that mostly have not. Every crisis is described afterwards as unprecedented, because the precedented ones were provisioned for.

## 4.3 Worked — a retail credit stress

🧮 Illustrative throughout, and clearly labelled as such.

A bank with **₹6,50,000 crore RWA**, **CET1 ₹1,00,000 crore** — a ratio of **15.38%** — and a **₹5,00,000 crore** loan book, GNPA at 1.8%.

**Scenario:** GNPA rises to **5.0%** over two years.

Incremental GNPA = (5.0% − 1.8%) × ₹5,00,000 crore = **₹16,000 crore**
Additional provisions at 50% coverage on the increment = **₹8,000 crore**
Net of tax at 25% = **₹6,000 crore** hit to CET1

CET1 falls to ₹94,000 crore. Holding RWA constant, the ratio becomes **14.46%** — a fall of **92 basis points**, still far above the ~8.3% effective requirement.

**Now the severe sensitivity — GNPA at 8.1%**, the FSR's figure:

Incremental GNPA = (8.1% − 1.8%) × ₹5,00,000 crore = **₹31,500 crore**
Provisions at 50% = ₹15,750 crore; net of tax = **₹11,800 crore**
CET1 falls to ₹88,200 crore → ratio **13.57%**, a fall of **181 basis points**.

📘 **Two readings.**

**The buffer absorbs it comfortably** — which is exactly why the FSR concludes the system is resilient, and why only outliers breach.

**And the number to watch is not the ratio but the P&L.** ₹11,800 crore of net provisioning against an annual profit that might be ₹15,000–20,000 crore is most or all of a year's earnings. **A bank can be entirely capital-adequate through a stress and still report a loss** — and it is the loss, not the ratio, that determines whether it can raise capital, pay dividends, or retain its cost of funds. Boards feel the P&L before they feel the ratio.

---
