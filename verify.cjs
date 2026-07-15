const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 }, // iPhone X viewport for mobile test
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    recordVideo: { dir: 'videos/' }
  });
  const page = await context.newPage();

  console.log('Navigating to local server...');
  await page.goto('http://localhost:4173/');

  // Wait a bit to let React render and PWA logic to run
  await page.waitForTimeout(2000);

  // Take screenshot of home page mobile layout
  await page.screenshot({ path: 'screenshots/mobile-home.png' });
  console.log('Captured mobile home screen with bottom nav');

  // Open search overlay
  console.log('Opening mobile search overlay...');
  const bottomNavSearch = await page.getByRole('button', { name: 'Search' }).last();
  if (await bottomNavSearch.count() > 0) {
     await bottomNavSearch.click();
     await page.waitForTimeout(1000);
     await page.screenshot({ path: 'screenshots/mobile-search-overlay.png' });
     console.log('Captured mobile search overlay');
  }

  // Close search overlay by clicking X button
  console.log('Closing search overlay');
  const closeBtn = await page.locator('.fixed.inset-0.z-\\[100\\] button').first();
  if (await closeBtn.count() > 0) {
      await closeBtn.click();
  }
  await page.waitForTimeout(1000);

  // Go to exercise details page
  console.log('Navigating to exercise detail page...');
  const firstExerciseCard = await page.locator('a[href^="/exercise/"]').first();
  if (await firstExerciseCard.count() > 0) {
      await firstExerciseCard.click({ force: true });
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'screenshots/mobile-exercise-detail.png' });
      console.log('Captured mobile exercise detail screen');
  }

  await context.close();
  await browser.close();
})();
