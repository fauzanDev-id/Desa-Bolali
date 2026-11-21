import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  timeout: 45000,
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    channel: 'chrome',
  },
})
