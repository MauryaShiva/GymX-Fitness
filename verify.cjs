const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // iPhone 12 Pro dimensions for mobile view
    isMobile: true,
    hasTouch: true,
    recordVideo: { dir: './playwright-videos' }
  });
  const page = await context.newPage();

  // Create dir if doesn't exist
  if (!fs.existsSync('./playwright-screenshots')){
    fs.mkdirSync('./playwright-screenshots');
  }

  try {
    // We assume the vite dev server is running on localhost:5173
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'playwright-screenshots/1-home-mobile.png' });

    // Click search icon in bottom nav (2nd item)
    await page.click('nav.fixed.bottom-0 button');
    await page.waitForTimeout(500); // Wait for animation
    await page.screenshot({ path: 'playwright-screenshots/2-search-overlay.png' });

    // Type something in search
    await page.fill('input[type="text"]', 'chest');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'playwright-screenshots/3-search-results.png' });

    // Close search overlay
    await page.click('button:has(svg.lucide-x)');
    await page.waitForTimeout(500);

    // Scroll down to cards
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(500);

    // Click on an exercise card
    const exerciseCard = await page.$('a[href^="/exercise/"]');
    if (exerciseCard) {
      await exerciseCard.click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'playwright-screenshots/4-exercise-detail.png' });
    }

  } catch (error) {
    console.error('Playwright verification failed:', error);
  } finally {
    await context.close();
    await browser.close();
  }
})();
