import { tasty } from '@tenphi/tasty';
import { useState } from 'react';

const VARIANTS = ['solid', 'outline', 'ghost', 'gradient', 'glass'] as const;

const Chip = tasty({
  as: 'button',
  modProps: { isDisabled: Boolean, isPressed: Boolean },
  styles: {
    display: 'inline-grid',
    placeItems: 'center',
    padding: '1x 2x',
    radius: 'round',
    preset: 't3',
    cursor: { '': 'pointer', isDisabled: 'not-allowed' },
    transition: 'theme',
    border: 'none',
    outline: { '': 'none', ':focus-visible': '2ow #accent-text / 2px' },
    opacity: { '': 1, isDisabled: 0.5 },
    fill: { '': 'transparent', isPressed: '#accent-text.15' },
  },
  variants: {
    solid: {
      fill: { '': '#accent-surface', ':hover': '#accent-surface' },
      color: '#accent-surface-text',
      opacity: { '': 1, ':hover': 0.85 },
    },
    outline: {
      fill: { '': 'transparent', ':hover': '#accent-text.06' },
      color: '#accent-text',
      border: '1bw solid #accent-text.30',
    },
    ghost: {
      fill: { '': 'transparent', ':hover': '#accent-text.06' },
      color: '#accent-text',
    },
    gradient: {
      fill: '#accent-surface',
      image: 'linear-gradient(135deg, #accent-surface, #info-accent-surface)',
      color: '#accent-surface-text',
      opacity: { '': 1, ':hover': 0.85 },
    },
    glass: {
      fill: '#accent-text.10',
      color: '#accent-text',
      border: '1bw solid #accent-text.15',
      backdropFilter: 'blur(8px)',
    },
  },
});

const DangerChip = tasty(Chip, {
  styles: {
    fill: {
      '': '#danger-accent-surface',
      ':hover': '#danger-accent-surface',
      isPressed: '@inherit',
    },
    color: '#danger-accent-surface-text',
    border: { ':active': '2bw solid #danger-accent-text' },
    image: null,
    opacity: false,
  },
});

const Layout = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '3x',
    align: 'center',
    padding: '3x',
  },
});

const Row = tasty({
  styles: { display: 'flex', flow: 'row wrap', gap: '1.5x', align: 'center' },
});

const Label = tasty({ styles: { preset: 't3', color: '#text-soft' } });

export const App = () => {
  const [variant, setVariant] = useState<(typeof VARIANTS)[number]>('solid');
  const [pressed, setPressed] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <Layout>
      <Label>All variants</Label>
      <Row>
        {VARIANTS.map((v) => (
          <Chip key={v} variant={v}>
            {v}
          </Chip>
        ))}
      </Row>

      <Label>Pick &amp; interact</Label>
      <Row>
        {VARIANTS.map((v) => (
          <Chip
            key={v}
            variant={variant === v ? 'solid' : 'ghost'}
            onClick={() => setVariant(v)}
          >
            {v}
          </Chip>
        ))}
      </Row>
      <Chip variant={variant} isPressed={pressed} isDisabled={disabled}>
        {variant}
      </Chip>
      <Row>
        <Chip
          variant="outline"
          onClick={() => setPressed((p) => !p)}
        >
          Pressed {pressed ? '✓' : ''}
        </Chip>
        <Chip
          variant="outline"
          onClick={() => setDisabled((d) => !d)}
        >
          Disabled {disabled ? '✓' : ''}
        </Chip>
      </Row>

      <Label>Extended (DangerChip)</Label>
      <Row>
        <DangerChip>Danger</DangerChip>
        <DangerChip isPressed>Pressed</DangerChip>
      </Row>
    </Layout>
  );
};
