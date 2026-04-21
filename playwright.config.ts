import { defineConfig, devices } from '@playwright/test';
import path from 'path';

const ROOT = `file://${path.resolve(__dirname)}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  projects: [
    {
      name: 'desktop',
      use: { viewport: { width: 1280, height: 800 } },
    },
    {
      name: 'mobile',
      use: { viewport: { width: 390, height: 844 } },
    },
  ],
  use: {
    baseURL: ROOT,
  },
});

export { ROOT };
