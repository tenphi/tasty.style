'use client';

import { Fragment, useState } from 'react';
import { IconArrowRight } from '@tabler/icons-react';
import { tasty } from '@tenphi/tasty';
import Badge from '@/app/ui/Badge';
import {
  STATE_IDS,
  STATE_OPTIONS,
  type SelectorSyntaxToken,
  type StateMapSyntaxLine,
  type StateId,
} from './state-resolver-data';

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

const STAGE_SLOTS = ['map', 'selectors', 'switch', 'preview'] as const;
const CONNECTOR_SLOTS = ['first', 'break', 'last'] as const;
const SHRUNK_LAYOUT = '@resolver-shrunk';

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
    position: 'relative',
    display: 'grid',
    gridColumns: {
      '': '1sf 1sf 1sf 1sf',
      [SHRUNK_LAYOUT]: '1sf 6x 1sf',
      '@mobile': '1sf',
    },
    gridAreas: {
      '': 'none',
      [SHRUNK_LAYOUT]:
        '"map first selectors" "break break break" "switch last preview"',
      '@mobile': '"map" "first" "selectors" "break" "switch" "last" "preview"',
    },
    placeItems: 'stretch',
    gap: {
      '': '8x',
      [SHRUNK_LAYOUT]: 0,
    },
    width: '100%',
  },
});

