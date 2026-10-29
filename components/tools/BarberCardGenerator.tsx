'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { HeadProfile } from '@/components/illustrations/HeadProfile';
import { CARD_GUARDS, guardText } from '@/lib/guards';
import { TAPER_TYPES, getTaper, type TaperId } from '@/lib/styles';
import { SITE_NAME } from '@/lib/site';

type Height = 'low' | 'mid' | 'high';
type Neckline = 'tapered' | 'blocked' | 'rounded';

const HEIGHTS: { value: Height; label: string }[] = [
  { value: 'low', label: 'Low: just above the ear' },
  { value: 'mid', label: 'Mid: middle of the ear / temple' },
  { value: 'high', label: 'High: parietal ridge (top of the sides)' },
];

const TOP_LENGTHS = [
  'Very short: 1.5 cm / 0.5"',
  'Short: 2.5 cm / 1"',
  'Short-medium: 4 cm / 1.5"',
  'Medium: 5 cm / 2"',
  'Medium-long: 7.5 cm / 3"',
  'Long: 10 cm / 4"',
  'Extra long: 12.5 cm+ / 5"+',
];

const NECKLINES: { value: Neckline; label: string }[] = [
  { value: 'tapered', label: 'Tapered (natural fade)' },
  { value: 'blocked', label: 'Blocked (squared off)' },
  { value: 'rounded', label: 'Rounded' },
];

const DEFAULT_HEIGHT: Record<TaperId, Height> = { low: 'low', mid: 'mid', high: 'high', drop: 'mid', burst: 'mid', temple: 'low', skin: 'mid' };

interface CardState {
  taper: TaperId;
  height: Height;
  guard: string;
  top: string;
  neckline: Neckline;
  lineUp: boolean;
  beard: boolean;
  notes: string;
}

const INITIAL: CardState = {
  taper: 'mid',
  height: 'mid',
  guard: '0.5',
  top: TOP_LENGTHS[3],
  neckline: 'tapered',
  lineUp: false,
  beard: false,
  notes: '',
};

/** Fixed card palette so the PNG looks identical in light and dark mode. */
const CARD_VARS = {
  '--ill-skin': '#d9b48e',
  '--ill-hair': '#141210',
  '--ill-line': '#e8a160',
} as CSSProperties;

