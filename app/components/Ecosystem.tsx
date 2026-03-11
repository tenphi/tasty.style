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
  IconPalette,
  IconShieldCheck,
  IconCode,
} from '@tabler/icons-react';
import type { TintName } from '@/app/theme';
import Section from '@/app/components/Section';
import Grid from '@/app/ui/Grid';
import Text from '@/app/ui/Text';
import Badge from '@/app/ui/Badge';

const EcoCard = tasty({
  as: 'a',
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '2x',
    padding: '4x',
    radius: '1cr',
    textDecoration: 'none',
    transition: 'shadow, translate',
    shadow: {
      '': 'none',
      ':hover': '0 4x 20x #primary-shadow-md',
    },
    translate: {
      '': '0 0',
      ':hover': '0 -3px',
    },
    cursor: 'pointer',
  },
  styleProps: [...BASE_STYLES, ...OUTER_STYLES, ...BLOCK_STYLES, ...COLOR_STYLES],
});

const EcoCardHeader = tasty({
  styles: {
    display: 'flex',
    flow: 'row',
    placeContent: 'space-between',
    placeItems: 'start',
  },
});

const EcoIconWrap = tasty({
  as: 'span',
  styles: {
    display: 'inline-flex',
    placeItems: 'center',
    placeContent: 'center',
    width: '44px',
    height: '44px',
    radius: '12px',
  },
  styleProps: [...BASE_STYLES, ...OUTER_STYLES, ...BLOCK_STYLES, ...COLOR_STYLES],
});

interface EcoItem {
  name: string;
  tag: string;
  description: string;
  href: string;
  icon: ReactNode;
  tint: TintName;
}

const ECOSYSTEM: EcoItem[] = [
  {
    name: 'Glaze',
    tag: 'Colors',
    description:
      'OKHSL‑based color theme generator with WCAG contrast solving. Generate light, dark, and high‑contrast palettes from a single hue.',
    href: 'https://github.com/tenphi/glaze',
    icon: <IconPalette size={22} stroke={1.5} />,
    tint: 'teal',
  },
  {
    name: 'ESLint Plugin',
    tag: 'Linting',
    description:
      '27 lint rules that validate style properties, value syntax, token existence, and enforce best practices.',
    href: 'https://github.com/tenphi/eslint-plugin-tasty',
    icon: <IconShieldCheck size={22} stroke={1.5} />,
    tint: 'amber',
  },
  {
    name: 'VS Code Extension',
    tag: 'DX',
    description:
      'Syntax highlighting for Tasty styles in TypeScript and TSX. Highlights tokens, units, states, and presets.',
    href: 'https://github.com/tenphi/tasty-vscode-extension',
    icon: <IconCode size={22} stroke={1.5} />,
    tint: 'blue',
  },
];

interface TintStyle {
  cardFill: string;
  cardBorder: string;
  iconFill: string;
  iconColor: string;
  badgeFill: string;
  badgeColor: string;
  titleColor: string;
}

const TINT_STYLES: Record<TintName, TintStyle> = {
  coral: { cardFill: '#coral-surface', cardBorder: '1bw solid #coral-border', iconFill: '#coral-surface-3', iconColor: '#coral-accent-fill', badgeFill: '#coral-surface-3', badgeColor: '#coral-accent-fill', titleColor: '#coral-accent-fill' },
  teal: { cardFill: '#teal-surface', cardBorder: '1bw solid #teal-border', iconFill: '#teal-surface-3', iconColor: '#teal-accent-fill', badgeFill: '#teal-surface-3', badgeColor: '#teal-accent-fill', titleColor: '#teal-accent-fill' },
  amber: { cardFill: '#amber-surface', cardBorder: '1bw solid #amber-border', iconFill: '#amber-surface-3', iconColor: '#amber-accent-fill', badgeFill: '#amber-surface-3', badgeColor: '#amber-accent-fill', titleColor: '#amber-accent-fill' },
  blue: { cardFill: '#blue-surface', cardBorder: '1bw solid #blue-border', iconFill: '#blue-surface-3', iconColor: '#blue-accent-fill', badgeFill: '#blue-surface-3', badgeColor: '#blue-accent-fill', titleColor: '#blue-accent-fill' },
  rose: { cardFill: '#rose-surface', cardBorder: '1bw solid #rose-border', iconFill: '#rose-surface-3', iconColor: '#rose-accent-fill', badgeFill: '#rose-surface-3', badgeColor: '#rose-accent-fill', titleColor: '#rose-accent-fill' },
  lime: { cardFill: '#lime-surface', cardBorder: '1bw solid #lime-border', iconFill: '#lime-surface-3', iconColor: '#lime-accent-fill', badgeFill: '#lime-surface-3', badgeColor: '#lime-accent-fill', titleColor: '#lime-accent-fill' },
};

export default function Ecosystem() {
  return (
    <Section id="ecosystem">
      <Section.Title>Complete Ecosystem</Section.Title>
      <Section.Subtitle>
        Tools that complete the picture
      </Section.Subtitle>
      <Section.Content>
        <Grid
          gridColumns={{ '': '1sf 1sf 1sf', '@mobile': '1sf' }}
          gap="3x"
        >
          {ECOSYSTEM.map((item) => {
            const t = TINT_STYLES[item.tint];
            return (
              <EcoCard
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                fill={t.cardFill}
                border={t.cardBorder}
              >
                <EcoCardHeader>
                  <EcoIconWrap fill={t.iconFill} color={t.iconColor}>
                    {item.icon}
                  </EcoIconWrap>
                  <Badge fill={t.badgeFill} color={t.badgeColor}>
                    {item.tag}
                  </Badge>
                </EcoCardHeader>
                <Text as="h3" preset="h3" color={t.titleColor}>
                  {item.name}
                </Text>
                <Text preset="t2" color="#primary-text-soft">
                  {item.description}
                </Text>
              </EcoCard>
            );
          })}
        </Grid>
      </Section.Content>
    </Section>
  );
}
