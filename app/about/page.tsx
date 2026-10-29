import type { Metadata } from 'next';
import Link from 'next/link';
import { TextPage } from '@/components/TextPage';
import { Faq } from '@/components/seo/Faq';
import { buildMetadata } from '@/lib/seo';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'About Us',
  description: `About ${SITE_NAME}: free, independent taper fade guides and tools that help you choose and ask for the right haircut.`,
  path: '/about',
});

export default function AboutPage() {
  return (
    <TextPage title={`About ${SITE_NAME}`} path="/about" intro="Helping you walk out of the barbershop with the haircut you actually wanted.">
      <h2>Why this site exists</h2>
      <p>
        Asking for a taper fade sounds simple until you realize every barber interprets it differently. Low, mid, high, drop, burst, guard numbers, necklines: the vocabulary gets
        confusing fast. {SITE_NAME} explains it all in plain language and gives you free tools to turn your preferences into clear instructions.
      </p>
      <h2>What you will find here</h2>
      <ul>
        <li>
          The <Link href="/#taper-fade-finder">Taper Fade Finder</Link>, a quick quiz that recommends a taper for your hair, face and lifestyle.
        </li>
        <li>
          The <Link href="/barber-card">Barber Card Generator</Link>, which creates a shareable summary to show your barber.
        </li>
        <li>
          The <Link href="/clipper-guard-chart">Clipper Guard Chart</Link>, with every size in millimeters and inches.
        </li>
        <li>In-depth guides to every popular taper style.</li>
      </ul>
      <h2>Our approach</h2>
      <p>
        Content is written for readers in the USA, UK, Canada, Australia and beyond, so measurements are always given in both metric and imperial units. All illustrations are original. We
        do not sell products, and all tools run entirely in your browser.
      </p>
      <Faq
        heading="About FAQ"
        faqs={[
          { q: 'Is this site free to use?', a: 'Yes. Every guide and tool is free, with no account or sign-up required.' },
          { q: 'Are you affiliated with any barbershop or brand?', a: 'No. The site is independent and is not sponsored by any barbershop or clipper brand.' },
          { q: 'How can I suggest a new taper style?', a: 'Use the contact page to send a suggestion. New styles are added regularly.' },
        ]}
      />
    </TextPage>
  );
}
