'use client';

import type { ReactNode } from 'react';
import { tasty } from '@tenphi/tasty';
import Section from '@/app/components/Section';
import SectionWrap from '@/app/ui/SectionWrap';
import Grid from '@/app/ui/Grid';
import Space from '@/app/ui/Space';
import Text from '@/app/ui/Text';

const GlazeLink = tasty({
  as: 'a',
  styles: {
    color: '#accent-text',
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
    fill: '#accent-surface',
    color: '#accent-surface-text',
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

export default function TokenShowcaseClient({
  coreTokensBlock,
  semanticTokensBlock,
}: {
  coreTokensBlock: ReactNode;
  semanticTokensBlock: ReactNode;
}) {
  return (
    <SectionWrap>
      <Section id="tokens">
        <Section.Title>Tokens, Units, and Color Systems</Section.Title>
        <Section.Subtitle>
          Define a shared styling language with global tokens, state-aware values,
          and OKHSL-friendly color authoring
        </Section.Subtitle>
        <Section.Content>
          <Grid
            gridColumns={{ '': '1sf 1sf', '@mobile': '1sf' }}
            gap="3x"
            placeItems="stretch"
          >
            <TokenPanel>
              <TokenLabel>Shared Tokens via configure()</TokenLabel>
              {coreTokensBlock}
            </TokenPanel>
            <TokenPanel>
              <TokenLabel>Glaze Palette Generation</TokenLabel>
              {semanticTokensBlock}
            </TokenPanel>
          </Grid>
          <Space gap="1.5x">
            <Text
              preset="t1"
              color="#text-soft-2"
              textAlign="center"
              textWrap="balance"
            >
              Use <b>configure()</b> to define the tokens your design system owns.
              Those values become shared CSS custom properties, and they can use
              state maps too, so themes and breakpoints reuse the same vocabulary
              everywhere.
            </Text>
            <Text
              preset="t1"
              color="#text-soft-2"
              textAlign="center"
              textWrap="balance"
            >
              Tasty also supports <b>OKHSL</b> natively. When you want full light,
              dark, and high-contrast palettes with automatic{' '}
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
