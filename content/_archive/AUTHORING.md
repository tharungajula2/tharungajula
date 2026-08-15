# AUTHORING GUIDE — MEDIA & DIAGRAMS IN NOTES

All media assets (images, screenshots, and diagrams) live in the `public/media/` directory and are referenced via root-relative URLs (`/media/...`).

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

Screen recordings are out of scope. Static images and ASCII diagrams only.

---

## 2. Dark & Light Mode Screenshot Handling

Screenshots with stark white backgrounds are framed inside `.bg-surface-raised` with a subtle `border-hairline` border, ensuring they blend cleanly in both dark and light modes without blinding high-contrast breaks.

---

## 3. React Flow Diagrams (Out of Scope for initial build)

Complex dynamic graphs and interactive node diagrams will slot in via MDX / custom component tags (`<DiagramFlow data="..." />`).
