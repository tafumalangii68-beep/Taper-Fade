/**
 * Clipper guard reference. Lengths follow the common industry standard
 * (Wahl / Andis / Oster); individual brands vary by about ±0.5 mm.
 */
export interface Guard {
  id: string;
  label: string;
  mm: number;
  inches: string;
  looks: string;
  use: string;
}

export const GUARDS: Guard[] = [
  {
    id: 'skin',
    label: 'Skin / foil',
    mm: 0,
    inches: '0"',
    looks: 'Bare skin, no visible hair. Done with a foil shaver or razor.',
    use: 'The very bottom of a skin (bald) taper.',
  },
  {
    id: '0',
    label: '#0 (no guard)',
    mm: 0.8,
    inches: '1/32"',
    looks: 'Heavy stubble with the skin clearly showing through. Varies with the clipper lever (closed ≈ 0.5 mm, open ≈ 1.5 mm).',
    use: 'The lowest line of most tapers and crisp necklines.',
  },
  {
    id: '0.5',
    label: '#0.5',
    mm: 1.5,
    inches: '1/16"',
    looks: 'Very short with a visible shadow on the scalp.',
    use: 'Blending from #0 into #1 in the bottom of a taper.',
  },
  {
    id: '1',
    label: '#1',
    mm: 3,
    inches: '1/8"',
    looks: 'Short and even; scalp is visible under bright light.',
    use: 'The base guard of a classic taper, and buzz cuts.',
  },
  {
    id: '1.5',
    label: '#1.5',
    mm: 4.5,
    inches: '3/16"',
    looks: 'Short but with noticeable density.',
    use: 'A soft middle step between #1 and #2.',
  },
  {
    id: '2',
    label: '#2',
    mm: 6,
    inches: '1/4"',
    looks: 'Short, soft and full; scalp mostly hidden.',
    use: 'The upper blend of low tapers and conservative sides.',
  },
  {
    id: '3',
    label: '#3',
    mm: 10,
    inches: '3/8"',
    looks: 'Short-medium; hair starts to show its texture.',
    use: 'Where many tapers blend into the scissor or clipper-over-comb work.',
  },
  {
    id: '4',
    label: '#4',
    mm: 13,
    inches: '1/2"',
    looks: 'Medium-short; soft, touchable length.',
    use: 'Upper sides on longer, more conservative tapers.',
  },
  {
    id: '5',
    label: '#5',
    mm: 16,
    inches: '5/8"',
    looks: 'Medium length with clear texture and movement.',
    use: 'Longer sides, or the top of a short crop.',
  },
  {
    id: '6',
    label: '#6',
    mm: 19,
    inches: '3/4"',
    looks: 'Medium length that starts to lie flat or curl.',
    use: 'Top of a crew cut or a long, soft blend.',
  },
  {
    id: '7',
    label: '#7',
    mm: 22,
    inches: '7/8"',
    looks: 'Fuller medium length.',
    use: 'Clipper-cut tops and very gradual tapers.',
  },
  {
    id: '8',
    label: '#8',
    mm: 25,
    inches: '1"',
    looks: 'About an inch; the longest standard guard.',
    use: 'Even all-over clipper cuts and tops.',
  },
];

/** Guards offered on the barber card (bottom of the taper). */
export const CARD_GUARDS = GUARDS.filter((g) => ['skin', '0', '0.5', '1', '1.5', '2', '3', '4'].includes(g.id));

export function guardText(id: string): string {
  const g = GUARDS.find((x) => x.id === id);
  if (!g) return id;
  return g.id === 'skin' ? 'Skin (0 mm)' : `${g.label} – ${g.mm} mm / ${g.inches}`;
}
