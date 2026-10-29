'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { QUESTIONS, scoreAnswers, type Answers, type FinderResult } from '@/lib/finder';
import { TaperVisual } from '@/components/illustrations/TaperVisual';

export function TaperFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<FinderResult | null>(null);
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const legendRef = useRef<HTMLLegendElement>(null);
  const moved = useRef(false);

  const q = QUESTIONS[step];
  const value = answers[q.id];
  const isLast = step === QUESTIONS.length - 1;

  useEffect(() => {
    if (result) resultHeading.current?.focus();
  }, [result]);

  // Move focus to the new question after Next/Back (not on first render).
  useEffect(() => {
    if (moved.current) legendRef.current?.focus();
  }, [step]);

  function go(delta: number) {
    moved.current = true;
    setStep((s) => s + delta);
  }

  function next() {
    if (!value) return;
    if (isLast) setResult(scoreAnswers(answers));
    else go(1);
  }

  function restart() {
    moved.current = true;
    setAnswers({});
    setResult(null);
    setStep(0);
  }

  if (result) {
    const { taper, runnerUp, reasons } = result;
    return (
      <div className="rounded-xl border border-border bg-surface p-5 sm:p-7" aria-live="polite">
        <p className="text-sm font-medium text-muted">Your best match</p>
        <h3 ref={resultHeading} tabIndex={-1} className="mt-1 font-display text-3xl font-semibold outline-none">
          {taper.name}
        </h3>
        <div className="mt-5 grid gap-6 sm:grid-cols-[160px_1fr]">
          <TaperVisual variant={taper.illustration} photo={taper.photo} px={160} uid="-finder" className="mx-auto h-40 w-40 rounded-xl bg-surface-2" />
          <div>
            <p className="leading-relaxed">{taper.summary}</p>
            <dl className="mt-4 grid gap-2 text-sm">
              <div>
                <dt className="inline font-semibold">Starts: </dt>
                <dd className="inline text-muted">{taper.startsAt}</dd>
              </div>
              <div>
                <dt className="inline font-semibold">Guards: </dt>
                <dd className="inline text-muted">{taper.guards}</dd>
              </div>
              <div>
                <dt className="inline font-semibold">Upkeep: </dt>
                <dd className="inline text-muted">{taper.upkeep}</dd>
              </div>
            </dl>
          </div>
        </div>

        <h4 className="mt-6 text-lg font-bold">Why this suits you</h4>
        <ul className="mt-2 space-y-2">
          {reasons.map((r) => (
            <li key={r} className="flex gap-2">
              <span aria-hidden="true" className="text-muted">
                ✓
              </span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">
          Also worth considering: <strong className="text-fg">{runnerUp.name}</strong>.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={`/barber-card?taper=${taper.id}`} className="btn btn-primary">
            Make my barber card
          </Link>
          <Link href={taper.href} className="btn btn-ghost">
            Read the {taper.name} guide
          </Link>
          <button type="button" onClick={restart} className="btn btn-ghost">
            Start over
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="rounded-xl border border-border bg-surface p-5 sm:p-7"
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
    >
      <div className="flex items-center justify-between text-sm text-muted">
        <span>
          Question {step + 1} of {QUESTIONS.length}
        </span>
        <span aria-hidden="true">{Math.round((step / QUESTIONS.length) * 100)}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-label="Quiz progress" aria-valuemin={0} aria-valuemax={QUESTIONS.length} aria-valuenow={step}>
        <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${(step / QUESTIONS.length) * 100}%` }} />
      </div>

      <fieldset className="mt-5">
        <legend ref={legendRef} tabIndex={-1} className="font-display text-2xl font-semibold outline-none">
          {q.question}
        </legend>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {q.options.map((o) => {
            const checked = value === o.value;
            return (
              <label
                key={o.value}
                className={`flex min-h-[52px] cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-accent ${
                  checked ? 'border-accent bg-accent-soft' : 'border-border hover:border-accent'
                }`}
              >
                <input
                  type="radio"
                  name={q.id}
                  value={o.value}
                  checked={checked}
                  onChange={() => setAnswers((a) => ({ ...a, [q.id]: o.value }))}
                  className="h-4 w-4 accent-[var(--accent)]"
                />
                <span>
                  <span className="font-semibold">{o.label}</span>
                  {o.hint && <span className="block text-sm text-muted">{o.hint}</span>}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button type="button" onClick={() => go(-1)} disabled={step === 0} className="btn btn-ghost disabled:opacity-40">
          Back
        </button>
        <button type="submit" disabled={!value} className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-50">
          {isLast ? 'Show my taper' : 'Next'}
        </button>
      </div>
    </form>
  );
}
