import type { Metadata } from 'next';
import { TextPage } from '@/components/TextPage';
import { Faq } from '@/components/seo/Faq';
import { buildMetadata } from '@/lib/seo';
import { CONTENT_UPDATED, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'Disclaimer',
  description: `${SITE_NAME} disclaimer: general information only, approximate guard sizes, and no professional advice.`,
  path: '/disclaimer',
});

export default function DisclaimerPage() {
  return (
    <TextPage title="Disclaimer" path="/disclaimer" updated={CONTENT_UPDATED}>
      <h2>General information only</h2>
      <p>
        The content on {SITE_NAME}, including guides, quiz results and barber cards, is provided for general information and inspiration. It is not professional hairdressing, medical or
        dermatological advice. Always discuss your haircut with a qualified barber or stylist.
      </p>
      <h2>Measurements</h2>
      <p>
        Clipper guard lengths are based on common industry standards and are approximate. Actual lengths vary between brands, clipper models and blade settings, typically by around
        0.5 mm. Metric and imperial conversions are rounded.
      </p>
      <h2>Results</h2>
      <p>
        Finder recommendations are generated automatically from your answers and cannot account for every factor, such as hair density, growth patterns, cowlicks or scalp conditions. Your
        barber may suggest something different, and that advice should take priority.
      </p>
      <h2>Illustrations and images</h2>
      <p>Illustrations are simplified diagrams to show where each taper starts and are not exact representations of any haircut.</p>
      <h2>External links</h2>
      <p>We are not responsible for the content of external websites linked from this site.</p>
      <Faq
        heading="Disclaimer FAQ"
        faqs={[
          { q: 'Are the guard lengths exact?', a: 'No. They are approximate industry standards; check your own clipper’s guide for exact sizes.' },
          { q: 'Should I follow the quiz result exactly?', a: 'Use it as a starting point for a conversation with your barber, who can see your hair in person.' },
        ]}
      />
    </TextPage>
  );
}
