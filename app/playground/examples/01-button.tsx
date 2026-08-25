import { tasty } from '@tenphi/tasty';

const Button = tasty({
  as: 'button',
  styles: {
    display: 'inline-grid',
    placeItems: 'center',
    padding: '1x 2x',
    radius: true,
    border: true,
    fill: {
      '': '#accent-surface',
      ':hover': '#accent-surface-2',
      ':active': '#accent-surface-3',
      '[disabled]': '#surface-3',
    },
    color: '#accent-surface-text',
    preset: 't2',
    transition: 'theme',
    opacity: {
      '': 1,
      '[disabled]': 0.55,
    },
    cursor: { '': 'pointer', '[disabled]': 'not-allowed' },
  },
});

const Layout = tasty({
  styles: {
    display: 'flex',
    flow: 'row wrap',
    gap: '2x',
    placeItems: 'center',
    placeContent: 'center',
    padding: '4x',
  },
});

export const App = () => (
  <Layout>
    <Button>Hover or press me</Button>
    <Button disabled>Hover while disabled</Button>
  </Layout>
);
