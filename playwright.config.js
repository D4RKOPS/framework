// @ts-check
const { defineConfig } = require('@playwright/test');
require('dotenv').config();

const BASE_URL = process.env.BASE_URL || 'https://jsonplaceholder.typicode.com';

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: BASE_URL,
    extraHTTPHeaders: {
      'Content-Type': 'application/json; charset=UTF-8',
      Accept: 'application/json',
    },
    trace: 'on-first-retry',
  },
});
