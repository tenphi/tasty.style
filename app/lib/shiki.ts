import type { LanguageRegistration, ThemedToken } from 'shiki/core';
import { createHighlighterCoreSync } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import tsx from 'shiki/langs/tsx.mjs';
import jsx from 'shiki/langs/jsx.mjs';
import javascript from 'shiki/langs/javascript.mjs';
import typescript from 'shiki/langs/typescript.mjs';
import css from 'shiki/langs/css.mjs';
import json from 'shiki/langs/json.mjs';
import html from 'shiki/langs/html.mjs';
import shellscript from 'shiki/langs/shellscript.mjs';
import astro from 'shiki/langs/astro.mjs';
import tastyGrammar from './tasty.tmLanguage.json';
import { tastyCodeTheme } from './shiki-theme';

const tastyLang = {
  ...tastyGrammar,
  name: 'tasty',
  injectTo: ['source.tsx', 'source.ts', 'source.js', 'source.jsx'],
} as unknown as LanguageRegistration;

const highlighter = createHighlighterCoreSync({
  themes: [tastyCodeTheme],
  langs: [
    tsx,
    jsx,
    javascript,
    typescript,
    css,
    json,
    html,
    shellscript,
    astro,
    tastyLang,
  ],
  engine: createJavaScriptRegexEngine(),
});

const LANG_ALIASES: Record<string, string> = {
  js: 'javascript',
  ts: 'typescript',
  bash: 'shellscript',
  sh: 'shellscript',
  shell: 'shellscript',
};

export function highlightCode(code: string, lang: string) {
  const resolved = LANG_ALIASES[lang] || lang;

  try {
    return highlighter.codeToTokens(code.trim(), {
      lang: resolved,
      theme: 'tasty-code',
    });
  } catch {
    return highlighter.codeToTokens(code.trim(), {
      lang: 'text',
      theme: 'tasty-code',
    });
  }
}

export function tokenizeCode(code: string, lang: string) {
  const resolved = LANG_ALIASES[lang] || lang;

  try {
    return highlighter.codeToTokens(code, {
      lang: resolved,
      theme: 'tasty-code',
    });
  } catch {
    return { tokens: [] as ThemedToken[][] };
  }
}
