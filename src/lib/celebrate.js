/**
 * Confetti and heart bursts. canvas-confetti only understands hex colours, so this
 * palette mirrors the rose / lavender / blush / gold tokens in src/styles.css.
 */
const PALETTE = ["#f7a8c8", "#ffd1e3", "#c9b1f0", "#f8c9b8", "#f5dc8f", "#fff6fa"];

async function load() {
  const mod = await import("canvas-confetti");
  return mod.default;
}

export async function confettiBurst() {
  const confetti = await load();
  const base = { colors: PALETTE, disableForReducedMotion: true, zIndex: 70 };
  confetti({ ...base, particleCount: 120, spread: 90, startVelocity: 45, origin: { y: 0.6 } });
  setTimeout(() => {
    confetti({ ...base, particleCount: 70, angle: 60, spread: 70, origin: { x: 0, y: 0.75 } });
    confetti({ ...base, particleCount: 70, angle: 120, spread: 70, origin: { x: 1, y: 0.75 } });
  }, 250);
}

export async function heartBurst(durationMs = 2500) {
  const confetti = await load();
  const heart = confetti.shapeFromText({ text: "💗", scalar: 2.2 });
  const sparkle = confetti.shapeFromText({ text: "✨", scalar: 1.8 });
  const end = Date.now() + durationMs;
  const frame = () => {
    confetti({
      particleCount: 3,
      spread: 75,
      startVelocity: 32,
      scalar: 2.2,
      shapes: [heart, heart, sparkle],
      origin: { x: Math.random(), y: Math.random() * 0.3 + 0.55 },
      disableForReducedMotion: true,
      zIndex: 70,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}
