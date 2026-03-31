import { useMemo } from 'react';
import { useDebouncedValue } from './useDebouncedValue';

export type RegexMatch = {
  index: number;
  match: string;
  groups: string[];
};

export type RegexState = {
  isTyping: boolean;
  isValid: boolean;
  error: string | null;
  highlightedHtml: string;
  matches: RegexMatch[];
};

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const toFriendlyError = () => 'That pattern does not compile. Check the syntax or flags and try again.';

export const buildHighlightedHtml = (text: string, matches: RegexMatch[]) => {
  if (!text) return '';
  if (!matches.length) return escapeHtml(text);

  let cursor = 0;
  let html = '';

  matches.forEach(({ index, match }) => {
    const end = index + match.length;
    html += escapeHtml(text.slice(cursor, index));
    html += `<mark class="rounded-md bg-accent/20 px-1 py-0.5 font-semibold text-ink ring-1 ring-accent/25 dark:bg-accent/35 dark:text-paper dark:ring-accent/45">${escapeHtml(match)}</mark>`;
    cursor = end;
  });

  html += escapeHtml(text.slice(cursor));
  return html;
};

export const collectMatches = (text: string, pattern: string, flags: string) => {
  const scanFlags = flags.includes('g') ? flags : `${flags}g`;
  const regex = new RegExp(pattern, scanFlags);
  const matches: RegexMatch[] = [];
  let result: RegExpExecArray | null;

  while ((result = regex.exec(text)) !== null) {
    matches.push({
      index: result.index,
      match: result[0],
      groups: result.slice(1).map((group) => group ?? ''),
    });

    if (result[0] === '') {
      regex.lastIndex += 1;
    }
  }

  return matches;
};

export const evaluateRegex = (
  text: string,
  pattern: string,
  flags: string,
  isTyping: boolean,
): RegexState => {
  if (!pattern.trim()) {
    return {
      isTyping,
      isValid: false,
      error: null,
      highlightedHtml: escapeHtml(text),
      matches: [],
    };
  }

  try {
    new RegExp(pattern, flags);
    const matches = collectMatches(text, pattern, flags);

    return {
      isTyping,
      isValid: true,
      error: null,
      highlightedHtml: buildHighlightedHtml(text, matches),
      matches,
    };
  } catch {
    return {
      isTyping,
      isValid: false,
      error: toFriendlyError(),
      highlightedHtml: escapeHtml(text),
      matches: [],
    };
  }
};

export const useRegexTester = (text: string, pattern: string, flags: string): RegexState => {
  const debounced = useDebouncedValue({ text, pattern, flags }, 300);

  return useMemo(() => {
    const isTyping = text !== debounced.text || pattern !== debounced.pattern || flags !== debounced.flags;
    return evaluateRegex(debounced.text, debounced.pattern, debounced.flags, isTyping);
  }, [debounced, flags, pattern, text]);
};
