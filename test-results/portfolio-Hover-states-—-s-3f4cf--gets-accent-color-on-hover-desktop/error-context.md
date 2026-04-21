# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> Hover states — shared >> sec-head jump link gets accent color on hover
- Location: tests/portfolio.spec.ts:472:7

# Error details

```
Error: expect(received).toMatch(expected)

Expected pattern: /rgb\(138,\s*54,\s*32\)/
Received string:  "rgb(137, 55, 33)"
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - link "parv3213.online" [ref=e4] [cursor=pointer]:
      - /url: index-medium.html
      - text: parv3213.online
    - navigation [ref=e6]:
      - link "Index" [ref=e7] [cursor=pointer]:
        - /url: index-medium.html
      - link "Work" [ref=e8] [cursor=pointer]:
        - /url: work-medium.html
      - link "Résumé" [ref=e9] [cursor=pointer]:
        - /url: resume-medium.html
      - link "Contact" [ref=e10] [cursor=pointer]:
        - /url: contact-medium.html
      - button "Dark" [ref=e11] [cursor=pointer]
  - main [ref=e12]:
    - generic [ref=e13]:
      - generic [ref=e14]: § 00 / Index
      - heading "Architected Sperax's ~$10M TVL stack — stablecoin, farms, and on-chain fantasy sports, end-to-end from contracts through backends." [level=1] [ref=e15]:
        - text: Architected Sperax's
        - emphasis [ref=e16]: ~$10M TVL stack
        - text: — stablecoin, farms, and on-chain fantasy sports, end-to-end from contracts through backends.
      - complementary [ref=e17]:
        - generic [ref=e20]:
          - text: Open now —
          - strong [ref=e21]: senior FT
          - text: + select contract
        - separator [ref=e22]
        - generic [ref=e23]:
          - generic [ref=e24]: Based
          - text: Bengaluru · UTC+05:30
        - generic [ref=e25]:
          - generic [ref=e26]: Reach
          - link "parv3213@gmail.com" [ref=e27] [cursor=pointer]:
            - /url: mailto:parv3213@gmail.com
        - generic [ref=e28]:
          - generic [ref=e29]: Notice
          - strong [ref=e30]: none
          - text: · joining immediately
    - generic [ref=e31]:
      - generic [ref=e32]:
        - generic [ref=e33]: TVL stack · Sperax
        - generic [ref=e34]: ~$10M
      - generic [ref=e35]:
        - generic [ref=e36]: USDs minted · lifetime
        - generic [ref=e37]: $36M+
      - generic [ref=e38]:
        - generic [ref=e39]: B2B customers · Tavolo
        - generic [ref=e40]: 70+
      - generic [ref=e41]:
        - generic [ref=e42]: Git repos · pipeline
        - text: "183"
    - generic [ref=e43]:
      - generic [ref=e44]: CV
      - generic [ref=e45]:
        - strong [ref=e46]: 5 years
        - text: shipping SaaS + EVM
      - generic [ref=e47]: ·
      - generic [ref=e48]:
        - text: ex-
        - strong [ref=e49]: Sperax
        - text: /
        - strong [ref=e50]: Tavolo
        - text: /
        - strong [ref=e51]: Somish
      - generic [ref=e52]: ·
      - generic [ref=e53]:
        - text: patent
        - strong [ref=e54]: IN 202041018639
      - generic [ref=e55]: ·
      - generic [ref=e56]:
        - text: book chapter,
        - strong [ref=e57]: Bitcoin and Blockchain
        - text: (2020)
      - generic [ref=e58]: ·
      - generic [ref=e59]:
        - text: Bengaluru · available
        - strong [ref=e60]: immediately
    - generic [ref=e61]:
      - generic [ref=e62]: § 01 / Selected work
      - heading "Three projects, picked for the outcome." [level=2] [ref=e63]:
        - text: Three projects, picked for the
        - emphasis [ref=e64]: outcome
        - text: .
      - link "Every project →" [ref=e66] [cursor=pointer]:
        - /url: "#ledger"
        - text: Every project
        - generic [ref=e67]: →
    - article [ref=e68]:
      - generic [ref=e69]:
        - generic [ref=e70]: "01"
        - generic [ref=e71]: 2023 — 2025
        - text: Senior full-stack (protocol)
      - generic [ref=e72]:
        - heading "Architecting USDs V2, then closing the Quantstamp batch." [level=3] [ref=e73]
        - paragraph [ref=e74]: Joined Sperax to rebuild an over-collateralized stablecoin on a state-based clean slate — token, VaultCore, rebase, oracle router, collateral, Uniswap V3 strategies, with The Graph subgraphs and TypeScript/Go backends on top. Same tenure also shipped Demeter (V3 farms-as-a-service — Genesis partners GMX, PlutusDAO, Gains, Vela) and Chaquen (on-chain fantasy sports, ~27K Polygon users).
        - paragraph [ref=e75]: The Quantstamp batch hit the whole repo — approvals, input validation, event emission, rebase/redeem edge cases — alongside 18–35% gas reductions on hot paths. CI grew solhint, gas-diff, and coverage gates, with state-machine diagrams in-repo so reviewers didn't have to read bytecode.
        - generic [ref=e76]:
          - generic [ref=e77]: Solidity 0.8
          - generic [ref=e78]: Foundry
          - generic [ref=e79]: OpenZeppelin
          - generic [ref=e80]: The Graph
          - generic [ref=e81]: Slither
          - generic [ref=e82]: GitHub Actions
        - generic [ref=e83]:
          - generic [ref=e84]: → Live
          - link "github.com/Sperax/USDs-v2" [ref=e85] [cursor=pointer]:
            - /url: https://github.com/Sperax/USDs-v2
          - generic [ref=e86]: ·
          - link "sperax.io" [ref=e87] [cursor=pointer]:
            - /url: https://sperax.io/
      - complementary [ref=e88]:
        - generic [ref=e89]:
          - generic [ref=e90]:
            - generic [ref=e91]: $36M+
            - generic [ref=e92]: Cumulative USDs minted
          - generic [ref=e93]:
            - generic [ref=e94]: 50+
            - generic [ref=e95]: Quantstamp-class findings closed
          - generic [ref=e96]:
            - generic [ref=e97]: 18–35%
            - generic [ref=e98]: Gas reductions on hot paths
          - generic [ref=e99]:
            - generic [ref=e100]: ~$274M
            - generic [ref=e101]: Demeter 3rd-party peak TVL
        - generic [ref=e102]:
          - generic [ref=e103]: Fig. 01 — Quantstamp findings by severity · USDs V2 · Nov 2023
          - generic [ref=e104]:
            - generic [ref=e105]:
              - generic [ref=e106]: Crit
              - generic [ref=e108]: "0"
            - generic [ref=e109]:
              - generic [ref=e110]: High
              - generic [ref=e113]: "4"
            - generic [ref=e114]:
              - generic [ref=e115]: Med
              - generic [ref=e118]: "3"
            - generic [ref=e119]:
              - generic [ref=e120]: Low
              - generic [ref=e123]: "21"
            - generic [ref=e124]:
              - generic [ref=e125]: Info
              - generic [ref=e128]: "4"
    - article [ref=e129]:
      - generic [ref=e130]:
        - generic [ref=e131]: "02"
        - generic [ref=e132]: 2025 — 2026
        - text: Full-stack · contract
      - generic [ref=e133]:
        - heading "A B2B video-and-email platform, shipped end-to-end." [level=3] [ref=e134]
        - paragraph [ref=e135]: "Campaign platform for restaurant marketing — media gallery, video uploads, role-based approvals, async notifications. Built across Go, Node, and React. The core upgrade swapped a Google-Drive-backed media flow for direct-to-Azure-Blob: chunked client sessions, concurrency control, fault-tolerant processing, SAS download URLs, lifecycle cleanup."
        - paragraph [ref=e136]: SendGrid became the email spine for video campaigns; batching and throughput passes consolidated the send pipeline onto one instrumented path. AI-assisted segmentation (chat UI + CSV bulk import) pulled manual work from hours into minutes.
        - generic [ref=e137]:
          - generic [ref=e138]: Go
          - generic [ref=e139]: Node
          - generic [ref=e140]: React
          - generic [ref=e141]: Azure Blob
          - generic [ref=e142]: SendGrid
          - generic [ref=e143]: Postgres
        - generic [ref=e144]:
          - generic [ref=e145]: → Live
          - link "tavolo.ai" [ref=e146] [cursor=pointer]:
            - /url: https://tavolo.ai/
      - complementary [ref=e147]:
        - generic [ref=e148]:
          - generic [ref=e149]:
            - generic [ref=e150]: 70+
            - generic [ref=e151]: B2B customers on platform
          - generic [ref=e152]:
            - generic [ref=e153]: <1%
            - generic [ref=e154]: Monthly churn (investor cite)
          - generic [ref=e155]:
            - generic [ref=e156]: $1.2M
            - generic [ref=e157]: Seed · O'Leary Ventures
          - generic [ref=e158]:
            - generic [ref=e159]: 3×
            - generic [ref=e160]: Customer ROI (Tavolo cite)
        - generic [ref=e161]:
          - generic [ref=e162]: Fig. 02 — Manual segmentation time · before / after AI
          - img [ref=e163]
          - generic [ref=e166]:
            - generic [ref=e167]: before · hours
            - generic [ref=e168]: AI segmenter
            - generic [ref=e169]: after · minutes
    - article [ref=e170]:
      - generic [ref=e171]:
        - generic [ref=e172]: "03"
        - generic [ref=e173]: 2026 →
        - text: Live · powers this site
      - generic [ref=e174]:
        - heading "An AI pipeline that runs my own career operations." [level=3] [ref=e175]
        - paragraph [ref=e176]: Most portfolios get written once and quietly rot. Mine is an artifact of a pipeline that treats my engineering career as a living database — Git history is the source of truth, five Claude subagents curate typed records, idempotent syncs fan out to Sanity, which publishes this site.
        - paragraph [ref=e177]: Playwright crawlers pull LinkedIn, Wellfound, web3.career, and cryptojobslist against persisted auth. Credentialed writes stay draft-only — agents queue JSON, I press send. 183 repos ingested, 121 outreach drafts queued, four products shipped in the ~10 weeks since the pipeline has been running.
        - generic [ref=e178]:
          - generic [ref=e179]: TypeScript
          - generic [ref=e180]: Python
          - generic [ref=e181]: Claude
          - generic [ref=e182]: Playwright
          - generic [ref=e183]: Sanity
          - generic [ref=e184]: Git
        - generic [ref=e185]:
          - generic [ref=e186]: → Live
          - link "parv3213.online" [ref=e187] [cursor=pointer]:
            - /url: https://www.parv3213.online/
          - generic [ref=e188]: ·
          - generic [ref=e189]: auto-synced
      - complementary [ref=e190]:
        - generic [ref=e191]:
          - generic [ref=e192]:
            - generic [ref=e193]: "183"
            - generic [ref=e194]: Git repos curated
          - generic [ref=e195]:
            - generic [ref=e196]: "5"
            - generic [ref=e197]: Skill-scoped agents
          - generic [ref=e198]:
            - generic [ref=e199]: "121"
            - generic [ref=e200]: Outreach drafts queued
          - generic [ref=e201]:
            - generic [ref=e202]: 4 / 10 wk
            - generic [ref=e203]: Products shipped
        - generic [ref=e204]:
          - generic [ref=e205]: Fig. 03 — Skill-scoped agent graph
          - generic [ref=e206]:
            - generic [ref=e207]:
              - generic [ref=e208]: "01"
              - text: Curator
            - generic [ref=e209]:
              - generic [ref=e210]: "02"
              - text: Recruiter
            - generic [ref=e211]:
              - generic [ref=e212]: "03"
              - text: Discovery
            - generic [ref=e213]:
              - generic [ref=e214]: "04"
              - text: Hunter
            - generic [ref=e215]:
              - generic [ref=e216]: "05"
              - text: Outreach
          - generic [ref=e217]:
            - generic [ref=e218]: ingest
            - generic [ref=e221]: "183"
            - generic [ref=e222]: score
            - generic [ref=e225]: "121"
            - generic [ref=e226]: human
            - generic [ref=e229]: send
    - generic [ref=e230]:
      - generic [ref=e231]: § 02 / Work index
      - heading "The long tail — fourteen more worth recording." [level=2] [ref=e232]:
        - text: The long tail —
        - emphasis [ref=e233]: fourteen
        - text: more worth recording.
      - link "Full list →" [ref=e235] [cursor=pointer]:
        - /url: work-medium.html
        - text: Full list
        - generic [ref=e236]: →
    - generic [ref=e237]:
      - generic [ref=e238]:
        - generic [ref=e239]: "#"
        - generic [ref=e240]: Project
        - generic [ref=e241]: Client / Context
        - generic [ref=e242]: Stack
        - generic [ref=e243]: Outcome
      - link "14 Profile Intelligence Pipeline Personal · 2026 TypeScript Claude Playwright 183 / 121 →" [ref=e244] [cursor=pointer]:
        - /url: work-medium.html#p14
        - generic [ref=e245]: "14"
        - generic [ref=e246]: Profile Intelligence Pipeline
        - generic [ref=e247]: Personal · 2026
        - generic [ref=e248]:
          - generic [ref=e249]: TypeScript
          - generic [ref=e250]: Claude
          - generic [ref=e251]: Playwright
        - generic [ref=e252]: 183 / 121
        - generic [ref=e253]: →
      - link "13 Bikers Pride — cycling design studio Client · 2026 Next.js 16 React 19 Tailwind 4 live on Vercel →" [ref=e254] [cursor=pointer]:
        - /url: work-medium.html#p13
        - generic [ref=e255]: "13"
        - generic [ref=e256]: Bikers Pride — cycling design studio
        - generic [ref=e257]: Client · 2026
        - generic [ref=e258]:
          - generic [ref=e259]: Next.js 16
          - generic [ref=e260]: React 19
          - generic [ref=e261]: Tailwind 4
        - generic [ref=e262]: live on Vercel
        - generic [ref=e263]: →
      - link "10 Tavolo — B2B video & email Contract · 2025–26 Go Node React Azure 70+ customers →" [ref=e264] [cursor=pointer]:
        - /url: work-medium.html#p10
        - generic [ref=e265]: "10"
        - generic [ref=e266]: Tavolo — B2B video & email
        - generic [ref=e267]: Contract · 2025–26
        - generic [ref=e268]:
          - generic [ref=e269]: Go
          - generic [ref=e270]: Node
          - generic [ref=e271]: React
          - generic [ref=e272]: Azure
        - generic [ref=e273]: 70+ customers
        - generic [ref=e274]: →
      - link "09 USDs V2 — over-collateralized stablecoin Sperax · 2023–25 Solidity Foundry OZ Graph $36M+ minted →" [ref=e275] [cursor=pointer]:
        - /url: work-medium.html#p09
        - generic [ref=e276]: "09"
        - generic [ref=e277]: USDs V2 — over-collateralized stablecoin
        - generic [ref=e278]: Sperax · 2023–25
        - generic [ref=e279]:
          - generic [ref=e280]: Solidity
          - generic [ref=e281]: Foundry
          - generic [ref=e282]: OZ
          - generic [ref=e283]: Graph
        - generic [ref=e284]: $36M+ minted
        - generic [ref=e285]: →
      - link "08 Demeter — Uniswap V3 liquidity farms Sperax · 2023–25 Solidity Foundry UniV3 ~$274M peak →" [ref=e286] [cursor=pointer]:
        - /url: work-medium.html#p08
        - generic [ref=e287]: "08"
        - generic [ref=e288]: Demeter — Uniswap V3 liquidity farms
        - generic [ref=e289]: Sperax · 2023–25
        - generic [ref=e290]:
          - generic [ref=e291]: Solidity
          - generic [ref=e292]: Foundry
          - generic [ref=e293]: UniV3
        - generic [ref=e294]: ~$274M peak
        - generic [ref=e295]: →
      - link "04 PlotX — decentralized prediction markets Freelance · 2022 React Solidity Polygon 80K+ users →" [ref=e296] [cursor=pointer]:
        - /url: work-medium.html#p04
        - generic [ref=e297]: "04"
        - generic [ref=e298]: PlotX — decentralized prediction markets
        - generic [ref=e299]: Freelance · 2022
        - generic [ref=e300]:
          - generic [ref=e301]: React
          - generic [ref=e302]: Solidity
          - generic [ref=e303]: Polygon
        - generic [ref=e304]: 80K+ users
        - generic [ref=e305]: →
    - generic [ref=e308]:
      - text: Content auto-syncs from a pipeline I built.
      - strong [ref=e309]: "Last sync: today"
      - text: · profile last updated
      - strong [ref=e310]: 2026-04-21
  - contentinfo [ref=e311]:
    - generic [ref=e312]:
      - strong [ref=e313]: Parv Garg
      - text: — Bengaluru / remote · parv3213@gmail.com · UTC+05:30
    - list [ref=e314]:
      - listitem [ref=e315]:
        - generic [ref=e316]: GH
        - link "github.com/parv3213" [ref=e317] [cursor=pointer]:
          - /url: https://github.com/parv3213
      - listitem [ref=e318]:
        - generic [ref=e319]: LI
        - link "linkedin.com/in/parv3213" [ref=e320] [cursor=pointer]:
          - /url: https://www.linkedin.com/in/parv3213
      - listitem [ref=e321]:
        - generic [ref=e322]: CV
        - link "résumé" [ref=e323] [cursor=pointer]:
          - /url: resume-medium.html
```

