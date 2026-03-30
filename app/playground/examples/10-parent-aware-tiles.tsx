import { tasty } from '@tenphi/tasty';
import { useState } from 'react';

const COLORS = [
  '#accent-surface',
  '#danger-accent-surface',
  '#success-accent-surface',
  '#warning-accent-surface',
  '#info-accent-surface',
  '#accent-text.15',
  '#danger-accent-text.15',
  '#success-accent-text.15',
  '#warning-accent-text.15',
];

const Layout = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '2x',
    align: 'center',
    padding: '4x',
  },
});

const ToggleButton = tasty({
  as: 'button',
  modProps: { isActive: Boolean },
  styles: {
    display: 'inline-grid',
    placeItems: 'center',
    padding: '1x 2x',
    radius: 'round',
    cursor: 'pointer',
    preset: 't3',
    transition: 'theme .2s',
    border: true,
    fill: { '': '#surface', isActive: '#accent-text.10' },
    color: { '': '#text-soft', isActive: '#accent-text' },
  },
});

const Container = tasty({
  modProps: { isCompact: Boolean },
  styles: {
    display: 'grid',
    gridColumns: 3,
    gap: { '': '2x', isCompact: '1x' },
    padding: '2x',
    radius: '1.5r',
    fill: '#surface',
    border: true,
    cursor: 'pointer',
    transition: 'gap .3s',
  },
});

const Tile = tasty({
  styles: {
    width: { '': '8x', '@parent(isCompact)': '6x' },
    height: { '': '8x', '@parent(isCompact)': '6x' },
    radius: '1r',
    transition: 'theme .2s, scale .2s',
    transform: {
      '': 'scale(1)',
      '@own(:hover)': 'scale(1.12)',
      '@parent(:hover) & !@own(:hover)': 'scale(0.95)',
    },
    opacity: {
      '': 1,
      '@parent(:hover) & !@own(:hover)': 0.6,
    },
    cursor: 'pointer',
  },
  styleProps: ['fill'],
});

export const App = () => {
  const [compact, setCompact] = useState(false);

  return (
    <Layout>
      <ToggleButton
        isActive={compact}
        onClick={() => setCompact((c) => !c)}
      >
        Compact {compact ? '✓' : ''}
      </ToggleButton>
      <Container isCompact={compact}>
        {COLORS.map((color, i) => (
          <Tile key={i} fill={color} />
        ))}
      </Container>
    </Layout>
  );
};
