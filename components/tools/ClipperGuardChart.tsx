'use client';

import { useState } from 'react';
import { GUARDS } from '@/lib/guards';

const MAX_MM = GUARDS[GUARDS.length - 1].mm;

export function ClipperGuardChart() {
  const [selected, setSelected] = useState('1');
  const [unitFirst, setUnitFirst] = useState<'mm' | 'in'>('mm');
  const g = GUARDS.find((x) => x.id === selected)!;

  const fmt = (mm: number, inches: string) => (unitFirst === 'mm' ? `${mm} mm · ${inches}` : `${inches} · ${mm} mm`);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">Select a guard to see how it looks.</p>
        <div role="group" aria-label="Unit shown first" className="inline-flex rounded-lg border border-border bg-surface p-1">
          {(['mm', 'in'] as const).map((u) => (
            <button
              key={u}
              type="button"
              aria-pressed={unitFirst === u}
              onClick={() => setUnitFirst(u)}
              className={`min-h-[40px] rounded-md px-4 text-sm font-semibold ${unitFirst === u ? 'bg-accent text-accent-fg' : 'text-muted hover:text-fg'}`}
            >
              {u === 'mm' ? 'Millimeters first' : 'Inches first'}
            </button>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <div aria-live="polite" className="rounded-xl border border-border bg-surface p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-display text-3xl font-semibold">{g.label}</p>
          <p className="text-lg font-medium text-muted">{fmt(g.mm, g.inches)}</p>
        </div>
        <p className="mt-3">{g.looks}</p>
        <p className="mt-1 text-sm text-muted">Common use: {g.use}</p>
        <GuardVisual mm={g.mm} />
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <caption className="sr-only">Clipper guard numbers with lengths in millimeters and inches</caption>
          <thead className="bg-surface-2">
            <tr>
              <th scope="col" className="px-4 py-3">Guard</th>
              <th scope="col" className="px-4 py-3">{unitFirst === 'mm' ? 'Millimeters' : 'Inches'}</th>
              <th scope="col" className="px-4 py-3">{unitFirst === 'mm' ? 'Inches' : 'Millimeters'}</th>
              <th scope="col" className="px-4 py-3">Relative length</th>
              <th scope="col" className="px-4 py-3">Looks like</th>
            </tr>
          </thead>
          <tbody>
            {GUARDS.map((row) => {
              const active = row.id === selected;
              return (
                <tr key={row.id} className={`border-t border-border ${active ? 'bg-accent-soft' : 'bg-surface'}`}>
                  <th scope="row" className="px-4 py-2">
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelected(row.id)}
                      className="min-h-[40px] w-full rounded-md text-left font-semibold hover:text-accent"
                    >
                      {row.label}
                    </button>
                  </th>
                  <td className="px-4 py-2 tabular-nums">{unitFirst === 'mm' ? `${row.mm} mm` : row.inches}</td>
                  <td className="px-4 py-2 tabular-nums">{unitFirst === 'mm' ? row.inches : `${row.mm} mm`}</td>
                  <td className="px-4 py-2">
                    <div className="h-2 w-28 rounded-full bg-surface-2" aria-hidden="true">
                      <div className="h-2 rounded-full bg-accent" style={{ width: `${Math.max(3, (row.mm / MAX_MM) * 100)}%` }} />
                    </div>
                  </td>
                  <td className="px-4 py-2 text-muted">{row.looks}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** A row of "hair strands" whose height scales with the guard length. */
function GuardVisual({ mm }: { mm: number }) {
  const h = 6 + (mm / MAX_MM) * 64;
  return (
    <svg viewBox="0 0 300 90" className="mt-5 h-24 w-full max-w-md" aria-hidden="true">
      <rect x="0" y="74" width="300" height="16" rx="4" style={{ fill: 'var(--ill-skin)' }} />
      {Array.from({ length: 30 }, (_, i) => (
        <line
          key={i}
          x1={6 + i * 10}
          y1={74}
          x2={8 + i * 10 + (i % 2 ? 2 : -2)}
          y2={74 - (mm === 0 ? 0 : h)}
          style={{ stroke: 'var(--ill-hair)' }}
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
