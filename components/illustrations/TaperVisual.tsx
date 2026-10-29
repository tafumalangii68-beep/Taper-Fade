import Image from 'next/image';
import type { IllustrationVariant, PhotoSlot } from '@/lib/styles';
import { HeadProfile } from './HeadProfile';

interface Props {
  variant: IllustrationVariant;
  /** A licensed photo of the cut. When it has a `src`, it replaces the SVG drawing. */
  photo?: PhotoSlot;
  className?: string;
  uid?: string;
  /** Rendered width in CSS px, used to pick the right image size. */
  px: number;
  priority?: boolean;
}

/** Shows the real photo of a taper when one is available, otherwise the SVG head profile. */
export function TaperVisual({ variant, photo, className, uid, px, priority }: Props) {
  if (!photo?.src) return <HeadProfile variant={variant} uid={uid} className={className} />;
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={photo.width ?? 800}
      height={photo.height ?? 1000}
      sizes={`${px}px`}
      priority={priority}
      className={`rounded-xl object-cover ${className ?? ''}`}
    />
  );
}
