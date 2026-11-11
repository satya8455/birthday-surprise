import { Heart } from "lucide-react";

import { surprise } from "@/content/surprise";
import { NextButton, Section, SectionTitle } from "./Section";

export function Journey() {
  return (
    <Section id="journey">
      <SectionTitle
        eyebrow="Chapter three"
        title={
          <>
            Our <span className="text-romance script-accent text-6xl sm:text-7xl">journey</span>
          </>
        }
        subtitle="Every step that led me here, to you."
      />

      <ol className="relative w-full max-w-4xl">
        <span
          aria-hidden
          className="timeline-line absolute top-0 bottom-0 left-5 w-px md:left-1/2 md:-translate-x-1/2"
        />
        {surprise.journey.map((item, i) => {
          const right = i % 2 === 1;
          return (
            <li
              key={i}
              className={`relative mb-12 flex pl-14 last:mb-0 md:pl-0 ${right ? "md:justify-end" : "md:justify-start"}`}
            >
              <span
                aria-hidden
                className="absolute top-6 left-5 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow md:left-1/2"
              >
                <Heart className="h-4 w-4" fill="currentColor" strokeWidth={0} />
              </span>
              <article
                className="glass reveal w-full rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-7 md:w-[calc(50%-3rem)]"
                style={{ "--delay": "100ms" }}
              >
                <p className="eyebrow text-primary">{item.date}</p>
                <h3 className="mt-2 font-display text-3xl font-light">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{item.text}</p>
              </article>
            </li>
          );
        })}
      </ol>

      <NextButton href="#forever" label="One last thing" />
    </Section>
  );
}
