import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

/** Simple layout for about/legal pages: breadcrumbs, H1 and long-form prose. */
export function TextPage({ title, path, updated, intro, children }: { title: string; path: string; updated?: string; intro?: string; children: React.ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumbs items={[{ name: title, path }]} />
      <h1 className="mt-6 font-display text-4xl font-semibold sm:text-5xl">{title}</h1>
      {updated && <p className="mt-2 text-sm text-muted">Last updated: {updated}</p>}
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
      <div className="prose-guide mt-6">{children}</div>
    </article>
  );
}
