'use client';

import { useState } from 'react';
import { IconArrowRight } from '@tabler/icons-react';
import { tasty } from '@tenphi/tasty';
import Badge from '@/app/ui/Badge';

const STATE_IDS = ['default', 'hover', 'active', 'disabled'] as const;

type StateId = (typeof STATE_IDS)[number];

const STATE_OPTIONS = [
  {
    id: 'default',
    label: 'Default',
    selector: "''",
    appliedSelector: '.t0.t0:not(:hover):not(:active):not([disabled])',
    value: '#blue-accent-surface',
    variant: 'blue',
  },
  {
    id: 'hover',
    label: 'Hover',
    selector: ':hover',
    appliedSelector: '.t0.t0:hover:not(:active):not([disabled])',
    value: '#violet-accent-surface',
    variant: 'violet',
  },
  {
    id: 'active',
    label: 'Active',
    selector: ':active',
    appliedSelector: '.t0.t0:active:not([disabled])',
    value: '#coral-accent-surface',
    variant: 'coral',
  },
  {
    id: 'disabled',
    label: 'Disabled',
    selector: '[disabled]',
    appliedSelector: '.t0.t0[disabled]',
    value: '#amber-accent-surface',
    variant: 'amber',
  },
] as const;

const STATE_VARIANTS = {
  blue: {
    '#state-surface': '#blue-surface-3',
    '#state-border': '#blue-border',
    '#state-accent': '#blue-accent-text-3',
    '#state-marker': '#blue-accent-surface',
    '#state-shadow': '#blue-shadow-sm',
  },
  violet: {
    '#state-surface': '#violet-surface-3',
    '#state-border': '#violet-border',
    '#state-accent': '#violet-accent-text-3',
    '#state-marker': '#violet-accent-surface',
    '#state-shadow': '#violet-shadow-sm',
  },
  coral: {
    '#state-surface': '#coral-surface-3',
    '#state-border': '#coral-border',
    '#state-accent': '#coral-accent-text-3',
    '#state-marker': '#coral-accent-surface',
    '#state-shadow': '#coral-shadow-sm',
  },
  amber: {
    '#state-surface': '#amber-surface-3',
    '#state-border': '#amber-border',
    '#state-accent': '#amber-accent-text-3',
    '#state-marker': '#amber-accent-surface',
    '#state-shadow': '#amber-shadow-sm',
  },
};

const ResolverSection = tasty({
  as: 'section',
  styles: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    padding: {
      '': '0 4x 10x',
      '@mobile': '0 2x 6x',
    },
    margin: '-5x 0 0',
  },
});

const ResolverPanel = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    align: 'center',
    gap: '4x',
    width: 'max ($content-width, 1200px)',
    margin: 'auto left right',
    padding: {
      '': '5x',
      '@mobile': '3x 2x',
    },
    radius: '2r',
    fill: '#surface',
    image:
      'radial-gradient(circle at 5% 0%, #violet-surface-3.55, #clear 34%), radial-gradient(circle at 95% 100%, #coral-surface-3.45, #clear 34%)',
    border: '1bw solid #border',
    shadow: '0 3x 10x #shadow-md',
    overflow: 'hidden',
  },
});

const ResolverHeader = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    align: 'center',
    gap: '1.5x',
    Title: {
      preset: {
        '': 'h2',
        '@mobile': 'h3',
      },
      color: '#text',
      textAlign: 'center',
      textWrap: 'balance',
      margin: 0,
    },
    Subtitle: {
      preset: 't1',
      color: '#text-soft',
      textAlign: 'center',
      textWrap: 'balance',
      width: 'max 660px',
      margin: 0,
    },
  },
  elements: {
    Title: 'h2',
    Subtitle: 'p',
  },
});

const ResolverCanvas = tasty({
  styles: {
    display: 'grid',
    gridColumns: {
      '': '1sf 18x 1sf',
      '@tablet': '1sf 14x 1sf',
      '@mobile': '1sf',
    },
    placeItems: 'stretch',
    gap: {
      '': '3x',
      '@mobile': '2x',
    },
    width: '100%',
  },
});

const Stage = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '2x',
    height: 'min 100%',
    padding: {
      '': '3x',
      '@mobile': '2x',
    },
    radius: '1cr',
    fill: '#surface-2',
    border: '1bw solid #border',
    Header: {
      display: 'flex',
      flow: 'row',
      placeContent: 'space-between',
      placeItems: 'center',
      gap: '2x',
    },
    Title: {
      preset: 'h5',
      color: '#text-2',
      margin: 0,
    },
    Helper: {
      preset: 't3',
      color: '#text-soft-2',
      margin: 0,
    },
  },
  elements: {
    Header: 'div',
    Title: 'h3',
    Helper: 'p',
  },
});

