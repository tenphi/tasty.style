'use client';

import { useState } from 'react';
import { tasty, BASE_STYLES, OUTER_STYLES, BLOCK_STYLES } from '@tenphi/tasty';

const TabButton = tasty({
  as: 'button',
  styles: {
    display: 'inline-flex',
    placeItems: 'center',
    placeContent: 'center',
    padding: '1x 2.5x',
    preset: 't3',
    cursor: 'pointer',
    border: true,
    radius: 'round',
    transition: 'theme',
    whiteSpace: 'nowrap',
    fill: {
      '': 'transparent',
      active: '#primary-accent-surface',
    },
    color: {
      '': '#primary-text-soft',
      ':hover & !active': '#primary-text',
      active: '#primary-accent-surface-text',
    },
    borderColor: {
      '': '#primary-border',
      active: '#primary-accent-surface',
    },
  },
});

const TabsElement = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '2x',
    width: '100%',
    Bar: {
      $: '>',
      display: {
        '': 'flex',
        '@mobile': 'grid',
      },
      gridColumns: { '': 'initial', '@mobile': '1sf 1sf' },
      flow: 'row',
      gap: '1x',
      placeContent: 'center',
      overflow: {
        '': 'auto hidden',
        '@mobile': 'hidden',
      },
      scrollbar: 'none',
    },
    PanelContainer: {
      $: '>',
      display: 'grid',
      width: '100%',
      minWidth: 0,
    },
    Panel: {
      $: '>PanelContainer>',
      gridColumn: 1,
      gridRow: 1,
      display: 'flex',
      flow: 'column',
      width: '100%',
      minWidth: 0,
      visibility: {
        '': 'hidden',
        '@own(active)': 'visible',
      },
    },
  },
  elements: {
    Bar: 'div',
    PanelContainer: 'div',
    Panel: 'div',
  },
  styleProps: [...BASE_STYLES, ...OUTER_STYLES, ...BLOCK_STYLES],
});

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
}

export default function Tabs({
  tabs,
  defaultTab,
  ...props
}: TabsProps & Record<string, unknown>) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id);

  return (
    <TabsElement {...props}>
      <TabsElement.Bar>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            mods={{ active: tab.id === activeTab }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabsElement.Bar>
      <TabsElement.PanelContainer>
        {tabs.map((tab) => (
          <TabsElement.Panel
            key={tab.id}
            mods={{ active: tab.id === activeTab }}
          >
            {tab.content}
          </TabsElement.Panel>
        ))}
      </TabsElement.PanelContainer>
    </TabsElement>
  );
}
