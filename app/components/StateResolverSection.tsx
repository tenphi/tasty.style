import { highlightCode } from '@/app/lib/shiki';
import { SYNTAX_COLOR_CLASSES } from '@/app/lib/shiki-theme';
import StateResolver from './StateResolver';
import {
  STATE_OPTIONS,
  type SelectorSyntaxToken,
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

  return <StateResolver selectorTokens={selectorTokens} />;
}