const StateList = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '1x',
  },
});

const StateOption = tasty({
  as: 'button',
  modProps: {
    isSelected: Boolean,
  },
  styles: {
    appearance: 'none',
    display: 'flex',
    flow: 'row',
    placeItems: 'center',
    gap: '1.5x',
    width: '100%',
    padding: '1.5x 2x',
    radius: '1r',
    fill: {
      '': '#surface',
      isSelected: '#state-surface',
    },
    color: {
      '': '#text-soft-2',
      isSelected: '#state-accent',
    },
    border: {
      '': '1bw solid #border',
      isSelected: '1bw solid #state-border',
    },
    opacity: {
      '': 0.7,
      isSelected: 1,
    },
    translate: {
      '': '0 0',
      isSelected: '0 -1px',
    },
    shadow: {
      '': 'none',
      isSelected: '0 .5x 2x #state-shadow',
    },
    outline: {
      '': 'none',
      ':focus-visible': '2bw solid #state-accent',
    },
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'theme, opacity, translate, shadow',
    Marker: {
      width: '1.25x',
      height: '1.25x',
      radius: 'round',
      fill: {
        '': '#disabled',
        isSelected: '#state-marker',
      },
      flexShrink: 0,
    },
    Label: {
      preset: 't2m',
      color: 'inherit',
    },
    Selector: {
      preset: 'code',
      color: 'inherit',
      margin: 'auto left',
      opacity: 0.72,
    },
  },
  elements: {
    Marker: 'span',
    Label: 'span',
    Selector: 'code',
  },
  variants: STATE_VARIANTS,
});

const ResolverFlow = tasty({
  styles: {
    display: 'flex',
    flow: {
      '': 'row',
      '@mobile': 'column',
    },
    placeItems: 'center',
    placeContent: 'center',
    gap: '1x',
    color: '#text-soft-2',
    padding: {
      '': 0,
      '@mobile': '1x 0',
    },
    Arrow: {
      display: 'flex',
      transform: {
        '': 'rotate(0deg)',
        '@mobile': 'rotate(90deg)',
      },
    },
  },
  elements: {
    Arrow: 'span',
  },
});

const ResolverMark = tasty({
  styles: {
    display: 'grid',
    placeItems: 'center',
    width: '9x',
    height: '9x',
    radius: 'round',
    fill: '#violet-surface-3',
    color: '#violet-accent-text-3',
    border: '1bw solid #violet-border',
    shadow: '0 1x 3x #violet-shadow-md',
    Glyph: {
      preset: 'h4',
      color: 'inherit',
    },
  },
  elements: {
    Glyph: 'span',
  },
});

const ResolverCore = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    placeItems: 'center',
    gap: '1x',
    Caption: {
      preset: 'tag',
      color: '#text-soft-2',
      textAlign: 'center',
      whiteSpace: 'nowrap',
    },
  },
  elements: {
    Caption: 'span',
  },
});

const ResultPreview = tasty({
  styles: {
    display: 'grid',
    placeItems: 'center',
    height: 'min 16x',
    padding: '3x',
    radius: '1r',
    fill: '#surface-3',
    border: '1bw solid #border',
  },
});

const ResolvedButton = tasty({
  modProps: {
    phase: STATE_IDS,
  },
  styles: {
    display: 'inline-flex',
    placeItems: 'center',
    placeContent: 'center',
    width: 'min 18x',
    padding: '1.5x 3x',
    preset: 't2m',
    radius: 'round',
    fill: {
      '': '#blue-accent-surface',
      'phase=hover': '#violet-accent-surface',
      'phase=active': '#coral-accent-surface',
      'phase=disabled': '#amber-accent-surface',
    },
    color: {
      '': '#blue-accent-surface-text',
      'phase=hover': '#violet-accent-surface-text',
      'phase=active': '#coral-accent-surface-text',
      'phase=disabled': '#amber-accent-surface-text',
    },
    opacity: {
      '': 1,
      'phase=disabled': 0.72,
    },
    translate: {
      '': '0 0',
      'phase=active': '0 1px',
    },
    shadow: {
      '': '0 1x 3x #blue-shadow-md',
      'phase=hover': '0 1x 3x #violet-shadow-md',
      'phase=active': 'inset 0 1x 2x #coral-shadow-lg',
      'phase=disabled': 'none',
    },
    transition: 'theme, opacity, translate, shadow',
  },
});

