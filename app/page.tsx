import type { Metadata } from 'next';
import Link from 'next/link';
import { AdSlot } from '@/components/AdSlot';
import { HeadProfile } from '@/components/illustrations/HeadProfile';
import { JsonLd } from '@/components/seo/JsonLd';
import { Faq } from '@/components/seo/Faq';
import { RelatedTapers } from '@/components/style/RelatedTapers';
import { TaperFinder } from '@/components/tools/TaperFinder';
import { buildMetadata, howToJsonLd, organizationJsonLd, websiteJsonLd, type Faq as FaqItem, type HowToStep } from '@/lib/seo';
import { STYLE_PAGES, TAPER_TYPES } from '@/lib/styles';

export const metadata: Metadata = buildMetadata({
  title: 'Taper Fade: Free Finder Quiz, Types & How to Ask Your Barber',
  description:
    'Find your perfect taper fade with a free 6-question quiz. Compare low, mid, high, drop and burst tapers, see guard numbers in mm and inches, and make a barber card.',
  path: '/',
  absoluteTitle: true,
});

const HOW_TO_STEPS: HowToStep[] = [
  { name: 'Choose the taper height', text: 'Decide where the taper should start: low (just above the ear), mid (middle of the ear) or high (parietal ridge). Drop and burst tapers follow a curve instead of a straight line.' },
  { name: 'Pick the shortest guard', text: 'Tell the barber what the bottom of the taper should be: skin, #0 (about 0.8 mm / 1/32 inch), #0.5 (1.5 mm / 1/16 inch) or #1 (3 mm / 1/8 inch).' },
  { name: 'Say how much to leave on top', text: 'Give a length in centimeters and inches, for example 5 cm (2 inches), and say whether you want texture, a part or a fringe.' },
  { name: 'Choose the neckline and edges', text: 'Ask for a tapered, blocked or rounded neckline, and say whether you want a line-up at the hairline and a beard fade.' },
  { name: 'Show a reference', text: 'Show a barber card or a reference photo of a similar hair type, then confirm the plan before the clippers start.' },
];