const Stage = tasty({
  modProps: {
    slot: STAGE_SLOTS,
  },
  styles: {
    position: 'relative',
    zIndex: 1,
    gridArea: {
      '': 'auto',
      [SHRUNK_LAYOUT]: 'map',
      [`slot=selectors & ${SHRUNK_LAYOUT}`]: 'selectors',
      [`slot=switch & ${SHRUNK_LAYOUT}`]: 'switch',
      [`slot=preview & ${SHRUNK_LAYOUT}`]: 'preview',
    },
    display: 'flex',
    flow: 'column',
    gap: '1.5x',
    width: 'min 0',
    height: '100%',
    padding: {
      '': '2.5x',
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
      gap: '1x',
    },
    Title: {
      preset: 'h5',
      color: '#text-2',
      margin: 0,
    },
    Helper: {
      preset: 't4',
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

const StateMapCode = tasty({
  as: 'pre',
  styles: {
    display: 'flex',
    flow: 'column',
    height: 'min 23x',
    margin: 0,
    padding: '1.25x 0',
    radius: '1r',
    fill: '#syntax-bg',
    color: '#syntax-text',
    border: '1bw solid #border',
    overflow: 'auto',
    font: 'monospace',
    preset: 't4',
  },
});

const StateMapLine = tasty({
  as: 'span',
  modProps: {
    isActive: Boolean,
  },
  styles: {
    display: 'block',
    height: 'min 2.25x',
    padding: '.25x 1.25x',
    fill: {
      '': '#clear',
      isActive: '#state-surface',
    },
    border: {
      '': '2bw solid #clear left',
      isActive: '2bw solid #state-marker left',
    },
    whiteSpace: 'pre',
    transition: 'theme',
  },
  variants: STATE_VARIANTS,
});

const SelectorList = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '.75x',
    height: 'min 23x',
  },
});

const SelectorRow = tasty({
  modProps: {
    isActive: Boolean,
  },
  styles: {
    display: 'flex',
    flow: 'row',
    placeItems: 'center',
    gap: '1x',
    height: 'min 4.75x',
    padding: '1x',
    radius: '1r',
    fill: {
      '': '#syntax-bg',
      isActive: '#state-surface',
    },
    border: {
      '': '1bw solid #border',
      isActive: '1bw solid #state-border',
    },
    shadow: {
      '': 'none',
      isActive: '0 .5x 2x #state-shadow',
    },
    translate: {
      '': '0 0',
      isActive: '0 -1px',
    },
    transition: 'theme, shadow, translate',
    Marker: {
      width: '1x',
      height: '1x',
      radius: 'round',
      fill: '#state-marker',
      opacity: {
        '': 0,
        isActive: 1,
      },
      flexShrink: 0,
      transition: 'theme, opacity',
    },
    Value: {
      preset: 't4 / tight',
      font: 'monospace',
      color: '#syntax-text',
      width: 'min 0',
      overflowWrap: 'anywhere',
      whiteSpace: 'normal',
    },
  },
  elements: {
    Marker: 'span',
    Value: 'code',
  },
  variants: STATE_VARIANTS,
});

const StateSwitcher = tasty({
  styles: {
    display: 'grid',
    gridColumns: {
      '': '1sf',
      [SHRUNK_LAYOUT]: '1sf 1sf',
    },
    gap: '1x',
    margin: 'auto 0',
  },
});

const StateSwitch = tasty({
  as: 'button',
  modProps: {
    isSelected: Boolean,
  },
  styles: {
    appearance: 'none',
    display: 'grid',
    placeItems: 'center',
    width: 'min 0',
    height: 'min 5x',
    padding: '1x',
    radius: '1r',
    fill: {
      '': '#surface',
      ':hover': '#surface-3',
      isSelected: '#state-surface',
    },
    color: {
      '': '#text-soft-2',
      ':hover': '#text-2',
      isSelected: '#state-accent',
    },
    border: {
      '': '1bw solid #border',
      isSelected: '1bw solid #state-border',
    },
    outline: {
      '': 'none',
      ':focus-visible': '2bw solid #state-accent',
    },
    shadow: {
      '': 'none',
      isSelected: '0 .5x 2x #state-shadow',
    },
    preset: 't4m',
    cursor: 'pointer',
    transition: 'theme, shadow',
  },
  variants: STATE_VARIANTS,
});

const ResolverConnector = tasty({
  modProps: {
    slot: CONNECTOR_SLOTS,
  },
  styles: {
    gridArea: {
      '': 'auto',
      [SHRUNK_LAYOUT]: 'first',
      [`slot=break & ${SHRUNK_LAYOUT}`]: 'break',
      [`slot=last & ${SHRUNK_LAYOUT}`]: 'last',
    },
    position: {
      '': 'absolute',
      [SHRUNK_LAYOUT]: 'relative',
    },
    inset: {
      '': '50% top, (25% - 2x) left',
      'slot=break': '50% top, 50% left',
      'slot=last': '50% top, (75% + 2x) left',
      [SHRUNK_LAYOUT]: 'auto',
    },
    translate: {
      '': '-50% -50%',
      [SHRUNK_LAYOUT]: '0 0',
    },
    display: 'grid',
    placeItems: 'center',
    width: {
      '': '8x',
      [SHRUNK_LAYOUT]: 'auto',
    },
    height: {
      '': 'min 0',
      [`slot=break & ${SHRUNK_LAYOUT}`]: 'min 6x',
      '@mobile': 'min 6x',
    },
    color: '#text-soft-2',
    Wire: {
      position: 'absolute',
      width: {
        '': '100%',
        [`slot=break & ${SHRUNK_LAYOUT}`]: '10.5x',
        '@mobile': '1bw',
      },
      height: {
        '': '1bw',
        [`slot=break & ${SHRUNK_LAYOUT}`]: '1bw',
        '@mobile': '100%',
      },
      fill: '#border',
      transform: {
        '': 'rotate(0deg)',
        [`slot=break & ${SHRUNK_LAYOUT}`]: 'rotate(-45deg)',
        '@mobile': 'rotate(0deg)',
      },
    },
    Arrow: {
      zIndex: 1,
      display: 'flex',
      padding: '.5x',
      radius: 'round',
      fill: '#surface',
      border: '1bw solid #border',
      transform: {
        '': 'rotate(0deg)',
        [`slot=break & ${SHRUNK_LAYOUT}`]: 'rotate(135deg)',
        '@mobile': 'rotate(90deg)',
      },
    },
  },
  elements: {
    Wire: 'span',
    Arrow: 'span',
  },
});

const PreviewSurface = tasty({
  styles: {
    display: 'grid',
    placeItems: 'center',
    height: 'min 16x',
    margin: 'auto 0',
    padding: '2x',
    radius: '1r',
    fill: '#surface-3',
    border: '1bw solid #border',
  },
});

const ResolvedButton = tasty({
  as: 'button',
  modProps: {
    phase: STATE_IDS,
  },
  styles: {
    appearance: 'none',
    display: 'inline-flex',
    placeItems: 'center',
    placeContent: 'center',
    width: 'min 18x',
    padding: '1.5x 3x',
    preset: 't2m',
    radius: 'round',
    border: 0,
    outline: {
      '': 'none',
      ':focus-visible': '2ow #accent-text / 2px',
    },
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
    cursor: {
      '': 'pointer',
      'phase=disabled': 'not-allowed',
    },
    transition: 'theme, opacity, translate, shadow',
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

function Connector({ slot }: { slot: (typeof CONNECTOR_SLOTS)[number] }) {
  return (
    <ResolverConnector slot={slot} aria-hidden="true">
      <ResolverConnector.Wire />
      <ResolverConnector.Arrow>
        <IconArrowRight size={16} />
      </ResolverConnector.Arrow>
    </ResolverConnector>
  );
}

export default function StateResolver({
  selectorTokens,
  stateMapLines,
}: {
  selectorTokens: Record<StateId, SelectorSyntaxToken[]>;
  stateMapLines: StateMapSyntaxLine[];
}) {
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
            Declare the priority in a state map.
            <br />
            Tasty&nbsp;turns&nbsp;that decision into selectors that cannot
            compete.
          </ResolverHeader.Subtitle>
        </ResolverHeader>

        <ResolverCanvas>
          <Stage slot="map">
            <Stage.Header>
              <Stage.Title>1. State map</Stage.Title>
              <Badge>JSON</Badge>
            </Stage.Header>
            <Stage.Helper>The fill style, exactly as declared.</Stage.Helper>
            <StateMapCode>
              <code>
                {stateMapLines.map((line, lineIndex) => (
                  <StateMapLine
                    key={lineIndex}
                    variant={selectedOption.variant}
                    isActive={line.stateId === selected}
                  >
                    {line.tokens.map((token, tokenIndex) => (
                      <span
                        key={tokenIndex}
                        className={token.className ?? undefined}
                      >
                        {token.content}
                      </span>
                    ))}
                  </StateMapLine>
                ))}
              </code>
            </StateMapCode>
          </Stage>

          <Connector slot="first" />

          <Stage slot="selectors" aria-live="polite">
            <Stage.Header>
              <Stage.Title>2. Generated</Stage.Title>
              <Badge>CSS</Badge>
            </Stage.Header>
            <Stage.Helper>Mutually exclusive selectors.</Stage.Helper>
            <SelectorList>
              {STATE_OPTIONS.map((option) => (
                <SelectorRow
                  key={option.id}
                  variant={option.variant}
                  isActive={selected === option.id}
                  aria-current={selected === option.id ? 'true' : undefined}
                >
                  <SelectorRow.Marker />
                  <SelectorRow.Value>
                    {selectorTokens[option.id].map((token, tokenIndex) => (
                      <Fragment key={tokenIndex}>
                        {token.breakBefore ? <wbr /> : null}
                        <span className={token.className ?? undefined}>
                          {token.content}
                        </span>
                      </Fragment>
                    ))}
                  </SelectorRow.Value>
                </SelectorRow>
              ))}
            </SelectorList>
          </Stage>

          <Connector slot="break" />

          <Stage slot="switch">
            <Stage.Header>
              <Stage.Title>3. Switch state</Stage.Title>
              <Badge>Test</Badge>
            </Stage.Header>
            <Stage.Helper>Choose the state to simulate.</Stage.Helper>
            <StateSwitcher role="group" aria-label="Preview state">
              {STATE_OPTIONS.map((option) => (
                <StateSwitch
                  key={option.id}
                  type="button"
                  variant={option.variant}
                  isSelected={selected === option.id}
                  aria-pressed={selected === option.id}
                  onClick={() => setSelected(option.id)}
                >
                  {option.label}
                </StateSwitch>
              ))}
            </StateSwitcher>
          </Stage>

          <Connector slot="last" />

          <Stage slot="preview" aria-live="polite">
            <Stage.Header>
              <Stage.Title>4. Preview</Stage.Title>
              <Badge>Live</Badge>
            </Stage.Header>
            <Stage.Helper>The winning branch, applied.</Stage.Helper>
            <PreviewSurface>
              <ResolvedButton
                type="button"
                phase={selected}
                disabled={selected === 'disabled'}
                aria-label={`Button preview in ${selectedOption.label.toLowerCase()} state`}
              >
                Button
              </ResolvedButton>
            </PreviewSurface>
          </Stage>
        </ResolverCanvas>

        <ResolverNote>
          Pick a state. Its source line, generated selector, and preview stay in
          sync.
        </ResolverNote>
      </ResolverPanel>
    </ResolverSection>
  );
}
