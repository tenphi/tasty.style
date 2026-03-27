import type { FileSystemTree } from '@webcontainer/api';
import { DEFAULT_EXAMPLE } from './examples';

export const DEFAULT_CODE = DEFAULT_EXAMPLE.code;

export const DEFAULT_CONFIG = `import { configure } from '@tenphi/tasty';
import { glaze } from '@tenphi/glaze';

const theme = glaze(240, 75);

theme.colors({
  surface: { lightness: 100, saturation: 0.1 },
  text: { base: 'surface', lightness: 0, contrast: 'AAA', saturation: 0.08 },
  'text-soft': {
    base: 'surface',
    lightness: 20,
    contrast: ['AA', 'AAA'],
    saturation: 0.05,
  },
  border: {
    base: 'surface',
    lightness: ['-10', '-20'],
    saturation: 0.35,
  },
  'accent-surface-text': { lightness: 100, mode: 'fixed' },
  'accent-surface': {
    base: 'accent-surface-text',
    lightness: '-48',
    contrast: ['AA', 7],
    mode: 'fixed',
  },
  'accent-text': {
    base: 'surface',
    lightness: 50,
    contrast: ['AA', 'AAA'],
    saturation: 0.9,
  },
  white: { lightness: 100, saturation: 0, mode: 'static' },
  black: { lightness: 0, saturation: 0, mode: 'static' },
});

configure({
  tokens: {
    ...theme.tasty({
      prefix: false,
      modes: { highContrast: true },
      states: {
        dark: '@dark-root',
        highContrast: '@high-contrast-root',
      },
    }),
    $gap: '8px',
    $radius: '8px',
    '$border-width': '1px',
  },
  states: {
    '@mobile': '@media(w < 768px)',
    '@tablet': '@media(w < 1024px)',
    '@desktop': '@media(w >= 1024px)',
    '@dark-root': 'schema=dark | (!schema & @media(prefers-color-scheme: dark))',
    '@high-contrast-root':
      'contrast=more | (!contrast & @media(prefers-contrast: more))',
    '@dark':
      '@root(schema=dark) | (!@root(schema) & @media(prefers-color-scheme: dark))',
    '@high-contrast':
      '@root(contrast=more) | (!@root(contrast) & @media(prefers-contrast: more))',
    '@reduce-motion': '@media(prefers-reduced-motion: reduce)',
  },
});
`;

export const DEFAULT_GLOBAL = `import { useGlobalStyles } from '@tenphi/tasty';

export function useAppGlobalStyles() {
  useGlobalStyles('body', {
    fill: '#surface',
    color: '#text',
    preset: 't2',
    margin: 0,
    padding: '2x',
    fontFamily: 'system-ui, sans-serif',
  });
}
`;

export const PREVIEW_SCRIPT = `
(function() {
  var debounceTimer = null;

  function sendUpdate() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function() {
      var css = '';
      var html = '';

      try {
        css = typeof window.__getPlaygroundCSS === 'function'
          ? window.__getPlaygroundCSS()
          : '';
      } catch (e) {
        css = '/* Error collecting CSS: ' + e.message + ' */';
      }

      try {
        html = typeof window.__getPlaygroundHTML === 'function'
          ? window.__getPlaygroundHTML()
          : '';
      } catch (e) {
        html = '<!-- Error collecting HTML: ' + e.message + ' -->';
      }

      window.parent.postMessage({
        type: 'tasty-playground-update',
        css: css,
        html: html,
      }, '*');
    }, 150);
  }

  var observer = new MutationObserver(sendUpdate);

  function startObserving() {
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      startObserving();
      setTimeout(sendUpdate, 300);
    });
  } else {
    startObserving();
    setTimeout(sendUpdate, 300);
  }

  window.addEventListener('load', function() {
    setTimeout(sendUpdate, 500);
  });

  function applyRootAttr(name, value) {
    if (value) {
      document.documentElement.setAttribute('data-' + name, value);
    } else {
      document.documentElement.removeAttribute('data-' + name);
    }
  }

  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'tasty-playground-root-states') {
      applyRootAttr('schema', event.data.schema);
      applyRootAttr('contrast', event.data.contrast);
    }
  });

  window.parent.postMessage({ type: 'tasty-playground-request-root-states' }, '*');
})();
`;

const MAIN_TSX = `import './config';
import { configure, tastyDebug } from '@tenphi/tasty';
import { App } from './App';
import { useAppGlobalStyles } from './global';
import { createRoot } from 'react-dom/client';

configure({ forceTextInjection: true });

function Root() {
  useAppGlobalStyles();
  return <App />;
}

const root = createRoot(document.getElementById('app')!);
root.render(<Root />);

(window as any).__getPlaygroundCSS = () => {
  try {
    return tastyDebug.css('all', { raw: true, prettify: true });
  } catch {
    return '';
  }
};

(window as any).__getPlaygroundHTML = () => {
  const app = document.getElementById('app');
  return app?.innerHTML ?? '';
};
`;

/**
 * Runs inside the WebContainer after mounting the snapshot to recreate
 * node_modules/.bin symlinks with executable permissions.
 * The snapshot format does not preserve permissions or symlinks, so
 * bins must be set up manually (same approach as learn.svelte.dev).
 */
export const SETUP_BINS_SCRIPT = `
const fs = require('fs');
const path = require('path');

const binDir = 'node_modules/.bin';
if (!fs.existsSync(binDir)) fs.mkdirSync(binDir, { recursive: true });

const bins = {
  vite: '../vite/bin/vite.js',
  tsc: '../typescript/bin/tsc',
  tsserver: '../typescript/bin/tsserver',
};

for (const [name, target] of Object.entries(bins)) {
  const linkPath = path.join(binDir, name);
  try { fs.unlinkSync(linkPath); } catch {}
  fs.symlinkSync(target, linkPath);
  fs.chmodSync(linkPath, 0o755);
}
`;

export async function fetchPlaygroundSnapshot(): Promise<ArrayBuffer> {
  const res = await fetch('/playground-snapshot.bin');

  if (!res.ok) {
    throw new Error('Failed to load playground snapshot');
  }

  return res.arrayBuffer();
}

export function getSourceFiles(
  code: string,
  config: string,
  global: string,
): FileSystemTree {
  return {
    src: {
      directory: {
        'main.tsx': { file: { contents: MAIN_TSX } },
        'App.tsx': { file: { contents: code } },
        'config.ts': { file: { contents: config } },
        'global.ts': { file: { contents: global } },
      },
    },
  };
}
