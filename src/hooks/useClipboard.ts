import { useEffect, useState } from 'react';

type UseClipboardOptions = {
  defaultLabel: string;
  successLabel: string;
  errorLabel: string;
  resetDelay?: number;
};

type UseClipboardResult = {
  copyLabel: string;
  copyText: (value: string) => Promise<void>;
};

export const useClipboard = ({
  defaultLabel,
  successLabel,
  errorLabel,
  resetDelay = 1800,
}: UseClipboardOptions): UseClipboardResult => {
  const [copyLabel, setCopyLabel] = useState(defaultLabel);

  useEffect(() => {
    if (copyLabel === defaultLabel) return;
    const timer = window.setTimeout(() => setCopyLabel(defaultLabel), resetDelay);
    return () => window.clearTimeout(timer);
  }, [copyLabel, defaultLabel, resetDelay]);

  const copyText = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyLabel(successLabel);
    } catch {
      setCopyLabel(errorLabel);
    }
  };

  return { copyLabel, copyText };
};
