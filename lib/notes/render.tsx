import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkDirective from 'remark-directive';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeReact from 'rehype-react';
import * as jsxRuntime from 'react/jsx-runtime';
import React from 'react';
import { visit } from 'unist-util-visit';
import { MermaidDiagram } from '@/components/notes/MermaidDiagram';
import { Callout, CalloutType } from '@/components/notes/Callout';
import { ScrollTable } from '@/components/notes/ScrollTable';
import Slugger from 'github-slugger';

function getCodeString(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(getCodeString).join('');
  if (React.isValidElement<{ children?: React.ReactNode }>(children) && children.props && children.props.children) {
    return getCodeString(children.props.children);
  }
  return '';
}

interface DirectiveNode {
  type?: string;
  name?: string;
  attributes?: Record<string, unknown>;
  children?: DirectiveNode[];
  data?: Record<string, unknown>;
  [key: string]: unknown;
}

function remarkDirectiveTransform() {
  return (tree: unknown) => {
    visit(tree as never, (node: unknown) => {
      const n = node as DirectiveNode;
      if (
        n.type === 'containerDirective' ||
        n.type === 'leafDirective' ||
        n.type === 'textDirective'
      ) {
        const name = n.name;
        if (
          name === 'permanent-rule' ||
          name === 'never-confuse' ||
          name === 'trap' ||
          name === 'mental-model' ||
          name === 'key-insight'
        ) {
          const data = n.data || (n.data = {});
          data.hName = 'callout';
          data.hProperties = {
            type: name,
            ...(n.attributes || {}),
          };
        }

        if (name === 'never-confuse') {
          const children = (n.children || []) as DirectiveNode[];
          let currentHalf: 'left' | 'right' | null = null;
          let leftTitle = 'First Concept';
          let rightTitle = 'Second Concept';
          const leftChildren: DirectiveNode[] = [];
          const rightChildren: DirectiveNode[] = [];
          const unassignedChildren: DirectiveNode[] = [];
          let hasLeft = false;
          let hasRight = false;

          for (const child of children) {
            const isDir =
              child.type === 'leafDirective' ||
              child.type === 'containerDirective' ||
              child.type === 'textDirective';

            if (isDir && child.name === 'left') {
              hasLeft = true;
              currentHalf = 'left';
              if (child.children && child.children.length > 0) {
                leftTitle = String((child.children[0] as DirectiveNode)?.value || leftTitle);
              }
              continue;
            }

            if (isDir && child.name === 'right') {
              hasRight = true;
              currentHalf = 'right';
              if (child.children && child.children.length > 0) {
                rightTitle = String((child.children[0] as DirectiveNode)?.value || rightTitle);
              }
              continue;
            }

            if (currentHalf === 'left') {
              leftChildren.push(child);
            } else if (currentHalf === 'right') {
              rightChildren.push(child);
            } else {
              unassignedChildren.push(child);
            }
          }

          if (!hasLeft && !hasRight) {
            const halfLength = Math.ceil(children.length / 2);
            leftChildren.push(...children.slice(0, halfLength));
            rightChildren.push(...children.slice(halfLength));
          } else if (unassignedChildren.length > 0) {
            leftChildren.unshift(...unassignedChildren);
          }

          const leftHalfNode = {
            type: 'element',
            tagName: 'div',
            properties: {
              className: 'flex-1 min-w-0 flex flex-col gap-2 bg-foreground/[0.02] dark:bg-foreground/[0.04] p-3 rounded-md border border-border/40',
            },
            children: [
              {
                type: 'element',
                tagName: 'h4',
                properties: {
                  className: 'font-semibold font-sans text-xs uppercase tracking-wide text-foreground/85 mb-1 border-b border-border/30 pb-1 shrink-0',
                },
                children: [{ type: 'text', value: leftTitle }],
              },
              ...leftChildren,
            ],
          };

          const rightHalfNode = {
            type: 'element',
            tagName: 'div',
            properties: {
              className: 'flex-1 min-w-0 flex flex-col gap-2 bg-foreground/[0.02] dark:bg-foreground/[0.04] p-3 rounded-md border border-border/40',
            },
            children: [
              {
                type: 'element',
                tagName: 'h4',
                properties: {
                  className: 'font-semibold font-sans text-xs uppercase tracking-wide text-foreground/85 mb-1 border-b border-border/30 pb-1 shrink-0',
                },
                children: [{ type: 'text', value: rightTitle }],
              },
              ...rightChildren,
            ],
          };

          n.children = [leftHalfNode as unknown as DirectiveNode, rightHalfNode as unknown as DirectiveNode];
        }
      }
    });
  };
}

// Custom component for tables
const ResponsiveTable = (props: React.ComponentPropsWithoutRef<'table'>) => (
  <ScrollTable>
    <table {...props} />
  </ScrollTable>
);

// Custom component for pre blocks
const ResponsivePre = (props: React.ComponentPropsWithoutRef<'pre'> & { 'data-language'?: string }) => {
  const children = React.Children.toArray(props.children);
  const codeChild = children.find(
    (child) => React.isValidElement(child)
  );

  const isMermaid =
    props['data-language'] === 'mermaid' ||
    (codeChild && React.isValidElement<Record<string, unknown>>(codeChild) && (
      codeChild.props['data-language'] === 'mermaid' ||
      (typeof codeChild.props.className === 'string' && codeChild.props.className.includes('language-mermaid'))
    ));

  if (isMermaid && codeChild && React.isValidElement<{ children?: React.ReactNode }>(codeChild)) {
    const rawChart = getCodeString(codeChild.props.children).trim();
    return <MermaidDiagram chart={rawChart} />;
  }

  return (
    <div className="my-6 w-full max-w-full overflow-x-auto">
      <pre {...props} />
    </div>
  );
};

