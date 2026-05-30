import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  { title: "Commercial Cut", category: "Brand Film", ytId: "dQw4w9WgXcQ", bg: "#1a1a2e" },
  { title: "Cinematic Vlog", category: "Long-Form", ytId: "dQw4w9WgXcQ", bg: "#0d1117" },
  { title: "Reels Pack", category: "Short-Form", ytId: "dQw4w9WgXcQ", bg: "#1a1000" },
  { title: "Music Sync Edit", category: "Creative", ytId: "dQw4w9WgXcQ", bg: "#0a1a10" },
  { title: "Product Promo", category: "E-Commerce", ytId: "dQw4w9WgXcQ", bg: "#1a0a0a" },
  { title: "Documentary Cut", category: "Long-Form", ytId: "dQw4w9WgXcQ", bg: "#0a0a1a" },
];

const DURATION = 5000;
const TICK = 50;

export default function Portfolio({ onOpen, paused }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchX = useRef(null);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + (TICK / DURATION) * 100;
        if (next >= 100) {
          setDirection(1);
          setIndex((i) => (i + 1) % projects.length);
          return 0;
        }
        return next;
      });
    }, TICK);
    return () => clearInterval(id);
  }, [paused, index]);

  const go = (dir) => {
    setDirection(dir);
    setIndex((i) => (i + dir + projects.length) % projects.length);
    setProgress(0);
  };

  const jump = (i) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
    setProgress(0);
  };

  const onTouchStart = (e) => {
    touchX.current = e.changedTouches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  const slide = projects[index];

  return (
    <section id="work" className="py-32 px-6 bg-bg">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between gap-6 mb-12 flex-wrap"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-6">Selected Work</p>
            <h2
              className="font-syne font-extrabold leading-[1.05]"
              style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
            >
              Recent projects.
            </h2>
          </div>
          <p className="text-muted text-sm">
            Project <span className="text-text">{String(index + 1).padStart(2, "0")}</span> /{" "}
            {String(projects.length).padStart(2, "0")}
          </p>
        </motion.div>

        <div
          className="relative"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative aspect-video w-full overflow-hidden border border-[var(--color-border)]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.button
                key={index}
                custom={direction}
                onClick={() => onOpen(slide)}
                initial={{ x: direction * 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction * -60, opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 30 }}
                className="group absolute inset-0 flex items-center justify-center text-left"
                style={{ backgroundColor: slide.bg }}
              >
                <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <span className="relative flex items-center justify-center w-[60px] h-[60px] rounded-full border-2 border-accent text-accent transition-transform duration-300 group-hover:scale-110">
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="currentColor" aria-hidden>
                    <path d="M18 10L0 20V0L18 10Z" />
                  </svg>
                </span>
                <span className="absolute left-6 bottom-6 md:left-10 md:bottom-10">
                  <span className="block text-[10px] md:text-xs uppercase tracking-[0.3em] text-accent mb-2">
                    {slide.category}
                  </span>
                  <span className="block font-syne font-extrabold text-2xl md:text-4xl text-white">
                    {slide.title}
                  </span>
                </span>
              </motion.button>
            </AnimatePresence>

            <button
              aria-label="Previous"
              onClick={() => go(-1)}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur border border-[var(--color-border)] text-text hover:border-accent hover:text-accent transition-colors items-center justify-center"
            >
              ←
            </button>
            <button
              aria-label="Next"
              onClick={() => go(1)}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur border border-[var(--color-border)] text-text hover:border-accent hover:text-accent transition-colors items-center justify-center"
            >
              →
            </button>
          </div>

          <div className="mt-4 h-px w-full bg-[var(--color-border)] overflow-hidden">
            <div
              className="h-full bg-accent transition-[width] duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            {projects.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to project ${i + 1}`}
                onClick={() => jump(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-accent" : "w-4 bg-text/20 hover:bg-text/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
