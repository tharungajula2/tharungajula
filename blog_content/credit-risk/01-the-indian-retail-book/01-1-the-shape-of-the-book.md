---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "01"
volumeSlug: "the-indian-retail-book"
volumeTitle: "THE INDIAN RETAIL BOOK"
order: 1
title: "THE SHAPE OF THE BOOK"
slug: "1-the-shape-of-the-book"
sectionNumber: "1"
part: null
kind: "narrative"
sourceFile: "CR_01_THE_INDIAN_RETAIL_BOOK.md"
tags: []
hasSayThis: true
wordCount: 1016
status: "raw"
section: "§1"
summary: ""
enriched: false
---

# §1 · THE SHAPE OF THE BOOK

## 1.1 The single table you should be able to reproduce from memory

This is the March 2026 snapshot from CRIF High Mark's *How India Lends* — the whole bureau universe, banks and NBFCs and HFCs together.

| Product | Portfolio outstanding (₹ lakh crore) | YoY growth | Active loans (lakh) | PAR 31–180 |
|:--|--:|--:|--:|--:|
| Home loans | 44.4 | 9.4% | 235.7 | 2.1% |
| **Gold loans** | **18.6** | **50.4%** | 899.2 | 1.2% |
| Personal loans | 16.5 | 12.9% | 1,224.4 | 2.4% |
| Auto loans | 9.3 | 13.9% | 171.6 | 2.7% |
| Credit cards | 3.4 | 0.0% | 1,102.1 | 3.0% |
| Two-wheeler loans | 1.9 | 15.1% | 372.3 | 4.1% |
| Consumer durable loans | 1.0 | 20.8% | 1,019.3 | 1.7% |
| Others* | 23.4 | 10.7% | 1,179.0 | 3.5% |
| **Total consumption loans** | **118.6** | **15.3%** | 6,203.5 | 2.4% |
| Sole-proprietor loans (CV, CE, BL, LAP) | 51.6 | 19.7% | 673.7 | 3.3% |
| **TOTAL RETAIL** | **170.2** | **16.6%** | **6,877.2** | **2.7%** |

\* *Education, tractor, used car, PSL agri and KCC, loans against securities, miscellaneous.*

Four things to take from it, in order of how often they come up.

**One — the book is ₹170 lakh crore and roughly 688 million live accounts.** Say both numbers. The account count is what makes retail a *statistical* business rather than a relationship business, and it is why every technique in Documents 04 onward is a population technique.

**Two — home loans are a third of the book by value and 3% of it by account count.** Gold, personal, cards and consumer durables together are under a quarter of the value and more than two-thirds of the accounts. Value concentration and risk concentration sit in different places, and confusing them is the single commonest analytical error in this market.

**Three — gold grew 50.4% in a year and is now the second-largest retail product.** That is the defining fact of FY26 and §2.2 is about why.

**Four — credit cards grew 0.0%.** Flat, in a book growing at 16.6%. The only product that stopped. §2.5 explains it, and the explanation is about capital, not demand.

📘 **PAR** — Portfolio at Risk. The bureau's measure: the share of portfolio value sitting in a given days-past-due bucket. `PAR 31–180` means value overdue between 31 and 180 days. It is *not* the same as GNPA and it is *not* the same as an Ind AS stage. §8.1 is the whole of that distinction and it is asked more often than anything else in this document.

## 1.2 The K, and why the aggregate lies

Retail credit in India in 2026 is running two economies at once.

At the top, a post-pandemic recovery has given affluent households the capacity to buy premium assets on credit. Home loans above ₹75 lakh have gone from 33.6% of home-loan origination value in Q4 FY24 to **40.7% in Q4 FY26**. Personal loans above ₹10 lakh are 35.7% of personal-loan origination value while being 1.8% of the volume. Consumer durable loans above ₹50,000 gained about five percentage points of value share in a single quarter.

At the bottom, the same period shows the smallest ticket in almost every product carrying the highest delinquency:

| Product | Smallest ticket band | Its delinquency | Largest ticket band | Its delinquency |
|:--|:--|--:|:--|--:|
| Home loans (PAR 31–90) | ₹5L–35L | 2.85% | ₹75L+ | 0.88% |
| Personal loans (PAR 91–180) | <₹1L | 2.27% | ₹10L+ | 0.33% |
| Auto loans (PAR 31–90) | <₹5L | 2.95% | ₹20L+ | 1.21% |
| Gold loans (PAR 31–90) | <₹1L | 1.44% | ₹5L+ | 0.73% |

The gradient is monotone in every product. It is the most reliable single relationship in Indian retail credit, and you should expect it, look for it, and be suspicious of any portfolio where it is absent.

🔴 **The trap.** The gradient is often presented as "small borrowers are worse credits." That is a conclusion, not an observation, and it is only partly right. Three other things generate the same gradient: small tickets skew to thinner files and newer-to-credit borrowers; small tickets skew to the lender types with faster, lighter underwriting; and small tickets skew to different *use cases* — a ₹40,000 personal loan is far more likely to be funding a shortfall than a plan. Say the gradient, then say which of the three you think is driving it in the portfolio in front of you. That is the difference between reading a chart and doing the job.

**► SAY THIS**
> "The headline is 16.6% growth with improving delinquency, which sounds uncomplicated. It isn't. Growth is concentrated in secured collateral — gold at 50% and home loans at 9% — while the unsecured accounts are where the account count and the stress both live. And within every product, the risk gradient runs against ticket size. So I'd never manage this book at the product level; I'd manage it at product-by-ticket-band-by-lender-type, because that's the grain at which the behaviour is actually homogeneous."

## 1.3 Three different "housing loan" numbers, all correct

This is worth pausing on because it will save you from an embarrassment.

- **CRIF High Mark, March 2026: ₹44.4 lakh crore.** The bureau universe — banks, HFCs, NBFCs, SFBs, co-operatives, everything that reports.
- **RBI sectoral deployment, mid-2026: roughly ₹33.7 lakh crore**, about 16% of total bank credit, growing around 11%. `[VERIFY — read the latest sectoral release yourself]`
- **NHB and affordable-housing datasets:** different again, because they slice by ticket size and lender licence.

None of these is wrong. They count different books.

✅ **The check to run every single time you are handed a market number:** *whose book, which date, which definition, and does it net off write-offs?* Four questions, ten seconds, and they will catch most of the errors that make a candidate look careless.

---