function parseViewBoxWidth(viewBox?: string | number): number | null {
  if (!viewBox) return null;
  const parts = String(viewBox).trim().split(/[\s,]+/);
  if (parts.length >= 4) {
    const w = parseFloat(parts[2]);
    if (!isNaN(w) && w > 0) return w;
  }
  return null;
}

function rehypeInlineSvgSize() {
  return (tree: unknown) => {
    visit(tree as never, 'element', (node: { tagName?: string; properties?: Record<string, unknown> }) => {
      if (node.tagName === 'svg') {
        if (!node.properties) return;
        if (node.properties['data-diagram-inner'] || node.properties['data-mermaid']) {
          return;
        }

        delete node.properties.width;
        delete node.properties.height;

        let vbWidth: number | null = null;
        if (node.properties.viewBox) {
          const parts = String(node.properties.viewBox).trim().split(/[\s,]+/);
          if (parts.length >= 4) {
            const w = parseFloat(parts[2]);
            if (!isNaN(w) && w > 0) vbWidth = w;
          }
        }

        const maxWidthPx = vbWidth ? Math.round(vbWidth * 1.5) : 560;
        node.properties.style = `width: 100%; max-width: ${maxWidthPx}px; height: auto; display: block; margin: 1.5rem auto;`;
      }
    });
  };
}

const ResponsiveSvg = (props: React.ComponentPropsWithoutRef<'svg'>) => {
  if (props['data-diagram-inner' as keyof typeof props] || props['data-mermaid' as keyof typeof props]) {
    return <svg {...props} />;
  }

  const { viewBox, ...restProps } = props;
  const vbWidth = parseViewBoxWidth(viewBox);
  const maxWidthPx = vbWidth ? Math.round(vbWidth * 1.5) : 560;

  const svgStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: `${maxWidthPx}px`,
    height: 'auto',
    display: 'block',
    margin: '1.5rem auto',
  };

  return <svg viewBox={viewBox} style={svgStyle} {...restProps} />;
};

/**
 * Extract ## headings from markdown content for the Table of Contents.
 *
 * IMPORTANT: Lines inside fenced code blocks (``` or ~~~, any language tag)
 * are content, not headings. A `## Heading` inside a code fence must not
 * become a TOC entry. This function tracks fence open/close state and skips
 * any heading-like line found while inside a fence.
 */
export function extractHeadings(content: string) {
  const headings: { id: string; text: string }[] = [];
  const slugger = new Slugger();

  // Process line by line, tracking fenced code block state.
  // A fence is opened/closed by a line that starts (after optional spaces) with
  // ``` or ~~~ (optionally followed by a language tag on the same line).
  const lines = content.split('\n');
  let insideFence = false;
  let fenceChar = '';   // '`' or '~' — the character that opened the current fence
  let fenceLen = 0;     // length of the opening fence marker (≥ 3)

  for (const line of lines) {
    // Detect fence open/close: a line starting with ≥3 identical ` or ~ characters
    const fenceMatch = line.match(/^(\s{0,3})(`{3,}|~{3,})/);
    if (fenceMatch) {
      const marker = fenceMatch[2];
      const ch = marker[0];
      const len = marker.length;

      if (!insideFence) {
        // Opening a new fence
        insideFence = true;
        fenceChar = ch;
        fenceLen = len;
        continue;
      } else if (ch === fenceChar && len >= fenceLen) {
        // Closing the current fence (same character, same or greater length)
        insideFence = false;
        fenceChar = '';
        fenceLen = 0;
        continue;
      }
      // Otherwise it's a fence-like line inside the fence — treat as content
    }

    if (insideFence) continue;

    // Match ## headings outside of fences
    const mdMatch = line.match(/^##\s+(.+)$/);
    if (mdMatch) {
      const text = mdMatch[1].trim();
      const id = slugger.slug(text);
      headings.push({ id, text });
    }
  }

  // Fallback: HTML h2 headings (for HTML notes that have no markdown headings)
  if (headings.length === 0) {
    const htmlRegex = /<h2(?:\s+id=["']([^"']+)["'])?[^>]*>(.*?)<\/h2>/gi;
    let htmlMatch;
    while ((htmlMatch = htmlRegex.exec(content)) !== null) {
      const rawId = htmlMatch[1];
      const text = htmlMatch[2].replace(/<[^>]*>/g, '').trim();
      const id = rawId || slugger.slug(text);
      headings.push({ id, text });
    }
  }

  return headings;
}

export async function renderMarkdown(content: string) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkDirective)
    .use(remarkDirectiveTransform)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeInlineSvgSize)
    .use(rehypeSlug)
    .use(rehypeKatex)
    .use(rehypePrettyCode, {
      theme: 'github-light',
      keepBackground: false,
    })
    .use(rehypeReact, {
      Fragment: React.Fragment,
      jsx: jsxRuntime.jsx,
      jsxs: jsxRuntime.jsxs,
      components: {
        table: ResponsiveTable,
        pre: ResponsivePre,
        svg: ResponsiveSvg,
        callout: (props: { type?: string; children?: React.ReactNode }) => (
          <Callout type={props.type as CalloutType}>{props.children}</Callout>
        ),
      },
    });

  const file = await processor.process(content);
  return file.result;
}
