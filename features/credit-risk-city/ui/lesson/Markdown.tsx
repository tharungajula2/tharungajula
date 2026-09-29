'use client';

import ReactMarkdown, { type Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

// Cheatsheet-style rendering: numbered section heads, bold idea lines, clean tables, formula boxes, responsive SVG.
const components: Components = {
  h2: ({ children }) => <h2 className="mt-10 border-t border-hairline pt-6 text-xl font-semibold tracking-tight first:mt-2 first:border-t-0 first:pt-0">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-6 text-base font-semibold">{children}</h3>,
  p: ({ children }) => <p className="my-3 text-[15px] leading-7 text-ink">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  ul: ({ children }) => <ul className="my-3 list-disc space-y-1.5 pl-5 text-[15px] leading-7">{children}</ul>,
  ol: ({ children }) => <ol className="my-3 list-decimal space-y-1.5 pl-5 text-[15px] leading-7">{children}</ol>,
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto rounded-lg border border-hairline">
      <table className="w-full border-collapse text-left text-sm [&_tbody_tr:last-child_td]:border-b-0">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-surface-sunken">{children}</thead>,
  th: ({ children }) => <th className="border-b border-hairline px-3 py-2 font-semibold">{children}</th>,
  td: ({ children }) => <td className="border-b border-hairline px-3 py-2 align-top leading-6">{children}</td>,
  code: ({ className, children }) => {
    if (className === 'language-formula') {
      const lines = String(children).trim().split('\n');
      return (
        <span className="block space-y-1">
          {lines.map((l, i) => (
            <span key={i} className="block">{l}</span>
          ))}
        </span>
      );
    }
    return <code className="rounded bg-surface-sunken px-1 py-0.5 text-[0.9em]">{children}</code>;
  },
  pre: ({ children }) => (
    <div className="my-4 rounded-lg border-l-4 border-accent bg-accent-glow px-4 py-3 text-[15px] font-medium leading-7">{children}</div>
  ),
};

export default function Markdown({ source }: { source: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
      {source}
    </ReactMarkdown>
  );
}
