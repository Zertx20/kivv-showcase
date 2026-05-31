export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "40px 24px",
        background: "#080808",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            color: "#C8FF00",
            fontSize: 20,
          }}
        >
          KIVV.EDITS
        </span>
        <span
          style={{
            color: "#888888",
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.25em",
          }}
        >
          © {new Date().getFullYear()} Abdelkrim Khader
        </span>
      </div>
    </footer>
  );
}
