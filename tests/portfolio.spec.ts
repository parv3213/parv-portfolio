import { test, expect, Page, devices } from '@playwright/test';
import path from 'path';

const ROOT = `file://${path.resolve(__dirname, '..')}`;
const url = (page: string) => `${ROOT}/${page}`;

const PAGES = [
  { file: 'index-medium.html',   label: 'Index',   ariaCurrent: 'Index' },
  { file: 'work-medium.html',    label: 'Work',    ariaCurrent: 'Work' },
  { file: 'resume-medium.html',  label: 'Résumé',  ariaCurrent: 'Résumé' },
  { file: 'contact-medium.html', label: 'Contact', ariaCurrent: 'Contact' },
];

// ─── Navigation ──────────────────────────────────────────────────────────────

test.describe('Navigation', () => {
  for (const pg of PAGES) {
    test(`${pg.label}: nav links reach correct pages`, async ({ page }) => {
      await page.goto(url(pg.file));
      const navLinks = page.locator('.topbar nav a');
      await expect(navLinks).toHaveCount(4);

      for (const target of PAGES) {
        const link = page.locator(`.topbar nav a[href="${target.file}"]`);
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute('href', target.file);
      }
    });

    test(`${pg.label}: aria-current set on correct nav item`, async ({ page }) => {
      await page.goto(url(pg.file));
      const current = page.locator('.topbar nav a[aria-current="page"]');
      await expect(current).toHaveCount(1);
      await expect(current).toHaveText(pg.ariaCurrent);
    });

    test(`${pg.label}: logo links to index-medium.html`, async ({ page }) => {
      await page.goto(url(pg.file));
      await expect(page.locator('.topbar .mark')).toHaveAttribute('href', 'index-medium.html');
    });
  }

  test('clicking nav link navigates to that page', async ({ page }) => {
    await page.goto(url('index-medium.html'));
    await page.locator('.topbar nav a[href="work-medium.html"]').click();
    await expect(page).toHaveURL(/work-medium\.html/);
  });

  test('logo click returns to index from work page', async ({ page }) => {
    await page.goto(url('work-medium.html'));
    await page.locator('.topbar .mark').click();
    await expect(page).toHaveURL(/index-medium\.html/);
  });
});

// ─── Dark Mode ───────────────────────────────────────────────────────────────

test.describe('Dark mode', () => {
  test('initial state is light (data-dark="0")', async ({ page }) => {
    await page.goto(url('index-medium.html'));
    await expect(page.locator('body')).toHaveAttribute('data-dark', '0');
  });

  test('toggle button text starts as "Dark"', async ({ page }) => {
    await page.goto(url('index-medium.html'));
    await expect(page.locator('.mode-toggle')).toHaveText('Dark');
  });

  test('clicking toggle sets dark mode and changes button text to "Light"', async ({ page }) => {
    await page.goto(url('index-medium.html'));
    await page.locator('.mode-toggle').click();
    await expect(page.locator('body')).toHaveAttribute('data-dark', '1');
    await expect(page.locator('.mode-toggle')).toHaveText('Light');
  });

  test('clicking toggle twice returns to light mode', async ({ page }) => {
    await page.goto(url('index-medium.html'));
    await page.locator('.mode-toggle').click();
    await page.locator('.mode-toggle').click();
    await expect(page.locator('body')).toHaveAttribute('data-dark', '0');
    await expect(page.locator('.mode-toggle')).toHaveText('Dark');
  });

  test('dark mode preference persists on reload via localStorage', async ({ page }) => {
    await page.goto(url('index-medium.html'));
    await page.locator('.mode-toggle').click();
    await expect(page.locator('body')).toHaveAttribute('data-dark', '1');
    await page.reload();
    await expect(page.locator('body')).toHaveAttribute('data-dark', '1');
    await expect(page.locator('.mode-toggle')).toHaveText('Light');
  });

  test('dark mode persists across page navigation', async ({ page }) => {
    await page.goto(url('index-medium.html'));
    await page.locator('.mode-toggle').click();
    await page.goto(url('work-medium.html'));
    await expect(page.locator('body')).toHaveAttribute('data-dark', '1');
  });
});

