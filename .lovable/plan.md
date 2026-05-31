# KIVV.EDITS Portfolio — Vite + React 18 Build Plan

## Scope

Replace the current TanStack Start template with a plain Vite + React 18 single-page portfolio for Abdelkrim Khader (KIVV.EDITS), matching the provided design system, components, animations, and performance rules exactly.

## Stack

- Vite 5 + React 18
- Tailwind CSS v3 (with PostCSS + autoprefixer)
- Framer Motion
- Google Fonts: Syne 800 + DM Sans 300/400/500 via `<link>` in `index.html`
- Vercel SPA rewrites

## Cleanup

Remove TanStack-specific files so the new flat Vite app builds cleanly:

- Delete: `src/router.tsx`, `src/server.ts`, `src/start.ts`, `src/routes/`, `src/routeTree.gen.ts`, `src/components/ui/*`, `src/hooks/`, `src/lib/`, `src/styles.css`, `bunfig.toml`, `components.json`
- Replace: `package.json`, `vite.config.ts` → `vite.config.js`, `tsconfig.json` removed (JS only)

## Files to create

```text
index.html                  Google Fonts links, root div, mounts /src/main.jsx
vercel.json                 SPA rewrite to /
tailwind.config.js          Theme tokens (bg, surface, card, accent, accent2, text, muted, border), Syne + DM Sans families
postcss.config.js           tailwindcss + autoprefixer
vite.config.js              @vitejs/plugin-react
package.json                scripts: dev/build/preview; deps: react, react-dom, framer-motion; dev: vite, @vitejs/plugin-react, tailwindcss, postcss, autoprefixer
README.md                   install / dev / build / deploy steps
src/
  main.jsx                  ReactDOM.createRoot, imports index.css
  App.jsx                   Composes Navbar + sections + Footer; holds Lightbox state
  index.css                 Tailwind directives, CSS vars, hero timeline keyframes, glitch keyframes, pulsing dot, scrollbar
  components/
    Navbar.jsx              Fixed blur nav, KIVV logo, smooth-scroll links, mobile full-screen overlay
    Hero.jsx                100vh, animated timeline bg (5 tracks, keyframe diamonds, traveling dots, playhead), centered copy, Framer stagger
    About.jsx               Giant "AK" backdrop, bio, 3-stat bordered grid, useInView fadeUp
    Services.jsx            3 cards (Short-Form / Long-Form / Motion & Color), hover lift + border accent
    Portfolio.jsx           Slider (see below)
    Lightbox.jsx            AnimatePresence overlay, conditional iframe, ESC + outside click close
    Contact.jsx             Available badge w/ pulse, heading, IG + Email rows, UI-only form
    Footer.jsx              Logo + copyright, top border
```

## Portfolio component (key detail)

- State: `index`, `progress`, `paused` (paused when Lightbox open)
- Auto-advance: `setInterval` 50ms ticking progress 0→100 over 5s; advance + reset on full
- Manual nav (arrows / dots / swipe): reset progress
- Touch: record `touchstart.clientX`, on `touchend` compare delta vs 40px threshold → prev/next
- Slides are facade divs (bg color + SVG play button) — no iframes; click sets `activeProject` → opens Lightbox
- AnimatePresence + translateX spring between slides
- Counter "Project X / 6", dot indicators (active = accent, scale-110), progress bar fills bg-accent
- 6 projects array hardcoded with provided titles/categories/ytIds/bg colors

## Lightbox

- Rendered in `App.jsx` with `activeProject` state passed down
- AnimatePresence opacity fade; iframe mounted only when open
- Escape key listener via `useEffect`
- Click on backdrop (not video) closes
- Shows title + category below iframe

## Design tokens (tailwind.config.js theme.extend)

```js
colors: {
  bg: '#080808', surface: '#111111', card: '#161616',
  accent: '#C8FF00', accent2: '#00AAFF',
  text: '#F0EDE8', muted: '#888888',
},
borderColor: { DEFAULT: 'rgba(255,255,255,0.08)' },
fontFamily: { syne: ['Syne','sans-serif'], sans: ['"DM Sans"','sans-serif'] },
```

## Hero timeline animation (index.css)

- `.track` absolute horizontal line, 5 instances at varied `top`
- `.keyframe` small rotated squares positioned at random `left`
- `.dot-travel` keyframe: `translateX(-10px) → translateX(calc(100vw + 10px))` with per-track durations 6–11s
- `.playhead` keyframe: `left: 0% → 100%` over 14s linear infinite
- Glitch keyframe for accent dot hover

## Animations

- Hero: `motion.div` with `initial`/`animate` + `transition.delay` stagger 0.15s
- Sections: `useInView({ once: true, amount: 0.15 })` → fade + y:20 → 0
- Service cards: `whileHover={{ y: -4 }}`, border transitions to accent via CSS
- Contact rows: `whileHover={{ x: 4 }}`

## Performance

- No iframe until Lightbox open
- `loading="lazy"` on any `<img>` (none required by spec, but applied if added)
- Fonts only in `index.html` head

## Deployment

- `vercel.json`: `{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`
- README: `npm install && npm run dev`, `npm run build`, deploy via Vercel CLI or Git import

## Verification

After build mode: run `npm install` + `npm run build` to confirm clean compile, then visually verify hero animation, slider autoplay, lightbox open/close, and mobile menu in preview.
