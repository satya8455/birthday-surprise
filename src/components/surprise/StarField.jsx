import { useEffect, useRef } from "react";

/** Twinkling stars and slow drifting glow particles, painted behind everything. */
export function StarField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const starColor = styles.getPropertyValue("--foreground").trim() || "white";
    const tints = [
      styles.getPropertyValue("--primary-glow").trim() || "pink",
      styles.getPropertyValue("--secondary").trim() || "lavender",
      styles.getPropertyValue("--gold").trim() || "gold",
    ];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let stars = [];
    let sparks = [];
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 5200);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.2,
        speed: Math.random() * 1.5 + 0.4,
        phase: Math.random() * Math.PI * 2,
      }));
      sparks = Array.from({ length: Math.round(count / 6) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.25 + 0.05),
        r: Math.random() * 2.2 + 0.8,
        tint: Math.floor(Math.random() * tints.length),
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t) => {
      const time = t / 1000;
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = starColor;
      for (const s of stars) {
        ctx.globalAlpha = 0.25 + 0.75 * Math.abs(Math.sin(time * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const p of sparks) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        const glow = 0.35 + 0.45 * Math.abs(Math.sin(time * 0.8 + p.phase));
        ctx.globalAlpha = glow * 0.25;
        ctx.fillStyle = tints[p.tint] ?? starColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0" />;
}
