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
        <Link href="/" className="flex items-center gap-2.5 text-base font-semibold tracking-tight">
          <svg aria-hidden="true" viewBox="0 0 32 32" className="h-6 w-6">
            <rect width="32" height="32" rx="7" fill="var(--fg)" />
            <path d="M8 22h16M10 18h12M12 14h8M14 10h4" stroke="var(--bg)" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          {SITE_NAME}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {MAIN_NAV.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-md px-3 py-2 text-sm font-medium text-muted hover:text-fg">
              {l.label}
            </Link>
          ))}
          <div className="group relative">
            <button
              type="button"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted hover:text-fg group-focus-within:text-accent"
            >
              Styles ▾
            </button>
            {/* CSS-only dropdown: opens on hover and on keyboard focus. */}
            <ul className="invisible absolute right-0 top-full w-60 rounded-xl border border-border bg-surface p-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              {styleLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="block rounded-md px-3 py-2 text-sm text-muted hover:bg-surface-2 hover:text-fg">
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
