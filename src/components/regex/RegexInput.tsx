type RegexInputProps = {
  text: string;
  pattern: string;
  flags: string;
  isTyping: boolean;
  statusText: string;
  statusTone: 'neutral' | 'success' | 'danger';
  onTextChange: (value: string) => void;
  onPatternChange: (value: string) => void;
  onFlagsChange: (value: string) => void;
};

const statusClass = {
  neutral: 'text-muted',
  success: 'text-success',
  danger: 'text-danger',
};

export const RegexInput = ({
  text,
  pattern,
  flags,
  isTyping,
  statusText,
  statusTone,
  onTextChange,
  onPatternChange,
  onFlagsChange,
}: RegexInputProps) => (
  <section className="zap-panel rounded-[2rem] p-5 sm:p-6">
    <div className="mb-5">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Raw text</p>
      <h2 className="font-display text-2xl">Test text</h2>
    </div>
    <label htmlFor="regex-text" className="sr-only">
      Test text
    </label>
    <textarea
      id="regex-text"
      spellCheck={false}
      value={text}
      onChange={(event) => onTextChange(event.target.value)}
      placeholder="Paste the text you want to test against."
      className="h-[320px] w-full rounded-[1.5rem] border border-line bg-paper/60 p-4 font-mono text-sm leading-7 text-ink outline-none transition placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
    />
    <div className="mt-5 grid gap-4">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-accent">Pattern & flags</p>
        <label htmlFor="regex-pattern" className="sr-only">
          Regex pattern
        </label>
        <input
          id="regex-pattern"
          type="text"
          spellCheck={false}
          value={pattern}
          onChange={(event) => onPatternChange(event.target.value)}
          placeholder="\\b\\w+@\\w+\\.\\w+\\b"
          className="w-full rounded-full border border-line bg-paper/60 px-4 py-3 font-mono text-sm text-ink outline-none transition placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>
      <div>
        <label htmlFor="regex-flags" className="mb-2 block text-xs font-bold uppercase tracking-[0.3em] text-muted">
          Flags
        </label>
        <input
          id="regex-flags"
          type="text"
          spellCheck={false}
          value={flags}
          onChange={(event) => onFlagsChange(event.target.value)}
          placeholder="gim"
          className="w-full rounded-full border border-line bg-paper/60 px-4 py-3 font-mono text-sm text-ink outline-none transition placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>
    </div>
    <p className={`mt-4 text-sm ${statusClass[statusTone]}`} aria-live="polite">
      {isTyping ? 'Checking your regex ...' : statusText}
    </p>
  </section>
);
