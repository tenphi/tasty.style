import ServerCodeBlock from '@/app/ui/ServerCodeBlock';
import HowItWorksClient from './HowItWorksClient';

const SIMPLE_INPUT_CODE = `const Button = tasty({
  as: 'button',
  styles: {
    fill: {
      '': '#primary',
      ':hover': '#hover',
      '[disabled]': '#surface',
    },
    color: {
      '': '#on-primary',
      '[disabled]': '#text.40',
    },
    cursor: {
      '': 'pointer',
      '[disabled]': 'not-allowed',
    },
    padding: '1.5x 3x',
    radius: 'round',
    border: 'none',
    transition: 'theme',
  },
});`;

const SIMPLE_OUTPUT_CSS = `/* Default: not hovered and not disabled */
.t0.t0:not(:hover):not([disabled]) {
  background: var(--primary-color);
}

/* Hovered but not disabled */
.t0.t0:hover:not([disabled]) {
  background: var(--primary-hover-color);
}

/* Disabled wins by construction */
.t0.t0[disabled] {
  background: var(--surface-color);
}

.t0.t0:not([disabled]) {
  color: var(--on-primary-color);
  cursor: pointer;
}

.t0.t0[disabled] {
  color: var(--text-color-40);
  cursor: not-allowed;
}

/* Base styles (always applied) */
.t0.t0 {
  padding: 12px 24px;
  border-radius: 9999px;
  border: none;
  transition: all var(--transition-duration)
    var(--transition-timing-function);
}`;

const ALIAS_INPUT_CODE = `// Define a reusable state alias
configure({
  states: {
    '@dark': '@root(schema=dark) | (!@root(schema) & @media(prefers-color-scheme: dark))',
  },
});

// Use the alias in styles
const Text = tasty({
  // You can also define \`@dark\` here
  styles: {
    color: {
      '': '#text',
      '@dark': '#text-on-dark',
    },
  },
});`;

const ALIAS_OUTPUT_CSS = `/* Branch 1: Explicit dark schema */
:root[data-schema="dark"] .t0.t0 {
  color: var(--text-on-dark-color);
}

/* Branch 2: No schema attribute + OS prefers dark */
@media (prefers-color-scheme: dark) {
  :root:not([data-schema]) .t0.t0 {
    color: var(--text-on-dark-color);
  }
}

/* Default: no schema + OS does not prefer dark */
@media (not (prefers-color-scheme: dark)) {
  :root:not([data-schema="dark"]) .t0.t0 {
    color: var(--text-color);
  }
}

/* Default: schema is set but not dark */
:root:not([data-schema="dark"])[data-schema] .t0.t0 {
  color: var(--text-color);
}`;

export default function HowItWorks() {
  return (
    <HowItWorksClient
      blocks={{
        simpleInput: (
          <ServerCodeBlock lang="tsx">{SIMPLE_INPUT_CODE}</ServerCodeBlock>
        ),
        simpleOutput: (
          <ServerCodeBlock lang="css">{SIMPLE_OUTPUT_CSS}</ServerCodeBlock>
        ),
        aliasInput: (
          <ServerCodeBlock lang="tsx">{ALIAS_INPUT_CODE}</ServerCodeBlock>
        ),
        aliasOutput: (
          <ServerCodeBlock lang="css">{ALIAS_OUTPUT_CSS}</ServerCodeBlock>
        ),
      }}
    />
  );
}
