'use client';

import { tasty } from '@tenphi/tasty';
import Section from '@/app/components/Section';
import Grid from '@/app/ui/Grid';
import Space from '@/app/ui/Space';
import Text from '@/app/ui/Text';
import CodeBlock from '@/app/ui/CodeBlock';
import Badge from '@/app/ui/Badge';

const Highlight = tasty({
  as: 'span',
  styles: {
    color: '#primary-accent-fill',
    fontWeight: 600,
  },
});

const ColumnHeader = tasty({
  styles: {
    display: 'flex',
    flow: 'row',
    gap: '1.5x',
    placeItems: 'center',
  },
});

const ArrowIcon = tasty({
  as: 'span',
  styles: {
    display: {
      '': 'inline-flex',
      '@mobile': 'none',
    },
    preset: 'h2',
    color: '#primary-accent-fill',
    placeItems: 'center',
    margin: 'auto 0',
  },
});

const INPUT_CODE = `// Define a reusable state alias
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

const OUTPUT_CSS = `/* Branch 1: Explicit dark schema */
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

/* Default: schema is set but not dark (any OS preference) */
:root:not([data-schema="dark"])[data-schema] .t0.t0 {
  color: var(--text-color);
}`;

export default function HowItWorks() {
  return (
    <Section id="how-it-works">
      <Section.Title>How It Actually Works</Section.Title>
      <Section.Subtitle>
        Every state mapping compiles into mutually exclusive selectors
      </Section.Subtitle>
      <Section.Content>
        <Grid
          gridColumns={{ '': '5sf 1sf 6sf', '@mobile': '1sf' }}
          gap={{ '': '3x', '@mobile': '4x' }}
          placeItems="start stretch"
        >
          <Space gap="2x">
            <ColumnHeader>
              <Badge
                fill="#teal-surface-3"
                color="#teal-accent-fill"
              >
                Input
              </Badge>
              <Text preset="h3" color="#primary-text">
                Tasty DSL
              </Text>
            </ColumnHeader>
            <CodeBlock>{INPUT_CODE}</CodeBlock>
          </Space>
          <ArrowIcon>&rarr;</ArrowIcon>
          <Space gap="2x">
            <ColumnHeader>
              <Badge
                fill="#coral-surface-3"
                color="#coral-accent-fill"
              >
                Output
              </Badge>
              <Text preset="h3" color="#primary-text">
                Exclusive CSS
              </Text>
            </ColumnHeader>
            <CodeBlock>{OUTPUT_CSS}</CodeBlock>
            <Text preset="t2" color="#primary-text-soft">
              No two rules can match at the same time. No specificity
              arithmetic. No source‑order dependence. Components{' '}
              <Highlight>compose and extend without collisions</Highlight>.
            </Text>
          </Space>
        </Grid>
      </Section.Content>
    </Section>
  );
}
