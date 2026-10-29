import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/site';

export const alt = `${SITE_NAME}: ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Site-wide Open Graph / Twitter card image, generated at build time. */
export default function OpenGraphImage() {
  const bars = [520, 440, 360, 280, 200];
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#161616',
          color: '#f2eee8',
          padding: 72,
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 700 }}>
          <div style={{ fontSize: 28, color: '#e8a160', letterSpacing: 4, textTransform: 'uppercase' }}>{SITE_NAME}</div>
          <div style={{ fontSize: 108, fontWeight: 800, lineHeight: 1, marginTop: 20 }}>Taper Fade</div>
          <div style={{ fontSize: 36, color: '#b5aea4', marginTop: 28, lineHeight: 1.3 }}>Finder quiz · Barber card · Guard chart (mm and inches)</div>
        </div>
        {/* Abstract taper: bars getting shorter toward the bottom */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', gap: 22, flex: 1 }}>
          {bars.map((w, i) => (
            <div key={w} style={{ width: w * 0.65, height: 34, borderRadius: 17, background: '#e8a160', opacity: 1 - i * 0.17 }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
