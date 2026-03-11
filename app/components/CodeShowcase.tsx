'use client';

import { tasty } from '@tenphi/tasty';
import Section from '@/app/components/Section';
import Space from '@/app/ui/Space';
import Text from '@/app/ui/Text';
import CodeBlock from '@/app/ui/CodeBlock';
import Tabs from '@/app/ui/Tabs';

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
      'Use predefined states like @mobile and @tablet directly in style values.',
    code: `const Layout = tasty({
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
    id: 'glaze',
    label: 'Glaze Colors',
    title: 'Glaze Color Tokens',
    description:
      'Generate WCAG‑compliant palettes with automatic dark mode from a single hue.',
    code: `import { glaze } from '@tenphi/glaze';

const violet = glaze(272, 75);

violet.colors({
  surface: { lightness: 98, saturation: 0.5 },
  text: {
    base: 'surface',
    lightness: '-62',
    contrast: 'AAA',
  },
  'accent-surface': {
    lightness: 52,
    mode: 'fixed',
  },
});

const coral = violet.extend({ hue: 15 });
const teal  = violet.extend({ hue: 155 });

const palette = glaze.palette({ violet, coral, teal });
const tokens = palette.tasty({ prefix: true });`,
  },
];

export default function CodeShowcase() {
  return (
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
                  <CodeBlock radius="1r">{example.code}</CodeBlock>
                </Space>
              </ShowcaseWrapper>
            ),
          }))}
        />
      </Section.Content>
    </Section>
  );
}
