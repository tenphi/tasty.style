'use client';

import type { ChangeEvent } from 'react';
import { useRef, useEffect, useState, useCallback } from 'react';
import { tasty } from '@tenphi/tasty';
import type { CssSections } from '../lib/reorder-css';
import {
  TabBar,
  Tab,
  EditorWrap,
  HeaderLabel,
  MobilePanelSelect,
} from './primitives';

interface CssOutputPanelProps {
  sections: CssSections;
  mobilePanel?: string;
  onMobilePanelChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const PanelLabel = tasty(HeaderLabel, {
  styles: {
    padding: '0 2x',
    color: '#primary-text-soft',
    preset: 'label',
    border: '1bw #primary-border right',
    flexShrink: 0,
    flex: '0 0 auto',
  },
});

type CssTab = 'elements' | 'tokens' | 'utility';

const TAB_LABELS: Record<CssTab, string> = {
  elements: 'Elements',
  tokens: 'Tokens',
  utility: 'Utility',
};

const ALL_TABS: CssTab[] = ['elements', 'tokens', 'utility'];

export default function CssOutputPanel({
  sections,
  mobilePanel,
  onMobilePanelChange,
}: CssOutputPanelProps) {
  const [activeTab, setActiveTab] = useState<CssTab>('elements');

  const containerRefs = useRef<Record<CssTab, HTMLDivElement | null>>({
    elements: null,
    tokens: null,
    utility: null,
  });
  const viewRefs = useRef<Record<CssTab, any>>({
    elements: null,
    tokens: null,
    utility: null,
  });

  const latestSections = useRef(sections);
  latestSections.current = sections;

  useEffect(() => {
    let destroyed = false;

    async function init() {
      const [{ EditorView, basicSetup }, { EditorState }, { css }] =
        await Promise.all([
          import('codemirror'),
          import('@codemirror/state'),
          import('@codemirror/lang-css'),
        ]);

      const { tastyCodeMirrorTheme } = await import('../lib/codemirror-theme');

      if (destroyed) return;

      for (const tab of ALL_TABS) {
        const container = containerRefs.current[tab];
        if (container && !viewRefs.current[tab]) {
          viewRefs.current[tab] = new EditorView({
            state: EditorState.create({
              doc: latestSections.current[tab],
              extensions: [
                basicSetup,
                css(),
                ...tastyCodeMirrorTheme,
                EditorState.readOnly.of(true),
                EditorView.editable.of(false),
              ],
            }),
            parent: container,
          });
        }
      }
    }

    init();

    return () => {
      destroyed = true;
      for (const tab of ALL_TABS) {
        viewRefs.current[tab]?.destroy();
        viewRefs.current[tab] = null;
      }
    };
  }, []);

  useEffect(() => {
    for (const tab of ALL_TABS) {
      const view = viewRefs.current[tab];
      if (!view) continue;
      const current = view.state.doc.toString();
      if (current !== sections[tab]) {
        view.dispatch({
          changes: { from: 0, to: current.length, insert: sections[tab] },
        });
      }
    }
  }, [sections]);

  const switchTab = useCallback((tab: CssTab) => {
    setActiveTab(tab);
  }, []);

  return (
    <>
      <TabBar>
        <MobilePanelSelect
          value={mobilePanel}
          onChange={onMobilePanelChange}
        />
        <PanelLabel>Generated CSS</PanelLabel>
        {ALL_TABS.map((tab) => (
          <Tab
            key={tab}
            mods={{ active: activeTab === tab }}
            onClick={() => switchTab(tab)}
          >
            {TAB_LABELS[tab]}
          </Tab>
        ))}
      </TabBar>
      {ALL_TABS.map((tab) => (
        <EditorWrap
          key={tab}
          ref={(el: HTMLDivElement | null) => {
            containerRefs.current[tab] = el;
          }}
          mods={{ hidden: activeTab !== tab }}
        />
      ))}
    </>
  );
}
