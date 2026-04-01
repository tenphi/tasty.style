import ServerCodeBlock from '@/app/ui/ServerCodeBlock';
import CodeShowcaseClient from './CodeShowcaseClient';

const EXAMPLES = [
  {
    id: 'state-maps',
    label: 'State Maps',
    title: 'State Maps',
    description:
      'Declare intersecting states once and let Tasty generate the exclusive selectors that keep the outcome deterministic.',
    code: `const Button = tasty({
  as: 'button',
  styles: {
    fill: {
      '': '#primary',
      ':hover': '#hover',
      ':active': '#pressed',
      '[disabled]': '#surface',
    },
    color: {
      '': '#on-primary',
      '[disabled]': '#text.40',
    },
    transition: 'theme',
  },
});`,
  },
  {
    id: 'style-mod-props',
    label: 'styleProps & modProps',
    title: 'styleProps & modProps',
    description:
      'Expose CSS layout controls as typed props with styleProps, and modifier states as direct props with modProps — no mods object needed.',
    code: `import { tasty, POSITION_STYLES } from '@tenphi/tasty';

const Button = tasty({
  as: 'button',
  styleProps: POSITION_STYLES,
  modProps: {
    isLoading: Boolean,
    size: ['small', 'medium', 'large'] as const,
  },
  styles: {
    padding: {
      '': '1.5x 3x',
      'size=small': '1x 2x',
      'size=large': '2x 4x',
    },
    fill: {
      '': '#primary',
      isLoading: '#primary.5',
    },
    color: '#on-primary',
    radius: true,
    cursor: { '': 'pointer', isLoading: 'wait' },
  },
});

<Button size="large" placeSelf="end">Submit</Button>
<Button isLoading>Saving...</Button>`,
  },
  {
    id: 'sub-elements',
    label: 'Sub-Elements',
    title: 'Root + Sub-Elements',
    description:
      'Model compound components around a root state context so inner parts react together without duplicated modifier wiring.',
    code: `const Alert = tasty({
  styles: {
    padding: '3x',
    fill: {
      '': '#surface',
      'type=danger': '#danger.10',
    },
    border: {
      '': '1bw solid #border',
      'type=danger': '1bw solid #danger',
    },
    Icon: {
      color: {
        '': '#text-secondary',
        'type=danger': '#danger',
      },
    },
    Message: {
      color: '#text',
    },
  },
  elements: { Icon: 'span', Message: 'div' },
});

<Alert mods={{ type: 'danger' }}>
  <Alert.Icon>!</Alert.Icon>
  <Alert.Message>Something went wrong</Alert.Message>
</Alert>`,
  },
  {
    id: 'configuration',
    label: 'Configuration',
    title: 'Configuration',
    description:
      'Define the styling language once, then build components and product APIs on top of it.',
    code: `import { configure } from '@tenphi/tasty';

configure({
  tokens: {
    '#primary': 'oklch(55% 0.25 265)',
    '#surface': '#fff',
    '#text': '#111',
  },
  states: {
    '@mobile': '@media(w < 768px)',
    '@dark': '@root(schema=dark)',
  },
  recipes: {
    card: {
      padding: '4x',
      fill: '#surface',
      radius: '1r',
      border: true,
    },
  },
});`,
  },
];

export default function CodeShowcase() {
  return (
    <CodeShowcaseClient
      tabs={EXAMPLES.map((example) => ({
        id: example.id,
        label: example.label,
        title: example.title,
        description: example.description,
        codeBlock: (
          <ServerCodeBlock radius="1r" lang="tsx">
            {example.code}
          </ServerCodeBlock>
        ),
      }))}
    />
  );
}
