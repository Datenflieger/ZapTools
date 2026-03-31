type RegexOutputProps = {
  highlightedHtml: string;
  matches: Array<{ index: number; match: string; groups: string[] }>;
  explanation: string[];
  isTyping: boolean;
  isValid: boolean;
  error: string | null;
  copyLabel: string;
  onCopy: () => void;
  onExplain: () => void;
};

export const RegexOutput = ({
  highlightedHtml,
  matches,
  explanation,
  isTyping,
  isValid,
  error,
  copyLabel,
  onCopy,
  onExplain,
}: RegexOutputProps) => (
  <section className="zap-panel rounded-[2rem] p-5 sm:p-6">
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Matches & explain</p>
        <h2 className="font-display text-2xl">Live preview</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onExplain}
          disabled={!isValid}
          className="rounded-full bg-accent px-5 py-3 font-display text-sm uppercase tracking-[0.24em] text-paper transition enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Explain pattern
        </button>
        <button
          type="button"
          onClick={onCopy}
          disabled={!matches.length}
          className="inline-flex min-w-[10rem] items-center justify-center rounded-full border border-line px-4 py-3 text-sm font-semibold text-ink transition enabled:hover:border-accent enabled:hover:text-accent disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {copyLabel}
        </button>
      </div>
    </div>
    <div className="grid gap-4">
      <div className="min-h-[220px] rounded-[1.5rem] border border-line bg-paper/50 p-4" aria-live="polite">
        {error ? (
          <p className="max-w-prose font-medium leading-7 text-danger">{error}</p>
        ) : isValid ? (
          <pre className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-sm leading-7 text-ink">
            <code dangerouslySetInnerHTML={{ __html: highlightedHtml || 'No text yet.' }} />
          </pre>
        ) : (
          <p className="max-w-sm font-medium leading-7 text-muted">
            Add a pattern and RegexZap will highlight every match in your text.
          </p>
        )}
      </div>
      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.5rem] border border-line bg-paper/40 p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-muted">Matches</p>
          <div className="max-h-[240px] space-y-3 overflow-y-auto pr-1 text-sm">
            {matches.length ? matches.map((item) => (
              <div key={`${item.index}-${item.match}`} className="rounded-2xl border border-line bg-panel/50 p-3">
                <p className="font-semibold text-ink">#{item.index} <span className="font-mono text-muted">{item.match || '(empty match)'}</span></p>
                <p className="mt-1 text-muted">Groups: {item.groups.length ? item.groups.map((group) => group || '(empty)').join(', ') : 'none'}</p>
              </div>
            )) : (
              <p className="leading-7 text-muted">{isTyping ? 'Scanning ...' : 'No matches yet.'}</p>
            )}
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-line bg-paper/40 p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-muted">Explanation</p>
          <div className="space-y-2 text-sm leading-7 text-ink">
            {explanation.length ? explanation.map((line) => <p key={line}>• {line}</p>) : (
              <p className="text-muted">Hit explain to get a quick read on what this regex is doing.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
);
