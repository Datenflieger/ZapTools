import { useEffect, useState } from 'react';
import { RegexInput } from './regex/RegexInput';
import { RegexOutput } from './regex/RegexOutput';
import { useClipboard } from '../hooks/useClipboard';
import { useRegexTester } from '../hooks/useRegexTester';

const sampleText = `Team sync starts at 09:30 in Meeting Room B.
Please bring the Q2 notes, the updated roadmap, and three printed copies.
If you are late, message the office desk before 09:15.`;

const samplePattern = '\\b\\d{2}:\\d{2}\\b';
const sampleFlags = 'g';

const escapeToken = (value: string) => value.replaceAll('\\', '\\\\');

const describeFlags = (flags: string) => {
  const map: Record<string, string> = {
    g: 'searches globally for every match',
    i: 'ignores letter case',
    m: 'treats each line as having its own start and end',
    s: 'lets dots cross line breaks',
    u: 'uses Unicode-aware matching',
    y: 'sticks to the current cursor position',
    d: 'tracks match indices',
    v: 'enables set notation and newer Unicode features',
  };

  return [...flags].map((flag) => map[flag]).filter(Boolean);
};

const explainPattern = (pattern: string, flags: string) => {
  if (!pattern.trim()) return [];

  const tokenMap: Record<string, string> = {
    '^': 'anchors to the start',
    '$': 'anchors to the end',
    '.': 'matches any character',
    '\\d': 'matches a digit',
    '\\D': 'matches a non-digit',
    '\\w': 'matches a word character',
    '\\W': 'matches a non-word character',
    '\\s': 'matches whitespace',
    '\\S': 'matches non-whitespace',
    '\\b': 'checks for a word boundary',
    '\\B': 'checks for a non-word boundary',
  };

  const phrases: string[] = [];
  let complex = false;

  for (let index = 0; index < pattern.length; index += 1) {
    const char = pattern[index];
    const next = pattern[index + 1];

    if (char === '\\' && next) {
      phrases.push(tokenMap[`${char}${next}`] ?? `matches escaped ${escapeToken(next)}`);
      index += 1;
      continue;
    }

    if (char === '[') {
      const end = pattern.indexOf(']', index + 1);
      phrases.push(
        end > index ? `matches one character from ${pattern.slice(index, end + 1)}` : 'starts a character set',
      );
      if (end > index) index = end;
      continue;
    }

    if (char === '(') {
      const prefix = pattern.slice(index, index + 4);
      phrases.push(prefix.startsWith('(?:') ? 'starts a non-capturing group' : 'starts a capture group');
      complex ||= prefix.startsWith('(?');
      continue;
    }

    if (char === '|') {
      phrases.push('tries the left option or the right option');
      continue;
    }

    if (char === '+' || char === '*' || char === '?') {
      const counts: Record<string, string> = {
        '+': 'repeats the previous token one or more times',
        '*': 'repeats the previous token zero or more times',
        '?': 'makes the previous token optional',
      };
      phrases.push(counts[char]);
      continue;
    }

    if (char === '{') {
      const end = pattern.indexOf('}', index + 1);
      phrases.push(end > index ? `repeats the previous token ${pattern.slice(index + 1, end)} times` : 'uses a repeat range');
      if (end > index) index = end;
      continue;
    }

    if (tokenMap[char]) {
      phrases.push(tokenMap[char]);
      continue;
    }

    if (char !== ')') {
      phrases.push(`matches "${char}"`);
    }
  }

  const bullets: string[] = [];
  if (phrases.length) bullets.push(`${phrases.slice(0, 4).join(', ')}.`);
  if (phrases.length > 4) bullets.push(`${phrases.slice(4, 8).join(', ')}.`);
  const flagLines = describeFlags(flags);
  if (flagLines.length) bullets.push(`Flags: ${flagLines.join(', ')}.`);
  if (phrases.length > 8 || complex) bullets.push('Complex pattern, explanation may be incomplete.');
  return bullets.slice(0, 5);
};

export const RegexApp = () => {
  const [text, setText] = useState(sampleText);
  const [pattern, setPattern] = useState(samplePattern);
  const [flags, setFlags] = useState(sampleFlags);
  const { copyLabel, copyText } = useClipboard({
    defaultLabel: 'Copy matches',
    successLabel: 'Copied!',
    errorLabel: 'Clipboard blocked',
  });
  const [explanation, setExplanation] = useState<string[]>([]);
  const { error, highlightedHtml, isValid, isTyping, matches } = useRegexTester(text, pattern, flags);

  useEffect(() => setExplanation([]), [pattern, flags]);

  const handleCopy = async () => {
    if (!matches.length) return;
    await copyText(matches.map((item) => item.match).join('\n'));
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <RegexInput
        text={text}
        pattern={pattern}
        flags={flags}
        isTyping={isTyping}
        statusText={
          error
            ? error
            : isValid
              ? 'Pattern compiled successfully.'
              : 'Add a pattern to start matching.'
        }
        statusTone={error ? 'danger' : isValid ? 'success' : 'neutral'}
        onTextChange={setText}
        onPatternChange={setPattern}
        onFlagsChange={setFlags}
      />
      <RegexOutput
        highlightedHtml={highlightedHtml}
        matches={matches}
        explanation={explanation}
        isTyping={isTyping}
        error={error}
        isValid={isValid}
        copyLabel={copyLabel}
        onCopy={handleCopy}
        onExplain={() => setExplanation(explainPattern(pattern, flags))}
      />
    </section>
  );
};
