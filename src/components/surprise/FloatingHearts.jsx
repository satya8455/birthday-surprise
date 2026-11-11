import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

const TONES = ["text-primary", "text-secondary", "text-accent"];

/** Hearts rising softly through the page. Generated after mount to keep SSR stable. */
export function FloatingHearts({ count = 18, className = "fixed" }) {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    setHearts(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 10 + Math.random() * 22,
        duration: 13 + Math.random() * 14,
        delay: -Math.random() * 25,
        drift: (Math.random() - 0.5) * 90,
        peak: 0.25 + Math.random() * 0.5,
        tone: Math.floor(Math.random() * TONES.length),
      })),
    );
  }, [count]);

  return (
    <div aria-hidden className={`pointer-events-none inset-0 z-0 overflow-hidden ${className}`}>
      {hearts.map((h, i) => (
        <Heart
          key={i}
          className={`floating-heart ${TONES[h.tone]}`}
          fill="currentColor"
          strokeWidth={0}
          style={{
            left: `${h.left}%`,
            width: h.size,
            height: h.size,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            "--drift": `${h.drift}px`,
            "--peak": h.peak,
          }}
        />
      ))}
    </div>
  );
}
