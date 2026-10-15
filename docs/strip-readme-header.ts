import type { SatteriProcessorOptions } from '@astrojs/markdown-satteri';

type MdastPlugin = Extract<
  NonNullable<SatteriProcessorOptions['mdastPlugins']>[number],
  { name: string }
>;

/**
 * Drops the GitHub-only header that opens the Tasty README: the centered logo,
 * title, tagline and badges, written as raw HTML blocks up to the first `---`.
 * Cookbook already renders the page title and the site chrome.
 */
export const stripReadmeHeader: MdastPlugin = {
  name: 'tasty:strip-readme-header',
  before(root, ctx) {
    const header = [];

    for (const node of root.children) {
      if (node.type === 'html') {
        header.push(node);
        continue;
      }

      if (node.type === 'thematicBreak' && header.length) {
        for (const headerNode of [...header, node]) ctx.removeNode(headerNode);
      }

      return;
    }
  },
};
