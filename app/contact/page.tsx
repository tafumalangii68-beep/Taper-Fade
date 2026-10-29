import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { TextPage } from '@/components/TextPage';
import { Faq } from '@/components/seo/Faq';
import { buildMetadata } from '@/lib/seo';
import { CONTACT_EMAIL, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description: `Get in touch with ${SITE_NAME} with questions, corrections or taper style suggestions.`,
  path: '/contact',
});

export default function ContactPage() {
  return (
    <TextPage title="Contact" path="/contact" intro="Questions, corrections or a taper style you would like us to cover? Send a message.">
      <ContactForm email={CONTACT_EMAIL} />
      <p className="mt-6">
        Prefer to email directly? Write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
      <Faq
        heading="Contact FAQ"
        faqs={[
          { q: 'How quickly will I get a reply?', a: 'We aim to reply within a few working days.' },
          { q: 'Can you recommend a barber near me?', a: 'We do not recommend individual barbershops, but a barber card from our generator will help any barber understand what you want.' },
          { q: 'Do you accept guest posts or sponsored content?', a: 'Not at the moment. Content is written independently.' },
        ]}
      />
    </TextPage>
  );
}
