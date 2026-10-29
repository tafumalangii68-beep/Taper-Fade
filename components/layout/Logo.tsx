import Link from 'next/link';
import { SITE_NAME } from '@/lib/site';

/** Monochrome mark + wordmark, shared by the header and footer. */
export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 text-[15px] font-semibold tracking-tight">
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-6 w-6 shrink-0">
        <rect width="32" height="32" rx="7" fill="var(--fg)" />
        <path d="M8 22h16M10 18h12M12 14h8M14 10h4" stroke="var(--bg)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      {SITE_NAME}
    </Link>
  );
}