// ─── Index Page ───────────────────────────────────────────────────────────────

test.describe('Index page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url('index-medium.html'));
  });

  test('hero h1 is visible and non-empty', async ({ page }) => {
    const h1 = page.locator('.hero h1');
    await expect(h1).toBeVisible();
    const text = await h1.innerText();
    expect(text.trim().length).toBeGreaterThan(0);
  });

  test('ticker has exactly 4 cells', async ({ page }) => {
    await expect(page.locator('.ticker .c')).toHaveCount(4);
  });

  test('credentials strip is visible', async ({ page }) => {
    await expect(page.locator('.creds')).toBeVisible();
  });

  test('topbar pulsing dot is present', async ({ page }) => {
    await expect(page.locator('.topbar .mark .dot')).toBeAttached();
  });

  test('sync line pip is present', async ({ page }) => {
    await expect(page.locator('.sync .pip')).toBeAttached();
  });

  test('three case articles with correct IDs', async ({ page }) => {
    await expect(page.locator('article.case')).toHaveCount(3);
    await expect(page.locator('#case-01')).toBeAttached();
    await expect(page.locator('#case-02')).toBeAttached();
    await expect(page.locator('#case-03')).toBeAttached();
  });

  test('#ledger anchor exists', async ({ page }) => {
    await expect(page.locator('#ledger')).toBeAttached();
  });

  test('#ledger jump link is present in DOM', async ({ page }) => {
    await expect(page.locator('a[href="#ledger"]')).toBeAttached();
  });

  test('clicking #ledger link scrolls page down', async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width < 960, 'jump link hidden at narrow viewports');
    await page.locator('a[href="#ledger"]').click();
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });

  test('footer links (GH, LI, CV) have non-empty hrefs', async ({ page }) => {
    const footLinks = page.locator('.foot ul li a');
    const count = await footLinks.count();
    expect(count).toBeGreaterThanOrEqual(3);
    for (let i = 0; i < count; i++) {
      const href = await footLinks.nth(i).getAttribute('href');
      expect(href).toBeTruthy();
    }
  });
});

// ─── Index — Hover States ─────────────────────────────────────────────────────

test.describe('Index — hover states', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url('index-medium.html'));
  });

  test('ledger row background changes on hover', async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width < 960, 'hover not reliable on narrow viewports');
    const row = page.locator('.ledger .row:not(.head)').first();
    const bgBefore = await row.evaluate(el => getComputedStyle(el).backgroundColor);
    await row.hover();
    await page.waitForTimeout(300);
    const bgAfter = await row.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bgBefore).not.toBe(bgAfter);
  });

  test('ledger row arrow gets accent color on hover', async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width < 960, 'hover not reliable on narrow viewports');
    const row = page.locator('.ledger .row:not(.head)').first();
    await row.hover();
    await page.waitForTimeout(300);
    const arColor = await row.locator('.ar').evaluate(el => getComputedStyle(el).color);
    expect(arColor).toMatch(/rgb\(184,\s*73,\s*44\)/);
  });
});

// ─── Work Page ────────────────────────────────────────────────────────────────

