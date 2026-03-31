import { tasty, useCounterStyle } from '@tenphi/tasty';
import { useState } from 'react';

const ITEMS = [
  'Install @tenphi/tasty',
  'Create your first component with tasty()',
  'Add state maps for hover and active',
  'Configure design tokens',
  'Build a full design system',
];

const STYLE_OPTIONS = ['thumbs', 'roman', 'steps'] as const;
type StyleOption = (typeof STYLE_OPTIONS)[number];

const StyledList = tasty({
  as: 'ol',
  modProps: { listType: STYLE_OPTIONS },
  styles: {
    display: 'flex',
    flow: 'column',
    gap: 0,
    padding: '0, 3x left',
    width: 'max 400px',
    '@counterStyle': {
      thumbs: {
        system: 'cyclic',
        symbols: '"👍"',
        suffix: '" "',
      },
      roman: {
        system: 'additive',
        range: '1 99',
        additiveSymbols: '10 X, 9 IX, 5 V, 4 IV, 1 I',
        suffix: ') ',
      },
    },
    listStyleType: {
      '': 'decimal',
      'listType=thumbs': 'thumbs',
      'listType=roman': 'roman',
      'listType=steps': '$steps-style',
    },

    Item: {
      $: '> li',
      padding: '1.5x 0',
      preset: 't2',
      color: '#text',
      border: '0, 1bw bottom',
    },
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
  styles: { display: 'flex', flow: 'row wrap', gap: '1x', align: 'center' },
});

const Picker = tasty({
  as: 'button',
  modProps: { isActive: Boolean },
  styles: {
    display: 'inline-grid',
    placeItems: 'center',
    padding: '1x 2x',
    radius: 'round',
    cursor: 'pointer',
    preset: 't3',
    transition: 'theme',
    border: true,
    fill: { '': '#surface', isActive: '#accent-text.10' },
    color: { '': '#text-soft', isActive: '#accent-text' },
  },
});

export const App = () => {
  const [style, setStyle] = useState<StyleOption>('thumbs');

  const stepsName = useCounterStyle(
    {
      system: 'cyclic',
      symbols: '"→"',
      suffix: '" "',
    },
    { name: 'steps' },
  );

  return (
    <Layout>
      <Row>
        {STYLE_OPTIONS.map((opt) => (
          <Picker
            key={opt}
            isActive={style === opt}
            onClick={() => setStyle(opt)}
          >
            {opt}
          </Picker>
        ))}
      </Row>
      <StyledList listType={style} tokens={{ '$steps-style': stepsName }}>
        {ITEMS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </StyledList>
    </Layout>
  );
};
