import { RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";

import { surprise } from "@/content/surprise";
import { heartBurst } from "@/lib/celebrate";
import { Section } from "./Section";

export function FinalSurprise({ onReplay }) {
  const [revealed, setRevealed] = useState(false);

  const reveal = () => {
    setRevealed(true);
    void heartBurst(3000);
  };

  return (
    <Section id="forever">
      <h2 className="reveal max-w-3xl text-center font-display text-4xl leading-tight font-light italic sm:text-6xl">
        If I could choose again, <br className="hidden sm:block" />
        <span className="text-romance not-italic">I would still choose you</span>{" "}
        <span className="not-italic">❤️</span>
      </h2>

      <button
        type="button"
        onClick={reveal}
        aria-label="Tap the heart for a surprise"
        className="reveal mt-14 cursor-pointer"
      >
        <svg viewBox="0 0 32 29" className="beating-heart h-44 w-44 sm:h-56 sm:w-56" aria-hidden>
          <defs>
            <linearGradient id="heart-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--primary-glow)" />
              <stop offset="55%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--secondary)" />
            </linearGradient>
          </defs>
          <path
            fill="url(#heart-fill)"
            d="M23.6 0c-3.4 0-6.3 2.7-7.6 5.6C14.7 2.7 11.8 0 8.4 0 3.8 0 0 3.8 0 8.4c0 9.4 9.5 11.9 16 21.2 6.1-9.3 16-12.1 16-21.2C32 3.8 28.2 0 23.6 0z"
          />
        </svg>
      </button>

      <div className="mt-10 flex min-h-40 w-full max-w-xl flex-col items-center text-center">
        {revealed ? (
          <div className="glass animate-rise-in w-full rounded-3xl p-8 sm:p-10">
            <Sparkles className="mx-auto h-6 w-6 text-gold" />
            <p className="mt-4 font-display text-2xl leading-relaxed italic sm:text-3xl">
              {surprise.finalMessage}
            </p>
            <p className="mt-6 font-script text-4xl text-primary">
              Happy Birthday, {surprise.herName}
            </p>
            <button type="button" onClick={onReplay} className="btn-soft mt-8">
              <RotateCcw className="h-4 w-4" />
              Start again from the beginning
            </button>
          </div>
        ) : (
          <button type="button" onClick={reveal} className="btn-glow">
            <Sparkles className="h-5 w-5" />
            Tap for one last surprise
          </button>
        )}
      </div>
    </Section>
  );
}
