import { test } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const ROOT = `file://${path.resolve(__dirname, '..')}`;
const url = (page: string) => `${ROOT}/${page}`;
const SS_DIR = path.resolve(__dirname, '../screenshots');
fs.mkdirSync(SS_DIR, { recursive: true });

const shot = async (page: any, name: string) => {
  await page.screenshot({ path: `${SS_DIR}/${name}.png`, fullPage: true });
};

// ─── Desktop light ────────────────────────────────────────────────────────────

test('desktop-light: index', async ({ page }) => {
  await page.goto(url('index.html'));
  await page.waitForTimeout(300);
  await shot(page, '01-desktop-light-index');
});

test('desktop-light: index scrolled to ledger', async ({ page }) => {
  await page.goto(url('index.html'));
  await page.locator('#ledger').scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await shot(page, '02-desktop-light-index-ledger');
});

test('desktop-light: work default', async ({ page }) => {
  await page.goto(url('work.html'));
  await page.waitForTimeout(300);
  await shot(page, '03-desktop-light-work-all');
});

test('desktop-light: work filtered contracts', async ({ page }) => {
  await page.goto(url('work.html'));
  await page.locator('.filters button[data-f="contracts"]').click();
  await page.waitForTimeout(200);
  await shot(page, '04-desktop-light-work-contracts');
});

test('desktop-light: work filtered ai', async ({ page }) => {
  await page.goto(url('work.html'));
  await page.locator('.filters button[data-f="ai"]').click();
  await page.waitForTimeout(200);
  await shot(page, '05-desktop-light-work-ai');
});

test('desktop-light: resume top', async ({ page }) => {
  await page.goto(url('resume.html'));
  await page.waitForTimeout(300);
  await shot(page, '06-desktop-light-resume-top');
});

test('desktop-light: resume skills', async ({ page }) => {
  await page.goto(url('resume.html'));
  await page.locator('.skills-grid').scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await shot(page, '07-desktop-light-resume-skills');
});

test('desktop-light: contact', async ({ page }) => {
  await page.goto(url('contact.html'));
  await page.waitForTimeout(300);
  await shot(page, '08-desktop-light-contact');
});

// ─── Desktop dark ─────────────────────────────────────────────────────────────

test('desktop-dark: index', async ({ page }) => {
  await page.goto(url('index.html'));
  await page.locator('.mode-toggle').click();
  await page.waitForTimeout(300);
  await shot(page, '09-desktop-dark-index');
});

test('desktop-dark: work', async ({ page }) => {
  await page.goto(url('work.html'));
  await page.locator('.mode-toggle').click();
  await page.waitForTimeout(300);
  await shot(page, '10-desktop-dark-work');
});

test('desktop-dark: resume', async ({ page }) => {
  await page.goto(url('resume.html'));
  await page.locator('.mode-toggle').click();
  await page.waitForTimeout(300);
  await shot(page, '11-desktop-dark-resume');
});

test('desktop-dark: contact', async ({ page }) => {
  await page.goto(url('contact.html'));
  await page.locator('.mode-toggle').click();
  await page.waitForTimeout(300);
  await shot(page, '12-desktop-dark-contact');
});

// ─── Hover states ─────────────────────────────────────────────────────────────

test('hover: index ledger row', async ({ page }) => {
  await page.goto(url('index.html'));
  await page.locator('#ledger').scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await page.locator('.ledger .row:not(.head)').first().hover();
  await page.waitForTimeout(300);
  await shot(page, '13-hover-index-ledger-row');
});

test('hover: work row', async ({ page }) => {
  await page.goto(url('work.html'));
  await page.locator('#lg .row:not(.head)').first().hover();
  await page.waitForTimeout(300);
  await shot(page, '14-hover-work-row');
});

test('hover: contact channel', async ({ page }) => {
  await page.goto(url('contact.html'));
  await page.locator('.channel').first().hover();
  await page.waitForTimeout(300);
  await shot(page, '15-hover-contact-channel');
});

test('hover: resume pdfbtn', async ({ page }) => {
  await page.goto(url('resume.html'));
  await page.locator('.pdfbtn').hover();
  await page.waitForTimeout(300);
  await shot(page, '16-hover-resume-pdfbtn');
});

test('hover: nav link', async ({ page }) => {
  await page.goto(url('index.html'));
  await page.locator('.topbar nav a[href="work.html"]').hover();
  await page.waitForTimeout(300);
  await shot(page, '17-hover-nav-link');
});

// ─── Mobile light ─────────────────────────────────────────────────────────────

test('mobile-light: index', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(url('index.html'));
  await page.waitForTimeout(300);
  await shot(page, '18-mobile-light-index');
});

test('mobile-light: work', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(url('work.html'));
  await page.waitForTimeout(300);
  await shot(page, '19-mobile-light-work');
});

test('mobile-light: resume', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(url('resume.html'));
  await page.waitForTimeout(300);
  await shot(page, '20-mobile-light-resume');
});

test('mobile-light: contact', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(url('contact.html'));
  await page.waitForTimeout(300);
  await shot(page, '21-mobile-light-contact');
});

// ─── Mobile dark ──────────────────────────────────────────────────────────────

test('mobile-dark: index', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(url('index.html'));
  await page.locator('.mode-toggle').click();
  await page.waitForTimeout(300);
  await shot(page, '22-mobile-dark-index');
});

test('mobile-dark: contact', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(url('contact.html'));
  await page.locator('.mode-toggle').click();
  await page.waitForTimeout(300);
  await shot(page, '23-mobile-dark-contact');
});

// ─── Print preview ────────────────────────────────────────────────────────────

test('print: resume', async ({ page }) => {
  await page.goto(url('resume.html'));
  await page.emulateMedia({ media: 'print' });
  await page.waitForTimeout(200);
  await shot(page, '24-print-resume');
});

// ─── Tablet breakpoint ────────────────────────────────────────────────────────

test('tablet: index at 950px', async ({ page }) => {
  await page.setViewportSize({ width: 950, height: 800 });
  await page.goto(url('index.html'));
  await page.waitForTimeout(300);
  await shot(page, '25-tablet-index-950');
});

test('tablet: work at 950px', async ({ page }) => {
  await page.setViewportSize({ width: 950, height: 800 });
  await page.goto(url('work.html'));
  await page.waitForTimeout(300);
  await shot(page, '26-tablet-work-950');
});
