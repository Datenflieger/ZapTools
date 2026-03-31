type JsonOutputProps = {
  highlighted: string;
  error: string | null;
  isValid: boolean;
  canCopy: boolean;
  copyLabel: string;
  onCopy: () => void;
};

export const JsonOutput = ({
  highlighted,
  error,
  isValid,
  canCopy,
  copyLabel,
  onCopy,
}: JsonOutputProps) => (
  <section className="zap-panel rounded-[2rem] p-5 sm:p-6">
    <div className="mb-4 flex items-center justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Output</p>
        <h2 className="font-display text-2xl">Formatted (live preview)</h2>
      </div>
      <button
        type="button"
        onClick={onCopy}
        disabled={!canCopy}
        aria-label="Copy formatted JSON to clipboard"
        title="Copy formatted JSON to clipboard"
        className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink transition enabled:hover:border-accent enabled:hover:text-accent disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-accent"
      >
        {copyLabel === 'Copy' ? 'Copy JSON' : copyLabel}
      </button>
    </div>
    <div
      className="min-h-[400px] rounded-[1.5rem] border border-line bg-paper/50 p-4"
      aria-live="polite"
    >
      {error ? (
        <p className="max-w-prose font-medium leading-7 text-danger">{error}</p>
      ) : isValid ? (
        <pre className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-sm leading-7 text-ink">
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
      ) : (
        <p className="max-w-sm font-medium leading-7 text-muted">
          Drop in some JSON and JsonZap will pretty-print it with syntax colors.
        </p>
      )}
    </div>
  </section>
);
