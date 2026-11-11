import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Celebration } from "@/components/surprise/Celebration";
import { FinalSurprise } from "@/components/surprise/FinalSurprise";
import { FloatingHearts } from "@/components/surprise/FloatingHearts";
import { Journey } from "@/components/surprise/Journey";
import { LoveLetter } from "@/components/surprise/LoveLetter";
import { Memories } from "@/components/surprise/Memories";
import { MusicToggle } from "@/components/surprise/MusicToggle";
import { OpeningScreen } from "@/components/surprise/OpeningScreen";
import { SectionDots } from "@/components/surprise/SectionDots";
import { StarField } from "@/components/surprise/StarField";
import { confettiBurst } from "@/lib/celebrate";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, My Love ❤️ — A Surprise Just for You" },
      {
        name: "description",
        content:
          "A little birthday surprise: a cake to make a wish on, our memories, a love letter and a journey written just for you.",
      },
      { property: "og:title", content: "Happy Birthday, My Love ❤️" },
      {
        property: "og:description",
        content: "A birthday surprise made with love — open it when you're ready.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/** Fades `.reveal` elements in as they scroll into view, including ones mounted later. */
function useRevealOnScroll() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    const watch = (root) =>
      root.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => io.observe(el));
    watch(document);
    const mo = new MutationObserver(() => watch(document));
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}

function Index() {
  const [opened, setOpened] = useState(false);
  useRevealOnScroll();

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  const handleOpen = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setOpened(true);
    void confettiBurst();
  };

  const replay = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setOpened(false), 700);
  };

  return (
    <main className="relative min-h-screen">
      <StarField />
      <FloatingHearts count={14} />

      {!opened && <OpeningScreen onOpen={handleOpen} />}

      <div aria-hidden={!opened}>
        <Celebration />
        <Memories />
        <LoveLetter />
        <Journey />
        <FinalSurprise onReplay={replay} />
        <footer className="relative z-10 pb-28 text-center text-sm text-muted-foreground">
          Made with all my love, just for you ♡
        </footer>
      </div>

      {opened && <SectionDots />}
      <MusicToggle />
    </main>
  );
}
