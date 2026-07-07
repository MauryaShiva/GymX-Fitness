import { syncPlaywright } from 'playwright-core';
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });

  // Create a mobile context
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
    recordVideo: { dir: './videos/' }
  });

  const page = await context.newPage();

  await page.goto('http://localhost:5173/');

  // Wait for the app to load
  await page.waitForTimeout(3000);

  // Take screenshot of Home page
  await page.screenshot({ path: 'home-mobile.png' });

  // Click on the search icon in the navbar
  await page.click('nav button[aria-label="Open Search"]');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'search-overlay.png' });

  // Close search overlay
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1000);

  // Scroll down slightly to see sticky nav effect and exercise cards
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'home-scrolled.png' });

  // Navigate to Workouts using Bottom Nav
  await page.click('text=Workouts');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'workouts-mobile.png' });

  await context.close();
  await browser.close();
})();
