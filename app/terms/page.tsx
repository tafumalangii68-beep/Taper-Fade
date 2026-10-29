import type { Metadata } from 'next';
import { TextPage } from '@/components/TextPage';
import { Faq } from '@/components/seo/Faq';
import { buildMetadata } from '@/lib/seo';
import { CONTACT_EMAIL, CONTENT_UPDATED, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Use',
  description: `The terms that apply when you use ${SITE_NAME}, its guides and its free tools.`,
  path: '/terms',
});

export default function TermsPage() {
  return (
    <TextPage title="Terms of Use" path="/terms" updated={CONTENT_UPDATED}>
      <p>By using {SITE_NAME} you agree to these terms. If you do not agree, please do not use the site.</p>
      <h2>Use of the site</h2>
      <p>
        You may use the site and its tools for personal, non-commercial purposes. Barber cards you create are yours to download, print and share freely. You must not misuse the site, attempt
        to disrupt it, or copy substantial parts of its content for republication without permission.
      </p>
      <h2>Intellectual property</h2>
      <p>The text, illustrations, design and code of this site are owned by {SITE_NAME} unless stated otherwise and are protected by copyright.</p>
      <h2>No warranty</h2>
      <p>
        The site is provided &ldquo;as is&rdquo; without warranties of any kind. We do our best to keep information accurate but cannot guarantee it is complete, current or suitable for
        your needs. See our disclaimer for details.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {SITE_NAME} is not liable for any loss or damage arising from your use of the site, including any haircut outcome. Nothing in these terms
        limits rights you have under consumer protection laws that cannot be excluded.
      </p>
      <h2>Changes</h2>
      <p>We may update these terms at any time. Continued use of the site after changes means you accept the updated terms.</p>
      <h2>Contact</h2>
      <p>Questions about these terms can be sent to {CONTACT_EMAIL}.</p>
      <Faq
        heading="Terms FAQ"
        faqs={[
          { q: 'Can I share my barber card?', a: 'Yes. Cards you create are yours to share, print or post anywhere.' },
          { q: 'Can I reuse your illustrations?', a: 'Please contact us first. The illustrations are original and copyrighted.' },
        ]}
      />
    </TextPage>
  );
}
