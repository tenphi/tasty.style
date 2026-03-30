import { tasty } from '@tenphi/tasty';
import { useState, useCallback } from 'react';

const SCHEMAS = [
  { name: 'light', label: 'Light', color: 'oklch(97% 0.01 240)' },
  { name: 'dark', label: 'Dark', color: 'oklch(20% 0.03 260)' },
  { name: 'ocean', label: 'Ocean', color: 'oklch(45% 0.12 230)' },
  { name: 'sunset', label: 'Sunset', color: 'oklch(65% 0.18 50)' },
];

const Layout = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '3x',
    align: 'center',
    padding: '4x',
  },
});

const SwatchRow = tasty({
  styles: { display: 'flex', flow: 'row wrap', gap: '1.5x', align: 'center' },
});

const Swatch = tasty({
  as: 'button',
  modProps: { isActive: Boolean },
  styles: {
    display: 'grid',
    placeItems: 'center',
    width: '5x',
    height: '5x',
    radius: 'round',
    cursor: 'pointer',
    fill: '$swatch-color',
    border: {
      '': '2bw solid transparent',
      isActive: '2bw solid #accent-text',
    },
    shadow: { '': 'none', isActive: '0 0 0 2bw #accent-text.20' },
    transition: 'theme .3s',
    transform: { '': 'scale(1)', ':active': 'scale(0.92)' },
  },
});

const ContrastToggle = tasty({
  as: 'button',
  modProps: { isActive: Boolean },
  styles: {
    display: 'inline-grid',
    placeItems: 'center',
    padding: '1x 2x',
    radius: 'round',
    cursor: 'pointer',
    preset: 't3',
    transition: 'theme .3s',
    border: true,
    fill: { '': '#surface', isActive: '#accent-text.10' },
    color: { '': '#text-soft', isActive: '#accent-text' },
  },
});

const PreviewCard = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    padding: '3x',
    radius: '1.5r',
    gap: '1.5x',
    width: 'max 340px',
    transition: 'theme .3s',
    fill: {
      '': '#surface #accent-text.05',
      '@root(schema=ocean)': '#surface #info-accent-text.08',
      '@root(schema=sunset)': '#surface #warning-accent-text.08',
    },
    border: {
      '': '1bw solid #border',
      '@root(schema=ocean)': '1bw solid #info-accent-text.20',
      '@root(schema=sunset)': '1bw solid #warning-accent-text.20',
      '@high-contrast': '2bw solid #text',
    },
    shadow: {
      '': '0 2x 8x #black.08',
      '@dark': '0 2x 12x #black.25',
    },

    Title: {
      preset: 't2 strong',
      color: {
        '': '#accent-text',
        '@root(schema=ocean)': '#info-accent-text',
        '@root(schema=sunset)': '#warning-accent-text',
      },
    },
    Body: { preset: 't3', color: '#text' },
    Footer: { preset: 't3', color: '#text-soft.8' },
  },
  elements: { Title: 'h3', Body: 'p', Footer: 'span' },
});

export const App = () => {
  const [schema, setSchema] = useState('light');
  const [highContrast, setHighContrast] = useState(false);

  const applySchema = useCallback((name: string) => {
    setSchema(name);
    const root = document.documentElement;
    if (name === 'light') root.removeAttribute('data-schema');
    else root.setAttribute('data-schema', name);
  }, []);

  const toggleContrast = useCallback(() => {
    setHighContrast((prev) => {
      const next = !prev;
      const root = document.documentElement;
      if (next) root.setAttribute('data-contrast', 'more');
      else root.removeAttribute('data-contrast');
      return next;
    });
  }, []);

  return (
    <Layout>
      <SwatchRow>
        {SCHEMAS.map((s) => (
          <Swatch
            key={s.name}
            isActive={schema === s.name}
            tokens={{ '$swatch-color': s.color }}
            onClick={() => applySchema(s.name)}
            title={s.label}
          />
        ))}
      </SwatchRow>
      <ContrastToggle isActive={highContrast} onClick={toggleContrast}>
        High Contrast {highContrast ? '✓' : ''}
      </ContrastToggle>
      <PreviewCard>
        <PreviewCard.Title>Chameleon Theme</PreviewCard.Title>
        <PreviewCard.Body>
          Click a swatch to switch the color scheme. The card transitions
          smoothly between themes using @root() states and the @dark alias.
        </PreviewCard.Body>
        <PreviewCard.Footer>
          Current: {SCHEMAS.find((s) => s.name === schema)?.label}
        </PreviewCard.Footer>
      </PreviewCard>
    </Layout>
  );
};
