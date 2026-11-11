/**
 * A tiny built-in music box: a soft, looping romantic arpeggio generated with the
 * Web Audio API, so the site has music even before a song file is added.
 */

const midiToFreq = (m) => 440 * Math.pow(2, (m - 69) / 12);

// I – vi – IV – V in C, voiced for a music box.
const CHORDS = [
  { bass: 48, notes: [72, 76, 79, 84] },
  { bass: 45, notes: [69, 72, 76, 81] },
  { bass: 41, notes: [65, 69, 72, 77] },
  { bass: 43, notes: [67, 71, 74, 79] },
];
const ARP = [0, 2, 1, 2, 3, 2, 1, 2];
// One melody note every half bar (index 0 and 4 of each arpeggio).
const MELODY = [88, 91, 88, 84, 89, 88, 86, 83];

const BPM = 70;
const EIGHTH = 60 / BPM / 2;

export class MusicBox {
  ctx = null;
  master = null;
  bus = null;
  timer = null;
  nextTime = 0;
  step = 0;

  setup() {
    const Ctx = window.AudioContext ?? window.webkitAudioContext;
    if (!Ctx) throw new Error("Web Audio is not supported");
    const ctx = new Ctx();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const bus = ctx.createGain();
    bus.gain.value = 1;
    bus.connect(master);

    // Soft echo for a dreamy, roomy sound.
    const delay = ctx.createDelay(1);
    delay.delayTime.value = EIGHTH * 3;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.38;
    const tone = ctx.createBiquadFilter();
    tone.type = "lowpass";
    tone.frequency.value = 2400;
    const wet = ctx.createGain();
    wet.gain.value = 0.35;
    bus.connect(delay);
    delay.connect(tone);
    tone.connect(feedback);
    feedback.connect(delay);
    tone.connect(wet);
    wet.connect(master);

    this.ctx = ctx;
    this.master = master;
    this.bus = bus;
  }

  note(freq, time, volume, length) {
    const ctx = this.ctx;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, time);
    env.gain.exponentialRampToValueAtTime(volume, time + 0.008);
    env.gain.exponentialRampToValueAtTime(0.0001, time + length);
    env.connect(this.bus);

    const body = ctx.createOscillator();
    body.type = "sine";
    body.frequency.value = freq;
    body.connect(env);

    const shimmer = ctx.createOscillator();
    shimmer.type = "triangle";
    shimmer.frequency.value = freq * 2;
    const shimmerGain = ctx.createGain();
    shimmerGain.gain.value = 0.18;
    shimmer.connect(shimmerGain);
    shimmerGain.connect(env);

    body.start(time);
    shimmer.start(time);
    body.stop(time + length + 0.05);
    shimmer.stop(time + length + 0.05);
  }

  schedule = () => {
    const ctx = this.ctx;
    while (this.nextTime < ctx.currentTime + 0.2) {
      const bar = Math.floor(this.step / 8) % CHORDS.length;
      const pos = this.step % 8;
      const chord = CHORDS[bar];
      const t = this.nextTime;

      this.note(midiToFreq(chord.notes[ARP[pos]]), t, 0.09, 1.6);
      if (pos === 0) this.note(midiToFreq(chord.bass), t, 0.12, 3.2);
      if (pos === 0 || pos === 4) {
        const m = MELODY[(bar * 2 + (pos === 4 ? 1 : 0)) % MELODY.length];
        this.note(midiToFreq(m), t + 0.01, 0.06, 2.2);
      }

      this.step += 1;
      this.nextTime += EIGHTH;
    }
  };

  async play() {
    if (!this.ctx) this.setup();
    const ctx = this.ctx;
    await ctx.resume();
    const now = ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0.9, now + 1.5);
    this.nextTime = now + 0.1;
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(this.schedule, 25);
  }

  pause() {
    if (!this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0, now + 0.6);
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  dispose() {
    this.pause();
    void this.ctx?.close();
    this.ctx = null;
  }
}
