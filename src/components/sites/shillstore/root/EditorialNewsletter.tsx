'use client';

import React, { useState } from 'react';

export function EditorialNewsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <section className="py-20 sm:py-24 max-w-2xl mx-auto px-6 text-center border-t border-neutral-100">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-neutral-900 mb-3">
        Stay in the loop.
      </h2>

      <p className="text-xs sm:text-sm text-neutral-500 font-normal max-w-md mx-auto mb-8">
        Be the first to access seasonal capsules, editorial drops, and private previews.
      </p>

      {isSubmitted ? (
        <div className="py-4 text-xs tracking-wider uppercase font-medium text-neutral-800">
          Thank you. You have been added to our subscriber list.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full px-4 py-3.5 bg-white border border-neutral-300 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 bg-black text-white hover:bg-neutral-800 text-xs font-semibold uppercase tracking-[0.2em] transition-colors shrink-0 cursor-pointer"
          >
            SUBSCRIBE
          </button>
        </form>
      )}
    </section>
  );
}
