import { useMemo } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import { useDebouncedValue } from './useDebouncedValue';

type ParseState = {
  error: string | null;
  formatted: string;
  highlighted: string;
  isValid: boolean;
  isTyping: boolean;
};

const formatError = (message: string) =>
  message
    .replace('Unexpected token', 'Oops, weird token')
    .replace('Unexpected end of JSON input', 'Oops, looks like a bracket is missing')
    .replace('in JSON at position', 'around character');

export const useJsonParser = (input: string): ParseState => {
  const debouncedInput = useDebouncedValue(input, 300);

  return useMemo(() => {
    if (!debouncedInput.trim()) {
      return {
        error: null,
        formatted: '',
        highlighted: '',
        isValid: false,
        isTyping: input !== debouncedInput,
      };
    }

    try {
      const parsed = JSON.parse(debouncedInput);
      const formatted = JSON.stringify(parsed, null, 2);
      return {
        error: null,
        formatted,
        highlighted: Prism.highlight(formatted, Prism.languages.json, 'json'),
        isValid: true,
        isTyping: input !== debouncedInput,
      };
    } catch (error) {
      const message =
        error instanceof Error ? formatError(error.message) : 'Nah, that JSON is doing something cursed.';
      return {
        error: `Nah, try again. ${message}.`,
        formatted: '',
        highlighted: '',
        isValid: false,
        isTyping: input !== debouncedInput,
      };
    }
  }, [debouncedInput, input]);
};
