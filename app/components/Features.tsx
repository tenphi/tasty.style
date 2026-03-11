'use client';

import type { ReactNode } from 'react';
import {
  tasty,
  BASE_STYLES,
  OUTER_STYLES,
  BLOCK_STYLES,
  COLOR_STYLES,
} from '@tenphi/tasty';
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

const FeatureCard = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '2x',
    padding: '4x',
    radius: '1cr',
    transition: 'shadow, translate',
    shadow: {
      '': 'none',
      ':hover': '0 4x 20x #primary-shadow-md',
    },
    translate: {
      '': '0 0',
      ':hover': '0 -3px',
    },
  },
  styleProps: [...BASE_STYLES, ...OUTER_STYLES, ...BLOCK_STYLES, ...COLOR_STYLES],
});

const IconWrap = tasty({
  as: 'span',
  styles: {
    display: 'inline-flex',
    placeItems: 'center',
    placeContent: 'center',
    width: '48px',
    height: '48px',
    radius: '14px',
    margin: '0 0 1x 0',
  },
  styleProps: [...BASE_STYLES, ...OUTER_STYLES, ...BLOCK_STYLES, ...COLOR_STYLES],
});

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
    tint: 'blue',
  },
  {
    icon: <IconBolt size={24} stroke={1.5} />,
    title: 'SSR & Zero‑Runtime',
    description:
      'Runtime, zero‑runtime, or SSR with zero‑cost hydration. Same DSL, same tokens, same output.',
    tint: 'rose',
  },
];

interface TintStyle {
  cardFill: string;
  cardBorder: string;
  iconFill: string;
  iconColor: string;
  titleColor: string;
}

const TINT_STYLES: Record<TintName, TintStyle> = {
  coral: {
    cardFill: '#coral-surface',
    cardBorder: `1bw solid #coral-border`,
    iconFill: '#coral-surface-3',
    iconColor: '#coral-accent-text',
    titleColor: '#coral-accent-text',
  },
  teal: {
    cardFill: '#teal-surface',
    cardBorder: `1bw solid #teal-border`,
    iconFill: '#teal-surface-3',
    iconColor: '#teal-accent-text',
    titleColor: '#teal-accent-text',
  },
  amber: {
    cardFill: '#amber-surface',
    cardBorder: `1bw solid #amber-border`,
    iconFill: '#amber-surface-3',
    iconColor: '#amber-accent-text',
    titleColor: '#amber-accent-text',
  },
  blue: {
    cardFill: '#blue-surface',
    cardBorder: `1bw solid #blue-border`,
    iconFill: '#blue-surface-3',
    iconColor: '#blue-accent-text',
    titleColor: '#blue-accent-text',
  },
  rose: {
    cardFill: '#rose-surface',
    cardBorder: `1bw solid #rose-border`,
    iconFill: '#rose-surface-3',
    iconColor: '#rose-accent-text',
    titleColor: '#rose-accent-text',
  },
  lime: {
    cardFill: '#lime-surface',
    cardBorder: `1bw solid #lime-border`,
    iconFill: '#lime-surface-3',
    iconColor: '#lime-accent-text',
    titleColor: '#lime-accent-text',
  },
};

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
              <FeatureCard
                key={feature.title}
                fill={t.cardFill}
                border={t.cardBorder}
              >
                <IconWrap fill={t.iconFill} color={t.iconColor}>
                  {feature.icon}
                </IconWrap>
                <Text as="h3" preset="h3" color={t.titleColor} margin="0">
                  {feature.title}
                </Text>
                <Text preset="t2" color="#primary-text-soft" margin="0">
                  {feature.description}
                </Text>
              </FeatureCard>
            );
          })}
        </Grid>
      </Section.Content>
    </Section>
  );
}
