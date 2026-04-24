import type { ReactNode } from 'react';
import NextLink from 'next/link';
import { tasty, OUTER_STYLES, BLOCK_STYLES, FLOW_STYLES } from '@tenphi/tasty';
import { IconArrowRight, IconExternalLink } from '@tabler/icons-react';
import ServerCodeBlock from '@/app/ui/ServerCodeBlock';
import Section from '@/app/components/Section';
import Grid from '@/app/ui/Grid';
import Space from '@/app/ui/Space';
import Text from '@/app/ui/Text';
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
    color: '#accent-text-2',
    transform: {
      '': 'rotate(0deg)',
      '@mobile': 'rotate(90deg)',
    },
  },
});

function ExampleGrid({
  inputBlock,
  outputBlock,
}: {
  inputBlock: ReactNode;
  outputBlock: ReactNode;
}) {
  return (
    <Grid
      gridColumns={{ '': '1sf max-content 1sf', '@mobile': '1sf' }}
      gap={{ '': '2x', '@mobile': '2x' }}
      placeItems="start stretch"
    >
      <Space gap="2x">
        <ColumnHeader>
          <Text preset="h3" color="#text-2">
            Tasty DSL
          </Text>
          <Badge fill="#teal-surface-3" color="#teal-accent-text-3">
            Input
          </Badge>
        </ColumnHeader>
        {inputBlock}
      </Space>
      <ArrowIconWrap>
        <IconArrowRight size={32} />
      </ArrowIconWrap>
      <Space gap="2x">
        <ColumnHeader flow={{ '': 'row-reverse', '@mobile': 'row' }}>
          <Text preset="h3" color="#text-2">
            Exclusive CSS Selectors
          </Text>
          <Badge fill="#coral-surface-3" color="#coral-accent-text-3">
            Output
          </Badge>
        </ColumnHeader>
        {outputBlock}
      </Space>
    </Grid>
  );
}

const SIMPLE_INPUT_CODE = `const Button = tasty({
  as: 'button',
  styles: {
    fill: {
      '': '#primary',
      ':hover': '#primary-hover',
      ':active': '#primary-pressed',
      '[disabled]': '#surface',
    },
  },
});`;

const SIMPLE_OUTPUT_CSS = `/* [disabled] wins outright */
.t0.t0[disabled] {
  background: var(--surface-color);
}

/* :active is excluded when disabled */
.t0.t0:active:not([disabled]) {
  background: var(--primary-pressed-color);
}

/* :hover is excluded when :active or disabled */
.t0.t0:hover:not(:active):not([disabled]) {
  background: var(--primary-hover-color);
}

/* default is excluded when anything above matches */
.t0.t0:not(:hover):not(:active):not([disabled]) {
  background: var(--primary-color);
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
  const tabs = [
    {
      id: 'interactive-states',
      label: 'Interactive States',
      content: (
        <ExampleGrid
          inputBlock={
            <ServerCodeBlock lang="tsx">{SIMPLE_INPUT_CODE}</ServerCodeBlock>
          }
          outputBlock={
            <ServerCodeBlock lang="css">{SIMPLE_OUTPUT_CSS}</ServerCodeBlock>
          }
        />
      ),
    },
    {
      id: 'state-aliases',
      label: 'Complex States',
      content: (
        <ExampleGrid
          inputBlock={
            <ServerCodeBlock lang="tsx">{ALIAS_INPUT_CODE}</ServerCodeBlock>
          }
          outputBlock={
            <ServerCodeBlock lang="css">{ALIAS_OUTPUT_CSS}</ServerCodeBlock>
          }
        />
      ),
    },
  ];

  return (
    <SectionWrap fill="#surface-2">
      <Section id="how-it-works">
        <Section.Title>How It Actually Works</Section.Title>
        <Section.Subtitle>
          Every state map compiles into mutually exclusive selectors per property
        </Section.Subtitle>
        <Section.Content>
          <Tabs tabs={tabs} defaultTab="interactive-states" />
          <Space gap="2x">
            <Text preset="t1" color="#text-soft-2" textAlign="center">
              Each branch is guarded so one rule wins by construction. No
              specificity arithmetic. No source-order accidents.
            </Text>
            <Text preset="t1" color="#text-soft-2" textAlign="center">
              That is what lets components{' '}
              <strong>compose, extend, and stay predictable</strong> as states
              intersect.
            </Text>
          </Space>
          <SpecialButton as={NextLink} href="/playground" margin="0 auto">
            Try in Playground
            <IconExternalLink size={18} />
          </SpecialButton>
        </Section.Content>
      </Section>
    </SectionWrap>
  );
}
