'use client';

import type { ReactNode } from 'react';
import { tasty } from '@tenphi/tasty';
import Section from '@/app/components/Section';
import Space from '@/app/ui/Space';
import Text from '@/app/ui/Text';
import Tabs from '@/app/ui/Tabs';
import SectionWrap from '@/app/ui/SectionWrap';

const ShowcaseWrapper = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '2x',
    width: '100%',
    fill: '#surface',
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

export interface CodeShowcaseTab {
  id: string;
  label: string;
  title: string;
  description: string;
  codeBlock: ReactNode;
}

export default function CodeShowcaseClient({
  tabs,
}: {
  tabs: CodeShowcaseTab[];
}) {
  return (
    <SectionWrap fill="#surface-2">
      <Section id="code-showcase">
        <Section.Title>See It In Action</Section.Title>
        <Section.Subtitle>
          Patterns from the recommended design-system model
        </Section.Subtitle>
        <Section.Content>
          <Tabs
            width="max 720px"
            margin="auto left right"
            tabs={tabs.map((tab) => ({
              id: tab.id,
              label: tab.label,
              content: (
                <ShowcaseWrapper>
                  <ShowcaseDescription>
                    <Text preset="h3" color="#text">
                      {tab.title}
                    </Text>
                    <Text preset="t2" color="#text-soft">
                      {tab.description}
                    </Text>
                  </ShowcaseDescription>
                  <Space padding="0 3x 3x">{tab.codeBlock}</Space>
                </ShowcaseWrapper>
              ),
            }))}
          />
        </Section.Content>
      </Section>
    </SectionWrap>
  );
}
