export default function ConnectPage() {
  return (
    <div className="w-full max-w-2xl sm:max-w-[760px] mx-auto py-6 sm:py-12 px-2 sm:px-4">
      <div className="mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight mb-2">
          Connect.
        </h1>
        <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
          Reach me directly by email or through the links below.
        </p>
      </div>

      <div className="border-t border-b border-hairline">
        <a
          href="mailto:tharun.gajula.2@gmail.com"
          className="flex items-center justify-between py-4 sm:py-5 border-b border-hairline hover:bg-surface-sunken/40 -mx-2 sm:-mx-3 px-2 sm:px-3 rounded-md transition-colors group"
        >
          <div>
            <span className="text-xs font-semibold text-ink-faint block uppercase tracking-wider mb-1">
              Email
            </span>
            <span className="text-sm sm:text-base font-medium text-ink group-hover:text-ink transition-colors break-all">
              tharun.gajula.2@gmail.com
            </span>
          </div>
          <span className="text-xs font-sans text-ink-faint group-hover:text-ink group-hover:translate-x-0.5 transition-transform ml-4 shrink-0">
            Send email &rarr;
          </span>
        </a>

        <a
          href="https://linkedin.com/in/tharungajula"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between py-4 sm:py-5 border-b border-hairline hover:bg-surface-sunken/40 -mx-2 sm:-mx-3 px-2 sm:px-3 rounded-md transition-colors group"
        >
          <div>
            <span className="text-xs font-semibold text-ink-faint block uppercase tracking-wider mb-1">
              LinkedIn
            </span>
            <span className="text-sm sm:text-base font-medium text-ink group-hover:text-ink transition-colors break-all">
              linkedin.com/in/tharungajula
            </span>
          </div>
          <span className="text-xs font-sans text-ink-faint group-hover:text-ink group-hover:translate-x-0.5 transition-transform ml-4 shrink-0">
            Open &rarr;
          </span>
        </a>

        <a
          href="https://github.com/tharungajula2"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between py-4 sm:py-5 border-b-0 hover:bg-surface-sunken/40 -mx-2 sm:-mx-3 px-2 sm:px-3 rounded-md transition-colors group"
        >
          <div>
            <span className="text-xs font-semibold text-ink-faint block uppercase tracking-wider mb-1">
              GitHub
            </span>
            <span className="text-sm sm:text-base font-medium text-ink group-hover:text-ink transition-colors break-all">
              github.com/tharungajula2
            </span>
          </div>
          <span className="text-xs font-sans text-ink-faint group-hover:text-ink group-hover:translate-x-0.5 transition-transform ml-4 shrink-0">
            Open &rarr;
          </span>
        </a>
      </div>
    </div>
  );
}
