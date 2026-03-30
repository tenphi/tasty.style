import { tasty } from '@tenphi/tasty';
import { useState } from 'react';
import { IconChevronDown } from './icons';

const FAQ = [
  {
    q: 'What is Tasty?',
    a: 'A CSS-in-JS styling system and DSL for React with declarative, state-aware styling and design token integration.',
  },
  {
    q: 'How do state maps work?',
    a: 'State maps are objects where keys represent states (hovered, pressed, @media) and values are the styles to apply.',
  },
  {
    q: 'Can I use it with Next.js?',
    a: 'Yes! Tasty includes Next.js integration for both runtime and zero-runtime modes, with full SSR support.',
  },
  {
    q: 'Is it zero-runtime?',
    a: 'Tasty supports both runtime styling and zero-runtime CSS extraction via its Babel plugin for performance-critical pages.',
  },
];

const Accordion = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    width: 'max 500px',
    radius: '1.5r',
    border: true,
    overflow: 'hidden',
  },
});

const Item = tasty({
  modProps: { isExpanded: Boolean },
  styles: {
    display: 'flex',
    flow: 'column',
    transition: 'theme .3s',
    border: { '': '0, 1bw bottom', ':last-child': '0' },
    radius: {
      '': '0',
      ':first-child': '1r top',
      ':last-child': '1r bottom',
    },
    fill: { '': 'transparent', ':has(> Answer)': '#accent-text.03' },

    Question: {
      $: '>',
      display: 'flex',
      flow: 'row',
      align: 'center',
      justify: 'space-between',
      padding: '2x 2.5x',
      cursor: 'pointer',
      preset: 't2',
      border: 'none',
      fill: 'transparent',
      width: '100%',
      textAlign: 'left',
      transition: 'theme',
      color: {
        '': '#text',
        '@own(:hover)': '#accent-text',
        isExpanded: '#accent-text',
      },
    },
    Chevron: {
      display: 'inline-flex',
      transition: 'rotate .3s',
      transform: { '': 'rotate(0)', isExpanded: 'rotate(180deg)' },
      color: '#text-soft',
    },
    Answer: {
      $: '>',
      padding: '0 2.5x 2x',
      preset: 't3',
      color: '#text-soft',
      opacity: { '': 1, '@starting': 0 },
      transform: { '': 'translateY(0)', '@starting': 'translateY(-1x)' },
      transition: 'opacity .3s, translate .3s',
    },
  },
  elements: {
    Question: 'button',
    Chevron: 'span',
    Answer: 'div',
  },
});

export const App = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <Accordion>
      {FAQ.map((item, i) => (
        <Item key={i} isExpanded={expanded === i}>
          <Item.Question
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            {item.q}
            <Item.Chevron>
              <IconChevronDown size={18} />
            </Item.Chevron>
          </Item.Question>
          {expanded === i && <Item.Answer>{item.a}</Item.Answer>}
        </Item>
      ))}
    </Accordion>
  );
};
