/**
 * Content model for every taper style.
 *
 * - TAPER_TYPES: the catalogue of taper variations used by the Finder quiz,
 *   the Barber Card generator and the homepage "types" grid.
 * - STYLE_PAGES: full page content. Each entry becomes a statically generated
 *   route at /{slug} via app/[slug]/page.tsx and StylePageTemplate.
 *
 * To add a new variation: add a TaperType (if it is a new cut), then add a
 * StylePage object with a unique slug. It is picked up automatically by the
 * route, sitemap, footer and "Related tapers" sections.
 */
import type { Faq } from './seo';

export type TaperId = 'low' | 'mid' | 'high' | 'drop' | 'burst' | 'temple' | 'skin';
export type IllustrationVariant = TaperId;

export interface TaperType {
  id: TaperId;
  name: string;
  /** Where the taper begins, in plain words. */
  startsAt: string;
  summary: string;
  /** Typical guard progression, bottom → top. */
  guards: string;
  /** How often to refresh it. */
  upkeep: string;
  /** 1 = very subtle, 5 = very bold. */
  boldness: 1 | 2 | 3 | 4 | 5;
  /** Where to read more (a style page or homepage anchor). */
  href: string;
  illustration: IllustrationVariant;
  /** Your own licensed photo of this cut. When set, it is shown instead of the SVG drawing. */
  photo?: PhotoSlot;
}

export interface StyleSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

/** A spot reserved for your own licensed photo. Set `src` (in /public) to show it. */
export interface PhotoSlot {
  src?: string;
  /** Intrinsic size of the photo; prevents layout shift. Defaults to 800×1000. */
  width?: number;
  height?: number;
  alt: string;
  caption: string;
}

export interface StylePage {
  slug: string;
  name: string;
  /** Which taper the Barber Card should pre-select from this page. */
  taperId: TaperId;
  illustration: IllustrationVariant;
  kind: 'height' | 'hair-type';
  seo: { title: string; description: string; h1: string };
  /** One-line teaser used on cards and in "Related tapers". */
  teaser: string;
  lead: string;
  quickFacts: { label: string; value: string }[];
  sections: StyleSection[];
  /** Copy-ready words to say to the barber. */
  barberScript: string;
  pros: string[];
  cons: string[];
  photos: PhotoSlot[];
  faqs: Faq[];
  related: string[];
}

/* ------------------------------------------------------------------ */
/* Taper catalogue                                                     */
/* ------------------------------------------------------------------ */

export const TAPER_TYPES: TaperType[] = [
  {
    id: 'low',
    name: 'Low Taper Fade',
    startsAt: 'Just above the ear and along the neckline',
    summary:
      'The shortest hair sits right at the bottom edge, so most of the length on the sides stays intact. Clean, subtle and office-friendly.',
    guards: '#0 or #0.5 at the bottom → #1 → #2 → #3/#4 or scissors',
    upkeep: 'Every 3–5 weeks',
    boldness: 2,
    href: '/low-taper-fade',
    illustration: 'low',
    photo: {
      src: '/photos/low-taper-fade-side.webp',
      width: 1200,
      height: 1097,
      alt: 'Side profile of a low taper fade on wavy dark hair, short around the ear and neckline with a textured top',
      caption: 'Low taper fade, side view',
    },
  },
  {
    id: 'mid',
    name: 'Mid Taper Fade',
    startsAt: 'Around the middle of the ear / temple',
    summary:
      'The all-rounder. Sharper than a low taper but still easy to wear anywhere, and it suits almost every hair type and face shape.',
    guards: '#0 → #1 → #1.5 → #2 → #3',
    upkeep: 'Every 2–4 weeks',
    boldness: 3,
    href: '/mid-taper-fade',
    illustration: 'mid',
    photo: {
      src: '/photos/mid-taper-fade-side.webp',
      width: 1200,
      height: 1117,
      alt: 'Side profile of a mid taper fade on wavy dark hair, tapered from the temple down behind the ear to the nape',
      caption: 'Mid taper fade, side view',
    },
  },
  {
    id: 'high',
    name: 'High Taper Fade',
    startsAt: 'Near the top of the head, at the parietal ridge',
    summary:
      'Most of the sides are taken short, which creates strong contrast with the top and adds visual height. Bold and sharp.',
    guards: '#0 or skin → #0.5 → #1 → #2, blended high',
    upkeep: 'Every 2–3 weeks',
    boldness: 5,
    href: '/high-taper-fade',
    illustration: 'high',
  },
  {
    id: 'drop',
    name: 'Drop Taper Fade',
    startsAt: 'Higher at the temple, curving down behind the ear',
    summary:
      'The taper line arcs down behind the ear toward the nape, following the shape of the head. Modern, with plenty of movement.',
    guards: '#0 → #1 → #2, following a curved line',
    upkeep: 'Every 2–4 weeks',
    boldness: 4,
    href: '/drop-taper-fade',
    illustration: 'drop',
  },
  {
    id: 'burst',
    name: 'Burst Taper Fade',
    startsAt: 'In a semicircle around the ear',
    summary:
      'Fades out from behind the ear in a half-circle, leaving length at the nape. Popular with curls, mohawks and frohawks.',
    guards: 'Skin or #0 around the ear → #1 → #2 radiating outwards',
    upkeep: 'Every 2–3 weeks',
    boldness: 4,
    href: '/burst-taper-fade',
    illustration: 'burst',
  },
  {
    id: 'temple',
    name: 'Temple (Brooklyn) Taper',
    startsAt: 'Only at the temples/sideburns and the nape',
    summary:
      'A minimal taper limited to the temples and neckline, often paired with a line-up. Keeps the shape of curly and coily hair intact.',
    guards: '#0 or #0.5 at the edges → #1 → natural length',
    upkeep: 'Every 3–6 weeks (edges every 1–2 weeks)',
    boldness: 1,
    href: '/#taper-fade-types',
    illustration: 'temple',
  },
  {
    id: 'skin',
    name: 'Skin (Bald) Taper',
    startsAt: 'Low or mid, taken down to bare skin',
    summary:
      'Any taper where the very bottom is shaved to skin with a foil shaver or razor. Maximum crispness, but it grows out fastest.',
    guards: 'Skin → #0 → #0.5 → #1 → #2',
    upkeep: 'Every 1–2 weeks',
    boldness: 5,
    href: '/#taper-fade-types',
    illustration: 'skin',
  },
];

