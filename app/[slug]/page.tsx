import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StylePageTemplate } from '@/components/style/StylePageTemplate';
import { buildMetadata } from '@/lib/seo';
import { STYLE_PAGES, getStylePage } from '@/lib/styles';

type Params = { params: Promise<{ slug: string }> };

// Only the slugs in lib/styles.ts exist; everything is pre-rendered at build time.
export const dynamicParams = false;

export function generateStaticParams() {
  return STYLE_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = getStylePage(slug);
  if (!page) return {};
  return buildMetadata({ title: page.seo.title, description: page.seo.description, path: `/${page.slug}`, absoluteTitle: true });
}

export default async function StyleRoute({ params }: Params) {
  const { slug } = await params;
  const page = getStylePage(slug);
  if (!page) notFound();
  return <StylePageTemplate page={page} />;
}
