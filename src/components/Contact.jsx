import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="contact" className="py-32 px-6 bg-bg">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-5xl mx-auto"
      >
        <motion.div
          variants={item}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-accent/40"
        >
          <span className="relative inline-block w-2 h-2 rounded-full bg-green-500 kivv-pulse" />
          <span className="text-xs uppercase tracking-[0.25em] text-text/80">
            Available for new projects
          </span>
        </motion.div>

        <motion.h2
          variants={item}
          className="mt-8 font-syne font-extrabold leading-[1.05]"
          style={{ fontSize: "clamp(40px, 7vw, 88px)" }}
        >
          Let's work <span className="text-accent">together.</span>
        </motion.h2>

        <motion.p variants={item} className="mt-6 text-muted text-lg max-w-xl">
          Tell me about your project. Most replies within 24 hours.
        </motion.p>

        <div className="mt-16 grid md:grid-cols-2 gap-px bg-[var(--color-border)] border border-[var(--color-border)]">
          <motion.a
            variants={item}
            whileHover={{ x: 4 }}
            href="https://www.instagram.com/kivv.edits/"
            target="_blank"
            rel="noreferrer"
            className="bg-card p-8 flex items-center justify-between border border-transparent hover:border-accent transition-colors"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted mb-2">Instagram</p>
              <p className="font-syne font-extrabold text-xl">@kivv.edits</p>
            </div>
            <span className="text-accent text-xl">↗</span>
          </motion.a>
          <motion.a
            variants={item}
            whileHover={{ x: 4 }}
            href="https://wa.me/213558041185"
            target="_blank"
            rel="noreferrer"
            className="bg-card p-8 flex items-center justify-between border border-transparent hover:border-accent transition-colors"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted mb-2">WhatsApp</p>
              <p className="font-syne font-extrabold text-xl">+213 558 041 185</p>
            </div>
            <span className="text-accent text-xl">↗</span>
          </motion.a>
        </div>

        <motion.form
          variants={item}
          onSubmit={submit}
          className="mt-12 grid gap-4 max-w-2xl"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              required
              type="text"
              placeholder="Your name"
              className="bg-card border border-[var(--color-border)] px-5 py-4 text-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
            />
            <input
              required
              type="email"
              placeholder="Email"
              className="bg-card border border-[var(--color-border)] px-5 py-4 text-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <textarea
            required
            rows={5}
            placeholder="Tell me about the project…"
            className="bg-card border border-[var(--color-border)] px-5 py-4 text-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
          />
          <button
            type="submit"
            className="justify-self-start px-8 py-4 bg-accent text-black text-sm font-medium tracking-wide hover:bg-accent/90 transition-colors"
          >
            {sent ? "Sent ✓" : "Send message"}
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
}
