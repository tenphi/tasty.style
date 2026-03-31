import { zipSync, strToU8 } from 'fflate';
import { ICONS_CODE } from './examples';

const PACKAGE_JSON = JSON.stringify(
  {
    name: 'tasty-playground',
    private: true,
    type: 'module',
    scripts: { dev: 'vite' },
    dependencies: {
      react: '^19.1.0',
      'react-dom': '^19.1.0',
      '@tenphi/tasty': '0.15.3',
      '@tenphi/glaze': '0.9.1',
    },
    devDependencies: {
      '@vitejs/plugin-react': '^4.5.2',
      vite: '^6.3.5',
      typescript: '^5.8.3',
      '@types/react': '^19.1.2',
      '@types/react-dom': '^19.1.2',
    },
  },
  null,
  2,
);

const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tasty Playground</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;

const VITE_CONFIG = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});`;

const TSCONFIG_JSON = JSON.stringify(
  {
    compilerOptions: {
      target: 'ES2020',
      module: 'ESNext',
      moduleResolution: 'bundler',
      jsx: 'react-jsx',
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
    },
    include: ['src'],
  },
  null,
  2,
);

const MAIN_TSX = `import './config';
import { App } from './App';
import { useAppGlobalStyles } from './global';
import { createRoot } from 'react-dom/client';

function Root() {
  useAppGlobalStyles();
  return <App />;
}

const root = createRoot(document.getElementById('app')!);
root.render(<Root />);
`;

const README_MD = `# Tasty Playground Project

Exported from the [Tasty Playground](https://tasty.style/playground).

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Then open the URL shown in the terminal.
`;

export function downloadProject(
  code: string,
  config: string,
  global: string,
  slug: string,
): void {
  const dirName = `tasty-playground-${slug}`;

  const files: Record<string, Uint8Array> = {
    [`${dirName}/package.json`]: strToU8(PACKAGE_JSON),
    [`${dirName}/index.html`]: strToU8(INDEX_HTML),
    [`${dirName}/vite.config.ts`]: strToU8(VITE_CONFIG),
    [`${dirName}/tsconfig.json`]: strToU8(TSCONFIG_JSON),
    [`${dirName}/README.md`]: strToU8(README_MD),
    [`${dirName}/src/main.tsx`]: strToU8(MAIN_TSX),
    [`${dirName}/src/App.tsx`]: strToU8(code),
    [`${dirName}/src/config.ts`]: strToU8(config),
    [`${dirName}/src/global.ts`]: strToU8(global),
    [`${dirName}/src/icons.tsx`]: strToU8(ICONS_CODE),
  };

  const zipped = zipSync(files, { level: 6 });
  const blob = new Blob([zipped.buffer as ArrayBuffer], {
    type: 'application/zip',
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${dirName}.zip`;
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
