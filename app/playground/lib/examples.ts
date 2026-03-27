export interface PlaygroundExample {
  slug: string;
  label: string;
  code: string;
}

const BUTTON_CODE = `import { tasty } from '@tenphi/tasty';

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
`;

const CARD_CODE = `import { tasty } from '@tenphi/tasty';

const Card = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    padding: '3x',
    radius: '1.5r',
    fill: '#surface',
    border: true,
    gap: '1.5x',
    width: 'max 320px',
    transition: 'theme',
    shadow: {
      '': '0 1x 3x #black.06',
      ':hover': '0 2x 8x #black.10',
    },
    Title: {
      preset: 't2 strong',
      color: '#text',
    },
    Description: {
      preset: 't3',
      color: '#text-soft',
    },
    Actions: {
      display: 'flex',
      flow: 'row',
      gap: '1x',
      padding: '0.5x top',
    },
  },
  elements: {
    Title: 'h3',
    Description: 'p',
    Actions: 'div',
  },
});

const ActionButton = tasty({
  as: 'button',
  styles: {
    display: 'inline-grid',
    placeItems: 'center',
    padding: '0.75x 1.5x',
    radius: true,
    preset: 't3',
    cursor: 'pointer',
    transition: 'theme',
    border: 'none',
    fill: {
      '': '#accent-surface',
      ':hover': '#accent-surface',
      ':active': '#accent-surface',
    },
    color: '#accent-surface-text',
    opacity: {
      '': 1,
      ':hover': 0.9,
      ':active': 0.8,
    },
  },
});

const SecondaryButton = tasty(ActionButton, {
  styles: {
    fill: {
      '': 'transparent',
      ':hover': '#border',
    },
    color: '#text-soft',
    border: true,
  },
});

export const App = () => {
  return (
    <Card>
      <Card.Title>Card Title</Card.Title>
      <Card.Description>
        This is a card component with sub-elements, hover states, and shadow transitions.
      </Card.Description>
      <Card.Actions>
        <ActionButton>Primary</ActionButton>
        <SecondaryButton>Secondary</SecondaryButton>
      </Card.Actions>
    </Card>
  );
};
`;

const BLANK_CODE = `import { tasty } from '@tenphi/tasty';

const Block = tasty({
  styles: {
    padding: '2x',
  },
});

export const App = () => {
  return <Block>Hello, Tasty!</Block>;
};
`;

export const EXAMPLES: PlaygroundExample[] = [
  { slug: 'button', label: 'Button', code: BUTTON_CODE },
  { slug: 'card', label: 'Card', code: CARD_CODE },
  { slug: 'blank', label: 'Blank', code: BLANK_CODE },
];

export const DEFAULT_EXAMPLE = EXAMPLES[0];

export function findExample(slug: string): PlaygroundExample | undefined {
  return EXAMPLES.find((e) => e.slug === slug);
}
