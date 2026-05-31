export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-10 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
        <span className="font-syne font-extrabold text-accent text-xl">KIVV.EDITS</span>
        <span className="text-muted text-xs uppercase tracking-[0.25em]">
          © {new Date().getFullYear()} Abdelkrim Khader
        </span>
      </div>
    </footer>
  );
}
