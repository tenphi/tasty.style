import { tasty } from '@tenphi/tasty';
import { useState } from 'react';
import {
  IconBold,
  IconItalic,
  IconUnderline,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconLink,
  IconPhoto,
} from './icons';

const Toolbar = tasty({
  modProps: { isCompact: Boolean },
  styles: {
    display: 'inline-flex',
    flow: 'row',
    align: 'center',
    gap: { '': '0.5x', isCompact: 0 },
    padding: '0.5x',
    radius: '1.5r',
    fill: '#surface',
    border: true,

    Separator: {
      width: '1bw',
      height: '3x',
      fill: '#border',
      margin: '0 0.5x',
    },
  },
  elements: { Separator: 'div' },
});

const ToolButton = tasty({
  as: 'button',
  modProps: { isActive: Boolean },
  styles: {
    display: 'inline-grid',
    placeItems: 'center',
    width: '4x',
    height: '4x',
    radius: {
      '': '1r',
      ':has(+ ToolButton)': '1r left',
      ':is(ToolButton +)': '1r right',
    },
    cursor: 'pointer',
    transition: 'theme',
    border: 'none',
    fill: {
      '': 'transparent',
      ':hover': '#accent-text.06',
      isActive: '#accent-text.10',
    },
    color: {
      '': '#text-soft',
      ':hover': '#accent-text',
      isActive: '#accent-text',
    },
    outline: { '': 'none', '@own(:focus-visible)': '2ow #accent-text / 1px' },
  },
});

const Layout = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '3x',
    align: 'center',
    padding: '4x',
  },
});

const Row = tasty({
  styles: { display: 'flex', flow: 'row wrap', gap: '1x', align: 'center' },
});

const Toggle = tasty({
  as: 'button',
  modProps: { isActive: Boolean },
  styles: {
    display: 'inline-grid',
    placeItems: 'center',
    padding: '1x 2x',
    radius: 'round',
    cursor: 'pointer',
    preset: 't3',
    transition: 'theme',
    border: true,
    fill: { '': '#surface', isActive: '#accent-text.10' },
    color: { '': '#text-soft', isActive: '#accent-text' },
  },
});

export const App = () => {
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState<Set<string>>(new Set(['bold']));

  const toggle = (name: string) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <Layout>
      <Toggle isActive={compact} onClick={() => setCompact((c) => !c)}>
        Compact {compact ? '✓' : ''}
      </Toggle>
      <Toolbar isCompact={compact}>
        <ToolButton isActive={active.has('bold')} onClick={() => toggle('bold')}>
          <IconBold size={18} />
        </ToolButton>
        <ToolButton isActive={active.has('italic')} onClick={() => toggle('italic')}>
          <IconItalic size={18} />
        </ToolButton>
        <ToolButton isActive={active.has('underline')} onClick={() => toggle('underline')}>
          <IconUnderline size={18} />
        </ToolButton>
        <Toolbar.Separator />
        <ToolButton isActive={active.has('left')} onClick={() => toggle('left')}>
          <IconAlignLeft size={18} />
        </ToolButton>
        <ToolButton isActive={active.has('center')} onClick={() => toggle('center')}>
          <IconAlignCenter size={18} />
        </ToolButton>
        <ToolButton isActive={active.has('right')} onClick={() => toggle('right')}>
          <IconAlignRight size={18} />
        </ToolButton>
        <Toolbar.Separator />
        <ToolButton onClick={() => {}}>
          <IconLink size={18} />
        </ToolButton>
        <ToolButton onClick={() => {}}>
          <IconPhoto size={18} />
        </ToolButton>
      </Toolbar>
    </Layout>
  );
};
