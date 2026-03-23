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

const CORE_TOKENS_CODE = `configure({
  tokens: {
    '$gap': '8px',
    '$radius': '10px',
    '$border-width': '1px',
    '#surface': {
      '': '#fff',
      '@dark': 'okhsl(255 18% 12%)',
    },
    '#text': {
      '': 'okhsl(255 12% 16%)',
      '@dark': 'okhsl(255 15% 96%)',
    },
    '#primary': {
      '': 'okhsl(272 75% 55%)',
      '@dark': 'okhsl(272 70% 72%)',
    },
  },
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
        <Section.Title>Tokens, Units, and Color Systems</Section.Title>
        <Section.Subtitle>
          Define a shared styling language with global tokens, state-aware
          values, and OKHSL-friendly color authoring
        </Section.Subtitle>
        <Section.Content>
          <Grid
            gridColumns={{ '': '1sf 1sf', '@mobile': '1sf' }}
            gap="3x"
            placeItems="stretch"
          >
            <TokenPanel>
              <TokenLabel>Shared Tokens via configure()</TokenLabel>
              <CodeBlock radius="0 1cr 1cr 1cr" lang="tsx">
                {CORE_TOKENS_CODE}
              </CodeBlock>
            </TokenPanel>
            <TokenPanel>
              <TokenLabel>Glaze Palette Generation</TokenLabel>
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
              Use <b>configure()</b> to define the tokens your design system
              owns. Those values become shared CSS custom properties, and they
              can use state maps too, so themes and breakpoints reuse the same
              vocabulary everywhere.
            </Text>
            <Text
              preset="t1"
              color="#primary-text-soft-2"
              textAlign="center"
              textWrap="balance"
            >
              Tasty also supports <b>OKHSL</b> natively. When you want full
              light, dark, and high-contrast palettes with automatic{' '}
              <b>WCAG-aware</b> contrast solving, use{' '}
              <GlazeLink
                href="https://github.com/tenphi/glaze"
                target="_blank"
                rel="noopener noreferrer"
              >
                Glaze
              </GlazeLink>{' '}
              as the companion palette generator.
            </Text>
          </Space>
        </Section.Content>
      </Section>
    </SectionWrap>
  );
}
