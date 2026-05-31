import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

/* ---------- Timeline tracks ---------- */
const TRACKS = [
  { top: "18%", dotDur: "7s", dotDelay: "0s", keyframes: [12, 34, 58, 81] },
  { top: "34%", dotDur: "9s", dotDelay: "1.2s", keyframes: [8, 27, 49, 70, 92] },
  { top: "50%", dotDur: "6s", dotDelay: "0.5s", keyframes: [20, 44, 66, 88] },
  { top: "66%", dotDur: "11s", dotDelay: "2s", keyframes: [15, 38, 55, 78, 95] },
  { top: "82%", dotDur: "8s", dotDelay: "0.8s", keyframes: [10, 30, 52, 74] },
];

/* ---------- Gallery slides ---------- */
const projects = [
  { title: "Project 01", category: "Brand Film", vimeoId: "1197098638", bg: "#1a1a2e" },
  { title: "Project 02", category: "Long-Form", vimeoId: "1197093636", bg: "#0d1117" },
  { title: "Project 03", category: "Short-Form", vimeoId: "1197098353", bg: "#1a1000" },
];

const SLIDE_DURATION = 7000;

export default function Hero({ onOpen, paused }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const touchX = useRef(null);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  /* Auto-advance — one clean interval */
  useEffect(() => {
    if (paused) return;
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        startTimeRef.current = Date.now();
        setProgress(0);
        setIndex((i) => (i + 1) % projects.length);
      }
    }, 50);
    return () => clearInterval(intervalRef.current);
  }, [paused, index]);

  const go = (dir) => {
    setIndex((i) => (i + dir + projects.length) % projects.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  const jump = (i) => {
    setIndex(i);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  /* Touch swipe */
  const onTouchStart = (e) => {
    touchX.current = e.changedTouches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative h-[100dvh] flex flex-col overflow-hidden bg-bg">
      {/* Timeline background — z-index 0, behind everything */}
      <div
        className="kivv-timeline opacity-25"
        aria-hidden
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
      >
        {TRACKS.map((t, i) => (
          <div key={i} className="kivv-track" style={{ top: t.top }}>
            {t.keyframes.map((k, j) => (
              <span key={j} className="kivv-keyframe" style={{ left: `${k}%` }} />
            ))}
            <span
              className="kivv-dot"
              style={{ animationDuration: t.dotDur, animationDelay: t.dotDelay }}
            />
          </div>
        ))}
        <div className="kivv-playhead" />
      </div>

      {/* ── ROW 1 — TOP BAR ── */}
      <div
        className="relative shrink-0 px-5 flex items-center border-b"
        style={{
          zIndex: 10,
          minHeight: 70,
          padding: "16px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(8,8,8,0.7)",
          backdropFilter: "blur(8px)",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* Left: Logo */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span
            style={{
              fontFamily: "Syne",
              fontWeight: 800,
              fontSize: "22px",
              color: "#F0EDE8",
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            KIVV<span style={{ color: "#C8FF00" }}>.</span>
          </span>
          <span
            style={{
              fontFamily: "Syne",
              fontWeight: 800,
              fontSize: "22px",
              color: "#F0EDE8",
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            EDITS
          </span>
        </div>
        {/* Right: Info */}
        <div
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "3px" }}
        >
          <span
            style={{ fontFamily: "DM Sans", fontSize: "13px", fontWeight: 500, color: "#F0EDE8" }}
          >
            Abdelkrim Khader
          </span>
          <span style={{ fontFamily: "DM Sans", fontSize: "12px", color: "#888888" }}>
            Video Editor
          </span>
          <a
            href="https://www.instagram.com/kivv.edits/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "DM Sans",
              fontSize: "12px",
              color: "#C8FF00",
              textDecoration: "none",
            }}
          >
            @kivv.edits
          </a>
        </div>
      </div>

      {/* ── ROW 1.5 — TITLE ── */}
      <div className="relative shrink-0 text-center" style={{ zIndex: 10, padding: "20px 0" }}>
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#888",
          }}
        >
          SELECTED WORK
        </p>
        <h2
          style={{
            fontFamily: "Syne",
            fontWeight: 800,
            fontSize: "clamp(28px, 7vw, 40px)",
            color: "#F0EDE8",
            lineHeight: 1,
            marginTop: "6px",
          }}
        >
          Latest Projects
        </h2>
        <div style={{ width: 40, height: 2, background: "#C8FF00", margin: "8px auto 0" }} />
      </div>

      {/* ── ROW 2 — 9:16 GALLERY ── */}
      <div
        className="relative flex-1 flex flex-col items-center justify-center px-4 min-h-0 select-none"
        style={{ zIndex: 10 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Card — small, centered, rounded */}
        <div
          className="relative w-full max-w-[220px] mx-auto rounded-2xl overflow-hidden"
          style={{ aspectRatio: "9/16" }}
        >
          <div
            className="absolute inset-0 text-left"
            style={{ backgroundColor: projects[index].bg }}
            onClick={() => onOpen?.(projects[index])}
          >
            <iframe
              key={projects[index].vimeoId}
              src={`https://player.vimeo.com/video/${projects[index].vimeoId}?autoplay=1&muted=1&background=1&loop=1&transparent=0&quality=720p`}
              className="absolute inset-0 w-full h-full"
              style={{ border: "none", pointerEvents: "none" }}
              allow="autoplay; fullscreen"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
                width: 52,
                height: 52,
                borderRadius: "50%",
                border: "2px solid #C8FF00",
                background: "rgba(200,255,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(4px)",
                pointerEvents: "none",
              }}
            >
              <span style={{ fontSize: "18px", color: "#C8FF00", paddingLeft: "3px" }}>▶</span>
            </span>
            <span className="absolute left-3 bottom-3 z-10">
              <span className="block text-[10px] uppercase tracking-[0.3em] text-accent mb-0.5">
                {projects[index].category}
              </span>
              <span className="block font-syne font-bold text-[14px] text-white">
                {projects[index].title}
              </span>
            </span>

            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/40 z-20">
              <div
                className="h-full bg-accent transition-[width] duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Desktop arrows */}
          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="hidden md:flex absolute -left-10 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur border border-[var(--color-border)] text-text hover:border-accent hover:text-accent transition-colors items-center justify-center z-20 text-sm"
          >
            ←
          </button>
          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="hidden md:flex absolute -right-10 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur border border-[var(--color-border)] text-text hover:border-accent hover:text-accent transition-colors items-center justify-center z-20 text-sm"
          >
            →
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-3 shrink-0">
          {projects.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to project ${i + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                jump(i);
              }}
              className={`h-[5px] rounded-full transition-all ${
                i === index ? "w-[18px] bg-accent" : "w-[5px] bg-text/30 hover:bg-text/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── ROW 3 — BOTTOM BAR ── */}
      <div
        className="relative shrink-0 px-4 flex flex-col items-center justify-center text-center"
        style={{ zIndex: 10, height: 60 }}
      >
        <p className="text-muted text-[11px] tracking-[0.1em] font-light mb-2">
          Clean, Minimal & High-Retention Edits
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={scrollTo("#work")}
            className="px-5 py-2 bg-accent text-black text-[13px] font-medium tracking-wide hover:bg-accent/90 transition-colors cursor-pointer"
          >
            All Projects →
          </button>
          <a
            href="#contact"
            onClick={scrollTo("#contact")}
            className="px-5 py-2 border border-[var(--color-border)] text-text text-[13px] font-medium tracking-wide hover:border-accent hover:text-accent transition-colors"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
}
