'use client';

import type { ReactNode } from 'react';
import NextLink from 'next/link';
import { tasty, OUTER_STYLES, BLOCK_STYLES, FLOW_STYLES } from '@tenphi/tasty';
import { IconArrowRight, IconExternalLink } from '@tabler/icons-react';
import Section from '@/app/components/Section';
import Grid from '@/app/ui/Grid';
import Space from '@/app/ui/Space';
import Text from '@/app/ui/Text';
import Badge from '@/app/ui/Badge';
import SectionWrap from '@/app/ui/SectionWrap';
import Tabs from '@/app/ui/Tabs';
import SpecialButton from '@/app/ui/SpecialButton';

const ColumnHeader = tasty({
  styles: {
    display: 'flex',
    flow: 'row',
    gap: '1.5x',
    placeContent: 'space-between',
    placeItems: 'center',
  },
  styleProps: [...OUTER_STYLES, ...BLOCK_STYLES, ...FLOW_STYLES],
});

const ArrowIconWrap = tasty({
  styles: {
    display: 'flex',
    placeItems: 'center',
    placeContent: 'center',
    color: '#accent-text-2',
    transform: {
      '': 'rotate(0deg)',
      '@mobile': 'rotate(90deg)',
    },
  },
});

function ExampleGrid({
  inputBlock,
  outputBlock,
}: {
  inputBlock: ReactNode;
  outputBlock: ReactNode;
}) {
  return (
    <Grid
      gridColumns={{ '': '1sf max-content 1sf', '@mobile': '1sf' }}
      gap={{ '': '2x', '@mobile': '2x' }}
      placeItems="start stretch"
    >
      <Space gap="2x">
        <ColumnHeader>
          <Text preset="h3" color="#text-2">
            Tasty DSL
          </Text>
          <Badge fill="#teal-surface-3" color="#teal-accent-text-3">
            Input
          </Badge>
        </ColumnHeader>
        {inputBlock}
      </Space>
      <ArrowIconWrap>
        <IconArrowRight size={32} />
      </ArrowIconWrap>
      <Space gap="2x">
        <ColumnHeader flow={{ '': 'row-reverse', '@mobile': 'row' }}>
          <Text preset="h3" color="#text-2">
            Exclusive CSS Selectors
          </Text>
          <Badge fill="#coral-surface-3" color="#coral-accent-text-3">
            Output
          </Badge>
        </ColumnHeader>
        {outputBlock}
      </Space>
    </Grid>
  );
}

export interface HowItWorksBlocks {
  simpleInput: ReactNode;
  simpleOutput: ReactNode;
  aliasInput: ReactNode;
  aliasOutput: ReactNode;
}

export default function HowItWorksClient({
  blocks,
}: {
  blocks: HowItWorksBlocks;
}) {
  const tabs = [
    {
      id: 'interactive-states',
      label: 'Interactive States',
      content: (
        <ExampleGrid
          inputBlock={blocks.simpleInput}
          outputBlock={blocks.simpleOutput}
        />
      ),
    },
    {
      id: 'state-aliases',
      label: 'Complex States',
      content: (
        <ExampleGrid
          inputBlock={blocks.aliasInput}
          outputBlock={blocks.aliasOutput}
        />
      ),
    },
  ];

  return (
    <SectionWrap fill="#surface-2">
      <Section id="how-it-works">
        <Section.Title>How It Actually Works</Section.Title>
        <Section.Subtitle>
          Every state map compiles into mutually exclusive selectors per property
        </Section.Subtitle>
        <Section.Content>
          <Tabs tabs={tabs} defaultTab="interactive-states" />
          <Space gap="2x">
            <Text preset="t1" color="#text-soft-2" textAlign="center">
              Each branch is guarded so one rule wins by construction. No
              specificity arithmetic. No source-order accidents.
            </Text>
            <Text preset="t1" color="#text-soft-2" textAlign="center">
              That is what lets components{' '}
              <strong>compose, extend, and stay predictable</strong> as states
              intersect.
            </Text>
          </Space>
          <SpecialButton as={NextLink} href="/playground" margin="0 auto">
            Try in Playground
            <IconExternalLink size={18} />
          </SpecialButton>
        </Section.Content>
      </Section>
    </SectionWrap>
  );
}
