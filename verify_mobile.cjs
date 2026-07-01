const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();

  await page.goto('http://localhost:5173');
  // Wait for the main page to load
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'mobile_home.png', fullPage: false });

  // Open the search overlay by clicking the search button in navbar
  await page.click('button:has(svg.lucide-search)');
  await page.waitForTimeout(1000); // wait for animation
  await page.screenshot({ path: 'mobile_search_overlay.png' });

  await browser.close();
  console.log("Screenshots captured successfully.");
})();
