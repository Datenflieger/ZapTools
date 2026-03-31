type JsonInputProps = {
  value: string;
  onChange: (value: string) => void;
  onFormat: () => void;
  isTyping: boolean;
};

export const JsonInput = ({ value, onChange, onFormat, isTyping }: JsonInputProps) => (
  <section className="zap-panel rounded-[2rem] p-5 sm:p-6">
    <div className="mb-4 flex items-center justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Input</p>
        <h2 className="font-display text-2xl">Raw JSON (paste here)</h2>
      </div>
      <button
        type="button"
        onClick={onFormat}
        title="Copy formatted back to input"
        aria-label="Copy formatted back to input"
        className="rounded-full bg-accent px-5 py-3 font-display text-sm uppercase tracking-[0.24em] text-paper transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-accent"
      >
        ← Paste Formatted
      </button>
    </div>
    <label htmlFor="json-input" className="sr-only">
      JSON input
    </label>
    <textarea
      id="json-input"
      aria-label="JSON input"
      spellCheck={false}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder='{"shipIt":true,"tabsOpen":12}'
      className="h-[400px] w-full rounded-[1.5rem] border border-line bg-paper/60 p-4 font-mono text-sm leading-7 text-ink outline-none transition placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
    />
    <p className="mt-3 text-sm text-muted" aria-live="polite">
      {isTyping ? 'Checking your JSON ...' : 'Runs on a 300ms debounce, so typing stays smooth.'}
    </p>
  </section>
);
