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

  console.log('Clicking search icon in header...');
  // The search icon button in the header
  await page.click('nav button:has(svg.lucide-search)');

  // Wait for overlay animation
  await page.waitForTimeout(1000);

  console.log('Taking screenshot of search overlay...');
  await page.screenshot({ path: 'search_overlay.png' });

  console.log('Typing in search input...');
  await page.fill('input#mobile-search-input', 'chest');

  await page.waitForTimeout(500);

  console.log('Taking screenshot of search suggestions...');
  await page.screenshot({ path: 'search_suggestions.png' });

  // Click a suggestion
  console.log('Clicking first suggestion...');
  await page.click('#mobile-search-input ~ ul.absolute.top-full li:first-child');

  // Wait for overlay to close
  await page.waitForTimeout(1000);

  console.log('Taking screenshot after search...');
  await page.screenshot({ path: 'search_result.png' });

  await context.close();
  await browser.close();
})();
