import { tasty } from '@tenphi/tasty';

const Button = tasty({
  styles: {
    display: 'inline-grid',
    placeItems: 'center',
    padding: '1x 2x',
    radius: true,
    fill: '#accent-surface',
    color: '#accent-surface-text',
    preset: 't2',
    cursor: 'pointer',
    transition: 'theme',
    opacity: {
      '': 1,
      ':hover': 0.9,
      ':active': 0.8,
    },
  },
});

export const App = () => {
  return <Button>Click Me</Button>;
};
