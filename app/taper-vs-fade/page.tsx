import type { Metadata } from 'next';
import Link from 'next/link';
import { AdSlot } from '@/components/AdSlot';
import { HeadProfile } from '@/components/illustrations/HeadProfile';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Faq } from '@/components/seo/Faq';
import { RelatedTapers } from '@/components/style/RelatedTapers';
import { buildMetadata, type Faq as FaqItem } from '@/lib/seo';
import { getRelated } from '@/lib/styles';

const PATH = '/taper-vs-fade';

export const metadata: Metadata = buildMetadata({
  title: 'Taper vs Fade: The Real Difference (With Diagrams)',
  description:
    'Taper vs fade explained simply: how much hair is cut short, contrast, upkeep and which suits you. Includes diagrams, a comparison table and what to tell your barber.',
  path: PATH,
  absoluteTitle: true,
});

const ROWS: [string, string, string][] = [
  ['Area cut short', 'Only the sideburns and neckline', 'Most of the sides and back'],
  ['Shortest length', 'Usually #0.5–#1 (1.5–3 mm / 1/16–1/8")', 'Often skin or #0 (0–0.8 mm)'],
  ['Contrast with top', 'Low to medium', 'Medium to very high'],
  ['Growing out', 'Grows out naturally', 'Regrowth shows within 1–2 weeks'],
  ['Upkeep', 'Every 3–5 weeks', 'Every 1–3 weeks'],
  ['Best for', 'Work, longer tops, first-timers', 'Bold looks, short tops, frequent visits'],
];

const FAQS: FaqItem[] = [
  { q: 'Is a taper or a fade better?', a: 'Neither is better; they suit different goals. A taper is subtle and low-maintenance, while a fade gives more contrast but needs more frequent touch-ups.' },
  { q: 'What is a taper fade then?', a: 'A taper fade combines both: the shortest hair is limited to the edges like a taper, but it is blended down close to the skin like a fade.' },
  { q: 'Is a taper more professional than a fade?', a: 'Generally yes. Because less of the head is cut very short, a taper looks more conservative. Low fades can also work in most offices.' },
  { q: 'Does a taper last longer than a fade?', a: 'Yes. A taper grows out more naturally because only a small area is cut short, so it looks neat for longer.' },
  { q: 'How do I ask for a taper instead of a fade?', a: 'Say you want the sides kept longer and only the sideburns and neckline tapered, and name the shortest guard, for example a #1 (3 mm / 1/8 inch).' },
];

export default function TaperVsFadePage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumbs items={[{ name: 'Taper vs Fade', path: PATH }]} />
      <h1 className="mt-6 font-display text-4xl font-semibold sm:text-5xl">Taper vs Fade</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
        A taper and a fade both make the hair shorter toward the bottom of the head, but the amount of hair removed is different. A taper only shortens the edges; a fade takes much more
        of the sides and back very short. Here is how to tell them apart and choose the right one.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <figure className="rounded-2xl border border-border bg-surface p-5 text-center">
          <HeadProfile variant="low" uid="-vs" className="mx-auto h-48 w-48" />
          <figcaption className="mt-2">
            <span className="block font-bold">Taper</span>
            <span className="text-sm text-muted">Short only at the sideburns and neckline</span>
          </figcaption>
        </figure>
        <figure className="rounded-2xl border border-border bg-surface p-5 text-center">
          <HeadProfile variant="skin" uid="-vs" className="mx-auto h-48 w-48" />
          <figcaption className="mt-2">
            <span className="block font-bold">Fade</span>
            <span className="text-sm text-muted">A larger area blended down to skin</span>
          </figcaption>
        </figure>
      </div>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <caption className="sr-only">Taper vs fade comparison table</caption>
          <thead className="bg-surface-2">
            <tr>
              <th scope="col" className="p-3">
                Feature
              </th>
              <th scope="col" className="p-3">
                Taper
              </th>
              <th scope="col" className="p-3">
                Fade
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface">
            {ROWS.map(([k, a, b]) => (
              <tr key={k} className="border-t border-border">
                <th scope="row" className="p-3">
                  {k}
                </th>
                <td className="p-3">{a}</td>
                <td className="p-3">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdSlot slot="vs-mid" />

      <div className="prose-guide mt-8">
        <h2>What is a taper?</h2>
        <p>
          A taper is the classic barbershop finish. The hair gets gradually shorter toward the ear and nape, but the sides above that keep much of their length. Because only the
          perimeter is cut close, a taper looks neat without exposing much scalp, and it grows out without an obvious line. That is why it is the traditional choice for business haircuts
          and longer styles.
        </p>
        <h2>What is a fade?</h2>
        <p>
          A fade goes further. The barber takes a large section of the sides and back very short, often to bare skin, and blends it upward. Fades are named by where they start (low, mid
          or high) and create much more contrast with the top. They look sharp and modern, but the short area shows regrowth quickly.
        </p>
        <h2>Where does the taper fade fit in?</h2>
        <p>
          A <Link href="/">taper fade</Link> blends both ideas: it keeps the small footprint of a taper but takes the very bottom close to the skin like a fade. It gives you the crispness
          of a fade with the subtlety and easier upkeep of a taper, which is why it is now one of the most requested cuts. Explore the <Link href="/low-taper-fade">low</Link>,{' '}
          <Link href="/mid-taper-fade">mid</Link>, <Link href="/high-taper-fade">high</Link>, <Link href="/drop-taper-fade">drop</Link> and{' '}
          <Link href="/burst-taper-fade">burst</Link> variations.
        </p>
        <h2>Which should you choose?</h2>
        <ul>
          <li>
            <strong>Choose a taper</strong> if you work in a conservative environment, have longer hair on top, or visit the barber every month or so.
          </li>
          <li>
            <strong>Choose a fade</strong> if you want maximum contrast, have a short top, and can get touch-ups every one to three weeks.
          </li>
          <li>
            <strong>Choose a taper fade</strong> if you want something in between, sharp at the edges but still easy to wear.
          </li>
        </ul>
        <p>
          Still deciding? The <Link href="/#taper-fade-finder">taper fade finder quiz</Link> recommends a style in under a minute, and the{' '}
          <Link href="/clipper-guard-chart">clipper guard chart</Link> shows exactly how short each guard is.
        </p>
      </div>

      <Faq faqs={FAQS} heading="Taper vs fade FAQ" />
      <RelatedTapers pages={getRelated(['low-taper-fade', 'mid-taper-fade', 'high-taper-fade', 'drop-taper-fade'], '')} />
    </article>
  );
}
