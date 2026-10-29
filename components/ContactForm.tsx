'use client';

import { useState } from 'react';

/** No backend: builds a mailto: link and opens the visitor's email app. */
export function ContactForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '');
    const from = String(data.get('email') ?? '');
    const subject = String(data.get('subject') ?? '') || 'Message from website';
    const message = String(data.get('message') ?? '');
    const body = `${message}\n\n—\nName: ${name}\nEmail: ${from}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1.5 block font-semibold">
            Name
          </label>
          <input id="c-name" name="name" required autoComplete="name" className="field" />
        </div>
        <div>
          <label htmlFor="c-email" className="mb-1.5 block font-semibold">
            Email
          </label>
          <input id="c-email" name="email" type="email" required autoComplete="email" className="field" />
        </div>
      </div>
      <div>
        <label htmlFor="c-subject" className="mb-1.5 block font-semibold">
          Subject
        </label>
        <input id="c-subject" name="subject" className="field" />
      </div>
      <div>
        <label htmlFor="c-message" className="mb-1.5 block font-semibold">
          Message
        </label>
        <textarea id="c-message" name="message" required rows={6} className="field" />
      </div>
      <button type="submit" className="btn btn-primary">
        Open in my email app
      </button>
      <p role="status" aria-live="polite" className="text-sm text-muted">
        {sent ? (
          <>
            Your email app should open now. If it does not, email us directly at <a href={`mailto:${email}`}>{email}</a>.
          </>
        ) : (
          'Submitting opens your email app with the message pre-filled. Nothing is stored on this site.'
        )}
      </p>
    </form>
  );
}
