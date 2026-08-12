import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 375, height: 667 }
  });

  await page.goto('http://localhost:4173');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'mobile-home.png' });

  await page.locator('div.md\\:hidden button').filter({ hasText: 'Search' }).click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'mobile-search.png' });

  await browser.close();
})();