const ResultDetails = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '1x',
    padding: '2x',
    radius: '1r',
    fill: '#surface',
    border: '1bw solid #border',
    Row: {
      display: 'flex',
      flow: 'row',
      placeContent: 'space-between',
      placeItems: 'center',
      gap: '2x',
    },
    Label: {
      preset: 't3',
      color: '#text-soft-2',
    },
    Value: {
      preset: 'code',
      color: '#text-2',
      textAlign: 'right',
    },
    SelectorBlock: {
      display: 'flex',
      flow: 'column',
      gap: '.5x',
      margin: '1x 0 0',
      padding: '1.5x',
      radius: '1r',
      fill: '#surface-3',
    },
    SelectorLabel: {
      preset: 't3',
      color: '#text-soft-3',
    },
    SelectorValue: {
      preset: 'code',
      color: '#text-3',
      overflowWrap: 'anywhere',
    },
  },
  elements: {
    Row: 'div',
    Label: 'span',
    Value: 'code',
    SelectorBlock: 'div',
    SelectorLabel: 'span',
    SelectorValue: 'code',
  },
});

const ResolverNote = tasty({
  as: 'p',
  styles: {
    preset: 't3',
    color: '#text-soft',
    textAlign: 'center',
    margin: 0,
  },
});

export default function StateResolver() {
  const [selected, setSelected] = useState<StateId>('disabled');
  const selectedOption =
    STATE_OPTIONS.find((option) => option.id === selected) ?? STATE_OPTIONS[0];

  return (
    <ResolverSection id="how-it-works" aria-labelledby="resolver-title">
      <ResolverPanel>
        <ResolverHeader>
          <Badge>Interactive state resolver</Badge>
          <ResolverHeader.Title id="resolver-title">
            When states overlap, only one should win.
          </ResolverHeader.Title>
          <ResolverHeader.Subtitle>
            Declare the priority in a state map. Tasty turns that decision into
            selectors that cannot compete.
          </ResolverHeader.Subtitle>
        </ResolverHeader>

        <ResolverCanvas>
          <Stage>
            <Stage.Header>
              <Stage.Title>State map priority</Stage.Title>
              <Badge>Input</Badge>
            </Stage.Header>
            <Stage.Helper>Priority increases from top to bottom.</Stage.Helper>
            <StateList>
              {STATE_OPTIONS.map((option) => (
                <StateOption
                  key={option.id}
                  type="button"
                  variant={option.variant}
                  isSelected={selected === option.id}
                  aria-pressed={selected === option.id}
                  onClick={() => setSelected(option.id)}
                >
                  <StateOption.Marker />
                  <StateOption.Label>{option.label}</StateOption.Label>
                  <StateOption.Selector>{option.selector}</StateOption.Selector>
                </StateOption>
              ))}
            </StateList>
          </Stage>

          <ResolverFlow>
            <ResolverCore>
              <ResolverMark>
                <ResolverMark.Glyph>{'{t}'}</ResolverMark.Glyph>
              </ResolverMark>
              <ResolverCore.Caption>Compiles priority</ResolverCore.Caption>
            </ResolverCore>
            <ResolverFlow.Arrow>
              <IconArrowRight size={32} aria-hidden="true" />
            </ResolverFlow.Arrow>
          </ResolverFlow>

          <Stage aria-live="polite">
            <Stage.Header>
              <Stage.Title>Resolved output</Stage.Title>
              <Badge>One winner</Badge>
            </Stage.Header>
            <ResultPreview>
              <ResolvedButton phase={selected}>Button</ResolvedButton>
            </ResultPreview>
            <ResultDetails>
              <ResultDetails.Row>
                <ResultDetails.Label>Winning state</ResultDetails.Label>
                <ResultDetails.Value>
                  {selectedOption.selector}
                </ResultDetails.Value>
              </ResultDetails.Row>
              <ResultDetails.Row>
                <ResultDetails.Label>Resolved value</ResultDetails.Label>
                <ResultDetails.Value>
                  {selectedOption.value}
                </ResultDetails.Value>
              </ResultDetails.Row>
              <ResultDetails.Row>
                <ResultDetails.Label>Matching rules</ResultDetails.Label>
                <ResultDetails.Value>1 of 4</ResultDetails.Value>
              </ResultDetails.Row>
              <ResultDetails.SelectorBlock>
                <ResultDetails.SelectorLabel>
                  Applied selector
                </ResultDetails.SelectorLabel>
                <ResultDetails.SelectorValue>
                  {selectedOption.appliedSelector}
                </ResultDetails.SelectorValue>
              </ResultDetails.SelectorBlock>
            </ResultDetails>
          </Stage>
        </ResolverCanvas>

        <ResolverNote>
          Try each branch. Even when conditions overlap, one generated selector
          matches per property. The demo itself uses Tasty state maps and Glaze
          tokens.
        </ResolverNote>
      </ResolverPanel>
    </ResolverSection>
  );
}
