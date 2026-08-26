import type { ReactNode } from 'react';
import {
  IconTargetArrow,
  IconSparkles,
  IconPalette,
  IconDevices,
  IconComponents,
  IconBolt,
} from '@tabler/icons-react';
import type { TintName } from '@/app/theme';
import Section from './Section';
import Grid from '@/app/ui/Grid';
import Card from '@/app/ui/Card';

interface FeatureItem {
  icon: ReactNode;
  title: string;
  description: string;
  tint: TintName;
}

const FEATURES: FeatureItem[] = [
  {
    icon: <IconTargetArrow size={24} stroke={1.5} />,
    title: 'States that don’t fight',
    description:
      'Each property’s state map compiles into mutually exclusive selectors, so one branch wins by construction—not by source order or specificity.',
    tint: 'lime',
  },
  {
    icon: <IconSparkles size={24} stroke={1.5} />,
    title: 'Safe to extend',
    description:
      'Add variants, overrides, and new states without re-deriving selector logic. Components stay predictable as requirements grow.',
    tint: 'coral',
  },
  {
    icon: <IconDevices size={24} stroke={1.5} />,
    title: 'Your design system’s language',
    description:
      'Define typed style props, tokens, units, aliases, and parser rules for your system, then compile them to standard CSS.',
    tint: 'amber',
  },
  {
    icon: <IconPalette size={24} stroke={1.5} />,
    title: 'Built for component systems',
    description:
      'Model roots and sub-elements together, expose governed public APIs, and compose styles as data instead of scattered overrides.',
    tint: 'teal',
  },
  {
    icon: <IconComponents size={24} stroke={1.5} />,
    title: 'One model for every state',
    description:
      'Pseudo-classes, variants, root and parent states, media and container queries, `:has()`, and `@supports` all use state maps.',
    tint: 'violet',
  },
  {
    icon: <IconBolt size={24} stroke={1.5} />,
    title: 'Runtime, server, or build time',
    description:
      'Keep the same styling model in runtime React, React Server Components and SSR, or zero-runtime build-time extraction.',
    tint: 'rose',
  },
];

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
      </Section.Content>
    </Section>
  );
}
