import { Music, Pause } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { surprise } from "@/content/surprise";
import { MusicBox } from "@/lib/music-box";

/** Floating play / pause button. Music never starts on its own. */
export function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const boxRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    return () => {
      boxRef.current?.dispose();
      audioRef.current?.pause();
    };
  }, []);

  const toggle = async () => {
    try {
      if (surprise.musicUrl) {
        if (!audioRef.current) {
          audioRef.current = new Audio(surprise.musicUrl);
          audioRef.current.loop = true;
          audioRef.current.volume = 0.6;
        }
        if (playing) audioRef.current.pause();
        else await audioRef.current.play();
      } else {
        if (!boxRef.current) boxRef.current = new MusicBox();
        if (playing) boxRef.current.pause();
        else await boxRef.current.play();
      }
      setPlaying((p) => !p);
    } catch (err) {
      console.error("Music could not start", err);
      setPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Pause music" : "Play music"}
      className="glass fixed right-4 bottom-4 z-[60] flex h-14 items-center gap-3 rounded-full px-4 text-foreground transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow">
        {playing ? <Pause className="h-4 w-4" /> : <Music className="h-4 w-4" />}
      </span>
      <span className="flex h-5 items-end gap-[3px]" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="w-[3px] origin-bottom rounded-full bg-primary-glow"
            style={{
              height: "100%",
              animation: playing ? `music-bar 0.9s ease-in-out ${i * 0.15}s infinite` : "none",
              transform: playing ? undefined : "scaleY(0.3)",
            }}
          />
        ))}
      </span>
      <span className="hidden pr-1 text-xs tracking-[0.2em] uppercase sm:inline">
        {playing ? "Pause" : "Play music"}
      </span>
    </button>
  );
}
