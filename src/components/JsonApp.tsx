import { useState } from 'react';
import { JsonInput } from './json/JsonInput';
import { JsonOutput } from './json/JsonOutput';
import { useClipboard } from '../hooks/useClipboard';
import { useJsonParser } from '../hooks/useJsonParser';

const sampleJson = `{"creator":"Datenflieger","stack":["React","Vite","Tailwind"],"ready":true}`;

export const JsonApp = () => {
  const [input, setInput] = useState(sampleJson);
  const { copyLabel, copyText } = useClipboard({
    defaultLabel: 'Copy',
    successLabel: 'Copied!',
    errorLabel: 'Clipboard blocked',
  });
  const { error, formatted, highlighted, isValid, isTyping } = useJsonParser(input);

  const handleApply = () => {
    if (!formatted) return;
    setInput(formatted);
  };

  const handleCopy = async () => {
    if (!formatted) return;
    await copyText(formatted);
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <JsonInput value={input} onChange={setInput} onFormat={handleApply} isTyping={isTyping} />
      <JsonOutput
        highlighted={highlighted}
        error={error}
        isValid={isValid}
        canCopy={Boolean(formatted)}
        copyLabel={copyLabel}
        onCopy={handleCopy}
      />
    </section>
  );
};
