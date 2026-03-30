import { tasty, configure } from '@tenphi/tasty';

configure({
  replaceTokens: {
    '$card-padding': '3x',
    '$elevation-shadow': '0 2x 12x #black.10',
  },
  recipes: {
    card: {
      padding: '$card-padding',
      fill: '#surface',
      radius: '1.5r',
      border: true,
    },
    elevated: {
      shadow: '$elevation-shadow',
      border: 'none',
    },
    interactive: {
      cursor: 'pointer',
      transition: 'theme, shadow, scale',
      transform: { '': 'scale(1)', ':hover': 'scale(1.02)' },
      shadow: {
        '': '$elevation-shadow',
        ':hover': '0 3x 16x #black.15',
      },
    },
    glass: {
      fill: '#accent-text.08',
      backdropFilter: 'blur(12px)',
      border: '1bw solid #accent-text.12',
    },
  },
});

const BasicCard = tasty({
  styles: { recipe: 'card', color: '#text', preset: 't2' },
});

const ElevatedCard = tasty({
  styles: { recipe: 'card elevated', color: '#text', preset: 't2' },
});

const InteractiveCard = tasty({
  styles: { recipe: 'card interactive', color: '#text', preset: 't2' },
});

const GlassCard = tasty({
  styles: { recipe: 'glass', padding: '3x', radius: '1.5r', preset: 't2' },
});

const OverrideCard = tasty({
  styles: {
    recipe: 'card elevated',
    padding: '4x',
    fill: null,
    color: '#text',
    preset: 't2',
  },
});

const TombstoneCard = tasty({
  styles: {
    recipe: 'card elevated',
    shadow: false,
    color: '#text',
    preset: 't2',
  },
});

const Layout = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '2x',
    padding: '3x',
    align: 'center',
  },
});

const Row = tasty({
  styles: { display: 'flex', flow: 'row wrap', gap: '2x', align: 'stretch' },
});

const Label = tasty({
  styles: { preset: 't3 strong', color: '#text-soft', width: '100%' },
});

export const App = () => (
  <Layout>
    <Label>recipe: &apos;card&apos;</Label>
    <Row>
      <BasicCard>Basic card</BasicCard>
      <ElevatedCard>card elevated</ElevatedCard>
    </Row>

    <Label>recipe: &apos;card interactive&apos;</Label>
    <Row>
      <InteractiveCard>Hover me</InteractiveCard>
    </Row>

    <Label>recipe: &apos;glass&apos;</Label>
    <Row>
      <GlassCard>Glass effect</GlassCard>
    </Row>

    <Label>Overrides: fill: null &amp; shadow: false</Label>
    <Row>
      <OverrideCard>fill: null (recipe fills in)</OverrideCard>
      <TombstoneCard>shadow: false (tombstone)</TombstoneCard>
    </Row>
  </Layout>
);
