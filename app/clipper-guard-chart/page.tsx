import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Faq } from '@/components/seo/Faq';
import { RelatedTapers } from '@/components/style/RelatedTapers';
import { ClipperGuardChart } from '@/components/tools/ClipperGuardChart';
import { buildMetadata, type Faq as FaqItem } from '@/lib/seo';
import { STYLE_PAGES } from '@/lib/styles';

const PATH = '/clipper-guard-chart';

export const metadata: Metadata = buildMetadata({
  title: 'Clipper Guard Chart: Sizes in mm and Inches (#0 to #8)',
  description:
    'Interactive clipper guard chart with every size from skin to #8 in millimeters and inches, what each length looks like, and which guards are used in a taper fade.',
  path: PATH,
  absoluteTitle: true,
});

const FAQS: FaqItem[] = [
  { q: 'How many mm is a #1 guard?', a: 'A #1 guard leaves about 3 mm (1/8 inch) of hair.' },
  { q: 'What is a #0 haircut?', a: 'A #0 means no guard on the clipper, leaving roughly 0.5–1.5 mm (about 1/32 inch) depending on the lever position. It is shorter than a #0.5 but not as short as a skin fade.' },
  { q: 'What guard is used for a taper fade?', a: 'Most tapers start with a #0, #0.5 or #1 at the bottom and blend up through #1.5 and #2 to a #3 or #4. Skin tapers start with a foil shaver or razor.' },
  { q: 'Are clipper guard sizes the same for every brand?', a: 'Mostly. Wahl, Andis and Oster follow the same numbering, but actual lengths can differ by around 0.5 mm, so check your clipper’s guide.' },
  { q: 'What is the difference between a #2 and a #3?', a: 'A #2 leaves 6 mm (1/4 inch) and a #3 leaves 10 mm (3/8 inch). The #3 shows noticeably more hair and texture.' },
];

export default function ClipperGuardChartPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumbs items={[{ name: 'Clipper Guard Chart', path: PATH }]} />
      <h1 className="mt-6 font-display text-4xl font-semibold sm:text-5xl">Clipper Guard Chart</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
        Every clipper guard size in millimeters and inches, with a quick description of how it looks. Lengths follow the common industry standard; individual brands can vary slightly.
      </p>

      <div className="mt-8">
        <ClipperGuardChart />
      </div>

      <section className="prose-guide mt-14" aria-labelledby="guards-in-tapers">
        <h2 id="guards-in-tapers">Which guards are used in a taper fade?</h2>
        <p>
          A taper is built from the bottom up. The shortest guard sets how crisp the edge is, and each longer guard blends the next step. A typical mid taper uses #0 → #1 → #1.5 → #2 → #3.
          Half guards (#0.5, #1.5) make the transition smoother, which is especially useful on straight hair where jumps are easy to see.
        </p>
        <ul>
          <li>
            <strong>Subtle:</strong> start at #1 (3 mm / 1/8&quot;), as in a classic <Link href="/low-taper-fade">low taper fade</Link>
          </li>
          <li>
            <strong>Balanced:</strong> start at #0.5 (1.5 mm / 1/16&quot;), as in a <Link href="/mid-taper-fade">mid taper fade</Link>
          </li>
          <li>
            <strong>Sharp:</strong> start at #0 or skin, as in a <Link href="/high-taper-fade">high taper fade</Link>
          </li>
        </ul>
        <p>
          Ready to ask for it? Put your guard choice on a free <Link href="/barber-card">barber card</Link>.
        </p>
      </section>

      <Faq faqs={FAQS} heading="Clipper guard FAQ" />
      <RelatedTapers pages={STYLE_PAGES.slice(0, 4)} />
    </div>
  );
}
