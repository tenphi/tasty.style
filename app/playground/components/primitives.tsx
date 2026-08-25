'use client';

import type { ChangeEvent } from 'react';
import { tasty } from '@tenphi/tasty';
import { IconChevronDown } from '@tabler/icons-react';
import { SelectElement } from '../../ui/Select';

export const PANEL_HEADER_HEIGHT = '34px';

export const Panel = tasty({
  styles: {
    display: 'flex',
    hide: {
      '': false,
      'mobileHidden & @mobile': true,
    },
    flow: 'column',
    overflow: 'hidden',
    position: 'relative',
    border: '1bw #border right bottom',
    fill: '#surface',
    flexGrow: {
      '': 0,
      '@mobile': 1,
    },
    flexShrink: {
      '': 0,
      '@mobile': 1,
    },
    flexBasis: {
      '': 'auto',
      '@mobile': 0,
    },
    height: {
      '': 'min auto',
      '@mobile': 'min 0',
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
    fill: '#surface-2',
    color: '#text-soft',
    preset: 'label',
    border: '1bw #border bottom',
    flexShrink: 0,
    gap: '1x',
  },
});

export const HeaderLabel = tasty({
  as: 'span',
  styles: {
    display: 'inline-flex',
    hide: {
      '': false,
      '@mobile': true,
    },
    placeItems: 'center',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
  },
});

export const TabBar = tasty({
  styles: {
    display: 'flex',
    flow: 'row',
    fill: '#surface-2',
    border: '1bw #border bottom',
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
      '': '#clear',
      active: '#surface-3',
    },
    color: {
      '': '#text-soft',
      active: '#text',
    },
    cursor: 'pointer',
    preset: {
      '': 'label-soft',
      active: 'label-soft / strong',
    },
    font: 'monospace',
    // sides other than `bottom` resolve to 0 — no separate `border: 'none'`
    border: {
      '': '2px solid #clear bottom',
      active: '2px solid #accent-surface bottom',
    },
    transition: 'theme',
  },
});

export const EditorWrap = tasty({
  styles: {
    display: 'block',
    hide: {
      '': false,
      hidden: true,
    },
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 'min 0',
    overflow: 'hidden',
  },
});

const MobilePanelSelectWrap = tasty({
  styles: {
    position: 'relative',
    display: 'inline-flex',
    hide: {
      '': true,
      '@mobile': false,
    },
    placeItems: 'center',
    flexShrink: 0,
    border: '1bw #border right',
  },
});

const MobilePanelSelectEl = tasty(SelectElement, {
  styles: {
    padding: '0 3x 0 1.5x',
    preset: 'label',
    radius: 0,
    border: 'none',
    fill: {
      '': '#clear',
      ':hover': '#surface-3',
    },
    color: '#text-soft',
  },
});

const SelectChevron = tasty({
  as: 'span',
  styles: {
    position: 'absolute',
    inset: '1x right, 50% top',
    transform: 'translateY(-50%)',
    display: 'inline-flex',
    placeItems: 'center',
    color: '#text-soft',
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
      <MobilePanelSelectEl
        value={value}
        onChange={onChange}
        aria-label="Select playground panel"
      >
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
    fill: '#surface-2',
    border: '1bw #border bottom',
    flexShrink: 0,
    gap: '0.5x',
    padding: '0.5x 1x',
  },
});

export const ToolbarSpacer = tasty({
  styles: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
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
      '': '#clear',
      ':hover': '#surface-3',
    },
    color: {
      '': '#text-soft',
      ':hover': '#text',
    },
    border: 'none',
    cursor: 'pointer',
    radius: '$button-radius',
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
      '': '#clear',
      ':hover': '#surface-3',
    },
    color: '#text',
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
      <ExampleSelectEl
        value={value}
        onChange={onChange}
        aria-label="Select playground example"
      >
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
    preset: 'label',
    color: '#accent-text',
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
    color: '#accent-text',
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
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
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
    height: 'min 0',
  },
});
