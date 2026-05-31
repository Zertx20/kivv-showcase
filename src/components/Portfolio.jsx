import { motion } from "framer-motion";

export default function Portfolio({ onOpenDrawer }) {
  return (
    <section id="work">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col items-center text-center overflow-hidden"
        style={{
          width: "100%",
          padding: "40px 24px",
          background: "#0d0d0d",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          gap: 16,
        }}
      >
        {/* Top label with side lines */}
        <div
          className="relative flex items-center gap-2 z-10"
          style={{
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#C8FF00",
          }}
        >
          <span style={{ width: 24, height: 1, background: "rgba(200,255,0,0.3)" }} />
          MORE WORK
          <span style={{ width: 24, height: 1, background: "rgba(200,255,0,0.3)" }} />
        </div>

        {/* Main heading */}
        <h2
          className="z-10"
          style={{
            fontFamily: "Syne",
            fontWeight: 800,
            fontSize: "clamp(32px, 8vw, 48px)",
            color: "#F0EDE8",
            lineHeight: 1,
            margin: 0,
          }}
        >
          All Projects.
        </h2>

        {/* Subtext */}
        <p
          className="z-10"
          style={{
            fontFamily: "DM Sans",
            fontWeight: 300,
            fontSize: "13px",
            color: "#888",
            lineHeight: 1.6,
            maxWidth: 260,
            margin: 0,
          }}
        >
          From brand films to short-form reels —
          <br />
          every cut crafted with intention.
        </p>

        {/* Button */}
        <button
          onClick={() => onOpenDrawer?.()}
          className="z-10"
          style={{
            background: "#C8FF00",
            color: "#000",
            fontFamily: "Syne",
            fontWeight: 800,
            fontSize: "13px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "14px 32px",
            borderRadius: 2,
            border: "none",
            cursor: "pointer",
            marginTop: 8,
            transition: "opacity 0.2s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.85";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          View All Projects →
        </button>

        {/* Small muted note */}
        <p
          className="z-10"
          style={{
            fontSize: "10px",
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.1em",
            margin: 0,
            marginTop: 4,
          }}
        >
          Tap to explore ↑
        </p>
      </motion.div>
    </section>
  );
}

