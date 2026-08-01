import { test, expect } from '@playwright/test';
import { chromium, devices } from 'playwright';
import path from 'path';

(async () => {
  const browser = await chromium.launch();
  // Simulate an iPhone 13
  const context = await browser.newContext({
    ...devices['iPhone 13'],
    recordVideo: { dir: './playwright-videos' }
  });
  const page = await context.newPage();

  // Assuming preview server runs on port 4173 (we will start it before this script)
  await page.goto('http://localhost:4173');

  // Wait for the app to load
  await page.waitForSelector('nav.fixed.bottom-0');
  await page.screenshot({ path: 'mobile_home.png' });

  // Open search overlay
  await page.click('nav.fixed.bottom-0 button:has-text("Exercises")');
  await page.waitForSelector('div.fixed.inset-0.z-\\[60\\]');
  await page.screenshot({ path: 'mobile_search_overlay.png' });

  // Close search overlay
  await page.click('div.fixed.inset-0.z-\\[60\\] button');

  // Go to exercise details (assuming there's a card)
  await page.click('a[href^="/exercise/"]');
  await page.waitForSelector('h1');
  await page.screenshot({ path: 'mobile_exercise_details.png' });

  await context.close();
  await browser.close();
  console.log('Mobile verification script completed successfully.');
})();
