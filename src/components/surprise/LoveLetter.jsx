import { Heart, MailOpen } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { surprise } from "@/content/surprise";
import { NextButton, Section, SectionTitle } from "./Section";

export function LoveLetter() {
  const [open, setOpen] = useState(false);
  const [reading, setReading] = useState(false);
  const letterRef = useRef(null);
  const { letter } = surprise;

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setReading(true), 1500);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (reading) letterRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [reading]);

  const close = () => {
    setReading(false);
    setOpen(false);
  };

  return (
    <Section id="letter">
      <SectionTitle
        eyebrow="Chapter two"
        title={
          <>
            A <span className="text-romance script-accent text-6xl sm:text-7xl">love letter</span>
          </>
        }
        subtitle={reading ? undefined : "Sealed with a kiss. Tap the envelope to open it."}
      />

      {!reading ? (
        <div className="reveal flex flex-col items-center pt-20 sm:pt-24">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open the envelope"
            className={`envelope ${open ? "is-open" : ""}`}
          >
            <span className="envelope-back" />
            <span className="envelope-letter flex items-start justify-center p-4">
              <span className="font-hand text-xl text-ink">For you ♡</span>
            </span>
            <span className="envelope-front" />
            <span className="envelope-flap" />
            <span className="envelope-seal">
              <Heart className="h-5 w-5" fill="currentColor" strokeWidth={0} />
            </span>
          </button>
          {!open && (
            <button type="button" onClick={() => setOpen(true)} className="btn-glow mt-12">
              <MailOpen className="h-5 w-5" />
              Open the letter
            </button>
          )}
        </div>
      ) : (
        <div
          ref={letterRef}
          className="letter-paper animate-rise-in w-full max-w-2xl rounded-lg px-7 py-10 sm:px-14 sm:py-14"
        >
          <p className="font-hand text-3xl leading-[2.15rem] sm:text-4xl">{letter.greeting}</p>
          <div className="mt-[2.15rem] space-y-[2.15rem]">
            {letter.paragraphs.map((p, i) => (
              <p key={i} className="font-hand text-2xl leading-[2.15rem]">
                {p}
              </p>
            ))}
          </div>
          <p className="mt-[2.15rem] text-right font-hand text-2xl leading-[2.15rem]">
            {letter.closing}
            <br />
            <span className="text-3xl">{surprise.yourName} ♡</span>
          </p>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={close}
              className="rounded-full border border-ink/25 px-5 py-2 text-sm tracking-[0.15em] text-ink uppercase transition-colors hover:bg-ink/10"
            >
              Fold the letter
            </button>
          </div>
        </div>
      )}

      <NextButton href="#journey" label="Our journey" />
    </Section>
  );
}
