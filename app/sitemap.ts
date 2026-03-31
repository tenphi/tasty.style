import type { MetadataRoute } from 'next';
import { getAllSlugs } from './docs/lib/navigation';

export const dynamic = 'force-static';

const SITE_URL = 'https://tasty.style';

export default function sitemap(): MetadataRoute.Sitemap {
  const docSlugs = getAllSlugs();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/docs`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/playground`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const docPages: MetadataRoute.Sitemap = docSlugs
    .filter((slug) => slug !== 'introduction')
    .map((slug) => ({
      url: `${SITE_URL}/docs/${slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  return [...staticPages, ...docPages];
}
