import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "celebrate", label: "Celebrate" },
  { id: "memories", label: "Memories" },
  { id: "letter", label: "Love letter" },
  { id: "journey", label: "Our journey" },
  { id: "forever", label: "Forever" },
];

/** Side navigation dots that smoothly jump between chapters. */
export function SectionDots() {
  const [active, setActive] = useState("celebrate");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Chapters"
      className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 flex-col gap-4 md:flex"
    >
      {SECTIONS.map((s) => {
        const on = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={s.label}
            aria-current={on ? "true" : undefined}
            className="group flex items-center justify-end gap-3"
          >
            <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase opacity-0 transition-opacity group-hover:opacity-100">
              {s.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-500 ${
                on
                  ? "h-3 w-3 bg-primary shadow-glow"
                  : "h-2 w-2 bg-foreground/40 group-hover:bg-foreground/80"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
