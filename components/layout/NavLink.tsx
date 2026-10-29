'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/** Header link that marks itself as the current page. */
export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const active = usePathname() === href;
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${active ? 'text-fg' : 'text-muted hover:text-fg'}`}
    >
      {children}
    </Link>
  );
}
