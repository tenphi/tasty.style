import type { ReactNode } from 'react';
import {
  IconTargetArrow,
  IconPalette,
  IconBraces,
  IconShieldCheck,
  IconComponents,
  IconBolt,
} from '@tabler/icons-react';
import { tasty } from '@tenphi/tasty';
import type { TintName } from '@/app/theme';
import Section from './Section';
import Grid from '@/app/ui/Grid';
import Card from '@/app/ui/Card';
import InlineCode from '@/app/ui/InlineCode';

interface FeatureItem {
  icon: ReactNode;
  title: string;
  description: ReactNode;
  tint: TintName;
}

const FEATURES: FeatureItem[] = [
  {
    icon: <IconTargetArrow size={24} stroke={1.5} />,
    title: 'States that can’t conflict',
    description:
      'Every state map compiles into mutually exclusive selectors, and the last matching key wins by construction. Adding a state, variant, or override never means re-deriving selector logic.',
    tint: 'lime',
  },
  {
    icon: <IconPalette size={24} stroke={1.5} />,
    title: 'Your design system’s language',
    description: (
      <>
        Define tokens, units, state aliases like{' '}
        <InlineCode>@mobile</InlineCode>, typography presets, and recipes once.
        Components then read like the spec:{' '}
        <InlineCode>padding: &apos;2x&apos;</InlineCode>,{' '}
        <InlineCode>fill: &apos;#surface&apos;</InlineCode>.
      </>
    ),
    tint: 'amber',
  },
  {
    icon: <IconBraces size={24} stroke={1.5} />,
    title: 'Typed component APIs',
    description: (
      <>
        Decide exactly what consumers can change.{' '}
        <InlineCode>styleProps</InlineCode>, <InlineCode>modProps</InlineCode>,{' '}
        <InlineCode>tokenProps</InlineCode>, variants, and sub-elements become
        typed props and components with autocomplete.
      </>
    ),
    tint: 'teal',
  },
  {
    icon: <IconShieldCheck size={24} stroke={1.5} />,
    title: 'Guardrails in the editor and CI',
    description:
      'An ESLint and oxlint plugin with 40+ rules checks properties, values, tokens, state keys, and presets against your config. TypeScript autocompletes your own token and preset names.',
    tint: 'coral',
  },
  {
    icon: <IconComponents size={24} stroke={1.5} />,
    title: 'Modern CSS, one model',
    description: (
      <>
        Media and container queries, <InlineCode>@supports</InlineCode>,{' '}
        <InlineCode>:has()</InlineCode>, root and parent states, and{' '}
        <InlineCode>@starting-style</InlineCode> are all state keys. Keyframes,{' '}
        <InlineCode>@property</InlineCode>, and font faces are built in.
      </>
    ),
    tint: 'violet',
  },
  {
    icon: <IconBolt size={24} stroke={1.5} />,
    title: 'Render anywhere',
    description:
      'The same styles work in client React, Server Components, and streaming SSR with Next.js or Astro. Render only on the server to ship no styling runtime, or extract CSS at build time.',
    tint: 'rose',
  },
];

interface ProofItem {
  value: string;
  label: string;
}

const PROOF: ProofItem[] = [
  {
    value: '52 kB',
    label: 'for tasty() in the browser, minified and brotli-compressed',
  },
  {
    value: '0 kB',
    label:
      'of styling runtime when components render only on the server or CSS is extracted at build time',
  },
  {
    value: 'Only what renders',
    label: 'CSS is generated on demand, and equal styles share one class',
  },
];

const ProofStrip = tasty({
  styles: {
    display: 'grid',
    gridColumns: {
      '': '1sf 1sf 1sf',
      '@mobile': '1sf',
    },
    gap: '3x',
    width: '100%',
    padding: '3x 0 0',
    border: 'top',
    Item: {
      display: 'flex',
      flow: 'column',
      gap: '.5x',
      textAlign: 'center',
    },
    Value: {
      preset: 'h3',
      color: '#text',
      margin: 0,
    },
    Label: {
      preset: 't3',
      color: '#text-soft',
      margin: 0,
      textWrap: 'balance',
    },
  },
  elements: {
    Item: 'div',
    Value: 'p',
    Label: 'p',
  },
});

const ProofLinks = tasty({
  styles: {
    display: 'flex',
    flow: {
      '': 'row wrap',
      '@mobile': 'column',
    },
    placeContent: 'center',
    placeItems: 'center',
    gap: '1x 3x',
    preset: 't2',
    textAlign: 'center',
  },
});

const ProofLink = tasty({
  as: 'a',
  styles: {
    color: '#accent-text',
    textDecoration: {
      '': 'underline',
      ':hover': 'none',
    },
    preset: 'strong',
    transition: 'theme',
  },
});

export default function Features() {
  return (
    <Section id="features">
      <Section.Title>Why Tasty</Section.Title>
      <Section.Subtitle>
        Built for long-lived component libraries where states, variants, themes,
        and overrides keep growing
      </Section.Subtitle>
      <Section.Content>
        <Grid
          gridColumns={{
            '': '1sf 1sf',
            '@mobile': '1sf',
          }}
          gap="3x"
        >
          {FEATURES.map((feature) => (
            <Card key={feature.title} variant={feature.tint}>
              <Card.Header>
                <Card.Title>{feature.title}</Card.Title>
                <Card.Icon>{feature.icon}</Card.Icon>
              </Card.Header>
              <Card.Description>{feature.description}</Card.Description>
            </Card>
          ))}
        </Grid>
        <ProofStrip>
          {PROOF.map((item) => (
            <ProofStrip.Item key={item.value}>
              <ProofStrip.Value>{item.value}</ProofStrip.Value>
              <ProofStrip.Label>{item.label}</ProofStrip.Label>
            </ProofStrip.Item>
          ))}
        </ProofStrip>
        <ProofLinks>
          <ProofLink href="/docs/runtime-benchmarks">
            Runtime benchmarks →
          </ProofLink>
          <ProofLink href="/docs/comparison">
            How Tasty compares to Tailwind, Panda, StyleX, and others →
          </ProofLink>
        </ProofLinks>
      </Section.Content>
    </Section>
  );
}
