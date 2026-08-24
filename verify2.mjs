import { chromium, devices } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...devices['iPhone 12']
  });
  const page = await context.newPage();

  await page.goto('http://localhost:4173');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshot_home2.png' });

  await context.close();
  await browser.close();
  console.log('E2E test finished, screenshots generated.');
})();
