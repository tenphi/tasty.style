'use client';

import { useState } from 'react';
import { tasty, BASE_STYLES, OUTER_STYLES, BLOCK_STYLES } from '@tenphi/tasty';

const TabsElement = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '2x',
    width: '100%',
  },
  styleProps: [...BASE_STYLES, ...OUTER_STYLES, ...BLOCK_STYLES],
});

const TabBar = tasty({
  styles: {
    display: 'flex',
    flow: 'row',
    gap: '1x',
    placeContent: 'center',
    overflow: 'auto hidden',
    scrollbar: 'none',
  },
});

const TabButton = tasty({
  as: 'button',
  styles: {
    display: 'inline-flex',
    placeItems: 'center',
    padding: '1x 2.5x',
    preset: 't3 strong',
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

const TabPanel = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    width: '100%',
    minWidth: 0,
  },
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

export default function Tabs({ tabs, defaultTab, ...props }: TabsProps & Record<string, unknown>) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id);
  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <TabsElement {...props}>
      <TabBar>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            mods={{ active: tab.id === activeTab }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabBar>
      <TabPanel>{activeContent}</TabPanel>
    </TabsElement>
  );
}
