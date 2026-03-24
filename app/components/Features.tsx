'use client';

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
    title: 'Deterministic State Resolution',
    description:
      'State maps compile into mutually exclusive selectors, so one branch wins by construction instead of through source order or specificity.',
    tint: 'lime',
  },
  {
    icon: <IconSparkles size={24} stroke={1.5} />,
    title: 'A Governed Styling Model',
    description:
      'Design-system teams define the language product teams consume: tokens, state aliases, recipes, and override rules on top of familiar CSS-shaped styles.',
    tint: 'coral',
  },
  {
    icon: <IconDevices size={24} stroke={1.5} />,
    title: 'Define Your Styling Language',
    description:
      'Shape a reusable design-system vocabulary with shared tokens, state aliases, recipes, custom units, and the conventions your components build on.',
    tint: 'amber',
  },
  {
    icon: <IconPalette size={24} stroke={1.5} />,
    title: 'Recommended Methodology',
    description:
      'The docs define a clear component model for design systems: root + sub-elements, governed public APIs, typed style props where they help, and wrapper-based extension.',
    tint: 'teal',
  },
  {
    icon: <IconComponents size={24} stroke={1.5} />,
    title: 'Broad State Coverage',
    description:
      'Pseudo-classes, attributes, media queries, container queries, root states, parent states, `:has()`, and `@supports` all fit into the same state-map model.',
    tint: 'violet',
  },
  {
    icon: <IconBolt size={24} stroke={1.5} />,
    title: 'Flexible Rendering Paths',
    description:
      'Use the same styling model in runtime React, add SSR when the app renders on the server, or choose build-time extraction when zero-runtime delivery is the goal.',
    tint: 'rose',
  },
];

export default function Features() {
  return (
    <Section id="features">
      <Section.Title>Why Tasty</Section.Title>
      <Section.Subtitle>
        Built for reusable, stateful components that need predictable styling
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
