const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // iPhone 12 Pro dimensions
    recordVideo: { dir: './videos/' }
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173/');
  await page.goto('http://localhost:5173/');

  console.log('Waiting for network idle...');
  await page.waitForLoadState('networkidle');

  console.log('Taking screenshot...');
  await page.screenshot({ path: 'shell_mobile.png' });

  // Navigate to workouts tab
  console.log('Clicking Workouts tab in bottom nav...');
  await page.click('nav.fixed.bottom-0 >> text=Workouts');

  await page.waitForTimeout(2000);

  console.log('Taking screenshot...');
  await page.screenshot({ path: 'shell_workouts.png' });

  await context.close();
  await browser.close();
})();