test.describe('Work page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url('work-medium.html'));
  });

  test('page header h1 is visible', async ({ page }) => {
    await expect(page.locator('.phead h1')).toBeVisible();
  });

  test('ticker has 4 cells', async ({ page }) => {
    await expect(page.locator('.ticker .c')).toHaveCount(4);
  });

  test('6 filter buttons are present', async ({ page }) => {
    await expect(page.locator('.filters button')).toHaveCount(6);
  });

  test('default: "all" filter is active, others inactive', async ({ page }) => {
    await expect(page.locator('.filters button[data-f="all"]')).toHaveAttribute('aria-pressed', 'true');
    for (const f of ['contracts', 'fullstack', 'ai', 'oss', 'defi']) {
      await expect(page.locator(`.filters button[data-f="${f}"]`)).toHaveAttribute('aria-pressed', 'false');
    }
  });

  test('count starts at "Showing 14 of 14"', async ({ page }) => {
    await expect(page.locator('#ct')).toHaveText('Showing 14 of 14');
  });

  test('filter contracts: only matching rows visible', async ({ page }) => {
    await page.locator('.filters button[data-f="contracts"]').click();
    await expect(page.locator('.filters button[data-f="contracts"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.filters button[data-f="all"]')).toHaveAttribute('aria-pressed', 'false');

    const rows = page.locator('#lg .row:not(.head)');
    const total = await rows.count();
    for (let i = 0; i < total; i++) {
      const row = rows.nth(i);
      const tags = (await row.getAttribute('data-tags')) || '';
      const display = await row.evaluate(el => (el as HTMLElement).style.display);
      if (tags.split(' ').includes('contracts')) {
        expect(display).not.toBe('none');
      } else {
        expect(display).toBe('none');
      }
    }
  });

  test('filter contracts: count updates', async ({ page }) => {
    await page.locator('.filters button[data-f="contracts"]').click();
    const ctText = await page.locator('#ct').innerText();
    expect(ctText).toMatch(/^Showing \d+ of 14$/);
    expect(ctText).not.toBe('Showing 14 of 14');
  });

  test('filter ai: yearband with no visible rows is hidden', async ({ page }) => {
    await page.locator('.filters button[data-f="ai"]').click();
    const bands = page.locator('#lg .yearband');
    const bandCount = await bands.count();
    for (let i = 0; i < bandCount; i++) {
      const band = bands.nth(i);
      const display = await band.evaluate(el => (el as HTMLElement).style.display);
      // all shown bands should have visible rows
      if (display !== 'none') {
        let next = await band.evaluateHandle(el => el.nextElementSibling);
        let hasVisible = false;
        for (let j = 0; j < 10; j++) {
          const cls = await next.evaluate(el => el?.className || '');
          if (cls.includes('yearband') || !cls) break;
          const d = await next.evaluate(el => (el as HTMLElement).style.display);
          if (d !== 'none') { hasVisible = true; break; }
          next = await next.evaluateHandle(el => el?.nextElementSibling);
        }
        expect(hasVisible).toBe(true);
      }
    }
  });

  test('filter all: restores all rows and count', async ({ page }) => {
    await page.locator('.filters button[data-f="contracts"]').click();
    await page.locator('.filters button[data-f="all"]').click();
    const rows = page.locator('#lg .row:not(.head)');
    const total = await rows.count();
    for (let i = 0; i < total; i++) {
      const display = await rows.nth(i).evaluate(el => (el as HTMLElement).style.display);
      expect(display).not.toBe('none');
    }
    await expect(page.locator('#ct')).toHaveText('Showing 14 of 14');
  });

  test('external links have rel="noopener noreferrer"', async ({ page }) => {
    const externalLinks = page.locator('#lg .row[target="_blank"]');
    const count = await externalLinks.count();
    for (let i = 0; i < count; i++) {
      const rel = await externalLinks.nth(i).getAttribute('rel');
      expect(rel).toContain('noopener');
    }
  });

  test('fragment links reference correct case IDs', async ({ page }) => {
    const p14 = page.locator('#p14');
    await expect(p14).toHaveAttribute('href', 'index-medium.html#case-03');
    const p10 = page.locator('#p10');
    await expect(p10).toHaveAttribute('href', 'index-medium.html#case-02');
    const p09 = page.locator('#p09');
    await expect(p09).toHaveAttribute('href', 'index-medium.html#case-01');
  });

  test('row arrow gets accent color on hover', async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width < 960, 'hover not reliable on narrow viewports');
    const row = page.locator('#lg .row:not(.head)').first();
    await row.hover();
    await page.waitForTimeout(300);
    const arColor = await row.locator('.ar').evaluate(el => getComputedStyle(el).color);
    expect(arColor).toMatch(/rgb\(184,\s*73,\s*44\)/);
  });
});

