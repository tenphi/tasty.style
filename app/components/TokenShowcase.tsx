'use client';

import { tasty } from '@tenphi/tasty';
import Section from '@/app/components/Section';
import SectionWrap from '@/app/ui/SectionWrap';
import Grid from '@/app/ui/Grid';
import Space from '@/app/ui/Space';
import Text from '@/app/ui/Text';
import CodeBlock from '@/app/ui/CodeBlock';

const GlazeLink = tasty({
  as: 'a',
  styles: {
    color: '#primary-accent-text',
    textDecoration: {
      '': 'underline',
      ':hover': 'none',
    },
    fontWeight: 600,
    transition: 'theme',
  },
});

const TokenLabel = tasty({
  as: 'span',
  styles: {
    display: 'inline-flex',
    padding: '0.75x 2x',
    preset: 't3 strong',
    radius: '1r 1r 0 0',
    fill: '#primary-accent-surface',
    color: '#primary-accent-surface-text',
    placeSelf: 'start',
    position: 'relative',
    inset: '1bw top left',
    zIndex: 1,
  },
});

const TokenPanel = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    minWidth: 0,
  },
});

const CORE_TOKENS_CODE = `useGlobalStyles('body', {
  // Base tokens
  '$gap': '8px',
  '$radius': '10px',
  '$card-radius': '20px',
  '$border-width': '1px',
  '$outline-width': '2px',
  '$bold-font-weight': 600,
  '$transition': '0.2s',
  '$content-width': '1200px',

  // Color tokens (OKHSL)
  '#success': 'okhsl(145 75% 55%)',
  '#warning': 'okhsl(70 80% 60%)',
  '#danger': 'okhsl(25 85% 55%)',
  '#info': 'okhsl(215 70% 55%)',
  '#neutral': 'okhsl(210 10% 50%)',
});`;

const SEMANTIC_TOKENS_CODE = `const violet = glaze(272, 75);

violet.colors({
  surface: {
    lightness: 98, saturation: 0.2,
  },
  text: {
    base: 'surface', lightness: '-62',
    contrast: 'AAA', saturation: 0.08,
  },
  'accent-surface': {
    lightness: 52, mode: 'fixed',
  },
  'shadow-md': {
    type: 'shadow', bg: 'surface',
    fg: 'text', intensity: 12,
  },
});`;

export default function TokenShowcase() {
  return (
    <SectionWrap>
      <Section id="tokens">
        <Section.Title>Design Token Support</Section.Title>
        <Section.Subtitle>
          Specify spacing, typography, and WCAG‑compliant color palettes with a
          unified token system
        </Section.Subtitle>
        <Section.Content>
          <Grid
            gridColumns={{ '': '1sf 1sf', '@mobile': '1sf' }}
            gap="3x"
            placeItems="stretch"
          >
            <TokenPanel>
              <TokenLabel>Core Tokens</TokenLabel>
              <CodeBlock radius="0 1cr 1cr 1cr" lang="tsx">
                {CORE_TOKENS_CODE}
              </CodeBlock>
            </TokenPanel>
            <TokenPanel>
              <TokenLabel>Palette Color Tokens (Glaze)</TokenLabel>
              <CodeBlock radius="0 1cr 1cr 1cr" lang="tsx">
                {SEMANTIC_TOKENS_CODE}
              </CodeBlock>
            </TokenPanel>
          </Grid>
          <Space gap="1.5x">
            <Text
              preset="t1"
              color="#primary-text-soft-2"
              textAlign="center"
              textWrap="balance"
            >
              Tasty natively supports <b>OKHSL</b> — a perceptually uniform
              color space where equal steps in lightness produce equal changes
              in perceived contrast, making palette generation predictable by
              design.
            </Text>
            <Text
              preset="t1"
              color="#primary-text-soft-2"
              textAlign="center"
              textWrap="balance"
            >
              Need full color palettes with automatic <b>dark mode</b>,{' '}
              <b>high‑contrast schemes</b>, and <b>WCAG‑compliant</b> contrast
              ratios? Use{' '}
              <GlazeLink
                href="https://github.com/tenphi/glaze"
                target="_blank"
                rel="noopener noreferrer"
              >
                Glaze
              </GlazeLink>{' '}
              — a zero‑dependency companion library that generates
              production‑ready color palettes.
            </Text>
          </Space>
        </Section.Content>
      </Section>
    </SectionWrap>
  );
}
