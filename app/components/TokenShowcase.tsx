'use client';

import { tasty } from '@tenphi/tasty';
import Section from '@/app/components/Section';
import SectionWrap from '@/app/ui/SectionWrap';
import Grid from '@/app/ui/Grid';
import CodeBlock from '@/app/ui/CodeBlock';

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
  '$gap': '8px',
  '$radius': '10px',
  '$card-radius': '20px',
  '$border-width': '1px',
  '$outline-width': '2px',
  '$bold-font-weight': '600',
  '$transition': '0.2s',
  '$content-width': '1200px',
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
    <SectionWrap fill="#primary-surface-2">
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
              <CodeBlock radius="0 1cr 1cr 1cr">{CORE_TOKENS_CODE}</CodeBlock>
            </TokenPanel>
            <TokenPanel>
              <TokenLabel>Semantic Tokens (Glaze)</TokenLabel>
              <CodeBlock radius="0 1cr 1cr 1cr">
                {SEMANTIC_TOKENS_CODE}
              </CodeBlock>
            </TokenPanel>
          </Grid>
        </Section.Content>
      </Section>
    </SectionWrap>
  );
}
