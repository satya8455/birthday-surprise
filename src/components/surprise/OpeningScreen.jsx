import { Gift } from "lucide-react";
import { useState } from "react";

import { surprise } from "@/content/surprise";
import { FloatingHearts } from "./FloatingHearts";

export function OpeningScreen({ onOpen }) {
  const [leaving, setLeaving] = useState(false);
  const letters = Array.from(surprise.herName);

  const open = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(onOpen, 900);
  };

  return (
    <div
      role="dialog"
      aria-label="Birthday surprise"
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-6 transition-all duration-[900ms] ease-out ${
        leaving ? "pointer-events-none scale-110 opacity-0 blur-md" : "opacity-100"
      } bg-night`}
    >
      <FloatingHearts count={22} className="absolute" />

      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <p className="eyebrow animate-rise-in">Today is all about you</p>

        <h1 className="animate-rise-in mt-6 font-display text-3xl leading-tight font-light italic sm:text-5xl [animation-delay:200ms]">
          A Special Day for My Favourite Person <span className="not-italic">❤️</span>
        </h1>

        <p
          aria-label={surprise.herName}
          className="mt-6 font-script text-7xl leading-[1.3] sm:text-9xl"
        >
          {letters.map((ch, i) => (
            <span
              key={i}
              aria-hidden
              className="name-letter"
              style={{ animationDelay: `${900 + i * 110}ms` }}
            >
              <span
                className="text-romance text-glow inline-block px-[0.04em]"
                style={{ animationDelay: `${-i * 0.25}s` }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            </span>
          ))}
        </p>

        <div
          className="animate-rise-in mt-12"
          style={{ animationDelay: `${1400 + letters.length * 110}ms` }}
        >
          <button type="button" onClick={open} className="btn-glow text-base">
            <Gift className="h-5 w-5" />
            Open Your Surprise
          </button>
          <p className="mt-6 text-sm text-muted-foreground">
            Tip: tap the music button for a little melody ♪
          </p>
        </div>
      </div>
    </div>
  );
}
