'use client';

import { tasty } from '@tenphi/tasty';
import Section from '@/app/components/Section';
import Space from '@/app/ui/Space';
import Text from '@/app/ui/Text';
import CodeBlock from '@/app/ui/CodeBlock';
import Tabs from '@/app/ui/Tabs';
import SectionWrap from '@/app/ui/SectionWrap';

const ShowcaseWrapper = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '2x',
    width: '100%',
    fill: '#primary-surface',
    border: true,
    radius: '1cr',
    overflow: 'hidden',
  },
});

const ShowcaseDescription = tasty({
  styles: {
    padding: '3x 3x 0',
    display: 'flex',
    flow: 'column',
    gap: '1x',
  },
});

const EXAMPLES = [
  {
    id: 'state-maps',
    label: 'State Maps',
    title: 'State Maps',
    description:
      'Style any property based on pseudo‑classes, data attributes, media queries, and more.',
    code: `const Button = tasty({
  as: 'button',
  styles: {
    fill: {
      '': '#primary-accent-surface',
      ':hover': '#primary-icon',
      ':active': '#primary-text',
      '[disabled]': '#primary-disabled',
    },
    cursor: {
      '': 'pointer',
      '[disabled]': 'not-allowed',
    },
    transition: 'theme',
  },
});`,
  },
  {
    id: 'responsive',
    label: 'Responsive Design',
    title: 'Responsive Design',
    description:
      'Define breakpoints once, use @mobile and @tablet as states anywhere.',
    code: `configure({
  states: {
    '@tablet': '@media(640px <= w < 1024px)',
    '@mobile': '@media(w < 640px)',
  },
});

const Layout = tasty({
  styles: {
    display: 'grid',
    gridColumns: {
      '': '1sf 1sf 1sf',
      '@tablet': '1sf 1sf',
      '@mobile': '1sf',
    },
    gap: {
      '': '4x',
      '@mobile': '2x',
    },
    padding: {
      '': '8x 4x',
      '@mobile': '4x 2x',
    },
  },
});`,
  },
  {
    id: 'sub-elements',
    label: 'Sub‑Elements',
    title: 'Sub‑Elements',
    description:
      'Style inner elements from the parent. Typed sub‑components via the elements prop.',
    code: `const Card = tasty({
  styles: {
    padding: '4x',
    radius: '1cr',
    border: true,
    Title: {
      $: '>',
      preset: 'h3',
      color: '#primary-accent-text',
    },
    Content: {
      $: '>',
      preset: 't2',
      color: '#primary-text',
    },
  },
  elements: { Title: 'h3', Content: 'div' },
});

// Usage:
// <Card>
//   <Card.Title>Hello</Card.Title>
//   <Card.Content>World</Card.Content>
// </Card>`,
  },
  {
    id: 'configuration',
    label: 'Configuration',
    title: 'Configuration',
    description:
      'Set up global states, custom units, functions, and reusable style recipes — all in one place.',
    code: `import { configure } from '@tenphi/tasty';

configure({
  states: {
    '@dark': '@root(theme=dark) | @media(prefers-color-scheme: dark)',
    '@mobile': '@media(w < 640px)',
  },
  units: {
    col: (n) => \`\${(n / 12) * 100}%\`,
    gap: '4px',
  },
  funcs: {
    fluid: ([min, max]) =>
      \`clamp(\${min.output}, 2.5vw + 1rem, \${max.output})\`,
  },
  recipes: {
    card: {
      padding: '3x',
      fill: '#surface',
      radius: '1cr',
      border: true,
      shadow: '0 1x 3x #shadow-sm',
    },
  },
});`,
  },
];

export default function CodeShowcase() {
  return (
    <SectionWrap fill="#primary-surface-2">
      <Section id="code-showcase">
        <Section.Title>See It In Action</Section.Title>
        <Section.Subtitle>
          Real patterns from production codebases
        </Section.Subtitle>
        <Section.Content>
          <Tabs
            width="max 720px"
            margin="auto left right"
            tabs={EXAMPLES.map((example) => ({
              id: example.id,
              label: example.label,
              content: (
                <ShowcaseWrapper>
                  <ShowcaseDescription>
                    <Text preset="h3" color="#primary-text">
                      {example.title}
                    </Text>
                    <Text preset="t2" color="#primary-text-soft">
                      {example.description}
                    </Text>
                  </ShowcaseDescription>
                  <Space padding="0 3x 3x">
                    <CodeBlock radius="1r" lang="tsx">
                      {example.code}
                    </CodeBlock>
                  </Space>
                </ShowcaseWrapper>
              ),
            }))}
          />
        </Section.Content>
      </Section>
    </SectionWrap>
  );
}
