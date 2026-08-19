# CalcPro — Advanced Calculator

[![Deploy to GitHub Pages](https://github.com/Pallab-Chakraborty/Calculator/actions/workflows/deploy.yml/badge.svg)](https://github.com/Pallab-Chakraborty/Calculator/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A fast, keyboard-friendly calculator with four modes — Standard, Scientific, Programmer, and Unit Converter — plus persistent calculation history, memory functions, and click-to-copy results. Pure HTML/CSS/JS, no build step, no dependencies beyond two CDN fonts/icons.

**Live demo:** `https://pallab-chakraborty.github.io/Calculator/`

## Features

- **Standard mode** — the essentials: +, −, ×, ÷, %, memory (MC/MR/M+/M−).
- **Scientific mode** — trig (sin/cos/tan + inverses), log/ln, powers, roots, factorial, constants (π, e), DEG/RAD toggle.
- **Programmer mode** — live HEX/DEC/OCT/BIN display, base switching, bitwise-friendly digit input.
- **Unit converter** — length, weight, temperature, area, volume, speed, time, and data, with a one-click swap.
- **History panel** — every calculation is saved to `localStorage`, click any entry to recall it, collapsible panel.
- **Keyboard support** — full numeric/operator keys, Enter to evaluate, Backspace/Escape to clear.
- **Click-to-copy** — click the result (or the Copy button) to copy it to the clipboard.

## Project structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml   CI: auto-deploys to GitHub Pages on every push to main
├── index.html          Page structure and markup
├── css/
│   └── styles.css      All styling (tokens, layout, animations)
├── js/
│   ├── engine.js         Calculator state, safe expression evaluator, display formatting, history
│   ├── keypad.js          Per-mode keypad button layouts + rendering + programmer base logic
│   ├── modes.js            Mode-tab switching, angle toggle, copy-to-clipboard
│   ├── keyboard.js          Physical keyboard input handling
│   ├── converter.js         Unit conversion data + logic
│   ├── toast.js              Toast notification helper
│   └── main.js                 Boots the app once all modules are loaded
├── package.json         Project metadata + local dev script (no build step)
├── LICENSE              MIT
└── README.md
```

Scripts are loaded in dependency order (`engine.js` first, `main.js` last) via plain `<script>` tags — no bundler needed.

## Running locally

```bash
npm start
# serves the site at http://localhost:8000
```

or, without npm:

```bash
python3 -m http.server 8000
```

## Deploying to GitHub Pages

This repo ships with a GitHub Actions workflow (`.github/workflows/deploy.yml`) that deploys automatically.

1. Push these files to your repo (replacing the old single-file `index.html`).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **"GitHub Actions"**.
4. Push to `main` (or run the workflow manually from the **Actions** tab).
5. GitHub publishes to `https://<username>.github.io/<repo-name>/` within a minute or two — the badge at the top of this README tracks deploy status.

(If you'd rather deploy the old way — Settings → Pages → "Deploy from a branch" — that still works too; you can just ignore or delete the workflow file.)

## Customizing

- **Colors/theme:** edit the CSS variables at the top of `css/styles.css` (`:root`).
- **Keypad layout:** edit the `KEYPADS` object in `js/keypad.js`.
- **Unit categories:** edit the `UNITS` object in `js/converter.js`.

## Tech notes

- Fonts: Outfit (UI) + JetBrains Mono (numbers), loaded from Google Fonts.
- Icons: Font Awesome 6 (CDN).
- No frameworks, no build step — vanilla JS throughout.
