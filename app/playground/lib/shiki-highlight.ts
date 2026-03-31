import {
  ViewPlugin,
  Decoration,
  type EditorView,
  type ViewUpdate,
  type DecorationSet,
} from '@codemirror/view';
import type { Extension, Range } from '@codemirror/state';
import { tokenizeCode } from '@/app/lib/shiki';
import { SYNTAX_COLOR_CLASSES } from '@/app/lib/shiki-theme';

function buildDecorations(view: EditorView, lang: string): DecorationSet {
  const doc = view.state.doc;
  const code = doc.toString();
  const { tokens } = tokenizeCode(code, lang);
  const ranges: Range<Decoration>[] = [];
  const docLen = doc.length;

  let pos = 0;

  for (
    let lineIdx = 0;
    lineIdx < tokens.length && lineIdx < doc.lines;
    lineIdx++
  ) {
    const lineTokens = tokens[lineIdx];
    let col = 0;

    for (const token of lineTokens) {
      const from = pos + col;
      const to = Math.min(from + token.content.length, docLen);

      const cls = token.color ? SYNTAX_COLOR_CLASSES[token.color] : undefined;

      if (cls && from < to) {
        ranges.push(Decoration.mark({ class: cls }).range(from, to));
      }

      col += token.content.length;
    }

    pos += doc.line(lineIdx + 1).length + 1;
  }

  ranges.sort((a, b) => a.from - b.from || a.to - b.to);

  return Decoration.set(ranges);
}

class ShikiHighlightPlugin {
  decorations: DecorationSet;

  constructor(
    view: EditorView,
    private lang: string,
  ) {
    this.decorations = buildDecorations(view, this.lang);
  }

  update(update: ViewUpdate) {
    if (update.docChanged) {
      this.decorations = buildDecorations(update.view, this.lang);
    }
  }
}

export function shikiHighlight(lang: string): Extension {
  return ViewPlugin.define((view) => new ShikiHighlightPlugin(view, lang), {
    decorations: (v) => v.decorations,
  });
}
