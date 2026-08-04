# AUTHORING GUIDE — MEDIA & DIAGRAMS IN NOTES

All media assets (images, screenshots, diagrams, and screen recordings) live in the `public/media/` directory and are referenced via root-relative URLs (`/media/...`).

---

## 1. Images & Diagrams

### Standard Markdown Syntax (With Caption)

```markdown
![Architecture Overview Diagram for Ind AS 109 Provisioning Engine](/media/ind-as-109-architecture.png)
```

### Advanced HTML Syntax (Explicit Width & Dark/Light Frame)

```html
<figure className="my-6">
  <img 
    src="/media/scorecard-binning.png" 
    alt="Scorecard Binning Transformation" 
    className="w-full max-w-2xl mx-auto rounded-xl border border-hairline bg-surface-raised p-1 shadow-md"
  />
  <figcaption className="mt-2 text-center text-xs font-mono text-ink-muted">
    Figure 1: Fine classing vs coarse classing Monotonic WoE transformation
  </figcaption>
</figure>
```

---

## 2. Silent Screen Recordings (MP4 & WebM)

Screen recordings must be silent, muted by default, and require explicit play controls to respect mobile data and `prefers-reduced-motion` users.

### HTML Video Syntax

```html
<video 
  controls 
  muted 
  playsInline 
  loop 
  poster="/media/eval-demo-poster.png"
  className="w-full max-w-2xl mx-auto my-6 rounded-xl border border-hairline bg-surface-raised shadow-md"
>
  <source src="/media/eval-pipeline-demo.webm" type="video/webm" />
  <source src="/media/eval-pipeline-demo.mp4" type="video/mp4" />
  Your browser does not support video playback.
</video>
```

---

## 3. Dark & Light Mode Screenshot Handling

Screenshots with stark white backgrounds are framed inside `.bg-surface-raised` with a subtle `border-hairline` border, ensuring they blend cleanly in both dark and light modes without blinding high-contrast breaks.

---

## 4. React Flow Diagrams (Out of Scope for initial build)

Complex dynamic graphs and interactive node diagrams will slot in via MDX / custom component tags (`<DiagramFlow data="..." />`).
