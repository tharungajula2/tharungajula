import type { Lesson } from './types';

export const embassyLesson: Lesson = {
  district: 'embassy',
  minutes: 6,
  verified: false,
  idea: "One set of global ideas — Basel for capital, IFRS 9 for provisions — is adopted differently by each country, so the same loan can carry different numbers in Mumbai, London and New York.",
  surface: `
<svg viewBox="0 0 440 176" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Global standards and local rules: Basel and IFRS 9 set the ideas; India, the UK, the EU and the US adopt them on their own timelines" style="width:100%;max-width:440px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#1f2937">
<text x="220" y="24" text-anchor="middle" font-size="16" font-weight="700">One standard, many embassies</text>
<rect x="10" y="44" width="99" height="64" rx="8" fill="#bfdbfe"/><text x="60" y="70" text-anchor="middle" font-weight="700" font-size="12">India</text><text x="60" y="90" text-anchor="middle" font-size="11">RBI</text>
<rect x="117" y="44" width="99" height="64" rx="8" fill="#bbf7d0"/><text x="166" y="70" text-anchor="middle" font-weight="700" font-size="12">UK</text><text x="166" y="90" text-anchor="middle" font-size="11">PRA</text>
<rect x="224" y="44" width="99" height="64" rx="8" fill="#fde68a"/><text x="274" y="70" text-anchor="middle" font-weight="700" font-size="12">EU</text><text x="274" y="90" text-anchor="middle" font-size="11">EBA, ECB</text>
<rect x="331" y="44" width="99" height="64" rx="8" fill="#fecdd3"/><text x="380" y="70" text-anchor="middle" font-weight="700" font-size="12">US</text><text x="380" y="90" text-anchor="middle" font-size="11">Fed, OCC</text>
<text x="220" y="140" text-anchor="middle" font-size="12" fill="#4b5563">Same ideas, different rules and dates.</text>
</g>
</svg>

## 1 — Who sets what

| Level | Loan-loss rules | Capital rules |
|---|---|---|
| Global | IFRS 9 (IASB) | Basel III and its 2017 finish, Basel 3.1 (BCBS) |
| India | IRAC today; ECL framework from 1 April 2027 (Ind AS 109 already for NBFCs) | Standardised approach; revised SA from 1 April 2027 |
| UK | IFRS 9 | Basel 3.1 from 1 January 2027 |
| EU | IFRS 9 | CRR3 from 1 January 2025 |
| US | CECL: lifetime loss from day one | Basel III endgame, still pending |

## 2 — India's IRAC ladder

| Class | Rule |
|---|---|
| Standard | Performing |
| Sub-standard | NPA up to 12 months |
| Doubtful D1 / D2 / D3 | Up to 1 year / 1–3 years / over 3 years in doubtful |
| Loss | Identified as a loss |

## 3 — Basel 3.1 in six changes

| Change | What it does |
|---|---|
| More granular standardised risk weights | Property by LTV; corporates by rating and size |
| Limits on internal models | Some portfolios (large corporates, banks) lose advanced IRB |
| Input floors | Minimum PD and LGD values in IRB |
| Output floor | IRB RWA at least 72.5% of standardised, phased in |
| New CVA framework | Revised capital for CVA risk |
| New operational risk approach | One standardised method |

## 4 — India's NBFC layers (scale-based regulation)

| Layer | Who | Regulation |
|---|---|---|
| Base | Smaller NBFCs | Lightest |
| Middle | Deposit-taking and larger NBFCs | More |
| Upper | The largest, named by RBI | Close to bank-like |
| Top | Kept empty unless needed | Heaviest |
`,
  deeper: `
## IFRS 9 and CECL side by side

| | IFRS 9 | CECL (US GAAP) |
|---|---|---|
| Day one | 12-month ECL | Lifetime ECL |
| Stages | Three, with SICR test | None |
| Forward-looking | Probability-weighted scenarios | Reasonable and supportable forecast, then revert to history |
| Effect | Provisions jump on SICR | Higher from the start, fewer cliffs |

## Output floor phase-in

| Year | EU | UK |
|---|---|---|
| 2025 | 50% | — |
| 2026 | 55% | — |
| 2027 | 60% | 60% |
| 2028 | 65% | 65% |
| 2029 | 70% | 70% |
| 2030 | 72.5% | 72.5% |

## US specifics

- Capital for large banks includes a stress capital buffer set from the Fed's annual stress test (at least 2.5%).
- The US Basel III endgame proposal has been re-proposed and remains pending.

## India specifics worth remembering

| Item | India |
|---|---|
| Minimum CET1 / total capital | 5.5% / 9%, plus 2.5% conservation buffer |
| Approach | Standardised only (no IRB approvals so far) |
| ECL for banks | From 1 April 2027, with transition relief |
| Large borrowers | CRILC reporting from ₹5 crore; prudential framework for resolution |

## Why differences matter for a BA

- A group reporting in several countries runs different rules on the same loans — the data must support both.
- Mapping tables (local classification ↔ standard stage or class) must be documented and tested.
- Effective dates matter: systems must switch rules on the right date and keep the history for comparison.

## Keeping current

Rules change: check the current RBI master directions, PRA and EBA publications before relying on any number here — dates and thresholds move.
`,
};
