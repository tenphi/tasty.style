'use client';

import { tasty } from '@tenphi/tasty';
import Section from '@/app/components/Section';
import Space from '@/app/ui/Space';
import Text from '@/app/ui/Text';
import CodeBlock from '@/app/ui/CodeBlock';
import Tabs from '@/app/ui/Tabs';
import SectionWrap from '@/app/ui/SectionWrap';

const ShowcaseWrapper = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '2x',
    width: '100%',
    fill: '#primary-surface',
    border: true,
    radius: '1cr',
    overflow: 'hidden',
  },
});

const ShowcaseDescription = tasty({
  styles: {
    padding: '3x 3x 0',
    display: 'flex',
    flow: 'column',
    gap: '1x',
  },
});

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
      ':hover': '#primary-hover',
      ':active': '#primary-pressed',
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
    id: 'style-props',
    label: 'styleProps',
    title: 'styleProps as the Public API',
    description:
      'Expose the CSS controls a component should allow as typed props, including state maps for responsive values.',
    code: `import { tasty, FLOW_STYLES, POSITION_STYLES } from '@tenphi/tasty';

const Space = tasty({
  as: 'div',
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '1x',
  },
  styleProps: FLOW_STYLES,
});

const Button = tasty({
  as: 'button',
  styles: {
    padding: '1.5x 3x',
    fill: '#primary',
    color: '#on-primary',
    radius: true,
  },
  styleProps: POSITION_STYLES,
});

<Space flow={{ '': 'column', '@tablet': 'row' }} gap="2x">
  <Button placeSelf="end">Add Item</Button>
</Space>`,
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
    <SectionWrap fill="#primary-surface-2">
      <Section id="code-showcase">
        <Section.Title>See It In Action</Section.Title>
        <Section.Subtitle>
          Patterns from the recommended design-system model
        </Section.Subtitle>
        <Section.Content>
          <Tabs
            width="max 720px"
            margin="auto left right"
            tabs={EXAMPLES.map((example) => ({
              id: example.id,
              label: example.label,
              content: (
                <ShowcaseWrapper>
                  <ShowcaseDescription>
                    <Text preset="h3" color="#primary-text">
                      {example.title}
                    </Text>
                    <Text preset="t2" color="#primary-text-soft">
                      {example.description}
                    </Text>
                  </ShowcaseDescription>
                  <Space padding="0 3x 3x">
                    <CodeBlock radius="1r" lang="tsx">
                      {example.code}
                    </CodeBlock>
                  </Space>
                </ShowcaseWrapper>
              ),
            }))}
          />
        </Section.Content>
      </Section>
    </SectionWrap>
  );
}