function toText(s: CardState): string {
  const taper = getTaper(s.taper)!;
  return [
    `BARBER CARD (${SITE_NAME})`,
    `Cut: ${taper.name}`,
    `Taper starts: ${HEIGHTS.find((h) => h.value === s.height)!.label}`,
    `Shortest guard on sides: ${guardText(s.guard)}`,
    `Top length: ${s.top}`,
    `Neckline: ${NECKLINES.find((n) => n.value === s.neckline)!.label}`,
    `Line-up: ${s.lineUp ? 'Yes' : 'No'}`,
    `Beard fade: ${s.beard ? 'Yes' : 'No'}`,
    s.notes.trim() ? `Notes: ${s.notes.trim()}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

export function BarberCardGenerator() {
  const [s, setS] = useState<CardState>(INITIAL);
  const [status, setStatus] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  // Pre-fill from the URL, e.g. /barber-card?taper=drop&g=1 (from the Finder or a shared link).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const taper = p.get('taper');
    setS((prev) => {
      const next = { ...prev };
      if (taper && getTaper(taper)) {
        next.taper = taper as TaperId;
        next.height = DEFAULT_HEIGHT[next.taper];
      }
      const h = p.get('h');
      if (h && HEIGHTS.some((x) => x.value === h)) next.height = h as Height;
      const g = p.get('g');
      if (g && CARD_GUARDS.some((x) => x.id === g)) next.guard = g;
      const t = Number(p.get('t'));
      if (Number.isInteger(t) && TOP_LENGTHS[t]) next.top = TOP_LENGTHS[t];
      const n = p.get('n');
      if (n && NECKLINES.some((x) => x.value === n)) next.neckline = n as Neckline;
      if (p.get('lu') === '1') next.lineUp = true;
      if (p.get('bf') === '1') next.beard = true;
      return next;
    });
  }, []);

  const set = <K extends keyof CardState>(key: K, value: CardState[K]) => setS((prev) => ({ ...prev, [key]: value }));
  const taper = getTaper(s.taper)!;
  // Straight-line tapers follow the chosen height; curved/special ones keep their own diagram.
  const illustration = s.taper === 'low' || s.taper === 'mid' || s.taper === 'high' ? s.height : taper.illustration;
  const flash = (msg: string) => {
    setStatus(msg);
    window.setTimeout(() => setStatus(''), 3000);
  };

  async function downloadPng() {
    if (!cardRef.current) return;
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `barber-card-${s.taper}-taper.png`;
      a.click();
      flash('PNG downloaded.');
    } catch {
      flash('Sorry, the image could not be created. Try “Copy as text” instead.');
    }
  }

  async function copyText() {
    try {
      await navigator.clipboard.writeText(toText(s));
      flash('Card copied to clipboard.');
    } catch {
      flash('Copy failed. Select the text manually.');
    }
  }

  async function shareLink() {
    const p = new URLSearchParams({
      taper: s.taper,
      h: s.height,
      g: s.guard,
      t: String(TOP_LENGTHS.indexOf(s.top)),
      n: s.neckline,
      lu: s.lineUp ? '1' : '0',
      bf: s.beard ? '1' : '0',
    });
    const url = `${window.location.origin}${window.location.pathname}?${p}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My barber card', text: toText(s), url });
      } catch {
        /* share sheet dismissed */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      flash('Share link copied.');
    } catch {
      flash('Could not copy the link. Try “Copy as text” instead.');
    }
  }

  function print() {
    document.body.classList.add('printing-card');
    const done = () => {
      document.body.classList.remove('printing-card');
      window.removeEventListener('afterprint', done);
    };
    window.addEventListener('afterprint', done);
    window.print();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,440px)]">
      {/* ---------- Form ---------- */}
      <form className="space-y-5 rounded-2xl border border-border bg-surface p-5 sm:p-7" onSubmit={(e) => e.preventDefault()}>
        <Field label="Taper type" htmlFor="bc-taper">
          <select
            id="bc-taper"
            className="field"
            value={s.taper}
            onChange={(e) => {
              const id = e.target.value as TaperId;
              setS((prev) => ({ ...prev, taper: id, height: DEFAULT_HEIGHT[id] }));
            }}
          >
            {TAPER_TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Where should the taper start?" htmlFor="bc-height">
          <select id="bc-height" className="field" value={s.height} onChange={(e) => set('height', e.target.value as Height)}>
            {HEIGHTS.map((h) => (
              <option key={h.value} value={h.value}>
                {h.label}
              </option>
            ))}
          </select>
        </Field>

        <fieldset>
          <legend className="mb-2 font-semibold">Shortest clipper guard on the sides</legend>
          <div className="flex flex-wrap gap-2">
            {CARD_GUARDS.map((g) => (
              <label
                key={g.id}
                className={`cursor-pointer rounded-lg border px-3 py-2 text-sm has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-accent ${
                  s.guard === g.id ? 'border-accent bg-accent-soft font-semibold' : 'border-border hover:border-accent'
                }`}
              >
                <input type="radio" name="guard" value={g.id} checked={s.guard === g.id} onChange={() => set('guard', g.id)} className="sr-only" />
                {g.id === 'skin' ? 'Skin' : `#${g.id}`}
                <span className="block text-xs text-muted">
                  {g.mm} mm / {g.inches}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <Field label="Length on top" htmlFor="bc-top">
          <select id="bc-top" className="field" value={s.top} onChange={(e) => set('top', e.target.value)}>
            {TOP_LENGTHS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>

        <fieldset>
          <legend className="mb-2 font-semibold">Neckline</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {NECKLINES.map((n) => (
              <label key={n.value} className="flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm has-[:checked]:border-accent has-[:checked]:bg-accent-soft">
                <input type="radio" name="neckline" value={n.value} checked={s.neckline === n.value} onChange={() => set('neckline', n.value)} className="accent-[var(--accent)]" />
                {n.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-2 sm:grid-cols-2">
          <Toggle label="Line-up (sharp hairline edges)" checked={s.lineUp} onChange={(v) => set('lineUp', v)} />
          <Toggle label="Beard fade" checked={s.beard} onChange={(v) => set('beard', v)} />
        </div>

        <Field label="Extra notes (optional)" htmlFor="bc-notes">
          <textarea id="bc-notes" className="field min-h-[88px]" maxLength={140} value={s.notes} onChange={(e) => set('notes', e.target.value)} placeholder="e.g. Keep the fringe, add texture on top" />
          <span className="mt-1 block text-right text-xs text-muted">{s.notes.length}/140</span>
        </Field>
      </form>

      {/* ---------- Card preview ---------- */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div id="barber-card" ref={cardRef} style={CARD_VARS} className="overflow-hidden rounded-2xl bg-[#1b1a19] text-[#f2eee8] shadow-xl">
          <div className="flex items-center justify-between bg-[#e8a160] px-5 py-3 text-[#1a1209]">
            <span className="font-display text-lg font-semibold uppercase tracking-wider">Barber Card</span>
            <span className="text-xs font-semibold">{SITE_NAME}</span>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-4">
              <HeadProfile variant={illustration} uid="-card" className="h-28 w-28 shrink-0 rounded-xl bg-[#2a2928]" />
              <div>
                <p className="text-xs uppercase tracking-wider text-[#b5aea4]">The cut</p>
                <p className="font-display text-2xl font-semibold leading-tight">{taper.name}</p>
              </div>
            </div>
            <dl className="mt-5 divide-y divide-[#3a3836] text-sm">
              <Row k="Taper starts" v={HEIGHTS.find((h) => h.value === s.height)!.label} />
              <Row k="Shortest guard" v={guardText(s.guard)} />
              <Row k="Top length" v={s.top} />
              <Row k="Neckline" v={NECKLINES.find((n) => n.value === s.neckline)!.label} />
              <Row k="Line-up" v={s.lineUp ? 'Yes' : 'No'} />
              <Row k="Beard fade" v={s.beard ? 'Yes' : 'No'} />
              {s.notes.trim() && <Row k="Notes" v={s.notes.trim()} />}
            </dl>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button type="button" onClick={downloadPng} className="btn btn-primary">
            Download PNG
          </button>
          <button type="button" onClick={copyText} className="btn btn-ghost">
            Copy as text
          </button>
          <button type="button" onClick={shareLink} className="btn btn-ghost">
            Share link
          </button>
          <button type="button" onClick={print} className="btn btn-ghost">
            Print
          </button>
        </div>
        <p role="status" aria-live="polite" className="mt-3 min-h-[1.5rem] text-sm text-accent">
          {status}
        </p>
      </div>
    </div>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block font-semibold">
        {label}
      </label>
      {children}
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg border border-border px-3 py-2 has-[:checked]:border-accent has-[:checked]:bg-accent-soft">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />
      <span className="text-sm font-medium">{label}</span>
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 py-2">
      <dt className="text-[#b5aea4]">{k}</dt>
      <dd className="text-right font-semibold">{v}</dd>
    </div>
  );
}