// ─── Resume Page ──────────────────────────────────────────────────────────────

test.describe('Resume page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url('resume-medium.html'));
  });

  test('page header h1 is visible', async ({ page }) => {
    await expect(page.locator('.phead h1')).toBeVisible();
  });

  test('PDF button is visible with correct text', async ({ page }) => {
    const btn = page.locator('.pdfbtn');
    await expect(btn).toBeVisible();
    await expect(btn).toHaveText('Print / PDF ↓');
  });

  test('PDF button hover inverts colors', async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width < 960, 'hover not reliable on narrow viewports');
    const btn = page.locator('.pdfbtn');
    const bgBefore = await btn.evaluate(el => getComputedStyle(el).backgroundColor);
    await btn.hover();
    await page.waitForTimeout(300);
    const bgAfter = await btn.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bgBefore).not.toBe(bgAfter);
  });

  test('clicking PDF button does not throw (window.print intercepted)', async ({ page }) => {
    // Playwright auto-handles print dialogs; just ensure no crash
    await page.evaluate(() => { window.print = () => {}; });
    await expect(page.locator('.pdfbtn').click()).resolves.toBeUndefined();
  });

  test('role articles present (5 experience + 1 education)', async ({ page }) => {
    await expect(page.locator('article.role')).toHaveCount(6);
  });

  test('skills grid has 3 columns on desktop', async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width < 960, 'desktop-only layout check');
    const cols = await page.locator('.skills-grid').evaluate(el =>
      getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length
    );
    expect(cols).toBe(3);
  });

  test('@media print: topbar is hidden', async ({ page }) => {
    await page.emulateMedia({ media: 'print' });
    await page.waitForTimeout(100);
    const display = await page.locator('.topbar').evaluate(el => getComputedStyle(el).display);
    expect(display).toBe('none');
  });

  test('@media print: sync line is hidden', async ({ page }) => {
    await page.emulateMedia({ media: 'print' });
    const display = await page.locator('.sync').evaluate(el => getComputedStyle(el).display);
    expect(display).toBe('none');
  });

  test('@media print: footer is hidden', async ({ page }) => {
    await page.emulateMedia({ media: 'print' });
    const display = await page.locator('.foot').evaluate(el => getComputedStyle(el).display);
    expect(display).toBe('none');
  });
});

// ─── Contact Page ─────────────────────────────────────────────────────────────