export function getTaper(id: string): TaperType | undefined {
  return TAPER_TYPES.find((t) => t.id === id);
}

/* ------------------------------------------------------------------ */
/* Style pages                                                         */
/* ------------------------------------------------------------------ */

export const STYLE_PAGES: StylePage[] = [
  /* ---------------- LOW ---------------- */
  {
    slug: 'low-taper-fade',
    name: 'Low Taper Fade',
    taperId: 'low',
    illustration: 'low',
    kind: 'height',
    seo: {
      title: 'Low Taper Fade: What It Is, How to Ask & Who It Suits',
      description:
        'A low taper fade keeps length on the sides and tapers just above the ear and neckline. See guard numbers (mm and inches), who it suits and exactly what to tell your barber.',
      h1: 'Low Taper Fade',
    },
    teaser: 'Subtle, office-friendly and grows out gracefully.',
    lead:
      'A low taper fade takes the hair short only at the very bottom of the sides and back, starting just above the ear and along the neckline. Everything above that line keeps its length, so the cut looks neat and sharp without dramatic contrast. It is the safest taper to try first and the easiest to wear in a conservative workplace.',
    quickFacts: [
      { label: 'Starts', value: 'Just above the ear and at the neckline' },
      { label: 'Typical guards', value: '#0.5 (1.5 mm / 1/16") → #1 → #2 → #3' },
      { label: 'Upkeep', value: 'Every 3–5 weeks' },
      { label: 'Look', value: 'Subtle, clean, professional' },
    ],
    sections: [
      {
        id: 'what-is',
        heading: 'What is a low taper fade?',
        paragraphs: [
          'The word "taper" describes how hair gradually gets shorter as it moves down the head. In a low taper, that transition is compressed into a narrow band at the bottom: roughly the last 2–3 cm (about 1 inch) above the ear and around the nape. The result is a clean outline that frames the ear and neck without exposing much scalp.',
          'Because the shortest section is so small, a low taper looks tidy even when it is a few weeks old. That is why it is the go-to choice for people who cannot see a barber every fortnight.',
        ],
      },
      {
        id: 'who-suits',
        heading: 'Who suits a low taper fade?',
        paragraphs: [
          'A low taper works for nearly everyone, but it is especially flattering on longer or oblong face shapes, because it keeps width on the sides instead of adding height. It is also a great match for longer tops (quiffs, side parts, textured crops and slick-backs), where you want the focus to stay on the styling up top.',
        ],
        bullets: [
          'Strict or corporate dress codes',
          'Long or oblong faces that should not look longer',
          'Straight and wavy hair with medium to long tops',
          'Anyone trying a taper for the first time',
        ],
      },
      {
        id: 'styles',
        heading: 'Popular low taper combinations',
        paragraphs: [
          'Pair a low taper with a textured crop for an easy, matte look; with a side part for a classic business cut; or with a messy fringe for something younger and relaxed. On curly hair, a low taper with a sponge-twist top or defined curls keeps the shape rounded and natural.',
        ],
        bullets: [
          'Low taper + side part',
          'Low taper + textured French crop',
          'Low taper + curly top',
          'Low taper + slick back or quiff',
        ],
      },
      {
        id: 'maintenance',
        heading: 'Maintenance and growing out',
        paragraphs: [
          'Plan on a refresh every three to five weeks. Between visits, the neckline is the first area to look untidy; a quick tidy of the nape (your barber can do this in five minutes, often for less) buys you another week or two.',
          'When it grows out, a low taper simply turns into a short, natural back and sides. There is no awkward stripe of regrowth, which makes it the most forgiving taper height.',
        ],
      },
    ],
    barberScript:
      'Low taper fade, please. Start the taper just above the ear and at the neckline, #0.5 at the bottom blending into a #2, then scissor-blend into the top. Keep the length on the sides and leave about 7.5 cm (3 inches) on top.',
    pros: ['Professional and versatile', 'Grows out gracefully', 'Minimal scalp exposure', 'Suits most face shapes'],
    cons: ['Less contrast than mid or high tapers', 'Can look plain with a very short top'],
    photos: [
      { alt: 'Back view of a low taper fade showing a tapered neckline', caption: 'Low taper fade, back view' },
    ],
    faqs: [
      {
        q: 'How high does a low taper fade go?',
        a: 'A low taper usually starts about 1–2 cm (½–¾ inch) above the top of the ear and stays below the temple. At the back it is confined to the bottom of the neckline.',
      },
      {
        q: 'What guard number is a low taper fade?',
        a: 'Most barbers start with a #0.5 (1.5 mm / 1/16 inch) or #1 (3 mm / 1/8 inch) at the very bottom and blend up to a #2 or #3 (6–10 mm / ¼–⅜ inch). Ask for skin at the bottom if you want more contrast.',
      },
      {
        q: 'Is a low taper fade professional?',
        a: 'Yes. It is one of the most workplace-friendly haircuts because the short section is small and the overall outline stays conservative.',
      },
      {
        q: 'How long does a low taper fade last?',
        a: 'It looks sharp for about two to three weeks and still acceptable for four to five, making it the lowest-maintenance taper height.',
      },
      {
        q: 'Low taper vs low fade: what is the difference?',
        a: 'A low fade takes more of the sides short and usually blends to skin over a larger area. A low taper only shortens the edges (sideburns and neckline), so it is softer and more subtle.',
      },
    ],
    related: ['mid-taper-fade', 'drop-taper-fade', 'taper-fade-straight-hair', 'taper-vs-fade'],
  },

  /* ---------------- MID ---------------- */
  {
    slug: 'mid-taper-fade',
    name: 'Mid Taper Fade',
    taperId: 'mid',
    illustration: 'mid',
    kind: 'height',
    seo: {
      title: 'Mid Taper Fade: Guard Numbers, Styles & What to Ask For',
      description:
        'The mid taper fade starts around the middle of the ear for a balanced, sharp look. Learn the guard numbers in mm and inches, best styles, upkeep and how to ask your barber.',
      h1: 'Mid Taper Fade',
    },
    teaser: 'The balanced all-rounder that suits almost everyone.',
    lead:
      'A mid taper fade begins around the middle of the ear, roughly level with the temple, and blends down to the neckline. It sits between the subtle low taper and the dramatic high taper, giving you clear definition without losing too much length on the sides. If you are unsure which taper to pick, the mid taper is usually the right answer.',
    quickFacts: [
      { label: 'Starts', value: 'Mid-ear / temple level' },
      { label: 'Typical guards', value: '#0 (≈0.8 mm) → #1 → #1.5 → #2 → #3' },
      { label: 'Upkeep', value: 'Every 2–4 weeks' },
      { label: 'Look', value: 'Balanced, modern, sharp' },
    ],
    sections: [
      {
        id: 'what-is',
        heading: 'What is a mid taper fade?',
        paragraphs: [
          'In a mid taper, the barber draws an imaginary line around the head roughly halfway between the top of the ear and the parietal ridge (the widest point of the skull). Below the line, the hair is graded from short to shorter; above it, the sides stay longer and blend into the top.',
          'The taper band is wider than in a low taper, so the contrast is more noticeable, especially on dark or dense hair, but there is still plenty of hair left to soften the sides.',
        ],
      },
      {
        id: 'who-suits',
        heading: 'Who suits a mid taper fade?',
        paragraphs: [
          'The mid taper is the most versatile height. It slims a round face slightly, balances a square jaw and looks good on an oval face with almost any top. It also works across hair types: crisp on straight hair, textured on wavy hair and clean on curls and coils.',
        ],
        bullets: [
          'Smart-casual workplaces and everyday wear',
          'Oval, square and round faces',
          'Short to medium tops (2.5–7.5 cm / 1–3 inches)',
          'All hair types',
        ],
      },
      {
        id: 'styles',
        heading: 'Best styles to pair with a mid taper',
        paragraphs: [
          'Mid tapers suit textured crops, short quiffs, curly tops, twists, waves and brush-ups. For an extra detail, add a line-up (a sharp outline at the hairline and temples) or a shaved part line.',
        ],
        bullets: [
          'Mid taper + curly top',
          'Mid taper + textured quiff',
          'Mid taper + waves or twists',
          'Mid taper + crew cut',
        ],
      },
      {
        id: 'maintenance',
        heading: 'Maintenance tips',
        paragraphs: [
          'A mid taper stays crisp for about two weeks. After three to four weeks, the blend softens and the line becomes less defined. Booking every two to four weeks keeps it sharp.',
          'To extend the life of the cut, ask for a slightly longer guard at the bottom (#1 instead of #0). It grows out more evenly and you will notice the regrowth less.',
        ],
      },
    ],
    barberScript:
      'Mid taper fade, please. Start the taper around the middle of my ear, #0 at the bottom, blend through #1 and #2 up to a #3, and keep it soft into the top. Leave about 5 cm (2 inches) on top with some texture.',
    pros: ['Works on almost every face and hair type', 'Noticeable but not extreme', 'Easy to style', 'Good balance of sharpness and upkeep'],
    cons: ['Needs a refresh more often than a low taper', 'Regrowth line shows after 3–4 weeks'],
    photos: [
      { alt: 'Mid taper fade on curly hair', caption: 'Mid taper fade with curls' },
    ],
    faqs: [
      {
        q: 'Where does a mid taper fade start?',
        a: 'Around the middle of the ear, roughly level with the temple. It is higher than a low taper but stays below the parietal ridge, where a high taper begins.',
      },
      {
        q: 'What guards are used for a mid taper fade?',
        a: 'A common progression is #0 (about 0.8 mm / 1/32 inch) at the bottom, then #1 (3 mm / 1/8 inch), #1.5 (4.5 mm / 3/16 inch) and #2 (6 mm / ¼ inch), finishing with a #3 (10 mm / ⅜ inch) or scissors.',
      },
      {
        q: 'Is a mid taper fade good for round faces?',
        a: 'Yes. Taking the sides shorter from mid-ear down reduces width and draws attention upward, which makes a round face look slightly longer.',
      },
      {
        q: 'Mid taper or low taper: which is better?',
        a: 'Choose low if you want subtle and low maintenance, mid if you want a cleaner, more defined look and can visit the barber every two to four weeks.',
      },
      {
        q: 'Can you get a mid taper with long hair on top?',
        a: 'Yes, though the contrast is strongest with short to medium tops. With very long hair on top, a low taper often looks more balanced.',
      },
    ],
    related: ['low-taper-fade', 'high-taper-fade', 'taper-fade-curly-hair', 'burst-taper-fade'],
  },

  /* ---------------- HIGH ---------------- */
  {
    slug: 'high-taper-fade',
    name: 'High Taper Fade',
    taperId: 'high',
    illustration: 'high',
    kind: 'height',
    seo: {
      title: 'High Taper Fade: Bold Contrast, Guard Numbers & Upkeep',
      description:
        'A high taper fade starts near the parietal ridge for maximum contrast and height. Learn who it suits, which guards to use (mm and inches) and how often to get it refreshed.',
      h1: 'High Taper Fade',
    },
    teaser: 'Maximum contrast that adds height and sharpness.',
    lead:
      'A high taper fade starts close to the top of the head, at or just below the parietal ridge, and blends all the way down to the neckline. Most of the sides end up short, creating strong contrast with the hair on top. It is a bold, athletic look that adds visual height and makes any top style stand out.',
    quickFacts: [
      { label: 'Starts', value: 'At or just below the parietal ridge' },
      { label: 'Typical guards', value: 'Skin or #0 → #0.5 → #1 → #2' },
      { label: 'Upkeep', value: 'Every 2–3 weeks' },
      { label: 'Look', value: 'Bold, high-contrast, edgy' },
    ],
    sections: [
      {
        id: 'what-is',
        heading: 'What is a high taper fade?',
        paragraphs: [
          'The parietal ridge is the point where the side of your head curves into the top. A high taper begins there, so the gradient from short to long runs across almost the entire side of the head. Done well, the blend is smooth from top to bottom with no visible lines.',
          'Because so much hair is removed from the sides, the top looks fuller and taller. That makes the high taper a favorite for flat tops, pompadours, short crops and curly or coily tops with volume.',
        ],
      },
      {
        id: 'who-suits',
        heading: 'Who suits a high taper fade?',
        paragraphs: [
          'High tapers flatter round and square faces because they reduce width at the sides and lengthen the overall silhouette. They are less flattering on very long or narrow faces, where the extra height can exaggerate length; a low or mid taper is better there.',
        ],
        bullets: [
          'Round or square faces',
          'Relaxed or creative dress codes',
          'People who can visit a barber every 2–3 weeks',
          'Short to medium tops with volume',
        ],
      },
      {
        id: 'styles',
        heading: 'Styles that work with a high taper',
        paragraphs: [
          'Classic pairings include the high taper with a high top or flat top, a textured crop, a pompadour or a short curly top. Adding a hard part or line-up sharpens the look further.',
        ],
        bullets: ['High taper + flat top', 'High taper + pompadour', 'High taper + curly sponge top', 'High taper + crop with fringe'],
      },
      {
        id: 'maintenance',
        heading: 'Upkeep and growing out',
        paragraphs: [
          'A high taper is the most maintenance-heavy height. The large short area shows regrowth quickly, so plan to visit every two to three weeks.',
          'When you want to grow it out, move to a mid taper at the next appointment, then a low taper. This avoids an awkward in-between stage.',
        ],
      },
    ],
    barberScript:
      'High taper fade, please. Start the taper near the top of the sides, around the parietal ridge, #0 at the bottom blending smoothly through #1 and #2 into the top. Keep about 5 cm (2 inches) on top for volume.',
    pros: ['Strong, eye-catching contrast', 'Adds height to the silhouette', 'Makes the top look fuller', 'Great for volume styles'],
    cons: ['Highest maintenance', 'Shows more scalp', 'Can lengthen long faces', 'Less suited to strict dress codes'],
    photos: [
      { alt: 'Side view of a high taper fade with a high-volume top', caption: 'High taper fade, side view' },
      { alt: 'Back view of a high taper fade', caption: 'High taper fade, back view' },
    ],
    faqs: [
      {
        q: 'How high is a high taper fade?',
        a: 'It starts at or just below the parietal ridge, the widest point of the skull where the sides meet the top, usually 5–7 cm (2–3 inches) above the ear.',
      },
      {
        q: 'Is a high taper the same as a high fade?',
        a: 'They start at a similar height, but a high fade usually takes the whole side short (often to skin), while a high taper blends more gradually and keeps a little more length through the middle.',
      },
      {
        q: 'Does a high taper fade suit a round face?',
        a: 'Yes. Removing width at the sides and adding height on top makes a round face look longer and more defined.',
      },
      {
        q: 'How often should I get a high taper fade cut?',
        a: 'Every two to three weeks to keep the blend sharp. After four weeks most of the detail is lost.',
      },
      {
        q: 'Is a high taper fade professional?',
        a: 'In relaxed or creative workplaces, yes. In very conservative settings, a low or mid taper is usually the safer choice.',
      },
    ],
    related: ['mid-taper-fade', 'burst-taper-fade', 'drop-taper-fade', 'taper-vs-fade'],
  },

  /* ---------------- DROP ---------------- */
  {
    slug: 'drop-taper-fade',
    name: 'Drop Taper Fade',
    taperId: 'drop',
    illustration: 'drop',
    kind: 'height',
    seo: {
      title: 'Drop Taper Fade: The Curved Taper Explained',
      description:
        'A drop taper fade curves down behind the ear toward the nape. See how it differs from low and mid tapers, who it suits, guard numbers in mm and inches, and what to tell your barber.',
      h1: 'Drop Taper Fade',
    },
    teaser: 'A curved line that drops behind the ear for movement.',
    lead:
      'A drop taper fade starts higher at the temple, then curves downward behind the ear and finishes low at the nape. Instead of a straight horizontal line, the taper follows the natural curve of the head. The result looks modern and dynamic, and it shows off the shape of the cut from every angle.',
    quickFacts: [
      { label: 'Starts', value: 'Mid/high at the temple, dropping behind the ear' },
      { label: 'Typical guards', value: '#0 → #1 → #2 along a curved line' },
      { label: 'Upkeep', value: 'Every 2–4 weeks' },
      { label: 'Look', value: 'Modern, flowing, stylish' },
    ],
    sections: [
      {
        id: 'what-is',
        heading: 'What is a drop taper fade?',
        paragraphs: [
          'Picture a regular mid taper, then imagine the line dipping down in an arc behind the ear and toward the bottom of the neck. That arc is the "drop". It keeps more weight at the back of the head, which helps the head shape look rounded, while the sides stay crisp.',
          'Because the line is curved, a drop taper needs a barber who is confident with freehand blending. Ask to see examples of their work if it is your first time.',
        ],
      },
      {
        id: 'who-suits',
        heading: 'Who suits a drop taper fade?',
        paragraphs: [
          'The drop taper flatters most face shapes and is particularly good if the back of your head is flat, because the retained weight adds roundness. It works with wavy, curly and straight hair and pairs well with medium-length tops.',
        ],
        bullets: [
          'Flatter crowns that need shape at the back',
          'Square, oval and heart-shaped faces',
          'Medium tops (5–10 cm / 2–4 inches)',
          'Smart-casual to relaxed settings',
        ],
      },
      {
        id: 'styles',
        heading: 'Best styles with a drop taper',
        paragraphs: [
          'The drop taper shines with textured quiffs, messy fringes, curly tops and twists. It is also a common base for a drop taper with a beard, because the curve leads naturally into the beard line.',
        ],
        bullets: ['Drop taper + curly top', 'Drop taper + textured fringe', 'Drop taper + beard fade', 'Drop taper + twists'],
      },
      {
        id: 'maintenance',
        heading: 'Maintenance tips',
        paragraphs: [
          'Refresh every two to four weeks. The curve behind the ear is the first part to soften, so if you are stretching time between cuts, ask for a quick clean-up of that area and the neckline.',
        ],
      },
    ],
    barberScript:
      'Drop taper fade, please. Start the taper around the middle of the temple and curve it down behind the ear toward the nape. #0 at the bottom blending into a #2, and keep weight at the back. Leave around 7.5 cm (3 inches) on top.',
    pros: ['Follows the natural head shape', 'Adds roundness at the back', 'Modern and eye-catching', 'Pairs well with beards'],
    cons: ['Needs a skilled barber', 'Curve loses definition as it grows'],
    photos: [
      { alt: 'Side view of a drop taper fade showing the curve behind the ear', caption: 'Drop taper fade, curve behind the ear' },
      { alt: 'Drop taper fade with a curly top', caption: 'Drop taper fade with curls' },
    ],
    faqs: [
      {
        q: 'What is the difference between a drop taper and a mid taper?',
        a: 'A mid taper follows a roughly horizontal line around the head. A drop taper starts at a similar height at the temple, then curves down behind the ear so it finishes lower at the nape.',
      },
      {
        q: 'Is a drop taper fade good for a flat head?',
        a: 'Yes. Leaving more length at the back of the head creates a rounder shape, which helps disguise a flat crown or occipital area.',
      },
      {
        q: 'Can you combine a drop taper with a beard?',
        a: 'Absolutely. The curved line flows naturally into the sideburns, so a drop taper with a beard fade is a very popular combination.',
      },
      {
        q: 'What guard numbers are used for a drop taper fade?',
        a: 'Usually #0 (about 0.8 mm / 1/32 inch) at the bottom, blended through #1 (3 mm / 1/8 inch) and #2 (6 mm / ¼ inch), then into longer hair with scissors or a #3 (10 mm / ⅜ inch).',
      },
      {
        q: 'Is a drop taper fade hard to cut?',
        a: 'It is more technical than a straight taper because the line is curved. An experienced barber will make it look seamless.',
      },
    ],
    related: ['mid-taper-fade', 'burst-taper-fade', 'low-taper-fade', 'taper-fade-curly-hair'],
  },

  /* ---------------- BURST ---------------- */
  {
    slug: 'burst-taper-fade',
    name: 'Burst Taper Fade',
    taperId: 'burst',
    illustration: 'burst',
    kind: 'height',
    seo: {
      title: 'Burst Taper Fade: Styles, Mohawk Pairings & How to Ask',
      description:
        'The burst taper fade fades in a semicircle around the ear and keeps length at the nape. Learn who it suits, the best curly and mohawk pairings, guard numbers and upkeep.',
      h1: 'Burst Taper Fade',
    },
    teaser: 'A half-circle around the ear, with length at the back.',
    lead:
      'A burst taper fade fades out in a semicircle around the ear, as if the short hair is "bursting" outward from it. Unlike most tapers, it does not take the neckline short: hair is left longer at the back of the neck. It is a statement cut, closely associated with curly tops, mohawks and frohawks.',
    quickFacts: [
      { label: 'Starts', value: 'In a half-circle around the ear' },
      { label: 'Typical guards', value: 'Skin or #0 at the ear → #1 → #2 outwards' },
      { label: 'Upkeep', value: 'Every 2–3 weeks' },
      { label: 'Look', value: 'Bold, creative, textured' },
    ],
    sections: [
      {
        id: 'what-is',
        heading: 'What is a burst taper fade?',
        paragraphs: [
          'The barber centers the taper on the ear: the hair is shortest directly around it and gets longer as it radiates outward in a curve. The nape and the back of the head keep their length, which is what makes the burst taper look so distinctive from behind.',
          'Because the back stays longer, a burst taper is often worn with a mohawk or frohawk, where a strip of length runs from front to back.',
        ],
      },
      {
        id: 'who-suits',
        heading: 'Who suits a burst taper fade?',
        paragraphs: [
          'Burst tapers are best on curly, coily and thick wavy hair, which has the texture to hold the shape. They suit oval, heart and square faces. If you work somewhere conservative, this may be too bold; a low or mid taper is more discreet.',
        ],
        bullets: [
          'Curly, coily or thick wavy hair',
          'Mohawk, frohawk or curly-top styles',
          'Relaxed or creative dress codes',
          'People who enjoy a statement look',
        ],
      },
      {
        id: 'styles',
        heading: 'Burst taper style ideas',
        paragraphs: [
          'The burst taper mohawk is the classic version. It also looks great with a curly fringe, twists, or a short textured crop that keeps a little length at the nape.',
        ],
        bullets: ['Burst taper + mohawk', 'Burst taper + frohawk', 'Burst taper + curly fringe', 'Burst taper + twists'],
      },
      {
        id: 'maintenance',
        heading: 'Maintenance tips',
        paragraphs: [
          'The curve around the ear needs a refresh every two to three weeks to keep its shape. Keep the longer hair at the back moisturized and shaped so it looks deliberate rather than overgrown.',
        ],
      },
    ],
    barberScript:
      'Burst taper fade, please. Fade it in a half-circle around the ear, skin or #0 closest to the ear blending out to a #2, and keep the length at the back of the neck. Leave the top long for a mohawk shape.',
    pros: ['Very distinctive', 'Shows off curls and texture', 'Keeps length at the nape', 'Great for mohawks'],
    cons: ['Not ideal for strict dress codes', 'Needs frequent touch-ups', 'Less effective on fine straight hair'],
    photos: [
      { alt: 'Side view of a burst taper fade around the ear', caption: 'Burst taper fade, side view' },
      { alt: 'Burst taper fade mohawk from the back', caption: 'Burst taper mohawk, back view' },
    ],
    faqs: [
      {
        q: 'What makes a burst taper different from other tapers?',
        a: 'It fades in a semicircle centered on the ear and leaves the neckline long, whereas most tapers take the neckline short.',
      },
      {
        q: 'Is a burst taper the same as a burst fade?',
        a: 'They use the same semicircle shape. A burst fade is usually taken shorter (often to skin) over a larger area, while a burst taper is a smaller, softer version.',
      },
      {
        q: 'Does a burst taper work on straight hair?',
        a: 'It can, but it looks best on curly, coily or thick wavy hair, which holds the shape and contrast better.',
      },
      {
        q: 'How do I ask for a burst taper mohawk?',
        a: 'Ask for a burst taper around the ears, keeping length at the back of the neck, with a strip of longer hair running from the front hairline to the nape.',
      },
      {
        q: 'How often should a burst taper be touched up?',
        a: 'Every two to three weeks to keep the curve around the ear crisp.',
      },
    ],
    related: ['taper-fade-curly-hair', 'drop-taper-fade', 'high-taper-fade', 'mid-taper-fade'],
  },

  /* ---------------- CURLY ---------------- */
  {
    slug: 'taper-fade-curly-hair',
    name: 'Taper Fade for Curly Hair',
    taperId: 'mid',
    illustration: 'mid',
    kind: 'hair-type',
    seo: {
      title: 'Taper Fade for Curly Hair: Best Types, Styles & Care',
      description:
        'The best taper fades for curly and coily hair, from temple tapers to burst and drop tapers. How to ask your barber, which guards to use (mm and inches) and how to care for curls.',
      h1: 'Taper Fade for Curly Hair',
    },
    teaser: 'Keep your curls on top and the edges clean.',
    lead:
      'A taper fade is one of the best things you can do for curly hair. It removes bulk from the sides and neckline, so your curls stay the focus without the cut turning into a round, heavy shape as it grows. Whether your hair is loose and wavy-curly or tight and coily, there is a taper height that keeps it neat and defined.',
    quickFacts: [
      { label: 'Best tapers', value: 'Temple, burst, drop and mid' },
      { label: 'Typical guards', value: '#0.5 (1.5 mm) → #1 → #2 at the sides' },
      { label: 'Top length', value: '5–10 cm (2–4 inches) for defined curls' },
      { label: 'Upkeep', value: 'Every 2–4 weeks' },
    ],
    sections: [
      {
        id: 'why-curly',
        heading: 'Why taper fades work so well on curly hair',
        paragraphs: [
          'Curly hair grows outward as well as downward, so the sides can quickly start to puff out. A taper keeps the sides tight while the curls on top stay long, creating a flattering shape: narrow at the sides and fuller on top.',
          'Curls also hide blending marks well, so a taper on curly hair often looks smooth even as it grows out.',
        ],
      },
      {
        id: 'best-types',
        heading: 'Best taper types for curly hair',
        paragraphs: [
          'The right height depends on your curl pattern and how much contrast you want.',
        ],
        bullets: [
          'Temple (Brooklyn) taper: minimal, just the edges; perfect for afros and coily hair you want to keep full.',
          'Burst taper: semicircle around the ear, ideal with a curly mohawk or frohawk.',
          'Drop taper: curves behind the ear and keeps shape at the back.',
          'Mid taper: the balanced default for curly tops of 5–7.5 cm (2–3 inches).',
          'Low taper: the most subtle option for longer curls.',
        ],
      },
      {
        id: 'ask',
        heading: 'How to ask for a taper fade with curly hair',
        paragraphs: [
          'Tell your barber how long you want the curls on top after they dry, not when wet. Curls shrink, sometimes by half. Ask them to cut the top dry or to account for shrinkage. Mention whether you want a line-up, and whether the neckline should be tapered (natural) or blocked (squared off).',
        ],
      },
      {
        id: 'care',
        heading: 'Caring for curls with a taper',
        paragraphs: [
          'Use a sulfate-free shampoo two or three times a week and condition every wash. Apply a leave-in conditioner or curl cream while the hair is damp, then scrunch and let it air dry or use a diffuser. A sponge brush is great for defining shorter coils.',
          'Keep the tapered sides moisturized too; a light oil stops dryness and flaking on the shorter areas.',
        ],
      },
    ],
    barberScript:
      'Mid taper fade for curly hair, please. #0.5 at the bottom blending into a #2, tapered neckline, and keep about 7.5 cm (3 inches) of curls on top when dry. Please allow for shrinkage, and add a light line-up at the front.',
    pros: ['Controls bulk at the sides', 'Curls hide blending marks', 'Many height options', 'Grows out in a good shape'],
    cons: ['Top needs regular moisture and styling', 'Shrinkage can make length tricky to judge'],
    photos: [
      { alt: 'Curly hair with a mid taper fade, side view', caption: 'Curly top with mid taper' },
      { alt: 'Coily hair with a temple taper and line-up', caption: 'Temple taper on coily hair' },
    ],
    faqs: [
      {
        q: 'What is the best taper fade for curly hair?',
        a: 'A mid taper is the most versatile. Choose a temple taper for a fuller, natural look, a burst taper for a mohawk shape, or a drop taper to keep shape at the back.',
      },
      {
        q: 'How long should curly hair be on top for a taper fade?',
        a: 'Around 5–10 cm (2–4 inches) when dry works well. Remember that curls can shrink considerably as they dry.',
      },
      {
        q: 'Should curly hair be cut wet or dry?',
        a: 'Many barbers cut curly tops dry, or partly dry, so they can see the true length and shape. The tapered sides can be cut either way.',
      },
      {
        q: 'What is a Brooklyn or temple taper?',
        a: 'A minimal taper only at the temples (sideburns) and nape, often with a sharp line-up. It keeps the overall shape of curly or coily hair intact.',
      },
      {
        q: 'How do I stop my curly taper looking puffy?',
        a: 'Book a refresh every two to four weeks, moisturize the hair, and use a curl cream or gel to define curls instead of brushing them out when dry.',
      },
    ],
    related: ['burst-taper-fade', 'drop-taper-fade', 'mid-taper-fade', 'taper-fade-straight-hair'],
  },

  /* ---------------- STRAIGHT ---------------- */
  {
    slug: 'taper-fade-straight-hair',
    name: 'Taper Fade for Straight Hair',
    taperId: 'low',
    illustration: 'low',
    kind: 'hair-type',
    seo: {
      title: 'Taper Fade for Straight Hair: Styles, Guards & Tips',
      description:
        'How to get a taper fade that looks great on straight hair: the best taper heights, top styles, guard numbers in mm and inches, and products that add texture.',
      h1: 'Taper Fade for Straight Hair',
    },
    teaser: 'Clean blends and sharp top styles for straight hair.',
    lead:
      'Straight hair shows every detail of a taper, which is good news when the blend is smooth and a challenge when it is not. With the right height and a skilled barber, a taper fade on straight hair looks exceptionally clean. Pair it with a textured crop, a side part or a quiff and you have one of the most versatile cuts there is.',
    quickFacts: [
      { label: 'Best tapers', value: 'Low, mid and drop' },
      { label: 'Typical guards', value: '#1 (3 mm / 1/8") → #2 → #3' },
      { label: 'Top length', value: '5–10 cm (2–4 inches)' },
      { label: 'Upkeep', value: 'Every 3–4 weeks' },
    ],
    sections: [
      {
        id: 'why-straight',
        heading: 'Why straight hair needs a careful taper',
        paragraphs: [
          'On straight hair, light reflects evenly, so any jump between guard lengths is visible. Barbers usually use more gradual steps (including half guards like #0.5 and #1.5) and finish with clipper-over-comb or scissors to soften the blend.',
          'Straight hair also tends to stick out when cut too short on the sides, especially fine hair around the crown. Leaving a little more length (a #1 rather than skin) avoids patchiness.',
        ],
      },
      {
        id: 'best-types',
        heading: 'Best taper types for straight hair',
        paragraphs: ['Straight hair suits most tapers, but these are the most reliable:'],
        bullets: [
          'Low taper: classic and professional; ideal with side parts and slick backs.',
          'Mid taper: a sharper look for textured crops and short quiffs.',
          'Drop taper: adds shape at the back and movement to straight styles.',
          'High taper: works with thick straight hair and short crops, but shows more scalp.',
        ],
      },
      {
        id: 'styling',
        heading: 'Styling straight hair with a taper',
        paragraphs: [
          'Straight hair can look flat, so texture matters. Blow-dry with a little sea-salt spray for volume, then work in a matte clay or paste with your fingers. For a sleek finish, use a pomade and a fine comb.',
        ],
        bullets: ['Textured crop + matte clay', 'Side part + light pomade', 'Quiff + blow-dry and paste', 'Slick back + water-based pomade'],
      },
      {
        id: 'maintenance',
        heading: 'Maintenance',
        paragraphs: [
          'Straight hair shows regrowth sooner than curly hair, so plan on a cut every three to four weeks. If your hair is fine, avoid going to skin; it can look patchy as it grows.',
        ],
      },
    ],
    barberScript:
      'Low taper fade for straight hair, please. #1 at the bottom, blending through #1.5 and #2 into a #3, with a soft scissor blend. Keep about 7.5 cm (3 inches) on top with texture for a crop or side part.',
    pros: ['Very clean, defined result', 'Huge range of top styles', 'Easy to style with products'],
    cons: ['Blending mistakes are more visible', 'Can look flat without texture', 'Fine hair can look patchy if cut too short'],
    photos: [
      { alt: 'Straight hair with a low taper fade and side part', caption: 'Low taper with side part' },
      { alt: 'Straight hair textured crop with mid taper', caption: 'Textured crop with mid taper' },
    ],
    faqs: [
      {
        q: 'Does a taper fade look good on straight hair?',
        a: 'Yes. Straight hair shows a clean, precise blend, which makes taper fades look especially sharp when done well.',
      },
      {
        q: 'What taper height is best for straight hair?',
        a: 'Low and mid tapers are the most popular. A low taper is best for professional styles; a mid taper gives more contrast with textured crops.',
      },
      {
        q: 'Should I go to skin with straight hair?',
        a: 'Only if your hair is thick. Fine straight hair can look patchy at skin level, so a #0.5 or #1 (1.5–3 mm / 1/16–1/8 inch) at the bottom is safer.',
      },
      {
        q: 'How do I add texture to straight hair with a taper?',
        a: 'Use sea-salt spray before blow-drying, then a matte clay or paste. Ask your barber to point-cut the top for extra texture.',
      },
      {
        q: 'How often should I cut a straight-hair taper?',
        a: 'Every three to four weeks. Straight hair shows regrowth more quickly than curly hair.',
      },
    ],
    related: ['low-taper-fade', 'mid-taper-fade', 'drop-taper-fade', 'taper-fade-curly-hair'],
  },
];

export function getStylePage(slug: string): StylePage | undefined {
  return STYLE_PAGES.find((p) => p.slug === slug);
}

/** Pages for a "Related tapers" block; falls back to other height pages. */
/**
 * Photo for a style page's main visual. Hair-type pages (curly, straight) only get
 * one once you add a photo showing that hair type, so a wavy-hair photo never
 * stands in for curls.
 */
export function getPagePhoto(page: StylePage): PhotoSlot | undefined {
  return page.kind === 'height' ? getTaper(page.taperId)?.photo : undefined;
}

export function getRelated(slugs: string[], exclude: string): StylePage[] {
  const picked = slugs.map(getStylePage).filter((p): p is StylePage => !!p && p.slug !== exclude);
  return picked.length ? picked : STYLE_PAGES.filter((p) => p.slug !== exclude).slice(0, 4);
}
