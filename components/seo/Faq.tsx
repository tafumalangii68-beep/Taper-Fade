import { faqJsonLd, type Faq as FaqItem } from '@/lib/seo';
import { JsonLd } from './JsonLd';

/** Accessible FAQ accordion (native <details>) plus FAQPage JSON-LD. */
export function Faq({ faqs, heading = 'Frequently asked questions', id = 'faq' }: { faqs: FaqItem[]; heading?: string; id?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="mt-12 scroll-mt-20">
      <h2 id={`${id}-heading`} className="font-display text-2xl font-semibold sm:text-3xl">
        {heading}
      </h2>
      <div className="mt-5 divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
        {faqs.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold [&::-webkit-details-marker]:hidden">
              <h3 className="m-0 text-base">{f.q}</h3>
              <span aria-hidden="true" className="text-xl text-accent transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="m-0 px-5 pb-5 leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqJsonLd(faqs)} />
    </section>
  );
}
