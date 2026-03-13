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
import Text from '@/app/ui/Text';
import Card, { TINT_STYLES } from '@/app/ui/Card';

interface FeatureItem {
  icon: ReactNode;
  title: string;
  description: string;
  tint: TintName;
}

const FEATURES: FeatureItem[] = [
  {
    icon: <IconTargetArrow size={24} stroke={1.5} />,
    title: 'Deterministic at Any Scale',
    description:
      'Exclusive selector generation eliminates the entire class of cascade and specificity bugs. Refactor freely.',
    tint: 'lime',
  },
  {
    icon: <IconSparkles size={24} stroke={1.5} />,
    title: 'DSL That Feels Like CSS',
    description:
      'Property names you already know with syntax sugar that removes boilerplate. Learn in minutes, not days.',
    tint: 'coral',
  },
  {
    icon: <IconPalette size={24} stroke={1.5} />,
    title: 'Design‑System Native',
    description:
      'Color tokens, spacing units, typography presets, and recipes are first‑class primitives, not afterthoughts.',
    tint: 'teal',
  },
  {
    icon: <IconDevices size={24} stroke={1.5} />,
    title: 'State‑Aware Styling',
    description:
      'Media queries, container queries, @supports, :has() — all compose in one declarative state map.',
    tint: 'amber',
  },
  {
    icon: <IconComponents size={24} stroke={1.5} />,
    title: 'Sub‑Element Styling',
    description:
      'Style inner elements from the parent definition. No extra components, no CSS leakage.',
    tint: 'violet',
  },
  {
    icon: <IconBolt size={24} stroke={1.5} />,
    title: 'SSR & Zero‑Runtime',
    description:
      'Runtime, zero‑runtime, or SSR with zero‑cost hydration. Same DSL, same tokens, same output.',
    tint: 'rose',
  },
];

export default function Features() {
  return (
    <Section id="features">
      <Section.Title>Why Tasty</Section.Title>
      <Section.Subtitle>
        Everything you need for styling at scale
      </Section.Subtitle>
      <Section.Content>
        <Grid
          gridColumns={{
            '': '1sf 1sf 1sf',
            '@tablet': '1sf 1sf',
            '@mobile': '1sf',
          }}
          gap="3x"
        >
          {FEATURES.map((feature) => {
            const t = TINT_STYLES[feature.tint];
            return (
              <Card
                key={feature.title}
                fill={t.cardFill}
                border={t.cardBorder}
                tokens={{
                  '#tint-fill': t.tintFill,
                  '#tint-accent': t.tintAccent,
                  '#tint-accent-3': t.tintAccent3,
                }}
              >
                <Card.Header>
                  <Text as="h3" preset="h4" color="#tint-accent" margin="0">
                    {feature.title}
                  </Text>
                  <Card.Icon>{feature.icon}</Card.Icon>
                </Card.Header>
                <Text preset="t2" color="#primary-text-soft" margin="0">
                  {feature.description}
                </Text>
              </Card>
            );
          })}
        </Grid>
      </Section.Content>
    </Section>
  );
}
