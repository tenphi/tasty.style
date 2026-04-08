import type { FileSystemTree } from '@webcontainer/api';
import { DEFAULT_EXAMPLE, DEFAULT_CONFIG, ICONS_CODE } from './examples';

export { DEFAULT_CONFIG };

export const DEFAULT_CODE = DEFAULT_EXAMPLE.code;

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
import { createRoot } from 'react-dom/client';

configure({ forceTextInjection: true });

const root = createRoot(document.getElementById('app')!);
root.render(<App />);

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
): FileSystemTree {
  return {
    src: {
      directory: {
        'main.tsx': { file: { contents: MAIN_TSX } },
        'App.tsx': { file: { contents: code } },
        'config.ts': { file: { contents: config } },
        'icons.tsx': { file: { contents: ICONS_CODE } },
      },
    },
  };
}
