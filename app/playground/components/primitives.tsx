'use client';

import type { ChangeEvent } from 'react';
import { tasty } from '@tenphi/tasty';
import { IconChevronDown } from '@tabler/icons-react';
import { SelectElement } from '../../ui/Select';

export const PANEL_HEADER_HEIGHT = '34px';

export const Panel = tasty({
  styles: {
    display: {
      '': 'flex',
      'mobileHidden & @mobile': 'none',
    },
    flow: 'column',
    overflow: 'hidden',
    position: 'relative',
    border: '1bw #primary-border right bottom',
    fill: '#primary-surface',
    flex: {
      '': 'none',
      '@mobile': '1 1 0',
    },
    minHeight: {
      '': 'auto',
      '@mobile': 0,
    },
  },
});

export const PanelHeaderBar = tasty({
  styles: {
    display: 'flex',
    flow: 'row',
    padding: {
      '': '0 2x',
      '@mobile': '0',
    },
    height: PANEL_HEADER_HEIGHT,
    fill: '#primary-surface-2',
    color: '#primary-text-soft',
    preset: 'label',
    border: '1bw #primary-border bottom',
    flexShrink: 0,
    gap: '1x',
  },
});

export const HeaderLabel = tasty({
  as: 'span',
  styles: {
    display: {
      '': 'inline-flex',
      '@mobile': 'none',
    },
    placeItems: 'center',
    flex: '1 1 auto',
  },
});

export const TabBar = tasty({
  styles: {
    display: 'flex',
    flow: 'row',
    fill: '#primary-surface-2',
    border: '1bw #primary-border bottom',
    flexShrink: 0,
    height: PANEL_HEADER_HEIGHT,
  },
});

export const Tab = tasty({
  as: 'button',
  styles: {
    display: 'flex',
    placeItems: 'center',
    padding: '0 2x',
    fill: {
      '': 'transparent',
      active: '#primary-surface-3',
    },
    color: {
      '': '#primary-text-soft',
      active: '#primary-text',
    },
    border: 'none',
    cursor: 'pointer',
    preset: 'label',
    fontWeight: {
      '': 500,
      active: 600,
    },
    font: 'monospace',
    borderBottom: {
      '': '2px solid transparent',
      active: '2px solid #primary-accent-surface',
    },
    transition: 'theme',
  },
});

export const EditorWrap = tasty({
  styles: {
    display: {
      '': 'block',
      hidden: 'none',
    },
    flex: '1 1 0',
    minHeight: 0,
    overflow: 'hidden',
  },
});

const MobilePanelSelectWrap = tasty({
  styles: {
    position: 'relative',
    display: {
      '': 'none',
      '@mobile': 'inline-flex',
    },
    placeItems: 'center',
    flexShrink: 0,
    border: '1bw #primary-border right',
  },
});

const MobilePanelSelectEl = tasty(SelectElement, {
  styles: {
    padding: '0 3x 0 1.5x',
    preset: 'label',
    radius: 0,
    border: 'none',
    fill: {
      '': 'transparent',
      ':hover': '#primary-surface-3',
    },
    color: '#primary-text-soft',
  },
});

const SelectChevron = tasty({
  as: 'span',
  styles: {
    position: 'absolute',
    right: '1x',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'inline-flex',
    placeItems: 'center',
    color: '#primary-text-soft',
    pointerEvents: 'none',
  },
});

const MOBILE_PANEL_OPTIONS = [
  { value: 'preview', label: 'Preview' },
  { value: 'css', label: 'Generated CSS' },
  { value: 'html', label: 'HTML Output' },
];

interface MobilePanelSelectProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export function MobilePanelSelect({ value, onChange }: MobilePanelSelectProps) {
  return (
    <MobilePanelSelectWrap>
      <MobilePanelSelectEl value={value} onChange={onChange}>
        {MOBILE_PANEL_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </MobilePanelSelectEl>
      <SelectChevron>
        <IconChevronDown size={12} />
      </SelectChevron>
    </MobilePanelSelectWrap>
  );
}

export const Toolbar = tasty({
  styles: {
    display: 'flex',
    flow: 'row',
    placeItems: 'center',
    fill: '#primary-surface-2',
    border: '1bw #primary-border bottom',
    flexShrink: 0,
    gap: '0.5x',
    padding: '0.5x 1x',
  },
});

export const ToolbarSpacer = tasty({
  styles: {
    flex: '1 1 auto',
  },
});

export const ToolbarButton = tasty({
  as: 'button',
  styles: {
    display: 'inline-flex',
    placeItems: 'center',
    placeContent: 'center',
    gap: '0.5x',
    padding: '0.5x 1.5x',
    fill: {
      '': 'transparent',
      ':hover': '#primary-surface-3',
    },
    color: {
      '': '#primary-text-soft',
      ':hover': '#primary-text',
    },
    border: 'none',
    cursor: 'pointer',
    radius: '0.5r',
    transition: 'theme',
    preset: 'label',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
});

const ExampleSelectWrap = tasty({
  styles: {
    position: 'relative',
    display: 'inline-flex',
    placeItems: 'center',
    flexShrink: 0,
  },
});

const ExampleSelectEl = tasty(SelectElement, {
  styles: {
    padding: '0.5x 3x 0.5x 1.5x',
    preset: 'label',
    radius: '0.5r',
    border: 'none',
    fill: {
      '': 'transparent',
      ':hover': '#primary-surface-3',
    },
    color: '#primary-text',
    fontWeight: 600,
    cursor: 'pointer',
  },
});

interface ExampleSelectProps {
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export function ExampleSelect({
  value,
  options,
  onChange,
}: ExampleSelectProps) {
  return (
    <ExampleSelectWrap>
      <ExampleSelectEl value={value} onChange={onChange}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </ExampleSelectEl>
      <SelectChevron>
        <IconChevronDown size={12} />
      </SelectChevron>
    </ExampleSelectWrap>
  );
}

export const ModifiedBadge = tasty({
  as: 'span',
  styles: {
    display: 'inline-flex',
    placeItems: 'center',
    preset: 'tag',
    color: '#primary-accent-text',
    opacity: {
      '': 0,
      visible: 1,
    },
    transition: 'opacity 0.2s',
  },
});

export const CopiedToast = tasty({
  as: 'span',
  styles: {
    display: 'inline-flex',
    placeItems: 'center',
    preset: 'label',
    color: '#primary-accent-text',
    opacity: {
      '': 0,
      visible: 1,
    },
    transition: 'opacity 0.3s',
    pointerEvents: 'none',
  },
});

export const PreviewFrame = tasty({
  as: 'iframe',
  styles: {
    flex: '1 1 0',
    width: '100%',
    border: 'none',
    fill: '#white',
  },
});

export const OutputSection = tasty({
  styles: {
    display: {
      '': 'contents',
      '@mobile': 'flex',
    },
    flow: 'column',
    overflow: 'hidden',
    minHeight: 0,
  },
});
