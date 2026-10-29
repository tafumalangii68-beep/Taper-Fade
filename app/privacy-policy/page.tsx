import type { Metadata } from 'next';
import { TextPage } from '@/components/TextPage';
import { Faq } from '@/components/seo/Faq';
import { buildMetadata } from '@/lib/seo';
import { CONTACT_EMAIL, CONTENT_UPDATED, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: `How ${SITE_NAME} handles your data: what is stored in your browser, cookies, analytics and advertising.`,
  path: '/privacy-policy',
});

export default function PrivacyPage() {
  return (
    <TextPage title="Privacy Policy" path="/privacy-policy" updated={CONTENT_UPDATED}>
      <p>
        This policy explains what information {SITE_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects when you use this website and how it is used. We aim to collect as little as possible.
      </p>
      <h2>Information we collect</h2>
      <p>
        We do not require an account and we do not ask for personal information to use our tools. The Taper Fade Finder, Barber Card Generator and Clipper Guard Chart run entirely in your
        browser; your answers and cards are not sent to our servers.
      </p>
      <h2>Browser storage</h2>
      <p>We store your light/dark theme preference in your browser&rsquo;s local storage. You can clear it at any time through your browser settings.</p>
      <h2>Contact form</h2>
      <p>
        The contact form does not submit data to us. It opens your own email app with a pre-filled message. Any email you choose to send is handled under your email provider&rsquo;s terms,
        and we use it only to reply.
      </p>
      <h2>Hosting and server logs</h2>
      <p>
        The site is hosted on Vercel, which may process technical data such as IP address, browser type and pages requested in order to deliver and secure the service.
      </p>
      <h2>Advertising</h2>
      <p>
        We may display advertising in the future, for example through Google AdSense. If we do, third-party vendors, including Google, may use cookies to serve ads based on your prior visits
        to this and other websites. You will be able to opt out of personalized advertising via Google&rsquo;s Ads Settings or www.aboutads.info. We will update this policy, and show a
        consent notice where legally required (such as in the UK and EEA), before any advertising cookies are used.
      </p>
      <h2>Your rights</h2>
      <p>
        Depending on where you live (for example under the UK GDPR, Canada&rsquo;s PIPEDA, the Australian Privacy Act or US state privacy laws), you may have the right to access, correct or
        delete personal information we hold. Contact us at {CONTACT_EMAIL}.
      </p>
      <h2>Children</h2>
      <p>This site is not directed at children under 13 and we do not knowingly collect their personal information.</p>
      <h2>Changes</h2>
      <p>We may update this policy from time to time. The &ldquo;last updated&rdquo; date above shows when it last changed.</p>
      <Faq
        heading="Privacy FAQ"
        faqs={[
          { q: 'Does this site use cookies?', a: 'Not currently. Only your theme preference is saved in local storage. This may change if advertising is added, and this policy will be updated first.' },
          { q: 'Are my quiz answers or barber cards saved?', a: 'No. They stay in your browser and are never uploaded.' },
        ]}
      />
    </TextPage>
  );
}
