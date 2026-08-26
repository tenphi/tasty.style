import { highlightCode } from '@/app/lib/shiki';
import { SYNTAX_COLOR_CLASSES } from '@/app/lib/shiki-theme';
import StateResolver from './StateResolver';
import {
  STATE_IDS,
  STATE_MAP_CODE,
  STATE_OPTIONS,
  type SelectorSyntaxToken,
  type StateMapSyntaxLine,
  type StateId,
} from './state-resolver-data';

export default function StateResolverSection() {
  const selectorTokens = Object.fromEntries(
    STATE_OPTIONS.map((option) => {
      const selectorParts = option.appliedSelector.match(
        /(?:\.[\w-]+)+|:(?:not\([^)]*\)|[\w-]+)|\[[^\]]+\]/g,
      ) ?? [option.appliedSelector];

      return [
        option.id,
        selectorParts.flatMap((part, partIndex) =>
          highlightCode(part, 'css')
            .tokens.flat()
            .map(
              (token, tokenIndex): SelectorSyntaxToken => ({
                content: token.content,
                className: token.color
                  ? (SYNTAX_COLOR_CLASSES[token.color] ?? null)
                  : null,
                breakBefore: partIndex > 0 && tokenIndex === 0,
              }),
            ),
        ),
      ];
    }),
  ) as Record<StateId, SelectorSyntaxToken[]>;

  const stateMapLines = highlightCode(STATE_MAP_CODE, 'json').tokens.map(
    (line, lineIndex): StateMapSyntaxLine => ({
      stateId: STATE_IDS[lineIndex - 2] ?? null,
      tokens: line.map((token) => ({
        content: token.content,
        className: token.color
          ? (SYNTAX_COLOR_CLASSES[token.color] ?? null)
          : null,
      })),
    }),
  );

  return (
    <StateResolver
      selectorTokens={selectorTokens}
      stateMapLines={stateMapLines}
    />
  );
}
