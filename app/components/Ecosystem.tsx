'use client';

import type { ReactNode } from 'react';
import { IconPalette, IconShieldCheck, IconCode } from '@tabler/icons-react';
import type { TintName } from '@/app/theme';
import Section from '@/app/components/Section';
import Grid from '@/app/ui/Grid';
import Text from '@/app/ui/Text';
import Badge from '@/app/ui/Badge';
import Card, { TINT_STYLES } from '@/app/ui/Card';

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
    tint: 'rose',
  },
];

export default function Ecosystem() {
  return (
    <Section id="ecosystem">
      <Section.Title>Complete Ecosystem</Section.Title>
      <Section.Subtitle>Tools that complete the picture</Section.Subtitle>
      <Section.Content>
        <Grid gridColumns={{ '': '1sf 1sf 1sf', '@mobile': '1sf' }} gap="3x">
          {ECOSYSTEM.map((item) => {
            const t = TINT_STYLES[item.tint];
            return (
              <Card
                as="a"
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
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
                    {item.name}
                  </Text>
                  <Card.Icon>{item.icon}</Card.Icon>
                </Card.Header>
                <Text preset="t2" color="#primary-text-soft">
                  {item.description}
                </Text>
                <Badge
                  fill="#tint-fill"
                  color="#tint-accent-3"
                  placeSelf="start"
                  margin="top auto"
                >
                  {item.tag}
                </Badge>
              </Card>
            );
          })}
        </Grid>
      </Section.Content>
    </Section>
  );
}
