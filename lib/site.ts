/**
 * Global site constants. Set NEXT_PUBLIC_SITE_URL in Vercel (Project → Settings →
 * Environment Variables) so canonicals, sitemap and JSON-LD use your real domain.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.yourdomain.com').replace(/\/$/, '');

export const SITE_NAME = 'Taper Fade Guide';
export const SITE_TAGLINE = 'Free taper fade finder, barber card and clipper guard chart';
export const SITE_DESCRIPTION =
  'Find the taper fade that suits your hair, face shape and lifestyle, then make a barber card so you get exactly the cut you want.';

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@yourdomain.com';

/** Bump when content changes meaningfully; used in the sitemap. */
export const CONTENT_UPDATED = '2026-10-29';

export const MAIN_NAV = [
  { href: '/', label: 'Taper Fade' },
  { href: '/taper-vs-fade', label: 'Taper vs Fade' },
  { href: '/barber-card', label: 'Barber Card' },
  { href: '/clipper-guard-chart', label: 'Guard Chart' },
] as const;

export const COMPANY_NAV = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export const LEGAL_NAV = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/terms', label: 'Terms of Use' },
] as const;

export function absoluteUrl(path = '/'): string {
  return path === '/' ? SITE_URL : `${SITE_URL}${path}`;
}
