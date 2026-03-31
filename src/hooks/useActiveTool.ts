import { useState } from 'react';

export type ToolId = 'json' | 'regex';

type UseActiveToolResult = {
  activeTool: ToolId;
  setActive: (tool: ToolId) => void;
};

export const useActiveTool = (): UseActiveToolResult => {
  const [activeTool, setActiveTool] = useState<ToolId>('json');

  return {
    activeTool,
    setActive: setActiveTool,
  };
};
