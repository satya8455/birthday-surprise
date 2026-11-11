import { RotateCcw, Wind } from "lucide-react";
import { useState } from "react";

import { confettiBurst, heartBurst } from "@/lib/celebrate";
import { NextButton, Section } from "./Section";

const CANDLES = [34, 50, 66];

function Cake({ blown }) {
  return (
    <div className="cake animate-float-soft" role="img" aria-label="Birthday cake with candles">
      <div className="cake-plate" />
      <div className="cake-tier cake-tier-bottom">
        <div className="cake-frosting" />
        <div className="cake-dots" />
      </div>
      <div className="cake-tier cake-tier-top">
        <div className="cake-frosting" />
      </div>
      {CANDLES.map((left) => (
        <div key={left} className={`candle ${blown ? "is-out" : ""}`} style={{ left: `${left}%` }}>
          <span className="flame" />
          <span className="smoke" />
        </div>
      ))}
    </div>
  );
}

export function Celebration() {
  const [blown, setBlown] = useState(false);

  const blow = () => {
    setBlown(true);
    void confettiBurst();
    setTimeout(() => void heartBurst(1800), 500);
  };

  return (
    <Section id="celebrate">
      <div className="reveal text-center">
        <p className="eyebrow">Make a wish</p>
        <h2 className="mt-5 font-display text-5xl leading-[1.05] font-light sm:text-7xl md:text-8xl">
          <span className="text-romance">Happy Birthday,</span>
          <br />
          <span className="text-romance text-glow script-accent text-6xl sm:text-8xl md:text-9xl">
            My Love
          </span>{" "}
          <span className="inline-block animate-pulse">❤️</span>
        </h2>
      </div>

      <div className="reveal mt-14 flex flex-col items-center" style={{ "--delay": "200ms" }}>
        <Cake blown={blown} />

        <div className="mt-10 flex min-h-28 flex-col items-center gap-4 text-center">
          {blown ? (
            <>
              <p className="animate-rise-in font-display text-2xl italic sm:text-3xl">
                Your wish is on its way to the stars ✨
              </p>
              <button type="button" onClick={() => setBlown(false)} className="btn-soft">
                <RotateCcw className="h-4 w-4" />
                Light the candles again
              </button>
            </>
          ) : (
            <>
              <p className="text-muted-foreground">Close your eyes, make a wish…</p>
              <button type="button" onClick={blow} className="btn-glow">
                <Wind className="h-5 w-5" />
                Blow out the candles
              </button>
            </>
          )}
        </div>
      </div>

      <NextButton href="#memories" label="Our memories" />
    </Section>
  );
}
