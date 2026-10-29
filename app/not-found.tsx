import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-5xl font-semibold">Page not found</h1>
      <p className="mt-4 text-muted">That page has been trimmed. Try one of these instead:</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Taper fade guide
        </Link>
        <Link href="/barber-card" className="btn btn-ghost">
          Barber card
        </Link>
        <Link href="/clipper-guard-chart" className="btn btn-ghost">
          Guard chart
        </Link>
      </div>
    </div>
  );
}
