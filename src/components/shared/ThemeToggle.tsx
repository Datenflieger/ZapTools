type ThemeToggleProps = {
  theme: 'light' | 'dark' | 'system';
  resolvedTheme: 'light' | 'dark';
  onToggle: () => void;
};

export const ThemeToggle = ({ theme, resolvedTheme, onToggle }: ThemeToggleProps) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label={
      theme === 'system'
        ? `Theme mode is set to system, currently ${resolvedTheme}. Switch theme mode.`
        : `Switch theme mode from ${theme} to ${theme === 'light' ? 'dark' : 'system'}.`
    }
    className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
  >
    <span className="font-display text-base">
      {theme === 'system' ? `Auto (${resolvedTheme.toUpperCase()})` : theme.toUpperCase()}
    </span>
    <span className="text-xs uppercase tracking-[0.3em] text-muted">Mode</span>
  </button>
);
