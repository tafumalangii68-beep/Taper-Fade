import type { MetadataRoute } from 'next';
import { CONTENT_UPDATED, LEGAL_NAV, absoluteUrl } from '@/lib/site';
import { STYLE_PAGES } from '@/lib/styles';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_UPDATED);
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({ url: absoluteUrl(path), lastModified, changeFrequency: 'monthly', priority });

  return [
    entry('/', 1),
    ...STYLE_PAGES.map((p) => entry(`/${p.slug}`, 0.8)),
    entry('/taper-vs-fade', 0.8),
    entry('/barber-card', 0.8),
    entry('/clipper-guard-chart', 0.8),
    ...LEGAL_NAV.map((l) => entry(l.href, 0.3)),
  ];
}
