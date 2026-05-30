import { motion } from "framer-motion";

const services = [
  {
    icon: "◆",
    title: "Short-Form Editing",
    desc: "Reels, TikToks, Shorts — fast hooks, tight pacing, scroll-stopping cuts built for the algorithm.",
  },
  {
    icon: "▲",
    title: "Long-Form Editing",
    desc: "YouTube, vlogs, documentaries — story-first edits that hold attention from open to outro.",
  },
  {
    icon: "●",
    title: "Motion & Color",
    desc: "Transitions, grading, sound design — cinematic polish that makes every frame feel intentional.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 px-6 bg-bg">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-6">Services</p>
          <h2
            className="font-syne font-extrabold leading-[1.05]"
            style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
          >
            What I do.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border)] border border-[var(--color-border)]">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group bg-card p-8 md:p-10 border border-transparent hover:border-accent transition-colors duration-300 cursor-default"
            >
              <div className="text-accent text-3xl mb-8">{s.icon}</div>
              <h3 className="font-syne font-extrabold text-2xl mb-4">{s.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
              <div className="mt-8 text-accent text-xs uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
