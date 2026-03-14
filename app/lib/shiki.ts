import type { LanguageRegistration } from 'shiki/core';
import { createHighlighterCoreSync } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import tsx from 'shiki/langs/tsx.mjs';
import css from 'shiki/langs/css.mjs';
import shellscript from 'shiki/langs/shellscript.mjs';
import tastyGrammar from './tasty.tmLanguage.json';
import { tastyCodeTheme } from './shiki-theme';

const tastyLang = {
  ...tastyGrammar,
  name: 'tasty',
  injectTo: ['source.tsx', 'source.ts', 'source.js', 'source.jsx'],
} as unknown as LanguageRegistration;

const highlighter = createHighlighterCoreSync({
  themes: [tastyCodeTheme],
  langs: [tsx, css, shellscript, tastyLang],
  engine: createJavaScriptRegexEngine(),
});

export function highlightCode(code: string, lang: string) {
  return highlighter.codeToTokens(code.trim(), {
    lang,
    theme: 'tasty-code',
  });
}
