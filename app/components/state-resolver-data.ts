export const STATE_IDS = ['default', 'hover', 'active', 'disabled'] as const;

export type StateId = (typeof STATE_IDS)[number];

export interface SelectorSyntaxToken {
  content: string;
  className: string | null;
  breakBefore: boolean;
}

export interface StateMapSyntaxLine {
  stateId: StateId | null;
  tokens: Omit<SelectorSyntaxToken, 'breakBefore'>[];
}

export const STATE_MAP_CODE = `{
  "fill": {
    "": "#blue-accent-surface",
    ":hover": "#violet-accent-surface",
    ":active": "#coral-accent-surface",
    "[disabled]": "#amber-accent-surface"
  }
}`;

export const STATE_OPTIONS = [
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
