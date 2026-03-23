'use client';

import type { ReactNode } from 'react';
import { IconPalette, IconShieldCheck, IconCode } from '@tabler/icons-react';
import type { TintName } from '@/app/theme';
import Section from '@/app/components/Section';
import Grid from '@/app/ui/Grid';
import Badge from '@/app/ui/Badge';
import Card from '@/app/ui/Card';

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
      'Generate OKHSL-based light, dark, and high-contrast palettes with WCAG-aware contrast solving, then export them as Tasty-ready color tokens.',
    href: 'https://github.com/tenphi/glaze',
    icon: <IconPalette size={22} stroke={1.5} />,
    tint: 'teal',
  },
  {
    name: 'ESLint Plugin',
    tag: 'Linting',
    description:
      'Catch invalid style properties, malformed state keys, missing tokens, and other DSL mistakes before they reach the browser.',
    href: 'https://github.com/tenphi/eslint-plugin-tasty',
    icon: <IconShieldCheck size={22} stroke={1.5} />,
    tint: 'amber',
  },
  {
    name: 'VS Code Extension',
    tag: 'DX',
    description:
      'Add syntax highlighting for tokens, units, states, presets, and the rest of the Tasty authoring model inside TS and TSX files.',
    href: 'https://github.com/tenphi/tasty-vscode-extension',
    icon: <IconCode size={22} stroke={1.5} />,
    tint: 'rose',
  },
];

export default function Ecosystem() {
  return (
    <Section id="ecosystem">
      <Section.Title>Companion Tooling</Section.Title>
      <Section.Subtitle>
        Linting, editor support, and palette generation around the core engine
      </Section.Subtitle>
      <Section.Content>
        <Grid gridColumns={{ '': '1sf 1sf 1sf', '@mobile': '1sf' }} gap="3x">
          {ECOSYSTEM.map((item) => (
            <Card
              as="a"
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              variant={item.tint}
            >
              <Card.Header>
                <Card.Title>{item.name}</Card.Title>
                <Card.Icon>{item.icon}</Card.Icon>
              </Card.Header>
              <Card.Description>{item.description}</Card.Description>
              <Badge
                fill="#tint-surface-strong"
                color="#tint-accent-strong"
                placeSelf="start"
                margin="top auto"
              >
                {item.tag}
              </Badge>
            </Card>
          ))}
        </Grid>
      </Section.Content>
    </Section>
  );
}
