import { JsonApp } from './components/JsonApp';
import { RegexApp } from './components/RegexApp';
import { ToolTabs } from './components/ToolTabs';
import { ThemeToggle } from './components/shared/ThemeToggle';
import { useActiveTool, type ToolId } from './hooks/useActiveTool';
import { useTheme } from './hooks/useTheme';

const toolCopy: Record<ToolId, { eyebrow: string; title: string; description: string }> = {
  json: {
    eyebrow: 'JSON',
    title: 'Fix busted JSON fast.',
    description: 'Format it, validate it, and get back to shipping before your tabs hit double digits.',
  },
  regex: {
    eyebrow: 'REGEX',
    title: 'Test regex in 1 second.',
    description: 'Paste text, type a pattern, see matches and an explanation.',
  },
};

function App() {
  const { activeTool, setActive } = useActiveTool();
  const { theme, resolvedTheme, toggleTheme } = useTheme();
  const content = toolCopy[activeTool];

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-6 border-b border-line pb-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-accent">ZapTools</p>
            <h1 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.92]">
              One fast workspace for developer text tools.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              Start with JSON and Regex today, then grow the suite by dropping in new tools without rebuilding the shell.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start">
            <ThemeToggle theme={theme} resolvedTheme={resolvedTheme} onToggle={toggleTheme} />
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-accent">{content.eyebrow}</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.96]">{content.title}</h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-muted">{content.description}</p>
          </div>
          <ToolTabs activeTool={activeTool} onChange={setActive} />
        </div>
      </div>

      {activeTool === 'json' ? <JsonApp /> : <RegexApp />}
    </main>
  );
}

export default App;
