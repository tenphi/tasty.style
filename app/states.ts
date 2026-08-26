export const states = {
  '@mobile': '@media(w < 768px)',
  '@tablet': '@media(w < 1024px)',
  '@desktop': '@media(w >= 1024px)',
  // $content-width (1200px) plus the resolver section's 4x side gutters.
  '@resolver-shrunk': '@media(w < 1264px)',
  '@dark-root': 'schema=dark | (!schema & @media(prefers-color-scheme: dark))',
  '@high-contrast-root':
    'contrast=more | (!contrast & @media(prefers-contrast: more))',
  '@dark':
    '@root(schema=dark) | (!@root(schema) & @media(prefers-color-scheme: dark))',
  '@high-contrast':
    '@root(contrast=more) | (!@root(contrast) & @media(prefers-contrast: more))',
  '@reduce-motion': '@media(prefers-reduced-motion: reduce)',
};
