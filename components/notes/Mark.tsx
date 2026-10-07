import React from 'react';

interface MarkProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  animated?: boolean;
}

export function Mark({ className = "h-4 w-auto", animated = false, ...props }: MarkProps) {
  return (
    <svg
      viewBox="0 0 108 88"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M4 84 L104 84 L104 4 L24 4 L24 64 L84 64 L84 24 L44 24 L44 44"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        className={animated ? "animate-draw-spiral" : undefined}
      />
      <circle
        cx="64"
        cy="44"
        r="9"
        fill="currentColor"
        className={animated ? "animate-fade-in-circle" : undefined}
      />
    </svg>
  );
}