# Test source

```ts
  379 |     await page.goto(url('contact-medium.html'));
  380 |   });
  381 | 
  382 |   test('4 channel links are present', async ({ page }) => {
  383 |     await expect(page.locator('.channel')).toHaveCount(4);
  384 |   });
  385 | 
  386 |   test('email channel href starts with mailto:', async ({ page }) => {
  387 |     // use .lab text for exact match to avoid partial matches in meta text
  388 |     const email = page.locator('.channel').filter({ has: page.locator('.lab', { hasText: /^Email$/i }) });
  389 |     const href = await email.getAttribute('href');
  390 |     expect(href).toMatch(/^mailto:/);
  391 |   });
  392 | 
  393 |   test('GitHub channel has external link attributes', async ({ page }) => {
  394 |     const gh = page.locator('.channel').filter({ has: page.locator('.lab', { hasText: /^GitHub$/i }) });
  395 |     await expect(gh).toHaveAttribute('target', '_blank');
  396 |     const rel = await gh.getAttribute('rel');
  397 |     expect(rel).toContain('noopener');
  398 |     const href = await gh.getAttribute('href');
  399 |     expect(href).toContain('github.com');
  400 |   });
  401 | 
  402 |   test('LinkedIn channel has external link attributes', async ({ page }) => {
  403 |     const li = page.locator('.channel').filter({ has: page.locator('.lab', { hasText: /^LinkedIn$/i }) });
  404 |     await expect(li).toHaveAttribute('target', '_blank');
  405 |     const rel = await li.getAttribute('rel');
  406 |     expect(rel).toContain('noopener');
  407 |   });
  408 | 
  409 |   test('phone channel uses mailto href', async ({ page }) => {
  410 |     const phone = page.locator('.channel').filter({ has: page.locator('.lab', { hasText: /^Phone$/i }) });
  411 |     const href = await phone.getAttribute('href');
  412 |     expect(href).toMatch(/^mailto:/);
  413 |   });
  414 | 
  415 |   test('each channel has non-empty value text', async ({ page }) => {
  416 |     const channels = page.locator('.channel .v');
  417 |     const count = await channels.count();
  418 |     for (let i = 0; i < count; i++) {
  419 |       const text = await channels.nth(i).innerText();
  420 |       expect(text.trim().length).toBeGreaterThan(0);
  421 |     }
  422 |   });
  423 | 
  424 |   test('availability pip is present', async ({ page }) => {
  425 |     await expect(page.locator('.pane .status .pip')).toBeAttached();
  426 |   });
  427 | 
  428 |   test('channel arrow gets accent color on hover', async ({ page, viewport }) => {
  429 |     test.skip(!viewport || viewport.width < 960, 'hover not reliable on narrow viewports');
  430 |     const channel = page.locator('.channel').first();
  431 |     await channel.hover();
  432 |     await page.waitForTimeout(300);
  433 |     const arrColor = await channel.locator('.arr').evaluate(el => getComputedStyle(el).color);
  434 |     expect(arrColor).toMatch(/rgb\(184,\s*73,\s*44\)/);
  435 |   });
  436 | 
  437 |   test('channel background changes on hover', async ({ page, viewport }) => {
  438 |     test.skip(!viewport || viewport.width < 960, 'hover not reliable on narrow viewports');
  439 |     const channel = page.locator('.channel').first();
  440 |     const bgBefore = await channel.evaluate(el => getComputedStyle(el).backgroundColor);
  441 |     await channel.hover();
  442 |     await page.waitForTimeout(300);
  443 |     const bgAfter = await channel.evaluate(el => getComputedStyle(el).backgroundColor);
  444 |     expect(bgBefore).not.toBe(bgAfter);
  445 |   });
  446 | });
  447 | 
  448 | // ─── Hover States — shared ────────────────────────────────────────────────────
  449 | 
  450 | test.describe('Hover states — shared', () => {
  451 |   test('nav link color changes on hover (index)', async ({ page, viewport }) => {
  452 |     test.skip(!viewport || viewport.width < 960, 'hover not reliable on narrow viewports');
  453 |     await page.goto(url('index-medium.html'));
  454 |     const link = page.locator('.topbar nav a[href="work-medium.html"]');
  455 |     const colorBefore = await link.evaluate(el => getComputedStyle(el).color);
  456 |     await link.hover();
  457 |     await page.waitForTimeout(200);
  458 |     const colorAfter = await link.evaluate(el => getComputedStyle(el).color);
  459 |     expect(colorBefore).not.toBe(colorAfter);
  460 |   });
  461 | 
  462 |   test('footer links get accent border on hover (index)', async ({ page, viewport }) => {
  463 |     test.skip(!viewport || viewport.width < 960, 'hover not reliable on narrow viewports');
  464 |     await page.goto(url('index-medium.html'));
  465 |     const link = page.locator('.foot ul li a').first();
  466 |     await link.hover();
  467 |     await page.waitForTimeout(200);
  468 |     const borderColor = await link.evaluate(el => getComputedStyle(el).borderBottomColor);
  469 |     expect(borderColor).toMatch(/rgb\(184,\s*73,\s*44\)/);
  470 |   });
  471 | 
  472 |   test('sec-head jump link gets accent color on hover', async ({ page, viewport }) => {
  473 |     test.skip(!viewport || viewport.width < 960, 'jump link hidden on mobile, hover desktop-only');
  474 |     await page.goto(url('index-medium.html'));
  475 |     const jumpLink = page.locator('.sec-head .jump a').first();
  476 |     await jumpLink.hover();
  477 |     await page.waitForTimeout(200);
  478 |     const color = await jumpLink.evaluate(el => getComputedStyle(el).color);
> 479 |     expect(color).toMatch(/rgb\(138,\s*54,\s*32\)/);
      |                   ^ Error: expect(received).toMatch(expected)
  480 |   });
  481 | });
  482 | 
  483 | // ─── Accessibility ─────────────────────────────────────────────────────────────
  484 | 
  485 | test.describe('Accessibility', () => {
  486 |   for (const pg of PAGES) {
  487 |     test(`${pg.label}: single h1 on page`, async ({ page }) => {
  488 |       await page.goto(url(pg.file));
  489 |       await expect(page.locator('h1')).toHaveCount(1);
  490 |     });
  491 | 
  492 |     test(`${pg.label}: mode-toggle is a button with visible text`, async ({ page }) => {
  493 |       await page.goto(url(pg.file));
  494 |       const btn = page.locator('.mode-toggle');
  495 |       await expect(btn).toHaveAttribute('type', 'button');
  496 |       await expect(btn).toHaveText(/^(Dark|Light)$/);
  497 |     });
  498 | 
  499 |     test(`${pg.label}: exactly one nav link has aria-current="page"`, async ({ page }) => {
  500 |       await page.goto(url(pg.file));
  501 |       await expect(page.locator('.topbar nav a[aria-current="page"]')).toHaveCount(1);
  502 |     });
  503 |   }
  504 | 
  505 |   test('Work: all filter buttons have aria-pressed', async ({ page }) => {
  506 |     await page.goto(url('work-medium.html'));
  507 |     const buttons = page.locator('.filters button');
  508 |     const count = await buttons.count();
  509 |     for (let i = 0; i < count; i++) {
  510 |       const pressed = await buttons.nth(i).getAttribute('aria-pressed');
  511 |       expect(['true', 'false']).toContain(pressed);
  512 |     }
  513 |   });
  514 | 
  515 |   test('mode-toggle can receive keyboard focus', async ({ page }) => {
  516 |     await page.goto(url('index-medium.html'));
  517 |     // Tab through focusable elements until mode-toggle is focused
  518 |     for (let i = 0; i < 15; i++) {
  519 |       await page.keyboard.press('Tab');
  520 |       const focused = await page.evaluate(() => document.activeElement?.className || '');
  521 |       if (focused.includes('mode-toggle')) break;
  522 |     }
  523 |     const focused = await page.evaluate(() => document.activeElement?.className || '');
  524 |     expect(focused).toContain('mode-toggle');
  525 |   });
  526 | });
  527 | 
  528 | // ─── Responsive — Mobile ──────────────────────────────────────────────────────
  529 | 
  530 | test.describe('Responsive — mobile', () => {
  531 |   test.use({ viewport: { width: 390, height: 844 } });
  532 | 
  533 |   test('topbar stacks vertically', async ({ page }) => {
  534 |     await page.goto(url('index-medium.html'));
  535 |     const flexDir = await page.locator('.topbar').evaluate(el =>
  536 |       getComputedStyle(el).flexDirection
  537 |     );
  538 |     expect(flexDir).toBe('column');
  539 |   });
  540 | 
  541 |   test('hero collapses to single column', async ({ page }) => {
  542 |     await page.goto(url('index-medium.html'));
  543 |     const cols = await page.locator('.hero').evaluate(el =>
  544 |       getComputedStyle(el).gridTemplateColumns
  545 |     );
  546 |     // Single column: one track value
  547 |     expect(cols.trim().split(/\s+/).length).toBe(1);
  548 |   });
  549 | 
  550 |   test('ledger context column hidden on mobile', async ({ page }) => {
  551 |     await page.goto(url('index-medium.html'));
  552 |     const coDisplay = await page.locator('.ledger .row .co').first().evaluate(el =>
  553 |       getComputedStyle(el).display
  554 |     );
  555 |     expect(coDisplay).toBe('none');
  556 |   });
  557 | 
  558 |   test('work page: context column hidden on mobile', async ({ page }) => {
  559 |     await page.goto(url('work-medium.html'));
  560 |     const coDisplay = await page.locator('.ledger .row .co').first().evaluate(el =>
  561 |       getComputedStyle(el).display
  562 |     );
  563 |     expect(coDisplay).toBe('none');
  564 |   });
  565 | 
  566 |   test('contact: channel arrow hidden on mobile', async ({ page }) => {
  567 |     await page.goto(url('contact-medium.html'));
  568 |     const arrDisplay = await page.locator('.channel .arr').first().evaluate(el =>
  569 |       getComputedStyle(el).display
  570 |     );
  571 |     expect(arrDisplay).toBe('none');
  572 |   });
  573 | 
  574 |   test('resume: skills grid collapses to 1 column on mobile', async ({ page }) => {
  575 |     await page.goto(url('resume-medium.html'));
  576 |     const cols = await page.locator('.skills-grid').evaluate(el =>
  577 |       getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length
  578 |     );
  579 |     expect(cols).toBe(1);
```