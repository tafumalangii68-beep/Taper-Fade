import Link from 'next/link';
import { LEGAL_NAV, SITE_NAME } from '@/lib/site';
import { STYLE_PAGES } from '@/lib/styles';

const TOOLS = [
  { href: '/#taper-fade-finder', label: 'Taper Fade Finder' },
  { href: '/barber-card', label: 'Barber Card Generator' },
  { href: '/clipper-guard-chart', label: 'Clipper Guard Chart' },
  { href: '/taper-vs-fade', label: 'Taper vs Fade' },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-semibold">{SITE_NAME}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Free, independent guides and tools to help you find and ask for the perfect taper fade. Measurements are shown in both mm and inches.
          </p>
        </div>
        <FooterCol title="Taper styles" links={STYLE_PAGES.map((p) => ({ href: `/${p.slug}`, label: p.name }))} />
        <FooterCol title="Free tools" links={TOOLS} />
        <FooterCol title="Site" links={[...LEGAL_NAV]} />
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-5 text-sm text-muted">
          © {new Date().getFullYear()} {SITE_NAME}. For general information only; not professional advice.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title}>
      <p className="text-sm font-semibold uppercase tracking-wider text-muted">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm hover:text-accent hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
