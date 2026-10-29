import { TAPER_TYPES, type TaperId, type TaperType } from './styles';

type Scores = Partial<Record<TaperId, number>>;

export interface FinderOption {
  value: string;
  label: string;
  hint?: string;
  scores: Scores;
  /** Shown in "Why this suits you" when this answer supports the winning taper. */
  why: string;
}

export interface FinderQuestion {
  id: 'hair' | 'top' | 'face' | 'dress' | 'visits' | 'look';
  question: string;
  options: FinderOption[];
}

export const QUESTIONS: FinderQuestion[] = [
  {
    id: 'hair',
    question: 'What is your hair type?',
    options: [
      { value: 'straight', label: 'Straight', scores: { low: 2, mid: 2, drop: 1, high: 1 }, why: 'Straight hair shows a clean, precise blend, and this height keeps it looking sharp rather than patchy.' },
      { value: 'wavy', label: 'Wavy', scores: { drop: 2, mid: 2, low: 1 }, why: 'Waves look best with movement on top and tidy sides, which this taper delivers.' },
      { value: 'curly', label: 'Curly', scores: { burst: 3, drop: 2, mid: 1, temple: 1 }, why: 'Curls hold the shape of this taper well and stay the focus of the cut.' },
      { value: 'coily', label: 'Coily / afro', scores: { temple: 3, burst: 2, high: 1, skin: 1 }, why: 'Coily hair holds a crisp outline, and this taper keeps the edges sharp without losing your natural shape.' },
    ],
  },
  {
    id: 'top',
    question: 'How long is the hair on top?',
    options: [
      { value: 'short', label: 'Short', hint: 'Under 5 cm / 2"', scores: { high: 2, skin: 2, mid: 1 }, why: 'With a short top, a taper with more contrast stops the cut from looking flat.' },
      { value: 'medium', label: 'Medium', hint: '5–10 cm / 2–4"', scores: { mid: 2, drop: 2, burst: 1 }, why: 'A medium top balances perfectly with this taper height.' },
      { value: 'long', label: 'Long', hint: 'Over 10 cm / 4"', scores: { low: 3, burst: 1, temple: 1 }, why: 'Longer hair on top looks best with a lower, softer taper that does not overpower it.' },
    ],
  },
  {
    id: 'face',
    question: 'What is your face shape?',
    options: [
      { value: 'oval', label: 'Oval', scores: { mid: 2, drop: 1 }, why: 'Oval faces are well balanced, so a versatile taper height works perfectly.' },
      { value: 'round', label: 'Round', scores: { high: 3, mid: 2, skin: 1 }, why: 'Shorter sides and more height on top make a round face look longer and more defined.' },
      { value: 'square', label: 'Square', scores: { mid: 2, drop: 2, low: 1 }, why: 'This taper softens a strong jawline without taking away its structure.' },
      { value: 'oblong', label: 'Long / oblong', scores: { low: 3, temple: 2, high: -2 }, why: 'Keeping width at the sides stops a longer face from looking even longer.' },
      { value: 'heart', label: 'Heart / triangle', scores: { low: 2, drop: 2, burst: 1 }, why: 'Leaving some fullness lower on the sides balances a wider forehead or jaw.' },
    ],
  },
  {
    id: 'dress',
    question: 'What is your work dress code?',
    options: [
      { value: 'strict', label: 'Strict / corporate', scores: { low: 3, temple: 2, mid: 1, high: -2, burst: -3, skin: -2 }, why: 'It looks neat and conservative, ideal for formal workplaces.' },
      { value: 'smart', label: 'Smart casual', scores: { mid: 3, low: 1, drop: 1 }, why: 'It looks sharp but not extreme, suiting smart-casual settings.' },
      { value: 'relaxed', label: 'Relaxed / creative', scores: { burst: 2, high: 2, skin: 2, drop: 1 }, why: 'Your relaxed dress code gives you freedom for a bolder, more expressive cut.' },
    ],
  },
  {
    id: 'visits',
    question: 'How often can you visit a barber?',
    options: [
      { value: 'often', label: 'Every 1–2 weeks', scores: { skin: 3, high: 2, burst: 1 }, why: 'Frequent visits keep a short, high-contrast taper looking crisp.' },
      { value: 'regular', label: 'Every 3–4 weeks', scores: { mid: 2, drop: 2, low: 1 }, why: 'It stays sharp for three to four weeks, matching your barber routine.' },
      { value: 'rare', label: 'Every 5+ weeks', scores: { low: 3, temple: 2, skin: -3, high: -2, burst: -1 }, why: 'It grows out gracefully, so it still looks tidy between infrequent visits.' },
    ],
  },
  {
    id: 'look',
    question: 'Do you want a subtle or bold look?',
    options: [
      { value: 'subtle', label: 'Subtle', scores: { low: 3, temple: 3, mid: 1 }, why: 'You want something subtle, and this taper keeps the contrast soft and natural.' },
      { value: 'balanced', label: 'Balanced', scores: { mid: 3, drop: 2, low: 1 }, why: 'It strikes the balance you are after: clearly defined but not dramatic.' },
      { value: 'bold', label: 'Bold', scores: { high: 3, skin: 3, burst: 2, drop: 1 }, why: 'You asked for bold, and this taper delivers strong contrast.' },
    ],
  },
];

export type Answers = Partial<Record<FinderQuestion['id'], string>>;

export interface FinderResult {
  taper: TaperType;
  runnerUp: TaperType;
  reasons: string[];
}

/** Tie-break order: prefer safer, more versatile cuts. */
const ORDER: TaperId[] = ['mid', 'low', 'drop', 'temple', 'burst', 'high', 'skin'];

export function scoreAnswers(answers: Answers): FinderResult {
  const totals = Object.fromEntries(ORDER.map((id) => [id, 0])) as Record<TaperId, number>;
  const chosen: FinderOption[] = [];

  for (const q of QUESTIONS) {
    const opt = q.options.find((o) => o.value === answers[q.id]);
    if (!opt) continue;
    chosen.push(opt);
    for (const [id, pts] of Object.entries(opt.scores) as [TaperId, number][]) totals[id] += pts;
  }

  const ranked = [...ORDER].sort((a, b) => totals[b] - totals[a] || ORDER.indexOf(a) - ORDER.indexOf(b));
  const byId = (id: TaperId) => TAPER_TYPES.find((t) => t.id === id)!;
  const winner = ranked[0];

  const reasons = chosen.filter((o) => (o.scores[winner] ?? 0) > 0).map((o) => o.why);
  if (reasons.length === 0) reasons.push('It is the most versatile match across all of your answers.');

  return { taper: byId(winner), runnerUp: byId(ranked[1]), reasons };
}
