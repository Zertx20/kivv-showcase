import { motion } from "framer-motion";

const TRACKS = [
  { top: "18%", dotDur: "7s", dotDelay: "0s", keyframes: [12, 34, 58, 81] },
  { top: "34%", dotDur: "9s", dotDelay: "1.2s", keyframes: [8, 27, 49, 70, 92] },
  { top: "50%", dotDur: "6s", dotDelay: "0.5s", keyframes: [20, 44, 66, 88] },
  { top: "66%", dotDur: "11s", dotDelay: "2s", keyframes: [15, 38, 55, 78, 95] },
  { top: "82%", dotDur: "8s", dotDelay: "0.8s", keyframes: [10, 30, 52, 74] },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg"
    >
      <div className="kivv-timeline" aria-hidden>
        {TRACKS.map((t, i) => (
          <div key={i} className="kivv-track" style={{ top: t.top }}>
            {t.keyframes.map((k, j) => (
              <span
                key={j}
                className="kivv-keyframe"
                style={{ left: `${k}%` }}
              />
            ))}
            <span
              className="kivv-dot"
              style={{ animationDuration: t.dotDur, animationDelay: t.dotDelay }}
            />
          </div>
        ))}
        <div className="kivv-playhead" />
      </div>

      <div className="relative z-10 max-w-5xl px-6 text-center">
        <motion.p
          custom={0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-xs md:text-sm uppercase tracking-[0.3em] text-accent mb-6"
        >
          Video Editor — Algeria
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="font-syne font-extrabold leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(56px, 12vw, 96px)" }}
        >
          KIVV<span className="text-accent kivv-glitch inline-block">.</span>
          <br />
          EDITS
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-6 text-muted text-base md:text-lg max-w-xl mx-auto"
        >
          Clean, minimal & high-retention edits. Let's bring your ideas to life.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-10 flex items-center justify-center gap-4 flex-wrap"
        >
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-7 py-3 bg-accent text-black text-sm font-medium tracking-wide hover:bg-accent/90 transition-colors"
          >
            View Work
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-7 py-3 border border-[var(--color-border)] text-text text-sm font-medium tracking-wide hover:border-accent hover:text-accent transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted text-xs uppercase tracking-[0.3em]">
        Scroll
      </div>
    </section>
  );
}
