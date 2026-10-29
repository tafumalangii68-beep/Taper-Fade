import Link from 'next/link';
import { MAIN_NAV, SITE_NAME } from '@/lib/site';
import { STYLE_PAGES } from '@/lib/styles';
import { MobileNav } from './MobileNav';
import { ThemeToggle } from './ThemeToggle';

const styleLinks = STYLE_PAGES.map((p) => ({
  href: `/${p.slug}`,
  label: p.kind === 'height' ? p.name.replace(' Fade', '') : `${p.name.replace('Taper Fade for ', '')} Taper`,
}));

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/75">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-semibold tracking-wide">
          <svg aria-hidden="true" viewBox="0 0 32 32" className="h-7 w-7">
            <rect width="32" height="32" rx="8" fill="var(--accent)" />
            <path d="M8 22h16M10 18h12M12 14h8M14 10h4" stroke="var(--accent-fg)" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          {SITE_NAME}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {MAIN_NAV.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-lg px-3 py-2 font-medium hover:bg-surface-2 hover:text-accent">
              {l.label}
            </Link>
          ))}
          <div className="group relative">
            <button
              type="button"
              className="rounded-lg px-3 py-2 font-medium hover:bg-surface-2 hover:text-accent group-focus-within:text-accent"
            >
              Styles ▾
            </button>
            {/* CSS-only dropdown: opens on hover and on keyboard focus. */}
            <ul className="invisible absolute right-0 top-full w-60 rounded-xl border border-border bg-surface p-2 opacity-0 shadow-xl transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              {styleLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="block rounded-lg px-3 py-2 text-sm hover:bg-surface-2 hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileNav links={MAIN_NAV} styleLinks={styleLinks} />
        </div>
      </div>
    </header>
  );
}
