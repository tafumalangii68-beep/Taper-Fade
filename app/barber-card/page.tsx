import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Faq } from '@/components/seo/Faq';
import { RelatedTapers } from '@/components/style/RelatedTapers';
import { BarberCardGenerator } from '@/components/tools/BarberCardGenerator';
import { buildMetadata, type Faq as FaqItem } from '@/lib/seo';
import { STYLE_PAGES } from '@/lib/styles';

const PATH = '/barber-card';

export const metadata: Metadata = buildMetadata({
  title: 'Barber Card Generator: Show Your Barber Exactly What You Want',
  description:
    'Create a free taper fade barber card: pick the taper type, starting height, clipper guard (mm and inches), top length, neckline, line-up and beard fade. Download as PNG or copy as text.',
  path: PATH,
  absoluteTitle: true,
});

const FAQS: FaqItem[] = [
  { q: 'What is a barber card?', a: 'A short written summary of the haircut you want (taper type, height, guard numbers, top length and finishing details) that you show your barber so nothing gets lost in translation.' },
  { q: 'Is the barber card generator free?', a: 'Yes, completely free with no sign-up. Everything runs in your browser and nothing is uploaded.' },
  { q: 'How do I save my barber card?', a: 'Tap “Download PNG” to save it as an image, “Copy as text” to paste it into a message, “Share link” to send a link that reopens the same card, or “Print”.' },
  { q: 'Which guard should I choose?', a: 'For a subtle taper pick #1 (3 mm / 1/8 inch) or #0.5 (1.5 mm / 1/16 inch). For a crisper look pick #0 (about 0.8 mm / 1/32 inch) or skin. See the clipper guard chart for all sizes.' },
  { q: 'What is the difference between a tapered and blocked neckline?', a: 'A tapered neckline fades naturally into the skin and grows out softly. A blocked neckline is cut straight across for a sharp, squared edge but shows regrowth faster. Rounded is a blocked line with softened corners.' },
];

export default function BarberCardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumbs items={[{ name: 'Barber Card Generator', path: PATH }]} />
      <h1 className="mt-6 font-display text-4xl font-semibold sm:text-5xl">Barber Card Generator</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
        Build a clear, one-glance card describing your taper fade, then download it, print it or show it on your phone at the barbershop. Not sure what to choose? Take the{' '}
        <Link href="/#taper-fade-finder" className="text-accent underline">
          taper fade finder
        </Link>{' '}
        first.
      </p>

      <div className="mt-8">
        <BarberCardGenerator />
      </div>

      <section className="prose-guide mt-14" aria-labelledby="tips">
        <h2 id="tips">Tips for getting the cut you want</h2>
        <ul>
          <li>Show the card before the barber starts and ask them to confirm the plan.</li>
          <li>Give the top length in both centimeters and inches; barbers in different countries think in different units.</li>
          <li>If you are between two guard sizes, choose the longer one. Hair can always be taken shorter.</li>
          <li>
            Check exact lengths in the <Link href="/clipper-guard-chart">clipper guard chart</Link>.
          </li>
        </ul>
      </section>

      <Faq faqs={FAQS} heading="Barber card FAQ" />
      <RelatedTapers pages={STYLE_PAGES.slice(0, 4)} heading="Taper styles to try" />
    </div>
  );
}
