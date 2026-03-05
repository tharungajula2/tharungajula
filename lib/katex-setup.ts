// KaTeX __VERSION__ global definition.
// Turbopack / Next.js encounters a ReferenceError when evaluating katex
// internally (required by rehype-katex) because webpack's define plugin isn't active.
// We aggressively define it here.
if (typeof globalThis !== 'undefined') {
    (globalThis as any).__VERSION__ = '0.16.8';
}
export {};
