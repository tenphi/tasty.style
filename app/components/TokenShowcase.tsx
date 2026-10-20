import { tasty } from '@tenphi/tasty';
import ServerCodeBlock from '@/app/ui/ServerCodeBlock';
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
    preset: 'strong',
    transition: 'theme',
  },
});

const TokenLabel = tasty({
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

const TokenPanel = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    width: 'min 0',
  },
});

const CORE_TOKENS_CODE = `configure({
  units: {
    x: '8px', // padding: '2x' → 16px
    r: '10px', // radius: '1r' → 10px
  },
  tokens: {
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
    tone: 98, saturation: 0.2,
  },
  text: {
    base: 'surface', tone: '-62',
    contrast: 'AAA', saturation: 0.08,
  },
  'accent-surface': {
    tone: 52, mode: 'fixed',
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
          Define a shared styling language with units, state-aware tokens, and
          OKHSL or OKHST colors
        </Section.Subtitle>
        <Section.Content>
          <Grid
            gridColumns={{ '': '1sf 1sf', '@mobile': '1sf' }}
            gap="3x"
            placeItems="stretch"
          >
            <TokenPanel>
              <TokenLabel>Units and Tokens via configure()</TokenLabel>
              <ServerCodeBlock radius="0 1cr 1cr 1cr" lang="tsx">
                {CORE_TOKENS_CODE}
              </ServerCodeBlock>
            </TokenPanel>
            <TokenPanel>
              <TokenLabel>Glaze Palette Generation</TokenLabel>
              <ServerCodeBlock radius="0 1cr 1cr 1cr" lang="tsx">
                {SEMANTIC_TOKENS_CODE}
              </ServerCodeBlock>
            </TokenPanel>
          </Grid>
          <Space gap="1.5x">
            <Text
              preset="t1"
              color="#text-soft-2"
              textAlign="center"
              textWrap="balance"
            >
              Use <b>configure()</b> to define the units and tokens your design
              system owns. Units compile to plain values, so <b>2x</b> is 16px
              here. Tokens become shared CSS custom properties and can use state
              maps too, so themes and breakpoints reuse the same vocabulary
              everywhere.
            </Text>
            <Text
              preset="t1"
              color="#text-soft-2"
              textAlign="center"
              textWrap="balance"
            >
              Tasty reads <b>okhsl()</b> and <b>okhst()</b> colors natively. For
              full light, dark, and high-contrast palettes with{' '}
              <b>WCAG and APCA</b> contrast solving, use{' '}
              <GlazeLink
                href="https://github.com/tenphi/glaze"
                target="_blank"
                rel="noopener noreferrer"
              >
                Glaze
              </GlazeLink>
              , the companion palette generator built on OKHST.
            </Text>
          </Space>
        </Section.Content>
      </Section>
    </SectionWrap>
  );
}
