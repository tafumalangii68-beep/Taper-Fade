import Link from 'next/link';
import { TaperVisual } from '@/components/illustrations/TaperVisual';
import { getPagePhoto, type StylePage } from '@/lib/styles';

export function RelatedTapers({ pages, heading = 'Related tapers' }: { pages: StylePage[]; heading?: string }) {
  return (
    <section aria-labelledby="related-heading" className="mt-14">
      <h2 id="related-heading" className="font-display text-2xl font-semibold sm:text-3xl">
        {heading}
      </h2>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pages.map((p) => (
          <li key={p.slug}>
            <Link href={`/${p.slug}`} className="group flex h-full flex-col rounded-xl border border-border bg-surface p-4 transition hover:border-accent">
              <TaperVisual variant={p.illustration} photo={getPagePhoto(p)} px={96} uid={`-rel-${p.slug}`} className="mx-auto h-24 w-24" />
              <span className="mt-3 font-semibold group-hover:text-accent">{p.name}</span>
              <span className="mt-1 text-sm text-muted">{p.teaser}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
