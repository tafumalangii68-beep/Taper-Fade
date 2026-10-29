import Link from 'next/link';
import { COMPANY_NAV, LEGAL_NAV, SITE_NAME } from '@/lib/site';
import { STYLE_PAGES } from '@/lib/styles';
import { Logo } from './Logo';

const STYLES = [...STYLE_PAGES.map((p) => ({ href: `/${p.slug}`, label: p.name })), { href: '/taper-vs-fade', label: 'Taper vs Fade' }];

const TOOLS = [
  { href: '/#taper-fade-finder', label: 'Taper Fade Finder' },
  { href: '/barber-card', label: 'Barber Card Generator' },
  { href: '/clipper-guard-chart', label: 'Clipper Guard Chart' },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-10 px-4 py-14 sm:grid-cols-3 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div className="col-span-2 max-w-xs sm:col-span-3 lg:col-span-1">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Independent guides and free tools to help you choose a taper fade and ask for it with confidence.
          </p>
          <p className="mt-4 text-xs text-muted">All measurements in mm and inches.</p>
        </div>
        <FooterCol title="Styles" links={STYLES} />
        <FooterCol title="Tools" links={TOOLS} />
        <FooterCol title="Company" links={[...COMPANY_NAV]} />
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. General information only, not professional advice.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {LEGAL_NAV.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title}>
      <p className="text-sm font-medium">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-muted transition-colors hover:text-fg">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
