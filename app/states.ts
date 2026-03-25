export const states = {
  '@mobile': '@media(w < 768px)',
  '@tablet': '@media(w < 1024px)',
  '@desktop': '@media(w >= 1024px)',
  '@dark-root': 'schema=dark | (!schema & @media(prefers-color-scheme: dark))',
  '@high-contrast-root':
    'contrast=more | (!contrast & @media(prefers-contrast: more))',
  '@dark':
    '@root(schema=dark) | (!@root(schema) & @media(prefers-color-scheme: dark))',
  '@high-contrast':
    '@root(contrast=more) | (!@root(contrast) & @media(prefers-contrast: more))',
  '@reduce-motion': '@media(prefers-reduced-motion: reduce)',
};
