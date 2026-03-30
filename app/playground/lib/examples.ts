// @generated — do not edit by hand. Edit files in app/playground/examples/ instead.
// Regenerate with: pnpm build:examples

export interface PlaygroundExample {
  slug: string;
  label: string;
  code: string;
}

const BUTTON_CODE =
  "import { tasty } from '@tenphi/tasty';\n\nconst Button = tasty({\n  styles: {\n    display: 'inline-grid',\n    placeItems: 'center',\n    padding: '1x 2x',\n    radius: true,\n    fill: '#accent-surface',\n    color: '#accent-surface-text',\n    preset: 't2',\n    cursor: 'pointer',\n    transition: 'theme',\n    opacity: {\n      '': 1,\n      ':hover': 0.9,\n      ':active': 0.8,\n    },\n  },\n});\n\nexport const App = () => {\n  return <Button>Click Me</Button>;\n};\n";

const CARD_CODE =
  "import { tasty } from '@tenphi/tasty';\n\nconst Card = tasty({\n  styles: {\n    display: 'flex',\n    flow: 'column',\n    padding: '3x',\n    radius: '1.5r',\n    fill: '#surface',\n    border: true,\n    gap: '1.5x',\n    width: 'max 320px',\n    transition: 'theme',\n    shadow: {\n      '': '0 1x 3x #black.06',\n      ':hover': '0 2x 8x #black.10',\n    },\n    Title: {\n      preset: 't2 strong',\n      color: '#text',\n    },\n    Description: {\n      preset: 't3',\n      color: '#text-soft',\n    },\n    Actions: {\n      display: 'flex',\n      flow: 'row',\n      gap: '1x',\n      padding: '0.5x top',\n    },\n  },\n  elements: {\n    Title: 'h3',\n    Description: 'p',\n    Actions: 'div',\n  },\n});\n\nconst ActionButton = tasty({\n  as: 'button',\n  styles: {\n    display: 'inline-grid',\n    placeItems: 'center',\n    padding: '0.75x 1.5x',\n    radius: true,\n    preset: 't3',\n    cursor: 'pointer',\n    transition: 'theme',\n    border: 'none',\n    fill: {\n      '': '#accent-surface',\n      ':hover': '#accent-surface',\n      ':active': '#accent-surface',\n    },\n    color: '#accent-surface-text',\n    opacity: {\n      '': 1,\n      ':hover': 0.9,\n      ':active': 0.8,\n    },\n  },\n});\n\nconst SecondaryButton = tasty(ActionButton, {\n  styles: {\n    fill: {\n      '': 'transparent',\n      ':hover': '#border',\n    },\n    color: '#text-soft',\n    border: true,\n  },\n});\n\nexport const App = () => {\n  return (\n    <Card>\n      <Card.Title>Card Title</Card.Title>\n      <Card.Description>\n        This is a card component with sub-elements, hover states, and shadow transitions.\n      </Card.Description>\n      <Card.Actions>\n        <ActionButton>Primary</ActionButton>\n        <SecondaryButton>Secondary</SecondaryButton>\n      </Card.Actions>\n    </Card>\n  );\n};\n";

const BLANK_CODE =
  "import { tasty } from '@tenphi/tasty';\n\nconst Block = tasty({\n  styles: {\n    padding: '2x',\n  },\n});\n\nexport const App = () => {\n  return <Block>Hello, Tasty!</Block>;\n};\n";

export const EXAMPLES: PlaygroundExample[] = [
  { slug: 'button', label: 'Button', code: BUTTON_CODE },
  { slug: 'card', label: 'Card', code: CARD_CODE },
  { slug: 'blank', label: 'Blank', code: BLANK_CODE },
];

export const DEFAULT_EXAMPLE = EXAMPLES[0];

export function findExample(slug: string): PlaygroundExample | undefined {
  return EXAMPLES.find((e) => e.slug === slug);
}

export const DEFAULT_CONFIG =
  "import { configure } from '@tenphi/tasty';\nimport { glaze } from '@tenphi/glaze';\n\nconst theme = glaze(240, 75);\n\ntheme.colors({\n  surface: { lightness: 100, saturation: 0.1 },\n  text: { base: 'surface', lightness: 0, contrast: 'AAA', saturation: 0.08 },\n  'text-soft': {\n    base: 'surface',\n    lightness: 20,\n    contrast: ['AA', 'AAA'],\n    saturation: 0.05,\n  },\n  border: {\n    base: 'surface',\n    lightness: ['-10', '-20'],\n    saturation: 0.35,\n  },\n  'accent-surface-text': { lightness: 100, mode: 'fixed' },\n  'accent-surface': {\n    base: 'accent-surface-text',\n    lightness: '-48',\n    contrast: ['AA', 7],\n    mode: 'fixed',\n  },\n  'accent-text': {\n    base: 'surface',\n    lightness: 50,\n    contrast: ['AA', 'AAA'],\n    saturation: 0.9,\n  },\n  white: { lightness: 100, saturation: 0, mode: 'static' },\n  black: { lightness: 0, saturation: 0, mode: 'static' },\n});\n\nconfigure({\n  tokens: {\n    ...theme.tasty({\n      prefix: false,\n      modes: { highContrast: true },\n      states: {\n        dark: '@dark-root',\n        highContrast: '@high-contrast-root',\n      },\n    }),\n    $gap: '8px',\n    $radius: '8px',\n    '$border-width': '1px',\n  },\n  states: {\n    '@mobile': '@media(w < 768px)',\n    '@tablet': '@media(w < 1024px)',\n    '@desktop': '@media(w >= 1024px)',\n    '@dark-root': 'schema=dark | (!schema & @media(prefers-color-scheme: dark))',\n    '@high-contrast-root':\n      'contrast=more | (!contrast & @media(prefers-contrast: more))',\n    '@dark':\n      '@root(schema=dark) | (!@root(schema) & @media(prefers-color-scheme: dark))',\n    '@high-contrast':\n      '@root(contrast=more) | (!@root(contrast) & @media(prefers-contrast: more))',\n    '@reduce-motion': '@media(prefers-reduced-motion: reduce)',\n  },\n});\n";

export const DEFAULT_GLOBAL =
  "import { useGlobalStyles } from '@tenphi/tasty';\n\nexport function useAppGlobalStyles() {\n  useGlobalStyles('body', {\n    fill: '#surface',\n    color: '#text',\n    preset: 't2',\n    margin: 0,\n    padding: '2x',\n    fontFamily: 'system-ui, sans-serif',\n  });\n}\n";
