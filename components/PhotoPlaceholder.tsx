import Image from 'next/image';
import type { PhotoSlot } from '@/lib/styles';

/**
 * ====== PHOTO PLACEHOLDER ======
 * Spot reserved for YOUR OWN licensed photo. To show a photo, put the file in
 * /public/photos and set `src: '/photos/your-file.webp'` on the PhotoSlot in
 * lib/styles.ts (or pass `src` directly).
 *
 * Without a src, a dashed placeholder box is shown in development only. In
 * production nothing is rendered, so the live site never shows empty boxes.
 */
export function PhotoPlaceholder({ slot }: { slot: PhotoSlot }) {
  if (slot.src) {
    return (
      <figure className="overflow-hidden rounded-xl border border-border bg-surface">
        <Image src={slot.src} alt={slot.alt} width={800} height={1000} className="h-auto w-full object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
        <figcaption className="px-4 py-2 text-sm text-muted">{slot.caption}</figcaption>
      </figure>
    );
  }

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <figure
      data-photo-placeholder
      className="flex aspect-[4/5] flex-col items-center justify-center rounded-xl border-2 border-dashed border-accent/60 bg-accent-soft/40 p-6 text-center"
    >
      <span className="font-display text-lg text-accent">PHOTO PLACEHOLDER</span>
      <span className="mt-2 text-sm text-muted">Add your licensed photo: “{slot.caption}”</span>
      <span className="mt-1 text-xs text-muted">Set src in lib/styles.ts (dev only, hidden in production)</span>
    </figure>
  );
}
