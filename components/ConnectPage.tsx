export default function ConnectPage() {
  return (
    <div className="w-full max-w-2xl mx-auto py-16 sm:py-24 px-4 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-3">
          Connect.
        </h1>
        <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
          Reach me directly by email or through the links below.
        </p>
      </div>

      <div className="space-y-3">
        <a
          href="mailto:tharun.gajula.2@gmail.com"
          className="flex items-center justify-between p-4 sm:p-5 rounded-xl border border-hairline bg-surface-raised hover:border-accent-dim transition-all group"
        >
          <div>
            <span className="text-xs font-medium text-ink-faint block uppercase tracking-wider mb-1">
              Email
            </span>
            <span className="text-sm sm:text-base font-medium text-ink group-hover:text-accent transition-colors break-all">
              tharun.gajula.2@gmail.com
            </span>
          </div>
          <span className="text-xs text-ink-faint group-hover:text-ink transition-colors ml-4 shrink-0">
            Send email &rarr;
          </span>
        </a>

        <a
          href="https://linkedin.com/in/tharungajula"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 sm:p-5 rounded-xl border border-hairline bg-surface-raised hover:border-accent-dim transition-all group"
        >
          <div>
            <span className="text-xs font-medium text-ink-faint block uppercase tracking-wider mb-1">
              LinkedIn
            </span>
            <span className="text-sm sm:text-base font-medium text-ink group-hover:text-accent transition-colors break-all">
              linkedin.com/in/tharungajula
            </span>
          </div>
          <span className="text-xs text-ink-faint group-hover:text-ink transition-colors ml-4 shrink-0">
            Open &rarr;
          </span>
        </a>

        <a
          href="https://github.com/tharungajula2"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 sm:p-5 rounded-xl border border-hairline bg-surface-raised hover:border-accent-dim transition-all group"
        >
          <div>
            <span className="text-xs font-medium text-ink-faint block uppercase tracking-wider mb-1">
              GitHub
            </span>
            <span className="text-sm sm:text-base font-medium text-ink group-hover:text-accent transition-colors break-all">
              github.com/tharungajula2
            </span>
          </div>
          <span className="text-xs text-ink-faint group-hover:text-ink transition-colors ml-4 shrink-0">
            Open &rarr;
          </span>
        </a>
      </div>
    </div>
  );
}
