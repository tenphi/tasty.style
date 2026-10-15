import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const SITE_URL = 'https://tasty.style';

// Documentation pages are listed in the Cookbook sitemap at
// /docs/sitemap-index.xml (see public/robots.txt).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/playground`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