test.describe('Contact page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url('contact-medium.html'));
  });

  test('4 channel links are present', async ({ page }) => {
    await expect(page.locator('.channel')).toHaveCount(4);
  });

  test('email channel href starts with mailto:', async ({ page }) => {
    // use .lab text for exact match to avoid partial matches in meta text
    const email = page.locator('.channel').filter({ has: page.locator('.lab', { hasText: /^Email$/i }) });
    const href = await email.getAttribute('href');
    expect(href).toMatch(/^mailto:/);
  });

  test('GitHub channel has external link attributes', async ({ page }) => {
    const gh = page.locator('.channel').filter({ has: page.locator('.lab', { hasText: /^GitHub$/i }) });
    await expect(gh).toHaveAttribute('target', '_blank');
    const rel = await gh.getAttribute('rel');
    expect(rel).toContain('noopener');
    const href = await gh.getAttribute('href');
    expect(href).toContain('github.com');
  });

  test('LinkedIn channel has external link attributes', async ({ page }) => {
    const li = page.locator('.channel').filter({ has: page.locator('.lab', { hasText: /^LinkedIn$/i }) });
    await expect(li).toHaveAttribute('target', '_blank');
    const rel = await li.getAttribute('rel');
    expect(rel).toContain('noopener');
  });

  test('phone channel uses mailto href', async ({ page }) => {
    const phone = page.locator('.channel').filter({ has: page.locator('.lab', { hasText: /^Phone$/i }) });
    const href = await phone.getAttribute('href');
    expect(href).toMatch(/^mailto:/);
  });

  test('each channel has non-empty value text', async ({ page }) => {
    const channels = page.locator('.channel .v');
    const count = await channels.count();
    for (let i = 0; i < count; i++) {
      const text = await channels.nth(i).innerText();
      expect(text.trim().length).toBeGreaterThan(0);
    }
  });

  test('availability pip is present', async ({ page }) => {
    await expect(page.locator('.pane .status .pip')).toBeAttached();
  });

  test('channel arrow gets accent color on hover', async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width < 960, 'hover not reliable on narrow viewports');
    const channel = page.locator('.channel').first();
    await channel.hover();
    await page.waitForTimeout(300);
    const arrColor = await channel.locator('.arr').evaluate(el => getComputedStyle(el).color);
    expect(arrColor).toMatch(/rgb\(184,\s*73,\s*44\)/);
  });

  test('channel background changes on hover', async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width < 960, 'hover not reliable on narrow viewports');
    const channel = page.locator('.channel').first();
    const bgBefore = await channel.evaluate(el => getComputedStyle(el).backgroundColor);
    await channel.hover();
    await page.waitForTimeout(300);
    const bgAfter = await channel.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bgBefore).not.toBe(bgAfter);
  });
});

// ─── Hover States — shared ────────────────────────────────────────────────────

test.describe('Hover states — shared', () => {
  test('nav link color changes on hover (index)', async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width < 960, 'hover not reliable on narrow viewports');
    await page.goto(url('index-medium.html'));
    const link = page.locator('.topbar nav a[href="work-medium.html"]');
    const colorBefore = await link.evaluate(el => getComputedStyle(el).color);
    await link.hover();
    await page.waitForTimeout(200);
    const colorAfter = await link.evaluate(el => getComputedStyle(el).color);
    expect(colorBefore).not.toBe(colorAfter);
  });

  test('footer links get accent border on hover (index)', async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width < 960, 'hover not reliable on narrow viewports');
    await page.goto(url('index-medium.html'));
    const link = page.locator('.foot ul li a').first();
    await link.hover();
    await page.waitForTimeout(200);
    const borderColor = await link.evaluate(el => getComputedStyle(el).borderBottomColor);
    expect(borderColor).toMatch(/rgb\(184,\s*73,\s*44\)/);
  });

  test('sec-head jump link gets accent color on hover', async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width < 960, 'jump link hidden on mobile, hover desktop-only');
    await page.goto(url('index-medium.html'));
    const jumpLink = page.locator('.sec-head .jump a').first();
    await jumpLink.hover();
    await page.waitForTimeout(350);
    const color = await jumpLink.evaluate(el => getComputedStyle(el).color);
    expect(color).toMatch(/rgb\(138,\s*54,\s*32\)/);
  });
});

// ─── Accessibility ─────────────────────────────────────────────────────────────

test.describe('Accessibility', () => {
  for (const pg of PAGES) {
    test(`${pg.label}: single h1 on page`, async ({ page }) => {
      await page.goto(url(pg.file));
      await expect(page.locator('h1')).toHaveCount(1);
    });

    test(`${pg.label}: mode-toggle is a button with visible text`, async ({ page }) => {
      await page.goto(url(pg.file));
      const btn = page.locator('.mode-toggle');
      await expect(btn).toHaveAttribute('type', 'button');
      await expect(btn).toHaveText(/^(Dark|Light)$/);
    });

    test(`${pg.label}: exactly one nav link has aria-current="page"`, async ({ page }) => {
      await page.goto(url(pg.file));
      await expect(page.locator('.topbar nav a[aria-current="page"]')).toHaveCount(1);
    });
  }

  test('Work: all filter buttons have aria-pressed', async ({ page }) => {
    await page.goto(url('work-medium.html'));
    const buttons = page.locator('.filters button');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      const pressed = await buttons.nth(i).getAttribute('aria-pressed');
      expect(['true', 'false']).toContain(pressed);
    }
  });

  test('mode-toggle can receive keyboard focus', async ({ page }) => {
    await page.goto(url('index-medium.html'));
    // Tab through focusable elements until mode-toggle is focused
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => document.activeElement?.className || '');
      if (focused.includes('mode-toggle')) break;
    }
    const focused = await page.evaluate(() => document.activeElement?.className || '');
    expect(focused).toContain('mode-toggle');
  });
});

