declare module 'prismjs' {
  const Prism: {
    highlight: (text: string, grammar: unknown, language: string) => string;
    languages: Record<string, unknown>;
  };

  export default Prism;
}
