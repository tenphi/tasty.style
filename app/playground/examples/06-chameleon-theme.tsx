import { tasty } from '@tenphi/tasty';
import { useState } from 'react';

const THEMES = [
  { name: 'primary', label: 'Primary' },
  { name: 'danger', label: 'Danger' },
  { name: 'success', label: 'Success' },
  { name: 'warning', label: 'Warning' },
  { name: 'info', label: 'Info' },
];

const TYPES = [
  { name: 'normal', label: 'Normal' },
  { name: 'accent', label: 'Accent' },
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

const ThemeSwatch = tasty({
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
    shadow: { '': 'none', isActive: '0 0 0 2bw #shadow' },
    $transition: '.3s',
    transition: 'theme',
    transform: { '': 'scale(1)', ':active': 'scale(0.92)' },
  },
});

const TypeToggle = tasty({
  as: 'button',
  modProps: { isActive: Boolean },
  styles: {
    display: 'inline-grid',
    placeItems: 'center',
    padding: '1x 2x',
    radius: 'round',
    cursor: 'pointer',
    preset: 't3',
    $transition: '.3s',
    transition: 'theme',
    border: true,
    fill: { '': '#surface', isActive: '#accent-text.10' },
    color: { '': '#text-soft', isActive: '#accent-text' },
  },
});

const PreviewCard = tasty({
  modProps: { theme: String, type: String },
  styles: {
    display: 'flex',
    flow: 'column',
    padding: '3x',
    radius: '1.5r',
    gap: '1.5x',
    width: 'max 340px',
    $transition: '.3s',
    transition: 'theme',
    fill: {
      '': '#surface',
      'type=accent': '#accent-surface',
      'theme=danger': '#danger-surface',
      'theme=danger & type=accent': '#danger-accent-surface',
      'theme=success': '#success-surface',
      'theme=success & type=accent': '#success-accent-surface',
      'theme=warning': '#warning-surface',
      'theme=warning & type=accent': '#warning-accent-surface',
      'theme=info': '#info-surface',
      'theme=info & type=accent': '#info-accent-surface',
    },
    color: {
      '': '#text',
      'type=accent': '#accent-surface-text',
      'theme=danger': '#danger-text',
      'theme=danger & type=accent': '#danger-accent-surface-text',
      'theme=success': '#success-text',
      'theme=success & type=accent': '#success-accent-surface-text',
      'theme=warning': '#warning-text',
      'theme=warning & type=accent': '#warning-accent-surface-text',
      'theme=info': '#info-text',
      'theme=info & type=accent': '#info-accent-surface-text',
    },
    border: {
      '': '1bw solid #border',
      'type=accent': '1bw solid transparent',
      'theme=danger': '1bw solid #danger-border',
      'theme=danger & type=accent': '1bw solid transparent',
      'theme=success': '1bw solid #success-border',
      'theme=success & type=accent': '1bw solid transparent',
      'theme=warning': '1bw solid #warning-border',
      'theme=warning & type=accent': '1bw solid transparent',
      'theme=info': '1bw solid #info-border',
      'theme=info & type=accent': '1bw solid transparent',
      '@high-contrast': '2bw solid #text',
    },
    shadow: {
      '': '0 2x 8x #shadow',
      'type=accent': '0 2x 8x #accent-shadow',
      'theme=danger': '0 2x 8x #danger-shadow',
      'theme=danger & type=accent': '0 2x 8x #danger-accent-shadow',
      'theme=success': '0 2x 8x #success-shadow',
      'theme=success & type=accent': '0 2x 8x #success-accent-shadow',
      'theme=warning': '0 2x 8x #warning-shadow',
      'theme=warning & type=accent': '0 2x 8x #warning-accent-shadow',
      'theme=info': '0 2x 8x #info-shadow',
      'theme=info & type=accent': '0 2x 8x #info-accent-shadow',
    },

    Title: {
      preset: 't2 strong',
      color: {
        '': '#accent-text',
        'type=accent': '#accent-surface-text',
        'theme=danger': '#danger-accent-text',
        'theme=danger & type=accent': '#danger-accent-surface-text',
        'theme=success': '#success-accent-text',
        'theme=success & type=accent': '#success-accent-surface-text',
        'theme=warning': '#warning-accent-text',
        'theme=warning & type=accent': '#warning-accent-surface-text',
        'theme=info': '#info-accent-text',
        'theme=info & type=accent': '#info-accent-surface-text',
      },
    },
    Body: {
      preset: 't3',
      color: {
        '': '#text',
        'type=accent': '#accent-surface-text',
        'theme=danger & type=accent': '#danger-accent-surface-text',
        'theme=success & type=accent': '#success-accent-surface-text',
        'theme=warning & type=accent': '#warning-accent-surface-text',
        'theme=info & type=accent': '#info-accent-surface-text',
      },
    },
    Footer: {
      preset: 't3',
      color: {
        '': '#text-soft.8',
        'type=accent': '#accent-surface-text.7',
        'theme=danger & type=accent': '#danger-accent-surface-text.7',
        'theme=success & type=accent': '#success-accent-surface-text.7',
        'theme=warning & type=accent': '#warning-accent-surface-text.7',
        'theme=info & type=accent': '#info-accent-surface-text.7',
      },
    },
  },
  elements: { Title: 'h3', Body: 'p', Footer: 'span' },
});

export const App = () => {
  const [type, setType] = useState<'normal' | 'accent'>('normal');
  const [theme, setTheme] = useState('primary');

  return (
    <Layout>
      <SwatchRow>
        {THEMES.map((t) => (
          <ThemeSwatch
            key={t.name}
            isActive={theme === t.name}
            tokens={{ '$swatch-color': `#${t.name}-accent-surface` }}
            onClick={() => setTheme(t.name)}
            title={t.label}
          />
        ))}
      </SwatchRow>
      <SwatchRow>
        {TYPES.map((t) => (
          <TypeToggle
            key={t.name}
            isActive={type === t.name}
            onClick={() => setType(t.name as 'normal' | 'accent')}
          >
            {t.label}
          </TypeToggle>
        ))}
      </SwatchRow>
      <PreviewCard theme={theme} type={type}>
        <PreviewCard.Title>Chameleon Theme</PreviewCard.Title>
        <PreviewCard.Body>
          Switch themes and card types above. Dark mode and high contrast are
          controlled by the playground toolbar. The card uses modProps-driven
          state maps and design tokens from the palette.
        </PreviewCard.Body>
        <PreviewCard.Footer>
          Theme: {THEMES.find((t) => t.name === theme)?.label} / Type:{' '}
          {TYPES.find((t) => t.name === type)?.label}
        </PreviewCard.Footer>
      </PreviewCard>
    </Layout>
  );
};
