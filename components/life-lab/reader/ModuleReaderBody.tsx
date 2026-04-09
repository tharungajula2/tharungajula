import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { slugify } from "@/lib/life-lab/content";

interface ModuleReaderBodyProps {
  content: string;
  moduleTitle?: string;
}

export function ModuleReaderBody({ content, moduleTitle }: ModuleReaderBodyProps) {
  // Logic to suppress the first H1 if it matches the module title
  let firstH1Suppressed = false;

  return (
    <div className="life-lab-reader max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ className, children, ...props }) => {
            const hasMatch = moduleTitle && 
              React.Children.toArray(children).some(child => 
                typeof child === 'string' && child.toLowerCase() === moduleTitle.toLowerCase()
              );
            
            if (hasMatch && !firstH1Suppressed) {
              firstH1Suppressed = true;
              return null; // Suppress the duplicate title
            }
            
            return (
              <h1 className={cn("text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-16 mb-8 first:mt-0 font-heading leading-tight", className)} {...props}>
                {children}
              </h1>
            );
          },
          h2: ({ className, children, ...props }) => {
            const text = React.Children.toArray(children).join("");
            const id = slugify(text);
            return (
              <h2 id={id} className={cn("text-2xl md:text-3xl font-bold text-white tracking-tight mt-24 mb-10 font-heading border-l-4 border-cyan-400 pl-8 scroll-mt-40", className)} {...props}>
                {children}
              </h2>
            );
          },
          h3: ({ className, children, ...props }) => {
            const text = React.Children.toArray(children).join("");
            const id = slugify(text);
            return (
              <h3 id={id} className={cn("text-xl md:text-2xl font-bold text-slate-100 tracking-tight mt-16 mb-6 scroll-mt-40", className)} {...props}>
                {children}
              </h3>
            );
          },
          p: ({ className, ...props }) => (
            <p className={cn("text-base md:text-[19px] text-slate-400 leading-relaxed md:leading-[1.95] mb-10 font-body font-light", className)} {...props} />
          ),
          ul: ({ className, ...props }) => (
            <ul className={cn("list-none space-y-5 mb-12 ml-0", className)} {...props} />
          ),
          ol: ({ className, ...props }) => (
            <ol className={cn("list-decimal space-y-5 mb-12 ml-8 text-slate-400 font-body leading-relaxed md:text-[18px]", className)} {...props} />
          ),
          li: ({ className, ...props }) => (
            <li className={cn("text-base md:text-[18px] text-slate-400 leading-relaxed font-body font-light pl-2 marker:text-cyan-400 marker:font-black", className)} {...props} />
          ),
          blockquote: ({ className, ...props }) => (
            <blockquote className={cn("border-l-4 border-white/10 bg-white/5 p-10 md:p-14 my-16 italic text-slate-200 font-body text-xl md:text-2xl leading-relaxed rounded-r-2xl max-w-2xl mx-auto shadow-2xl", className)} {...props} />
          ),
          hr: ({ className, ...props }) => (
            <hr className={cn("my-28 border-white/5", className)} {...props} />
          ),
          code: ({ className, ...props }) => (
            <code className={cn("bg-white/10 px-1.5 py-0.5 rounded text-cyan-400 font-mono text-[13px]", className)} {...props} />
          ),
          pre: ({ className, ...props }) => (
            <pre className={cn("bg-slate-900/50 border border-white/10 rounded-2xl p-8 my-14 overflow-x-auto shadow-inner", className)} {...props} />
          ),
          strong: ({ className, ...props }) => (
            <strong className={cn("font-bold text-white tracking-tight", className)} {...props} />
          ),
          em: ({ className, ...props }) => (
            <em className={cn("italic text-slate-200", className)} {...props} />
          ),
          a: ({ className, ...props }) => (
            <a className={cn("text-cyan-400 hover:text-cyan-300 underline underline-offset-4 decoration-cyan-400/30 transition-colors cursor-pointer font-medium", className)} {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
