import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // iPhone 12/13/14 size
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
  });
  const page = await context.newPage();

  console.log("Navigating to Home...");
  await page.goto('http://localhost:4173');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshot_home.png', fullPage: true });

  console.log("Opening Search...");
  await page.locator('nav.fixed.bottom-0 button').click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshot_search_open.png' });

  console.log("Closing Search...");
  await page.locator('.fixed.inset-0 button').first().click();
  await page.waitForTimeout(1000);

  console.log("Navigating to Details...");
  await page.locator('a[href^="/exercise/"]').first().click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshot_details.png', fullPage: true });

  await browser.close();
  console.log("Verification complete!");
})();
