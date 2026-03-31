import type { ToolId } from '../hooks/useActiveTool';

type ToolTabsProps = {
  activeTool: ToolId;
  onChange: (tool: ToolId) => void;
};

const tools: Array<{ id: ToolId; label: string }> = [
  { id: 'json', label: 'JSON' },
  { id: 'regex', label: 'REGEX' },
];

export const ToolTabs = ({ activeTool, onChange }: ToolTabsProps) => (
  <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
    {tools.map((tool) => {
      const isActive = activeTool === tool.id;

      return (
        <button
          key={tool.id}
          type="button"
          onClick={() => onChange(tool.id)}
          aria-pressed={isActive}
          className={`rounded-full border px-5 py-3 text-sm font-bold uppercase tracking-[0.28em] transition focus:outline-none focus:ring-2 focus:ring-accent ${
            isActive
              ? 'border-accent bg-accent text-paper'
              : 'border-line bg-panel text-muted hover:border-accent hover:text-accent'
          }`}
        >
          {tool.label}
        </button>
      );
    })}
  </div>
);
