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
    "": "#blue",
    ":hover": "#violet",
    ":active": "#coral",
    "[disabled]": "#amber"
  }
}`;

export const STATE_OPTIONS = [
  {
    id: 'default',
    label: 'Default',
    selector: "''",
    appliedSelector: '.t0.t0:where(:not([disabled]):not(:active):not(:hover))',
    value: '#blue',
    variant: 'blue',
  },
  {
    id: 'hover',
    label: 'Hover',
    selector: ':hover',
    appliedSelector: '.t0.t0:where(:not([disabled]):hover:not(:active))',
    value: '#violet',
    variant: 'violet',
  },
  {
    id: 'active',
    label: 'Active',
    selector: ':active',
    appliedSelector: '.t0.t0:where(:not([disabled]):active)',
    value: '#coral',
    variant: 'coral',
  },
  {
    id: 'disabled',
    label: 'Disabled',
    selector: '[disabled]',
    appliedSelector: '.t0.t0:where([disabled])',
    value: '#amber',
    variant: 'amber',
  },
] as const;
