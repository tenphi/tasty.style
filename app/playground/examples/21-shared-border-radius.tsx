import { tasty } from '@tenphi/tasty';
import { useState } from 'react';
import type { ReactNode } from 'react';

const Layout = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '3x',
    align: 'center',
    padding: '4x',
  },
});

const Label = tasty({
  styles: {
    preset: 't3 strong',
    color: '#text-soft',
    width: '100%',
    textAlign: 'center',
  },
});

const ButtonGroupElement = tasty({
  'data-button-group': true,
  styles: {
    display: 'inline-flex',
    flow: 'row',
    radius: '$group-radius',
  },
});

function ButtonGroup({
  radius = '1r',
  children,
}: {
  radius?: string;
  children: ReactNode;
}) {
  return (
    <ButtonGroupElement tokens={{ '$group-radius': radius }}>
      {children}
    </ButtonGroupElement>
  );
}

const Row = tasty({
  styles: {
    display: 'inline-flex',
    flow: 'row',
    gap: '1x',
  },
});

const RADII = ['1r', '1.5r', '2r', 'round'] as const;

const RadiusPicker = tasty({
  as: 'button',
  modProps: { isActive: Boolean },
  styles: {
    display: 'inline-grid',
    placeItems: 'center',
    padding: '0.75x 1.5x',
    radius: 'round',
    cursor: 'pointer',
    preset: 't3',
    transition: 'theme',
    border: true,
    fill: { '': '#surface', isActive: '#accent-text.10' },
    color: { '': '#text-soft', isActive: '#accent-text' },
  },
});

const Button = tasty({
  as: 'button',
  styles: {
    display: 'inline-grid',
    placeItems: 'center',
    padding: '1x 2x',
    preset: 't2',
    cursor: 'pointer',
    transition: 'theme',
    border: true,
    fill: '#accent-surface',
    color: '#accent-surface-text',
    opacity: {
      '': 1,
      ':hover': 0.9,
      ':active': 0.8,
    },
    radius: {
      '': true,
      '@parent(button-group, >)': '0',
      '@parent(button-group, >) & :first-child': '$group-radius left',
      '@parent(button-group, >) & :last-child': '$group-radius right',
    },
  },
});

export const App = () => {
  const [radius, setRadius] = useState<string>('1r');

  return (
    <Layout>
      <Row>
        {RADII.map((r) => (
          <RadiusPicker
            key={r}
            isActive={radius === r}
            onClick={() => setRadius(r)}
          >
            {r}
          </RadiusPicker>
        ))}
      </Row>

      <Label>With shared border radius (ButtonGroup)</Label>
      <ButtonGroup radius={radius === 'round' ? '999rem' : radius}>
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>

      <Label>Without group (independent radius)</Label>
      <Row>
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </Row>
    </Layout>
  );
};
