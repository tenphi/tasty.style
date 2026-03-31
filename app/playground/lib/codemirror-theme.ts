import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';

const theme = EditorView.theme({
  '&': {
    color: 'var(--syntax-text-color)',
    backgroundColor: 'var(--syntax-bg-color)',
  },
  '.cm-scroller': {
    fontFamily: 'var(--font-mono), monospace',
    fontSize: '14px',
    lineHeight: '1.5',
    scrollbarWidth: 'thin',
    scrollbarColor:
      'color-mix(in srgb, var(--syntax-text-color) 15%, transparent) transparent',
  },
  '.cm-gutters': {
    backgroundColor: 'var(--syntax-bg-color)',
    color: 'var(--syntax-comment-color)',
    border: 'none',
  },
  '.cm-activeLineGutter': {
    backgroundColor:
      'color-mix(in srgb, var(--syntax-text-color) 5%, transparent)',
  },
  '.cm-activeLine': {
    backgroundColor:
      'color-mix(in srgb, var(--syntax-text-color) 3%, transparent)',
  },
  '&.cm-focused .cm-cursor': {
    borderLeftColor: 'var(--syntax-text-color)',
  },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection':
    {
      backgroundColor:
        'color-mix(in srgb, var(--syntax-text-color) 10%, transparent) !important',
    },
  '.cm-panels': {
    backgroundColor: 'var(--surface-2-color)',
    color: 'var(--text-color)',
    border: 'none',
  },
  '.cm-panels.cm-panels-bottom': {
    borderTop: 'var(--border-width) solid var(--border-color)',
  },
  '.cm-search.cm-panel': {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'calc(var(--gap) * 0.5)',
    padding: 'calc(var(--gap) * 1)',
    alignItems: 'center',
  },
  '.cm-search .cm-textfield': {
    backgroundColor: 'var(--surface-color)',
    color: 'var(--text-color)',
    border: 'var(--border-width) solid var(--border-color)',
    borderRadius: 'var(--button-radius)',
    padding: 'calc(var(--gap) * 0.5) calc(var(--gap) * 1)',
    fontFamily: 'var(--font-mono, var(--font-mono-fallback))',
    fontSize: 'var(--t4-font-size, var(--default-font-size))',
    outline: 'none',
  },
  '.cm-search .cm-textfield:focus': {
    borderColor: 'var(--accent-surface-color)',
    outline: 'var(--outline-width) solid var(--accent-surface-color)',
  },
  '.cm-search .cm-button': {
    backgroundColor: 'var(--surface-3-color)',
    backgroundImage: 'none',
    color: 'var(--text-color)',
    border: 'var(--border-width) solid var(--border-color)',
    borderRadius: 'var(--button-radius)',
    padding: 'calc(var(--gap) * 0.5) calc(var(--gap) * 1.5)',
    cursor: 'pointer',
    fontFamily: 'var(--font-mono, var(--font-mono-fallback))',
    fontSize: 'var(--t4-font-size, var(--default-font-size))',
  },
  '.cm-search .cm-button:hover': {
    backgroundColor: 'var(--surface-color)',
  },
  '.cm-search button[name="close"]': {
    backgroundColor: 'transparent',
    color: 'var(--text-soft-color)',
    border: 'none',
    cursor: 'pointer',
    padding: '0 calc(var(--gap) * 1)',
    fontSize: '18px',
    lineHeight: '1',
    marginLeft: 'auto',
  },
  '.cm-search button[name="close"]:hover': {
    color: 'var(--text-color)',
  },
  '.cm-search label': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'calc(var(--gap) * 0.25)',
    color: 'var(--text-color)',
    cursor: 'pointer',
    fontSize: 'var(--t4-font-size, var(--default-font-size))',
  },
  '.cm-search input[type="checkbox"]': {
    accentColor: 'var(--accent-surface-color)',
  },
  '.cm-search br': {
    display: 'none',
  },
  '.cm-searchMatch': {
    backgroundColor:
      'color-mix(in srgb, var(--syntax-text-color) 15%, transparent)',
  },
  '.cm-searchMatch.cm-searchMatch-selected': {
    backgroundColor:
      'color-mix(in srgb, var(--syntax-text-color) 25%, transparent)',
  },
  '.cm-matchingBracket': {
    backgroundColor:
      'color-mix(in srgb, var(--syntax-text-color) 12%, transparent)',
    outline:
      '1px solid color-mix(in srgb, var(--syntax-text-color) 20%, transparent)',
  },
  '.cm-tooltip': {
    backgroundColor: 'var(--syntax-bg-color)',
    border: '1px solid var(--primary-border-color)',
  },
  '.cm-tooltip-autocomplete': {
    '& > ul > li[aria-selected]': {
      backgroundColor:
        'color-mix(in srgb, var(--syntax-text-color) 10%, transparent)',
    },
  },
  '.cm-line span': {
    color: 'inherit',
  },
});

const highlighting = HighlightStyle.define([
  {
    tag: [tags.comment, tags.lineComment, tags.blockComment],
    color: 'var(--syntax-comment-color)',
    fontStyle: 'italic',
  },
  {
    tag: [
      tags.keyword,
      tags.controlKeyword,
      tags.moduleKeyword,
      tags.operatorKeyword,
      tags.definitionKeyword,
      tags.typeName,
      tags.typeOperator,
    ],
    color: 'var(--syntax-keyword-color)',
  },
  {
    tag: [tags.string, tags.special(tags.string), tags.character],
    color: 'var(--syntax-string-color)',
  },
  {
    tag: [tags.number, tags.bool, tags.null],
    color: 'var(--syntax-number-color)',
  },
  {
    tag: [tags.propertyName],
    color: 'var(--syntax-property-color)',
  },
  {
    tag: [
      tags.function(tags.variableName),
      tags.function(tags.definition(tags.variableName)),
    ],
    color: 'var(--syntax-function-color)',
  },
  {
    tag: [tags.variableName, tags.definition(tags.variableName)],
    color: 'var(--syntax-text-color)',
  },
  {
    tag: [tags.operator, tags.compareOperator, tags.logicOperator],
    color: 'var(--syntax-operator-color)',
  },
  {
    tag: [
      tags.punctuation,
      tags.paren,
      tags.brace,
      tags.squareBracket,
      tags.angleBracket,
      tags.separator,
      tags.derefOperator,
    ],
    color: 'var(--syntax-punctuation-color)',
  },
  {
    tag: [tags.tagName, tags.standard(tags.tagName)],
    color: 'var(--syntax-function-color)',
  },
  {
    tag: [tags.attributeName],
    color: 'var(--syntax-value-color)',
  },
  {
    tag: [tags.attributeValue],
    color: 'var(--syntax-string-color)',
  },
  {
    tag: [tags.atom, tags.unit, tags.color],
    color: 'var(--syntax-token-color)',
  },
  {
    tag: [tags.meta, tags.annotation, tags.processingInstruction],
    color: 'var(--syntax-keyword-color)',
  },
  {
    tag: [tags.className, tags.namespace],
    color: 'var(--syntax-token-color)',
  },
  {
    tag: [tags.regexp],
    color: 'var(--syntax-string-color)',
  },
  {
    tag: [tags.self],
    color: 'var(--syntax-keyword-color)',
  },
  {
    tag: tags.invalid,
    color: 'var(--syntax-operator-color)',
    textDecoration: 'underline wavy',
  },
]);

export const tastyEditorTheme = theme;
export const tastyHighlightStyle = syntaxHighlighting(highlighting);
export const tastyCodeMirrorTheme = [tastyEditorTheme, tastyHighlightStyle];
