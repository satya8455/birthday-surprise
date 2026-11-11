import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { surprise } from "@/content/surprise";
import { NextButton, Section, SectionTitle } from "./Section";

const TILTS = [-3, 2.5, -1.5, 3, -2.5, 1.5];

function Photo({ src, caption, large = false }) {
  if (src) {
    return <img src={src} alt={caption} loading="lazy" className="h-full w-full object-cover" />;
  }
  return (
    <div className="polaroid-placeholder flex h-full w-full flex-col items-center justify-center gap-2 text-center">
      <Camera className={large ? "h-12 w-12 opacity-60" : "h-8 w-8 opacity-60"} />
      <span className="px-4 font-sans text-xs tracking-[0.2em] uppercase opacity-70">
        Your photo here
      </span>
    </div>
  );
}

export function Memories() {
  const items = surprise.memories;
  const [active, setActive] = useState(null);
  const current = active === null ? null : items[active];

  const step = (dir) =>
    setActive((i) => (i === null ? i : (i + dir + items.length) % items.length));

  return (
    <Section id="memories">
      <SectionTitle
        eyebrow="Chapter one"
        title={
          <>
            Our <span className="text-romance script-accent text-6xl sm:text-7xl">memories</span>
          </>
        }
        subtitle="Little moments that became my favourite story."
      />

      <div className="grid w-full max-w-5xl grid-cols-2 gap-5 sm:gap-8 md:grid-cols-3">
        {items.map((m, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className="polaroid reveal text-left"
            style={{ "--tilt": `${TILTS[i % TILTS.length]}deg`, "--delay": `${(i % 3) * 120}ms` }}
            aria-label={`Open memory: ${m.caption}`}
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <Photo src={m.src} caption={m.caption} />
            </div>
            <p className="px-1 py-3 text-center font-hand text-lg leading-tight sm:py-4 sm:text-2xl">
              {m.caption}
            </p>
          </button>
        ))}
      </div>

      <Dialog open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-lg rounded-lg border-0 bg-paper p-4 text-ink sm:p-5">
          {current && (
            <>
              <div className="aspect-[4/5] overflow-hidden rounded-md">
                <Photo src={current.src} caption={current.caption} large />
              </div>
              <DialogTitle className="text-center font-hand text-3xl font-normal">
                {current.caption}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Memory {active + 1} of {items.length}
              </DialogDescription>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="flex items-center gap-1 rounded-full px-3 py-2 text-sm hover:bg-ink/10"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>
                <span className="text-xs tracking-[0.2em] opacity-60">
                  {active + 1} / {items.length}
                </span>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="flex items-center gap-1 rounded-full px-3 py-2 text-sm hover:bg-ink/10"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <NextButton href="#letter" label="A letter for you" />
    </Section>
  );
}
