import Link from 'next/link';
import { AdSlot } from '@/components/AdSlot';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { ILLUSTRATION_LABELS } from '@/components/illustrations/HeadProfile';
import { TaperVisual } from '@/components/illustrations/TaperVisual';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Faq } from '@/components/seo/Faq';
import { getPagePhoto, getRelated, type StylePage } from '@/lib/styles';
import { RelatedTapers } from './RelatedTapers';

/** Shared layout for every page in STYLE_PAGES. */
export function StylePageTemplate({ page }: { page: StylePage }) {
  const related = getRelated(page.related, page.slug);
  const photo = getPagePhoto(page);

  return (
    <article className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumbs items={[{ name: page.name, path: `/${page.slug}` }]} />

      {/* Hero */}
      <header className="mt-6 grid items-center gap-8 md:grid-cols-[1fr_280px]">
        <div>
          <p className="text-sm font-medium text-muted">{page.kind === 'height' ? 'Taper height guide' : 'Taper by hair type'}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">{page.seo.h1}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{page.lead}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/barber-card?taper=${page.taperId}`} className="btn btn-primary">
              Make a barber card for this cut
            </Link>
            <Link href="/#taper-fade-finder" className="btn btn-ghost">
              Not sure? Take the quiz
            </Link>
          </div>
        </div>
        <figure className="rounded-xl border border-border bg-surface p-4">
          <TaperVisual
            variant={page.illustration}
            photo={photo}
            px={248}
            priority
            className={photo ? 'h-auto w-full' : 'mx-auto h-56 w-56'}
          />
          <figcaption className="mt-2 text-center text-sm text-muted">{ILLUSTRATION_LABELS[page.illustration]}</figcaption>
        </figure>
      </header>

      {/* Quick facts */}
      <section aria-label="Quick facts" className="mt-10">
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {page.quickFacts.map((f) => (
            <div key={f.label} className="rounded-xl border border-border bg-surface p-4">
              <dt className="text-xs font-medium text-muted">{f.label}</dt>
              <dd className="mt-1 font-semibold">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <AdSlot slot={`${page.slug}-top`} />

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="prose-guide">
          {page.sections.map((sec) => (
            <section key={sec.id} aria-labelledby={sec.id}>
              <h2 id={sec.id}>{sec.heading}</h2>
              {sec.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {sec.bullets && (
                <ul>
                  {sec.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section aria-labelledby="pros-cons">
            <h2 id="pros-cons">Pros and cons</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface p-4">
                <h3 className="mt-0">Pros</h3>
                <ul>
                  {page.pros.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <h3 className="mt-0">Cons</h3>
                <ul>
                  {page.cons.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section aria-labelledby="ask-barber">
            <h2 id="ask-barber">What to say to your barber</h2>
            <blockquote className="rounded-xl border-l-4 border-accent bg-accent-soft p-4 italic">“{page.barberScript}”</blockquote>
            <p>
              Want it in writing? Use the free <Link href={`/barber-card?taper=${page.taperId}`}>barber card generator</Link> to create a card you can show on your phone, and
              check exact lengths in the <Link href="/clipper-guard-chart">clipper guard chart</Link>.
            </p>
          </section>
        </div>

        <aside aria-label="Photos" className="space-y-4">
          {/* PHOTO PLACEHOLDERS: set `src` on page.photos in lib/styles.ts */}
          {page.photos.map((ph) => (
            <PhotoPlaceholder key={ph.caption} slot={ph} />
          ))}
          <AdSlot slot={`${page.slug}-sidebar`} />
        </aside>
      </div>

      <Faq faqs={page.faqs} heading={`${page.name} FAQ`} />
      <RelatedTapers pages={related} />
    </article>
  );
}
