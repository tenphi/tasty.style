'use client';

import { tasty, OUTER_STYLES, BLOCK_STYLES, FLOW_STYLES } from '@tenphi/tasty';
import { IconArrowRight, IconExternalLink } from '@tabler/icons-react';
import Section from '@/app/components/Section';
import Grid from '@/app/ui/Grid';
import Space from '@/app/ui/Space';
import Text from '@/app/ui/Text';
import CodeBlock from '@/app/ui/CodeBlock';
import Badge from '@/app/ui/Badge';
import SectionWrap from '@/app/ui/SectionWrap';
import Tabs from '@/app/ui/Tabs';
import SpecialButton from '@/app/ui/SpecialButton';

const ColumnHeader = tasty({
  styles: {
    display: 'flex',
    flow: 'row',
    gap: '1.5x',
    placeContent: 'space-between',
    placeItems: 'center',
  },
  styleProps: [...OUTER_STYLES, ...BLOCK_STYLES, ...FLOW_STYLES],
});

const ArrowIconWrap = tasty({
  styles: {
    display: 'flex',
    placeItems: 'center',
    placeContent: 'center',
    color: '#primary-accent-text-2',
    transform: {
      '': 'rotate(0deg)',
      '@mobile': 'rotate(90deg)',
    },
  },
});

const SIMPLE_INPUT_CODE = `const Button = tasty({
  as: 'button',
  styles: {
    fill: {
      '': '#primary',
      ':hover': '#primary-hover',
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

function ExampleGrid({
  inputCode,
  outputCode,
  inputLang = 'tsx',
  outputLang = 'css',
}: {
  inputCode: string;
  outputCode: string;
  inputLang?: string;
  outputLang?: string;
}) {
  return (
    <Grid
      gridColumns={{ '': '1sf max-content 1sf', '@mobile': '1sf' }}
      gap={{ '': '2x', '@mobile': '2x' }}
      placeItems="start stretch"
    >
      <Space gap="2x">
        <ColumnHeader>
          <Text preset="h3" color="#primary-text-2">
            Tasty DSL
          </Text>
          <Badge fill="#teal-surface-3" color="#teal-accent-text-3">
            Input
          </Badge>
        </ColumnHeader>
        <CodeBlock lang={inputLang}>{inputCode}</CodeBlock>
      </Space>
      <ArrowIconWrap>
        <IconArrowRight size={32} />
      </ArrowIconWrap>
      <Space gap="2x">
        <ColumnHeader flow={{ '': 'row-reverse', '@mobile': 'row' }}>
          <Text preset="h3" color="#primary-text-2">
            Exclusive CSS Selectors
          </Text>
          <Badge fill="#coral-surface-3" color="#coral-accent-text-3">
            Output
          </Badge>
        </ColumnHeader>
        <CodeBlock lang={outputLang}>{outputCode}</CodeBlock>
      </Space>
    </Grid>
  );
}

const TABS = [
  {
    id: 'interactive-states',
    label: 'Interactive States',
    content: (
      <ExampleGrid
        inputCode={SIMPLE_INPUT_CODE}
        outputCode={SIMPLE_OUTPUT_CSS}
      />
    ),
  },
  {
    id: 'state-aliases',
    label: 'Complex States',
    content: (
      <ExampleGrid inputCode={ALIAS_INPUT_CODE} outputCode={ALIAS_OUTPUT_CSS} />
    ),
  },
];

export default function HowItWorks() {
  return (
    <SectionWrap fill="#primary-surface-2">
      <Section id="how-it-works">
        <Section.Title>How It Actually Works</Section.Title>
        <Section.Subtitle>
          Every state map compiles into mutually exclusive selectors per
          property
        </Section.Subtitle>
        <Section.Content>
          <Tabs tabs={TABS} defaultTab="interactive-states" />
          <Space gap="2x">
            <Text preset="t1" color="#primary-text-soft-2" textAlign="center">
              Each branch is guarded so one rule wins by construction. No
              specificity arithmetic. No source-order accidents.
            </Text>
            <Text preset="t1" color="#primary-text-soft-2" textAlign="center">
              That is what lets components{' '}
              <strong>compose, extend, and stay predictable</strong> as states
              intersect.
            </Text>
          </Space>
          <SpecialButton
            as="a"
            href="https://cube-ui-kit.vercel.app/?path=/story/getting-started-tasty-playground--playground"
            target="_blank"
            rel="noopener noreferrer"
            margin="0 auto"
          >
            Try in Playground
            <IconExternalLink size={18} />
          </SpecialButton>
        </Section.Content>
      </Section>
    </SectionWrap>
  );
}
