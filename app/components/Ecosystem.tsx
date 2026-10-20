import type { ReactNode } from 'react';
import {
  IconPalette,
  IconShieldCheck,
  IconCode,
  IconRobot,
} from '@tabler/icons-react';
import { tasty } from '@tenphi/tasty';
import type { TintName } from '@/app/theme';
import Section from '@/app/components/Section';
import SectionWrap from '@/app/ui/SectionWrap';
import ServerCodeBlock from '@/app/ui/ServerCodeBlock';
import Grid from '@/app/ui/Grid';
import Badge from '@/app/ui/Badge';
import Card from '@/app/ui/Card';
import Text from '@/app/ui/Text';

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
    name: 'ESLint Plugin',
    tag: 'Linting',
    description:
      '40+ rules for ESLint and oxlint that read your tasty.config.ts and catch unknown tokens, malformed state keys, invalid values, and other DSL mistakes before they reach the browser.',
    href: 'https://github.com/tenphi/eslint-plugin-tasty',
    icon: <IconShieldCheck size={22} stroke={1.5} />,
    tint: 'amber',
  },
  {
    name: 'VS Code Extension',
    tag: 'DX',
    description:
      'Highlight tokens, units, state keys, presets, and style properties inside TS and TSX files, with snippets for components, state maps, and configure().',
    href: 'https://github.com/tenphi/tasty-vscode-extension',
    icon: <IconCode size={22} stroke={1.5} />,
    tint: 'rose',
  },
  {
    name: 'Glaze',
    tag: 'Colors',
    description:
      'Generate light, dark, and high-contrast palettes from one hue in the OKHST color space, with WCAG and APCA contrast solving. Export Tasty tokens directly, or CSS, DTCG, and Tailwind.',
    href: 'https://github.com/tenphi/glaze',
    icon: <IconPalette size={22} stroke={1.5} />,
    tint: 'teal',
  },
  {
    name: 'AI Agent Brief',
    tag: 'AI',
    description:
      'A one-page set of style rules to add to an agent’s context, so generated components use your tokens, units, and state maps the way a reviewer expects.',
    href: '/docs/ai-agents',
    icon: <IconRobot size={22} stroke={1.5} />,
    tint: 'violet',
  },
];

const CONFIG_CODE = `// tasty.config.ts — read by the linter and editor
export default {
  tokens: ['#surface', '#text', '#primary'],
  states: ['@mobile', '@dark'],
  presets: ['h1', 't2'],
  recipes: ['card', 'elevated'],
};

// Keep it in step with configure(). An omitted
// list is not checked.`;

const TYPES_CODE = `// tasty.d.ts — autocomplete for your own names
import '@tenphi/tasty';

declare module '@tenphi/tasty' {
  interface TastyNamedColors {
    surface: true;
    text: true;
    primary: true;
  }
  interface TastyPresetNames {
    h1: true;
    t2: true;
  }
}`;

const LINT_CODE = `const Card = tasty({
  styles: {
    fill: '#surfce',
    // ✖ Unknown color token '#surfce'.

    padding: { '': '4x', '@mobil': '2x' },
    // ✖ Unknown state alias '@mobil'. Configured aliases: @mobile, @dark.

    color: { hovered: '#primary', '': '#text' },
    // ⚠ Default state ('') in 'color' must be the first key in the state map.

    border: '1px solid #ddd',
    // ⚠ Consider using '1bw' instead of '1px'.
    // ⚠ Use a color token instead of raw hex color '#ddd'.
  },
});`;

const GuardPanel = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    width: 'min 0',
  },
});

const GuardLabel = tasty({
  as: 'span',
  styles: {
    display: 'inline-flex',
    padding: '0.75x 2x',
    preset: 't3m',
    radius: '1r 1r 0 0',
    fill: '#accent-surface',
    color: '#accent-surface-text',
    placeSelf: 'start',
    position: 'relative',
    inset: '1bw top left',
    zIndex: 1,
  },
});

const GuideLink = tasty({
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

export default function Ecosystem() {
  return (
    <SectionWrap fill="#surface-2">
      <Section id="guardrails">
        <Section.Title>Guardrails and Tooling</Section.Title>
        <Section.Subtitle>
          Describe your design system once. The linter checks every style
          against it, and TypeScript autocompletes your names.
        </Section.Subtitle>
        <Section.Content>
          <Grid
            gridColumns={{ '': '1sf 1sf', '@mobile': '1sf' }}
            gap="3x"
            placeItems="stretch"
          >
            <GuardPanel>
              <GuardLabel>Project config</GuardLabel>
              <ServerCodeBlock radius="0 1cr 1cr 1cr" lang="tsx">
                {CONFIG_CODE}
              </ServerCodeBlock>
            </GuardPanel>
            <GuardPanel>
              <GuardLabel>TypeScript augmentation</GuardLabel>
              <ServerCodeBlock radius="0 1cr 1cr 1cr" lang="tsx">
                {TYPES_CODE}
              </ServerCodeBlock>
            </GuardPanel>
          </Grid>
          <Grid gridColumns="1sf">
            <GuardPanel>
              <GuardLabel>What the ESLint plugin reports</GuardLabel>
              <ServerCodeBlock radius="0 1cr 1cr 1cr" lang="tsx">
                {LINT_CODE}
              </ServerCodeBlock>
            </GuardPanel>
          </Grid>
          <Text
            preset="t1"
            color="#text-soft-2"
            textAlign="center"
            textWrap="balance"
          >
            The plugin runs in the editor and in CI, with ESLint 9+ or oxlint.
            See the{' '}
            <GuideLink href="/docs/getting-started#eslint-plugin">
              setup guide
            </GuideLink>{' '}
            for the recommended and strict presets.
          </Text>
          <Grid gridColumns={{ '': '1sf 1sf', '@mobile': '1sf' }} gap="3x">
            {ECOSYSTEM.map((item) => (
              <Card
                as="a"
                key={item.name}
                href={item.href}
                {...(item.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
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
    </SectionWrap>
  );
}
