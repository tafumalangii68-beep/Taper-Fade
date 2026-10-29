import Link from 'next/link';
import { MAIN_NAV } from '@/lib/site';
import { STYLE_PAGES } from '@/lib/styles';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { NavLink } from './NavLink';
import { ThemeToggle } from './ThemeToggle';

const styleLinks = STYLE_PAGES.map((p) => ({
  href: `/${p.slug}`,
  label: p.kind === 'height' ? p.name.replace(' Fade', '') : `${p.name.replace('Taper Fade for ', '')} Taper`,
}));

const STYLE_GROUPS = [
  { title: 'By height', pages: STYLE_PAGES.filter((p) => p.kind === 'height') },
  { title: 'By hair type', pages: STYLE_PAGES.filter((p) => p.kind === 'hair-type') },
];

// The logo links home and the barber card has its own button, so desktop skips both.
const DESKTOP_NAV = MAIN_NAV.filter((l) => l.href !== '/' && l.href !== '/barber-card');

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-8">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <div className="group relative">
              <button
                type="button"
                aria-haspopup="true"
                className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-fg group-focus-within:text-fg"
              >
                Styles
                <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {/* CSS-only panel: opens on hover and on keyboard focus. The top padding bridges the gap so hover is not lost. */}
              <div className="invisible absolute left-0 top-full w-[560px] pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="grid grid-cols-2 gap-6 rounded-xl border border-border bg-surface p-4">
                  {STYLE_GROUPS.map((g) => (
                    <div key={g.title}>
                      <p className="px-3 text-xs font-medium text-muted">{g.title}</p>
                      <ul className="mt-2 space-y-0.5">
                        {g.pages.map((p) => (
                          <li key={p.slug}>
                            <Link href={`/${p.slug}`} className="block rounded-md px-3 py-2 transition-colors hover:bg-surface-2">
                              <span className="block text-sm font-medium">{p.name}</span>
                              <span className="block text-xs text-muted">{p.teaser}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {DESKTOP_NAV.map((l) => (
              <NavLink key={l.href} href={l.href}>
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link
            href="/barber-card"
            className="ml-2 hidden h-9 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-strong lg:inline-flex"
          >
            Make a barber card
          </Link>
          <MobileNav links={MAIN_NAV} styleLinks={styleLinks} />
        </div>
      </div>
    </header>
  );
}