const HOME_FAQS: FaqItem[] = [
  { q: 'What is a taper fade?', a: 'A taper fade is a haircut where the hair on the sides and back gradually gets shorter toward the ear and neckline, blending smoothly into longer hair on top. The shortest section is usually limited to the sideburns and the nape.' },
  { q: 'What is the difference between a taper and a fade?', a: 'A taper only shortens the edges (sideburns and neckline) and keeps more length on the sides. A fade takes a larger area of the sides and back very short, often down to skin, for more contrast.' },
  { q: 'Which taper fade is best for beginners?', a: 'A low or mid taper. Both look clean, suit most face shapes and hair types, and are easy to wear at work. A low taper is also the easiest to grow out.' },
  { q: 'What number is a taper fade?', a: 'There is no single number. Most tapers start with a #0 (about 0.8 mm / 1/32 inch), #0.5 (1.5 mm / 1/16 inch) or #1 (3 mm / 1/8 inch) at the bottom and blend up to a #2–#4 (6–13 mm / ¼–½ inch).' },
  { q: 'How long does a taper fade last?', a: 'A low taper looks good for three to five weeks; mid tapers for two to four; high, burst and skin tapers for one to three weeks before the blend softens.' },
  { q: 'Is a taper fade professional?', a: 'Yes. Low and mid tapers are among the most office-friendly haircuts because they keep a neat, conservative outline. High, burst and skin tapers are bolder.' },
  { q: 'Can you get a taper fade with long hair on top?', a: 'Yes. Pair longer tops with a low or drop taper so the sides stay neat without creating too much contrast.' },
  { q: 'How do I ask for a taper fade?', a: 'Tell the barber the taper height (low, mid or high), the shortest guard, how much to leave on top, the neckline shape and whether you want a line-up. A barber card makes this easy.' },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[websiteJsonLd(), organizationJsonLd()]} />

      {/* ---------- Hero + Finder ---------- */}
      <section className="border-b border-border bg-gradient-to-b from-surface-2 to-bg">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:py-14 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">Free tool + complete guide</p>
            <h1 className="mt-2 font-display text-5xl font-semibold leading-none sm:text-6xl">Taper Fade</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              A taper fade is the cleanest way to sharpen any haircut: short, gradual edges at the sideburns and neckline that blend into longer hair on top. Answer six quick questions to find the
              taper that suits your hair, face shape and lifestyle, then turn it into a barber card so you get exactly what you asked for.
            </p>
            <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
              {['Free, no sign-up', 'Every taper type explained', 'Guard sizes in mm and inches', 'Printable barber card'].map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-accent">
                    ✓
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div id="taper-fade-finder" className="scroll-mt-20">
            <h2 className="sr-only">Taper Fade Finder quiz</h2>
            <TaperFinder />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <nav aria-label="On this page" className="rounded-xl border border-border bg-surface p-5">
          <p className="font-semibold">On this page</p>
          <ol className="mt-2 grid list-decimal gap-1 pl-5 text-sm sm:grid-cols-2">
            {[
              ['what-is-a-taper-fade', 'What is a taper fade?'],
              ['taper-vs-fade', 'Taper vs fade'],
              ['taper-fade-types', 'Types of taper fade'],
              ['taper-fade-hair-types', 'Taper fade by hair type'],
              ['how-to-ask-your-barber', 'How to ask your barber'],
              ['clipper-guards', 'Clipper guard numbers'],
              ['maintenance', 'Maintenance and styling'],
              ['faq', 'FAQ'],
            ].map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="hover:text-accent hover:underline">
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="prose-guide mt-6">
          <section aria-labelledby="what-is-a-taper-fade">
            <h2 id="what-is-a-taper-fade">What is a taper fade?</h2>
            <p>
              A <strong>taper fade</strong> is a haircut in which the hair on the sides and back gets gradually shorter as it moves down toward the ears and the neckline. At the very bottom the hair
              is cut close, sometimes down to the skin, and it blends smoothly upward into longer hair. The result is a tidy outline that frames the face and neck without the stark look of a
              buzz cut.
            </p>
            <p>
              The key word is <em>gradual</em>. A well-executed taper has no visible lines between clipper lengths. Barbers achieve that by working through a sequence of guards (for example
              #0 → #1 → #2 → #3) and then blending the transitions with the clipper lever, clipper-over-comb or scissors. Because only the edges are taken really short, a taper looks clean
              and finished even on someone who prefers to keep plenty of length on the sides.
            </p>
            <p>
              Taper fades have become one of the most requested cuts in barbershops across the USA, UK, Canada and Australia because they are so adaptable. They pair with almost any top:
              textured crops, quiffs, side parts, curls, twists, waves, afros, mohawks and slick-backs. They work on straight, wavy, curly and coily hair. And by changing just one variable,
              the height where the taper starts, you can make the same cut look conservative enough for a boardroom or bold enough for a festival.
            </p>
          </section>

          <section aria-labelledby="taper-vs-fade">
            <h2 id="taper-vs-fade">Taper vs fade: what is the difference?</h2>
            <p>
              The terms are often used interchangeably, but barbers usually mean different things. A <strong>taper</strong> shortens only the perimeter: the sideburns and the neckline. A{' '}
              <strong>fade</strong> takes a much larger area of the sides and back very short, often down to bare skin, for more contrast. A &ldquo;taper fade&rdquo; sits between the two: it
              is a taper whose shortest section fades close to the skin, but the short area stays relatively small.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse overflow-hidden rounded-xl border border-border text-sm">
                <caption className="sr-only">Taper vs fade comparison</caption>
                <thead className="bg-surface-2 text-left">
                  <tr>
                    <th scope="col" className="p-3"></th>
                    <th scope="col" className="p-3">Taper</th>
                    <th scope="col" className="p-3">Fade</th>
                  </tr>
                </thead>
                <tbody className="bg-surface">
                  {[
                    ['Area cut short', 'Sideburns and neckline only', 'Most of the sides and back'],
                    ['Contrast', 'Subtle to medium', 'Medium to very high'],
                    ['Grows out', 'Gracefully', 'Shows regrowth sooner'],
                    ['Workplace', 'Very office-friendly', 'Depends on height'],
                  ].map(([k, a, b]) => (
                    <tr key={k} className="border-t border-border">
                      <th scope="row" className="p-3 text-left">
                        {k}
                      </th>
                      <td className="p-3">{a}</td>
                      <td className="p-3">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              For a deeper comparison with examples, read <Link href="/taper-vs-fade">taper vs fade explained</Link>.
            </p>
          </section>
        </article>

        <AdSlot slot="home-mid" />

        {/* ---------- Types ---------- */}
        <section aria-labelledby="taper-fade-types" className="mt-12">
          <h2 id="taper-fade-types" className="scroll-mt-20 font-display text-3xl font-semibold">
            Types of taper fade
          </h2>
          <p className="mt-3 max-w-[70ch] leading-relaxed text-muted">
            Every taper is defined by where it starts and how the line travels around the head. Use the illustrations below to compare them, as the dashed line shows where each taper begins.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TAPER_TYPES.map((t) => (
              <li key={t.id} className="flex flex-col rounded-2xl border border-border bg-surface p-5">
                <HeadProfile variant={t.illustration} uid="-types" className="mx-auto h-36 w-36" />
                <h3 className="mt-3 text-xl font-bold">{t.name}</h3>
                <p className="mt-1 text-sm font-semibold text-accent">Starts: {t.startsAt}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t.summary}</p>
                <p className="mt-3 text-xs text-muted">
                  <span className="font-semibold text-fg">Upkeep:</span> {t.upkeep} · <span className="font-semibold text-fg">Boldness:</span>{' '}
                  <span aria-label={`${t.boldness} out of 5`}>{'●'.repeat(t.boldness) + '○'.repeat(5 - t.boldness)}</span>
                </p>
                {!t.href.startsWith('/#') && (
                  <Link href={t.href} className="mt-3 text-sm font-semibold text-accent hover:underline">
                    {t.name} guide →
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>

        <article className="prose-guide mt-12">
          <section aria-labelledby="taper-fade-hair-types">
            <h2 id="taper-fade-hair-types">Taper fade by hair type</h2>
            <p>
              Your hair texture changes how a taper looks and how long it stays sharp. As a rule, the more texture your hair has, the better it hides the blend between guard lengths, and the
              bolder a taper you can carry.
            </p>
            <h3>Straight hair</h3>
            <p>
              Straight hair shows every detail, so a smooth blend matters. Low and mid tapers with a textured crop or side part are the safest options; fine straight hair is best kept at a #0.5 or
              #1 at the bottom rather than skin. See the full <Link href="/taper-fade-straight-hair">taper fade for straight hair</Link> guide.
            </p>
            <h3>Wavy hair</h3>
            <p>
              Waves look great with a mid or drop taper and 5–10 cm (2–4 inches) on top, which leaves enough length for movement. Ask the barber to remove bulk from the sides so the waves do
              not push outward as they grow.
            </p>
            <h3>Curly hair</h3>
            <p>
              Curls are made for tapers. The taper controls bulk at the sides while the curls stay the focus. Burst and drop tapers are especially popular. Read{' '}
              <Link href="/taper-fade-curly-hair">taper fade for curly hair</Link> for styles and care tips.
            </p>
            <h3>Coily and afro hair</h3>
            <p>
              Coily hair holds a crisp outline beautifully. A temple (Brooklyn) taper keeps your natural shape, while a high or skin taper with a sharp line-up creates maximum definition.
              Moisturize the shorter areas to prevent dryness.
            </p>
          </section>

          <section aria-labelledby="how-to-ask-your-barber">
            <h2 id="how-to-ask-your-barber">How to ask your barber for a taper fade</h2>
            <p>
              Most disappointing haircuts come from vague instructions. &ldquo;A taper, please&rdquo; can mean five different cuts to five different barbers. Cover these five points and you will
              walk out with the cut you pictured:
            </p>
            <ol>
              {HOW_TO_STEPS.map((s) => (
                <li key={s.name}>
                  <strong>{s.name}.</strong> {s.text}
                </li>
              ))}
            </ol>
            <p>
              Here is an example you can copy: <em>&ldquo;Mid taper fade, please, #0.5 at the bottom blending up to a #2, tapered neckline, and leave about 5 cm (2 inches) on top with
              texture.&rdquo;</em>
            </p>
            <p>
              Even easier: create a free <Link href="/barber-card">barber card</Link> with your exact taper, guard, top length, neckline, line-up and beard preferences. Download it as a PNG, print
              it, or show it on your phone.
            </p>
          </section>

          <section aria-labelledby="clipper-guards">
            <h2 id="clipper-guards">Clipper guard numbers for taper fades</h2>
            <p>
              Clipper guards are numbered by length. The most important ones for a taper are the bottom few: they define how much skin shows and how sharp the cut looks.
            </p>
            <ul>
              <li>
                <strong>#0</strong> (no guard): about 0.8 mm (1/32 inch), the crispest finish short of skin
              </li>
              <li>
                <strong>#0.5</strong>: 1.5 mm (1/16 inch), a popular soft bottom for tapers
              </li>
              <li>
                <strong>#1</strong>: 3 mm (1/8 inch), short but no visible skin in normal light
              </li>
              <li>
                <strong>#2</strong>: 6 mm (1/4 inch), the usual upper blend of a low taper
              </li>
              <li>
                <strong>#3–#4</strong>: 10–13 mm (3/8–1/2 inch), where the taper meets the longer sides
              </li>
            </ul>
            <p>
              See all sizes from skin to #8 with a visual length preview in the interactive <Link href="/clipper-guard-chart">clipper guard chart</Link>.
            </p>
          </section>

          <section aria-labelledby="maintenance">
            <h2 id="maintenance">Taper fade maintenance and styling</h2>
            <p>
              The lower and longer your taper, the longer it lasts. A low taper with a #1 at the bottom still looks tidy after a month; a skin taper starts to blur within a week or two. Plan your
              barber visits around the height you choose:
            </p>
            <ul>
              <li>Low taper: every 3–5 weeks</li>
              <li>Mid and drop taper: every 2–4 weeks</li>
              <li>High, burst and skin taper: every 1–3 weeks</li>
            </ul>
            <p>
              Between cuts, ask about a neckline tidy, a quick five-minute service at many barbershops that sharpens the outline without a full cut. For styling, match the product to your
              texture: matte clay or paste for straight and wavy hair, curl cream or gel for curls, and a moisturizing leave-in plus a sponge or soft brush for coils. Wash with a gentle shampoo
              and condition regularly, especially on the shorter tapered areas, which can dry out.
            </p>
            <h3>Is a taper fade right for you?</h3>
            <p>
              If you want a neat, modern cut that works in almost any setting, the answer is very likely yes. The only real question is the height. Choose low if you want subtle and
              low-maintenance; mid if you want balanced definition; high, burst or skin if you want a bold statement and can visit the barber often. Still unsure?{' '}
              <a href="#taper-fade-finder">Take the taper fade quiz</a> at the top of this page.
            </p>
          </section>
        </article>

        <JsonLd
          data={howToJsonLd({
            name: 'How to ask your barber for a taper fade',
            description: 'Five steps to clearly describe the taper fade you want so your barber gets it right first time.',
            path: '/#how-to-ask-your-barber',
            steps: HOW_TO_STEPS,
          })}
        />

        <Faq faqs={HOME_FAQS} heading="Taper fade FAQ" />
        <RelatedTapers pages={STYLE_PAGES} heading="Explore every taper style" />
      </div>
    </>
  );
}
