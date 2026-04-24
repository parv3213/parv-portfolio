# parv3213.online — portfolio site

Static portfolio. Two variants — a dense technical site for engineering audiences, and a plain-English site for recruiters / non-technical readers. Editorial warm-neutral + terracotta, shared tokens, light/dark toggle, print-styled résumé. No build step.

## Variants

**Technical (primary, root)** — for engineers. Dense editorial layout, case studies with architecture diagrams, stack chips, gas-reduction numbers.

**Plain-English (`simple/`)** — for recruiters and non-technical readers. Same content, rewritten to drop jargon and lead with outcomes. Two pages: home + work list. Résumé and contact link back to the technical site.

A small pill in each topbar (`"Plain-English version →"` / `"Engineer? See the technical version →"`) lets a reader switch. Choice is remembered in `localStorage['portfolio-variant']`; root-index loads auto-route to the preferred variant on later visits. Deep links stay put.

## Pages

### Technical site (root)
- `index.html` — home, hero + 3 case studies (Sperax USDs V2, Tavolo, Profile Intelligence Pipeline)
- `work.html` — compact ledger of every project, filterable by tag
- `resume.html` — full experience, skills, writing, education; print-ready
- `contact.html` — channels + availability

### Simple variant (`simple/`)
- `simple/index.html` — plain-English home
- `simple/work.html` — 9-project plain-language list

## Files

- `styles.css` — all shared styles for the technical site (also covers print)
- `app.js` — dark-mode toggle (localStorage) + work-page filter
- `variant.js` — technical ↔ simple toggle persistence + auto-route
- `simple/styles.css` — simple-variant styles (imports the root `styles.css` for tokens)
- `fonts/` — self-hosted Geist + Geist Mono subsets
- `tests/` — Playwright visual tests (`visual.spec.ts`, `portfolio.spec.ts`)
- `deprecated/` — previous dense-density primary (kept for reference; not linked)

## Content anchors

HTML anchor comments mark stable edit targets so the daily profile-sync automation can patch pages safely:
- `<!-- project:<slug> -->` above each project row in `work.html` (and above each featured case article in `index.html`)
- `<!-- role:<slug> -->` above each role in `resume.html`

If you add a project or role, include an anchor so the automation can find it.

## Local preview

```sh
python3 -m http.server 8080
# open http://localhost:8080
```

## Tests

```sh
npm ci --no-audit --no-fund
npx playwright test
```

Full-page screenshots for desktop (1280×800) and mobile (390×844) are written to `screenshots/`.

## Deploy

Any static host works — Vercel / Netlify / Cloudflare Pages / GitHub Pages. No build step. The site renders from raw HTML + CSS + a small amount of JS.

## Daily profile sync

`index.html`, `work.html`, and `resume.html` are kept in sync with the canonical profile at `/Users/parv3213/Documents/parv_complete_profile` via a daily automation that opens PRs (label: `auto-profile-sync`). A separate reviewer command (`.claude/commands/review-portfolio-pr.md`) checks out the PR, runs Playwright, and approves or requests changes. Humans merge.

When a content change lands on the technical site, the simple variant should be updated alongside — the reviewer flags mismatches.
