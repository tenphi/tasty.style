import type { ThemeRegistration } from 'shiki';

const comment = 'var(--syntax-comment-color)';
const punctuation = 'var(--syntax-punctuation-color)';
const keyword = 'var(--syntax-keyword-color)';
const string = 'var(--syntax-string-color)';
const token = 'var(--syntax-token-color)';
const property = 'var(--syntax-property-color)';
const number = 'var(--syntax-number-color)';
const func = 'var(--syntax-function-color)';
const value = 'var(--syntax-value-color)';
const operator = 'var(--syntax-operator-color)';
const fg = 'var(--syntax-text-color)';
const bg = 'var(--syntax-bg-color)';

export const tastyCodeTheme: ThemeRegistration = {
  name: 'tasty-code',
  type: 'light',
  colors: {
    'editor.background': bg,
    'editor.foreground': fg,
  },
  tokenColors: [
    // -- Comments --
    {
      scope: [
        'comment',
        'comment.line',
        'comment.block',
        'punctuation.definition.comment',
      ],
      settings: { foreground: comment, fontStyle: 'italic' },
    },

    // -- Keywords & storage --
    {
      scope: [
        'keyword',
        'keyword.control',
        'keyword.other',
        'storage.type',
        'storage.modifier',
      ],
      settings: { foreground: keyword },
    },

    // -- Tasty at-rules & state aliases --
    {
      scope: [
        'keyword.control.at-rule.tasty',
        'keyword.control.at-rule.media.tasty',
        'keyword.control.at-rule.media-type.tasty',
        'keyword.control.at-rule.starting.tasty',
        'keyword.control.state-alias.tasty',
      ],
      settings: { foreground: keyword },
    },

    // -- Strings --
    {
      scope: [
        'string',
        'string.quoted',
        'string.template',
        'string.quoted.attribute-value.tasty',
        'string.unquoted.attribute-value.tasty',
      ],
      settings: { foreground: string },
    },

    // -- Tasty color token references (#primary, #surface) --
    {
      scope: [
        'support.constant.color.tasty-token',
        'support.constant.color.tasty-token.builtin',
        'constant.other.color.tasty-token',
        'constant.other.color.tasty',
      ],
      settings: { foreground: token },
    },

    // -- Hex colors --
    {
      scope: ['constant.other.color.hex', 'constant.other.color.rgb-value'],
      settings: { foreground: token },
    },

    // -- Numbers & units --
    {
      scope: [
        'constant.numeric',
        'constant.numeric.tasty',
        'constant.numeric.custom-unit.tasty',
        'constant.numeric.css-with-unit',
        'constant.numeric.bare.tasty',
        'constant.numeric.css',
        'constant.numeric.keyframe-step.tasty',
        'constant.language.boolean.tasty',
      ],
      settings: { foreground: number },
    },

    // -- Tasty style property names --
    {
      scope: ['support.type.property-name.tasty'],
      settings: { foreground: property },
    },

    // -- Tasty custom properties ($gap, $radius) --
    {
      scope: ['variable.other.constant.tasty'],
      settings: { foreground: property },
    },

    // -- General variables --
    {
      scope: ['variable', 'variable.other'],
      settings: { foreground: fg },
    },

    // -- Functions --
    {
      scope: [
        'entity.name.function',
        'support.function',
        'support.function.misc.css',
      ],
      settings: { foreground: func },
    },

    // -- Value keywords (none, auto, flex, grid, preset names, CSS values) --
    {
      scope: [
        'support.constant.property-value.tasty',
        'support.constant.property-value.tasty-display',
        'support.constant.property-value.tasty-directional',
        'support.constant.property-value.tasty-preset',
        'support.constant.property-value.tasty-shape',
        'support.constant.property-value.tasty-scrollbar',
        'support.constant.property-value.tasty-state',
        'support.constant.property-value.tasty-cursor',
        'support.constant.property-value.tasty-overflow',
        'support.constant.property-value.tasty-position',
        'support.constant.property-value.tasty-flex',
        'support.constant.property-value.tasty-font',
        'support.constant.property-value.tasty-text',
        'support.constant.property-value.tasty-alignment',
        'support.constant.property-value.tasty-border-style',
        'support.constant.property-value.tasty-whitespace',
        'support.constant.property-value.tasty-global',
        'support.constant.property-value.tasty-transition',
        'support.constant.property-value.css-syntax',
      ],
      settings: { foreground: value },
    },

    // -- Operators --
    {
      scope: [
        'keyword.operator',
        'keyword.operator.logical.tasty',
        'keyword.operator.arithmetic.css',
        'keyword.operator.assignment',
        'keyword.operator.selector-affix.tasty',
        'keyword.operator.attribute-selector.tasty',
        'keyword.operator.comparison.tasty',
      ],
      settings: { foreground: operator },
    },

    // -- Selector affix & entity names --
    {
      scope: [
        'entity.name.tag',
        'entity.name.tag.tsx',
        'entity.name.type.tasty',
        'entity.name.tag.tasty',
      ],
      settings: { foreground: func },
    },

    // -- Attribute names --
    {
      scope: [
        'entity.other.attribute-name',
        'entity.other.attribute-name.tasty',
        'entity.other.attribute-name.pseudo-class.tasty',
        'entity.other.attribute-name.pseudo-class.css',
        'entity.other.attribute-name.class.tasty',
      ],
      settings: { foreground: value },
    },

    // -- Punctuation --
    {
      scope: [
        'punctuation.definition.string',
        'punctuation.separator',
        'punctuation.definition.block',
        'punctuation.definition.array',
        'punctuation.section',
        'punctuation.definition.auto-calc',
        'punctuation.definition.attribute-selector',
        'punctuation.definition.pseudo-class',
        'punctuation.definition.fallback',
        'meta.brace',
      ],
      settings: { foreground: punctuation },
    },

    // -- CSS at-rules --
    {
      scope: ['keyword.control.at-rule', 'entity.name.tag.class.css'],
      settings: { foreground: keyword },
    },

    // -- CSS property names --
    {
      scope: ['support.type.property-name.css', 'meta.property-name.css'],
      settings: { foreground: property },
    },

    // -- CSS selector pseudo-elements --
    {
      scope: [
        'entity.other.attribute-name.pseudo-element.css',
        'entity.other.attribute-name.pseudo-class.css',
        'punctuation.definition.entity.css',
      ],
      settings: { foreground: value },
    },
  ],
};
