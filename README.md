# parv3213.online — portfolio site

Static four-page portfolio. Editorial warm-neutral + terracotta. Shared stylesheet, light/dark toggle, print-styled résumé.

## Pages

- `index.html` — home (hero + 3 case studies: USDs V2, Boomerang, Profile Pipeline)
- `work.html` — compact ledger of 18 projects, filterable by tag
- `resume.html` — full experience, skills, writing, education; print-ready
- `contact.html` — channels + availability

## Files

- `styles.css` — all shared styles (also covers print)
- `app.js` — dark-mode toggle (localStorage) + work-page filter
- `resume.pdf` — optional, drop alongside if you want a downloadable PDF (résumé page also uses `window.print()`)

## Local preview

```sh
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

Any static host works — Vercel / Netlify / Cloudflare Pages / GitHub Pages. No build step.
