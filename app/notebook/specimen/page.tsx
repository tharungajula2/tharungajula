import { markdownProcessor } from '@/lib/notes';

export const metadata = {
  title: 'Specimen Workbench | Tharun Gajula',
  description: 'Internal design specimen and pipeline verification page.',
  robots: {
    index: false,
    follow: false,
  },
};

const specimenMarkdown = `
# §0 · SPECIMEN PIPELINE TITLE

This is a lead body paragraph demonstrating **Source Serif 4** typography, *italic emphasis*, \`inline_code()\`, and a [specimen hyperlink](/notebook).

## 1.1 First Section Heading (h2)

This paragraph demonstrates standard body text with inline status chips: [VERIFY] unconfirmed claim, [IN FORCE] active regulation, [DRAFT] preliminary draft, [RECEIPT] evidence marker, and [FROM RBI Master Direction 2025] regulatory source attribution.

### 1.1.1 Math Equation Specimen (KaTeX)

$$\\text{Capital ratio} = \\frac{\\text{eligible capital}}{\\text{RWA}} \\qquad \\text{RWA} = \\sum \\text{exposure} \\times \\text{risk weight}$$

---

📘 **PAR** — Portfolio at Risk. The bureau's measure of overdue debt.

🔴 **The trap.** Never confuse GNPA with PAR.

⚠️ **The warning.** Low PAR in housing tells you about collateral values.

✅ **The check to run:** Run this check before submitting.

🧮 **Worked — LTV calculation.** 75% LTV cap on bullet gold loan.

► SAY THIS: "We do not fit scorecards on 12-month performance windows in unsecured retail when the product lifetime is 36 months."

⚖️ **Trade-off:** High cutoff preserves portfolio quality but drops approval conversion by 22%.

> Spoken interview dialogue: "Why does an 80-point gap in score represent a fifteen-fold difference in default probability?"

- Unordered list item 1
- Unordered list item 2

| MONTH | TOTAL DISBURSED | OUTSTANDING BOOK | DEFAULTED VALUE | SURVIVORS ENTERING | CUMULATIVE PD |
| :--- | :--- | :--- | :--- | :--- | :--- |
| M01 | ₹1,00,000 | ₹98,500 | ₹1,500 | 100.00% | 1.500% |
| M02 | ₹1,00,000 | ₹96,800 | ₹1,700 | 98.50% | 3.200% |

\`\`\`python
def calculate_ead(principal: float, undrawn: float, ccf: float) -> float:
    """Calculate Exposure at Default under IFRS 9 / Basel III."""
    return principal + (undrawn * ccf)
\`\`\`

### 1.1.2 Media Specimen (Image & Silent Video)

![Specimen Architecture Diagram](/media/specimen-architecture.png)

<figure class="my-6">
  <video controls muted playsinline loop poster="/media/eval-demo-poster.png" class="w-full max-w-2xl mx-auto rounded-xl border border-hairline bg-surface-raised shadow-md">
    <source src="/media/specimen-demo.webm" type="video/webm" />
    <source src="/media/specimen-demo.mp4" type="video/mp4" />
    Your browser does not support video playback.
  </video>
  <figcaption class="mt-2 text-center text-xs font-mono text-ink-muted">
    Screen Recording Specimen: Muted, playsinline, with visible controls.
  </figcaption>
</figure>
`;

export default async function SpecimenPage() {
  const vfile = await markdownProcessor.process(specimenMarkdown);
  const html = String(vfile);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 pb-48 text-ink font-sans text-left">
      <div className="mb-8 p-4 rounded-xl border border-hairline bg-surface-raised font-mono text-xs text-ink-muted">
        <div className="text-accent font-bold uppercase mb-1">// INTERNAL SPECIMEN WORKBENCH</div>
        <p className="text-ink-faint">
          Renders real markdown pipeline output to verify callouts, status chips, KaTeX math blocks, media containers, and table scroll containers.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="text-[10px] font-mono text-ink-faint uppercase mb-1">// SPECIMEN CAPTION: [reading column container]</div>
          <article className="prose-reading max-w-2xl mx-auto border border-hairline-faint p-6 rounded-2xl bg-surface">
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </article>
        </div>
      </div>
    </div>
  );
}
