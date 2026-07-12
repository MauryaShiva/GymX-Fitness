const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  // Mobile viewport matching iPhone 13/14
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    recordVideo: {
      dir: 'videos/',
      size: { width: 390, height: 844 }
    }
  });

  const page = await context.newPage();

  // Go to Home
  await page.goto('http://localhost:5173/');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshot_home_mobile.png' });

  // Navigate to Home Workouts via BottomNav
  await page.locator('a[href="/home-workouts"]').last().click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshot_workouts_mobile.png' });

  // Open search overlay
  await page.evaluate(() => window.dispatchEvent(new Event('open-search')));
  await page.waitForTimeout(1000); // wait for animation
  await page.screenshot({ path: 'screenshot_search_mobile.png' });

  await context.close();
  await browser.close();
})();
