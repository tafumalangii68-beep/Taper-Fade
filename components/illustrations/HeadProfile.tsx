import type { CSSProperties } from 'react';
import type { IllustrationVariant } from '@/lib/styles';

/**
 * Original side-profile illustration showing where each taper starts.
 * Colors come from CSS variables (--ill-skin, --ill-hair, --ill-line) so it
 * adapts to light/dark mode. Pure SVG, no images.
 */

const HEAD =
  'M80 62C96 34 150 28 178 46C202 62 208 98 200 128C194 150 184 164 176 176L174 232H114V190C98 186 82 176 72 162C66 154 64 146 66 140C62 136 62 130 64 124L56 119L66 99C66 84 72 72 80 62Z';

const HAIR =
  'M40 0H240V176H178C162 158 154 140 152 122C150 104 128 96 124 106L122 130H114C110 108 102 80 84 58L40 40Z';

/** Linear tapers: [y where taper starts, y where it reaches skin tone]. */
const LINEAR: Partial<Record<IllustrationVariant, [number, number]>> = {
  low: [130, 176],
  mid: [106, 168],
  high: [80, 160],
  skin: [106, 146],
};

export const ILLUSTRATION_LABELS: Record<IllustrationVariant, string> = {
  low: 'Low taper: starts just above the ear and at the neckline',
  mid: 'Mid taper: starts around the middle of the ear',
  high: 'High taper: starts near the top of the head at the parietal ridge',
  drop: 'Drop taper: starts at the temple and curves down behind the ear',
  burst: 'Burst taper: fades in a semicircle around the ear, nape left long',
  temple: 'Temple taper: only the temples and the nape are tapered',
  skin: 'Skin taper: tapers down to bare skin at the bottom',
};

const skin: CSSProperties = { fill: 'var(--ill-skin)' };
const hair: CSSProperties = { fill: 'var(--ill-hair)' };
const stop = (opacity: number): CSSProperties => ({ stopColor: 'var(--ill-skin)', stopOpacity: opacity });
const faint: CSSProperties = { stroke: 'var(--ill-hair)', strokeOpacity: 0.35, fill: 'none' };

interface Props {
  variant: IllustrationVariant;
  className?: string;
  /** Unique suffix when the same variant appears more than once on a page. */
  uid?: string;
}

export function HeadProfile({ variant, className, uid = '' }: Props) {
  const id = `hp-${variant}${uid}`;
  const linear = LINEAR[variant];

  return (
    <svg viewBox="0 0 240 240" role="img" aria-labelledby={`${id}-t`} className={className} xmlns="http://www.w3.org/2000/svg">
      <title id={`${id}-t`}>{ILLUSTRATION_LABELS[variant]}</title>
      <defs>
        <clipPath id={`${id}-head`}>
          <path d={HEAD} />
        </clipPath>
        <clipPath id={`${id}-hair`}>
          <path d={HAIR} />
        </clipPath>
        <filter id={`${id}-soft`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        {linear && (
          <linearGradient id={`${id}-lin`} gradientUnits="userSpaceOnUse" x1="0" y1={linear[0]} x2="0" y2={linear[1]}>
            <stop offset="0" style={stop(0)} />
            <stop offset="1" style={stop(variant === 'skin' ? 1 : 0.92)} />
          </linearGradient>
        )}
        <linearGradient id={`${id}-drop`} gradientUnits="userSpaceOnUse" x1="0" y1="96" x2="0" y2="190">
          <stop offset="0" style={stop(0.15)} />
          <stop offset="1" style={stop(0.95)} />
        </linearGradient>
        <radialGradient id={`${id}-rad`}>
          <stop offset="0.35" style={stop(0.95)} />
          <stop offset="1" style={stop(0)} />
        </radialGradient>
      </defs>

      {/* Head + neck */}
      <path d={HEAD} style={skin} />

      <g clipPath={`url(#${id}-head)`}>
        <g clipPath={`url(#${id}-hair)`}>
          {/* Hair */}
          <rect width="240" height="240" style={hair} />

          {/* Taper overlays */}
          {linear && <rect x="0" y={linear[0]} width="240" height={240 - linear[0]} fill={`url(#${id}-lin)`} />}
          {variant === 'drop' && (
            <path d="M0 104L128 100C150 104 168 128 186 150L240 156V240H0Z" fill={`url(#${id}-drop)`} filter={`url(#${id}-soft)`} />
          )}
          {variant === 'burst' && <circle cx="140" cy="124" r="46" fill={`url(#${id}-rad)`} />}
          {variant === 'temple' && (
            <>
              <circle cx="118" cy="114" r="22" fill={`url(#${id}-rad)`} />
              <circle cx="176" cy="178" r="26" fill={`url(#${id}-rad)`} />
            </>
          )}
        </g>

        {/* Dashed marker where the taper starts */}
        <g style={{ stroke: 'var(--ill-line)', fill: 'none' }} strokeWidth="2.5" strokeDasharray="6 5" strokeLinecap="round">
          {linear && <line x1="100" y1={linear[0]} x2="215" y2={linear[0]} />}
          {variant === 'drop' && <path d="M108 102L128 100C150 104 168 128 190 152" />}
          {variant === 'burst' && <path d="M104 98A46 46 0 0 1 186 124A46 46 0 0 1 150 169" />}
          {variant === 'temple' && (
            <>
              <path d="M98 104A22 22 0 0 1 138 106" />
              <path d="M152 170A26 26 0 0 1 200 168" />
            </>
          )}
        </g>
      </g>

      {/* Ear */}
      <ellipse cx="138" cy="118" rx="10" ry="16" style={{ ...skin, stroke: 'var(--ill-hair)', strokeOpacity: 0.35 }} strokeWidth="2" />
      <path d="M136 108C142 110 142 124 136 128" style={faint} strokeWidth="2" />
      {/* Eye and brow */}
      <path d="M70 98L84 96" style={{ stroke: 'var(--ill-hair)' }} strokeWidth="3" strokeLinecap="round" />
      <circle cx="78" cy="105" r="2.5" style={hair} />
      {/* Outline */}
      <path d={HEAD} style={{ ...faint, strokeOpacity: 0.25 }} strokeWidth="2" />
    </svg>
  );
}