// ─── Responsive — Mobile ──────────────────────────────────────────────────────

test.describe('Responsive — mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('topbar stacks vertically', async ({ page }) => {
    await page.goto(url('index-medium.html'));
    const flexDir = await page.locator('.topbar').evaluate(el =>
      getComputedStyle(el).flexDirection
    );
    expect(flexDir).toBe('column');
  });

  test('hero collapses to single column', async ({ page }) => {
    await page.goto(url('index-medium.html'));
    const cols = await page.locator('.hero').evaluate(el =>
      getComputedStyle(el).gridTemplateColumns
    );
    // Single column: one track value
    expect(cols.trim().split(/\s+/).length).toBe(1);
  });

  test('ledger context column hidden on mobile', async ({ page }) => {
    await page.goto(url('index-medium.html'));
    const coDisplay = await page.locator('.ledger .row .co').first().evaluate(el =>
      getComputedStyle(el).display
    );
    expect(coDisplay).toBe('none');
  });

  test('work page: context column hidden on mobile', async ({ page }) => {
    await page.goto(url('work-medium.html'));
    const coDisplay = await page.locator('.ledger .row .co').first().evaluate(el =>
      getComputedStyle(el).display
    );
    expect(coDisplay).toBe('none');
  });

  test('contact: channel arrow hidden on mobile', async ({ page }) => {
    await page.goto(url('contact-medium.html'));
    const arrDisplay = await page.locator('.channel .arr').first().evaluate(el =>
      getComputedStyle(el).display
    );
    expect(arrDisplay).toBe('none');
  });

  test('resume: skills grid collapses to 1 column on mobile', async ({ page }) => {
    await page.goto(url('resume-medium.html'));
    const cols = await page.locator('.skills-grid').evaluate(el =>
      getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length
    );
    expect(cols).toBe(1);
  });

  test('ticker wraps to 2-column grid on mobile', async ({ page }) => {
    await page.goto(url('index-medium.html'));
    const cols = await page.locator('.ticker').evaluate(el =>
      getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length
    );
    expect(cols).toBe(2);
  });
});

// ─── Responsive — Tablet ──────────────────────────────────────────────────────

// Breakpoint is max-width: 960px — use 950px to be inside the breakpoint
test.describe('Responsive — tablet (950px, below 960px breakpoint)', () => {
  test.use({ viewport: { width: 950, height: 800 } });

  test('work ledger context column hidden below 960px', async ({ page }) => {
    await page.goto(url('work-medium.html'));
    const display = await page.locator('.ledger .row .co').first().evaluate(el =>
      getComputedStyle(el).display
    );
    expect(display).toBe('none');
  });

  test('sec-head jump link hidden below 960px', async ({ page }) => {
    await page.goto(url('index-medium.html'));
    const display = await page.locator('.sec-head .jump').first().evaluate(el =>
      getComputedStyle(el).display
    );
    expect(display).toBe('none');
  });

  test('ticker collapses to 2 columns below 960px', async ({ page }) => {
    await page.goto(url('index-medium.html'));
    const cols = await page.locator('.ticker').evaluate(el =>
      getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length
    );
    expect(cols).toBe(2);
  });
});
