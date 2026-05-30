import { motion } from "framer-motion";

const stats = [
  { n: "50+", l: "Projects" },
  { n: "3+", l: "Years" },
  { n: "100%", l: "Dedicated" },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden bg-bg">
      <span
        aria-hidden
        className="pointer-events-none select-none absolute -top-10 right-0 font-syne font-extrabold text-text/[0.03]"
        style={{ fontSize: "clamp(220px, 40vw, 480px)", lineHeight: 0.8 }}
      >
        AK
      </span>

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-6">About</p>
          <h2
            className="font-syne font-extrabold leading-[1.05]"
            style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
          >
            Abdelkrim Khader
          </h2>
          <div className="mt-8 max-w-2xl space-y-4 text-text/80 text-lg leading-relaxed font-light">
            <p>
              I'm a clean, minimal video editor based in Algeria, crafting edits that
              respect attention and reward it.
            </p>
            <p>
              My focus is on rhythm, restraint, and retention — every cut earns its
              place, every frame moves the story forward.
            </p>
            <p>
              From short-form social to long-form documentary work, I bring a cinematic
              eye and a sharp sense of timing to every project.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-16 grid grid-cols-3 border border-[var(--color-border)]"
        >
          {stats.map((s, i) => (
            <div
              key={s.l}
              className={`p-6 md:p-10 ${i < stats.length - 1 ? "border-r border-[var(--color-border)]" : ""}`}
            >
              <div className="font-syne font-extrabold text-accent text-3xl md:text-5xl">
                {s.n}
              </div>
              <div className="mt-2 text-muted text-xs md:text-sm uppercase tracking-[0.2em]">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
