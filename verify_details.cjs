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

  console.log('Scrolling to exercises...');
  // Click search to get results quickly and scroll
  await page.click('nav button:has(svg.lucide-search)');
  await page.waitForTimeout(500);
  await page.fill('input#mobile-search-input', 'chest');
  await page.waitForTimeout(500);
  await page.click('#mobile-search-input ~ ul.absolute.top-full li:first-child');

  // Wait for load and scroll
  await page.waitForTimeout(1000);

  console.log('Clicking first exercise card...');
  // Find the first exercise card (now an anchor inside motion wrapper or just anchor)
  await page.click('a[href^="/exercise/"]');

  console.log('Waiting for network idle on details page...');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  console.log('Taking screenshot of details page...');
  await page.screenshot({ path: 'exercise_details.png' });

  console.log('Scrolling down to test sticky button...');
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(500);

  console.log('Taking screenshot of scrolled details...');
  await page.screenshot({ path: 'exercise_details_scrolled.png' });

  await context.close();
  await browser.close();
})();
